import { compareSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import type { UserDTO } from '../../../entities/User'
import { AccessError } from '../../../errors/AccessError'
import { BaseError } from '../../../errors/BaseError'
import { prismaClient } from '../../../lib/prisma-client'
import { Service } from '../../../types/Service'

const SECRET = process.env.SECRET as string

export class UserService extends Service {
  async execute(data: Omit<UserDTO, 'username'>) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: data.email,
      },
    })

    if (!user || user.banned) return new BaseError()

    const compare = compareSync(data.password, user.password)

    if (!compare) return new AccessError()

    const token = sign({ id: user.id }, SECRET, { expiresIn: '1h' })

    return { username: user.username, auth_token: token }
  }
}
