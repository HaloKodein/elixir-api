import type { Context } from 'elysia'
import type { Authenticate } from '../../../middlewares/Authenticate'
import { Controller } from '../../../types/Controller'
import type { Snowflake } from '../../../types/Snowflake'
import type { KeyDTO, KeyService } from './key-service'

export class KeyController extends Controller {
  constructor(
    private service: KeyService,
    private auth: Authenticate,
  ) {
    super()
  }

  async execute(context: Context) {
    const result = (await this.auth.execute(context)) as Snowflake

    if (result instanceof Error) return result

    const { expiresIn } = JSON.parse(context.body as string) as Pick<
      KeyDTO,
      'expiresIn'
    >

    return await this.service.execute({
      ...result,
      expiresIn,
    })
  }
}
