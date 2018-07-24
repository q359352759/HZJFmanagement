<template>
	<div class="" id="commodityUpload">
		<section class="content-header">
			<h1>
        		{{title}}
        		<small>Version 1.0</small>
      		</h1>
			<ol class="breadcrumb">
				<li>
					<a href="javascript:;"><i class="fa fa-dashboard"></i> Home</a>
				</li>
				<li class="active">Dashboard</li>
			</ol>
		</section>
		<section class="content">
			<div class="row">
				<form @submit.prevent="form_1()">
					
				<div class="col-lg-6">
					<div class="nav-tabs-custom">
	            <!-- Tabs within a box -->
			            <ul class="nav nav-tabs">
			              	<li class="active"><a href="#commodityUpload_1" data-toggle="tab" aria-expanded="false">商品属性</a></li>
			              	<li class=""><a href="#commodityUpload_2" data-toggle="tab" aria-expanded="true">商品图片</a></li>
			              	<li class=""><a href="#commodityUpload_3" data-toggle="tab" aria-expanded="true">商品描述</a></li>
			            </ul>
			            <div class="tab-content no-padding">
			              <!-- Morris chart - Sales -->
			              	<div class="tab-pane active" id="commodityUpload_1">
			              		<div class="box-body form-horizontal">			             
					            	<div class="form-group">
										<label class="col-sm-2 control-label">产品分类</label>
										<div class="box_1 col-sm-10">
											<select class="form-control" @change="classification(classification_1,false,false)" v-model="classification_1">
												<option v-for="x in classification_list_1" :value="x">{{x.name}}</option>
											</select>
											 <select class="form-control" @change="classification(false,classification_2,false)" v-model="classification_2">
												<option v-for="x in classification_list_2" :value="x">{{x.name}}</option>
											</select>
											 <select v-if="classification_3" class="form-control" v-model="classification_3">
												<option v-for="x in classification_list_3" :value="x">{{x.name}}</option>
											</select>
										</div>
									</div>
									<div class="form-group">
										<label class="col-sm-2 control-label">商品名称</label>
										<div class="col-sm-10">
											<input type="text" required="" pattern=".*[^ ].*" class="form-control" v-model="product.productname"/>
										</div>
									</div>
									<div class="form-group">
										<label class="col-sm-2 control-label">赠送比例(%)</label>
										<div class="col-sm-10">
											<input type="number" required="" min="1" pattern=".*[^ ].*" max="100" class="form-control" v-model="product.scalenum"/>
										</div>
									</div>
									<div class="form-group">
										<label class="col-sm-2 control-label">广告词</label>
										<div class="col-sm-10">
											<input type="text" class="form-control" v-model="product.shortdescription" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-sm-2 control-label">显示顺序</label>
										<div class="col-sm-10">
											<input type="number" class="form-control" v-model="product.displaysequence" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-sm-2 control-label">市场价</label>
										<div class="col-sm-10">
											<input type="number" required="" min="1" step="0.01" class="form-control" v-model="product.marketprice" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-sm-2 control-label">销售价</label>
										<div class="col-sm-10">
											<input type="number" required="" min="1" step="0.01" class="form-control" v-model="product.minsaleprice" />
										</div>
									</div>
									<div class="form-group">
										<label class="col-sm-2 control-label">重量</label>
										<div class="col-sm-10">
											<input type="text" class="form-control" v-model="product.weight"/>
										</div>
									</div>
									<div class="form-group">
										<label class="col-sm-2 control-label">体积</label>
										<div class="col-sm-10">
											<input type="text" class="form-control" v-model="product.volume"/>
										</div>
									</div>
									<div class="form-group">
										<label class="col-sm-2 control-label">计量单位</label>
										<div class="col-sm-10">
											<input type="text" class="form-control" v-model="product.measureUnit"/>
										</div>
									</div>
									<div class="form-group">
										<label class="col-sm-2 control-label">是否是促销</label>
										<div class="col-sm-10">
											<select name="" v-model="product.ispromotion" class="form-control">
												<option value="0">不是</option>
												<option value="1">是</option>
											</select>
										</div>
									</div>
					            </div>
			              	</div>
			              	<div class="tab-pane" id="commodityUpload_2">
			              		<div class="box-body" style="min-height: 500px;">
			              			<div class="box">
			              				<div class="box-header">
			              					<button @click="add_img(imagepath_list,2)" type="button" class="btn btn-info btn-sm">添加图片</button>
			              				</div>
			              				<div class="box-body">
			              					<ul class="img_list">
			              						<li v-for="(x,$index) in imagepath_list">
			              							<img :src="x"/>
			              							<div @click="delete_1(imagepath_list,$index)">
			              								<span class="glyphicon glyphicon-remove"></span>
			              							</div>
			              						</li>
			              					</ul>
			              				</div>
			              			</div>
			              		</div>
			              	</div>
			            	<div class="tab-pane " id="commodityUpload_3" style="min-height: 500px;">
			            		<div class="box-body">
			            			<UE :defaultMsg='defaultMsg' :config='config' ref="ue"></UE>
							    	<!--<button type="button" @click="getUEContent()">获取内容</button>-->
							    	<!--<kin></kin>-->
			            		</div>
			            	</div>
			            </div>
	          		</div>
				</div>
				<div class="col-lg-6">
					<div class="box">
						<div class="box-header">
			              	<h3 class="box-title">
			              		商品规格设定
			              	</h3>
			              	<div class="pull-right box-tools">
			                	<button type="button" @click="add(false)" class="btn btn-info btn-sm">添加规格</button>
			              	</div>
			            </div>
			            <div class="box-body">
			            	<ul class="specification">
			            		<li class="" v-for="(x,$index) in productCategory_list">
			            			<header>
			            				<div class="row">
			            					<div class="col-lg-6">
			            						<div class="input-group">
													<input type="text" required="" pattern=".*[^ ].*" class="form-control" v-model="x.color" placeholder="颜色/规格" />
													<div class="input-group-btn">
												    	<button type="button" @click="delete_1(productCategory_list,$index)" class="btn btn-danger">删除</button>
												    </div>
												    <div class="input-group-btn">
												    	<button type="button" @click="add(x.data)" class="btn btn-info">添加</button>
												    </div>
												</div>
			            					</div>
			            				</div>
			            			</header>
			            			<ul>
			            				<li v-for="(y,$index) in x.data">
			            					<header>
			            						<div class="row">
			            							<div class="col-lg-6">
			            								<div class="input-group">
													        <input type="text" required="" pattern=".*[^ ].*" class="form-control" v-model="y.size" placeholder="尺寸" />
													        <div class="input-group-btn">
												            	<button type="button" @click="delete_1(x.data,$index)" class="btn btn-danger">删除</button>
												            </div>
												            <div class="input-group-btn">
														    	<button type="button" @click="add(y.data)" class="btn btn-info">添加</button>
														    </div>
													    </div>
					            					</div>
			            						</div>
			            					</header>
			            					<ul>
			            						<li v-for="(z,$index) in y.data">
			            							<div class="img_box" @click="add_img(z,1)">
			            								<span v-if="!z.showpic">展示图片</span>
			            								<img v-if="z.showpic" :src="z.showpic"/>
			            							</div>
			            							<div class="input-group">
			            								<input type="text" required="" pattern=".*[^ ].*" class="form-control" v-model="z.versionstr" placeholder="版本号" />
												        <span class="input-group-addon">-</span>
												        <input type="number" required="" min="0" class="form-control" v-model="z.stock" placeholder="库存" />
												        <span class="input-group-addon">-</span>
												        <input type="number" required="" min="0" step="0.1" class="form-control" v-model="z.costprice" placeholder="成本价" />
												        <span class="input-group-addon">-</span>
												        <input type="number" required="" min="0" step="0.1" class="form-control" v-model="z.saleprice" placeholder="销售价" />
												        <div class="input-group-btn">
											            	<button type="button" @click="delete_1(y.data,$index)" class="btn btn-danger">删除</button>
											            </div>
												    </div>
			            						</li>
			            					</ul>
			            				</li>
			            			</ul>
			            		</li>
			            	</ul>
			            </div>
					</div>
				</div>
				
				<div class="col-lg-12">
					<div class="box">
						<div class="box-body">
							<button type="submit" class="btn btn-block btn-info">提交</button>
						</div>
					</div>
				</div>
				
				</form>
				
				<div class="modal fade myModal_1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				    <div class="modal-dialog">
				        <div class="modal-content">
				            <div class="modal-header">
				                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				                <h4 class="modal-title" id="myModalLabel">图片裁剪</h4>
				            </div>
				            <div class="modal-body">
				            	<div class="cropper"></div>
				            </div>
				            <div class="modal-footer">
				                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				                <button type="button" @click="Determine_cropper()" class="btn btn-primary">提交更改</button>
				            </div>
				        </div><!-- /.modal-content -->
				    </div><!-- /.modal -->
				</div>
				
				<div class="modal fade myModal_2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				    <div class="modal-dialog">
				        <div class="modal-content">
				            <div class="modal-header">
				                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				                <h4 class="modal-title" id="myModalLabel">提示</h4>
				            </div>
				            <div class="modal-body">
				            	{{Prompt}}
				            </div>
				            <!--<div class="modal-footer">
				                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				                <button type="button"  class="btn btn-primary">提交更改</button>
				            </div>-->
				        </div><!-- /.modal-content -->
				    </div><!-- /.modal -->
				</div>
				
				<div class="flie_box hidden">
					<input type="file" accept="image/*" />
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	import Vue from 'vue'
	import UE from '@/components/ue.vue';
