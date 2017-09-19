var krpano = document.getElementById("ViewPano");
var viewPano = null;
// var panoramic_id = $(".works-container").attr("id");
var panoDataObj = {
    id: panoramic_id
};
var panoInt = (function() {
	var newPano = "";
	var pub = {
		int: function() {
			$.ajax({
			    url: pano_edit_json,
			    type: 'post',
			    dataType: 'json',
			    data: {panoramic_id: panoramic_id},
			    success: function(data) {
			        if(data.status == "1"){
			            viewPano = data.data;
			            $.extend(panoDataObj,viewPano);
			            // console.log(viewPano);
			        }
			    }
			})
			pub.panoTabShow();
		},
		panoEditInt: function() {
			console.log("panoEditInt");
		},
		panoTabShow: function(argument) {
			$(".btn-group-vertical button").click(function() {
				var oEditIndex = $(this).data('btnAim');
				var objM;
				resetAdvSettingShowData();
				switch(oEditIndex){
					case "eye": 
						objM = $(".pano-setting-content div.eyes");
						$(".eyes a.default-tab-shijiao").click();//点击初始视角按钮
						// eyes_obj.resetScene();
						break;
					case "hotspot":
						objM = $(".pano-setting-content div.hot");
						hotspotInd.addAllSpot();
						break;
					case "sandbox":
						$('#sandImg .sand-img-cont').remove();
						objM = $(".pano-setting-content div.sandTable");
						//实例化沙盘信息
						$('.sandtable-window input[type=checkbox]').prop('checked',panoDataObj.sand_table.isOpen);
						$(panoDataObj.sand_table.sandTables).each(function(idx){
						    $('#sandDesc').hide();
						    sand_table_obj.addSandTableImg({
						        src:this.imgPath,
						        img_id:this.imgID,
						    });
						    $('#sandImg .sand-img-cont:last').data('sand-table-data',this.sceneOpt);
						});
						break;
					case "effect":
						objM = $(".pano-setting-content div.specialEffect");
						special_effect_obj.resetScene();
						break;
					case "guide":
						objM = $(".pano-setting-content div.visite");
						$(".timer").show();
						break;
					default:
						console.log("default");
				}
				objM.siblings().animate({right: '-320px'}, 1);
				objM.animate({right: '180px'}, "fast").animate({right: '160px'}, "fast");
				$(this).siblings('.setting-btn-clicked').removeClass('setting-btn-clicked');
				$(this).addClass('setting-btn-clicked');
			});
		},
		panoViewInt: function(sceneName) {
			var krpano = document.getElementById("ViewPano");
			// console.log(krpano);
			this.intHotspotSetting(sceneName,krpano);
			this.initEffectSetting(sceneName,krpano);
			this.initSandTableSetting(sceneName,krpano);
		},
		intViewSetting: function(name) {
		        var krpano = document.getElementById("ViewPano");
		        var angelObj = null;
		        var angleData = panoDataObj.angle_of_view;
		        angleData.forEach(function(ele) {
		            if(ele.sceneName == name){
		                // console.log(ele.sceneName);
		                angelObj = ele;
		            }
		        })
		        // console.log(angelObj);
		        if(angelObj){
		            krpano.set('view.vlookat', angelObj.vlookat);
		            krpano.set('view.hlookat', angelObj.hlookat);
		            krpano.set('view.fov', angelObj.fov);
		            krpano.set('view.fovmin', angelObj.fovmin);
		            krpano.set('view.fovmax', angelObj.fovmax);
		            krpano.set('view.vlookatmin', angelObj.vlookatmin);
		            krpano.set('view.vlookatmax', angelObj.vlookatmax);
		            // krpano.set('autorotate.horizon', angelObj.keepView ? "off" : "0.0");
		            krpano.set('view.hlookatmin', angelObj.hlookatmin);
		            krpano.set('view.hlookatmax', angelObj.hlookatmax);
		        }
		        this.addShadeImg(name);
		},
		intHotspotSetting: function(name,krpano) {
			// var krpano = document.getElementById("ViewPano");
			
			var spotObj = null;
			var spotData = panoDataObj.hotspot;
			if(spotData.hasOwnProperty(name) == true){
				spotObj = spotData[name];
			}
			// console.log(spotObj);
			$.each(spotObj,function(key,value){
				if(key == 'scene'){
				    $(value).each(function(idx){
				        krpano.call('addSceneChangeHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+this.linkedscene+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+(this.isShowSpotName)+',NOBLEND,'+html_encode(this.hotspotTitle)+')');
				        // console.log(this.name);
				    });
				}else if(key == 'link'){
				    $(value).each(function(idx){
				        krpano.call('addLinkHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+this.link+','+this.isShowSpotName+')');
				        // console.log(this);
				    });
				}else if(key == 'image'){
				    $(value).each(function(idx){
				        // console.log(this);
				        krpano.call('addImgHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+this.galleryName+','+this.isShowSpotName+','+this.imgs.src+')');
				    });
				}else if(key == 'text'){
				    $(value).each(function(idx){
				        // console.log(this.name);
				        krpano.call('addWordHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+html_encode(this.wordContent)+','+this.isShowSpotName+')');
				    });
				}else if(key == 'voice'){
				    $(value).each(function(idx){
				        // console.log(this.name);
				        krpano.call('addVoiceHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+this.musicSrc+','+this.isShowSpotName+')');
				    });
				}else if(key == 'video'){
				    $(value).each(function(idx){
				        // console.log(this.name);
				        krpano.call('addVideoHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+this.location+','+this.isShowSpotName+')');
				    });
				}
			})
		},
		initEffectSetting: function(name,krpano) {
			// var krpano = document.getElementById("ViewPano");
			var effectObj = null;
			var effectData = panoDataObj.special_effects.effectSettings;
			effectData.forEach(function(ele) {
			    if(ele.sceneName == name){
			        // console.log(ele.sceneName);
			        effectObj = ele;
			    }
			})
			if(effectObj){
			    if(effectObj.isOpen){
			        if(effectObj.effectType == 'sunshine'){
			            krpano.call('addLensflares('+effectObj.ath+','+effectObj.atv+')');
			        }else{
			            krpano.call('addEffect("'+effectObj.effectType+'","'+effectObj.imageUrl+'")');
			        }
			    }
			}
		},
		initSandTableSetting: function(name,krpano) {
			var sandTableObj = panoDataObj.sand_table;
			var existFlag = false;
			$(sandTableObj.sandTables).each(function(idx){
			    if(this.sceneOpt[name]){
			        //设置背景图片
			        krpano.set("layer[map].url",this.imgPath);
			        $.each(this.sceneOpt,function(name,value){
			            var spotName = 'spot_'+name;
			            addRadarSpot(spotName,value.krpLeft,value.krpTop);
			        });
			        var hlookatIncre = krpano.get('view.hlookat') - this.sceneOpt[name].hlookat;
			        krpano.call('activatespot('+(parseFloat(this.sceneOpt[name].rotate)+parseFloat(hlookatIncre))+');');
			        existFlag = true;
			        return false;
			    }
			});
			if(!existFlag){
			    $('.vrshow_radar_btn').hide();
			    krpano.set('layer[mapcontainer].visible',false);
			}else{
			    $('.vrshow_radar_btn').show();
			    if(sandTableObj.isOpen){
			        krpano.set('layer[mapcontainer].visible',true);
			    }
			}
		},
		startTourGuide: function(name,krpano) {
			var lsTourGuideObj = null;
			lsTourGuideObj = panoDataObj.tour_guide;
			var krpano = document.getElementById('ViewPano');
			//krpano.call('showlog(true)');
			var curSceneName = krpano.get('xml.scene');
			var firstPoint = lsTourGuideObj.points[0];
			if(lsTourGuideObj.useStartImg){
			    krpano.call('show_tour_guide_alert('+lsTourGuideObj.startImgUrl+');');
			}
			if(this.sceneTitle != curSceneName){
			    krpano.call('loadscene('+firstPoint.sceneTitle+', null, MERGE);');
			}
			var curfov = krpano.get('view.fov');
			krpano.call('lookto('+firstPoint.ath+','+firstPoint.atv+','+curfov+',smooth(720,-720,720),true,true,js(looktoCallBack('+1+')));');
		},
		statrAlertImg: function(argument) {
			// 开场提示
			var krpano = document.getElementById('ViewPano');
			var startImg = "";
			var isStartImg = panoDataObj.openAlert;
			if(isStartImg.iconID != "0"){
				startImg = isStartImg.imgPath;
				krpano.call("add_alert_img("+startImg+",test)");
			}
		},
		addShadeImg: function(name) {
			// 天空地面遮罩、补天补地
			var krpano = document.getElementById("ViewPano");
			var addShade = panoDataObj.sky_land_shade;
			var shadeImg = "";
			if(addShade.isWhole == 1){
				var shadeImg = addShade.shadeSetting[0].imgPath;
				var shadeFov = addShade.shadeSetting[0].type == 1 ?  90 : -90;
				if(shadeImg != undefined){
					krpano.call("add_nadir_logo("+shadeFov+","+shadeImg+",all,true)");
				}				
			}else{
				var allShadeObj = panoDataObj.sky_land_shade.shadeSetting;
				allShadeObj.forEach(function(ele) {
					if(ele.sceneID == name && ele.useShade != 0){
						var shadeFov = ele.type == 1 ?  90 : -90;
						krpano.call("add_nadir_logo("+shadeFov+","+ele.imgPath+","+ele.sceneID+",false)");
					}
				})
			}
		}
	}
	return pub;
})();
panoInt.int();

