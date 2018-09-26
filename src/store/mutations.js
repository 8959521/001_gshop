import Vue from 'vue'
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
	[RECEIVE_ADDRESS] (state, {address}) {
		state.address = address
	},
	[RECEIVE_CATEGORYS] (state, {categorys}) {
		state.categorys = categorys
	},
	[RECEIVE_SHOPS] (state, {shops}) {
		state.shops = shops
	},
	[RECEVIE_USERINFO] (state, {userInfo}) {
		state.userInfo = userInfo
	},
	[RESET_USER_INFO] (state) {
		state.userInfo = {}
	},
	
	[RECEVIE_GOODS] (state, {goods}) {
		state.goods = goods
	},
	[RECEVIE_RATINGS] (state, {ratings}) {
		state.ratings = ratings
	},
	[RECEVIE_INFO] (state,{info}) {
		state.info = info
	},
	[INCREMENT_FOOD_COUNT] (state, {food}) {
		if(!food.count) {
			//food.count = 1
			Vue.set(food, 'count', 1)
			state.cartFoods.push(food)
		} else {
			food.count++
			//state.cartFoods.push(food)
		}
	},
	[DECREMENT_FOOD_COUNT] (state, {food}) {
		if(food.count) {
			food.count--
			if(food.count == 0) {
				state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
			}
		}
	},
	[CLEAR_CART] (state) {
		state.cartFoods.forEach(food => food.count=0)
		state.cartFoods = []
	},
	[RECEIVE_SEARCH_SHOPS](state, {searchShops}) {
    	state.searchShops = searchShops
    },
}
