import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'ecommerce-backend', // Kafka client ID
  brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'], // Kafka broker list
});

const producer = kafka.producer();

const consumer = kafka.consumer({ groupId: 'ecommerce-consumer' });

export const sendOrderCreatedMessage = async (orderData: any) => {
  try {
    await producer.connect();
    await producer.send({
      topic: 'order-created',
      messages: [{ value: JSON.stringify(orderData) }],
    });
    await producer.disconnect();
    console.log('Order created message sent successfully!');
  } catch (error) {
    console.error('Error sending order created message:', error);
  }
};

export const consumeOrderCreatedMessage = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'order-created', fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const orderData = JSON.parse(message.value.toString());
        console.log(`Consumed message for order: ${orderData._id} from topic: ${topic}, partition: ${partition}`);
        // Process order data (e.g., update order status, send email notification)
      },
    });
  } catch (error) {
    console.error('Error consuming order created message:', error);
  }
};

export default kafka;