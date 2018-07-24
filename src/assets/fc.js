
function http(get_type,url,data,resf,onprogress){
	$.ajax({
//      url:'http://192.168.2.146:8080/zlwymaster'+url,
//         url:'http://192.168.2.202:8080/zlwymaster'+url,
           url:'http://122.114.227.26:8899/zlwymaster'+url,
        type: get_type,
        data:data,
        timeout:10000,
//      processData: false,
//		//必须false才会自动加上正确的Content-Type
//		contentType: false,
		xhr: function() {
			var xhr = $.ajaxSettings.xhr();
			if(xhr.upload){
				if(onprogress){
					xhr.upload.addEventListener("progress", onprogress, false);
				}
				return xhr;
			}
//			if(onprogress && xhr.upload){
//				xhr.upload.addEventListener("progress", onprogress, false);
//				return xhr;
//			}
		},
        success: function (res) {
            resf(res);
        },
        error: function (e){
        	console.log(e);
//      	alert(JSON.stringify(e))
        }
    })
}

//function onprogress(evt) {
//	var loaded = evt.loaded;     //已经上传大小情况
//	var tot = evt.total;      	//附件总大小
//	var per = Math.floor(100 * loaded/tot);  //已经上传的百分比
//	console.log(per)
//}




//图片base64 拼接
function base64_splicing(x){
	if(x=='' || x==null){
		return x;
	}else{
		var type=x.substring(x.indexOf('/')+1,x.indexOf(';'));		//获取文件类型
	//	var pos = base64.indexOf("4") + 2;
		var base64 = x.substring(x.indexOf("4")+1);
		return type+base64;
	}
}

//时间格式化	yyyy.MM.dd hh:mm
function dateFtt(date,fmt) { //author: meizz
	var date=new Date(date);
	var o = {
	    "M+" : date.getMonth()+1,                 //月份
	    "d+" : date.getDate(),                    //日
	    "h+" : date.getHours(),                   //小时
	    "m+" : date.getMinutes(),                 //分
	    "s+" : date.getSeconds(),                 //秒
	    "q+" : Math.floor((date.getMonth()+3)/3), //季度
	    "S"  : date.getMilliseconds()             //毫秒
	  };
	  if(/(y+)/.test(fmt))
	    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
	  for(var k in o)
	    if(new RegExp("("+ k +")").test(fmt))
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	  return fmt;
}



//地址前端

function ajaxs(type,url,data,resf){
		$.ajax({
			type:type,
			url:url,
			async:true,
			data:data,
				success:function(res){
					resf(res);
					},
				error:function(res){
					console.log(res);
					console.log("失败");

				}
	});
}

export{
	http,
	base64_splicing,
	dateFtt,
	ajaxs,
}




