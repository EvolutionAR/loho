<template>
	<div class="New" >
		<header class="header">
			<div class="left-back">
				<router-link to="/Main"><span class="iconfont icon-jiantou"></span></router-link>
			</div>
			<div class="logo">{{$route.params.title}}</div>
			<div class="menu">
				<router-link :to="{path:'/car/'+encodeURI('我的购物车')}" class="car"><span class="iconfont icon-gouwuchekong"></span></router-link>
				<router-link :to="{path:'/mine/'+encodeURI('我的')}" class="me"><span class="iconfont icon-wode"></span></router-link>
			</div>
		</header>
		<div class="container"  style="min-height: 667px;">
			
			<ul class="row">
				<li class="text-center" :class="{red:isred}"  @click="filterMine('',true,false,false)"><span class="filter_text">综合</span></li>
				<li class="text-center" :class="{red:isred1}" @click="filterMine('o1',false,true,false)"><span class="filter_text">销量</span></li>
				<li class="text-center" :class="{red:isred2}" @click="isk?filterMine('o3',false,false,true):filterMine('o5',false,false,true)"><span class="filter_text">价格</span></li>
				<li class="text-center"><span>筛选</span></li>
			</ul>
			<div class="middle-wrapper">
				<ul class="inner-product-list"  v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
					<li class="product-item-wrap" v-for="m in message?message:null " :key="m.id">
						<router-link :to="{path:'/productions/'+m.goodsId}">
							<a>
							<p class="product-item_image">
							<img :src="http+m.img"/>
							</p>
							<p class="small-font">{{m.title}}</p>
							</a>
						</router-link>
						<p class="price">
							<span class="inline">￥{{m.price}}</span>
							<span class="right">{{m.salesNum}}人已买</span>
						</p>
					</li>
				</ul>
			</div>
			
			<div class="textbottom">
			<span v-if="isshow">正在加载更多中</span>
			<span v-else >已经到底部了</span>
			</div>
		</div>

	</div>
</template>

<script>	
	import axios from 'axios'
	import { InfiniteScroll } from 'mint-ui';
	export default {
		name: 'New',
		data () {
			    return {
			    	message :[],
			    	num:0,
			    	sort:"",
			    	http:"http://image.loho88.com/",
			    	isshow:true,
			    	isk:false,
			    	isred:true,
			    	isred1:false,
			    	isred2:false,
			    }
			  },

		methods:{
			filterMine(k,is1,is2,is3){
				this.isk=!this.isk
				axios.get("search/?e="+this.$route.params.tid,{
		  		params:{
				    page:1,
				    sort:k
				  }
			  	}).then(function(msg){
			  		this.message=msg.data.result.data
			  		this.sort=k
			  		this.isred=is1
			    	this.isred1=is2
			    	this.isred2=is3
			    	this.num=1
			    	console.log(is1,is2,is3)
			  	}.bind(this))				
			},
			 
			loadMore() {
			console.log(1111)
				if(this.num==1){
					console.log(2222)
				let that=this
			  	axios.get("search/?e="+that.$route.params.tid,{
			  		params:{
					    page:2,
					    sort:this.sort
					  }
			  	}).then(function(msg){
			  		console.log(msg)
			  		msg.data.result.data.forEach((item,i)=>{
			  			that.message.push(item)
			  		})
			  	}.bind(this))
			  	this.num=2
			}
				if(this.num>1){
					this.isshow=false
				}
		}
	},
		mounted(){
	  	if(this.message){
	  		let that=this
	  		axios.get("search/?e="+this.$route.params.tid,{
			  		params:{
					    page:1
					  }
			  	}).then(function(msg){
			  		console.log(msg.data.result)
			  		that.message=msg.data.result.data
			  		that.num=1
			  	}.bind(this))
	  	}
	  }
	}
</script>
<style scoped lang='scss'>
	.red{color: red;}
	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		background: white;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		line-height: 5rem;
		height: 5rem;
		z-index: 99;
		.left-back {
			span.iconfont {
				display: inline-block;
				font-style: normal;
				font-weight: 800;
				font-size: 2rem;
				margin-top: .3rem;
				margin-left: 2.5rem;
			}
		}
		.logo {
			text-align: center;
			line-height: 2.5rem;
			font-size: 1.6rem;
		}
		.menu {
			display: flex;
			justify-content: space-around;
			.car {
				margin-left: 1rem;
			}
			.iconfont {
				font-size: 2.3rem;
			}
		}
		div {
			width: 33.3%;
			line-height: 5rem;
			font-size: 2rem;
		}
	}
	.container{
		padding-top: 5.2rem;
		overflow: hidden;
		.row{
    background-color: #fff;
    margin: 0 auto;
    padding: 1em 0;
    display: flex;
    justify-content: space-around;
    align-content: center;
	}
	.middle-wrapper ul{
		clear: both;
		display: block;
		overflow: hidden;
	}
	.middle-wrapper li{
		height: 22.3rem;
		width: 50%;
		position: relative;
    background: #fff;
    border: 3px solid #f2f2f2;
    box-sizing: border-box;
    float: left;
    a{
    	height: 18.6rem;
    	display: flex;
    	flex-flow: column;
    	justify-content: space-around;
   
    }
    .price{
    	display: flex;
    	justify-content: space-around;
    	.inline{
    		color: red;
    		font-weight: bold;
    	}
    	.right{
    		color: #333;
    	}
    }
    .small-font{
   	height: 3em;
    font-size: 1.4rem;
    text-overflow: ellipsis;
    display: -webkit-box;
    -moz-box-align: center;
    -webkit-box-pack: center;
    -moz-box-pack: center;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    }
		.product-item_image img{
			
			max-width: 100%;
			height: auto;
			overflow: hidden;
		}
	}
	.textbottom{
		text-align: center;
		span{
			font-size: 1.4rem;
		}
	}
	}
</style>
