<template>
	<div class="components-container">
    	<script id="editor" type="text/plain"></script>
  	</div>
</template>

<script>
 	export default {
    	name: 'UE',
    	data () {
     		return {
        		editor: null
      		}
    	},
    	props: {
      		defaultMsg: {
        		type: String
      		},
      		config: {
        		type: Object
      		}
    	},
    	methods: {
	      	getUEContent() { // 获取内容方法
	        	return this.editor.getContent()
	      	},
	    },
	    mounted() {
	      	const _this = this;
	      	this.editor = UE.getEditor('editor', this.config); // 初始化UE
	      	this.editor.addListener("ready", function () {
	        	_this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
	      	});
	    },
	    watch:{
			defaultMsg(x){
				console.log(x)
				this.editor.setContent(x); // 确保UE加载完成后，放入内容。
			}
       },
	    destroyed() {
//	    	console.log('销毁')
	      	this.editor.destroy();	//销毁
	    }
  	}
</script>

<style>
</style>