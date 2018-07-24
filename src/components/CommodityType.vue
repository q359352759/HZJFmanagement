<template>
	<div id="CommodityType">
		<section class="content-header">
			<h1>
        		商品类型管理
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
			<div class="box box-primary">
				<!--<div class="box-header">
					<div class="box-title">商品类型设定</div>
				</div>-->
				<div class="box-body">
					<div class="row">
						<div class="col-lg-12 box_1">
							<div class="title_1">请选择行业类型：</div>
							<select class="form-control" @change="change_findCategory(true,true)" v-model="Shop_type.type_1">
								<option v-for="x in findCategory_list" :value="x">{{x.name}}</option>
							</select>
							<select class="form-control" v-if="Shop_type.type_1.data && Shop_type.type_1.data.length>0" @change="change_findCategory(false,true)" v-model="Shop_type.type_2">
								<option v-for="x in Shop_type.type_1.data" :value="x">{{x.name}}</option>
							</select>
							<select class="form-control" v-if="Shop_type.type_2.data && Shop_type.type_2.data.length>0" @change="change_findCategory(false,false,true)" v-model="Shop_type.type_3">
								<option v-for="x in Shop_type.type_2.data" :value="x">{{x.name}}</option>
							</select>
							<button @click="append(false)" class="btn btn-info">添加</button>
						</div>
						<div class="col-lg-12 box_1">
							<div class="title_1" v-if="data5.length>0">产品分类详情：</div>
							<el-tree :data="data5" node-key="id" default-expand-all :props="defaultProps" :expand-on-click-node="false">
					      		<!--<span class="custom-tree-node" slot-scope="{ node, data }">-->
							        <div class="box_2" style="margin-bottom: 10px;" slot-scope="{node,data}">
								        <div class="name">{{data.categoryname}}</div>
								        <div class="Proportion">
								        	<div v-if="(data.data && data.data.length==0) || !data.data">
								        		让利比例：<span>{{data.commisrate}}</span>
								        	</div>
								        </div>
								        <span>
											<el-button v-if="data.depth!=3" type="success" size="mini" @click="append(data,node)">添加下级</el-button>
											<el-button type="primary" size="mini" @click="modify(data)">设置相关参数</el-button>
											<el-button type="danger" size="mini" @click="remove(node, data)">删除</el-button>
								        </span>
							        </div>
						      	<!--</span>-->
						    </el-tree>
					    </div>
					</div>
				</div>
			</div>
		</section>
		
		<el-dialog width="500px" title="详细信息" :visible.sync="dialogFormVisible">
		  	<form role="form"  @submit.prevent="submitForm()">
			  	<div class="form-group">
			    	<label for="">分类名称</label>
			    	<input type="text" required="" v-model="details_obj.categoryname" class="form-control" placeholder="请输入名称" />
			  	</div>
			  	<div class="form-group">
			    	<label for="">分润比例</label>
			    	<input type="number" required="" min="0.01" step="0.01" max="100" v-model="details_obj.commisrate" class="form-control" placeholder="分润比例" />
			  	</div>
			  	<div slot="footer" class="dialog-footer text-right">
			  		<button type="button" @click="dialogFormVisible=false" class="btn btn-default">取消</button>
			  		<button type="submit" class="btn btn-default">确定</button>
			  	</div>
		  	</form>
		</el-dialog>
		
	</div>
</template>

<script>
	import {http} from '@/assets/fc';
	export default{
		name:'',
		data(){
			return{
				dialogFormVisible:false,
				findCategory_list:[],	//商铺分类
				Shop_type:{				//店铺类型
					type_1:{},
					type_2:{},
					type_3:{}
				},
				last_type:{},			//最后所选的店铺类型
				data5:[],
				defaultProps: {
		          	children: 'data',
		          	label: 'name'
		       },
		       details_obj:{}			//详情
			}
		},
		methods:{
			//添加
			append(x){
				console.log(x)
				this.details_obj={
					'categoryname':'',		//名称
					'commisrate':'',		//分润比例
					'parentcategoryid':x ? x.id : '', 	//父级分类id 
					'depth':x ? x.depth+1 :1,
					'shopcategoryid':this.last_type.id	//商铺类型
				}
				this.dialogFormVisible=true;
			},
			//修改
			modify(x){
				console.log(x);
				this.details_obj={};
				for(var key in x){
					this.details_obj[key]=x[key];
				}
				this.details_obj.shopcategoryid=this.last_type.id
				this.dialogFormVisible=true;
			},
			//提交
			submitForm(){
				if(!this.details_obj.id){
					http('post','/mall/mobile/productCategory/addProCategory',this.details_obj,this.addProCategory)
				}else{
					http('post','/mall/mobile/productCategory/updateCategory',this.details_obj,this.addProCategory);
				}
			},
			remove(x,y){
				this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		       	}).then(() => {
		       		console.log(y.id);
		          	http('post','/mall/mobile/productCategory/deleteCategoryById',{'id':y.id},this.deleteCategoryById)
		        }).catch(() => {
		        });
			},
			addProCategory(x){
				console.log(x)
				this.dialogFormVisible=false;
				this.$message({
                    showClose: true,
                    message:x==true ? '设置成功' : '系统错误，请联系管理元',
                    type:x==true ? 'success' : 'error',
                });
                this.showProcateByshopId();
			},
			deleteCategoryById(x){
				console.log(x)
				this.dialogFormVisible=false;
				this.$message({
                    showClose: true,
                    message:x.message,
                    type:x.success==true ? 'success' : 'error',
                });
                this.showProcateByshopId();
			},
			//查询指定商品分类信息
