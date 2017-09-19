var work_view_uuid;//全景Id
var pk_works_main;
var mapModalEl;
var _user_view_uuid;
var _name;
var _userList;
var plugins_init_function = new Array();//接收显示时的init方法
$(function () {
    work_view_uuid = pageObj.pano_id;
    initPano();
});



//krpano loadcomplete调用
function showPanoBtns(sceneCount,isShowBtn){
    if(isShowBtn==1){
        if (sceneCount > 1) {
            $(".vrshow_container_3_min .img_desc_container_min:eq(0)").show();
        }else{
            $(".vrshow_container_3_min .img_desc_container_min:eq(0)").hide();
        }
    }
    $("#panoBtns").show();
}


function fullscreen(el){
    //krpano.call("switch(fullscreen);");
    //launchFullScreen(document.documentElement);
    if($(el).hasClass('btn_fullscreen')){
        launchFullScreen(document.getElementById('fullscreenid'));
        var krpano = document.getElementById('krpanoSWFObject');
        krpano.call("skin_showthumbs(false);");
    }else{
        exitFullscreen();
    }
    toggleFullscreenBtn(el);
}

function launchFullScreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function toggleFullscreenBtn(el){
    if($(el).hasClass("btn_fullscreen")){
        $(el).removeClass("btn_fullscreen");
        $(el).addClass("btn_fullscreen_off");
    }else{
        $(el).removeClass("btn_fullscreen_off");
        $(el).addClass("btn_fullscreen");
    }
}

function toggleBtns(flag){
    if(flag){
        $("#panoBtns").show();
    }else{
        $("#panoBtns").hide();
        var krpano = document.getElementById('krpanoSWFObject');
        krpano.call('skin_showthumbs(false);');
    }
}

function showWebVR(){
    var krpano = document.getElementById('krpanoSWFObject');
    var webvr = krpano.get("webvr");
    webvr.entervr();
}



function showthumbs(){
    var krpano = document.getElementById('krpanoSWFObject');
    krpano.call("skin_showthumbs();");
}



function hidePictext() {
    $('#pictextModal').modal('hide');
    toggleBtns(true);
}

function showPictext(title,content) {
    toggleBtns(false);
    //var data = $("body").data("panoData");
    // $('#pictextWorkName').text('');
    // $('#pictextContent').text('');
    $('#pictextWorkName').text(title);
    $('#pictextContent').html(imgtext_decode(content));
    //$('#pictextContent').append(content);
    $('#pictextModal').modal("show");
}

//krpano调用 初始化高级设置
function initAdvancedSetting(sceneName){
    initEffectSetting(sceneName);
    initHotspotSetting(sceneName);
    initIconListSetting(sceneName);
    initSandTableSetting(sceneName);
    addNadirLogo(sceneName);
}

function initTourGuideSetting(sceneName){
    var krpano = document.getElementById('krpanoSWFObject');
    var tourGuideObj = $("body").data("panoData").tour_guide;
    if(tourGuideObj.points.length > 0){
        $('#pano .vrshow_tour_btn').show();
    }else{
        $('#pano .vrshow_tour_btn').hide();
    }
}

var lsTourGuideObj = null;
function startTourGuide(){
    toggleBtns(false);
    lsTourGuideObj = $("body").data("panoData").tour_guide;
    var krpano = document.getElementById('krpanoSWFObject');
    //krpano.call('showlog(true)');
    var curSceneName = krpano.get('xml.scene');
    var firstPoint = lsTourGuideObj.points[0];
    if(lsTourGuideObj.useStartImg){
        krpano.call('show_tour_guide_alert('+lsTourGuideObj.startImgUrl+');');
    }
    if(this.sceneName != curSceneName){
        krpano.call('loadscene('+firstPoint.sceneName+', null, MERGE);');
    }
    var curfov = krpano.get('view.fov');
    krpano.call('lookto('+firstPoint.ath+','+firstPoint.atv+','+curfov+',smooth(720,-720,720),true,true,js(looktoCallBack('+1+')));');
}

function looktoCallBack(idx){
    var krpano = document.getElementById('krpanoSWFObject');
    if(idx < lsTourGuideObj.points.length){
        var pointObj = lsTourGuideObj.points[idx];
        var curSceneName = krpano.get('xml.scene');
        var curfov = krpano.get('view.fov');
        if(pointObj.sceneName != curSceneName){
            krpano.call('loadscene('+pointObj.sceneName+', null, MERGE);');
            krpano.call('lookto('+pointObj.ath+','+pointObj.atv+','+curfov+',smooth(720,-720,720),true,true,js(looktoCallBack('+(parseInt(idx)+1)+')));');
        }else{
            krpano.call('lookto('+pointObj.ath+','+pointObj.atv+','+curfov+',tween(easeInOutQuad,'+parseInt(pointObj.moveTime)+'),true,true,js(looktoCallBack('+(parseInt(idx)+1)+')));');
        }
    }else{
        if(lsTourGuideObj.useEndImg){
            krpano.call('show_tour_guide_alert('+lsTourGuideObj.endImgUrl+');');
        }
        toggleBtns(true);
    }
}

