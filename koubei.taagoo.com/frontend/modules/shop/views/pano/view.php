<?php
use common\models\Panoramic;
/* @var $this yii\web\View */
/* @var $shop common\models\KoubeiServiceMarketOrder */
/* @var $model common\models\Panoramic */
?>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <title><?= $shop->shop_name?></title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta content="no-cache, no-store, must-revalidate" http-equiv="Cache-Control" />
    <meta content="no-cache" http-equiv="Pragma" />
    <meta content="0" http-equiv="Expires" />
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <meta name='keywords' content='VR社区,全景社区,动景社区,720度,360度,VR视频,VR动景,摄影师,高清VR视频,VR技术,虚拟现实,微动景'/>
    <meta name='description' content='微动景是由动景网推出的动景VR社区,为广大摄影爱好者以及全景摄影师提供全景作品社交分享的网站。用户可以在屏幕上自由拖拽动景,视听同步犹如身临其境'/>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/pano_player/custom/css/response.css">
    <link rel="stylesheet" href="/pano_player/custom/css/redefine.css">
    <link rel="stylesheet" href="/pano_player/alivideo/alivideo.css" />
    <style>
        @-ms-viewport { width:device-width; }
        @media only screen and (min-device-width:800px) { html { overflow:hidden; } }
        html { height:100%; }
        body { height:100%; overflow:hidden; margin:0; padding:0; font-family:microsoft yahei, Helvetica, sans-serif;  background-color:#000000; }
    </style>
    <script>
        var pageObj = {
            pano_id:'<?=$model->id?>',
            pano_json_url:'<?=Yii::$app->urlManager->createUrl(['shop/pano/pano-json'])?>',
            base_xml_url:'<?=Yii::$app->urlManager->createUrl(['shop/pano/play-xml','id'=>$model->id])?>',
            login_id:'',
            login_url:'<?= urlencode(Yii::$app->request->hostInfo.Yii::$app->request->getUrl())?>',
            login_avatar:'',
            do_comment_url:'<?=Yii::$app->urlManager->createUrl(['/user-panoramic/do-comment','id'=>$model->id])?>',
            is_praise:''
        };
    </script>
    <script language="JavaScript" type="text/javascript" src="/pano_player/custom/js/jquery-1.9.1.js"></script>
    <script language="JavaScript" type="text/javascript" src="/js/bootstrap.min.js"></script>
    <script language="JavaScript" type="text/javascript" src="/pano_player/custom/js/common.js"></script>
    <script language="JavaScript" type="text/javascript" src="/pano_player/custom/js/vrshow.js"></script>
</head>
<body>
<script language="JavaScript" type="text/javascript" src="/pano_player/tour.js"></script>
<div id="fullscreenid" style="position:relative;width:100%; height:100%;">
    <div id="panoBtns" style="display:none;">
        <div class="vrshow_container_logo">
            <img id="logoImg" src="/images/logo1.png" style="display: none;"  onclick="">
            <div class="vrshow_logo_title" id="user_name_wrap"  >
                <div id="authorDiv" style="display: none;">作者：<span id="user_nickName"><?=$model->member->username?></span></div>
                <div style="clear:both;"></div>

            </div>
            <div class="vrshow_logo_title">
                <div id="viewnumDiv">人气：<span id="user_viewNum">0</span></div>
                <div style="clear:both;"></div>
            </div>

        </div>

        <div class="vrshow_container_1_min">
<!--            <div class="btn_fullscreen" onClick="fullscreen(this)" title="全屏开关" style="display:none;"></div>-->
            <!-- <div class="btn_bgmusic" onClick="pauseMusic(this)" style="display:none"></div> -->
            <div class="btn_vrmode" onClick="showWebVR()" title="VR开关" style="display:none"></div>
            <div class="btn_gyro"  onClick="toggleGyro(this)" style="display:none;"></div>
            <div class="btn_bgmusic" onClick="pause_bgMusic(this)" style="display:none"></div>
            <script>
                $(function(){
                    plugins_init_function.push(bgmusic_init);
                })
                function bgmusic_init(data,settings){
                    //背景音乐
                    var musicObj = data.bg_music;
                    if (musicObj.isWhole=='1') {
                        var musicOne = musicObj.sceneSettings[0];
                        if(musicOne.mediaUrl){
                            settings["onstart"] += "playsound(bgmusic, '" + musicOne.mediaUrl + "', 0);";
                        }
                    } else {
                        $(musicObj.sceneSettings).each(function (idx) {
                            if(this.mediaUrl){
                                settings['scene[scene_' + this.sceneID + '].bgmusic'] = this.mediaUrl;
                            }
                        });
                    }
                    settings["events[skin_events].onloadcomplete"]+="js(toggleMusicBtn(get(xml.scene)));";
                }
                function toggleMusicBtn(sceneName) {
                    var musicObj = $("body").data("panoData").bg_music;
                    var musicOne = musicObj.sceneSettings[0];
                    if (musicObj.isWhole=='1' && musicOne.mediaUrl) {
//                        if (musicObj.useMusic=='1') {
                        $('.btn_bgmusic,.btn_bgmusic_off').show();
//                        } else {
//                            $('.btn_bgmusic,.btn_bgmusic_off').hide();
//                        }
                    } else {
                        var imgUuid = sceneName.substring(sceneName.indexOf("_") + 1, sceneName.length).toLowerCase();
                        $(musicObj.sceneSettings).each(function (idx) {
                            if (imgUuid == this.sceneID && this.mediaUrl) {
//                                if (this.useMusic=='1') {
                                $('.btn_bgmusic,.btn_bgmusic_off').show();
//                                } else {
//                                    $('.btn_bgmusic,.btn_bgmusic_off').hide();
//                                }
                            }
                        });
                    }
                }
                function pause_bgMusic(el) {
                    var krpano = document.getElementById('krpanoSWFObject');
                    krpano.call("pausesoundtoggle(bgmusic);pausesoundtoggle(bgm);");
                    toggleMusic(el);
                }
                function toggleMusic(el) {
                    if ($(el).hasClass("btn_bgmusic")) {
                        $(el).removeClass("btn_bgmusic");
                        $(el).addClass("btn_bgmusic_off");
                    } else {
                        $(el).removeClass("btn_bgmusic_off");
                        $(el).addClass("btn_bgmusic");
                    }
                }
            </script>
            <div class="btn_music" style="display:none" onClick="pauseSpeech(this)"></div>
            <script>
                $(function(){
                    plugins_init_function.push(bgvoice_init);
                })
                function bgvoice_init(data,settings){
                    var speechObj = data.speech_explain;
                    if(speechObj.isWhole=='1'){
                        if(speechObj.useSpeech=='1'){
                            settings["onstart"] += "playsound(bgspeech, '"+speechObj.mediaUrl+"', 0);";
                        }
                    }else{
                        $(speechObj.sceneSettings).each(function(idx){
                            if(this.useSpeech=='1'){
                                settings['scene[scene_'+this.imgUuid+'].bgspeech'] = this.mediaUrl;
                            }
                        });
                    }
                    settings["events[skin_events].onloadcomplete"]+="js(toggleSpeechBtn(get(xml.scene)));";
                }
                function toggleSpeechBtn(sceneName){
                    var speechObj = $("body").data("panoData").speech_explain;
                    if(speechObj.isWhole=='1'){
                        if(speechObj.useSpeech=='1'){
                            $('.btn_music').show();
                        }else{
                            $('.btn_music').hide();
                        }
                    }else{
                        var imgUuid = sceneName.substring(sceneName.indexOf("_")+1,sceneName.length).toLowerCase();
                        $(speechObj.sceneSettings).each(function(idx){
                            if(imgUuid == this.imgUuid){
                                if(this.useSpeech=='1'){
                                    $('.btn_music').show();
                                }else{
                                    $('.btn_music').hide();
                                }
                            }
                        });
                    }
                }
                function pauseSpeech(el){
                    var krpano = document.getElementById('krpanoSWFObject');
                    krpano.call("pausesoundtoggle(bgspeech);pausesoundtoggle(bgs);");
                    toggleSpeech(el);
                }
                function toggleSpeech(el) {
                    if ($(el).hasClass("btn_music")) {
                        $(el).removeClass("btn_music");
                        $(el).addClass("btn_music_off");
                    } else {
                        $(el).removeClass("btn_music_off");
                        $(el).addClass("btn_music");
                    }
                }
            </script>
            <!-- <div class="btn_music" style="display:none" onClick="pauseSpeech(this)"></div> -->
            <!-- <div class="btn_gyro" onClick="toggleGyro(this)"></div> -->
            <!--<a class="btn_music" onclick="showthumbs()"></a>-->
            <!--<a class="btn_comment" onclick="addHotSpot()"></a>-->
            <!--<a class="btn_comment" onclick="openGyro()"></a>-->
        </div>
        <div class="vrshow_radar_btn" onClick="toggleKrpSandTable()">
            <!-- <span class="btn_sand_table_text">沙盘</span> -->
        </div>
        <div class="vrshow_tour_btn" onClick="startTourGuide()">
            <span class="btn_tour_text">一键导览</span>
        </div>
        <div class="vrshow_container_2_min">

            <div class="img_desc_container_min" id="footmarkDiv">
                <img src="/pano_player/custom/images/footmark.png"  onClick="showFootMark(this)">
                <div class="img_desc_min">足迹</div>
            </div>
            <div class="img_desc_container_min" id="shareDiv">
                <img src="/pano_player/custom/images/vr-btn-share.png" onClick="getQRCodePic()">
                <div class="img_desc_min">分享</div>
            </div>

            <div class="img_desc_container_min" id="profileDiv">
                <img src="/pano_player/custom/images/vr-btn-desc.png" onClick="showProfile()">
                <div class="img_desc_min">简介</div>
            </div>


            <div class="img_desc_container_min" id="praiseDiv">
                <img id="btnpraise" src="/pano_player/custom/images/vr-btn-good.png" onClick="addPraise(this)">
                <div class="img_desc_min" id = "praisedNum">0</div>
            </div>

            <script>
                $(function(){
                    plugins_init_function.push(praise_init);
                })
                function praise_init(data){
                    if(data.showpraise == '1'){
                        $("#praiseDiv").hide();
                    }else if(pageObj.is_praise){
                        $("#btnpraise").attr('src','/pano_player/custom/images/vr-btn-good-click.png');
                    }
                    $("#praisedNum").text(data.counterNum.praise);
                }
                /**
                 * 赞加1，并且发起推送
                 * @param obj
                 */
                function addPraise(obj) {
                    if (!pageObj.login_id) {
                        window.location.href = pageObj.login_url;
                    }else if(!pageObj.is_praise){
                        $(obj).attr('src','/pano_player/custom/images/vr-btn-good-click.png');
                        var num = $($(obj).next()).text();
                        num = parseInt(num);
                        $($(obj).next()).text(num + 1);
                        $.ajax({
                            url: '<?=Yii::$app->urlManager->createUrl('user-panoramic/do-praise')?>',
                            method:'post',
                            data: {'id':pageObj.pano_id},
                            dataType: 'json',
                            success: function(res){
                                if(res.status==1){
                                    pageObj.is_praise = true;
                                }else{
                                    alert('点赞失败，稍后再试。');
                                }
                            },
                            error:function(){
                                alert('点赞失败，稍后再试。');
                            }
                        });
                    }
                }
            </script>
            <style>
                .vrshow_comment {
                    position: absolute;
                    bottom: 10%;
                    left: 50%;
                    margin-left: -200px;
                    width: 400px;
                    min-height: 100px;
                    background-color: rgba(51, 51, 51, 0.8);
                    z-index: 4300;
                    color: #fff;
                    border-radius: 5px;
                    display: none;
                }
                @media screen and (max-width: 767px) {
                    .vrshow_comment {
                        width: 250px;
                        margin-left: -125px;
                    }

                }
            </style>
            <div class="img_desc_container_min" id="comment_div">
                <img src="/pano_player/custom/images/vr-btn-comment.png" onClick="show_comment()">
                <div class="img_desc_min">说一说</div>
            </div>

            <script src="/pano_player/custom/js/comment.js"></script>
        </div>


        <div class="vrshow_container_3_min">
            <div class="img_desc_container_min scene-choose-width" style="display:none">
                <img src="http://pano.taagoo.com/static/player/1.19-pr6/system-icon/menu.png" onclick="showthumbs()">
                <div class="img_desc_min">场景选择</div>
            </div>
        </div>
        <!-- 打赏按钮 -->
        <!--<div class="gratuity-box">
            <img id="gratuity-btn" src="/pano_player/custom/images/gratuity-icon.png" >
        </div>-->
    </div>

    <div id="pano" style="width:100%; height:100%;">
    </div>

    <div class="modal" id="pictextModal" data-backdrop="static" data-keyboard="false" style="z-index:2002">
        <div class="modal-dialog">
            <div class="modal-header text-center" >
                <button type="button" class="close" onClick="hidePictext()"><span>&times;</span></button>
                <span style="color: #353535;font-weight:700" id="pictextWorkName"></span>
            </div>
            <div class="modal-body" style="height:400px;overflow-y:scroll ">
                <div class="row">
                    <div class="col-sm-offset-1 col-md-offset-1 col-md-10 col-sm-10 col-xs-12" id="pictextContent">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--    打赏-->
    <div class="modal-dialog" id="gratuityModal">
        <div class="modal-header text-center" >
            <button type="button" class="close gratuity-close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
            <span id="pictextWorkName">打赏动景</span>
        </div>
        <div class="modal-body" >
            <div class="row gratuity-list">
                <div class="col-xs-3"><button type="button" total-fee="0.1">0.1元</button></div>
                <div class="col-xs-3"><button type="button" total-fee="0.5">0.5元</button></div>
                <div class="col-xs-3"><button type="button" total-fee="1.00">1元</button></div>
                <div class="col-xs-3"><button type="button" total-fee="5.00">5元</button></div>
                <div class="col-xs-3"><button type="button" total-fee="10.00">10元</button></div>
                <div class="col-xs-3"><button type="button" total-fee="20.00">20元</button></div>
                <div class="col-xs-3"><button type="button" total-fee="50.00">50元</button></div>
                <div class="col-xs-3"><button type="button" total-fee="100.00">100元</button></div>
            </div>
            <button type="button" class="other-gr-btn" >其他金额</button>
        </div>
        <p class="gratuity-tip">谢谢您的赞赏，打赏收入作者可以从系统后台进行提现！</p>
        <p class="gratuity-count">已有<span></span>人打赏</p>
    </div>
    <!--其他金额-->
    <div class="modal-dialog" id="other-modal">
        <div class="modal-header text-center" >
            <button type="button" class="close other-close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
            <span id="pictextWorkName">其他金额</span>
        </div>
        <div class="modal-body" >
        </div>
        <div class="input-gratuity-box">
            <div>
                <input type="number" name="points" min="0.1" max="600" placeholder="0.1-600" id="other-val" />元
            </div>
        </div>
        <p class="gratuity-tip">打赏金额不能为空且必须大于0.1元小于600元。</p>
        <button type="button" class="gratuity-define" >确认打赏</button>
        <p class="gratuity-count">已有<span></span>人打赏</p>
    </div>
    <!--    选择支付方式-->
    <div class="modal-dialog" id="pay-type">
        <div class="modal-header text-center" >
            <button type="button" class="close pay-type-close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
            <span id="pictextWorkName">打赏动景</span>
        </div>
        <div class="modal-body" >
            <ul class="pay-list">
                <li>
                    <img src="/pano_player/custom/images/zhifb.png">
                    <p>支付宝支付</p>
                    <div></div>
                </li>
                <li>
                    <img src="/pano_player/custom/images/weixin.png">
                    <p>微信支付</p>
                    <div></div>
                </li>
            </ul>
        </div>
        <button type="button" class="confirm-pay" data-loading-text="请稍等...">确认支付¥<span>0.00</span></button>
    </div>
    <!--二维码-->
    <div class="modal-dialog" id="pay-qrcode">
        <div class="modal-header text-center" >
            <button type="button" class="close qrcode-close"><span>&times;</span></button>
            <span id="pictextWorkName">用微信扫描二维码进行打赏</span>
        </div>
        <div class="modal-body" >
            <img class="qrcode-img" src=""/>
        </div>
    </div>
    <!--支付成功-->
    <div class="modal-dialog" id="pay-back">
        <div class="modal-header text-center" >
            <button type="button" class="close pay-back-close"><span>&times;</span></button>
            <span id="pictextWorkName">打赏成功</span>
        </div>
        <div class="modal-body" >
            <span></span> 谢谢老板打赏！
        </div>
    </div>
    <!-- </div> -->
    <!--         <div class="modal" id="privacyPwdModal" data-backdrop="static" data-keyboard="false" style="z-index:2002">
                <div class="modal-dialog modal-350">
                    <div class="modal-content">
                        <div class="modal-header login-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span
                                    class="sr-only">关闭</span></button>
                            <img src="/static/images/logo.png">
                        </div>
                        <div class="modal-body padding-l-r">
                            <div class="row">
                                <div class="col-md-12">
                                    <form class="form-horizontal" method="post" role="form">
                                        <div class="form-group">
                                            <div class="col-md-12">
                                                <h6 class="text-center" style="margin-top:0;line-height: 2;color: #666;">请输入访问密码</h6>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <input type="password" placeholder="访问密码" id="privacyPwd"
                                                           class="form-control btn-block">
                                                </div>
                                                <div class="col-md-12" style="margin-top: 20px;">
                                                    <button class="btn btn-primary btn-block" type="button" id="pwdConfirmBtn">
                                                        确定
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->


    <div id="logreg">
    </div>
    <script>
        $(function(){
            plugins_init_function.push(showvrglass_init);
        })
        function showvrglass_init(data,settings){
            settings['skin_settings.webvr'] = data.showvrglasses==1 ? false : true;
        }
        function showWebvrBtn(){
            $('.btn_vrmode').show();
        }
    </script>
    <script>
        $(function(){
            plugins_init_function.push(showlogo_init);
        })
        function showlogo_init(data){
            if(data.showlogo=='1'){
                $("#logoImg").hide();
            }else{
                $("#logoImg").show();
            }
        }
    </script>
    <script>
        $(function(){
            $("#logoImg").show();
            plugins_init_function.push(custom_logo_init);
        })
        function custom_logo_init(data){
            var logoObj = data.custom_logo;
            if(logoObj){
                $('#logoImg').attr('src', logoObj.imgPath);
                if(logoObj.logoLink) {
                    $('#logoImg').attr('onclick', 'javascript:window.open("' + logoObj.logoLink + '")');
                }
            }
        }
    </script>


    <script>
        $(function(){
            plugins_init_function.push(footmarker_init);
        })
        function footmarker_init(data){
            $('#footmarkDiv').find('img').attr('lng',data.lng).attr('lat',data.lat).attr('address',data.address);
            if (data.footmark=='0') {
                $('#footmarkDiv').hide();
            }
        }
        function hideShareAndFootmarkBtn(){
            //$("#shareDiv").hide();
            $("#footmarkDiv").hide();
        }
        function showFootMark(_this){
            $("#show_map").modal('show');
            setTimeout(function () {
                var mapOpt = {
                    map_box: 'mapContent',
                    lat : $(_this).attr('lat'),
                    lng : $(_this).attr('lng'),
                    address : $(_this).attr('address'),
                    showSelectInfoWindow : false,
                    showSearchMarker : false
                };
                getBaiduMap(mapOpt);
            },500)

        }
    </script>

    <script>
        $(function(){
            plugins_init_function.push(gyro_init);
        })
        function gyro_init(data,settings){
            if (data.gyro!="0") {
                $(".btn_gyro").show;
            }
            settings['skin_settings.gyro'] = data.gyro=="1" ? true : false;
        }
        function showGyroBtn() {
            var gyro = $("body").data("panoData").gyro;
            if (gyro) {
                var krpano = document.getElementById('krpanoSWFObject');
                krpano.set("plugin[skin_gyro].enabled",true);
                $(".btn_gyro").show();
            }
        }

        function toggleGyro(el) {
            var krpano = document.getElementById('krpanoSWFObject');
            if ($(el).hasClass("btn_gyro")) {
                krpano.set("plugin[skin_gyro].enabled",false);
                $(el).removeClass("btn_gyro");
                $(el).addClass("btn_gyro_off");
            } else {
                krpano.set("plugin[skin_gyro].enabled",true);
                $(el).removeClass("btn_gyro_off");
                $(el).addClass("btn_gyro");
            }
        }
        function openGyro(){
            var krpano = document.getElementById('krpanoSWFObject');
            alert(krpano.get("plugin[skin_gyro].isavailable"));
        }
    </script>
    <script>
        $(function(){
            plugins_init_function.push(link_init);
            $('#mapMarkModal').on('hide.zui.modal', function (e) {
                toggleBtns(true);
            });
        })
        function link_init(data){
            $(".vrshow_container_3_min .img_desc_container_min:first").nextAll().remove();
            if (data.custom_right_button.linkSettings && data.custom_right_button.linkSettings.length > 0) {
                $(data.custom_right_button.linkSettings).each(function(idx){
                    var imgSrc = this.icon;
                    var title = this.title;
                    var htmlStr = '';
                    if(this.type == 3){
                        var locationData = this.content;
                        htmlStr += '<div class="img_desc_container_min img_add" >'+
                            '<img src="'+imgSrc+'" onclick="showFootMark(this)" lng="'+this.lng+'" lat="'+this.lat+'" address="'+this.address+'">'+
                            '<div class="img_desc_min">'+title+'</div>'+
                            '</div>';
                        $(".vrshow_container_3_min").append(htmlStr);
                        $(".vrshow_container_3_min > div:last img").data("locationData",locationData);
                    }else{
                        var url = this.content;
                        if(!isNaN(url)){
                            url = "tel://" + url;
                        }else{
                            if(url.indexOf('http://') != 0&&url.indexOf('https://') != 0){
                                url = 'http://' + url;
                            }
                        }
                        htmlStr += '<div class="img_desc_container_min img_add" >'+
                            '<img src="'+imgSrc+'" onclick="lookLinkUrl(\''+url+'\')" '+(isIos()?'':'data-toggle="tooltip"')+' title="'+(url.length > 20 ? url.substring(0,20)+'...' : url)+'">'+
                            '<div class="img_desc_min">'+title+'</div>'+
                            '</div>';
                        $(".vrshow_container_3_min").append(htmlStr);
                    }
                });
                $('.vrshow_container_3_min [data-toggle=tooltip]').tooltip({});
            }
        }
        function isIos(){
            var ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
                return true;
            }
            return false;
        }
        function lookLinkUrl(url){
            window.open(url);
        }
        function openMapModal(el,readonly){
            // toggleBtns();
            mapModalEl = el;
            _U.mapMarkModal().openModal($(mapModalEl).data("locationData"),readonly);
        }
    </script>
    <script>
        $(function(){
            plugins_init_function.push(custom_user_init);
        })
        function custom_user_init(data){
            var logoObj = data.custom_logo;
            if(logoObj && logoObj.user){
                $("#user_nickName").text(logoObj.user);
            }
        }
    </script>


    <script>
        $(function(){
            plugins_init_function.push(open_alert_init);
        })
        function open_alert_init(data,settings){
            if (data.openAlert.iconID!='0' && data.openAlert.imgPath) {
                settings["events[skin_events].onloadcomplete"] += "show_open_alert('" + data.openAlert.imgPath + "');";
            }
        }
    </script>
    <script>
        $(function(){
            plugins_init_function.push(custom_right_init);
        })
        function custom_right_init(data){
            // $(".vrshow_container_3_min .img_desc_container_min:first").nextAll().remove();
            // if (data.url_phone_nvg.linkSettings && data.url_phone_nvg.linkSettings.length > 0) {
            //     $(data.custom_right_button.linkSettings).each(function(idx){
            //         var title = this.title;
            //         var htmlStr = '';
            //         var url = this.content;
            //            if(!isNaN(url)){
            //                url = "tel://" + url;
            //            }else{
            //                if(!(url.indexOf('http://') == 0)){
            //                    url = 'http://' + url;
            //                }
            //            }

            //     });
            // }

        }
        // function lookLinkUrl(url){
        //     window.open(url);
        // }

    </script>
    <script>
        $(function(){
            plugins_init_function.push(shade_sky_floor_init);
        })
        function shade_sky_floor_init(data,settings){
            if (data.sky_land_shade.isWhole) {//全局遮罩
                var useShade = data.sky_land_shade.useShade;
                if (useShade) {
                    var imgPath = data.sky_land_shade.shadeSetting.imgPath;
                    var location = data.sky_land_shade.shadeSetting.location;
                    if (location == 0) {
                        location = -90;
                    } else {
                        location = 90;
                    }
                    settings["events[skin_events].onloadcomplete"] += "show_shade('" + imgPath + "'," + location + ",true);";
                }
            } else {//单场景遮罩
                settings["events[skin_events].onloadcomplete"]+="js(getShade(get(xml.scene)));";
            }
        }
        function getShade(sceneName) {
            var imgUuid = sceneName.substring(sceneName.indexOf('_') + 1).toLowerCase();
            var panoData = $("body").data("panoData");
            var shadeSetting = panoData.sky_land_shade.shadeSetting;
            if (shadeSetting) {
                for(var i = 0;i < shadeSetting.length ; i++){
                    var obj = shadeSetting[i];
                    if(imgUuid == obj.imgUuid){
                        var useShade = obj.useShade;
                        if (useShade) {
                            var imgPath = obj.imgPath;
                            var location = obj.location;
                            if (location == 0) {
                                location = -90;
                            } else {
                                location = 90;
                            }
                            var krpano = document.getElementById('krpanoSWFObject');
                            krpano.call("addShade('" + imgUuid + "','" + imgPath + "'," + location + ");");
                        }
                    }
                }
            }
        }
    </script>

    <script>
        $(function(){
            plugins_init_function.push(showuser_init);
        })
        function showuser_init(data){
            if(data.showuser=='1'){
                $("#authorDiv").hide();
            }else{
                $("#authorDiv").show();
            }
        }
    </script>
    <div class="modal" id="qrCodeModal" data-backdrop="static" data-keyboard="false" style="z-index:2002;margin-top:10%;">
        <div class="modal-dialog" style="height:350px;">
            <div class="modal-header" >
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <span style="color: #353535;">用手机扫描二维码分享给你的好友</span>
            </div>
            <div class="modal-body">
                <div class="center-block" style="text-align: center">
                    <img id="qrcode" src="/images/loading.gif" width="226px" height="226px">
                </div>
            </div>
        </div>
    </div>
    <script>
        $(function(){
            plugins_init_function.push(share_init);
        })
        function share_init(data){
            if(data.showshare == "1"){
                $("#shareDiv").hide();
            }
        }
        //分享-获取二维码
        function getQRCodePic(){
            $("#qrCodeModal").modal('show');
            $("#qrcode").attr("src",'<?=Yii::$app->urlManager->createUrl(['panoramic/qrcode','id'=>$model->id])?>');
        }
    </script>
    <script>
        $(function(){
            plugins_init_function.push(showviewnum_init);
        })
        function showviewnum_init(data){
            if(data.showviewnum=='1'){
                $("#viewnumDiv").hide();
            }


        }
    </script>
    <div class="modal" id="infomationModal" data-backdrop="static" data-keyboard="false" style="z-index:2002;margin-top:10%;">
        <div class="modal-dialog">
            <div class="modal-header text-center" >
                <button type="button" class="close" onClick="hideProfile()"><span>&times;</span></button>
                <span style="color: #353535;font-weight:700" id="profileWorkName"></span>
            </div>
            <div class="modal-body" style="height:250px;overflow-y:scroll ">
                <div class="row">
                    <div class="col-sm-offset-1 col-md-offset-1 col-md-10 col-sm-10 col-xs-12">
                        <span id="profileProfile"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        $(function(){
            plugins_init_function.push(profile_init);
        })
        function profile_init(data){
            if(data.showprofile == '1'){
                $("#profileDiv").hide();
            }
        }
        function hideProfile() {
            $('#infomationModal').modal('hide');
            toggleBtns(true);
        }
        function showProfile() {
            toggleBtns(false);
            var data = $("body").data("panoData");
            $('#profileWorkName').text('');
            $('#profileProfile').text('');
            $('#profileWorkName').text(data.name);
            $('#profileProfile').text(data.summary==null?"":data.summary);
            $('#infomationModal').modal("show");
        }
    </script>
    <div class="vrshow_comment">
        <div class="row">
            <div class="col-md-12">
                <h4 style="margin-left:10px">评论</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12" style="padding-left:20px;padding-right:20px">
                <textarea id="usercomm" class="form-control" rows="3" placeholder="说点什么吧！最多不要超过15个字哦" maxlength="15"></textarea>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 text-right" style="padding:10px 20px">
                <div class="hide-comment" onClick="switch_show_comment(false)">
                    <img src="/pano_player/custom/plugin/comment/images/hide-comment.png">
                    <span>隐藏</span>
                </div>
                <button  class="btn btn-primary disabled" type="button" id="doComm">发表</button>
                <button class="btn" type="button" onClick="cancel_comment()">取消</button>
            </div>
        </div>
    </div>
