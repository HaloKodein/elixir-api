import type { Context } from 'elysia'
import type { Authenticate } from '../../../middlewares/Authenticate'
import { Controller } from '../../../types/Controller'
import type { PaymentService } from './payment-service'

export class PaymentController extends Controller {
  constructor(
    private service: PaymentService,
    private auth: Authenticate,
  ) {
    super()
  }

  async execute(context: Context) {
    const auth = await this.auth.execute(context)

    if (auth instanceof Error) {
      return context.error(401, auth)
    }

    return await this.service.execute()
  }
}
