import { Router } from 'express'
import { protectUser } from '../../core/middleware/auth'
import { addBitcoinAddress, getBitcoinAddress, getBitcoinBalancesAndTransactions } from '../controllers/users'

const router: Router = Router()

router.route('/me/bitcoin').post(protectUser, addBitcoinAddress)
router.route('/me/bitcoin').get(protectUser, getBitcoinAddress)
router.route('/me/bitcoin/balance-and-transactions').get(protectUser, getBitcoinBalancesAndTransactions)

export default router
