import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'

import { keyController as keyCreateController } from './routes/key/create'
import { paymentController as paymentCreateController } from './routes/payment/create'
import { userController as userCreateController } from './routes/user/create'
import { userController as userDeleteController } from './routes/user/delete'
import { userController as userGetController } from './routes/user/get'
import { userController as userLoginController } from './routes/user/login'

const PORT = process.env.PORT ?? 3000

new Elysia({ prefix: '/api' })
  .use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  )
  .get('/', () => {
    return { version: 'v1', timestamp: new Date() }
  })
  .get('/user', async (context) => {
    return await userGetController.execute(context)
  })
  .post('/user', async (context) => {
    return await userCreateController.execute(context)
  })
  .delete('/user', async (context) => {
    return await userDeleteController.execute(context)
  })
  .post('/login', async (context) => {
    return await userLoginController.execute(context)
  })
  .post('/key', async (context) => {
    return await keyCreateController.execute(context)
  })
  .post('/payment', async (context) => {
    return await paymentCreateController.execute(context)
  })
  .listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`)
  })
