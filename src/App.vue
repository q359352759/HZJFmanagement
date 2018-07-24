<template>
  <div id="app">
  	<router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
	html,body{
		height: 100%;
	}
	#app{
		height: 100%;
	}
	ul{
		margin: 0px;
		padding: 0px;
	}
	li{
		list-style: none;
	}
	*{padding: 0;margin:0;}
	#img{height:100%;width:100%;}
</style>