//	import kin from '@/components/kin.vue';
	//裁剪
	import '@/assets/cropper/cropper.css'
	import '@/assets/cropper/cropper';
	import {http,base64_splicing} from '@/assets/fc';
	export default{
		components:{
			UE,
//			kin
		},
		data(){
			return{
				title:'产品设置',
				defaultMsg: '',		//编译器内容
		        config:{					//编译器配置
		          	initialFrameWidth: null,
		          	initialFrameHeight: 350,
		          	toolbars:[
					    	[
					        'undo', //撤销
					        'bold', //加粗
					        'italic', //斜体
					        'underline', //下划线
					        'strikethrough', //删除线
					        'subscript', //下标
					        'fontborder', //字符边框
					        'superscript', //上标
					        'formatmatch', //格式刷
					        'source', //源代码
					        'pasteplain', //纯文本粘贴模式
					        'selectall', //全选
					        'preview', //预览
					        'horizontal', //分隔线
					        'removeformat', //清除格式
					        'time', //时间
					        'date', //日期
					        'inserttitle', //插入标题
					        'cleardoc', //清空文档
					        'fontfamily', //字体
					        'fontsize', //字号
					        'paragraph', //段落格式
//					        'simpleupload', //单图上传
					        'insertimage', //多图上传
					        'emotion', //表情
					        'spechars', //特殊字符
					        'searchreplace', //查询替换
					        'insertvideo', //视频
					        'help', //帮助
					        'justifyleft', //居左对齐
					        'justifyright', //居右对齐
					        'justifycenter', //居中对齐
					        'justifyjustify', //两端对齐
					        'forecolor', //字体颜色
					        'backcolor', //背景色
					        'insertcode',	//语言
					        'insertorderedlist', //有序列表
					        'insertunorderedlist', //无序列表
					        'fullscreen', //全屏
					        'directionalityltr', //从左向右输入
					        'directionalityrtl', //从右向左输入
					        'rowspacingtop', //段前距
					        'rowspacingbottom', //段后距
					        'pagebreak', //分页
					        'imagenone', //默认
					        'imageleft', //左浮动
					        'imageright', //右浮动
					        'imagecenter', //居中
					        'wordimage', //图片转存
					        'lineheight', //行间距
					        'edittip ', //编辑提示
					        'customstyle', //自定义标题
					        'autotypeset', //自动排版
					        'background', //背景
					        'template', //模板
					        'scrawl', //涂鸦
					        'charts', // 图表
					    ]
					]
		        },
        
				ue:{},		//editor保存的对象
				Prompt:'',	//提示
				product:{	//产品对象
					ispromotion:0,
					volume:'',
				},			
				imagepath_list:[],	//产品图片
				productCategory_list:[
					{
						'color':'',		//颜色
						'data':[		
							{
								'size':'',	//尺寸
								'data':[
									{
										'versionstr':'',	//版本
										'stock':'',			//库存
										'costprice':'',		//成本价
										'saleprice':'',		//销售价
										"showpic":''		//显示图片
									}
								]
							}
						]
					}
				],	//规格
				classification_list:[],		//总的分类列表
				classification_list_1:[],	//分类1
				classification_list_2:[],	//分类2
				classification_list_3:[],	//分类3
				classification_1:{},	
				classification_2:{},	
				classification_3:{},
				img_obj:{},		//添加图片的对象
				img_type:'',	//裁剪图片类型
				img_size:'',		//裁剪图片大小
				add_type:1,		//添加图片的位置 1 产品规格的图片 2表示产品的图片
				shopid:'',		//商品Id
			}
		},
		methods:{
			//获取富文本内容
			getUEContent() {
		        let content = this.$refs.ue.getUEContent();
		        console.log(content)
		    },
			//提交
			form_1(){
				var obj=this.product;
					obj.imagepath=this.imagepath_list.join(',');
					
					//判断规格是否有图片
					var sub=true
					var productCategory_list=this.productCategory_list
					console.log(productCategory_list)
					for(var i=0;i<productCategory_list.length;i++){
						var a=productCategory_list[i].data;
						for(var j=0;j<a.length;j++) {
							var b=a[j].data;
							for(var k=0;k<b.length;k++){
								if(!b[k].showpic || b[k].showpic==''){
									sub=false;
								}
							}
						}
					}
					if(!sub){
						this.$message({
				          	showClose: true,
				          	message: '请设置商品规格的图片',
				          	type: 'error'
				        });
						return;
					}
					
					obj.skus=JSON.stringify(this.productCategory_list);
					var categorypath=[];
					if(this.classification_1.id){
						categorypath.push(this.classification_1.id)
					}
					if(this.classification_2.id){
						categorypath.push(this.classification_2.id)
					}
					if(this.classification_3.id){
						categorypath.push(this.classification_3.id)
					}
					obj.categotyid=categorypath[categorypath.length-1];
					obj.categorypath=categorypath.join('|');
					obj.typeid='';
					obj.brandid='';
					obj.freighttemplateid='';
					obj.particulars=this.$refs.ue.getUEContent();
					
					console.log(obj);
					if(!obj.id){
						console.log('增加')
						http('post','/mall/mobile/product/upload',obj,this.upload_return);
					}else{
						console.log('修改')
						http('post','/mall/mobile/product/UpdateProduct',obj,this.upload_return);
					}
					
			},
			upload_return(x){
				console.log(x)
				if(x==true){
					this.$alert('设置成功', '提示', {
			          	confirmButtonText: '确定',
			          	callback: action => {
//			          		window.history.back();
							this.$router.push('/index/productList')
			          	}
			    	});
				}else{
					this.$alert('设置失败，请联系管理元', '提示', {
			          	confirmButtonText: '确定',
			          	callback: action => {}
			    	});
				}
				
			},
			//选择图片
			add_img(x,y){
				this.img_obj=x;
				this.add_type=y;
				$('#commodityUpload .flie_box').html('<input type="file" accept="image/*" />');
				$('#commodityUpload .flie_box').children().click();
			},
			//添加规格
			add(x){
				if(!x){
					this.productCategory_list.push({
						'color':'',		//颜色
						'data':[		
							{
								'size':'',	//尺寸
								'data':[
									{
										'versionstr':'',	//版本
										'stock':'',			//库存
										'costprice':'',		//成本价
										'saleprice':'',		//销售价
										"showpic":''		//显示图片
									}
								]
							}
						]
					})
				}else{
					x.push({
						'color':'',		//颜色
						'data':[		
							{
								'size':'',	//尺寸
								'data':[
									{
										'versionstr':'',	//版本
										'stock':'',			//库存
										'costprice':'',		//成本价
										'saleprice':'',		//销售价
										"showpic":'',		//显示图片
									}
								]
							}
						]
					})
				}
			},
			//删除规格
			delete_1(x,y){
				console.log(x,y)
				x.splice(y,1)
			},
			//商品分类
			productCategory(){
				http('get','/mall/mobile/productCategory','',this.productCategory_return)
			},
			productCategory_return(x){
				console.log('商品分类',x)
				this.classification_list=x.data;
				this.classification_list_1=x.data;
				var query=this.$route.query;
				if(query.id){
					this.findProductIndex();	//根据商品id查询商品信息
				}else{
					this.classification(this.classification_list_1[0],false,false);
				}
			},
			classification(x,y,z){
				if(x){
					this.classification_1=x;
				}
				this.classification_list_2=this.classification_1.child;
				if(y){
					this.classification_2=y;
				}else{
					this.classification_2=this.classification_list_2[0];
				}
				this.classification_list_3=this.classification_2.child;
				if(z){
					this.classification_3=z;
				}else{
					this.classification_3=this.classification_list_3[0];
				}
			},
			//确定裁剪
			Determine_cropper(){
				$('#commodityUpload .myModal_1').modal('hide');
				var dataURL = $('#commodityUpload .cropper>img').cropper("getCroppedCanvas");//拿到剪裁后的数据  						
          		var base64 = dataURL.toDataURL(this.img_type,this.img_size>=1000000 ? 1000000/this.img_size : 1);	//转成base64
				var obj=base64_splicing(base64)
				http('post','/mall/mobile/shop/uploadImage',{'image':obj},this.uploadImage)
			},
			uploadImage(x){
				if(this.add_type==1){
					Vue.set(this.img_obj,'showpic',x)
				}else{
					this.imagepath_list.push(x)
				}
			},
			//根据商品id插叙商品规格
			findskus(){
				http('post','/mall/mobile/product/findskus',{'id':this.shopid},this.findskus_return)
			},
			findskus_return(x){
				console.log('商品规格',x);
				var list=[];
				for(var i=0;i<x.length;i++){
					var obj_1=new Object();
						obj_1.color=x[i].color.color;
						obj_1.data=[];
					var sizeList=x[i].sizeList;
					for(var j=0;j<sizeList.length;j++){
						var obj_2=new Object();
							obj_2.size=sizeList[j].size.size;
							obj_2.data=sizeList[j].versionList;;
						obj_1.data.push(obj_2);
					}
					list.push(obj_1)
				}
				this.productCategory_list=list;
			},
			//根据商品id查询商品信息
			findProductIndex(){
				http('post','/mall/mobile/product/findProductIndex',{'id':this.shopid},this.findProductIndex_returun)
			},
			findProductIndex_returun(x){
				console.log('商品详情',x)
				var this_1=this;
				this.imagepath_list=x.product.imagepath!='' ? x.product.imagepath.split(',') : [];
				this.product=x.product;
				this.product.measureUnit=this.product.measureunit;
				this.defaultMsg=x.product.particulars ? x.product.particulars : '';
				var categorypath=x.product.categorypath.split('|');	//类型
				var classification_list=this.classification_list_1;
				if(categorypath[0]){	//第一级
					for(var i=0;i<classification_list.length;i++){
						if(classification_list[i].id==categorypath[0]){
							this_1.classification_1=classification_list[i]
						}
					}
				}else{
					this.classification_1=classification_list[0]
				}
				var classification_2_list=this.classification_list_2=this.classification_1.child
				if(categorypath[1]){	//第二级
					for(var i=0;i<classification_2_list.length;i++){
						if(classification_2_list[i].id==categorypath[1]){
							this_1.classification_2=classification_2_list[i]
						}
					}
				}else{
					this.classification_2=classification_2_list[0];
				}
				var classification_3_list=this.classification_list_3=this.classification_2.child
				if(categorypath[2]){	//第三级
					for(var i=0;i<classification_3_list.length;i++){
						if(classification_3_list[i].id==categorypath[2]){
							this_1.classification_3=classification_3_list[i]
						}
					}
				}else{
					this.classification_3=classification_3_list[0];
				}
//				this.classification(this.classification_list_1[2],false,false)
			}
		},
		mounted(){
			var this_1=this;
			var query=this.$route.query;
			if(query.id){
				this.shopid=query.id;
				this.findskus();	//根据商品id插叙商品规格
			}
			
			
			
			this.productCategory();	//获取产品分类
			
			$('#commodityUpload .flie_box').on('change','input',function(){
				var file_1=$(this)[0].files[0];
				console.log(file_1)
				this_1.img_type=file_1.type
				this_1.img_size=file_1.size
				var　reader=new FileReader();
					reader.readAsDataURL($(this)[0].files[0])
					reader.onload = function(e){  
						$('#commodityUpload .cropper').html('<img src="'+e.target.result+'"/>');
						$('#commodityUpload .myModal_1').modal('show');
			        }; 
			})
			
			$('#identifier').on('show.bs.modal', function () {
						$('#commodityUpload .cropper>img').cropper({
							//设置图片比例
							aspectRatio: 4 / 3,
							//图片预览的容器
//							preview:'.box_1',
							autoCrop:true,
							//
							autoCropArea:1,
							//拖动或者进行
							crop: function(data) {
							// Output the result data for cropping image.
							},
							built: function () {
		//						$().cropper('method')
							}
						})
			})
			
			$('#commodityUpload .myModal_1').on('shown.bs.modal', function () {
						$('#commodityUpload .cropper>img').cropper({
							//设置图片比例
							aspectRatio: 4 / 3,
							//图片预览的容器
//							preview:'.box_1',
							autoCrop:true,
							//
							autoCropArea:1,
							//拖动或者进行
							crop: function(data) {
							// Output the result data for cropping image.
							},
							built: function () {
		//						$().cropper('method')
							}
						})
			})
			
		},
		created(){
			
		}
	}
