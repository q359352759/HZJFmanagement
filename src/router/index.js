import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/login';
import index from '@/components/index';//添加新闻
//import commodity from '@/components/commodity';
//import deletes from '@/components/delete';//管理新闻
//import updata from '@/components/updata';
//import company from '@/components/company';//添加分公司
//import management from '@/components/management';//管理分公司
//import updatafiliale from '@/components/updatafiliale';
//import official from '@/components/official';//配置官网
//import updatasites from '@/components/updatasites';//修改官网
//import merchant from '@/components/merchant';//添加商家
//import updatamerchant from '@/components/updatamerchant';//管理商家
//import changemerchant from '@/components/changemerchant';//管理商家
//import dynamic from '@/components/dynamic';//行业动态
//import updatadynamic from '@/components/updatadynamic';//管理动态
//import updynamic from '@/components/updynamic';//修改动态
//import news from '@/components/new';
//惠众积分
import commodityUpload from '@/components/commodityUpload';	//产品发布

const personnel=()=>import('@/components/personnel');			//人员管理
const StoreType=()=>import('@/components/StoreType');	//商品类型管理
const CommodityType=()=>import('@/components/CommodityType');	//商品类型管理

const productList=resolve=>{
//	console.log('开始加载');
	$('#loading').show()
	require.ensure([],()=>{
		resolve(require('@/components/productList'))
//		console.log('加载完成')
		$('#loading').hide()
	})
}

Vue.use(Router)
export default new Router({
  routes: [
    {
    	path:'/login',
    	name:'login',
    	component:login,
    },
		{
        path: '/',
//      name:'index'
        component: index,
        children: [
          	{path: '/',meta:{'index':1},component:productList},	//产品列表
          	{path: '/index/productList',name:'productList',meta:{'index':1},component:productList},	//产品列表
          	{path: '/index/commodityUpload',meta:{'index':2},name:'',component:commodityUpload},	//产品发布
         	{path:'/personnel',name:'',component:personnel},	//参与人数  
        	{path:'/StoreType',name:'',component:StoreType},	//商铺类型
        	{path:'/CommodityType',name:'',component:CommodityType}		//商铺类型
        	
        ]
   	}
  ]
})
