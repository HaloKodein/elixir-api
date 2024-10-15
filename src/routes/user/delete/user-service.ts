import { BaseError } from '../../../errors/BaseError'
import { prismaClient } from '../../../lib/prisma-client'
import { Service } from '../../../types/Service'
import type { Snowflake } from '../../../types/Snowflake'

export class UserService extends Service {
  async execute(data: Snowflake) {
    const already = await prismaClient.user.findFirst({
      where: {
        id: data.id,
      },
    })

    if (!already) return new BaseError()

    await prismaClient.user.delete({
      where: {
        id: data.id,
      },
    })

    return { message: 'Success!' }
  }
}
