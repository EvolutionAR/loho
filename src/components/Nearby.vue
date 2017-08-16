<template>
  <div class="nearby">
  	<my-header :msg="$route.params.title"></my-header>
  	<div class="content">
	  	<mt-navbar v-model="selected">
			  <mt-tab-item id="1">列表</mt-tab-item>
			  <mt-tab-item id="2">地图</mt-tab-item>
			</mt-navbar>
			<mt-tab-container v-model="selected">
			  <mt-tab-container-item id="1">
			  	<div class="list-count">
						<p>{{nearbyInfo?nearbyInfo.city:''}}共{{nearbyInfo?nearbyInfo.stores.length:0}}家体验店(全国共227家)</p>
						<router-link :to="{path:'/position/'+nearbyInfo.city}">{{nearbyInfo?nearbyInfo.city:''}}<span class="iconfont icon-jiantou-copy"></span></router-link>
					</div>
			  	<div class="list">
			  		<div class="list-item" v-for="(m,i) in nearbyInfo?nearbyInfo.stores:null">
			  			<div class="title">{{m.catName}}<span :class="['iconfont',flag?'icon-arrows-copy-copy':'icon-chevron-copy-copy-copy-copy-copy']" @click="handleChange(i)"></span></div>
			  			<div v-show="arr[i]">
			  				<div class="img"><img :src="src+m.store_image1"/></div>
			  				<div class="address">地址：{{m.chineseAddress}}</div>
			  				<div class="call"><mt-button type="danger">免费预约直营店验光</mt-button><a><span class="iconfont icon-dianhua"></span></a></div>
			  			</div>
			  		</div>
			  	</div>
			  </mt-tab-container-item>
			  <mt-tab-container-item id="2">
			  	<bmap></bmap>
			  </mt-tab-container-item>
			</mt-tab-container>
  	</div>
  </div>
</template>

<script>
	//FYjKMglzX1L9OirbWqjMt8gKd3MbpTKR
import Bmap from './Bmap'
import Vue from 'vue'
import MyHeader from './Header'
import axios from 'axios'
export default {
  name: 'nearby',
  data () {
    return {
    	flag:true,
    	selected:'1',
    	count:null,
    	src:'http://image.loho88.com/',
    	arr:[],
    	nearbyInfo:null
    }
  },
  methods:{
  	handleChange(i){
  		this.flag = !this.flag
      this.arr[i]=!this.arr[i];
  		this.arr.splice(i,0)
  	}
  },
  mounted(){
  	let cityId = this.$route.params.cityId
		let that = this
		axios.get("/store/"+cityId,{})
		.then((msg)=>{
			that.nearbyInfo = msg.data.result
			that.$store.state.nearbyInfo = msg.data.result
//			console.log(that.$store.state)
			for(var i = 0 ; i < that.nearbyInfo.stores.length;i++){
				that.arr.push(true)
			}
		})
  },
  components:{
  	MyHeader,
  	Bmap
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
	.content{
		padding-top: 5rem;
	}
	.list-count{
		font-size: 1.4rem;
    padding: 0 .8rem;
    margin: 1rem 0 1rem!important;
    height: 3.6rem;
    line-height: 2rem;
    background: #fff;
    p{
    	display: inline-block;
    	width: 80%;
    	line-height: 3.6rem;
    }
    .iconfont{
    	font-weight: 600;
    	margin-left: .5rem;
    }
	}
	.list{
		padding: 0 1rem;
		background-color: white;
		.list-item{
			border-bottom: 1px solid #DEDEDE;
		}
		.title{
			font-weight: 600;
			padding: 1rem 0;
			clear:both;
			.iconfont{
				float: right;
				color: #e8343b;
				font-size: 1.2rem;
				margin-right: .5rem;
			}
		}
		.address{
			padding-top: 1rem;
			font-size: 1.2rem;
		}
		.img{
			img{width: 100%;height: auto;border-radius: .8rem;}
		}
		.call{
			padding: .8rem 0;
			a{
				margin-top: 1rem;
				display: inline-block;
				text-align: center;
				width: 45%;
				margin-left: 1rem;
			}
			.iconfont{
				font-size: 3.5rem;
				color: #e8343b;
				display: inline-block;
			}
		}
	}
	.mint-button{
		margin-top: -2rem;
		font-size: 1.4rem;
		padding: 0 1.6rem;
	}
	.mint-navbar .mint-tab-item.is-selected{
		border-bottom: 3px solid #e8343b;
    color: #e8343b;
    margin-bottom: -3px;
	}
	.mint-tab-item .mint-tab-item-label{
		border-right: none;
	}
</style>
