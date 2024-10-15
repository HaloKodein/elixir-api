import { type Context, t } from 'elysia'
import { verify } from 'jsonwebtoken'
import { AccessError } from '../errors/AccessError'
import { BaseError } from '../errors/BaseError'
import { prismaClient } from '../lib/prisma-client'
import type { Snowflake } from '../types/Snowflake'

export const HeaderScheme = t.Object({
  authorization: t.String(),
})

export type Header = typeof HeaderScheme.static

const SECRET = process.env.SECRET as string

export type ErrorType = BaseError | AccessError

export class Authenticate {
  async execute(context: Context): Promise<Snowflake | ErrorType> {
    const token = (context.headers as Header).authorization.split(' ')[1]

    if (!token) return new BaseError()

    try {
      const decoded = verify(token, SECRET) as Snowflake

      const user = await prismaClient.user.findFirst({
        where: {
          id: decoded.id,
        },
      })

      if (!user || user.banned) return new AccessError()

      return decoded
    } catch (error) {
      return new BaseError()
    }
  }
}
