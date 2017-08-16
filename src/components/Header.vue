<template>
	<header class="header">
		<div class="back"><span @click="$router.go(-1)"><span class="iconfont icon-jiantou"></span></span></div>
  		<div class="title">{{msg}}</div>
  		<div class="menu">
  			<router-link :to="{path:'/car/'+encodeURI('我的购物车')}" class="car"><span class="iconfont icon-gouwuchekong"></span></router-link>
  			<router-link to="/mine" class="me"><span class="iconfont icon-shouye"></span></router-link>
  		</div>
	</header>
</template>

<script>
	
export default {
  name: 'header',
  props:['msg'],
  data () {
    return {
    	message:"首页"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
	.header{
		border-top: 1px solid #E1E1E1;
		border-bottom: 1px solid #E1E1E1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: white;
		position: fixed;
	    width: 100%;
	    top: 0;
	    left: 0;
	    line-height: 5rem;
	    height: 5rem;
	    z-index: 99;
	    .iconfont{
	    	padding-right: 2rem;
	    	font-size: 2rem;
	    }
	    .title{
	    	font-size: 1.6rem;
	    	margin-left: 1.5rem;
	    }
	    .back{
	    	margin-left: 2.2rem;
	    }
	}
</style>
