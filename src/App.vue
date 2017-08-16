<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
	@import './styles/base.scss';
	
	#app{
		height: 100%;
		width: 100%;
		overflow-y: scroll;
	}
</style>
