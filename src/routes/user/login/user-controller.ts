import type { Context } from 'elysia'
import type { UserDTO } from '../../../entities/User'
import { Controller } from '../../../types/Controller'
import type { UserService } from './user-service'

export class UserController extends Controller {
  constructor(private service: UserService) {
    super()
  }

  async execute(context: Context) {
    const data = context.body as Omit<UserDTO, 'username'>

    const result = await this.service.execute(data)

    if (result instanceof Error) {
      return context.error(401, result)
    }

    return result
  }
}
