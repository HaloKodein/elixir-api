import type { Context } from 'elysia'
import { AccessError } from '../../../errors/AccessError'
import { prismaClient } from '../../../lib/prisma-client'
import type { Authenticate } from '../../../middlewares/Authenticate'
import { Controller } from '../../../types/Controller'
import type { Snowflake } from '../../../types/Snowflake'
import type { UserService } from './user-service'

export class UserController extends Controller {
  constructor(
    private service: UserService,
    private auth: Authenticate,
  ) {
    super()
  }

  async execute(context: Context) {
    const data = context.body as Snowflake

    const result = (await this.auth.execute(context)) as Snowflake

    if (result instanceof Error) return result

    const user = await prismaClient.user.findFirst({
      where: {
        id: result.id,
      },
    })

    if (!user || user.role !== 'ADMIN' || user.banned)
      return context.error(409, { error: new AccessError().message })

    return await this.service.execute(data)
  }
}
