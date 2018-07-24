<template>
	<div id="StoreType">
		<section class="content-header">
			<h1>
        		行业（店铺）类型管理
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
                <div class="box-header">
                    <div class="box-title">行业类型设定</div>
                    <div class="box-tools">
                        <button type="button" @click="append(false)" class="btn btn-sm btn-info">添加分类</button>
                    </div>
                </div>
				<div class="box-body">
				  	<div class="block">
					    <el-tree :data="data5" node-key="id" default-expand-all :props="defaultProps" :expand-on-click-node="false">
				      		<!--<span class="custom-tree-node" slot-scope="{ node, data }">-->
						        <div class="box_1" style="margin-bottom: 10px;" slot-scope="{node,data}">
							        <div class="name">{{data.categoryname}}</div>
							        <div class="Proportion">
							        	<div v-if="(data.data && data.data.length==0) || !data.data">
							        		让利比例：<span>{{data.contractratio}}%-{{data.maximumratio ? data.maximumratio+'%' : '无上限'}}</span>
							        	</div>
							        </div>
							        <span>
										<el-button type="success" size="mini" @click="append(data)">添加下级</el-button>
										<el-button type="primary" size="mini" @click="modify(node,data)">设置相关参数</el-button>
										<el-button type="danger" size="mini" @click="remove(node, data)">删除</el-button>
							        </span>
						        </div>
					      	<!--</span>-->
					    </el-tree>
					</div>
				</div>
			</div>
		</section>

		<el-dialog width="500px" title="详细信息" :visible.sync="dialogFormVisible">
		  	<el-form :model="form"  :rules="rules" ref="form" >
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="分类名称" prop="categoryname" label-width="120px">
                            <el-input required v-model="form.categoryname" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="!form.data || form.data.length==0">
                        <el-form-item label="最大让利比例" prop="maximumratio" label-width="120px">
                            <el-input v-model.number="form.maximumratio" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="!form.data || form.data.length==0">
                        <el-form-item label="最小让利比例" prop="contractratio" label-width="120px">
                            <el-input v-model.number="form.contractratio" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
		  	</el-form>
		  	<div slot="footer" class="dialog-footer">
		    	<el-button @click="dialogFormVisible = false">取 消</el-button>
		    	<el-button type="primary" plain @click="submitForm()">确 定</el-button>
		  	</div>
		</el-dialog>

	</div>
</template>

<script>
	import {http} from '@/assets/fc';
	 let id = 1000;
	export default{
		name:'',
		data(){
			//最大让利比例验证
            const change_maximumratio = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('最大让利不能为空'));
                }else{
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字'));
                    }else{
                    	if(Number.isInteger(this.form.contractratio)){
                    		if(value<this.form.contractratio){
	                            callback(new Error('最大让利不能小于'+this.form.contractratio))
	                        }else if (value>100) {
	                            callback(new Error('最大让利不能超过100'));
	                        } else {
	                            callback();
	                        }
                    	}else{
                    		if(value<1){
	                            callback(new Error('最大让利不能小于1'))
	                        }else if (value>100) {
	                            callback(new Error('最大让利不能超过100'));
	                        } else {
	                            callback();
	                        }
                    	}

                    }
                }
            };
            //最小让利比例验证
            const change_contractratio=(rule, value, callback)=>{
            	if(!value){
            		callback(new Error('最小让利比例不能为空'));
            	}else{
            		if(!Number.isInteger(value)){
            			callback(new Error('请输入数字'));
            		}else{
            			if(Number.isInteger(this.form.maximumratio)){
                    		if(value<1){
	                            callback(new Error('最小让利不能小于1'))
	                        }else if (value>this.form.maximumratio) {
	                            callback(new Error('最小让利不能超过'+this.form.maximumratio));
	                        } else {
	                            callback();
	                        }
                    	}else{
                    		if(value<1){
	                            callback(new Error('最小让利不能小于1'))
	                        }else if (value>100) {
	                            callback(new Error('最小让利不能超过100'));
	                        } else {
	                            callback();
	                        }
                    	}
            		}
            	}
            }
	      	return {
                dialogFormVisible:false,
				details_obj:{},	//点击的详情
	      		form:{
                    categoryname:'',    //分类名称
                    maximumratio:'',    //最大让利
                    parent_id:'',		//父级分类id(一级为空不填)
                    contractratio:'',    //最小让利
                    create_by:''		//添加分类人员
                },
                rules:{
                    categoryname:[
                        {required: true, message: '请输入分类名称', trigger: 'blur' },
                    ],
                    maximumratio:[
                        {validator:change_maximumratio},
                    ],
                    contractratio:[
                    	{validator:change_contractratio}
//                      {required: true, message: '请输入最小让利比例', trigger: 'blur',max:100 ,min:1},
                    ]
                },
	      		test:'sfsdf',
	        	data5:[],
//	        	data5: JSON.parse(JSON.stringify(data)),
				defaultProps: {
		          	children: 'data',
		          	label: 'name'
		        }
	      	}
		},
		methods:{
            submitForm(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {

                        if(!this.form.id){
                        	if(this.details_obj.id){
	                            this.form.parent_id=this.details_obj.id
	                        }else{
	                        	this.form.parent_id='';
	                        }
	                        console.log(this.form)
	                        http('post','/mall/mobile/shopcategory/addCategory',this.form,this.addCategory);
                        }else{
                        	http('post','/mall/mobile/shopcategory/updateCategory',this.form,this.updateCategory)
                        }
						this.dialogFormVisible=false;
                    }else{
                        return false;
                    }
                })
            },
            updateCategory(x){
            	console.log(x);
            	this.$message({
	            	type: x==true ? 'success': 'error',
	            	message: x==true ? '修改成功!': '修改失败！'
	          	});
            	this.findCategory();
            },
            addCategory(x){
            	console.log(x)
            	this.$message({
	            	type: x==true ? 'success': 'error',
	            	message: x==true ? '添加成功!': '添加失败'
	          	});
            	this.findCategory();
            },
            //点击添加按钮
			append(data) {
                this.dialogFormVisible=true;
                this.form={
                    categoryname:'',    //分类名称
                    maximumratio:'',    //最大让利
                    contractratio:'',    //最小让利
                	create_by:'',
                	parent_id:'',
                }
                if(!data){
                    this.details_obj={};
                }else{
                    this.details_obj=data;
                }
				console.log('添加下一级',this.details_obj)
				// const newChild={
				// 		contractratio:1,
				// 		data:[],
				// 		maximumratio:null,
				// 		name:"未定义",
				// 		id:id++
				// 	}
        		// if(!data.data){
        		// 	this.$set(data,'data',[])
        		// }
        		// data.data.push(newChild);
      		},
      		//删除
	      	remove(node,data){
	      		this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		       }).then(() => {
		          	http('post','/mall/mobile/shopcategory/deleteCategory',{'id':data.id},this.deleteCategory)
		        }).catch(() => {
		        });
