<template>
  <footer class="footer-nav">
		<router-link to="/main">
			<span class="iconfont icon-shouye"></span>
			<span>首页</span>
		</router-link>
		<router-link :to="{path:'/new/'+encodeURI('新品上市')+'/222'}">
			<span class="iconfont icon-xinpin"></span>
			<span>新品</span>
		</router-link>
		<router-link :to="{path:'/nearby/'+encodeURI('体验店')+'/302'}">
			<span class="iconfont icon-fujin"></span>
			<span>附近体验店</span>
		</router-link>
		<router-link :to="{path:'/mine/'+encodeURI('我的')}">
			<span class="iconfont icon-wode"></span>
			<span>我的</span>
		</router-link>
	</footer>
</template>

<script>
	
export default {
  name: 'FooterNav',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
	.footer-nav{
		width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 996;
    border-top: 1px solid #E7E7E7;
    background: white;
    display: flex;
    a{
    	flex-grow: 1;
    	display: flex;
    	flex-flow: column;
    	align-items: center;
    	span{
    		font-size: 1rem;
    		padding-bottom: .3rem;
    	}
    	.iconfont{
    		font-size: 2.8rem;
    		margin-bottom: -.8rem;
    	}
    }
	}
</style>
