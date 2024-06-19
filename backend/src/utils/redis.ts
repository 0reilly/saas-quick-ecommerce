import redis from 'redis';

const redisClient = redis.createClient({
  url: process.env.REDIS_URL, // Redis connection URL
  password: process.env.REDIS_PASSWORD, // Redis password
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

redisClient.connect().then(() => {
  console.log('Redis connected successfully.');
});

export default redisClient;