function initSandTableSetting(sceneName){
    var krpano = document.getElementById('krpanoSWFObject');
    var sandTableObj = $("body").data("panoData").sand_table;
    var existFlag = false;
    $(sandTableObj.sandTables).each(function(idx){
        if(this.sceneOpt[sceneName]){
            //设置背景图片
            krpano.set("layer[map].url",this.imgPath);
            var radarStr = 'radarinit('+this.align+','+this.x+','+this.y+','+this.width+','+this.height+')';
            krpano.call(radarStr);
            $.each(this.sceneOpt,function(sceneName,value){
                var spotName = 'spot_'+sceneName;
                addRadarSpot(spotName,value.krpLeft,value.krpTop);
            });
            var hlookatIncre = krpano.get('view.hlookat') - this.sceneOpt[sceneName].hlookat;
            krpano.call('activatespot('+(parseFloat(this.sceneOpt[sceneName].rotate)+parseFloat(hlookatIncre))+');');
            existFlag = true;
            return false;
        }
    });
    if(!existFlag){
        $('.vrshow_radar_btn').hide();
        krpano.set('layer[mapcontainer].visible',false);
    }else{
        $('.vrshow_radar_btn').show();
        if(sandTableObj.isOpen=='1'){
            krpano.set('layer[mapcontainer].visible',true);
        }
    }
}

function toggleKrpSandTable(){
    var krpano = document.getElementById('krpanoSWFObject');
    var isVisible = krpano.get('layer[mapcontainer].visible');
    if(isVisible){
        krpano.set('layer[mapcontainer].visible',false);
    }else{
        krpano.set('layer[mapcontainer].visible',true);
    }
}

function addRadarSpot(name,x,y){
    //console.log(x+','+y);
    var krpano = document.getElementById('krpanoSWFObject');
    krpano.call('addlayer('+name+');');
    krpano.set('layer['+name+'].style','spot');
    krpano.set('layer['+name+'].x',x);
    krpano.set('layer['+name+'].y',y);
    krpano.set('layer['+name+'].parent','radarmask');
    krpano.call('layer['+name+'].loadstyle(spot);');
    //krpano.set('layer['+name+'].keep','true');
    //krpano.set('layer['+name+'].visible','true');
}

//自定义图标
function initIconListSetting(sceneName){
    var krpano = document.getElementById('krpanoSWFObject');
    var panoData = $("body").data("panoData");
    if(!panoData){
        return false;
    }
    var iconList = panoData.icon_list;
    if(iconList){
        var len = iconList.length;
        for(var i=0;i<len;i++){
            var item = iconList[i];
            if(item.id){
                var iconName = 'icon_'+item['id'];
                var onclick = 0;
                switch (item['show_type']){
                    case 1://链接
                        onclick ='openurl('+item['show_content']['href']+', _blank);';
                        break;
                    case 2://电话
                        onclick ='openurl(tel:'+item['show_content']['tel']+', _blank);';
                        break;
                    case 0:
                        onclick = '';
                        break;
                    // case 3://图片
                    //     break;
                    // case 4://背景音乐
                    //     break;
                    // case 5://场景解说
                    //     break;
                    // case 6://导览图标
                    //     break;
                }
                if(onclick!==0){
                    if(krpano.get('layer['+iconName+']')){
                        break;
                    }
                    krpano.call('addIconlist("'+item.pic_url+'","'+iconName+'","'+item.align+'","'+item.posx+'","'+item.posy+'","'+item.width+'","'+item.height+'","'+onclick+'")');
                }
            }
        }
    }
}

function initHotspotSetting(sceneName){
    var krpano = document.getElementById('krpanoSWFObject');
    var hotspotObj = ($("body").data("panoData").hotspot)[sceneName];
    if(hotspotObj){
        $.each(hotspotObj,function(key,value){
            if(key == 'scene'){
                $(value).each(function(idx){
                    krpano.call('addSceneChangeHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+this.linkedscene+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+(this.isShowSpotName)+','+(this.effect_type)+','+html_encode(this.hotspotTitle)+')');
                });
            }else if(key == 'link'){
                $(value).each(function(idx){
                    krpano.call('addLinkHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+this.link+','+this.isShowSpotName+')');
                });
            }else if(key == 'image'){
                $(value).each(function(idx){
                    krpano.call('addImgHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+this.galleryName+','+this.isShowSpotName+','+this.imgs.src+')');
                });
            }else if(key == 'text'){
                $(value).each(function(idx){
                    krpano.call('addWordHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+html_encode(this.wordContent)+','+this.isShowSpotName+')');
                });
            }else if(key == 'voice'){
                $(value).each(function(idx){
                    krpano.call('addVoiceHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+this.musicSrc+','+this.isShowSpotName+')');
                });
            }else if(key == 'video'){
                $(value).each(function(idx){
                    krpano.call('addVideoHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+this.location+','+this.isShowSpotName+',"",'+this.type+')');
                });
            }

        });
    }
}

