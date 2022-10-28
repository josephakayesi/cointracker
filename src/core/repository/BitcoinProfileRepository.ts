import BitcoinProfiler, { BalancesAndTransactionsResponse } from '../profiler/BitcoinProfiler'
import { UserBitcoinAddress } from '../models/User'
import UserRepository from './UserRepository'

export class BitcoinProfileRepository {
	public static async addBitcoinAddress(userId: string, bitcoinAddress: UserBitcoinAddress): Promise<UserBitcoinAddress> {
		try {
			const user = await UserRepository.findOne(userId)

			user.bitcoinAddresses.push(bitcoinAddress)

			await user.save()

			return bitcoinAddress
		} catch (error) {
			console.log('error adding bitcoin address')
		}
	}

	public static async getBitcoinAddress(userId: string, addressName: string): Promise<UserBitcoinAddress> {
		try {
			const user = await UserRepository.findOne(userId)

			const bitcoinAddresses = user.bitcoinAddresses

			return bitcoinAddresses.find(bitcoinAddress => bitcoinAddress.addressName === addressName)
		} catch (error) {
			console.log('cannot get bitcoin address')
		}
	}

	public static async getAllBitcoinAddressBalancesAndTransactions(addresses: string[]): Promise<BalancesAndTransactionsResponse> {
		try {
			return await BitcoinProfiler.GetBalancesAndTransactions(addresses)
		} catch (error) {
			console.log('cannot get bitcoin address balances and transactions')
		}
	}
}
