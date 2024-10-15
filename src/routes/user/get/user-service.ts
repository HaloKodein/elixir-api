import { BaseError } from '../../../errors/BaseError'
import { prismaClient } from '../../../lib/prisma-client'
import { Service } from '../../../types/Service'
import type { Snowflake } from '../../../types/Snowflake'

export class UserService extends Service {
  async execute(data: Snowflake) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: data.id,
      },
    })

    if (!user) return new BaseError()

    return {
      id: user.id,
      username: user.username,
      banned: user.banned,
      role: user.role,
      email: user.email,
      createdAt: user.createdAt,
    }
  }
}
