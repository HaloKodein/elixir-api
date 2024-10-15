import { t } from 'elysia'
import { AccessError } from '../../../errors/AccessError'
import { BaseError } from '../../../errors/BaseError'
import { prismaClient } from '../../../lib/prisma-client'
import { generateKey } from '../../../services/KeyService'
import { Service } from '../../../types/Service'

const KeySchema = t.Object({
  id: t.String(),
  expiresIn: t.String(),
})

export type KeyDTO = typeof KeySchema.static

export class KeyService extends Service {
  async execute(data: KeyDTO) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: data.id,
      },
    })

    if (!user) return new BaseError()

    if (user.role !== 'ADMIN') return new AccessError()

    const value = generateKey('elixir', 16)

    const key = await prismaClient.key.create({
      data: {
        value,
        expiresIn: data.expiresIn,
        user: {
          connect: { id: user.id },
        },
      },
    })

    return { key }
  }
}
