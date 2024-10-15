import { UserController } from './user-controller'
import { UserService } from './user-service'

export const userController = new UserController(new UserService())
