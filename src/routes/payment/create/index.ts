import { Authenticate } from '../../../middlewares/Authenticate'
import { PaymentController } from './payment-controller'
import { PaymentService } from './payment-service'

export const paymentController = new PaymentController(
  new PaymentService(),
  new Authenticate(),
)
