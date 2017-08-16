<template>
  <div class="register">
  <header class="header">
			<div class="left-back">
				<span @click="$router.go(-1)"><span class="iconfont icon-jiantou"></span></span>
			</div>
			<div class="logo">手机快速注册</div>
			<div class="menu">
				<router-link to="/car" class="car"><span class="iconfont icon-gouwuchekong"></span></router-link>
				<router-link to="/mine" class="me"><span class="iconfont icon-wode"></span></router-link>
			</div>
	</header>
	 <div class="container">
	 	<ul>
	 	<li class="phone">
	 		<div class="text">手机号</div> <div class="text1"><input type="text" placeholder="请输入手机号" v-model="phone"/></div>
	 	</li>
	 	<li class="pic">
	 		<div class="text">图形验证码</div> <div class="text1"><input type="text" id="code_input" placeholder="输入图形验证码" v-model="yzm"/><div id="v_container"></div></div>
	 	</li>
	 	<li class="pic1">
	 		<div class="text">验证码</div> <div class="text1"><input type="text" placeholder="请输入短信验证码"/><div class="fasong">发送验证码</div></div>
	 	</li>
	 	<li class="password">
	 		<div class="text">密码</div> <div class="text1"><input class="test11" type="text" placeholder="请输入6-20位数字/字母的组合" v-model="password"/></div>
	 	</li>
	 	<li class="password1">
	 		<div class="text">确认密码</div> <div class="text1"><input class="test11" type="text" placeholder="请在输入一次" v-model="passwordTwo"></div>
	 	</li>
	 	</ul>
	 </div>
	<div class="textbottom" @click="handleClick">
		<div class="resigter">
			完成注册
		</div>
	</div>
	
	
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  name: 'Register',
  data () {
    return {
    	verifyCode:null,
    	phone:'',
    	password:'',
    	yzm:'',
    	passwordTwo:''
    }
  },
  methods:{
  	handleClick(){
  		var that = this
  		var phoneReg = /^[1][34578][0-9]{9}$/
  		var pswReg = /^.*[A-z]+.*$/
  		if(that.phone && that.password && that.passwordTwo && that.yzm){
  			if(phoneReg.test(this.phone) && pswReg.test(this.password) && this.verifyCode.validate(this.yzm)){
  				if(this.password == this.passwordTwo){
  					console.log(this.phone,this.password)
  					console.log(localStorage)
  					var userInfo = JSON.parse(localStorage.user?localStorage.user:'[]')
  					userInfo.push({
  						name:this.phone,
  						password:this.password
  					})
  					localStorage.user = JSON.stringify(userInfo)
  					Toast("注册成功")
  				}else{
  					Toast("两次密码不一致")
  				}
  			}else{
  				Toast("所填信息有误")
  			}
  		}else{
  			Toast("所填信息有误")
  		}
  	}
  },
  mounted(){
  	this.verifyCode = new GVerify("v_container");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
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
		padding-top: 6rem;
		overflow: hidden;
		ul{
			li{
				background: white;
				height:5rem;
				.text{
					line-height: 4.9rem;
					width: 25%;
					text-align: center;
					float: left;
				}
				.text1{
					width: 75%;
					line-height: 4.9rem;
					float: left;
					border-bottom: 0.1rem solid #BDBDBD;
					input{		
						float: left;
						height: 4.9rem;
						line-height: 4.9rem;
						border: none;
					}
					.fasong{
						float: right;
						height: 5rem;
						width: 9rem;
						background: #e8343b;
						color: white;
						text-align: center;
					}
					#v_container{
						float: right;
						height: 5rem;
						width: 9rem;
					}
					.test11{
						width: 100%;
						}
					}
			}
		}
	}
	.textbottom{
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		div{
		width: 100%;
		height: 6rem;
		line-height:6rem ;
		text-align: center;
		background: #e8343b;
		color: white;
	    border-color: #e8343b!important;
	    outline: 0!important;
	    cursor: default!important;
	    pointer-events: none;
		}
	}
</style>