import axios from 'axios'
import { UserBitcoinAddress } from '../models/User'
import { BitcoinProfileRepository } from '../repository/BitcoinProfileRepository'

export type BalancesAndTransactionsResponse = {
	addresses: { hash160: string; address: string; n_tx: number; total_received: number; final_balance: number }[]
	txs: TransactionsResponse
}

type TransactionInput = {
	prev_out: {
		hash: string
		value: string
		tx_index: string
		n: string
	}
	script: string
}

type TransactionOutput = {
	value: string
	hash: string
	script: string
}

type TransactionsResponse = {
	hash: string
	ver: number
	vin_sz: 1
	vout_sz: 2
	lock_time: string
	size: 258
	relayed_by: string
	block_height: 12200
	tx_index: string
	inputs: TransactionInput[]
	out: TransactionOutput[]
}

export class BitcoinProfiler {
	async AddAddress(userId: string, bitcoinAddress: UserBitcoinAddress): Promise<UserBitcoinAddress> {
		try {
			return await BitcoinProfileRepository.addBitcoinAddress(userId, bitcoinAddress)
		} catch (error) {
			console.log('cannot add address')
		}
	}

	async GetAddress(userId: string, addressName: string): Promise<UserBitcoinAddress> {
		try {
			return await BitcoinProfileRepository.getBitcoinAddress(userId, addressName)
		} catch (error) {
			console.log('cannot get address')
		}
	}

	async GetBalancesAndTransactions(addresses: string[]): Promise<BalancesAndTransactionsResponse> {
		try {
			console.log(addresses)
			const addressesQueryParam = addresses.join('|')
			console.log(addressesQueryParam)
			const balancesAndTransactionsResponse = (await (await axios.get(`https://blockchain.info/multiaddr?active=${addressesQueryParam}&n=50`))
				.data) as BalancesAndTransactionsResponse

			return balancesAndTransactionsResponse
		} catch (error) {
			console.log('cannot get balances and transactions')
		}
	}
}

export default new BitcoinProfiler()
