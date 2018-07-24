<template>
	<div id="personnel">
		<div class="row">
			<div class="col-lg-4 col-md-6">
				<form @submit.prevent="form_1()">
					<div class="box">
						<div class="box-header">
							<div class="box-title">参数人数设定</div>
						</div>
						<div class="box-body">
							<div class="form-group">
								<label for="">实际人数</label>
								<input type="text" readonly="" class="form-control" :value="JoinNum" />
							</div>
							<div class="form-group">
								<label for="">增加人数</label>
								<input type="number" required="" min="0" class="form-control" v-model="ShowNum_1" />
							</div>
							<div class="form-group">
								<label for="">增加时长（分钟）</label>
								<input type="number" required="" min="1" class="form-control" v-model="time" value="" />
							</div>
							<div class="form-group">
								<label for="">显示人数</label>
								<input type="text" readonly="" class="form-control" name="" id="" :value="ShowNum" />
							</div>
							<div class="form-group">
								<button class="btn btn-info btn-block">保存</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import {http} from "@/assets/fc";
	export default{
		components:{},
		data(){
			return{
				JoinNum:'',	//参与人数
				ShowNum:'',	//虚假人数
				ShowNum_1:'',	//添加人数
				time:'',
			}
		},
		computed:{
			zongshu(){
				return Number(this.JoinNum)+Number(this.ShowNum)
			}
		},
		methods:{
			//提交
			form_1(){
				var obj=new Object();
					obj.num=this.ShowNum_1;
					obj.time=this.time; 
				this.$message({
		          message: '设置成功',
		          type: 'success'
		        });
//				alert(this.number_1)
				http('post','/hb/hbDistribution/updateIndex',obj,this.updateIndex_retun)
			},
			updateIndex_retun(x){
				console.log(x)
			},
			//获取当前参与人数
			getJoinNum(){
				http('post','/hb/hbDistribution/getJoinNum','',this.getJoinNum_return)
			},
			getJoinNum_return(x){
				console.log('获取当前参与人数',x)
				this.JoinNum=x
			},
			//显示当前虚假参与人数
			getShowNum(){
				http('post','/hb/hbDistribution/getShowNum','',this.getShowNum_return)
			},
			getShowNum_return(x){
				console.log('显示当前虚假参与人数',x);
				this.ShowNum=x;
				
			}
		},
		mounted(){
			this.getJoinNum();
			this.getShowNum();
		},
		created(){
			
		}
	}
</script>

<style>
</style>