</script>

<style>
	#commodityUpload .img_list{
		display: flex;
		display: -ms-flexbox;
		display: -webkit-flex;
		flex-wrap: wrap;
	}
	#commodityUpload .img_list>li{
		width: 100px;
		height: 100px;
		margin: 5px;
		position: relative;
	}
	#commodityUpload .img_list>li>img{
		width: 100%;
		height: 100px;
		object-fit: cover;
	}
	#commodityUpload .img_list>li>div{
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		opacity: 0;
		line-height: 100px;
		text-align: center;
		transition: all 0.3s;
		font-size: 50px;
		background: #000000;
		color: #FFFFFF;
	}
	#commodityUpload .img_list>li:hover>div{
		opacity: 0.5;
	}
	
	
	#commodityUpload .cropper{
		height: 300px;
	}
	
	#commodityUpload .cropper>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	#commodityUpload .box_1{
		display: flex;
	}
	#commodityUpload .box_1>select{
		/*width: calc(100 / 3);*/
	}
	#commodityUpload .specification .img_box{
		width: 80px;
		height: 80px;
		position: relative;
		background: #EEEEEE;
		display: flex;
		align-items: center;
		justify-content:center;
	}
	#commodityUpload .specification .img_box>img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	#commodityUpload .specification li{		
		/*margin: 18px 0px 0px 37px;*/
		padding: 5px 0px 5px 40px ;
		/*border-left: 1px solid #CCCCCC ;*/
		position: relative;
	}
	#commodityUpload .specification>li{
		padding-top:0px ;
		padding-bottom: 0px;
	}
	#commodityUpload .specification>li:after{
		display: none;
	}
	#commodityUpload .specification li:after{
		position: absolute;
		left: 0px;
		top: 20px;
		content: '';
		width: 40px;
		height: 1px;
		background: #000000;
	}
	#commodityUpload .specification ul{
		border-left: 1px solid #CCCCCC;
		padding: 1px;
	}
</style>