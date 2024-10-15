import { type Context, t } from 'elysia'
import type { UserDTO } from '../../../entities/User'
import type { Authenticate } from '../../../middlewares/Authenticate'
import { Controller } from '../../../types/Controller'
import { Snowflake } from '../../../types/Snowflake'
import type { UserService } from './user-service'

export class UserController extends Controller {
  constructor(
    private service: UserService,
    private auth: Authenticate,
  ) {
    super()
  }
  async execute(context: Context) {
    const data = context.body as Partial<UserDTO>

    const result = await this.auth.execute(context)

    if (result instanceof Error) return context.error(401, result)

    await this.service.execute(data)
  }
}