</div>


<div class="modal" id="video_player_modal" data-keyboard="false" style="z-index:2002;background: transparent;">
    <div class="modal-dialog" style="width: 100%;height: 100%;border-width: 0;">
        <div class="modal-body" style="padding: 0;width: 100%;height: 100%;">
            <div class="prism-player" id="J_prismPlayer" >
                <div class="spotVideoBox" id="spotVideoBox"></div>
            </div>
        </div>
    </div>
</div>
<script>
    function videoPh_open(src,img) {
        var posterImg='';
        if(img){
            posterImg = img;
        }
        $("#video_player_modal").modal('show');
        $("#spotVideoBox").empty();
        var videoStr = '<video class="spotVideo" preload="metadata" src="'+src+'" '
            +'controls="controls" poster="'+posterImg+'" autoplay="true"></video>'
            +'<a class="video_close" href="javascript:;" onClick="close_video_player()" >关闭</a>';
        $("#spotVideoBox").append(videoStr);
    }
</script>
<!--    地图-->
<div class="modal fade nocache-modal" id="show_map" tabindex="-1" role="dialog" data-backdrop='static' aria-labelledby="myLargeModalLabel" style="z-index: 2003;">
    <div class="modal-dialog" style="width: 60%;" role="document">
        <div class="modal-content">
            <div class="modal-header" style="height: 50px;">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body">
                <div class="map-content" id="mapContent" style="height: 300px; width: 100%;"></div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn" data-dismiss="modal" aria-label="Close">关闭</button>
            </div>
        </div>
    </div>
</div>

</body>

<script language="JavaScript" type="text/javascript" src="/pano_player/custom/js/object.js"></script>
<script type="text/javascript" src="/pano_player/alivideo/alivideo.js"></script>
</html>