<template>
	<div>
		<header class="header">
			<div class="left-back">
				<router-link to="/Main"><span class="iconfont icon-jiantou"></span></router-link>
			</div>
			<div class="logo">选择城市</div>
			<div class="menu">
				<router-link to="/car" class="car"><span class="iconfont icon-gouwuchekong"></span></router-link>
				<router-link to="/mine" class="me"><span class="iconfont icon-wode"></span></router-link>
			</div>
		</header>
		<div class="container">
			<div class="nowcity">
				<router-link :to="{path:'/nearby/'+encodeURI('体验店')+'/302'}">
					<div>当前城市:<span class="city">{{$route.params.city}}</span><span class="iconfont icon-jiantou-copy"></span></div>
				</router-link>
			</div>
			<div class="popularcity">
				<div class="title1"><span>热门城市</span></div>
				<ul>

					<li @click="getcity($event)" class="citylist" v-for="city in message.hot">
						<router-link :to="{path:'/nearby/'+encodeURI('体验店')+'/'+city.cityId}">{{city.cityName}}</router-link>
					</li>

				</ul>
			</div>
			<div class="allcity">
				<div class="title2"><span>全部城市</span></div>
				<ul>
					<li @click="getscroll($event)"  class="citylist" v-for="city in message.letters">
						<router-link to="">{{city}}</router-link>
					</li>
				</ul>
			</div>
			<div class="listcity">
				<div class="boxcity" v-for="(city,key) in message.list">
					<div><span class="zimu" @click="getTop($event)"  >{{key}}</span></div>
					<ul>
						<li v-for="i in city">
							<router-link :to="{path:'/nearby/'+encodeURI('体验店')+'/'+i.cityId}">{{i.cityName}}</router-link>
						</li>
					</ul>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'Position',
		data() {
			return {
				message: [],
				cityname: "北京",
				
			}
		},
		methods: {
			getscroll(e){
			var	kk=document.getElementsByClassName("zimu")
			for(var i=0;i<kk.length;i++){
				if(e.target.innerHTML==kk[i].innerHTML){
					var top=kk[i].offsetTop-61
				}
			}
			document.body.scrollTop=top
			},
			getdata() {
				axios.get("/store/clist", {}).then(function(msg) {
					this.message = msg.data.result
					console.log(this.message)
				}.bind(this))
			},
			getcity(e) {
				this.cityname = e.target.innerHTML
			}

		},
		mounted() {
			this.getdata()
		} 
	}
</script>

<style scoped lang='scss'>
	.top {
		top: 5.2rem
	}
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
	
	.container {
		padding-top: 5rem;
		overflow: hidden;
		.nowcity {
			margin: .6rem 0;
			height: 4.5rem;
			font-size: 1.6rem;
			background: white;
			div {
				height: 4.5rem;
				line-height: 4.5rem;
				margin-left: 1rem;
				.city {
					height: 4.5rem;
					font-size: 2rem;
					line-height: 4.5rem;
					margin-left: 1rem;
				}
				.icon-jiantou-copy {
					float: right;
					margin-right: 1rem;
				}
			}
		}
		.popularcity {
			.title1 {
				height: 4rem;
				font-size: 1.6rem;
				background: white;
				line-height: 4rem;
				span {
					margin-left: 1rem;
				}
			}
			ul {
				height: 4.5rem;
				margin: 0.5rem 0;
				background: white;
				display: flex;
				justify-content: space-around;
				align-items: center;
			}
		}
		.allcity {
			.title2 {
				height: 4rem;
				font-size: 1.6rem;
				background: white;
				line-height: 4rem;
				span {
					margin-left: 1rem;
				}
			}
			ul {
				display: flex;
				flex-wrap: wrap;
				li {
					text-align: center;
					box-sizing: border-box;
					line-height: 5rem;
					background: white;
					height: 5rem;
					width: 33.333%;
					border: 1px solid #F2F2F2;
				}
			}
		}
		.listcity {
			.boxcity {
				div {
					height: 4rem;
					line-height: 4rem;
					font-size: 1.8rem;
					font-weight: bold;
					span {
						display: block;
						height: 4rem;
						margin-left: 1rem;
					}
				}
				ul {
					display: flex;
					flex-wrap: wrap;
					width: 100%;
					li {
						background: white;
						line-height: 5rem;
						text-align: center;
						height: 5rem;
						width: 32%;
						margin-left: 1vw;
						margin-top: 0.6vw;
					}
				}
			}
		}
	}
</style>