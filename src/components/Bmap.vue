<template>
  <div class="bmap">
  		<div id="allmap"></div>
  		
  		<div class="swiper-box">
		    <div class="swiper-container banner">
		    	<div class="swiper-wrapper">
		    		<div class="swiper-slide" v-for="info in mapInfo">
		    			<p class="title">{{info.catName}}</p>
		    			<p class="address">{{info.chineseAddress}}</p>
		    		</div>
		    	</div>
		    </div>
		  </div>
  		
  </div>
  
</template>


<script>
export default {
  name: 'bmap',
  data () {
    return {
    	map:null,
    	mapInfo:null,
    	longitude:null,
    	latitude:null,
    	swiper:null,
    	index:0
    }
  },
  methods:{
  	//用经纬度设置地图中心点
		theLocation(){
			this.map.clearOverlays(); 
			this.longitude = this.mapInfo[this.index].bmapPositionX
			this.latitude = this.mapInfo[this.index].bmapPositionY
			var new_point = new BMap.Point(this.longitude,this.latitude);
			var marker = new BMap.Marker(new_point);  // 创建标注
			this.map.addOverlay(marker);              // 将标注添加到地图中
			this.map.panTo(new_point);      
		}
  },
	mounted(){
		var that = this
		this.mapInfo = this.$store.state.nearbyInfo.stores
		console.log(this.mapInfo,111)
		this.longitude = this.mapInfo[this.index].bmapPositionX
		this.latitude = this.mapInfo[this.index].bmapPositionY
		this.map = new BMap.Map("allmap");
		this.map.centerAndZoom(new BMap.Point(this.longitude,this.latitude),16);
		var top_left_navigation = new BMap.NavigationControl();
		this.map.addControl(top_left_navigation)
		this.map.enableScrollWheelZoom(true);
		this.theLocation()
		
		this.swiper = new Swiper('.swiper-container',{
			onSlideChangeEnd: function(swiper){
	      console.log(that.swiper.activeIndex)//切换结束时，告诉我现在是第几个slide
	      that.index = that.swiper.activeIndex
	      that.theLocation()
	    }
		})
	},
  watch:{
  	mapInfo(val){
  		let that = this
  		setTimeout(()=>{
  			that.swiper.update()
  		},0)
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
	.bmap{
		position: relative;
		height: 100%;
	}
	#allmap{
		width: 100%;
		height: 46rem;
	}
	.swiper-box{
		width: 80%;
		left: 10%;
		background: white;
		position: absolute;
		bottom: 3rem;
		.title{
			padding: 1rem 1rem;
			font-weight: 600;
		}
		.address{
			height: 6rem;
			padding: 1rem 1rem;
			border-top: 1px solid #e1e1e1;
		}
	}
</style>