function html_encode(str) {
	var s = "";
	    if (str.length == 0) return "";
	    s = str.replace(/\'/g, "&#39;");
	    s = s.replace(/\"/g, "&quot;");
	    s = s.replace(/\(/g, "（");
	    s = s.replace(/\)/g, "）");
	    s = s.replace(/,/g, "，");
	    return s;
}

function toggleSand(panoName) {
	var krpano = document.getElementById(panoName);
	var isShow = krpano.get('layer[mapcontainer].visible');
	krpano.set('layer[mapcontainer].visible',!isShow);
}

function panoRightBtn(argument) {
	console.log(panoDataObj);
	var isAddBtn = panoDataObj.custom_right_button;
	$(".vr-play-l-bottom").find('.vr-p-l-b-sm').remove();
	var addStr = "";
	if(isAddBtn){
		isAddBtn.linkSettings.forEach(function(ele,index) {
		    addStr += '<div class="vr-p-l-b-sm"><img '+addbtnStr(ele)+' src="'+ele.icon+'" key="'+index+'" type="show"/><p class="img_desc_min">'+ele.title+'</p></div>'
		})
	}
	console.log(addStr);
	$("#viewnumbtn").after(addStr);
}

function addbtnStr(buttonObj) {
    var str = '';
	if(buttonObj.type == 1) {
        str = 'onclick="window.open(\'tel://'+buttonObj.content+'\')" title="tel://'+buttonObj.content+'"';
    }else if(buttonObj.type == 2){
	    var link = buttonObj.content.substr(0,4);
	    if(link != 'http'){
            link = 'http://'+buttonObj.content;
        }else{
            link = buttonObj.content;
        }
        str = 'onclick="window.open(\''+link+'\')" title="'+link+'"';
    }else if(buttonObj.type == 3){
        str = 'data-toggle="modal" data-target="#pano_upload_dialog"';
    }
	return str;
}

function addRadarSpot(name,x,y){
    //console.log(x+','+y);
    var krpano = document.getElementById('ViewPano');
    krpano.call('addlayer('+name+');');
    krpano.set('layer['+name+'].style','spot');
    krpano.set('layer['+name+'].x',x);
    krpano.set('layer['+name+'].y',y);
    krpano.set('layer['+name+'].parent','radarmask');
    krpano.call('layer['+name+'].loadstyle(spot);');
    //krpano.set('layer['+name+'].keep','true');
    //krpano.set('layer['+name+'].visible','true');
}


/*function initTourGuideSetting(sceneName){
    var krpano = document.getElementById('krpanoSWFObject');
    var tourGuideObj = $("body").data("panoData").tour_guide;
    if(tourGuideObj.points.length > 0){
        $('#pano .vrshow_tour_btn').show();
    }else{
        $('#pano .vrshow_tour_btn').hide();
    }
}*/

function looktoCallBack(idx){
    var krpano = document.getElementById('ViewPano');
    var lsTourGuideObj = panoDataObj.tour_guide;
    if(idx < lsTourGuideObj.points.length){
        var pointObj = lsTourGuideObj.points[idx];
        var curSceneName = krpano.get('xml.scene');
        var curfov = krpano.get('view.fov');
        if(pointObj.sceneTitle != curSceneName){
            krpano.call('loadscene('+pointObj.sceneTitle+', null, MERGE);');
            krpano.call('lookto('+pointObj.ath+','+pointObj.atv+','+curfov+',smooth(720,-720,720),true,true,js(looktoCallBack('+(parseInt(idx)+1)+')));');
        }else{
            krpano.call('lookto('+pointObj.ath+','+pointObj.atv+','+curfov+',tween(easeInOutQuad,'+parseInt(pointObj.moveTime)+'),true,true,js(looktoCallBack('+(parseInt(idx)+1)+')));');
        }
    }else{
        if(lsTourGuideObj.useEndImg){
            krpano.call('show_tour_guide_alert('+lsTourGuideObj.endImgUrl+');');
        }
        // toggleBtns(true);
    }
}



getPanoData(); // 基本信息 全景信息 场景信息

// 获取保存的数据
function getPanoData() {
    panoDataObj = $.extend(panoDataObj, baseInfo());
    panoDataObj = $.extend(panoDataObj, panoSetting());
    panoDataObj.scene_list = sceneList();
}

//获取基本信息
function baseInfo(){
    var base_obj  = {
        title: '', //动景标题
        address: '', //汉字地址
        lng: '', //经度
        lat: '', //纬度
        info: '', //简介
        directory_category: [] //动景分类
    };
    base_obj.title = $('#worksname').val();
    base_obj.address = $('#pano_address').val();
    base_obj.lng = $('#pano_lng').val();
    base_obj.lat = $('#pano_lat').val();
    base_obj.info = $('#workcomment').val();
    //分类赋值
    $("#photoCls").find("option:selected").each(function() {
        base_obj.directory_category.push($(this).attr('value'));
    });
    return base_obj;
}

//获取全景设置
function panoSetting() {
    var panoSetting = {
        play_rules: '', //小行星开场
        thumbs_opened: '',//打开缩略图
        autorotate: '', //自动旋转
        flag_publish : '', // 发布全景
        footmark : '', // 足迹
        gyro : '', // 手机陀螺仪
        comment : '', // 显示说一说
        showlogo : '', // 显示logo
        showuser : '', // 作者名
        showviewnum : '', // 人气
        showvrglasses : '', // VR眼镜
        showprofile : '', // 简介
        showpraise : '', // 点赞
        showshare : '' // 分享
    };
    panoSetting.play_rules = $('#littleplanet').prop('checked') ? 1 : 0;
    panoSetting.thumbs_opened = $('#scenechoose').prop('checked') ? 1 : 0;
    panoSetting.autorotate = $('#autorotate').prop('checked') ? 1 : 0;
    panoSetting.flag_publish = $('#flag_publish').prop('checked') ? 1 : 0;
    panoSetting.footmark = $('#footmark').prop('checked') ? 1 : 0;
    panoSetting.gyro = $('#gyro').prop('checked') ? 1 : 0;
    panoSetting.comment = $('#comment').prop('checked') ? 1 : 0;
    panoSetting.showlogo = $('#showlogo').prop('checked') ? 1 : 0;
    panoSetting.showuser = $('#showuser').prop('checked') ? 1 : 0;
    panoSetting.showviewnum = $('#showviewnum').prop('checked') ? 1 : 0;
    panoSetting.showvrglasses = $('#showvrglasses').prop('checked') ? 1 : 0;
    panoSetting.showprofile = $('#showprofile').prop('checked') ? 1 : 0;
    panoSetting.showpraise = $('#showpraise').prop('checked') ? 1 : 0;
    panoSetting.showshare = $('#showshare').prop('checked') ? 1 : 0;

    return panoSetting;
}

// 场景信息
function sceneList() {
    var sceneList = [];
    //场景列表赋值
    $('ul#sort-list li.li').each(function() {
        var thisObj = $(this);
        var sceneId = thisObj.attr('data-scene-id'); //场景id
        var sceneObj = {
            id: thisObj.attr('data-key'),
            scene_id: sceneId, //场景id
            scene_title: thisObj.find('div.name-box span.pano-name').html(), //场景标题
            thumbPath : thisObj.find('div.pano-thumb img').attr('src'),
            sceneName : scene_fix+sceneId
        };
        sceneList.push(sceneObj);
    });
    return sceneList;
}

// 获取背景音乐
function getBgMusic() {
    var bg_music = {
        "isWhole": $('div#voice_tab :radio[name=radioMusic]:checked').val(),
        "sceneSettings": []
    };
    if(bg_music.isWhole == 1){
        var sceneSettings = {};
        var divObj = $('div#voice_content>div:first');
        sceneSettings.useMusic = 1;
        sceneSettings.mediaID = divObj.find('audio').attr('data-audio-key');
        sceneSettings.mediaUrl = divObj.find('audio').attr('src');
        sceneSettings.mediaTitle = divObj.find('label.voice_title').html();
        bg_music.sceneSettings.push(sceneSettings);
    }else{
        $('div#voice_content div#audioList div.row').each(function () {
            var sceneSettings = {};
            var divObj = $(this);
            sceneSettings.useMusic = 1;
            sceneSettings.mediaID = divObj.find('audio').attr('data-audio-key');
            sceneSettings.sceneID = divObj.attr('data-scene-id');
            sceneSettings.mediaUrl = divObj.find('audio').attr('src');
            sceneSettings.mediaTitle = divObj.find('label.voice_title').html();
            bg_music.sceneSettings.push(sceneSettings);
        });
    }
    panoDataObj.bg_music = bg_music;
}

//语音解说
function getSpeechExplain() {
    var bg_music = {
        "isWhole": $('div#explain_tab :radio[name=radioSpeak]:checked').val(),
        "sceneSettings": []
    };
    if(bg_music.isWhole == 1){
        var sceneSettings = {};
        var divObj = $('div#explain_content>div:first');
        sceneSettings.useMusic = 1;
        sceneSettings.mediaID = divObj.find('audio').attr('data-audio-key');
        sceneSettings.mediaUrl = divObj.find('audio').attr('src');
        sceneSettings.mediaTitle = divObj.find('label.voice_title').html();
        bg_music.sceneSettings.push(sceneSettings);
    }else{
        $('div#explain_content div#commentaryList div.row').each(function () {
            var sceneSettings = {};
            var divObj = $(this);
            sceneSettings.useMusic = 1;
            sceneSettings.mediaID = divObj.find('audio').attr('data-audio-key');
            sceneSettings.sceneID = divObj.attr('data-scene-id');
            sceneSettings.mediaUrl = divObj.find('audio').attr('src');
            sceneSettings.mediaTitle = divObj.find('label.voice_title').html();
            bg_music.sceneSettings.push(sceneSettings);
        });
    }
    panoDataObj.speech_explain = bg_music;
    console.log(panoDataObj);
}

//链接与导航
function customIcon() {
    var custom_right_button = {
        linkSettings : []
    };
    $('div#myLinkModal div.link-row').each(function () {
        var divObj = $(this);
        var linkSettings = {};
        linkSettings.type = divObj.attr('type');
        linkSettings.icon = divObj.find('img.imgPoint').attr('src');
        linkSettings.icon_id = divObj.find('img.imgPoint').attr('data-img-key');
        linkSettings.icon_type = divObj.find('img.imgPoint').attr('type') == 'system' ? 'system' : 'custom';
        linkSettings.title = divObj.find('div.col-md-3 :text').val();
        if(linkSettings.type != 3){
            var content = divObj.find('div.col-md-4 :text').val();
            if(/^1[3|4|5|8][0-9]\d{8}$/.test(content)){
                linkSettings.type = 1;
            }else{
                linkSettings.type = 2;
            }
            linkSettings.content = content;
        }else{
            linkSettings.address = divObj.find('div.col-md-4 :hidden[name=address]').val();
            linkSettings.lat = divObj.find('div.col-md-4 :hidden[name=lat]').val();
            linkSettings.lng = divObj.find('div.col-md-4 :hidden[name=lng]').val();
        }
        custom_right_button.linkSettings.push(linkSettings);
    });
    panoDataObj.custom_right_button = custom_right_button;
}

// 获取遮罩信息
function skyLandShade() {
    var sky_land_shade = {
        "isWhole": $('div#skyModal div.allSingle :radio[name=skyLandShade]:checked').val(),
        "shadeSetting" : []
    };
    if(sky_land_shade.isWhole == 1){
        var shadeSetting = {};
        var divObj = $('div#skyModal div.sky_content>div#wholeDiv');
        shadeSetting.useShade = divObj.find('div.radio :radio:checked').val() ? divObj.find('div.radio :radio:checked').val() : 2;
        shadeSetting.type = divObj.find('div.use_around :radio:checked').val() ? divObj.find('div.use_around :radio:checked').val() : 1;

        if(shadeSetting.useShade == 2){
            shadeSetting.imgPath = divObj.find('div.use_around img').attr('src');
            shadeSetting.useShade = divObj.find('div.use_around img').attr('data-img-key');
            shadeSetting.size = divObj.find('div.use_around img').attr('mask-size');
        }else if(shadeSetting.useShade == -1){
            shadeSetting.imgPath = divObj.find('div.use_around img').attr('src');
            shadeSetting.size = divObj.find('div.use_around img').attr('mask-size');
        }

        sky_land_shade.shadeSetting.push(shadeSetting);
    }else{
        $('div#skyModal div.sky_content div#oneDiv div.row').each(function () {
            var shadeSetting = {};
            var divObj = $(this);
            shadeSetting.sceneID = scene_fix+divObj.attr('data-scene-id');
            shadeSetting.useShade = divObj.find('div.label_radio :radio:checked').val() ? divObj.find('div.radio :radio:checked').val() : 2;
            shadeSetting.type = divObj.find('div.use_around :radio:checked').val() ? divObj.find('div.use_around :radio:checked').val() : 1;
            if(shadeSetting.useShade == 2){
                shadeSetting.imgPath = divObj.find('div.use_around img').attr('src');
                shadeSetting.useShade = divObj.find('div.use_around img').attr('data-img-key');
                shadeSetting.size = divObj.find('div.use_around img').attr('mask-size');
            }else if(shadeSetting.useShade == -1){
                shadeSetting.imgPath = divObj.find('div.use_around img').attr('src');
                shadeSetting.size = divObj.find('div.use_around img').attr('mask-size');
            }
            sky_land_shade.shadeSetting.push(shadeSetting);
        });
    }
    panoDataObj.sky_land_shade = sky_land_shade;
}

// 开场提示
function openAlert() {
    var openAlert = {};
    var divObj = $('div#openModal');
    openAlert.iconID = divObj.find(':radio[name=radioTips]:checked').val() ? divObj.find(':radio[name=radioTips]:checked').val() : 2;
    if(openAlert.iconID == 2){
        openAlert.iconID = divObj.find('div.prompt_choose img').attr('data-img-key');
        openAlert.imgPath = divObj.find('div.prompt_choose img').attr('src');
    }else if(openAlert.iconID == -1){
        openAlert.imgPath = divObj.find('div.prompt_choose img').attr('src');
    }
    panoDataObj.openAlert = openAlert;
}

//自定义logo
function customLogo() {
    var custom_logo = {};
    var divObj = $('div#logoModal div.prompt_choose');
    custom_logo.useCustomLogo = divObj.find('img.imgPoint').attr('data-img-key');
    custom_logo.logoImgPath = divObj.find('img.imgPoint').attr('src');
    custom_logo.logoLink = 'http://we.taagoo.com';
    panoDataObj.custom_logo = custom_logo;
}

//启动画面
function loadingImg() {
    var loading_img = {};
    var divObj = $('div#loadingModal div.prompt_choose');
    loading_img.useLoadingImg = divObj.find('div.radio :radio:checked').val() ? divObj.find('div.radio :radio:checked').val() : 2;
    if(loading_img.useLoadingImg == -1){
        loading_img.lodingImgPath = divObj.find('img.imgPoint').attr('src');
    }else if(loading_img.useLoadingImg == 2){
        loading_img.lodingImgPath = divObj.find('img.imgPoint').attr('src');
        loading_img.useLoadingImg = divObj.find('img.imgPoint').attr('data-img-key');
    }
    panoDataObj.loading_img = loading_img;
}


function ViewStatr(settings) {
	getPanoData();
	settings["onstart"] = "";
	settings['skin_settings.littleplanetintro'] = panoDataObj.play_rules=="1" ? true : false;
	settings['autorotate.enabled'] = panoDataObj.autorotate=="1" ? true : false;
	settings['skin_settings.thumbs_opened'] = panoDataObj.thumbs_opened=="1" ? true : false;
	settings["onstart"] += 'js(panoInt.statrAlertImg())';
	// settings["onstart"] += "js(panoInt.panoViewInt('ViewPano','scene_533'););";
	console.log(settings);
	return settings;
}