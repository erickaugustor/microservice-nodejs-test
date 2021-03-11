import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-event-publisher';

console.clear();

// stan === client
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  const publisher = new TicketCreatedPublisher(stan);

  try {
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: 20,
    });
  } catch (err) {
    console.error(err);
  }

  // console.log('Publisher connected to NATS');

  // const data = JSON.stringify({});

  // stan.publish('ticket:created', data, () => {
  //   console.log('Event published');
  // });
});
