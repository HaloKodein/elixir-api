import { hashSync } from 'bcrypt'
import { t } from 'elysia'

export const UserScheme = t.Object({
  email: t.String(),
  username: t.String(),
  password: t.String(),
})

export type UserDTO = typeof UserScheme.static

export class UserEntity {
  readonly email: string
  readonly username: string
  readonly password: string

  constructor({ email, username, password }: UserDTO) {
    this.email = email
    this.username = username
    this.password = hashSync(password, 10)
  }
}
