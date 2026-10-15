import Fastify from 'fastify';

const fastify = Fastify({
  logger: true,
});

// Health check
fastify.get('/health', async () => {
  return { status: 'ok', uptime: process.uptime() };
});

// Example route
fastify.get('/api/hello', async (request, reply) => {
  const { name = 'World' } = request.query;
  return { message: `Hello, ${name}!` };
});

// Example POST route
fastify.post('/api/echo', async (request, reply) => {
  return { received: request.body };
});

// Start server
const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    await fastify.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
