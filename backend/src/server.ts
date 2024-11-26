import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { authenticationRoutes } from './routes/authentication'
import fastifyJwt from '@fastify/jwt'
import cors from '@fastify/cors'

const app = fastify()


app.register(fastifyJwt, {
  secret: '9u34289tyr$#)-uiofegiA<SDkskdaelkngfklgj@&#$#&*($785io3u89rhngklfklwejre2'
})

app.register(cors, {
  origin: "*"
})

app.register(transactionsRoutes)
app.register(authenticationRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: fromZodError(error) })
  }

  console.error(error)

  return reply.status(500).send({ message: 'Internal server error.' })
})

app.listen({ port: 3333 }).then(() => {
	console.log('HTTP server running!')
})