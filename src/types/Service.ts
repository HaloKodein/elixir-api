export abstract class Service {
  abstract execute(...args: unknown[]): Promise<unknown>
}
