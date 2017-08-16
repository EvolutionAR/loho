<template>
  <div class="main">
  	<header class="header">
  		<div class="position"><router-link :to="{path:'/position/'+encodeURI('北京')}">北京<span class="iconfont icon-chevron-copy-copy-copy-copy-copy"></span></router-link></div>
  		<div class="logo"></div>
  		<div class="menu">
  			<router-link :to="{path:'/car/'+encodeURI('我的购物车')}" class="car"><span class="iconfont icon-gouwuchekong"></span></router-link>
  			<router-link :to="{path:'/mine/'+encodeURI('我的')}" class="me"><span class="iconfont icon-wode"></span></router-link>
  		</div>
  	</header>
  	<div class="container" id="container">
  		<banner :bannerImg="message?message.focus:null"></banner>
  		<ul class="classes">
  			<li v-for="m in message?message.cates:null">
  				<router-link :to="{path:'/new/'+encodeURI(m.tag)+'/'+m.tid}"><img v-lazy="m.pic"/><span>{{m.tag}}</span></router-link>
  			</li>
  		</ul>
  		<div class="ad">
  			<router-link to=""><img v-lazy="message?message.ad[0].pic:null"/></router-link>
  		</div>
  		<div class="showcase">
  			<ul class="showcase-list">
  				<li>
  					<div class="show-head">
  						<h2><span>人气推荐</span><a href="#" class="more">更多></a></h2>
  					</div>
  					<router-link to='' class="show-banner"><img v-lazy="message?message.popular.img.pic:null"/></router-link>
  					<ul class="row-list">
  						<li class="row-item" v-for="m in message?message.popular.show:null">
  							<router-link :to="{path:'/productions/'+m.gid}">
  								<p class="item-title">{{m.tag}}</p>	
  								<p class="item-detail">{{m.tag_en}}</p>	
  								<p class="item-img"><img v-lazy="m.pic"/></p>	
  							</router-link>
  						</li>
  					</ul>
  				</li>
  				
  				<li v-for="info in message?message.classify:null">
  					<div class="show-head">
  						<h2><span>{{info.title.word}}</span><a href="#" class="more">{{info.more.word}}</a></h2>
  					</div>
  					<a href="#" class="show-banner"><img v-lazy="info.img.pic"/></a>
  					<ul class="row-list second-row-list">
  						<li class="row-item" v-for="m in info.show">
  							<router-link :to="{path:'/productions/'+m.gid}">
  								<p class="item-title">{{m.tag}}</p>	
  								<p class="item-detail">{{m.tag_en}}</p>	
  								<p class="item-img"><img v-lazy="m.pic"/></p>	
  							</router-link>
  						</li>
  					</ul>
  				</li>
  			</ul>
  		</div>
  		
  		<div class="like">
  			<h2 @click="isShow=!isShow">你可能喜欢<span class="iconfont icon-chevron-copy-copy-copy-copy-copy"></span></h2>
  			<div v-if="isShow">
	  			<ul class="like-list" v-infinite-scroll="loadMore"
					  infinite-scroll-disabled="loading"
					  infinite-scroll-distance="10">
	  				<li v-for="info in likeInfo?likeInfo:null">
	  					<router-link :to="{path:'/productions/'+info.goodsId}">
	  						<p class="img"><img v-lazy="src+info.img"/></p>	
								<p class="title">{{info.title}}</p>	
								<p class="price">￥ {{info.price}}</p>	
							</router-link>
	  				</li>
	  			</ul>
	  			<div class="add" @click="addMore">{{addInfo}}</div>
	  		</div>	
  		</div>
  		
  		<div class="footer">
  			<div class="first">
  				<div class="left">
  					<span class="iconfont icon-weizhi"></span>欢迎体验店试镜
  				</div>
  				<div class="right">
  					<span class="iconfont icon-dianhua"></span>预约热线：400-887-1920
  				</div>
  			</div>
  			<footer>
  				<img src="/static/img/loho.jpg"/>
  			</footer>
  			<div class="third">
  				<p>©2005-2016 XXXX有限公司版权所有，并保留所有权利。</p>
  			</div>
  		</div>
  		<footer-nav></footer-nav>
  	</div>
  	<div class="back-top" v-show="btnShow">
  		<p @click="backTop"><span class="iconfont icon-u-arrow3-right"></span></p>
  	</div>
  </div>
</template>

