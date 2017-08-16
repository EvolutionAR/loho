import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
Vue.use(Vuex)

const state = {
	goodsInfo : null,
	message :null,
	nearbyInfo :null,
	carInfo : []
	
}

//this.goodsInfo.info.carNum = 1
//this.$store.state.carInfo.push(this.goodsInfo.info)
//console.log(this.$store.state.carInfo,2)
const mutations = {
	addGood(state,info){
		console.log(state.carInfo,info,11111111)
		if(state.carInfo.length){
			for(var i in state.carInfo){
				if(state.carInfo[i].goodsId == info.goodsId){
					state.carInfo[i].carNum++
					console.log("++")
					break
				}
				state.carInfo.push(info)
				break
			}
		}else{
			state.carInfo.push(info)
		}
		console.log(state.carInfo,info,3)
	},
	
	add(state,id){
		for(var i in state.carInfo){
			if(state.carInfo[i].goodsId == id){
				state.carInfo[i].carNum++
				break
			}
		}
	},
	reduce(state){
		
	}
	
}

export default new Vuex.Store({
	state,
	mutations,
	actions
})
