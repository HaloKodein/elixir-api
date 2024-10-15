import type { UserDTO } from '../../../entities/User'
import { Service } from '../../../types/Service'

export class UserService extends Service {
  async execute(data: Partial<UserDTO>) {}
}
