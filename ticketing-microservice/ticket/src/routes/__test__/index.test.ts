import request from 'supertest';
import { app } from '../../app';

const createTcket = () => {
  return request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title: 'sakokosa',
    price: 20
  });
}

it('can fetch a list of tickets', async () => {
  await createTcket();
  await createTcket();
  await createTcket();

  const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200);

  expect(response.body.length).toEqual(3);
});