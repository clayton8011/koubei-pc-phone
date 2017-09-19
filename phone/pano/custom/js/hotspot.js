
var hotSpotDataKey = ["scene","link","image","text","voice",'video'];
var textArr = ["添加全景切换热点","添加超链接热点","添加图片热点","添加文本热点","添加音乐","添加视频"];

var hotspotInd = (function() {
	var oStr = "";
	var krpano = document.getElementById("EditPano");
	var pub = {
		Int: function() {
			pub.allEvent();			
		},
		addAllSpot: function(name,krpano) {
			var krpano = document.getElementById('EditPano');
			var name = krpano.get('xml.scene');
			var spotObj = null;
			var spotData = panoDataObj.hotspot;
			if(spotData.hasOwnProperty(name) == true){
				spotObj = spotData[name];
			}
			$(".content_index").find('.all-edit').empty();
			// console.log(spotObj);
			$.each(spotObj,function(key,value){
				if(key == 'scene'){
					var oBox = $(".content_index").find('.all-edit').eq(0);
				    $(value).each(function(idx){
				    	// var typeNow = this.effect_type.titleEn ? this.effect_type.titleEn : "NOBLEND";
				        krpano.call('addSceneChangeHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+this.linkedscene+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',true,true,'+(this.isShowSpotName)+',NOBLEND,'+html_encode(this.hotspotTitle)+')');
				        // console.log(this.name);				        
				        pub.addSpotStr(this.name,this.thumbPath,this.hotspotTitle,oBox,"0");
				    });
				}else if(key == 'link'){
					var oBox = $(".content_index").find('.all-edit').eq(1);
				    $(value).each(function(idx){
				        krpano.call('addLinkHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',true,true,'+this.link+','+this.isShowSpotName+')');
				        // console.log(this);
				        pub.addSpotStr(this.name,this.thumbPath,this.hotspotTitle,oBox,"1");
				    });
				}else if(key == 'image'){
					var oBox = $(".content_index").find('.all-edit').eq(2);
				    $(value).each(function(idx){
				        // console.log(this);
				        krpano.call('addImgHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',true,true,'+this.galleryName+','+this.isShowSpotName+','+this.imgs.src+')');
				        pub.addSpotStr(this.name,this.thumbPath,this.hotspotTitle,oBox,"2");
				    });
				}else if(key == 'text'){
					var oBox = $(".content_index").find('.all-edit').eq(3);
				    $(value).each(function(idx){
				        // console.log(this.name);
				        krpano.call('addWordHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',true,true,'+html_encode(this.wordContent)+','+this.isShowSpotName+')');
				        pub.addSpotStr(this.name,this.thumbPath,this.hotspotTitle,oBox,"3");
				    });
				}else if(key == 'voice'){
					var oBox = $(".content_index").find('.all-edit').eq(4);
				    $(value).each(function(idx){
				        // console.log(this.name);
				        krpano.call('addVoiceHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',true,true,'+this.musicSrc+','+this.isShowSpotName+')');
				        pub.addSpotStr(this.name,this.thumbPath,this.hotspotTitle,oBox,"4");
				    });
				}else if(key == 'video'){
					var oBox = $(".content_index").find('.all-edit').eq(5);
				    $(value).each(function(idx){
				        // console.log(this.name);
				        krpano.call('addVideoHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',true,true,'+this.location+','+this.isShowSpotName+')');
				        pub.addSpotStr(this.name,this.thumbPath,this.hotspotTitle,oBox,"5");
				    });
				}
			})
			$(".content_index").find('.btn_content').each(function(index, el) {
				var oLength = $(el).find('.all-edit').children('.edit-item').length;
				if(oLength>0){
					$(el).children('p').hide();
				}else{
					$(el).children('p').show();
				}
				$(el).find('.text-warning').html(oLength);
			});
			pub.getAllImg();
		},
		addSpotStr: function(name,url,title,box,spottype) {
			var spotStr ='';
			spotStr = '<div class="edit-item" data-scene="'+name+'">'
						+'<a class="card"><span class="caption"><span class="group-location-icon">定位</span>'
						+'<span class="group-change-icon" data-liindex="0" data-hotspotidx="'+spottype+'">修改</span>'
						+'<span class="group-delte">删除</span></span></a>'
						+'<div class="group-item-title">'
						+'<img class="thumbimg" src="'+url+'" />'
						+'<span>'+title+'</span></div></div>';
			box.append(spotStr);
		},
		hideAllSpot: function(a) {
			console.log("hideAllSpot");
		},
		openAddHotSpot: function(oNum) {
			$("#allAroundModal").modal('show');
			var nowList = $(".hot-nav").eq(oNum);
			$("#closeSpot").siblings('h3').html(textArr[oNum]);
			nowList.show().addClass('hot-nav-show')
				.siblings('.hot-nav').hide().removeClass('hot-nav-show');
			nowList.children('li').eq(0).addClass('liclick').css('background', 'rgb(94, 178, 228)')
				.siblings('li').removeClass('liclick').css('background', 'rgb(73, 74, 81)');
			var listId = nowList.children('li.liclick').data('showid').slice(1);
			// console.log(listId);
			pub.tabSpot(listId);
			this.getAllImg();
			this.checkListInt(listId);
			$("#allAroundModal .modal-footer").find('button').attr('disabled', true).html('下一步');
			$('#music_style p span:eq(0)').text('还未选择音乐');
			$('#music_style p span:eq(1)').text('');
			$("#allAroundModal input.form-control,#allAroundModal textarea.form-control").val("");
			$('#allAroundModal .all-next').data('ismodify',false);
		},
		tabSpot: function(listId) {
			var showObj = $(".tab-content1").children('div[id='+listId+']');			
			showObj.addClass('tabshow').animate({'left': '0px'});
			showObj.siblings().removeClass('tabshow').animate({'left':'105%'});
			// temp checked disabled or not
			var hasScene = showObj.find('.scene_clicked').length;
			var hasIcon = showObj.find('.icon_clicked').length;
			var ValBox = showObj.find('.form-control');
			var hasVideo = showObj.find("#video_choose_ok_wrap").data('location');
			var hasVoice = showObj.find("#music_style p").data('rid');
			console.log('hasVideo==='+hasVideo);
			var hasVal = false;

			$.each(ValBox,function(index, el) {
				if(el.value == ''){
					hasVal = false;
					return false;
				}else{
					hasVal = true;
				}
			});
			if(hasScene>0 || hasIcon>0 || hasVal || hasVideo || hasVoice){
				pub.toggleAllNextBtn(true);
			}else{
				pub.toggleAllNextBtn(false);
			}
			// temp checked disabled or not
			console.log("this is tab");
			$("#icon_style").find('input').eq(0).prop('checked', true);
		},
		checkListInt: function(list) {
			switch (list){
				case "icon_style":
					console.log("icon_style");
					$("#icon_style").find('input').eq(0).prop('checked', true);
					break;
				// case "purpose":
				// 	console.log("this is scenehref_name2222222");
				// 	break;
				// case "scenehref_name":
				// 	console.log("this is scenehref_name");
				// 	break;
				default:
					console.log("this is default");
			}
		},
		getAllImg: function() {
			$.ajax({
				url: '/user-panoramic/get-icon.html',
				type: 'post',
				dataType: 'json',
				data: {type: 'system'},
				success: function(data) {
					var oBox = $("#icon_style .statichs");
					oBox.empty();
					var oHtmlStr = "";
					for (var i in data) {
						oHtmlStr += '<div class="col-md-1" style="padding-top:5px;padding-bottom:5px" title="'+data[i].name+'">'
						+'<a style="overflow:hidden;" href="javascript:void(0)" data-iconId="'+data[i].id+'" data-hstype="0" data-imgpath="'+data[i].absolute_path+'">'
						+'<img src="'+data[i].absolute_path+'" /></a></div>'
					}
					oBox.append(oHtmlStr);
				}
			})
			$.ajax({
				url: '/user-panoramic/dynamic-icon.html',
				type: 'post',
				dataType: 'json',
				data: {type: 'system'},
				success: function(data) {
					var oBox = $("#icon_style .dynamichs");
					oBox.empty();
					var oHtmlStr = "";
					for (var i in data) {
						oHtmlStr += '<div class="col-md-1" style="padding-top:5px;padding-bottom:5px" title="'+data[i].name+'">'
						+'<a style="overflow:hidden;" href="javascript:void(0)" data-iconId="'+data[i].id+'" data-hstype="1" data-imgpath="'+data[i].absolute_path+'">'
						+'<img src="'+data[i].absolute_path+'" /><div class="tipImg" /></div></a></div>'
					}
					oBox.append(oHtmlStr);
				}
			})
			if(panoDataObj.scene_list){
				$("#purpose .scene").empty();
				$.each(panoDataObj.scene_list,function(index, el) {
					var str = '<div class="col col-md-3" data-sceneId="'+el.scene_id+'"><div>'
						+'<img src="'+el.thumbPath+'">'
						+'<div class="scene-title" title="'+el.scene_title+'">'+el.scene_title+'</div></div></div>';
					$("#purpose .scene").append(str);
				});
			}
		},
		updateHotSpotData: function(sceneName,hsName,ath,atv,hotspotType) {
			var data = panoDataObj.hotspot[sceneName];
			$(data[hotspotType]).each(function(idx){
			    if(this.name == hsName){
			        this.ath = ath;
			        this.atv = atv;
			        return false;
			    }
			});
		},
		removeHotSpotData: function(hotspotName, idx) {
			var krpano = document.getElementById('EditPano');
			var sceneName = krpano.get('xml.scene');
			var data = panoDataObj.hotspot[sceneName];
			if (data) {
			    var arr = data[hotSpotDataKey[idx]];
			    for (var i = 0; i < arr.length; i++) {
			        if (arr[i].name == hotspotName) {
			            arr.splice(i, 1);
			            i--;
			        }
			    }
			}
		},
		resetHotspotSum: function(idx) {
			if(idx){
			    $(".content_index > div.btn_content:eq("+idx+") > h5 > label").text($('div.all-edit:eq('+idx+')').find('.edit-item').length);
			    var sum = $('div.all-edit:eq('+idx+')').find('.edit-item').length;
			    if(sum == 0){
			        $('div.all-edit:eq('+idx+')').prev().show();
			    }
			}else{
			    $(".content_index > div.btn_content").each(function(index){
			        $(this).find('h5 > label').text($('div.all-edit:eq('+index+')').find('.edit-item').length);
			        var sum = $('div.all-edit:eq('+index+')').find('.edit-item').length;
			        if(sum == 0){
			            $('div.all-edit:eq('+index+')').prev().show();
			        }
			    });
			}
		},
		toggleAllNextBtn: function(flag) {
			if(flag){
			    $("#allAroundModal .all-next").removeClass("btn-default").addClass("btn-primary");
			    $("#allAroundModal .all-next").attr('disabled',false);
			}else{
			    $("#allAroundModal .all-next").removeClass("btn-primary").addClass("btn-default");
			    $("#allAroundModal .all-next").attr('disabled',true);
			}
		},
		modifySpanClick:function(el) {
			var liindex = parseInt($(el).data('liindex'));
			var hotspotidx = $(el).data('hotspotidx');
			if(liindex != undefined && hotspotidx != undefined){
			    $('#allAroundModal').data('hotspotidx',hotspotidx);
			    $('#allAroundModal .modal-header h3').text(textArr[hotspotidx]);
			    pub.toggleHotSpotUL(hotspotidx);//显示步骤菜单
			    //设置所有步骤完成
			    /*$('.allAround ul.hot-nav:eq('+hotspotidx+') > li').data('finish',true);
			    //设置修改模式
			    $('.all-next').data('ismodify',true);*/
			    //点击要更改的信息菜单项
			    $('#allAroundModal .all-next').data('ismodify',true);
			    $('.allAround ul.hot-nav:eq('+hotspotidx+') > li:eq('+liindex+')').click();
			    //将已存在的热点信息填入页面
			    var hotspotName = $(el).parents('.edit-item').data('scene');
			    $('#allAroundModal .all-next').data('hotspotname',hotspotName);
			    pub.initHotSpotDataToPage(hotspotidx,hotspotName);
			    $('#music_style p span:eq(0)').text('已选择音乐');
			    $('#allAroundModal').modal('show');
			}
		},
		toggleHotSpotUL: function(idx) {
			$(".allAround ul.hot-nav-show").hide();
			$(".allAround ul.hot-nav-show").removeClass('hot-nav-show');
			$(".allAround ul.hot-nav:eq("+idx+")").show();
			$(".allAround ul.hot-nav:eq("+idx+")").addClass('hot-nav-show');
		},
		initHotSpotDataToPage: function(hotspotidx,hotspotName) {
			var krpano = document.getElementById('EditPano');
			var sceneName = krpano.get('xml.scene');
			var data = panoDataObj.hotspot[sceneName];
			// pub.getAllImg();
			var hotspotArr = data[hotSpotDataKey[hotspotidx]];
			$(hotspotArr).each(function(idx){
			    if(this.name == hotspotName){
			    	// pub.getAllImg();
			        if(this.iconType == 'system'){
			            $('#allAroundModal .icon_choose input[name=radioOptionsExample]:eq(0)').click();
			            //选中热点图标
			            $("#icon_style .icon_text > .row a").removeClass('icon_clicked');
			            $("#icon_style .icon_text > .row a:has(img[src='"+this.thumbPath+"'])").addClass('icon_clicked');
			        }else{
			            $('#allAroundModal .icon_choose input[name=radioOptionsExample]:eq(1)').click();
			            $("#icon_style .icon_text .media_icons img").attr('src',this.imgPath);
			        }
			        switch(hotspotidx){
			            case 0:
			                // addSceneChangeHotSpotSceneArr();
			                //选中场景
			                var viewuuid = (this.linkedscene.split('_'))[1].toUpperCase();
			                $('#purpose .scene > div[data-sceneid='+viewuuid+']').click();
			                break;
			            case 1:
			                pub.resetLinkInput(this);
			                break;
			            case 2:
			                pub.resetImgsInput(this);
			                break;
			            case 3:
			                pub.resetWordInput(this);
			                break;
			            case 4:
			                pub.resetVoiceInput(this);
			                break;
			            case 5:
			                pub.resetVideoInput(this);
			                break;
			        }
			        return false;
			    }
			});
		},
		resetLinkInput: function(data) {
			if(data){
			    $('#hot_name input.form-control:eq(0)').val(data.hotspotTitle);
			    $('#hot_name input.form-control:eq(1)').val(data.link);
			    // $('#hot_name input[type=checkbox]:eq(0)').prop('checked',true);
			    $('#hot_name input[type=checkbox]:eq(0)').prop('checked',data.isShowSpotName);
			}else{
			    $('#hot_name input.form-control').val('');
			    // $('#hot_name input[type=checkbox]:eq(0)').prop('checked',true);
			    $('#hot_name input[type=checkbox]:eq(0)').prop('checked',false);
			}
		},
		resetImgsInput: function(data) {
			if(data){
			    $('#img_name input.form-control').val(data.hotspotTitle);
			    $('#img_name input[type=checkbox]').prop('checked',data.isShowSpotName);
			    $('#imgChoose ul.imghotspot-sortable').empty();
			    $(data.imgs).each(function(idx){
			        var html = '<li>'+
			            '<img data-rid="'+this.rid+'" src="'+this.src+'">'+
			            '<span class="delete"><a href="javascript:void(0)">删除</a></span>'+
			            '</li>';
			        $('#imgChoose ul.imghotspot-sortable').append(html);
			    });
			    pub.toggleAllNextBtn(true);
			}else{
			    $('#img_name input.form-control').val('');
			    $('#img_name input[type=checkbox]').prop('checked',false);
			    $('#imgChoose ul.imghotspot-sortable').html('');
			}
		},
		resetWordInput: function(data) {
			if(data){
			    $('#word_name input.form-control').val(data.hotspotTitle);
			    $('#word_name textarea.form-control').val(data.wordContent);
			    $('#word_name input[type=checkbox]').prop('checked',data.isShowSpotName);
			}else{
			    $('#word_name .form-control').val('');
			    $('#word_name input[type=checkbox]').prop('checked',false);
			}
		},
		resetVoiceInput: function(data) {
			if(data){
			    $('#speak_name input.form-control').val(data.hotspotTitle);
			    $('#speak_name input[type=checkbox]').prop('checked',data.isShowSpotName);
			    $('#music_style p span:eq(0)').text('已选择音乐：');
			    $('#music_style p span:eq(1)').text(data.musicTitle);
			    $('#music_style p').data('musicsrc',data.musicSrc);
			    $('#music_style p').data('rid',data.rid);
			}else{
			    $('#speak_name input.form-control').val('');
			    $('#speak_name input[type=checkbox]').prop('checked',false);
			    $('#music_style p span:eq(0)').text('还未选择音乐');
			    $('#music_style p span:eq(1)').text('');
			    $('#music_style p').data('musicsrc',null);
			}
		},
		resetVideoInput: function(data) {
			if(data){
			    $('#around_name input.form-control').val(data.hotspotTitle);
			    $('#around_name input[type=checkbox]').prop('checked',data.isShowSpotName);
			    html="您已经选择了视频："+data.name;
			    $("#video_choose_ok_wrap").data('location',data.location);
			    $("#video_choose_ok_wrap").html(html);
			}else{
			    $('#around_name input.form-control').val('');
			    $('#around_name input[type=checkbox]').prop('checked',false);
			    $("#video_choose_ok_wrap").html("");
			}
		},
		newHotSpot: function(idx) {
			switch(idx){
			    case 0:
			        pub.addSceneHotSpotFinish(idx);
			        break;
			    case 1:
			        pub.addLinkHotSpotFinish(idx);
			        break;
			    case 2:
			        pub.addImgHotSpotFinish(idx);
			        break;
			    case 3:
			        pub.addWordHotSpotFinish(idx);
			        break;
			    case 4:
			        pub.addVoiceHotSpotFinish(idx);
			        break;
			    case 5:
			       pub.addVideoHotSpotFinish(idx);
			        break;
			}
		},
		checkSpotData: function(param) {
			var notAll = true;
			$.each(param,function(key, value) {
				if(value === "" || value === undefined || value === null){
					console.log("必填内容填写不完整，请重新填写。");
					notAll = false;
					return false;
				}
			});
			if (notAll == false) {return false};
			$("#allAroundModal").modal("hide");
		},
		addSceneHotSpotFinish: function(idx) {
			var param = {};
			var hotspotName = pub.getHotSpotName();
			pub.getHotSpotIconData(param);
			var sceneImgSrc = $('.scene > div.scene_clicked img').attr('src');
			var imguuid = $('.scene > div.scene_clicked').data('sceneid');
			var sceneTitle = $('.scene > div.scene_clicked .scene-title').attr('title');
			var spotTitle = $("#scenehref_name").children("input:text").val();
			var sceneName = 'scene_'+imguuid;
			var isShowSpotName = $("#scenehref_name input:checkbox").prop('checked') ? 1:0;
			var krpano = document.getElementById('EditPano');
			param.ath = krpano.get("view.hlookat");
			param.atv = krpano.get("view.vlookat");
			param.name = hotspotName;
			param.linkedscene = sceneName;
			param.sceneTitle = sceneTitle;
			param.hotspotTitle = $.trim(spotTitle);
			param.sceneImg = sceneImgSrc;
			param.isShowSpotName = isShowSpotName;
			// pub.checkSpotData(param);
			var notAll = true;
			$.each(param,function(key, value) {
				if(value === "" || value === undefined || value === null){
					alert("必填内容填写不完整，请重新填写。");
					notAll = false;
					return false;
				}
			});
			if (notAll == false) {return false};
			$("#allAroundModal").modal("hide");
			pub.initSceneHotSpot(krpano,param,true,idx);
			pub.putSceneChangeHotSpotData(param,idx);
		},
		addLinkHotSpotFinish: function(idx) {
			var krpano = document.getElementById('EditPano');
			var param = {};
			var hotspotName = pub.getHotSpotName();
			pub.getHotSpotIconData(param);
			var hotspotTitle = $('#hot_name input.form-control:eq(0)').val();
			var link = $('#hot_name input.form-control:eq(1)').val();
			if(link.indexOf('http://') != 0||link.indexOf('https://')!=0){
			    link = 'http://' + link;
			}
			var isShowSpotName = $('#hot_name input[type=checkbox]:eq(0)').prop('checked') ? 1:0;
			param.ath = krpano.get("view.hlookat");
			param.atv = krpano.get("view.vlookat");
			param.name = hotspotName;
			param.hotspotTitle = $.trim(hotspotTitle);
			param.link = $.trim(link);
			param.isShowSpotName = isShowSpotName;
			var notAll = true;
			$.each(param,function(key, value) {
				if(value === "" || value === undefined || value === null){
					alert("必填内容填写不完整，请重新填写。");
					notAll = false;
					return false;
				}
			});
			if (notAll == false) {return false};
			$("#allAroundModal").modal("hide");
			pub.initSceneHotSpot(krpano,param,true,idx);
			pub.putSceneChangeHotSpotData(param,idx);
		},
		addImgHotSpotFinish: function(idx) {
			var krpano = document.getElementById('EditPano');
			var param = {};
			var hotspotName = pub.getHotSpotName();
			pub.getHotSpotIconData(param);
			var hotspotTitle = $('#img_name input.form-control').val();
			//var musicSrc = $('#music_style p').data('musicsrc');
			var isShowSpotName = $('#img_name input[type=checkbox]').prop('checked') ? 1:0;
			param.ath = krpano.get("view.hlookat");
			param.atv = krpano.get("view.vlookat");
			param.name = hotspotName;
			param.hotspotTitle = $.trim(hotspotTitle);
			param.galleryName = 'glr'+hotspotName;
			param.isShowSpotName = isShowSpotName;
			param.imgs = pub.buildGalleryImgData();

			var notAll = true;
			$.each(param,function(key, value) {
				if(value === "" || value === undefined || value === null){
					alert("必填内容填写不完整，请重新填写。");
					notAll = false;
					return false;
				}
			});
			if (notAll == false) {return false};
			$("#allAroundModal").modal("hide");
			// pub.checkSpotData(param);
			pub.initSceneHotSpot(krpano,param,true,idx);
			pub.putSceneChangeHotSpotData(param,idx);
		},
		addWordHotSpotFinish: function(idx) {
			var krpano = document.getElementById('EditPano');
			var param = {};
			var hotspotName = pub.getHotSpotName();
			pub.getHotSpotIconData(param);
			var wordTitle = $('#word_name input.form-control').val();
			var wordContent = $('#word_name textarea.form-control').val();
			var isShowSpotName = $('#word_name input[type=checkbox]').prop('checked') ? 1:0;
			param.ath = krpano.get("view.hlookat");
			param.atv = krpano.get("view.vlookat");
			param.name = hotspotName;
			param.hotspotTitle = $.trim(wordTitle);
			param.wordContent = $.trim(wordContent);
			param.isShowSpotName = isShowSpotName;
			var notAll = true;
			$.each(param,function(key, value) {
				if(value === "" || value === undefined || value === null){
					alert("必填内容填写不完整，请重新填写。");
					notAll = false;
					return false;
				}
			});
			if (notAll == false) {return false};
			$("#allAroundModal").modal("hide");
			// pub.checkSpotData(param);
			pub.initSceneHotSpot(krpano,param,true,idx);
			pub.putSceneChangeHotSpotData(param,idx);
		},
		addVoiceHotSpotFinish: function(idx) {
			var krpano = document.getElementById('EditPano');
			var param = {};
			var hotspotName = pub.getHotSpotName();
			pub.getHotSpotIconData(param);
			var hotspotTitle = $('#speak_name input.form-control').val();
			var musicSrc = $('#music_style p').data('musicsrc');
			var musicRid = $('#music_style p').data('rid');
			var musicTitle = $('#music_style p span:eq(1)').text();
			var isShowSpotName = $('#speak_name input[type=checkbox]').prop('checked') ? 1:0;
			param.ath = krpano.get("view.hlookat");
			param.atv = krpano.get("view.vlookat");
			param.name = hotspotName;
			param.hotspotTitle = $.trim(hotspotTitle);
			param.musicSrc = musicSrc;
			param.musicTitle = musicTitle;
			param.rid = musicRid;
			param.isShowSpotName = isShowSpotName;
			var notAll = true;
			$.each(param,function(key, value) {
				if(value === "" || value === undefined || value === null){
					alert("必填内容填写不完整，请重新填写。");
					notAll = false;
					return false;
				}
			});
			if (notAll == false) {return false};
			$("#allAroundModal").modal("hide");
			// pub.checkSpotData(param);
			pub.initSceneHotSpot(krpano,param,true,idx);
			pub.putSceneChangeHotSpotData(param,idx);
		},
		addVideoHotSpotFinish: function(idx) {
			var krpano = document.getElementById('EditPano');
			var param = {};
			var hotspotName = pub.getHotSpotName();
			pub.getHotSpotIconData(param);
			var hotspotTitle = $('#around_name input.form-control').val();
			var isShowSpotName = $('#around_name input[type=checkbox]').prop('checked') ? 1:0;
			param.ath = krpano.get("view.hlookat");
			param.atv = krpano.get("view.vlookat");
			param.name = hotspotName;
			param.hotspotTitle = $.trim(hotspotTitle);
			param.location = $("#video_choose_ok_wrap").data('location');
			param.rid = $("#video_choose_ok_wrap").data('rid');
			param.isShowSpotName = isShowSpotName;
			var notAll = true;
			$.each(param,function(key, value) {
				if(value === "" || value === undefined || value === null){
					alert("必填内容填写不完整，请重新填写。");
					notAll = false;
					return false;
				}
			});
			if (notAll == false) {return false};
			$("#allAroundModal").modal("hide");
			// pub.checkSpotData(param);
			pub.initSceneHotSpot(krpano,param,true,idx);
			pub.putSceneChangeHotSpotData(param,idx);
		},
		getHotSpotName: function() {
			var name = 'id'+panoDataObj.id+'_'+new Date().getTime();
			var krpano = document.getElementById('EditPano');
			var hotspot = krpano.get('hotspot['+name+']');
			if(hotspot){
			    name = pub.getHotSpotName();
			}
			return name;
		},
		getHotSpotIconData: function(param) {
			var iconType = $('#icon_style .icon_choose input[name=radioOptionsExample]:checked').val();
			var hotspotType,imgSrc,imgpath;
			if(iconType == 'system'){
			    hotspotType = $('.icon_text .row a.icon_clicked').data('hstype');
			    hotspotType++;
			    imgpath = $('.icon_text .row a.icon_clicked').data('imgpath');
			    imgSrc = $('.icon_text .row a.icon_clicked img').attr('src');
			    iconId = $('.icon_text .row a.icon_clicked').data('iconid');
			}else{
			    hotspotType = 1;
			    imgpath = $('#icon_style .media_icons img').attr('src');
			    imgSrc = imgpath;
			}
			param.iconType = iconType;
			param.imgPath = imgpath;
			param.thumbPath = imgSrc;
			param.isDynamic = hotspotType;
			param.iconId = iconId;
		},
		initSceneHotSpot: function(krpano,param,settingFlag,idx) {
			if(settingFlag){
			    var mthml = '';
			    // not checked
			    switch(idx){
			        case 0:
			        	  krpano.call('addSceneChangeHotSpot("'+param.thumbPath+'","'+ (param.name) +'",'+html_encode(param.linkedscene)+','+(param.ath)+','+(param.atv)+','+param.isDynamic+',true,true,'+(param.isShowSpotName)+',NOBLEND,'+html_encode(param.sceneTitle)+')');
			        	  mthml = '<div class="edit-item" data-scene="'+param.name+'">'
			        				+'<a class="card"><span class="caption"><span class="group-location-icon">定位</span>'
			        				+'<span class="group-change-icon" data-liindex="0" data-hotspotidx="0">修改</span>'
			        				+'<span class="group-delte">删除</span></span></a>'
			        				+'<div class="group-item-title">'
			        				+'<img class="thumbimg" src="'+param.thumbPath+'" />'
			        				+'<span>'+html_encode(param.sceneTitle)+'</span></div></div>';
			              break;
			        case 1:
			        	// krpano.call('addLinkHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',true,true,'+this.link+','+this.isShowSpotName+')');
			            krpano.call('addLinkHotSpot("'+param.imgPath+'","'+ (param.name) +'",'+html_encode(param.hotspotTitle)+','+(param.ath)+','+(param.atv)+','+param.isDynamic+',true,true,'+param.link+','+param.isShowSpotName+')');
			            mthml = '<div class="edit-item" data-scene="'+param.name+'">' +
			                '<a class="card">' +
			                '<span class="caption"><span class="group-location-icon">定位</span>' +
			                '<span class="group-change-icon" data-liindex="0" data-hotspotidx="1">修改</span><span class="group-delte">删除</span>' +
			                '</span> </a> ' +
			                '<div class="group-item-title"> ' +
			                '<img class="thumbimg" src="'+param.thumbPath+'"><span>'+html_encode(param.hotspotTitle)+'</span></div> ' +
			                '</div>';
			            break;
			        case 2:
			            krpano.call('addImgHotSpot("'+param.imgPath+'","'+ (param.name) +'",'+html_encode(param.hotspotTitle)+','+(param.ath)+','+(param.atv)+','+param.isDynamic+',true,true,'+param.galleryName+','+param.isShowSpotName+','+param.imgs.src+')');
			            mthml = '<div class="edit-item" data-scene="'+param.name+'">' +
			                '<a class="card">' +
			                '<span class="caption">' +
			                '<span class="group-location-icon">定位</span><span class="group-change-icon" data-liindex="0" data-hotspotidx="2">修改</span><span class="group-delte">删除</span>' +
			                '</span> </a> ' +
			                '<div class="group-item-title"> ' +
			                '<img class="thumbimg" src="'+param.thumbPath+'"><span>'+html_encode(param.hotspotTitle)+'</span></div> ' +
			                '</div>';
			            break;
			        case 3:
			            krpano.call('addWordHotSpot("'+param.imgPath+'","'+ (param.name) +'",'+html_encode(param.hotspotTitle)+','+(param.ath)+','+(param.atv)+','+param.isDynamic+',true,true,'+html_encode(param.wordContent)+','+param.isShowSpotName+')');
			            mthml = '<div class="edit-item" data-scene="'+param.name+'">' +
			                '<a class="card">' +
			                '<span class="caption">' +
			                '<span class="group-location-icon">定位</span><span class="group-change-icon" data-liindex="0" data-hotspotidx="3">修改</span><span class="group-delte">删除</span>' +
			                '</span> </a> ' +
			                '<div class="group-item-title"> ' +
			                '<img class="thumbimg" src="'+param.thumbPath+'"><span>'+html_encode(param.hotspotTitle)+'</span></div> ' +
			                '</div>';
			            break;
			        case 4:
			            krpano.call('addVoiceHotSpot("'+param.imgPath+'","'+ (param.name) +'",'+html_encode(param.hotspotTitle)+','+(param.ath)+','+(param.atv)+','+param.isDynamic+',true,true,'+param.musicSrc+','+param.isShowSpotName+')');
			            mthml = '<div class="edit-item" data-scene="'+param.name+'">' +
			                '<a class="card">' +
			                '<span class="caption">' +
			                '<span class="group-location-icon">定位</span><span class="group-change-icon" data-liindex="0" data-hotspotidx="4">修改</span><span class="group-delte">删除</span>' +
			                '</span> </a> ' +
			                '<div class="group-item-title"> ' +
			                '<img class="thumbimg" src="'+param.thumbPath+'"><span>'+html_encode(param.hotspotTitle)+'</span></div> ' +
			                '</div>';
			            break;
			        case 5:
			            krpano.call('addVideoHotSpot("'+param.imgPath+'","'+ (param.name) +'",'+html_encode(param.hotspotTitle)+','+(param.ath)+','+(param.atv)+','+param.isDynamic+',true,true,'+param.location+','+param.isShowSpotName+')');
			            mthml = '<div class="edit-item" data-scene="'+param.name+'">' +
			                '<a class="card">' +
			                '<span class="caption">' +
			                '<span class="group-location-icon">定位</span><span class="group-change-icon" data-liindex="0" data-hotspotidx="5">修改</span><span class="group-delte">删除</span>' +
			                '</span> </a> ' +
			                '<div class="group-item-title"> ' +
			                '<img class="thumbimg" src="'+param.thumbPath+'"><span>'+html_encode(param.hotspotTitle)+'</span></div> ' +
			                '</div>';
			            break;
			    }
			    // if (idx>5) --idx;
			    $('div.all-edit:eq('+idx+')').prev("p").hide();
			    $('div.all-edit:eq('+idx+')').append(mthml);
			    pub.resetHotspotSum(idx);
			}else{
				// not check
			    switch(idx){
			        case 0:
			        	krpano.call('addSceneChangeHotSpot("'+param.thumbPath+'","'+ (param.name) +'",'+html_encode(param.linkedscene)+','+(param.ath)+','+(param.atv)+','+param.isDynamic+',true,true,'+(param.isShowSpotName)+',NOBLEND,'+html_encode(param.sceneTitle)+')');
			            // krpano.call('addSceneChangeHotSpot("'+param.imgPath+'","'+ (param.name) +'",'+param.linkedscene+','+(param.ath)+','+(param.atv)+','+param.isDynamic+','+settingFlag+',true)');
			            break;
			        case 1:
			        	  krpano.call('addLinkHotSpot("'+param.imgPath+'","'+ (param.name) +'",'+html_encode(param.hotspotTitle)+','+(param.ath)+','+(param.atv)+','+param.isDynamic+',true,true,'+param.link+','+param.isShowSpotName+')');
			            // krpano.call('addLinkHotSpot("'+param.imgPath+'","'+ (param.name) +'",'+html_encode(param.hotspotTitle)+','+(param.ath)+','+(param.atv)+','+param.isDynamic+','+settingFlag+',true,'+param.link+','+param.isShowSpotName+')');
			            break;
			        case 2:
			        	  krpano.call('addImgHotSpot("'+param.imgPath+'","'+ (param.name) +'",'+html_encode(param.hotspotTitle)+','+(param.ath)+','+(param.atv)+','+param.isDynamic+',true,true,'+param.galleryName+','+param.isShowSpotName+')');
			            // krpano.call('addImgHotSpot("'+param.imgPath+'","'+ (param.name) +'",'+html_encode(param.hotspotTitle)+','+(param.ath)+','+(param.atv)+','+param.isDynamic+','+settingFlag+',true,'+param.galleryName+','+param.isShowSpotName+')');
			            break;
			        case 3:
			        	  krpano.call('addWordHotSpot("'+param.imgPath+'","'+ (param.name) +'",'+html_encode(param.hotspotTitle)+','+(param.ath)+','+(param.atv)+','+param.isDynamic+',true,true,'+html_encode(param.wordContent)+','+param.isShowSpotName+')');
			            // krpano.call('addWordHotSpot("'+param.imgPath+'","'+ (param.name) +'",'+html_encode(param.hotspotTitle)+','+(param.ath)+','+(param.atv)+','+param.isDynamic+','+settingFlag+',true,'+html_encode(param.wordContent)+','+param.isShowSpotName+')');
			            break;
			        case 4:
			        	  krpano.call('addVoiceHotSpot("'+param.imgPath+'","'+ (param.name) +'",'+html_encode(param.hotspotTitle)+','+(param.ath)+','+(param.atv)+','+param.isDynamic+',true,true,'+param.musicSrc+','+param.isShowSpotName+')');
			            // krpano.call('addVoiceHotSpot("'+param.imgPath+'","'+ (param.name) +'",'+html_encode(param.hotspotTitle)+','+(param.ath)+','+(param.atv)+','+param.isDynamic+','+settingFlag+',true,'+param.musicSrc+','+param.isShowSpotName+')');
			            break;
			        case 5:
			        	  krpano.call('addVideoHotSpot("'+param.imgPath+'","'+ (param.name) +'",'+html_encode(param.hotspotTitle)+','+(param.ath)+','+(param.atv)+','+param.isDynamic+',true,true,'+param.location+','+param.isShowSpotName+')');
			            // krpano.call('addImgTextHotSpot("'+param.imgPath+'","'+ (param.name) +'",'+html_encode(param.hotspotTitle)+','+(param.ath)+','+(param.atv)+','+param.isDynamic+','+settingFlag+',true,'+imgtext_encode(param.imgtext_wordContent)+','+param.isShowSpotName+')');
			            break;
			    }
			}
		},
		resetHotspotSum: function(idx) {
			if(idx){
			    $(".content_index > div.btn_content:eq("+idx+") > h5 > label").text($('div.all-edit:eq('+idx+')').find('.edit-item').length);
			    var sum = $('div.all-edit:eq('+idx+')').find('.edit-item').length;
			    if(sum == 0){
			        $('div.all-edit:eq('+idx+')').prev().show();
			    }
			}else{
			    $(".content_index > div.btn_content").each(function(index){
			        $(this).find('h5 > label').text($('div.all-edit:eq('+index+')').find('.edit-item').length);
			        var sum = $('div.all-edit:eq('+index+')').find('.edit-item').length;
			        if(sum == 0){
			            $('div.all-edit:eq('+index+')').prev().show();
			        }
			    });
			}
		},
		putSceneChangeHotSpotData: function(hotspotObj,idx) {
			if (idx>5) --idx;
			var krpano = document.getElementById('EditPano');
			var sceneName = krpano.get('xml.scene');
			// var data = $('#panoSettingModal .hot').data(sceneName);
			var data = panoDataObj.hotspot[sceneName];
			// debugger;
			if(!data){
			    data = {
			        scene:[],
			        link:[],
			        image:[],
			        text:[],
			        voice:[],
			        video:[]
			    };
			    panoDataObj.hotspot[sceneName] = data;
			}
			if (!data[hotSpotDataKey[idx]]) {
			    data[hotSpotDataKey[idx]] = [];
			}
			data[hotSpotDataKey[idx]].push(hotspotObj);
		},
		buildGalleryImgData: function() {
			var imgs = {};
			var aimImg = $('#imgChoose ul.imghotspot-sortable li').find('img')
			imgs.src = aimImg.attr('src');
			imgs.rid = aimImg.data('rid');
			return imgs;
		},
		modifyHotSpotData: function(hotspotidx) {
			var krpano = document.getElementById('EditPano');
			var sceneName = krpano.get('xml.scene');
			var hotspotName = $('#allAroundModal .all-next').data('hotspotname');
			var data = panoDataObj.hotspot[sceneName];
			var param = {};
			pub.getHotSpotIconData(param);
			$(data[hotSpotDataKey[hotspotidx]]).each(function(idx){
			    var self = this;
			    if(this.name == hotspotName){
			        var hsTitle = '';
			        switch(hotspotidx){
			            case 0:
			                var sceneImgSrc = $('.scene > div.scene_clicked img').attr('src');
			                var imguuid = $('.scene > div.scene_clicked').data('sceneid');
			                var sceneTitle = $('.scene > div.scene_clicked .scene-title').attr('title');
			                param.linkedscene = imguuid==null?self.linkedscene:'scene_'+imguuid;
			                param.sceneTitle = sceneTitle==""?self.sceneTitle:sceneTitle;
			                param.sceneImg = sceneImgSrc==undefined?self.sceneImg:sceneImgSrc;
			                param.isShowSpotName = $("#scenehref_name input:checkbox").prop('checked') ? 1:0;
			                //设置场景图片和名称
			                $('#panoSettingModal .hot .btn_content .edit-item[data-scene='+hotspotName+']').find('.group-item-title img:eq(0)').attr('src',param.sceneImg);
			                hsTitle = param.sceneTitle;
			                break;
			            case 1:
			                var hotspotTitle = $('#hot_name input.form-control:eq(0)').val();
			                var link = $('#hot_name input.form-control:eq(1)').val();
			                if(link.indexOf('http://') != 0 || link.indexOf('https://') != 0){
			                    link = 'http://' + link;
			                }
			                var isShowSpotName = $('#hot_name input[type=checkbox]:eq(0)').is(':checked') ? 1:0;
			                param.hotspotTitle = hotspotTitle;
			                param.link = link;
			                param.isShowSpotName = isShowSpotName;
			                hsTitle = param.hotspotTitle;
			                break;
			            case 2:
			                var hotspotTitle = $('#img_name input.form-control').val();
			                var isShowSpotName = $('#img_name input[type=checkbox]').is(':checked') ? 1:0;
			                param.hotspotTitle = hotspotTitle;
			                param.galleryName = 'glr'+hotspotName;
			                param.isShowSpotName = isShowSpotName;
			                param.imgs = pub.buildGalleryImgData();
			                hsTitle = param.hotspotTitle;
			                break;
			            case 3:
			                var wordTitle = $('#word_name input.form-control').val();
			                var wordContent = $('#word_name textarea.form-control').val();
			                var isShowSpotName = $('#word_name input[type=checkbox]').is(':checked') ? 1:0;
			                param.hotspotTitle = wordTitle;
			                param.wordContent = wordContent;
			                param.isShowSpotName = isShowSpotName;
			                hsTitle = param.hotspotTitle;
			                break;
			            case 4:
			                var hotspotTitle = $('#speak_name input.form-control').val();
			                var musicSrc = $('#music_style p').data('musicsrc');
			                var musicRid = $('#music_style p').data('rid');
			                var isShowSpotName = $('#speak_name input[type=checkbox]').is(':checked') ? 1:0;
			                param.hotspotTitle = hotspotTitle;
			                param.musicSrc = musicSrc;
			                param.rid = musicRid;
			                param.isShowSpotName = isShowSpotName;
			                hsTitle = param.hotspotTitle;
			                break;
			            case 5:
			                var hotspotTitle = $('#around_name input.form-control').val();
			                var isShowSpotName = $('#around_name input[type=checkbox]').is(':checked') ? 1:0;
			                param.hotspotTitle = hotspotTitle;
			                // param.objid = objid;
			                param.location =  $('#video_choose_ok_wrap').data('location');
			                param.isShowSpotName = isShowSpotName;
			                hsTitle = param.hotspotTitle;
			                break;
			        }
			        $.each(param,function(key,value){
			            self[key] = value;
			        });
			        krpano.call('removehotspot('+self.name+');');
			        // not check
			        switch(hotspotidx){
			            case 0:
			                // krpano.call('addSceneChangeHotSpot("'+self.imgPath+'","'+ (self.name) +'",'+self.linkedscene+','+(self.ath)+','+(self.atv)+','+self.isDynamic+',true,true)');
			                krpano.call('addSceneChangeHotSpot("'+self.imgPath+'","'+ (self.name) +'",'+self.linkedscene+','+(self.ath)+','+(self.atv)+','+self.isDynamic+',true,true,'+(self.isShowSpotName)+',NOBLEND,'+html_encode(self.sceneTitle)+')');
			                break;
			            case 1:
			            	krpano.call('addLinkHotSpot("'+self.imgPath+'","'+ (self.name) +'",'+html_encode(self.hotspotTitle)+','+(self.ath)+','+(self.atv)+','+self.isDynamic+',true,true,'+self.link+','+self.isShowSpotName+')');
			                // krpano.call('addLinkHotSpot("'+self.imgPath+'","'+ (self.name) +'",'+html_encode(self.hotspotTitle)+','+(self.ath)+','+(self.atv)+','+self.isDynamic+',true,true,'+self.link+','+self.isShowSpotName+')');
			                break;
			            case 2:
			            	krpano.call('addImgHotSpot("'+self.imgPath+'","'+ (self.name) +'",'+html_encode(self.hotspotTitle)+','+(self.ath)+','+(self.atv)+','+self.isDynamic+',true,true,'+self.galleryName+','+self.isShowSpotName+','+self.imgs.src+')');
			                // krpano.call('addImgHotSpot("'+self.imgPath+'","'+ (self.name) +'",'+html_encode(self.hotspotTitle)+','+(self.ath)+','+(self.atv)+','+self.isDynamic+',true,true,'+self.galleryName+','+self.isShowSpotName+')');
			                break;
			            case 3:
			            	krpano.call('addWordHotSpot("'+self.imgPath+'","'+ (self.name) +'",'+html_encode(self.hotspotTitle)+','+(self.ath)+','+(self.atv)+','+self.isDynamic+',true,true,'+html_encode(self.wordContent)+','+self.isShowSpotName+')');
			                // krpano.call('addWordHotSpot("'+self.imgPath+'","'+ (self.name) +'",'+html_encode(self.hotspotTitle)+','+(self.ath)+','+(self.atv)+','+self.isDynamic+',true,true,'+html_encode(self.wordContent)+','+self.isShowSpotName+')');
			                break;
			            case 4:
			            	krpano.call('addVoiceHotSpot("'+self.imgPath+'","'+ (self.name) +'",'+html_encode(self.hotspotTitle)+','+(self.ath)+','+(self.atv)+','+self.isDynamic+',true,true,'+self.musicSrc+','+self.isShowSpotName+')');
			                // krpano.call('addVoiceHotSpot("'+self.imgPath+'","'+ (self.name) +'",'+html_encode(self.hotspotTitle)+','+(self.ath)+','+(self.atv)+','+self.isDynamic+',true,true,'+self.musicSrc+','+self.isShowSpotName+')');
			                break;
			            case 5:
			            	krpano.call('addVideoHotSpot("'+self.imgPath+'","'+ (self.name) +'",'+html_encode(self.hotspotTitle)+','+(self.ath)+','+(self.atv)+','+self.isDynamic+',true,true,'+self.location+','+self.isShowSpotName+')');
			                // krpano.call('addImgTextHotSpot("'+self.imgPath+'","'+ (self.name) +'",'+html_encode(self.hotspotTitle)+','+(self.ath)+','+(self.atv)+','+self.isDynamic+',true,true,'+imgtext_encode(self.imgtext_wordContent)+','+self.isShowSpotName+')');
			                break;
			        }
			        $('#panoExset .hot .btn_content .edit-item[data-scene='+hotspotName+']').find('.group-item-title img.thumbimg').attr('src',param.thumbPath);
			        $('#panoExset .hot .btn_content .edit-item[data-scene='+hotspotName+']').find('.group-item-title span').text(hsTitle);
			        return false;
			    }
			});
		},
		allEvent: function() {

			//图片热点图片删除
			    $(document).on('click','.imghotspot-sortable .delete a',function(e){
			        $(this).parents('li').remove();
			        if($('.imghotspot-sortable li').length == 0){
			            pub.toggleAllNextBtn(false);
			        }
			        e.stopPropagation();
			    });

			$(document).on('click', '.hot-nav-show li', function(event) {
				$(this).addClass('liclick').css('background', 'rgb(94, 178, 228)')
					.siblings().removeClass('liclick').css('background', 'rgb(73, 74, 81)');
				if($(this).nextAll().length>0){
				    $("#allAroundModal .modal-footer").find('button').html('下一步');
				}else{
				    $("#allAroundModal .modal-footer").find('button').html('完成');
				}
				var showId = $(this).data('showid').slice(1);
				pub.tabSpot(showId);
				event.preventDefault();
			});
			$(document).on('click', '#purpose .col-md-3', function(event) {
				$(this).addClass('scene_clicked')
					.siblings().removeClass('scene_clicked');
				var nowTitle = $(".scene_clicked").find('.scene-title').html();
				$("#scenehref_name .scenehref_name").val(nowTitle);
				// $("#allAroundModal .modal-footer").find('button').attr('disabled',false);
				pub.toggleAllNextBtn(true);
				// event.preventDefault();
			});
			/*$(".btn-group-vertical button").click(function() {
				//	切换总菜单对应事件
				var oEditIndex = $(this).index();
				if(oEditIndex == 1){
					$(".square_eye").hide();
					$(this).addClass('setting-btn-clicked').siblings().removeClass('setting-btn-clicked');
					$(".pano-setting-content").children('.advanced-setting-background').eq(oEditIndex).animate({ right: "180px" }, "fast").animate({ right: "160px" }, "fast")
							.siblings('.advanced-setting-background').animate({ right: "-320px" }, 1);
					resetAdvSettingShowData();
					pub.addAllSpot();
				}
			});*/

			$("#home1 button").click(function() {
				$(this).addClass('spotNow').siblings('button').removeClass('spotNow');
				var oEditIndex = $(this).index();
				var nowIndex = oEditIndex-1;
				$(".hot .btn_content").eq(nowIndex).css({
					top: '270px',
					opacity: '1'
				}).siblings('.btn_content').css({
					top: '0',
					opacity: '0'
				});
			});

			$("#allAroundModal").on('click', '#closeSpot', function(event) {
				$("#allAroundModal").modal('hide');
				event.preventDefault();
			});

			$("body").on('change', '#icon_style input', function(event) {
				var nowVal = $(this).val();
				switch (nowVal){
					case "system":
						$(".icon_text").children('.row').show();
						$(".icon_text").children('.media_icons').hide();
						break;
					case "custom":
						$(".icon_text").children('.row').hide();
						$(".icon_text").children('.media_icons').show();
						break;
				}
			});

			$("body").on('click', '.icon_text .col-md-1', function(event) {
				$(".icon_text").find('.col-md-1').children('a').removeClass('icon_clicked');
				$(this).children('a').addClass('icon_clicked');
				pub.toggleAllNextBtn(true);
			});

			$("body").on('click', '#allAroundModal .modal-footer button', function(event) {
				var finishIndex = $(".hot-nav-show").index();
				var nowLi = $(".hot-nav-show").children('.liclick');
				var liCount = nowLi.index();
				var allCount = $(".hot-nav-show").children('li').length;
				var showId = nowLi.next('li');
				if( (liCount+1) == allCount ){
					// $("#allAroundModal").modal("hide");
					var ismodify = $(this).data('ismodify');
					if(ismodify){
						pub.modifyHotSpotData(finishIndex);
						$("#allAroundModal").modal("hide");
					}else{
						pub.newHotSpot(finishIndex);
					}
				}else{
					nowLi.next('li').addClass('liclick').css('background', 'rgb(94, 178, 228)')
						.siblings().removeClass('liclick').css('background', 'rgb(73, 74, 81)');
				}
				if($(".hot-nav-show").children('.liclick').nextAll().length>0){
					$("#allAroundModal .modal-footer").find('button').html('下一步');
				}else{
					$("#allAroundModal .modal-footer").find('button').html('完成');
				}
				var showId = $(".hot-nav-show").children('.liclick').data('showid').slice(1);
				pub.tabSpot(showId);
			});

			$(document).on('click',"#videoMater #object_list .col-md-3",function(){
			    var html = "";
			    // var type = $("#modal_obj").data('type');
			    // if ( type=='obj' ) {
			    //     html =' <div class="col-md-3" id="obj_choose_ok" '+
			    //               '   data-objid="'+$(this).data('objid')+'" data-thumb="'+$(this).data('thumb')+'"'+
			    //               '  <div class="card">'+
			    //               '    <div class="media-wrapper">'+
			    //               '      <img src="'+$(this).data('thumb')+'">'+
			    //               '     </div>'+
			    //               '  </div>'+
			    //               ' </div>';
			    //     $("#obj_choose_ok_wrap").html(html);
			    // }else if(type=='video'){
			        html="您已经选择了视频："+$(this).data('name');
			        $("#video_choose_ok_wrap").data('location',$(this).data('location'));
			        $("#video_choose_ok_wrap").data('rid',$(this).data('id'));
			        // $("#video_choose_ok_wrap").data('videoUrl',$(this).data('name'));
			        $("#video_choose_ok_wrap").html(html);
			    // }
			    $("#videoMater").modal('hide');
			    pub.toggleAllNextBtn(true);
			})

			$(document).on('click', '#closeVideo', function(event) {
				$("#videoMater").modal('hide');
				event.preventDefault();
			});

			$(document).on('click', '.edit-item .caption > span', function(e) {
			    var self = this;
			    var idx = $(e.target).index();
			    var hotspotName = $(this).parents(".edit-item").data('scene');
			    var krpano = document.getElementById('EditPano');
			    if ($(this).hasClass('group-location-icon')) { //定位
			        var curFov = krpano.get('view.fov');
			        krpano.call('looktohotspot(' + hotspotName + ',' + curFov + ')');
			    } else if ($(this).hasClass('group-delte')) { //删除热点
			        krpano.call('removehotspot(' + hotspotName + ');');
			        krpano.call('removeplugin(' + ('tooltip_' + hotspotName) + ',true);');
			        var hotspotIdx = $(e.target).parents('.btn_content').index();
			        pub.removeHotSpotData(hotspotName, hotspotIdx);
			        $(this).parents(".edit-item").remove();
			        pub.resetHotspotSum();
			    } else {
			    	//	修改热点
			        /*if ($("#allAroundModal .icon_text > div.row div.col-md-1").length == 0) {
			            //查询图片媒体资源
			            var sb = _U.getSubmit("/member/mediares", null, "ajax", false);
			            sb.pushData("act", 'list');
			            sb.pushData("type", 'system');
			            sb.pushData("media_type", '0,1');
			            sb.submit(function() {
			                $("#allAroundModal .icon_text > div.row").html('');
			            }, function(data) {
			                addDefMediaHotSpotRes(data);
			                modifySpanClick(self);
			            });
			        } else {*/
			            pub.modifySpanClick(self);
			        // }
			    }
			});
		}

	}
	return pub;
})();
hotspotInd.Int();

function loadGallery(){
    var krpano = document.getElementById('krpanoSWFObject');
    if(krpano){
        var hotspotObj = buildHotspotSetting();
        var xmlStr = '<krpano>';
        $.each(hotspotObj,function(sceneName,value){
            if(value){
                $(value.image).each(function(idx){
                    xmlStr += '<gallery name="'+this.galleryName+'" title="">';
                    $(this.imgs).each(function(idx){
                        xmlStr += '<img name="img'+idx+'" url="'+this.src+'" title="" />';
                    });
                    xmlStr += '</gallery>';
                });
            }
        });
        xmlStr += '</krpano>';
        krpano.call('loadxml('+xmlStr+',null,MERGE);');
    }
}



//	id 	EditPano