//特效
function initEffectSetting(sceneName){
    var krpano = document.getElementById('krpanoSWFObject');
    var effectObj = null;
    var effectData = $("body").data("panoData").special_effects;
    $(effectData.effectSettings).each(function(idx){
        if(this.sceneName == sceneName){
            effectObj = this;
            return false;
        }
    });
    if(effectObj){
        if(effectObj.isOpen){
            if(effectObj.effectType == 'sunshine'){
                //krpano.set('lensflares[obj].item[lensitemobj].scene',sceneName);
                //krpano.set('lensflares[obj].item[lensitemobj].ath',effectObj.ath);
                //krpano.set('lensflares[obj].item[lensitemobj].atv',effectObj.atv);
                krpano.call('addLensflares('+effectObj.ath+','+effectObj.atv+')');
            }else{
                krpano.call('addEffect("'+effectObj.effectType+'","'+effectObj.effectImgPath+'")');
            }
        }
    }
}

//补天补地
function addNadirLogo(name){
    var krpano = document.getElementById('krpanoSWFObject');
    var addShade = $("body").data("panoData").sky_land_shade;
    if(addShade.isWhole == 1 && undefined!= addShade.shadeSetting && undefined != addShade.shadeSetting.imgPath){
        var shadeImg = addShade.shadeSetting.imgPath;
        var shadeFov = addShade.shadeSetting.type == 1 ?  90 : -90;
        if(shadeImg != undefined){
            krpano.call("add_nadir_logo("+shadeFov+","+shadeImg+",all,true)");
        }
    }else{
        $(addShade.shadeSetting).each(function() {
            ele = this;
            if(ele.sceneID == name && ele.useShade != 0){
                var shadeFov = ele.type == 1 ?  90 : -90;
                krpano.call("add_nadir_logo("+shadeFov+","+ele.imgPath+","+ele.sceneID+",false)");

            }
        })
    }
}

//视角
function littlePlaneOpen(sceneName){
    var krpano = document.getElementById('krpanoSWFObject');
    var lookatObj = null;
    var angleData = $("body").data("panoData").angle_of_view;
    $(angleData).each(function(idx){
        if(this.sceneName == sceneName){
            lookatObj = this;
            return false;
        }
    });
    if(lookatObj){
        krpano.set('view.vlookat',lookatObj.vlookat);
        krpano.set('view.hlookat',lookatObj.hlookat);
        krpano.set('view.fov',lookatObj.fov);
        krpano.set('view.fovmax',lookatObj.fovmax);
        if(lookatObj.hlookatmin){
            krpano.set('view.hlookatmin',lookatObj.hlookatmin);
        }
        if(lookatObj.hlookatmax){
            krpano.set('view.hlookatmax',lookatObj.hlookatmax);
        }
        krpano.call('skin_setup_littleplanetintro('+lookatObj.fovmin+','+(-1*lookatObj.vlookatmax)+','+(-1*lookatObj.vlookatmin)+','+(lookatObj.keepView=='1' ? "off" : "0.0")+');');
    }else{
        krpano.call('skin_setup_littleplanetintro(5,-90,90,"0.0");');
    }
}

//场景载入时加载视角设置
function initViewSetting(sceneName){
    var krpano = document.getElementById('krpanoSWFObject');
    var lookatObj = null;
    var angleData = $("body").data("panoData").angle_of_view;
    $(angleData).each(function(idx){
        if(this.sceneName == sceneName){
            lookatObj = this;
            return false;
        }
    });
    if(lookatObj){
        krpano.set('view.vlookat',lookatObj.vlookat);
        krpano.set('view.hlookat',lookatObj.hlookat);
        krpano.set('view.fov',lookatObj.fov);
        krpano.set('view.fovmin',lookatObj.fovmin);
        krpano.set('view.fovmax',lookatObj.fovmax);
        krpano.set('view.vlookatmin',-1*lookatObj.vlookatmax);
        krpano.set('view.vlookatmax',-1*lookatObj.vlookatmin);
        krpano.set('autorotate.horizon',lookatObj.keepView=='1' ? "off" : "0.0");
        if(lookatObj.hlookatmin){
            krpano.set('view.hlookatmin',lookatObj.hlookatmin);
        }
        if(lookatObj.hlookatmax){
            krpano.set('view.hlookatmax',lookatObj.hlookatmax);
        }
    }
}

