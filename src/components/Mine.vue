<template>
  <div class="mine">
  	<my-header :msg="$route.params.title"></my-header>
  	<div class="content">
  		<div><img src="/static/img/login-banner.png"/></div>
  		<div class="form-box">
  			<mt-navbar v-model="selected">
				  <mt-tab-item id="1">账号密码登录</mt-tab-item>
				  <mt-tab-item id="2">手机号码快捷登录</mt-tab-item>
				</mt-navbar>
				<form>
					<mt-tab-container v-model="selected">
					  <mt-tab-container-item id="1">
								<div class="row">
									<div><span class="iconfont icon-shouji"></span><input type="text" placeholder="请输入您的手机号码" v-model="phone"/></div>
								</div>
								<div class="row">
									<div class="yzm">
										<span class="iconfont icon-system-safe"></span><input id="code_input" type="text" placeholder="请输入图片验证码" v-model="yzm"/>
										<div id="v_container" style="width: 12.7rem;"></div>
									</div>
								</div>
								<div class="row">
									<div>
										<span class="iconfont icon-lock"></span><input type="text" placeholder="请输入密码" v-model="password"/>
									</div>
								</div>
					  </mt-tab-container-item>
					  <mt-tab-container-item id="2">
								<div class="row">
									<div><span class="iconfont icon-people"></span><input type="text" placeholder="请输入您的手机号码" v-model="phone"/></div>
								</div>
								<div class="row">
									<div>
										<span class="iconfont icon-duanxin"></span><input type="text" placeholder="请输入短信验证码"/>
										<mt-button type="danger">发送验证码</mt-button>
									</div>
								</div>
					  </mt-tab-container-item>
					</mt-tab-container>
					
					<footer>
			  		<div class="register"><router-link to="/register">注册</router-link></div>
			  		<div class="login"><button @click="submitForm">登录</button></div>
			  	</footer>
				</form>
  		</div>
  	</div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import MyHeader from './Header'
export default {
  name: 'Mine',
  data () {
    return {
    	selected:"1",
    	phone:'',
    	password:'',
    	yzm:'',
    	verifyCode:null
    }
  },
  methods:{
  	submitForm(){
  		var reg = /^[1][34578][0-9]{9}$/
  		var userInfo = JSON.parse(localStorage.user?localStorage.user:"[]")
  		console.log(userInfo)
  		if(this.selected == "1"){
  			if(this.phone && reg.test(this.phone) && this.verifyCode.validate(this.yzm)){
					for (var i = 0 ; i < userInfo.length ; i++) {
		  				if(this.phone == userInfo[i].name && this.password == userInfo[i].password){
		  					Toast('登录成功')
		  				}
  				}
  			}else{
  				Toast('您输入的信息有误');
  				return false
  			}
  		}
  	}
  },
  mounted(){
		this.verifyCode = new GVerify({
			id:'v_container',
			type:'number'
		})
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
		img{
			max-width: 100%;
		}
		.form-box{
			form{
				margin-top: 1rem;
			}
			.row{
				position: relative;
				box-sizing: border-box;
				width: 100%;
				height: 4.5rem;
				border-bottom: 1px solid #E1E1E1;
				background-color: white;
				padding-left: 2rem;
				div{
					width: 100%;
					height: 100%;
				}
			}
			.yzm{
				display: flex;
				input{
					width: 50%;
				}
			}
			.iconfont{
				vertical-align: middle;
				margin-top: 1rem;
				font-size: 2.2rem;
			}
			input{
				color: rgba(0,0,0,.75);
				height: 100%;
				border: none;
				margin-left: 1rem;
			}
			.mint-button{
				height: 100%;
				width: 12.5rem;
			}
		}
	}
	footer{
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		width: 100%;
		div{
			width: 50%;
			height: 5rem;
			text-align: center;
			a{
				line-height: 5rem;
				width: 100%;
			}
			button{
				border: none;
				background-color: #e8343b;
				line-height: 5rem;
				width: 100%;
			}
		}
		.register{
			background: white;
		}
		.login{
			background: #e8343b;
			button{
				color: white;
			}
		}
	}
	.mint-navbar .mint-tab-item.is-selected{
		border-bottom: 3px solid #e8343b;
    color: #e8343b;
    margin-bottom: -3px;
	}
</style>
