var work_view_uuid;//全景Id
var pk_works_main;
var mapModalEl;
var _user_view_uuid;
var _name;
var _userList;
var plugins_init_function = new Array();//接收显示时的init方法


//krpano loadcomplete调用
function showPanoBtns(sceneCount){
    if (sceneCount > 1) {
        $(".vrshow_container_3_min .img_desc_container_min:eq(0)").show();
    }else{
        $(".vrshow_container_3_min .img_desc_container_min:eq(0)").hide();
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
    //initViewSetting(sceneName);
    initEffectSetting(sceneName);
    initHotspotSetting(sceneName);
    initSandTableSetting(sceneName);
    initTourGuideSetting(sceneName);
    //作者信息 TODO
    // initAuthourInfo(sceneName);
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

function initHotspotSetting(sceneName){
    var krpano = document.getElementById('krpanoSWFObject');
    var hotspotObj = ($("body").data("panoData").hotspot)[sceneName];
    if(hotspotObj){
        $.each(hotspotObj,function(key,value){
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


            // if(key == 'scene'){
            //     $(value).each(function(idx){
            //         krpano.call('addSceneChangeHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+this.linkedscene+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true)');
            //     });
            // }else if(key == 'link'){
            //     $(value).each(function(idx){
            //         krpano.call('addLinkHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+this.link+','+this.isShowSpotName+')');
            //     });
            // }else if(key == 'image'){
            //     $(value).each(function(idx){
            //         krpano.call('addImgHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+this.galleryName+','+this.isShowSpotName+')');
            //     });
            // }else if(key == 'text'){
            //     $(value).each(function(idx){
            //         krpano.call('addWordHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+html_encode(this.wordContent)+','+this.isShowSpotName+')');
            //     });
            // }else if(key == 'voice'){
            //     $(value).each(function(idx){
            //         krpano.call('addVoiceHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+this.musicSrc+','+this.isShowSpotName+')');
            //     });
            // }else if(key == 'around'){
            //     $(value).each(function(idx){
            //         krpano.call('addAroundHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+this.aroundPath+','+this.fileCount+','+this.isShowSpotName+')');
            //     });
            // }else if(key == 'imgtext'){
            //     $(value).each(function(idx){
            //         krpano.call('addImgTextHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+imgtext_encode(this.imgtext_wordContent)+','+this.isShowSpotName+')');
            //     });
            // }else if(key == 'obj'){
            //     $(value).each(function(idx){
            //         krpano.call('addObjHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+this.objid+','+this.isShowSpotName+')');
            //     });
            // }else if(key == 'video'){
            //     $(value).each(function(idx){
            //         krpano.call('addVideoHotSpot("'+this.thumbPath+'","'+ (this.name) +'",'+html_encode(this.hotspotTitle)+','+(this.ath)+','+(this.atv)+','+this.isDynamic+',false,true,'+this.location+','+this.isShowSpotName+')');
            //     });
            // }
        });
    }
}

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
    if(addShade.isWhole == 1){
        var shadeImg = addShade.shadeSetting[0].imgPath;
        var shadeFov = addShade.shadeSetting[0].type == 1 ?  90 : -90;
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

/*function checkPrivacyPwd(){
    if(!$("#privacyPwd").val()){
        _U.toggleErrorMsg("#privacyPwd",'',true);
        return ;
    }
    var sb = _U.getSubmit("/ws/checkPrivacyPwd", null, "ajax", true);
    sb.pushData("view_uuid", work_view_uuid);
    sb.pushData("privacy_password", $("#privacyPwd").val());
    sb.submit(function () {
    }, function (data) {
        if(data.check_flag == true){
            $("#privacyPwdModal").modal("hide");
            initPano();
        } else {
            _U.toggleErrorMsg("#privacyPwd",'密码有误',true);
        }
    });
}*/

/*function getWorkPrivacyFlag(){
    var privacy_flag = '0';
    return privacy_flag;
}*/



function initPano(){//TODO
    work_view_uuid = pageObj.pano_id;
    $.ajax({
        type : 'post',
        url : pageObj.pano_json_url,
        data : {panoramic_id:work_view_uuid},
        dataType : 'json',
        success : function(res){
            if(res.status != 1){
                window.location.href = '/404.html';
                return ;
            }
            var data = res.data;
            _user_view_uuid = "admin";
            _name = data.name;

            if(work_view_uuid==12){

            data.angle_of_view=[
            {
                "sceneName": "scene_52",
                "hlookat": -31.0088,
                "vlookat": 14.5121,
                "fov": 92,
                "fovmin": 66,
                "fovmax": 120,
                "vlookatmin": -90,
                "vlookatmax": 90,
                "keepView": 0,
                "hlookatmin": -180,
                "hlookatmax": 180
            },
            {
                "sceneName": "scene_72",
                "hlookat": 0,
                "vlookat": 0,
                "fov": 95,
                "fovmin": 70,
                "fovmax": 140,
                "vlookatmin": -90,
                "vlookatmax": 90,
                "keepView": 0,
                "hlookatmin": -180,
                "hlookatmax": 180
            },
            {
                "sceneName": "scene_73",
                "hlookat": -125.05,
                "vlookat": 2.68889,
                "fov": 105,
                "fovmin": 70,
                "fovmax": 140,
                "vlookatmin": -90,
                "vlookatmax": 90,
                "keepView": 0,
                "hlookatmin": -180,
                "hlookatmax": 180
            },
            {
                "sceneName": "scene_74",
                "hlookat": -0.685875,
                "vlookat": -4.00106,
                "fov": 103,
                "fovmin": 70,
                "fovmax": 140,
                "vlookatmin": -90,
                "vlookatmax": 90,
                "keepView": 0,
                "hlookatmin": -180,
                "hlookatmax": 180
            },
            {
                "sceneName": "scene_71",
                "hlookat": -17.4068,
                "vlookat": 3.93689,
                "fov": 120,
                "fovmin": 70,
                "fovmax": 140,
                "vlookatmin": -90,
                "vlookatmax": 90,
                "keepView": 0,
                "hlookatmin": -180,
                "hlookatmax": 180
            },
            {
                "sceneName": "scene_75",
                "hlookat": -270.321,
                "vlookat": 10.9189,
                "fov": 120,
                "fovmin": 70,
                "fovmax": 140,
                "vlookatmin": -90,
                "vlookatmax": 90,
                "keepView": 0,
                "hlookatmin": -180,
                "hlookatmax": 180
            },
            {
                "sceneName": "scene_76",
                "hlookat": 0,
                "vlookat": 0,
                "fov": 95,
                "fovmin": 70,
                "fovmax": 140,
                "vlookatmin": -90,
                "vlookatmax": 90,
                "keepView": 0,
                "hlookatmin": -180,
                "hlookatmax": 180
            }
        ];
                data.sand_table= {
                    "isOpen": false,
                    "sandTables": [
                        {
                            "imgPath": "//pano.taagoo.com/normal/pic/2017/06/20/159489724563b6.png",
                            "imgID": 293,
                            "sandID": 78,
                            "height": 320,
                            "width": 387,
                            "x": 60,
                            "y": 50,
                            "align": "righttop",
                            "sceneOpt": {
                                "scene_52": {
                                    "rotate": -68,
                                    "hlookat": -31,
                                    "top": "51.25%",
                                    "left": "79.84%",
                                    "krpTop": "57.5%",
                                    "krpLeft": "85.01%",
                                    "sceneTitle": "银锭桥"
                                },
                                "scene_72": {
                                    "rotate": 0,
                                    "hlookat": 0,
                                    "top": "35.63%",
                                    "left": "74.16%",
                                    "krpTop": "41.88%",
                                    "krpLeft": "79.33%",
                                    "sceneTitle": "小石碑胡同"
                                },
                                "scene_73": {
                                    "rotate": 21,
                                    "hlookat": 0,
                                    "top": "18.13%",
                                    "left": "47.55%",
                                    "krpTop": "24.38%",
                                    "krpLeft": "52.71%",
                                    "sceneTitle": "宋庆龄故居"
                                },
                                "scene_74": {
                                    "rotate": 48,
                                    "hlookat": -17,
                                    "top": "34.38%",
                                    "left": "47.55%",
                                    "krpTop": "40.63%",
                                    "krpLeft": "52.71%",
                                    "sceneTitle": "后海北沿"
                                },
                                "scene_75": {
                                    "rotate": -82,
                                    "hlookat": 89,
                                    "top": "56.56%",
                                    "left": "71.32%",
                                    "krpTop": "62.81%",
                                    "krpLeft": "76.49%",
                                    "sceneTitle": "大金丝胡同"
                                },
                                "scene_71": {
                                    "rotate": 40,
                                    "hlookat": 0,
                                    "top": "34.06%",
                                    "left": "63.82%",
                                    "krpTop": "40.31%",
                                    "krpLeft": "68.99%",
                                    "sceneTitle": "八卦酒吧"
                                },
                                "scene_76": {
                                    "rotate": 46,
                                    "hlookat": 0,
                                    "top": "75.96%",
                                    "left": "79.84%",
                                    "krpTop": "81.9%",
                                    "krpLeft": "85.01%",
                                    "sceneTitle": "平安码头夜景"
                                }
                            }
                        }
                    ]
                };


                data.hotspot= {
            "scene_52": {
                "voice": [],
                "video": [],
                "scene": [],
                "image": [],
                "text": [],
                "link": [
                    {
                        "isDynamic": 1,
                        "ath": 125.542,
                        "atv": -2.55264,
                        "name": "hotspot_19283",
                        "galleryName": "glrhotspot_19283",
                        "hotspotTitle": "后海夜色",
                        "isShowSpotName": 0,
                        "iconId": 299,
                        "iconType": "custom",
                        "thumbPath": "//pano.taagoo.com/normal/pic/2017/06/20/15948e2f45be3b.png",
                        "link": "http://data.taagoo.com/pano/20170602449592.html"
                    },
                    {
                        "isDynamic": 1,
                        "ath": 144.517,
                        "atv": -2.71776,
                        "name": "hotspot_19285",
                        "galleryName": "glrhotspot_19285",
                        "hotspotTitle": "庆云楼",
                        "isShowSpotName": 0,
                        "iconId": 300,
                        "iconType": "custom",
                        "thumbPath": "//pano.taagoo.com/normal/pic/2017/06/20/15948e2f4bf5c9.png",
                        "link": "http://data.taagoo.com/pano/20170602445808.html"
                    },
                    {
                        "isDynamic": 1,
                        "ath": -15.6489,
                        "atv": -1.94372,
                        "name": "hotspot_19286",
                        "galleryName": "glrhotspot_19286",
                        "hotspotTitle": "鸦儿渡口酒吧",
                        "isShowSpotName": 0,
                        "iconId": 306,
                        "iconType": "custom",
                        "thumbPath": "//pano.taagoo.com/normal/pic/2017/06/20/15948fa05d32a2.png",
                        "link": "http://data.taagoo.com/pano/20170602448675.html"
                    },
                    {
                        "isDynamic": 1,
                        "ath": -56.2481,
                        "atv": -1.86917,
                        "name": "hotspot_19288",
                        "galleryName": "glrhotspot_19288",
                        "hotspotTitle": "银海轩",
                        "isShowSpotName": 0,
                        "iconId": 298,
                        "iconType": "custom",
                        "thumbPath": "//pano.taagoo.com/normal/pic/2017/06/20/15948e2f3df6dd.png",
                        "link": "http://data.taagoo.com/pano/20170602446525.html"
                    },
                    {
                        "isDynamic": 1,
                        "ath": 144.12,
                        "atv": 3.5583,
                        "name": "hotspot_19310",
                        "galleryName": "glrhotspot_19310",
                        "hotspotTitle": "庆云楼",
                        "isShowSpotName": 0,
                        "iconId": 305,
                        "iconType": "custom",
                        "thumbPath": "//pano.taagoo.com/normal/pic/2017/06/20/15948f49eea44d.png",
                        "link": "http://we.taagoo.com/video/165.html"
                    },
                    {
                        "isDynamic": 1,
                        "ath": -55.9655,
                        "atv": 3.62211,
                        "name": "hotspot_19311",
                        "galleryName": "glrhotspot_19311",
                        "hotspotTitle": "银海轩",
                        "isShowSpotName": 0,
                        "iconId": 305,
                        "iconType": "custom",
                        "thumbPath": "//pano.taagoo.com/normal/pic/2017/06/20/15948f49eea44d.png",
                        "link": "http://we.taagoo.com/video/161.html"
                    },
                    {
                        "isDynamic": 1,
                        "ath": -15.7036,
                        "atv": 3.77945,
                        "name": "hotspot_19312",
                        "galleryName": "glrhotspot_19312",
                        "hotspotTitle": "鸦儿渡口",
                        "isShowSpotName": 0,
                        "iconId": 305,
                        "iconType": "custom",
                        "thumbPath": "//pano.taagoo.com/normal/pic/2017/06/20/15948f49eea44d.png",
                        "link": "http://we.taagoo.com/video/164.html"
                    },
                    {
                        "isDynamic": 1,
                        "ath": 125.821,
                        "atv": 3.80719,
                        "name": "hotspot_19313",
                        "galleryName": "glrhotspot_19313",
                        "hotspotTitle": "后海夜色",
                        "isShowSpotName": 0,
                        "iconId": 305,
                        "iconType": "custom",
                        "thumbPath": "//pano.taagoo.com/normal/pic/2017/06/20/15948f49eea44d.png",
                        "link": "http://we.taagoo.com/video/163.html"
                    }
                ]
            },
            "scene_39984": {
                "voice": [],
                "video": [],
                "scene": [],
                "image": [],
                "text": [],
                "link": []
            },
            "scene_39949": {
                "voice": [],
                "video": [],
                "scene": [],
                "image": [],
                "text": [],
                "link": []
            },
            "scene_39940": {
                "voice": [],
                "video": [],
                "scene": [],
                "image": [],
                "text": [],
                "link": []
            },
            "scene_39950": {
                "voice": [],
                "video": [],
                "scene": [],
                "image": [],
                "text": [],
                "link": []
            },
            "scene_39945": {
                "voice": [],
                "video": [],
                "scene": [],
                "image": [],
                "text": [],
                "link": []
            },
            "scene_39986": {
                "voice": [],
                "video": [],
                "scene": [],
                "image": [],
                "text": [],
                "link": []
            }
        };
            }

            $("body").data("panoData",data);
            pk_works_main = work_view_uuid;
            var settings = {};
            settings["events[skin_events].onloadcomplete"] = "skin_showloading(false);";
            settings["onstart"] = '';

            //是否开始时弹出场景选择
            if (data.thumbs_opened=='1') {
                settings["events[skin_events].onloadcomplete"] += "open_show_scene_thumb();";
            }
            // 是否显示人气
            if(data.showviewnum == '1'){
                $("div#viewnumDiv").hide();
            }

            // 是否显示分享
            if(data.showshare == '1'){
                $("div#shareDiv").hide();
            }

            //统计人气
            if(data.counterNum.click!='0'){
                $("#user_viewNum").text(parseInt(data.counterNum.click)+1);
            }else{
                $("#user_viewNum").text("1");
            }
            //启动画面
            // var loadingObj = data.loading_img;
            // if (loadingObj) {
            //     //mobile
            //     settings["onstart"] += "showloadingimg('" + loadingObj + "','" + loadingObj + "');";
            // }
            for(var i=0 ; i<plugins_init_function.length;i++){
                plugins_init_function[i](data,settings);
            }
            settings['skin_settings.littleplanetintro'] = data.play_rules=="1" ? true : false;
            settings['autorotate.enabled'] = data.autorotate=="1" ? true : false;
            if (data.scene_group.sceneGroups.length > 0) {
                $(".vrshow_container_3_min .img_desc_container_min:eq(0) img").attr('src',data.scene_group.sceneGroups[0].imgPath);
            }
            embedpano({
                swf: "/pano_player/tour.swf",
                xml: pageObj.base_xml_url,
                id:'krpanoSWFObject',
                target: "pano",
                html5:'prefer',
                //flash:'only',
                wmode:'opaque-flash',
                mobilescale:0.7,
                vars: settings
            });

            if(pageObj.callBack){
                pageObj.callBack(data);
            }

        }
    });
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
    $("#video_player_modal").hide();
    $("#spotVideoBox").empty();
}

function setInitAngle(){

}

function openMusicVoiceBtn(){

}


function videoPh_open(src,img,type) {
    var posterImg='';
    if(img){
        posterImg = img;
    }
    $("#video_player_modal").modal('show');
    $("#spotVideoBox").empty();
    if(type==1){
            //=1为普通视频
            var videoStr = '<video class="spotVideo" preload="metadata" src="'+src+'" '
            +'controls="controls" poster="'+posterImg+'" autoplay="true"></video>'
            +'<a class="video_close" href="javascript:;" onClick="close_video_player()" >关闭</a>';
            $("#spotVideoBox").append(videoStr);
        }else{
           //全景视频
           var sceneData = [
                {sceneId:"v2", sceneName:"高清", sceneFilePath:src, sceneType:"Video",isVideoPlay:true}
           ];
                //播放器初始化
                var params = {
                    container:document.getElementById("spotVideoBox"),
                    name: "SceneViewer",
                    fullScreenMode:true,                  //全屏模式
                    dragDirectionMode: true,
                    dragMode: false,
                    scenesArr: sceneData,
                    errorCallBack: function (e) {
                        //播放器不支持全景播放回调
                        console.log("错误状态：" + e);
                    }
                };
                initLoad(params);
                $("#spotVideoBox").append('<a class="video_close" href="javascript:;" onClick="close_video_player()" >关闭</a>');
            }
        }
