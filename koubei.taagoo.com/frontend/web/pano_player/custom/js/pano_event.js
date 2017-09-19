var panoEvent=(function(){
    var pub={};
    var pri={};
	
	pub.objName = {"分享":"#shareOutBox","简介":"#infomationModal","足迹":"#mapMarkModal"};
	
	pub.showModal =function(obj){
		$(pub.objName[obj]).modal("show");
		$('div.btn-grp').hide();
		$(pub.objName[obj]).on('hide.bs.modal',function(e){
			$('div.btn-grp').show();
		})
	}
	pub.showTalk = function() {
		$('#talkOutBoxNew').show();
		$('div.btn-grp').fadeOut();
		pub.showMsgBox()
	}
	pub.talkEdit = function(obj){
		var val = $(obj).val();
		tg_krpano_api.obj.get('layer[layer_1]').html=val;
		if(val.length>0) {
			document.getElementById('sayBtn').className="btn btn-primary";
		}else{
			document.getElementById('sayBtn').className += " disabled";
		}
	}
    //发表评论函数
    pub.talkDo= function (t) {
        if($('#comment_content').val() == ''){
            $('#comment_content').focus();
            return false;
        }
        if($('#comment_content').val().length > 100){
            alert('不能超过100字');
            return false;
        }
        var this_obj = $(t);
        if(this_obj.attr('lock')=='1'){
            return false;
        }
        this_obj.attr('lock','1');
        var param={};
        param.content=$('#comment_content').val();
        param.atv=tg_krpano_api.obj.get('hotspot[hotspot_1]')._atv.toFixed(2);
        param.ath=tg_krpano_api.obj.get('hotspot[hotspot_1]')._ath.toFixed(2);
        param.scence_id=tg_krpano_api.obj.get('xml.scene');
        console.log(param);
        var reqUrl = '/user-panoramic/do-comment.html?id='+panoDataObj.id;
        $.ajax({
              type: 'POST',
              url: reqUrl,
              data: param,
              success: function(res){
                taagoo_obj.check_ajax_return(res,function(){
                	console.log(res);
                    if(res.status==1){
                    	pub.hideHotspot();
                    }else{
                        alert('评论失败，稍后再试。');
                    }
                });
                this_obj.attr('lock','');
            },
            error:function(){
                this_obj.attr('lock','');
                alert('评论失败，请重试。');
            },
            dataType: 'json'
        });
        //pub.closeDo();
    }
    pub.getPano=function(){
	    $.ajax({
		    url: pano_edit_json,
		    type: 'post',
		    dataType: 'json',
		    data: {panoramic_id: panoDataObj.id},
		    success: function(data) {
		        if(data.status == "1"){
		            viewPano = data.data;
		            $.extend(panoDataObj,viewPano);
		            pub.eachDataHide();
		            // console.log(viewPano);
//                  editPanoObj.angle_of_view = panoDataObj.angle_of_view;
//                  editPanoObj.scene_group = panoDataObj.scene_group;
		        }
		    }
		})	
    }
    pub.eachDataHide = function(){
    	var parmes={
			"showlogo":"#logoImg",
			"showpraise":"#praisebtn",
			"showprofile":"#profilebtn",
			"showshare":"#sharebtn",
			"showuser":"#authorDiv",
			"showviewnum":"#viewnumDiv",
			"showvrglasses":".btn_vrmode",
			"comment":"#talkbtn",
			"footmark":"#footmarkbtn",
			"gyro":".btn_gyro_off",
			"thumbs_opened":"#viewnumbtn"
			}
		for(var j in parmes) {
			if(panoDataObj[j] <1) {
				$(parmes[j]).hide();
			}
		}
    }

    //点赞
    pub.goodDo=function(obj){
    	if(!obj.className){
	    	
	        $.ajax({
	            url: '/user-panoramic/do-praise.html',
	            method:'post',
	            data: {'id':page_params.panoramic_id,'_csrf':page_params.form_csrf},
	            dataType: 'json',
	            success: function(res){
	                taagoo_obj.check_ajax_return(res,function(){
	                    if(res.status==1){
	                    	page_params.is_collect = true;
	                    	obj.setAttribute("src","/images/icon_good_1.png");
							obj.className="zanged";
							document.getElementById('praisedNum').innerHTML++;
	                    }else{
	                        alert('点赞失败，稍后再试。');
	                    }
	                });
	            },
	            error:function(){
	                alert('点赞失败，稍后再试。');
	            }
	        });
    	}else {return;}
//      pub.closeDo();
    }
    
//  //取消点赞
//  pub.delgood = function(){
//  	$.ajax({
//          url: '/user-panoramic/del-praise.html',
//          method:'post',
//          data: {'id':page_params.panoramic_id,'_csrf':page_params.form_csrf},
//          dataType: 'json',
//          success: function(res){
//              taagoo_obj.check_ajax_return(res,function(){
//                  if(res.status==1){
//                  	page_params.is_collect = false;
//                      tg_krpano_api.obj.call("set(layer['lb_good'].url,'/images/icon_good.png')");
//                      tg_krpano_api.obj.call("set(layer['lb_good'].onclick,'js(panoEvent.goodDo())')");
//                  }else{
//                      alert('取消点赞失败，稍后再试。');
//                  }
//              });
//          },
//          error:function(){
//              alert('取消点赞失败，稍后再试。');
//          }
//      });
//      pub.closeDo();
//  }

    //收藏
//  pub.cloDo= function () {
//      $.ajax({
//          url: '/user-panoramic/do-collect.html',
//          method:'post',
//          data: {'id':page_params.panoramic_id,'_csrf':page_params.form_csrf},
//          dataType: 'json',
//          success: function(res){
//              taagoo_obj.check_ajax_return(res,function(){
//                  if(res.status==1){
//                  	page_params.is_collect = true;
//                      tg_krpano_api.obj.call("set(layer['lb_col'].url,'/images/icon_col_1.png')");
//                      tg_krpano_api.obj.call("set(layer['lb_col'].onclick,'js(panoEvent.delClo())')");
//                  }else{
//                      alert('收藏失败，稍后再试。');
//                  }
//              });
//          },
//          error:function(){
//              alert('收藏失败，稍后再试。');
//          }
//      });
//      pub.closeDo();
//  }
//  
//  //取消收藏
//  pub.delClo = function () {
//  	$.ajax({
//          url: '/user-panoramic/del-collect.html',
//          method:'post',
//          data: {'id':page_params.panoramic_id,'_csrf':page_params.form_csrf},
//          dataType: 'json',
//          success: function(res){
//              taagoo_obj.check_ajax_return(res,function(){
//                  if(res.status==1){
//                  	page_params.is_collect = false;
//                      tg_krpano_api.obj.call("set(layer['lb_col'].url,'/images/icon_col.png')");
//                      tg_krpano_api.obj.call("set(layer['lb_col'].onclick,'js(panoEvent.cloDo())')");
//                  }else{
//                      alert('取消收藏失败，稍后再试。');
//                  }
//              });
//          },
//          error:function(){
//              alert('取消收藏失败，稍后再试。');
//          }
//      });
//      pub.closeDo();
//  }
    //显示提示框
    pub.showMsgBox = function (){
//  	tg_krpano_api.obj.call('set(autorotate.speed,"0")')
        if(tg_krpano_api.obj.get('hotspot[hotspot_1].name')){
            return false;
        }
        var comtBg = "/images/user_add-new.png";
        var oCount = 1;
        tg_krpano_api.obj.call("set(hotname,hotspot_" + oCount + ")");
        tg_krpano_api.obj.call('addhotspot(get(hotname))');


        tg_krpano_api.obj.call('hotspot[get(hotname)].loadstyle(comment_style)');

        tg_krpano_api.obj.call("set(hotspot[get(hotname)].onclick,'')");
        tg_krpano_api.obj.call("set(hotspot[get(hotname)].onloaded,'')");

      	tg_krpano_api.obj.call("set(hotspot[get(hotname)].url,"+comtBg+")");
        tg_krpano_api.obj.call("set(hotspot[get(hotname)].ondown,draghotspot())");
        tg_krpano_api.obj.call("set(hotspot[get(hotname)].keep,true)");
        tg_krpano_api.obj.call("set(hotspot[get(hotname)].align,left)");
        tg_krpano_api.obj.call("set(hotspot[get(hotname)].width,50)");
        tg_krpano_api.obj.call("set(hotspot[get(hotname)].height,75)");
        tg_krpano_api.obj.call("set(hotspot[get(hotname)].visible,true)");
        tg_krpano_api.obj.call("set(hotspot[get(hotname)].scale,1)");
        tg_krpano_api.obj.call("set(hotspot[get(hotname)].ath,get(view.hlookat))");
        tg_krpano_api.obj.call("set(hotspot[get(hotname)].atv,get(view.vlookat))");
        
//      tg_krpano_api.obj.call("set(hotspot[get(hotname)].css,background:rgba(0,0,0,0.6);border-radius:9px;)");

    	tg_krpano_api.obj.get('hotspot[hotspot_1]').visible=true;
        //alert(')))))))))))))'+tg_krpano_api.obj.get('hotspot[hotspot_1].name'));
        //alert(')))))))))))))'+tg_krpano_api.obj.get('hotspot[hotspot_1].ath'));

        // var oHot = krpano.get("hotspot[get(hotname)]")
//      tg_krpano_api.obj.call("set(hotbg,background" + oCount + ")");
//		tg_krpano_api.obj.call('addlayer(get(hotbg)');
//      tg_krpano_api.obj.call("set(layer[get(hotbg)].align,left)");
//      tg_krpano_api.obj.call("set(layer[get(hotbg)].height,70)");
//      tg_krpano_api.obj.call("set(layer[get(hotbg)].x,0)");
//      tg_krpano_api.obj.call("set(layer[get(hotbg)].css,background:#000000;border:1px solid red;width:auto;min-width:100px;border-radius:15px;)");
//      tg_krpano_api.obj.call("set(layer[get(hotbg)].parent,hotspot[hotspot_1])");

		tg_krpano_api.obj.call("set(layerimg,layerimg_" + (oCount+1) + ")");
        tg_krpano_api.obj.call('addlayer(get(layerimg))');
        tg_krpano_api.obj.call("set(layer[get(layerimg)].url,../images/comment-back2.png)");
        tg_krpano_api.obj.call("set(layer[get(layerimg)].align,bottom)");
        tg_krpano_api.obj.call("set(layer[get(layerimg)].x,70)");
        tg_krpano_api.obj.call("set(layer[get(layerimg)].y,30)");
        tg_krpano_api.obj.call("set(layer[get(layerimg)].width,205)");
        tg_krpano_api.obj.call("set(layer[get(layerimg)].height,60)");

        tg_krpano_api.obj.call("set(layer[get(layerimg)].parent,hotspot[hotspot_1])");

//------------
        tg_krpano_api.obj.call("set(layername,layer_" + oCount + ")");
        tg_krpano_api.obj.call('addlayer(get(layername))');
        tg_krpano_api.obj.call("set(layer[get(layername)].url,%SWFPATH%/plugins/textfield.swf)");
//      tg_krpano_api.obj.call("set(layer[get(layername)].ondown,draglayer())");
        tg_krpano_api.obj.call("set(layer[get(layername)].align,left)");
        tg_krpano_api.obj.call("set(layer[get(layername)].x,63)");
        tg_krpano_api.obj.call("set(layer[get(layername)].y,-24)");
        tg_krpano_api.obj.call("set(layer[get(layername)].background,false)");
        tg_krpano_api.obj.call('set(layer[get(layername)].css,color:#ffffff;word-break: break-all;font-weight:bold; padding:2px 0;width:130px;height:56px;position:relative;white-space: normal;line-height: 26px; font-family:"Microsoft YaHei"; font-size:16px;border:none;)');
        tg_krpano_api.obj.call("set(layer[get(layername)].html,拖动头像到想要评论的位置)");

        tg_krpano_api.obj.call("set(plugin[get(layername)].parent,hotspot[hotspot_1])");
        
        
//      -------------
		tg_krpano_api.obj.call("set(user_tx,user_" + oCount + ")");
        tg_krpano_api.obj.call('addlayer(get(user_tx))');
        tg_krpano_api.obj.call("set(layer[get(user_tx)].url,"+page_params.self_head+")");
        tg_krpano_api.obj.call("set(layer[get(user_tx)].align,left)");
        tg_krpano_api.obj.call("set(layer[get(user_tx)].width,50)");
        tg_krpano_api.obj.call("set(layer[get(user_tx)].height,50)");
//      tg_krpano_api.obj.call("set(layer[get(user_tx)].ondown,draglayer())");
        tg_krpano_api.obj.call("set(layer[get(user_tx)].x,1)");
        tg_krpano_api.obj.call("set(layer[get(user_tx)].y,-24)");
        tg_krpano_api.obj.call("set(layer[get(user_tx)].css,border-radius:9px;)");

        tg_krpano_api.obj.call("set(layer[get(user_tx)].parent,hotspot[hotspot_1])");


        
        
        

    }
    //关闭提示框
    pub.closeMsgBox = function (){
    	$('#talkOutBoxNew').hide();
		$('div.btn-grp').show();
		tg_krpano_api.obj.call('removehotspot(get(hotname))');
        tg_krpano_api.obj.call('removelayer(get(layername))');
        tg_krpano_api.obj.call('removelayer(get(layerimg))');
        tg_krpano_api.obj.call('removelayer(get(user_tx))');
        document.getElementById('comment_content').value=" ";
    }
// 	隐藏
    pub.hideHotspot = function (){
    	tg_krpano_api.obj.call('set(autorotate.speed,"300")')
		tg_krpano_api.obj.call('removehotspot(get(hotname))');
        tg_krpano_api.obj.call('removelayer(get(layername))');
        tg_krpano_api.obj.call('removelayer(get(layerimg))');
        tg_krpano_api.obj.call('removelayer(get(user_tx))');
		document.getElementById('comment_content').value=" ";
		$('#talkOutBoxNew').hide();
		$('div.btn-grp').show();
    }
    //操作评论载入场景
    pub.reloadMsgBox = function () {
        // tg_krpano_api.obj.call('removehotspot(get(hotname))');
        var oScene = tg_krpano_api.obj.get('xml.scene');
        var oPano = '/panoramic/get-xmlv2.html?id='+page_params.panoramic_id;
        tg_krpano_api.obj.call("loadpanoscene("+oPano+","+oScene+",skin_settings.littleplanetintro=false,KEEPVIEW,NOBLEND)");
    }

    return pub;
})();
