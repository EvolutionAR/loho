<template>
  <div class="banner-box">
    <div class="swiper-container banner">
    	<div class="swiper-wrapper">
    		<div class="swiper-slide" v-for="m in bannerImg">
    			<img :src="m.pic||src+m"/>
    		</div>
    	</div>
    	<div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script type="text/javascript">
	export default {
	  name: 'banner-box',
	  props:['bannerImg'],
	  swiper:null,
	  data () {
	    return {
	    	src:'http://image.loho88.com/'
	    }
	  },
	  mounted(){
	  	this.$options.swiper=new Swiper(".banner-box .banner",{
			  pagination:'.swiper-pagination',
			  autoplay: 2500,
			  autoplayDisableOnInteraction:false
			})
	  },
	  watch:{
	  	bannerImg(val){
	  		let that = this
	  		setTimeout(()=>{
	  			that.$options.swiper.update()
	  		},0)
	  	}
	  }
	}
</script>

<style scoped lang='scss'>
	.banner{
		.swiper-pagination-bullet-active{
			background: #333;
		}
		.swiper-pagination-bullet{
	    width: 1rem;
	    height: 1rem;
		}
		img{
			width: 100%;
			height: auto;
		}
	}
	
	.swiper-pagination-bullet{
    width: 1rem;
    height: 1rem;
  }
  .good-banner .swiper-container-horizontal>.swiper-pagination-bullets{
	    display: none;
		}
</style>