function loadGallery(){
    var krpano = document.getElementById('krpanoSWFObject');
    var hotspotObj = $("body").data("panoData").hotspot;
    //var xmlStr = '';
    $.each(hotspotObj,function(sceneName,value){
        if(value){
            $(value.image).each(function(idx){
                var xmlStr = '<gallery name="'+this.galleryName+'" title="">';
                $(this.imgs).each(function(idx){
                    xmlStr += '<img name="img'+idx+'" url="'+this.src+'" title="" />';
                });
                xmlStr += '</gallery>';
                krpano.call('loadxml('+xmlStr+');');
            });
        }
    });
}

function reloadGallery(gallery){
	var krpano = document.getElementById('krpanoSWFObject');
	var ua = window.navigator.userAgent.toLowerCase();
	if(typeof(wx)!='undefined' && ua.match(/MicroMessenger/i) == 'micromessenger'){
		//整合gallery的图片到数组
		var urls = new Array();
		for(var i=0; i<krpano.get('gallery['+gallery+'].img.count'); i++){
			urls.push(krpano.get('gallery['+gallery+'].img['+i+'].url'));
		}
		wx.previewImage({
			current: krpano.get('gallery['+gallery+'].img[0].url'), // 当前显示图片的http链接
			urls: urls // 需要预览的图片http链接列表
		});
	}
	else{
		toggleBtns();
		krpano.call('show_gallery('+gallery+')');
	}
}


function initPano(){//TODO
//setTimeout(function(){
	

    $.ajax({
        type : 'get',
        url : pageObj.pano_json_url,
        data : {id:work_view_uuid},
        dataType : 'json',
        success : function(res){
            if(res.status != 1){
                window.location.href = '/404.html';
                return ;
            }
            var data = res.data;
            _user_view_uuid = "admin";
            _name = data.name;

            $("body").data("panoData",data);
            pk_works_main = work_view_uuid;
            var settings = {};
            settings["events[skin_events].onloadcomplete"] = "skin_showloading(false);";
            settings["onstart"] = '';

            //是否开始时弹出场景选择
            /*if (data.thumbs_opened=='1') {
                settings["events[skin_events].onloadcomplete"] += "open_show_scene_thumb();";
            }*/
            //是否显示logo
            if (data.show_logo=='1') {
                $('#default_logo').show();
            }
            for(var i=0 ; i<plugins_init_function.length;i++){
                plugins_init_function[i](data,settings);
            }
            settings['skin_settings.littleplanetintro'] = data.play_rules=="1" ? true : false;
//          settings["events[skin_events].onloadcomplete"] += "open_show_scene_thumb();";

//          settings['autorotate.enabled'] = data.autorotate=="1" ? true : false;
//          settings['skin_settings.thumbs'] = false;
            // settings['skin_settings.thumbs_opened'] = false;
            // settings['skin_settings.layout_width'] = "0";
            // if (data.scene_group.sceneGroups.length > 0) {
            //     $(".vrshow_container_3_min .img_desc_container_min:eq(0) img").attr('src',data.scene_group.sceneGroups[0].imgPath);
            // }
            embedpano({
                swf: "pano/tour.swf",
                xml: pageObj.base_xml_url,
                target: "pano",
                html5:'prefer',
                //flash:'only',
                wmode:'opaque-flash',
                mobilescale:1,
                vars: settings
            });

        }
    });
//  },500)
}

//krpano调用


function showFullscreenBtn(){
    $(".btn_fullscreen").show();
}



function radarRotate(sceneName,hlookat){

}

function openSpeechVoiceBtn(){
    var voiceOff = $('.btn_music_off');
    voiceOff.removeClass('btn_music_off');
    voiceOff.addClass('btn_music');
}
var player ;
function playvideo(url){
   player = new prismplayer({
      id: "J_prismPlayer", // 容器id
      source:url,
      autoplay: true,      // 自动播放
      width: "100%",       // 播放器宽度
      height: "400px"      // 播放器高度
    });
   $("#video_player_modal").modal('show');
}
function close_video_player(){
    // player.pause();
    $("#video_player_modal").modal('hide');
    //document.querySelector('.spotVideo').pause();
    $("#spotVideoBox").empty();
}

function setInitAngle(){

}

function openMusicVoiceBtn(){
    var voiceOff = $('.btn_bgmusic_off');
    voiceOff.removeClass('btn_bgmusic_off');
    voiceOff.addClass('btn_bgmusic');
}
