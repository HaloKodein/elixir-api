import { randomBytes } from 'node:crypto'

export function generateKey(prefix: string, length: number): string {
  return `${prefix}_${randomBytes(length).toString('hex')}`
}
