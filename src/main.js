// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

import '@/assets/bower_components/bootstrap/dist/css/bootstrap.min.css';
import '@/assets/bower_components/font-awesome/css/font-awesome.min.css'
import '@/assets/bower_components/Ionicons/css/ionicons.min.css';	
import '@/assets/dist/css/AdminLTE.min.css'
import '@/assets/dist/css/skins/_all-skins.min.css'

import '@/assets/bower_components/jquery/dist/jquery.min';
import '@/assets/bower_components/bootstrap/dist/js/bootstrap.min';
import '@/assets/plugins/iCheck/icheck.min'

//ueditor.config.js 进行了修改 window.UEDITOR_HOME_URL
import '../static/ueditor1_4_3_3-utf8-jsp/ueditor.config.js';
import '../static/ueditor1_4_3_3-utf8-jsp/ueditor.all.js';
//kindeditor
import '../static/kindeditor/themes/default/default.css'
import '../static/kindeditor/themes/simple/simple.css'
import '../static/kindeditor/kindeditor-all';


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
