<template>
	<div id="login">
		<div class="login-box">
			<div class="login-logo">
				<a href="javascript:;"><b>惠众</b>积分</a>
			</div>
			<!-- /.login-logo -->
			<div class="login-box-body">
				<p class="login-box-msg">Sign in to start your session</p>
	
				<form @submit.prevent="form_1()">
					<div class="form-group has-feedback">
						<input type="text" required="" pattern=".*[^ ].*" v-model="Account" class="form-control" placeholder="账号">
						<span class="glyphicon glyphicon-envelope form-control-feedback"></span>
					</div>
					<div class="form-group has-feedback">
						<input type="password" required="" pattern=".*[^ ].*" v-model="password" class="form-control" placeholder="密码">
						<span class="glyphicon glyphicon-lock form-control-feedback"></span>
					</div>
					<div class="row">
						<div class="col-xs-8">
            				<el-checkbox v-model="checked">Remember Me</el-checkbox>
						</div>
						<div class="col-xs-4">
							<button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
  		name: 'login',
		data(){
			return{
				checked:false,
				Account:'',
				password:''
			}
		},
		methods:{
			form_1(){
				if(this.Account=='admin' && this.password=='123456'){
					localStorage.id0625='true';
					this.$router.push('/index/productList');
				}else{
					this.$notify.error({
			          title: '登陆失败',
			          message: '账号或密码错误'
			        });
				}
			}

		},
		mounted(){
			
		},
		created(){

			
		}
	}
</script>

<style>
	#login{
		height: 100%;
		background: #d2d6de;
		padding: 1px;
	}
</style>