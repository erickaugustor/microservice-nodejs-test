import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

// stan === client
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true);

  const subscription = stan.subscribe(
    'ticket:created',
    'order-service-queue-group', // queue group for receive data from publisher
    options,
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Recieved event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
});