//			findCategoryById(){
//				http('post','/mall/mobile/productCategory/findCategoryById',{'id':1},this.findCategoryById_return)
//			},
//			findCategoryById_return(x){
//				console.log('查询指定商品分类信息',x)
//			},
			//查询商铺三级分类
	      	findCategory(){
	      		http('post','/mall/mobile/shopcategory/findCategory','',this.findCategory_returun)
	      	},
	      	findCategory_returun(x){
	      		console.log('商铺分类',x);
	      		this.findCategory_list=x;
//	      		this.findCategory_list.unshift({'name':'直营店','id':1})
	      		this.Shop_type.type_1=x[0];
	      		if(this.Shop_type.type_1.data && this.Shop_type.type_1.data.length>0){
	      			this.Shop_type.type_2=this.Shop_type.type_1.data[0];
	      		}
	      		if(this.Shop_type.type_2.data && this.Shop_type.type_2.data.length>0){
	      			this.Shop_type.type_3=this.Shop_type.type_2.data[0];
	      		}
	      		this.last_type=this.Shop_type.type_3.id ? this.Shop_type.type_3 : (this.Shop_type.type_2.id ? this.Shop_type.type_2 : (this.Shop_type.type_1.id ? this.Shop_type.type_1 : {}) )
	      		
	      		console.log('最后一级Id',this.last_type);
	      		this.showProcateByshopId();
	      	},
	      	change_findCategory(x,y,z){
	      		if(x){
	      			if(this.Shop_type.type_1.data && this.Shop_type.type_1.data.length>0){
	      				this.Shop_type.type_2=this.Shop_type.type_1.data[0];
	      			}else{
	      				this.Shop_type.type_2={};
	      			}
	      		}
	      		this.Shop_type.type_3=(this.Shop_type.type_2.data && this.Shop_type.type_2.data.length>0) ? this.Shop_type.type_2.data[0] : {};
	      		this.last_type=this.Shop_type.type_3.id ? this.Shop_type.type_3 : (this.Shop_type.type_2.id ? this.Shop_type.type_2 : (this.Shop_type.type_1.id ? this.Shop_type.type_1 : {}) )
	      		console.log('最后一级',this.last_type);
	      		this.showProcateByshopId();
	      	},
	      	//根据行业（店铺）类型id查询相关商品分类
			showProcateByshopId(x){
				http('post','/mall/mobile/productCategory/showProcateByshopId',{'typeId':this.last_type.id},this.showProcateByshopId_return)
			},
			showProcateByshopId_return(x){
				console.log(x)
				this.data5=x
			}
		},
		mounted(){
			
			//查询商铺分类
			this.findCategory();

		},
		created(){

		}
	}
</script>

<style>
	#CommodityType .box_1{
		display: flex;
	}
	#CommodityType .box_1>div{
		white-space: nowrap;
		padding: 5px 10px 0px;
	}
	#CommodityType .box_1>div.title_1{
		width: 150px;
		flex-shrink: 0;
	}
	#CommodityType .box_1 .el-tree{
		flex-grow: 1;
	}
	
	#CommodityType .el-tree-node__content{
		/*padding: 5px 0px;*/
		height: auto;
	}
	
	#CommodityType .el-tree>div{
		padding-left: 0px;
	}
	#CommodityType .el-tree-node{
		padding-left:40px;
	}
	#CommodityType .box_2{
		padding: 3px 5px;
		border-bottom: 1px solid #CC5200;
		display: flex;
		align-items:center;
		width: 100%;
	}
	#CommodityType .box_2 .name{
		background: #eeeeee;
    	text-align: center;
    	overflow: hidden;
    	white-space: nowrap;
    	text-overflow: ellipsis;
    	padding: 2px 15px;
    	min-width: 80px;
	}
	#CommodityType .box_2 .Proportion{
		flex-grow: 1;
		margin: 0px 0px 0px 30px;
	}
	#CommodityType .box_2 .Proportion span{
		color: red;
	}
</style>
