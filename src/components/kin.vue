<template>
	<div id="kin">
		<textarea id="editor_id" name="content" style="width:700px;height:300px;"></textarea>
	</div>
</template>

<script>
	export default {
    	name: 'kin',
    	data () {
     		return {

      		}
    	},
    	props:{

    	},
    	methods:{

	    },
	    mounted(){
//	    	KindEditor.ready(function(K) {
//              window.editor = K.create('#editor_id');
//      	});
//	    	var options = {
//			        cssPath : '/css/index.css',
//			        filterMode : true
//				};

	    	KindEditor.ready(function(K) {
		               K.create('#editor_id',{
		                	width:'100%',
		                	resizeType:1,
		                	uploadJson : 'http://192.168.2.146:8080/zlwymaster/platform/kindeditor/upload',
			                fileManagerJson : 'http://192.168.2.146:8080/zlwymaster/platform/kindeditor/upload',
//			                allowFileManager : true
		                	//resizeType 2或1或0，2时可以拖动改变宽度和高度，1时只能改变高度，0时不能拖动。  数据类型: Int  默认值: 2
		                });
		        });
	    },
	    destroyed(){

	    }
  	}
</script>

<style>
</style>
