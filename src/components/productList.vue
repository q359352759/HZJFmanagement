<template>
	<div id="productList" class="">
		<section class="content-header">
				<h1>
	        		产品列表
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
			<div class="box">
				<div class="box-body">
					<ul class="query_1">
					    <li>
					    	<div>发布时间：</div>
					    	<div class="input_box">
							    <!--<div class="block">-->
	    							<el-date-picker 
	    								@change="change_time()"
	    								v-model="value6"
	    								type="daterange" 
	    								value-format="yyyy-MM-dd"
	    								range-separator="至" 
	    								start-placeholder="开始日期" 
	    								end-placeholder="结束日期">
	    							</el-date-picker>
	  							<!--</div>-->
					    	</div>
					    </li>
					    <li>
					    	<div>类型：</div>
					    	<div class="select_box">
					    		<select class="form-control" @change="change_type(1)" v-model="type_1">
					    			<option v-for="x in type_list" :value="x">{{x.name}}</option>
					    		</select>
					    		<select class="form-control" @change="change_type(2)" v-if="type_1.child && type_1.child.length>0" v-model="type_2">
					    			<option v-for="x in type_1.child" :value="x">{{x.name}}</option>
					    		</select>
					    		<select class="form-control" @change="change_type(3)" v-if="type_2.child && type_2.child.length>0" v-model="type_3">
					    			<option v-for="x in type_2.child" :value="x">{{x.name}}</option>
					    		</select>
					    	</div>
					    </li>
					    <li>
					    	<div>查询名称：</div>
					    	<div class="input_box">
					    		<input type="text" v-on:blur="change_productName()" class="form-control" v-model="productName" />
					    	</div>
					    </li>
					</ul>
				</div>
			</div>
			<div class="box">
				<div class="box-header">
					<div class="box-title">
						产品列表
					</div>
					<div class="box-tools">
						<a href="#/index/commodityUpload" class="btn btn-sm btn-info btn-flat">发布直营店产品</a>
	              	</div>
				</div>
				
				<div class="box-body" style="min-height: 500px;">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th>名称</th>
								<th>产品图片</th>
								<th>销量</th>
								<th class="w100">操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(x,$index) in product.list">
								<td>{{x.productname}}</td>
								<td>
									<div class="img_box">
										<img v-if="y" v-for="y in x.imagepath" :src="y"/>
									</div>
								</td>
								<td>{{x.salecounts ? x.salecounts : 0}}</td>
								<td>
									<a :href="'#/index/commodityUpload?id='+x.id" class="btn btn-xs btn-info">
										<i class="glyphicon glyphicon-pencil"></i>
									</a>
									<button @click="delete_1(x,$index)" class="btn btn-xs btn-danger">
										<i class="glyphicon glyphicon-remove"></i>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="box-footer clearfix">
	              	 <el-pagination class="pull-right"
	              	 	@current-change="handleCurrentChange" 
	              	 	:current-page="product.pageNumber" 
	              	 	:page-size="product.pageSize" 
	              	 	layout="total, prev, pager, next, jumper" 
	              	 	:total="product.totalRow">
    				</el-pagination>
	            </div>
			</div>
		</section>
	</div>
</template>

<script>
	import {dateFtt,http} from '@/assets/fc'
	export default {
		name: '',
		data() {
			return {
				value6:null,	//时间
				productName:'',		//商品名称
				product:{
					firstPage:true,
					lastPage:true,
					list:[],
					pageNumber:1,
					pageSize:6,
					totalPage:1,
					totalRow:0,
				},
				type_list:[],
				type_1:{},	//分类1
				type_2:{},	//分类2
				type_3:{}	//分类3
			}
		},
		methods:{
			//删除
			delete_1(x,y){
				this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	if(y==this.product.list.length-1 && this.product.pageNumber>1){
						this.product.pageNumber--;
					}
					http('post','/mall/mobile/product/deleteProduct',{'id':x.id},this.deleteProduct);
		        }).catch(() => {});
			},
			deleteProduct(x){
				console.log(x);
				this.$message({
					showClose: true,
			        type: 'success',
	            	message:x
	          	});
	          	this.backShowProducts()
			},
			//选择类型
			change_type(x){
				if(x==1){
					this.type_2=this.type_1.child && this.type_1.child[0] ? this.type_1.child[0] : {};
					this.type_3=this.type_2.child && this.type_2.child[0] ? this.type_2.child[0] : {};
				}else if(x==2){
					this.type_3=this.type_2.child && this.type_2.child[0] ? this.type_2.child[0] : {};
				}
				this.product.num=1;
				this.backShowProducts()
			},
			//输入名字
			change_productName(){
				this.product.num=1;
				this.backShowProducts()
			},
			
