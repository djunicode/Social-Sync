const fastify = require('fastify')({
    logger:true
});

require('dotenv').config();

fastify.get('/', async (req, res) => {
  return { hello: 'world' };
});

const port = process.env.PORT || 3000;

try {
  fastify.listen({port});
  console.log(`Server listening on port : ${port}`);
} catch (err) {
  console.error(err);
  process.exit(1);
}