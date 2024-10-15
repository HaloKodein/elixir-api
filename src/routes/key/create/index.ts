import { Authenticate } from '../../../middlewares/Authenticate'
import { KeyController } from './key-controller'
import { KeyService } from './key-service'

export const keyController = new KeyController(
  new KeyService(),
  new Authenticate(),
)
