import {
	reqAddress,
	reqFoodCategory,
	reqShops,
	reqUserInfo,
	reqLogout,
	reqShopGoods,
	reqShopRatings,
	reqShopInfo,
	reqSearchShop
} from '../api'

import {
	RECEIVE_ADDRESS,
  	RECEIVE_CATEGORYS,
  	RECEIVE_SHOPS,
  	RECEVIE_USERINFO,
  	RESET_USER_INFO,
  	RECEVIE_GOODS,
  	RECEVIE_RATINGS,
  	RECEVIE_INFO,
  	INCREMENT_FOOD_COUNT,
  	DECREMENT_FOOD_COUNT,
  	CLEAR_CART,
  	RECEIVE_SEARCH_SHOPS
} from './mutation-types'

export default {
	async getAddress ({commit,state}) {
			const geohash = state.latitude + ',' + state.longitude
			const result = await reqAddress(geohash)
			if(result.code===0){
				const address = result.data
				commit(RECEIVE_ADDRESS, {address})
			}
		
		},
	async getCategorys ({commit}) {
			const result = await reqFoodCategory()
			if(result.code===0){
				const categorys = result.data
				commit(RECEIVE_CATEGORYS, {categorys})
			}
		},
	async getShops ({commit,state}) {
			const {longitude, latitude} = state
			const result = await reqShops(longitude, latitude)
			if(result.code===0){
				const shops = result.data
				commit(RECEIVE_SHOPS, {shops})
			}
	},
	recordUserInfo ({commit}, userInfo) {
			commit(RECEVIE_USERINFO, {userInfo})
		},
	async getUserInfo ({commit}) {
		const result = await reqUserInfo()
		if (result.code===0) {
			const userInfo = result.data
			commit(RECEVIE_USERINFO, {userInfo})
		}
	},
	async logout ({commit}) {
		const result = await reqLogout()
		if (result.code===0) {
			commit(RESET_USER_INFO)
		}
	},
	
	async getShopInfo({commit}) {
		const result = await reqShopInfo()
		if(result.code===0) {
			const info = result.data
			commit(RECEVIE_INFO, {info})
		}
	},
	async getShopRatings({commit}, callback) {
		const result = await reqShopRatings()
		if(result.code===0) {
			const ratings = result.data
			commit(RECEVIE_RATINGS, {ratings})
		}
		callback && callback()
	},
	async getShopGoods({commit}, callback) {
		const result = await reqShopGoods()
		if(result.code===0) {
			const goods = result.data
			commit(RECEVIE_GOODS, {goods})
		}
		callback && callback()
	},
	updateFoodCount ({commit}, {isAdd, food}) {
		if(isAdd) {
			commit(INCREMENT_FOOD_COUNT, {food})
		} else {
			commit(DECREMENT_FOOD_COUNT, {food})
		}
	},
	clearCart ({commit}) {
		commit(CLEAR_CART)
	},
	async searchShops({commit, state}, keyword) {
		const geohash = state.latitude + ',' + state.longitude
		const result = await reqSearchShop(geohash, keyword)
			if(result.code === 0) {
				const searchShops = result.data
				commit(RECEIVE_SEARCH_SHOPS, {searchShops})
			}
	}
	
}
