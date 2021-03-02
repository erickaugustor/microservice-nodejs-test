import request from 'supertest';
import { app } from '../../app';

it('has a route handler listening to /api/tickets for post requestes', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({});

  expect(response.status).toEqual(404);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('retuns an error if an invalid title is provided', async () => {
  let response;
  
  response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 10,
    });

  expect(response.status).toEqual(400);

  response = await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    price: 10,
  });

  expect(response.status).toEqual(400);
});

it('returns an error if an invalid price is provided', async () => {
  let response;
  
  response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'asassaassasa',
      price: -10,
    });

  expect(response.status).toEqual(400);

  response = await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title: '23dsdsdsdssdds',
  });

  expect(response.status).toEqual(400);
});

it('creates a ticket with valid inputs', async () => {
  response = await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title: '23dsdsdsdssdds',
    price: 20,
  });

  expect(response.status).toEqual(201);
});
