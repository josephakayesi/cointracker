import { Router } from 'express'
import { registerUser, loginUser } from '../controllers/auth'

const router: Router = Router()

router.route('/user/register').post(registerUser)

router.route('/user/login').post(loginUser)

export default router
