<template>
  <div class="productions">
  	<my-header :msg="''"></my-header>
  	{{$route.params.id}}
  	<div class="main-body">
  		<div class="good-banner">
  			<banner :bannerImg='bannerImg'></banner>
  		</div>
  		<div class="detail">
  			<div class='title'>
  				<p class="left">{{goodsInfo?goodsInfo.info.goodsName:null}}</p>
  				<p class="right"><span class="iconfont icon-fenxiang"></span>分享</p>
  			</div>
  			<ul class="detail-info">
  				<li class="price">￥{{goodsInfo?goodsInfo.info.shopPrice:null}}</li>
  				<li class="">快递：￥{{goodsInfo?goodsInfo.info.goodsType:null}}</li>
  				<li class="hav-buy">{{goodsInfo?goodsInfo.info.salesNum:null}}人已买</li>
  			</ul>
  			<ul class="detail-center">
  				<li v-for="m in goodsInfo?goodsInfo.info.promiseTag:null"><span class="iconfont icon-CheckedCircleIcon">{{m}}</span></li>
  			</ul>
  			<div class="good-color">
  				<p>颜色选择</p>
  				<ul>
  					<li v-for="m in goodsInfo?goodsInfo.models:null">
  						<router-link to="">{{m.color}}</router-link>
  					</li>
  				</ul>
  			</div>
  			<div class="detail-select">
  				<p class="min-img"><img v-lazy="goodsInfo?src+goodsInfo.unioned[0].goods[0].goodsThumbMin:null"/></p>
  				<p class="jia">+</p>
  				<p class="min-img"><img v-lazy="goodsInfo?src+goodsInfo.unioned[0].goods[1].goodsThumbMin:null"/></p>
  				<div class="small-text"><p>{{goodsInfo?goodsInfo.unioned[0].tname:null}}</p><span>￥{{goodsInfo?goodsInfo.unioned[0].price:null}}</span></div>
  				<p><span class="iconfont icon-jiantou-copy"></span></p>
  			</div>
  		</div>
  		<div class="body-content">
				<mt-navbar v-model="selected">
				  <mt-tab-item id="1">商品详情</mt-tab-item>
				  <mt-tab-item id="2">商品评价</mt-tab-item>
				  <mt-tab-item id="3" class="three">商品参数</mt-tab-item>
				</mt-navbar>
				<mt-tab-container v-model="selected">
				  <mt-tab-container-item id="1">
				  	<div><p v-for="url in contentImgSrc"><img v-lazy="src+url"/></p></div>
				  </mt-tab-container-item>
				  <mt-tab-container-item id="2">
				  	正在努力开发中...
				  </mt-tab-container-item>
				  <mt-tab-container-item id="3">
				    <div class="arguments">
				    	<ul>
				    		<li v-for="m in goodsInfo?goodsInfo.arguments:null"><span>{{m.tname}}</span><span>{{m.val}}</span></li>
				    	</ul>
				    </div>
				  </mt-tab-container-item>
				</mt-tab-container>
  		</div>
  		
  		<div class="gray-bg">
  			<div class="text-devide small-text">
  				<span class="text-dark">看了又看</span>
  			</div>
  			<ul class="list">
  				<li v-for="m in moreGoods?moreGoods:null">
  					<router-link :to="{path:'/productions/'+m.goodsId}" @click.native="winReload">
	  						<p class="img"><img v-lazy="src+m.img"/></p>	
								<p class="title">{{m.title}}</p>	
								<p class="price">￥ {{m.price}} <span>{{m.salesNum}}人已买</span></p>	
						</router-link>
  				</li>
  			</ul>
  		</div>
  	</div>
  	<div class="back-top" v-show="btnShow">
  		<p @click="backTop"><span class="iconfont icon-u-arrow3-right"></span></p>
  	</div>
  	<footer class="footer-nav">
  		<span class="iconfont icon-shoucang">收藏</span>
  		<router-link :to="{path:'/car/'+encodeURI('我的购物车')}" @click.native="addCar">加入购物车</router-link>
  	</footer>
  </div>