//			handleSizeChange(x){
//				console.log(this.product.pageNumber)
//				this.product.pageSize=x;
//				this.backShowProducts();
//			},
			//分页
      		handleCurrentChange(x) {
      			console.log('点击分页',x)
       			this.product.pageNumber=x
       			this.backShowProducts();
      		},
      		//选择时间
			change_time(){
				this.product.num=1;
				console.log(this.value6)
				this.backShowProducts();
			},
			//显示商品列表
			backShowProducts(){
				var obj=new Object();
					obj.size=this.product.pageSize;
					obj.num=this.product.pageNumber;
					obj.statTime=this.value6 ? this.value6[0] : '';
					obj.endTime=this.value6 ? this.value6[1] : '';
					obj.productName=this.productName;
					var categoryId='';
					if(this.type_3.id){
						categoryId=this.type_3.id;
					}else{
						if(this.type_2.id){
							categoryId=this.type_2.id
						}else{
							if(this.type_1.id){
								categoryId=this.type_1.id
							}else{
								categoryId='';
							}
						}
					}
					obj.categoryId=categoryId;
					obj.type=(obj.statTime=='' && obj.endTime=='' && obj.productName=='' && obj.categoryId=='')? 0 : 1;
				http('post','/mall/mobile/product/backShowProducts',obj,this.backShowProducts_return)
			},
			backShowProducts_return(x){
				console.log('自营商品',x)
				for(var i=0;i<x.list.length;i++){
					x.list[i].imagepath=x.list[i].imagepath.split(',')
				}
				this.product=x;
			},
			//商品分类
			productCategory(){
				http('get','/mall/mobile/productCategory','',this.productCategory_return)
			},
			productCategory_return(x){
				console.log('产品分类',x)
				this.type_list=x.data;
				this.type_list.unshift({'id':'','name':'全部'});
				console.log(this.type_list)
				this.type_1=this.type_list[0]
//				if(x.data[0]){
//					this.type_1=x.data[0];
//					if(x.data[0].child[0]){
//						this.type_2=x.data[0].child[0];
//						if(x.data[0].child[0].child[0]){
//							this.type_3=x.data[0].child[0].child[0];
//						}else{
//							this.type_3=[];
//						}
//					}else{
//						this.type_2=[];
//					}
//				}else{
//					this.type_1=[];
//				}
			},				
		},
		mounted(){
			this.backShowProducts();
			///mall/mobile/product/backShowProducts
			this.productCategory();	//获取产品分类
		},
		created(){

		}
	}
</script>

<style>
	#productList .img_box{
		/*display: ;*/
	}
	#productList .img_box img{
		width: 50px;
		height: 50px;
		margin: 5px;
		border:1px solid #CCCBCB;
	}
	#productList .w100{
		width: 100px;
	}
	#productList .input_box{
		width: 400px;
	}
	#productList .input_box>div{
		width: 100%;
	}
	#productList .select_box{
		display: flex;
		width: 400px;
	}
	#productList .select_box>section{
		flex-grow: 1;
	}
	
	#productList .query_1>li{
		display: flex;
		padding: 5px 0px;
		border-bottom:1px dashed #3c8dbc;
	}
	#productList .query_1>li>div:nth-child(1){
		width: 80px;
		flex-shrink: 0;
		line-height: 34px;
	}
</style>