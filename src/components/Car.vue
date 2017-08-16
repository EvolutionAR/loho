<template>
  <div class="car">
  	<my-header :msg="$route.params.title"></my-header>
  	<div class="content">
  		<section class="car-body">
  			<div class="shopping-tips1" v-if="!($store.state.carInfo.length)">
  				<p><span class="iconfont icon-gouwuchekong"></span></p>
  				<p>您的购物车尚未添加任何商品</p>
  				<p>去<router-link to='/main'>LOHO88眼镜生活</router-link>去购买商品!</p>
  			</div>
  			
  			<div class="shopping-tips2" v-else="!($store.state.carInfo.length)">
  				<ul class="car-list">
  					<li class="cart-group  cart-item" v-for="m in carInfo">
  						<header class="cart-group-hd"><label class="fl"><input type="checkbox" class="cart-item-select" value="185407" checked=""><strong class="group-title">单品</strong></label><span class="cart-price">¥ {{m.shopPrice.split(".")[0]}}</span></header>
  					
  						<ul class="cart-group-bd">
  							<li class="goods-item cart-item cl" data-id="" data-goods="">
  								<a href="javascript:;" target="_blank"><img class="goods-thumb" :src="'http://image.loho88.com/'+m.pics[0]"/></a>
  								<div class="goods-detail cl">
  									<p class="goods-title cl">{{m.goodsName}}<a class="a1" href="javascript:;" target="_blank"></a></p><p class="fc-gray">颜色：{{m.goodsName.split(' ')[3]}}</p>
  									<div class="cl">
  										<span class="goods-price fl">¥ {{m.shopPrice.split(".")[0]}}</span>
  									</div>
  								</div>
  							</li>
  						</ul>
  						<footer class="cart-group-ft">
  							<span class="delete iconfont icon-shanchu">{{m.goodsId}}</span>
  							<div class="form-numbox">
  								<a class="minus" style="text-decoration: none;" @click="reduce" :data-id="m.goodsId">-</a><input name="number" class="num" :value="m.carNum" readonly=""><a class="plus" style="text-decoration: none;" @click="add" :data-id="m.goodsId">+</a>
  							</div>
  						</footer>
  						
  					</li>
  				</ul>
  				
  				<div class="cart-ctrlBar">
  					<label class="fl cart-selectAll"><input type="checkbox" class="js-selectAll" checked=""></label>&nbsp;
  					<a id="delSelect" class="fl fc-link">删除选中</a><a id="cart-clear">清空购物车</a>
  				</div>
  				
	  			<footer class="car-footer">
	  				<div class="total-price">
	  					<p>合计(不含运费): <span class="price">￥199</span></p>
	  				</div>
	  				<button class="car-submit">结算(1)</button>
	  			</footer>
  			</div>
  		</section>
  	</div>
  </div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import MyHeader from './Header'
	export default {
	  name: 'Mine',
	  data () {
	    return {
//	    	carInfo:null
	    }
	  },
	  methods:{
	  	add(e){
	  		var id = e.target.getAttribute("data-id")
//	  		console.log(e.target.getAttribute("data-id"))
	  		this.$store.commit('add',id)
	  	},
	  	reduce(){
	  		
	  	}
	  },
	  computed:{
	  	carInfo(){
	  		return this.$store.state.carInfo
	  	}
//		...mapState(['carInfo'])
 	 	},
	  mounted(){
//	  	this.carInfo = this.$store.state.carInfo
//	  	console.log(this.carInfo)
	  },
	  components:{
	  	MyHeader
	  }
	  
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
	.content{
		padding-top: 5rem;
	}
	.car-body{
		margin-left: 10px;
    margin-right: 10px;
    .shopping-tips1,.shopping-tips2{
    	margin: 25px 0;
	    padding: 10px;
	    background: #fff;
	    border: 1px solid #ddd;
	    border-radius: 5px;
	    p{
	    	text-align: center;
	    }
	    .iconfont{
	    	font-size: 6rem;
	    }
	    a{
	    	color: #06a;
		    text-decoration: underline;
		    cursor: pointer;
	    }
    }
    .shopping-tips2{
    	p{
    		text-align: left;
    	}
    	a{
    		text-decoration: none;
    		color: #000000;
    		font-size: 1.3rem;
    		line-height: none;
    	}
    }
	}
	.cart-group{
		margin-top: .5rem;
    margin-bottom: .5rem;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: .2rem;
    .cart-group-hd{
    	overflow: hidden;
    	font-size: 1rem;
    	padding: .3rem .8rem;
    	border-bottom: 1px dashed #ddd;
    	label{
    		float: left;
    		.cart-item-select{
    			margin-right: .5rem;
    			vertical-align: middle;
    		}
    	}
    	.cart-price{
    		float: right;
    		color: red;
    	}
    }
    
    .cart-group-ft{
    	padding: 5px 8px;
    	border-top: 1px dashed #ddd;
    	overflow: hidden;
    	.iconfont{
    		font-size: 2rem;
    		float: left;
		    margin-right: 10px;
		    padding: 0 4px;
		    line-height: 24px !important;
		    height: 24px;
		    vertical-align: middle;
		    color: #666;
		    text-align: center;
		    border: 1px solid #ddd;
		    border-radius: 3px;
		    cursor: pointer;
		    background: linear-gradient(#fff 0,#f7f7f7 100%);
    	}
    }
    .form-numbox{
    	float: right;
    	.num{
    		float: left;
		    padding: 0;
		    width: 28px;
		    height: 26px;
		    font-size: 18px;
		    text-align: center;
		    border: 1px solid #ddd;
		    border-width: 1px 0;
    	}
    	.minus,.plus{
    		cursor: pointer;
		    float: left;
		    width: 26px;
		    height: 26px;
		    text-align: center;
		    font-size: 24px;
		    color: #666;
		    line-height: 26px;
		    vertical-align: top;
		    background: #f8f8f8;
		    border: 1px solid #ddd;
		    border-radius: 2px 0 0 2px;
		    box-shadow: inset 0 0 1px #fff
    	}
    }
    
    
	}
	.car-body .shopping-tips p{
		text-align: left;
	}
	.car-body .shopping-tips a[data-v-496de78d]{
		color: #222;
		text-decoration: none;
	}
	.goods-item{
		padding: .8rem;
		.goods-thumb{
			float: left;
	    margin-right: .8rem;
	    padding: 2px 1px;
	    width: 9rem;
	    background: #fff;
	    border: 1px solid #eee;
		}
		.goods-detail{
			overflow: auto;
			.good-title{
				margin-bottom: 5px;
		    line-height: 1rem;
		    font-weight: 400;
			}
		}
	}
	.fc-gray{
		color: #aaa;
	}
	.goods-price{
		color: #f80;
	}
	
	.cart-ctrlBar{
		margin-top: 1rem;
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: .5rem;
    background: -webkit-linear-gradient(#fff,#f7f7f7);
    background: linear-gradient(#fff,#f7f7f7);
    box-shadow: inset 0 0 0 1px #fff;
    overflow: hidden;
    label{
    	margin-right: 1rem;
	    width: 2.7rem;
	    border-right: 1px solid #ddd;
	    box-shadow: inset 0 0 1px #fff;
	    float: left;
    }
    .fc-link{
    	font-size: 1.3rem;
    	color: #06a;
	    text-decoration: underline;
	    cursor: pointer;
	    float: left;
    }
    #cart-clear{
    	font-size: 1.3rem;
    	float: right;
	    padding: 0 1rem;
	    color: #f55;
	    cursor: pointer;
    }
    
	}
	
	
	.car-footer{
		position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding-left: 10px;
    height: 40px;
    line-height: 40px;
    color: #333;
    background: rgba(255,255,255,.9);
    box-shadow: 0 0 2px rgba(0,0,0,.2);
    .total-price{
    	float: left;
    	span{
    		color: #d02;
    	}
    }
    .car-submit{
    	float: right;
	    position: relative;
	    margin-top: -6px;
	    width: 100px;
	    font-size: 17px;
	    line-height: 46px;
	    color: #fff;
	    background: #d02;
	    border: 0;
	    box-shadow: -2px 0 4px rgba(0,0,0,.2);
	    text-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .car-submit:after{
    	content: '';
	    position: absolute;
	    left: -6px;
	    top: 0;
	    border-width: 3px;
	    border-style: solid;
	    border-color: transparent #a00 #a00 transparent;
    }
	}
</style>