</template>

<script>
	import MyHeader from './Header'
	import Banner from './Banner'
	import axios from 'axios'
export default {
  name: 'productions',
  data () {
    return {
    	scoll : '',
    	btnShow : false,
    	src:'http://image.loho88.com/',
    	goodsInfo:null,
    	moreGoods:null,
    	bannerImg:null,
    	contentHtml:null,
    	contentImgSrc:null,
    	selected:"1"
    }
  },
  methods:{
  	winReload:function(){
     	window.location.reload();
   	},
   	backTop(){
			document.body.scrollTop = 0
		},
		addCar(){
//			console.log(this.goodsInfo.info,1)
			this.goodsInfo.info.carNum = 1
//			this.$store.state.carInfo.push(this.goodsInfo.info)
//			console.log(this.$store.state.carInfo,2)
			this.$store.commit('addGood',this.goodsInfo.info)
		}
  },
  created(){
  	let that = this
  	axios.get('goods/'+this.$route.params.id,{})
  		.then((msg)=>{
  			that.$store.state.goodsInfo = msg.data.result
  			that.goodsInfo = msg.data.result
//				console.log(that.$store.state.goodsInfo,1233)
  			that.bannerImg = msg.data.result.info.pics
  			that.contentHtml = msg.data.result.txtcontent
  			that.contentImgSrc = that.contentHtml.match(/\/i(\S*)jpg/g)
  		})
		axios.get('goods/peddle/'+this.$route.params.id,{})
			.then((msg)=>{
				that.moreGoods = msg.data.result
//				console.log(that.moreGoods,123)
			})
  },
  mounted(){
  	let that = this
  	document.onscroll=function(){
	  		that.scroll = document.body.scrollTop || document.documentElement.scrollTop;
//	  		console.log(that.scroll)
        if(that.scroll > 1000){
        	that.btnShow = true
        }else{
        	that.btnShow = false
        }
	  	}
  },
  components:{
  	MyHeader,
  	Banner
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
	.main-body{
		
	}
	.good-banner{
		min-height: 32rem;
		.banner-box{
			background-color: white;
			   /*background: -ms-linear-gradient(top, #000000 0%,#ffffff 100%);*/
			background:-webkit-gradient(linear, 0 75%, 0 110%, from(#FFFFFF), to(#c8c8c8));
			padding: 8.5rem 0;
		}
	}
	.detail .title{
		padding: 1rem 0;
		display: flex;
		background: white;
		border-bottom: 1px solid #eee;
		.left{
			width: 80%;
			padding-left: 1em;	
		}
		.right{
			width: 15%;
			text-align: center;
			display: flex;
			flex-flow:column ;
			align-items: center;
			border-left: 1px solid #DDD;
			span{
				font-size: 1.8rem;
			}
		}
	}
	.detail ul{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.detail-center{
		padding: .63rem;
		.iconfont{
			font-size: 1.2rem;
		}
	}
	.detail .detail-info{
		margin-top: 1px;
		padding: 1rem;
		background-color: white;
		font-size: 1.2rem;
		.price{
			color: #e8343b;
			font-size: 1.8rem;
			font-weight: 600;
		}
	}
	.detail{
		.good-color{
			background-color: white;
			border-bottom: 1px solid #C0C0C0;
			p{
				padding: 1rem 1rem 0;
				font-size: 1.2rem;
			}
			ul li:first-of-type a{
				background: #d8d8d8;
			}
			ul li:nth-of-type(2) a{
				color: #fff;
    		background: #f60;
			}
			ul{
				justify-content: flex-start;
				padding: 1rem;
				font-size: 1.2rem;
				a{
					background: #d8d8d8;
					display: inline-block;
			    height: 30px;
			    line-height: 30px;
			    text-align: center;
			    vertical-align: middle;
			    border-radius: .16rem;
			    padding: 0 .467rem;
			    box-sizing: border-box;
			    margin: .5rem .5rem 0 0;
			    cursor: pointer;
				}
			}
		}
		
		.detail-select{
			padding: 1rem;
   	 	background-color: #fff;
   	 	display: flex;
   	 	align-items: center;
			.min-img{
				width: 30%;
				border: 1px solid #C0C0C0;
		    vertical-align: middle;
		    height: 6.5rem;
			}
			.jia{
				padding: .5rem;
			}
			.small-text{
				margin-left: 1rem;
				font-size: 1.2rem;
				text-align: center;
				span{
					display: inline-block;
					margin-top: .2rem;
					color: #E51C23;
					font-size: 1.4rem;
					font-weight: 700;
				}
			}
			p:first-of-type img{
				padding-top: 2rem;
			}
			p img{
				display: inline-block;
				vertical-align: middle;
				padding-top: 1.2rem;
				max-width: 100%;
    		height: auto;
			} 	
		}
	}
	.body-content{
		img{
			min-height: 20px;
	    background-color: rgb(255, 255, 255);
	    opacity: 1;
	    transition: opacity 1s;
	    max-width: 100%;
    	height: auto;
		}
		.arguments ul li{
			display:flex;
			justify-content: space-between;
			align-items: center;
			padding: 1.2rem 2rem;
			border-bottom: 1px solid #ccc;
		}
		.arguments ul span:first-child{
			color: #c1c1c1;
		}
	}
	.mint-navbar{
		border-bottom: 1px solid #ccc; 
		.mint-tab-item-label{
			font-size: 2rem;
		}
	}
	.mint-navbar .mint-tab-item.is-selected{
    border-bottom: none;
		color: #E51C23;
    margin-bottom: 0;
	}
	.mint-tab-item-label{
		font-size: 2rem;
	}
	.gray-bg{
		background-color: #f2f2f2;
		.text-devide {
	    text-align: center;
	    position: relative;
	    padding: 1em 0;
	    margin: 0 1em;
	    z-index: 1;
	    .text-dark{
	    	background-color: #f2f2f2;
		    padding-left: 2em;
		    padding-right: 2em;
		    color: #444;
	    }
		}
		.text-devide:before{
			content: "";
		  display: block;
	    width: 100%;
	    border-bottom: 1px solid #e1e1e1;
	    position: absolute;
	    top: calc(50% - 1px);
	    z-index: -1;
		}
	}
	.gray-bg .list{
		display: flex;
		flex-wrap: wrap;
		li{
			width: 50%;
			background-color: white;
			padding: 1rem;
			box-sizing: border-box;
			border-bottom: 1px solid #e1e1e1;
			.img{
				min-height: 12rem;
			}
			.title{
				height: 3.5rem;
				text-overflow: ellipsis;
				font-size: 1.4rem;
				text-overflow: ellipsis;
		    display: -webkit-box;
		    -webkit-line-clamp: 2;
		    overflow: hidden;
			}
			p.price{
					margin-top: .8rem;
					color: #E51C23;
					font-weight: 700;
					clear: both;
					span{
						color: #c1c1c1;
						font-size: 1.3rem;
						font-weight: normal;
						float: right;
					}
				}
		}
		li:nth-of-type(odd){
			border-right: 1px solid #e1e1e1;
		}
		img{
			margin-top: 3rem;
			width: 100%;
			height: auto;
		}
	}
	.footer-nav{
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		background-color: #fff;
    text-align: center;
    border-top: 1px #e1e1e1 solid;
    z-index: 99;
    clear: both;
    .iconfont{
    	display: inline-block;
    	width: 30%;
    	padding: 1.5rem 0;
    }
    a{
    	float: right;
    	color: #fff;
	    padding: 1.5rem 0;
	    background-color: #FF9500;
	    width: 70%;
	    text-align: center;
    }
	}
</style>