//	        	const parent = node.parent;
//	        	const children = parent.data.data || parent.data;
//	        	const index = children.findIndex(d => d.id === data.id);
//	        	children.splice(index,1);
	      	},
	      	deleteCategory(x){
                console.log(x);
                this.$message({
                    showClose: true,
                    message:x.message,
                    type:x.success==true ? 'success' : 'error',
                });
                this.findCategory();
            },
            //修改
	      	modify(node,data){
	      		console.log('修改',data);
	      		this.dialogFormVisible=true;
	      		this.form=new Object();
                this.form.categoryname=data.categoryname;
                this.form.maximumratio=data.maximumratio;
                this.form.contractratio=data.contractratio;
                this.form.data=data.data;
                this.form.id=data.id;
                if(data.parent_id && data.parent_id!=null && data.parent_id!='null'){
                	this.form.parent_id=data.parent_id
                }

//              const parent = node.parent;
//              if(parent.key && parent.key!='undefined'){
//              	this.form.parent_id=parent.key;
//              }
//              const parent = node.parent;
//	        	const children = parent.data.data || parent.data;
//	        	const index = children.findIndex(d => d.id === data.id);
            },

	      	//返回商品分类数据
//	      	productCategory(){
//	      		http('post','/mall/mobile/shopcategory/getCategory','',this.productCategory_return)
//	      	},
	      	productCategory_return(x){
	      		this.data5=x;
	      	},
	      	//查询商铺三级分类
	      	findCategory(){
//	      		http('post','/mall/mobile/shopcategory/findCategory','',this.findCategory_returun)
	      		http('post','/mall/mobile/shopcategory/showCategory','',this.findCategory_returun)
	      	},
	      	findCategory_returun(x){
	      		console.log('分类',x)
	      		this.data5=x;
	      	}

		},
		mounted(){
//			this.productCategory();
			this.findCategory();
		},
		created(){
		}
	}
</script>

<style>
	#StoreType .el-tree-node__content{
		/*padding: 5px 0px;*/
		height: auto;
	}

	#StoreType .el-tree-node{
		padding-left:40px;
	}
	#StoreType .box_1{
		padding: 3px 5px;
		border-bottom: 1px solid #CC5200;
		display: flex;
		align-items:center;
		width: 100%;
	}
	#StoreType .box_1 .name{
		background: #eeeeee;
    	text-align: center;
    	overflow: hidden;
    	white-space: nowrap;
    	text-overflow: ellipsis;
    	padding: 2px;
    	width: 80px;
	}
	#StoreType .box_1 .Proportion{
		flex-grow: 1;
		margin: 0px 0px 0px 30px;
	}
	#StoreType .box_1 .Proportion span{
		color: red;
	}

</style>
