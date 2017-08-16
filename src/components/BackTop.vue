<template>
	<div class="back-top" v-show="btnShow">
		<button @click="backTop">回顶</button>
	</div>
</template>

<script>
	
export default {
  name: 'back-top',
  data () {
    return {
    	scoll : '',
	    btnShow : true
    }
  },
  methods:{
  	backTop(){
  		document.body.scrollTop = 0
  	}
  },
  mounted(){
  	let that = this
  	document.onscroll=function(){
	  	that.scroll = document.body.scrollTop || document.documentElement.scrollTop;
	    if(that.scroll > 1000){
	    	that.btnShow = true
	    }else{
	    	that.btnShow = false
	    }
	  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
	
</style>
