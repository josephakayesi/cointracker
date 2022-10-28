// addBitcoinAddress, getBitcoinAddress, getBitcoinBalancesAndTransactions
import { Request, Response } from 'express'
import { generateLogID } from '../common'
import { inspectBody, inspectError, log } from '../../core/utils/logger'
import { NextFunction } from 'express'
import { IUser } from '../../core/models/User'
import { SuccessResponse } from '../../core/utils/responses'
import { BitcoinProfileRepository } from '../../core/repository/BitcoinProfileRepository'

export const addBitcoinAddress = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
	const logID = generateLogID()

	const context = 'Add Bitcoin Address'

	try {
		log(context, `New user attempting to add new bitcoin address with ${inspectBody(req.body)}`, logID)

		const user = req.user as IUser

		const { addressName, address } = req.body

		const userBitcoinAddress = {
			addressName,
			address,
		}

		const newUserBitcoinAddress = await BitcoinProfileRepository.addBitcoinAddress(user._id.toHexString(), userBitcoinAddress)

		log(context, `User: ${user.username} has added new bitcoin address successfully: ${req.body.mobile}`, logID)
		return res.status(200).json(new SuccessResponse(1055, userBitcoinAddress))
	} catch (error) {
		log(context, `Save momo failed. Error: ${inspectError(error)}`, logID)
		error.constant = 1054
		next(error)
	}
}

export const getBitcoinAddress = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
	const logID = generateLogID()

	const context = 'Get Bitcoin Address'

	try {
		log(context, `New user attempting to get new address with ${inspectBody(req.body)}`, logID)

		const user = req.user as IUser

		const { addressName } = req.body

		const bitcoinAddress = await BitcoinProfileRepository.getBitcoinAddress(user._id.toHexString(), addressName)

		log(context, `User: ${user.username} has added new bitcoin address successfully: ${req.body.mobile}`, logID)
		return res.status(200).json(new SuccessResponse(1055, bitcoinAddress))
	} catch (error) {
		log(context, `Save momo failed. Error: ${inspectError(error)}`, logID)
		error.constant = 1054
		next(error)
	}
}

export const getBitcoinBalancesAndTransactions = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
	const logID = generateLogID()

	const context = 'Get Bitcoin Balance And Trasactions'

	const user = req.user as IUser

	try {
		log(context, `User ${user._id} attempting to get new address with ${inspectBody(req.body)}`, logID)

		// const { addressName } = req.body

		const addresses = user.bitcoinAddresses.map(address => address.address)

		const bitcoinAddress = await BitcoinProfileRepository.getAllBitcoinAddressBalancesAndTransactions(addresses)

		log(context, `User: ${user.username} has queried all bitcoin balances and transactions succeessfuly`, logID)
		return res.status(200).json(new SuccessResponse(1055, bitcoinAddress))
	} catch (error) {
		log(context, `Save momo failed. Error: ${inspectError(error)}`, logID)
		error.constant = 1054
		next(error)
	}
}
