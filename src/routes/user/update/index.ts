import { Authenticate } from '../../../middlewares/Authenticate'
import { UserController } from './user-controller'
import { UserService } from './user-service'

export const userController = new UserController(
  new UserService(),
  new Authenticate(),
)