<script>
	import axios from 'axios'
	import FooterNav from './FooterNav'
	import Banner from './Banner'
	export default {
	  name: 'Main',
	  data () {
	    return {
	    	scoll : '',
	    	isShow : true,
	    	btnShow : false,
	    	message : null,
	    	likeInfo : null,
	    	src:"http://image.loho88.com/",
	    	addInfo:"点击加载更多..."
	    }
	  },
	  methods:{
	  	backTop(){
	  		document.body.scrollTop = 0
	  	},
	  	loadMore(){
	  		let that = this
	  		if(!this.likeInfo){
		  		axios.get("/search/",{
		  			params:{
		  				sort:"o6",
		  				e:249,
		  				page:1
		  			}
		  		})
		  			.then(function(msg){
		  				that.likeInfo = msg.data.result.data
		  				console.log(that.likeInfo,222)
			  	})
	  		}
	  	},
	  	addMore(){
	  		let that = this
	  		axios.get("/search/",{
	  			params:{
	  				sort:"o6",
	  				e:249,
	  				page:2
	  			}
	  		})
	  			.then(function(msg){
//	  				console.log(msg.data.result.data,1)
	  				let newInfo = msg.data.result.data
	  				newInfo.forEach((item,i)=>{
	  					that.likeInfo.push(item)
	  				})
	  				console.log(that.likeInfo)
		  	})
	  		setTimeout(function(){
	  			that.addInfo = "已经到底部了"
	  		},1500)
  		}
	  },
	  mounted(){
	  	let that = this
	  	if(this.$store.state.message){
	  		this.message = this.$store.state.message
	  	}else{
	  		axios.get("/index",{})
	  			.then(function(msg){
	  				that.$store.state.message = msg.data.result
	  				that.message = that.$store.state.message
//	  				console.log(that.$store.state.message)
	  		})
	  	}
	  	document.onscroll=function(){
	  		that.scroll = document.body.scrollTop || document.documentElement.scrollTop;
        if(that.scroll > 1000){
        	that.btnShow = true
        }else{
        	that.btnShow = false
        }
	  	}
	  },
	  components:{
	  	FooterNav,
	  	Banner
	  }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
	.main{
		height: 100%;
		background: #f2f2f2;
	}
	.container{
		padding-top: 5rem;
		position: relative;
		overflow: hidden;
		padding-bottom: 5.7rem;
	}
	.header{
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
    .position{
    	span.iconfont{
    		display: inline-block;
    		font-style: normal;
		    font-weight: 800;
		    font-size: 1.5rem;
		    margin-left: .5rem;
		    margin-top: .3rem;
    	}
    }
    .logo{
    	height: 2.5rem;
    	background: url("http://static.loho88.com/assets/images/logo.head.png") no-repeat center center;
    	background-size: contain;
    }
    .menu{
    	display: flex;
    	justify-content: space-around;
    	.car{
    		margin-left: 1rem;
    	}
    	.iconfont{
    		font-size: 2.3rem;
    	}
    }
		div{
			width: 33.3%;
			text-align: center;
			line-height: 5rem;
			font-size: 2rem;
			a{
				font-size: 1.5rem;
				line-height: 5rem;
			}
		}
	}
	.classes{
		background: white;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		li{
			width: 25%;
			height: 10.8rem;
			text-align: center;
			a{
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: space-around;
				flex-flow: column;
			}
			img{
				margin-top: 2.4rem;
				width: 54%;
				height: auto;
			}
		}
	}
	.ad{
		padding: 0 1rem;
		margin: 1rem 0;
		
		img{
			width: 100%;
			height: auto;
		}
	}
	
	.showcase{
		background: white;
		width: 100%;
		ul{
			overflow: hidden;
		}
		h2{
			background-color: #fff;
	    margin: 0;
	    padding: .84rem 2.4rem;
	    font-size: 1.6rem;
	    font-weight: 700;
	    span{
	    	color: #000000;
	    	font-weight: 600;
	    }
	    a{
	    	float: right;
	    	color: #bdbdbd;
	    	font-weight: normal;
	    }
		}
		h2::before{
    	content: '';
	    display: inline-block;
			width: .4rem;
	    height: 1.6rem;
	    background-color: red;
	    border-radius: 1rem;
	    margin-right: .25rem;
	    margin-bottom: .1rem;
	    vertical-align: middle;
		}
		.show-banner img{
			width: 100%;
			height: auto;
		}
		.row-list .row-item{
			text-align: center;
			box-sizing: border-box;
			width: 50%;
			float: left;
			background-color: white;
			padding: 1rem;
			font-size: 1.4rem;
			border-bottom: 1px solid #e5e5e5;
			border-right: 1px solid #e5e5e5;
			.item-detail{
				color: #c1c1c1;
			}
			.item-img{
				padding-top: 2rem;
			}
			img{
				width: 100%;
				height: auto;
			}
		}
		.second-row-list li:first-of-type{
			vertical-align: middle;
			min-height: 25.84rem;
			padding-top: 6.3rem;
		}
		.showcase-list li:nth-of-type(7) .row-item{
			min-height: auto;
			padding: 1rem;
		}
	}
	
	.like{
		background-color: white;
		margin-top: 1rem;
		h2{
			padding: 1.4rem 0;
			text-align: center;
			font-size: 1.8rem;
			color: #222222;
			border: 1px solid #e1e1e1;
			.iconfont{
				color: #222;
				margin-left: 1rem;
				font-weight: 600;
			}
		}
		.like-list{
			position: relative;
			overflow: hidden;
			background-color: white;
			display: flex;
			flex-wrap: wrap;
			li{
				box-sizing: border-box;
				padding: 1rem;
				width: 50%;
				text-align: center;
				border-bottom: 1px solid #e1e1e1;
				p.img{
					min-height: 12rem;
				}
				p.title{
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
				}
				img{
					margin-top: 2.5rem;
					width: 100%;
					height: auto;
				}
			}
		}
		.like-list li:nth-of-type(odd){
			border-right: 1px solid #e1e1e1;
		}
	}
	.add{
		text-align: center;
		line-height: 2.5rem;
		padding: 1rem 0;
		color: #ababab;
		background: #f2f2f2;
	}
	.footer{
		background-color: #101010;
		color: white;
		.iconfont{
			font-size: 2rem;
			color: #E51C23;
			font-weight: 600;
			vertical-align: middle;
			padding-right: 1rem;
		}
		.first{
			overflow: hidden;
			text-align: center;
			border-bottom: 1px solid #1f1f1f;
			.left{
				box-sizing: border-box;
				padding: 2rem 0;
				float: left;
				width: 50%;
				border-right: 1px solid #1f1f1f;
			}
			.right{
				box-sizing: border-box;
				padding: 2rem 0;
				float: right;
				width: 50%;
				font-size: 1.2rem;
			}
		}
		footer{
			padding: 1rem 0;
			text-align: center;
			background: #000;
			border-bottom: 1px solid #1f1f1f;
		}
		.third{
			padding: 2rem 0;
			text-align: center;
			font-size: 1.2rem;
		}
	}
	
</style>
