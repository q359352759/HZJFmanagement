<template>
	<div class="wrapper">
		<header class="main-header">
			<!-- Logo -->
			<a href="index2.html" class="logo">
				<!-- mini logo for sidebar mini 50x50 pixels -->
				<span class="logo-mini"><b>H</b>F</span>
				<!-- logo for regular state and mobile devices -->
				<span class="logo-lg"><b>惠众</b>积分</span>
			</a>
			<!-- Header Navbar: style can be found in header.less -->
			<nav class="navbar navbar-static-top">
				<!-- Sidebar toggle button-->
				<a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
					<span class="sr-only">Toggle navigation</span>
				</a>

				<div class="navbar-custom-menu">
					<ul class="nav navbar-nav">
						<!-- Messages: style can be found in dropdown.less-->
						<li class="dropdown messages-menu">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">
								<i class="fa fa-envelope-o"></i>
								<span class="label label-success">4</span>
							</a>
						</li>
						<!-- Notifications: style can be found in dropdown.less -->
						<li class="dropdown notifications-menu">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">
								<i class="fa fa-bell-o"></i>
								<span class="label label-warning">10</span>
							</a>
						</li>
						<!-- Tasks: style can be found in dropdown.less -->
						<li class="dropdown tasks-menu">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">
								<i class="fa fa-flag-o"></i>
								<span class="label label-danger">9</span>
							</a>
						</li>
						<!-- User Account: style can be found in dropdown.less -->
						<li class="dropdown user user-menu">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">
								<img src="@/assets/dist/img/user2-160x160.jpg" class="user-image" alt="User Image">
								<span class="hidden-xs">Alexander Pierce</span>
							</a>
							<ul class="dropdown-menu">
								<!-- User image -->
								<li class="user-header">
									<img src="@/assets/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">

									<p>
										Alexander Pierce - Web Developer
										<small>Member since Nov. 2012</small>
									</p>
								</li>
								<!-- Menu Body -->
								<li class="user-body">
									<div class="row">
										<div class="col-xs-4 text-center">
											<a href="#">Followers</a>
										</div>
										<div class="col-xs-4 text-center">
											<a href="#">Sales</a>
										</div>
										<div class="col-xs-4 text-center">
											<a href="#">Friends</a>
										</div>
									</div>
									<!-- /.row -->
								</li>
								<!-- Menu Footer-->
								<li class="user-footer">
									<div class="pull-left">
										<a href="#" class="btn btn-default btn-flat">Profile</a>
									</div>
									<div class="pull-right">
										<a href="#" class="btn btn-default btn-flat">Sign out</a>
									</div>
								</li>
							</ul>
						</li>
						<!-- Control Sidebar Toggle Button -->
						<li>
							<a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
						</li>
					</ul>
				</div>
			</nav>
		</header>

		<aside class="main-sidebar">
			<!-- sidebar: style can be found in sidebar.less -->
			<section class="sidebar">
				<!-- Sidebar user panel -->
				<div class="user-panel">
					<div class="pull-left image">
						<img src="@/assets/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
					</div>
					<div class="pull-left info">
						<p>Alexander Pierce</p>
						<a href="#"><i class="fa fa-circle text-success"></i> Online</a>
					</div>
				</div>
				<!-- search form -->
				<form action="#" method="get" class="sidebar-form">
					<div class="input-group">
						<input type="text" name="q" class="form-control" placeholder="Search...">
						<span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
					</div>
				</form>
				<!-- /.search form -->
				<!-- sidebar menu: : style can be found in sidebar.less -->
				<ul class="sidebar-menu" data-widget="tree">
					<li class="header">MAIN NAVIGATION</li>
					<li class="treeview">
						<a href="#">
							<i class="fa fa-dashboard"></i><span>直营店管理</span>
							<span class="pull-right-container">
              					<i class="fa fa-angle-left pull-right"></i>
           	 				</span>
						</a>
						<ul class="treeview-menu">
							<li class="">
								<router-link to="/index/productList">
									<i class="fa fa-circle-o"></i>产品列表
								</router-link>
							</li>
							<li class="">
								<router-link to="/index/commodityUpload">
									<i class="fa fa-circle-o"></i>产品发布
								</router-link>
							</li>
						</ul>
					</li>
					<li class="treeview">
						<a href="#">
							<i class="fa fa-dashboard"></i><span>行业/商品类型管理</span>
							<span class="pull-right-container">
              					<i class="fa fa-angle-left pull-right"></i>
           	 				</span>
						</a>
						<ul class="treeview-menu">
							<li class="">
								<router-link to="/StoreType">
									<i class="fa fa-circle-o"></i>行业类型
								</router-link>
							</li>
							<li class="">
								<router-link to="/CommodityType">
									<i class="fa fa-circle-o"></i>商品类型
								</router-link>
							</li>
						</ul>
					</li>
					<li>
						<a href="#/personnel"><i class="fa fa-book"></i> <span>参与人数</span></a>
					</li>
					<li class="header">LABELS</li>
					<li>
						<a @click="getout()" href="javascript:;"><i class="fa fa-circle-o text-aqua"></i> <span>退出</span></a>
					</li>
				</ul>
			</section>
			<!-- /.sidebar -->
		</aside>

		<div class="content-wrapper">
			<!-- Content Header (Page header) -->

			<!-- Main content -->
				<transition :name="transitionName">
					<router-view></router-view>
				</transition>
			<!-- /.content -->
		</div>
		<!-- /.content-wrapper -->

		<footer class="main-footer">
			<div class="pull-right hidden-xs">
				<b>Version</b> 2.4.0
			</div>
			<strong>Copyright &copy; 2016-2018 <a href="https://adminlte.io">Almsaeed Studio</a>.</strong> All rights reserved.
		</footer>
	</div>
</template>

<script>
//	import '@/assets/bower_components/jquery-ui/jquery-ui.min.js'
//	import '@/assets/dist/js/adminlte.js'
	export default {
		name: 'index',
		data() {
			return {
				nowindex:0,
				transitionName:''
			}
		},
		methods: {
			getout(){
				localStorage.removeItem('id0625');
				this.$router.push('/login')
			}
		},
		mounted() {
			$('.sidebar-menu').on('click','li>a',function(){
				var href=$(this).attr('href');
				console.log(href)
				$(this).parent().addClass('active');
				$(this).parent().siblings().removeClass('active');
				if(href=='#'){
					$(this).parent().addClass('menu-open');
					$(this).siblings().slideDown(1000)
					return false;
				}
			})
		},
		created() {
			if(!localStorage.id0625){
				this.$router.push('/login')
			}
		},
		watch: {//使用watch 监听$router的变化
		    $route(to, from) {
		      	console.log(to,from)
		      	//如果to索引大于from索引,判断为前进状态,反之则为后退状态
		      	if(to.meta.index > from.meta.index){
		        	this.transitionName = 'slide-left';
		      	}else if(to.meta.index < from.meta.index){
		        	this.transitionName = 'slide-right';
		      	}else{
		      		this.transitionName = 'slide-left';
		      	}
		    }
		}
	}
</script>

<style>
	.active a{color: white;}
	#loading{
		display: none;
	}
	.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.3s;
  position: absolute;
  width: 100%;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
