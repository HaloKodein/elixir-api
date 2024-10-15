import type { Context } from 'elysia'

export abstract class Controller {
  abstract execute(context: Context): Promise<unknown>
}
