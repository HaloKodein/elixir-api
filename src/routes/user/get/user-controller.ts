import type { Context } from 'elysia'
import type { UserDTO } from '../../../entities/User'
import type { Authenticate } from '../../../middlewares/Authenticate'
import { Controller } from '../../../types/Controller'
import type { UserService } from './user-service'

export class UserController extends Controller {
  constructor(
    private service: UserService,
    private auth: Authenticate,
  ) {
    super()
  }

  async execute(context: Context) {
    const snowflake = await this.auth.execute(context)

    if (snowflake instanceof Error) {
      return context.error(401, snowflake)
    }

    const result = await this.service.execute(snowflake)

    if (result instanceof Error) {
      return context.error(401, result)
    }

    return result
  }
}
