import { type UserDTO, UserEntity } from '../../../entities/User'
import { BaseError } from '../../../errors/BaseError'
import { prismaClient } from '../../../lib/prisma-client'
import { Service } from '../../../types/Service'

export class UserService extends Service {
  async execute(data: UserDTO) {
    const already = await prismaClient.user.findFirst({
      where: {
        email: data.email,
      },
    })

    if (already) return new BaseError()

    const user = await prismaClient.user.create({
      data: new UserEntity(data),
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
      },
    })

    return user
  }
}
