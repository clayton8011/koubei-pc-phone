
$(function() {
    var viewPano = {};
    var PanoUpdate = (function() {
        var materialStatus = "";
        var pub = {
            Int : function() {
                $(':checkbox[name=switch_checkbox]').each(function () {
                    $(this).bootstrapSwitch('state',$(this).is(':checked'));
                });
                $('[data-toggle="tooltip"]').tooltip();
                $("select.chosen-select").chosen({ 
                    no_results_text: "没有找到",
                    disable_search_threshold: 10, 
                    width: "100%", 
                    max_selected_options: 3 ,
                    search_contains:true
                })              
                pub.allEvent();
                pub.intImgPost();
            },
            intImgPost : function() {
                    $.ajax({
                        url: getImages,
                        type: 'post',
                        dataType: 'json',
                        data: {type: 'system'},
                        success : function(data) {
                            var oBox = $("#myIntTabContent").children('div#picInt');
                            oBox.empty();
                            var oHtmlStr = "";
                            for(var i in data){
                                oHtmlStr += '<div class="imgMist"><img class="img" src="'+data[i].image_path+'" imgId="'+data[i].id+'" title="'+data[i].title+'" type="system"></div>';
                            }
                            oBox.append(oHtmlStr);
                        }
                    })                    
            },
            materialImgPost : function() {
                    $("#music_tab").parent('li').hide();
                    $("#pic_tab").parent('li').show();
                    $('#myTab a#pic_tab').tab('show');
                    /*var httpRequest = new XMLHttpRequest();
                    httpRequest.open("post",getImages,true);
                    httpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                    httpRequest.onreadystatechange = function() {
                        if(httpRequest.readyState == XMLHttpRequest.DONE){
                            if(httpRequest.status == 200){
                                var oBox = $("#myTabContent").children('div#pic');
                                oBox.empty();
                                var oHtmlStr = "";
                                var data = JSON.parse(httpRequest.responseText);
                                for(var i in data){
                                    oHtmlStr += '<div class="imgMist"><img class="img" src="'+data[i].images_path+'" imgId="'+data[i].id+'" size="'+data[i].size+'" title="'+data[i].title+'" type="custom"></div>';
                                }
                                oBox.append(oHtmlStr);
                            }else{
                                console.log(httpRequest.status);
                            }
                        }
                    }
                    var str = 'custom';
                    // httpRequest.send({type:'custom'});
                    httpRequest.send('type='+str+'&qqq=a');*/
                    $.ajax({
                        url: getImages,
                        type: 'post',
                        dataType: 'json',
                        data: {type: 'custom'},
                        success : function(data) {
                            var oBox = $("#myTabContent").children('div#pic');
                            oBox.empty();
                            var oHtmlStr = "";
                            for(var i in data){
                                oHtmlStr += '<div class="imgMist"><img class="img" src="'+data[i].images_path+'" imgId="'+data[i].id+'" size="'+data[i].size+'" title="'+data[i].title+'" type="custom"></div>';
                            }
                            oBox.append(oHtmlStr);
                        }
                    })
            },
            materialAudioPost : function() {
                    console.log("this is icon_voice");
                    $("#pic_tab").parent('li').hide();
                    $("#music_tab").parent('li').show();
                    $('#myTab a#music_tab').tab('show');
                    $.ajax({
                        url: getMusic,
                        type: 'post',
                        dataType: 'json',
                        data: {type: 'custom'},
                        success: function(data) {
                            var oBox = $("#myTabContent").children('div#music');
                            oBox.empty();
                            var oHtmlStr = "";
                            for(var i in data){
                                oHtmlStr += '<div class="row"><div class="col-md-3 voice-name">'+data[i].title+'</div>'
                                    +'<div class="col-md-5"><div class="musicMist"><audio class="audio" controls="controls" preload="none" '
                                  +'src="'+data[i].music_path+'" audioId="'+data[i].id+'" size="'+data[i].size+'" title="'+data[i].title+'"></audio></div></div></div>';
                            }
                            oBox.append(oHtmlStr);
                        }
                    })
            },
            ChangeThumb : function() {
                    var oImg = $(".chooseImg").children('img');
                    var oScr = oImg.attr('src');
                    if(oImg[0].naturalWidth < 450 || oImg[0].naturalHeight < 450){
                        $("#errorMsg").html("图片尺寸小于450*450像素");
                    }else if(oImg.attr('size') > 2097152){
                        $("#errorMsg").html("图片大小超过2M");
                    }else{
                        $.ajax({
                            url: panoThumbs,
                            type: 'post',
                            dataType: 'json',
                            data: {panoramic_id:panoramic_id,thumbs:oScr},
                            success: function(result) {
                                // console.log(result);
                                if (result.status == 0) {
                                    taagoo_obj.alert("上传失败")
                                }else{
                                    $("#thumbpath").attr('src', oScr+'?x-oss-process=image/resize,w_220');
                                    $("#errorMsg").html("");
                                }
                            }
                        })
                    }
            },
            ChangeAudio : function() {
                    var oAudio = $(".chooseVoice").find('audio');
                    var oParent = $(".voiceNow").parents('.row');
                    if(oParent.length == 0){
                        // 音频热点
                        $('#music_style p').data('musicsrc',oAudio.attr('src'));
                        $('#music_style p').data('rid',oAudio.attr('audioid'));
                        $('#music_style p span:eq(1)').text(oAudio.attr('title'));
                        $('#music_style p span:eq(0)').text('已选择音乐')
                        hotspotInd.toggleAllNextBtn(true);
                    }else{
                        oParent.find('.voice_title').html(oAudio.attr('title'));
                        oParent.find('.btn-group').children('audio').attr('src', oAudio.attr('src'));
                        oParent.find('.btn-group').children('audio').attr('data-audio-key', oAudio.attr('audioid'));
                        oParent.find('.btn-group').children('button').removeAttr('disabled');
                    }                    
                    $(".voiceNow").removeClass('voiceNow');
            },
            allEvent : function() {
                $("#workslocation").bind('click', function(e) {
                    var oNewUrl = $(this).val();
                    window.open(oNewUrl);
                });

                $(".copyable").bind('click', function(e) {
                    var oCopyTarget = $(this).parent('div').siblings('div').children('input').attr("id");
                    var e = document.getElementById(oCopyTarget);
                    e.select();
                    document.execCommand("Copy");
                });

                //修改场景名称
                $("#pano_rename").on('show.bs.modal', function(e) {
                    var oTarget = $(e.relatedTarget).parents("li").attr('data-scene-id');
                    var oTxt = $(e.relatedTarget).parent().find('.pano-rename').val();
                    $(".rename-value").val(oTxt);
                    $(".rename-value").attr('taget-id', oTarget);
                });

                $('#pano_rename').on('click','.modal-footer button',function(e){
                    var ListId = $(".rename-value").attr('taget-id');
                    var newTxt = $(".rename-value").val();
                    var oLi = $("#sort-list").find('li[data-scene-id='+ListId+']');
                    oLi.find('span.pano-name').html(newTxt);
                    oLi.find('.pano-rename').val(newTxt);
                    $('div[data-scene-id='+ListId+']').find('div.voice-scene-name').html(newTxt);
                    $('div[data-scene-id='+ListId+']').find('label.imgScene').html(newTxt);
                    $("#pano_rename").modal('hide');
                });
            },
        }
        return pub;
    })();
    PanoUpdate.Int();

    

    //弹出素材modal
    $("#materialBox").on('show.bs.modal', function(e) {
        var testArr = [];
        $("#modal_container").html('');
        $("#modal_ossfile").html('');
        $('div#upload div.col-md-12 div.file-input').remove();
        $('div#upload div.col-md-12 div#kvFileinputModal').remove();
        $('div#upload div.col-md-12').append('<input id="imgUploadObj" name="file" type="file">');
        var oTarget = $(e.relatedTarget);
        // var testId = oTarget.attr("id");
        var testCss = oTarget.attr("class");
        oTarget.addClass('voiceNow');
        if(oTarget.hasClass('icon_voice')){
            PanoUpdate.materialAudioPost();
            $('#imgUploadObj').attr('accept','audio/mp3');
            upload_pano_obj.policy_url = getPolicy + 'material_music';
            upload_pano_obj.maxSize = 5;
            upload_pano_obj.fileType = ['mp3'];
        }else{
            PanoUpdate.materialImgPost();
            $('#imgUploadObj').attr('accept','image/jpeg');
            upload_pano_obj.policy_url = getPolicy + 'material_images';
            upload_pano_obj.maxSize = 2;
        }
        upload_pano_obj.initUploadPano();
        upload_pano_obj.successFun = function (data) {
            var response = data[(data.length-1)];
            if (response && response.status == 1) {//上传成功
                response['type'] = (testCss == "icon_voice" ? 'music' :'images');
                $.ajax({
                    type : 'post',
                    url : upload_file,
                    data : response,
                    dataType : 'json',
                    success : function(result){
                        if(result.status==1){
                            var str = '';
                            if(testCss == "icon_voice"){
                                $('div#music div.chooseVoice').removeClass('chooseVoice');
                                str = '<div class="row chooseVoice"><div class="col-md-3 voice-name">'+result.title+'</div><div class="col-md-5"><div class="musicMist"><audio class="audio" controls="controls" preload="none" src="'+test_pano_url+response.filename+'" audioid="'+result.id+'" size="'+response.size+'" title="'+result.title+'"></audio></div></div></div>';
                                $('div#music').append(str);
                                $('ul#myTab a#music_tab').click();
                            }else{
                                $('div#pic div.chooseImg').removeClass('chooseImg');
                                str = '<div class="imgMist chooseImg"><img class="img" src="'+test_pano_url+response.filename+'" imgid="'+result.id+'" size="'+response.size+'" title="'+result.title+'" type="custom"></div>';
                                $('div#pic').append(str);
                                $('ul#myTab a#pic_tab').click();
                            }
                            $('div#upload div.kv-zoom-cache').hide();
                        }else{
                            taagoo_obj.alert('上传失败，请重试。');
                        }
                    }
                });
            }
        }
    });

    $(document).on('click', '.imgMist', function(e) {
        $(this).addClass('chooseImg').siblings().removeClass("chooseImg");
    });

    $("#materialDefaultBox").on('show.bs.modal', function(e) {
        var oTarget = $(e.relatedTarget);
        oTarget.addClass('voiceNow');
        $('#myIntTab a#pic_int_tab').tab('show');
    });
    $("#materialBox").on('hide.bs.modal', function(event) {
        $(".voiceNow").removeClass('voiceNow');
    });

    $("#materialBox").on('click', '#music .row', function(e) {
        $(this).addClass('chooseVoice').siblings().removeClass("chooseVoice");
    });


    //  图标确认按钮
    $("#materialBox").on('click', '#btnMediaResImg', function(e) {
        // var oScr = $(".chooseImg").children('img').attr('src');
        var oTarget = $(".voiceNow");
        var ImgPonit = oTarget.siblings('img.imgPoint');
        var LinkImg = oTarget.parent(".img-right-a").siblings('img.imgPoint');
        var oMaskBox = oTarget.parent(".col-md-2").siblings('.use_around');
        var aimImgSrc = $(".chooseImg").children('img').attr('src');
        var aimImgId= $(".chooseImg").children('img').attr('imgid');
        var newImgSpot = oTarget.parent("div").siblings('img.spotImgNew');
        // var oMaskScene = oTarget.parent(".col-md-2").siblings('.col-md-3').find('.singImg');
        if(oTarget.attr("id") == "workCover" && $(".chooseImg").length != 0){
            // 换缩略图
            PanoUpdate.ChangeThumb();
        }else if($(".chooseVoice").length != 0){
            // 替换音频
            PanoUpdate.ChangeAudio();
        }else if($(".chooseImg").children('img').attr('size') > 2097152){
            // 超大
            $("#errorMsgBox").modal('show');
            // return;
        }else if(ImgPonit.length == 1 && $(".chooseImg").length != 0){
            // 自定义logo
            ImgPonit.attr('src', aimImgSrc);
            ImgPonit.attr('data-img-key', aimImgId);
            ImgPonit.show();
            oTarget.siblings('.radio').find('input').prop('checked', false);
            oTarget.siblings('.radio').find('input#radioOptionsLogo1').prop('checked', true);
        }else if(LinkImg.length == 1 && $(".chooseImg").length != 0){
            // 链接与导航
            LinkImg.attr('src', aimImgSrc);
            LinkImg.attr('data-img-key', aimImgId);
            LinkImg.attr('type', 'custom');
        }else if($(".chooseImg").length != 0 && oMaskBox.length === 1){
            // 遮罩
            var allImg = $(".chooseImg").children('img');
            var oImgSrc = allImg.attr('src');
            var imgid = allImg.attr('imgid');
            var oImgTitle = allImg.attr('title');
            oMaskBox.find('img').attr('src',oImgSrc);
            oMaskBox.find('img').attr('data-img-key',imgid);
            oMaskBox.find('img').attr('mask-size','100');
            oMaskBox.find('.imgTitle').html(oImgTitle);
            oMaskBox.siblings('.label_radio').find('input').prop('checked', false);
            oMaskBox.show();
        }else if($(".chooseImg").length != 0 && newImgSpot.length === 1){
            // 热点
            var allImg = $(".chooseImg").children('img');
            var oImgSrc = allImg.attr('src');
            var imgid = allImg.attr('imgid');
            var oImgTitle = allImg.attr('title');
            newImgSpot.attr('src',oImgSrc);
            newImgSpot.attr('data-img-key',imgid);
            $("#allAroundModal .modal-footer").find('button').attr('disabled',false);
        }else if(oTarget.parent().hasClass('add_sand') && aimImgId){
            //沙盘选择图片
            sand_table_obj.choosePic({
                src:aimImgSrc,
                img_id:aimImgId,
            });
        }else if(oTarget.parents('#imgChoose').hasClass('tabshow') && aimImgId){
            //图片热点
            $("#imgChoose").find('ul.imghotspot-sortable').empty();
            var allImg = $(".chooseImg").children('img');
            var oImgSrc = allImg.attr('src');
            var imgid = allImg.attr('imgid');
            var oImgTitle = allImg.attr('title');
            var oList = '<li><img data-rid="'+imgid+'" src="'+oImgSrc+'"><span class="delete"><a href="javascript:void(0)">删除</a></span></li>'
            $("#imgChoose").find('ul.imghotspot-sortable').append(oList);
            hotspotInd.toggleAllNextBtn(true);
        }
        $('#materialBox').modal('hide');
    });

    //  使用系统默认
    $(".modal").on('click', '#radioOptionsScreen2', function(e) {
        $(this).parents('.radio').siblings('.imgPoint').show();
        $(this).parents('.radio').siblings('.imgPoint').attr('src', defaultImg);
        $(this).parents('.radio').siblings('.imgPoint').attr('data-img-key', -1);
    });
    $(".modal").on('click', '#radioOptionsLogo2', function(e) {
        $(this).parents('.radio').siblings('.imgPoint').show();
        $(this).parents('.radio').siblings('.imgPoint').attr('src', defaultLogo);
        $(this).parents('.radio').siblings('.imgPoint').attr('data-img-key', 0);
    });
    $(".modal").on('click', '#radioOptionsTips2', function(e) {
        $(this).parents('.radio').siblings('.imgPoint').show();
        $(this).parents('.radio').siblings('.imgPoint').attr('src', defaultOpenAlert);
        $(this).parents('.radio').siblings('.imgPoint').attr('data-img-key', -1);
    });

    //  不使用图标
    $(".modal").on('click', '#radioOptionsScreen1,#radioOptionsLogo1,#radioOptionsTips1', function(e) {
        $(this).parents('.radio').siblings('.imgPoint').hide();
        $(this).parents('.radio').siblings('.imgPoint').attr('src', '');
    });

    //   不使用遮罩
    $("#skyModal").on('click', '.label_radio input[value=0]', function(e) {
        $(this).parents(".label_radio").siblings('.use_around').hide();
    });
    //   使用微动景遮罩
    $("#skyModal").on('click', '.label_radio input[value=-1]', function(e) {
        var maskImgBox = $(this).parents(".label_radio").siblings('.use_around');
        maskImgBox.show();
        maskImgBox.find('img').attr('src',defaultMask);
        maskImgBox.find('img').attr('mask-size','100');
        maskImgBox.find('.imgTitle').html("微动景补地");
    });
    //  系统图标确认
    $("#materialDefaultBox").on('click', '#btnMediaIntImg', function(e) {
        var oTarget = $(".voiceNow");
        var aimImgSrc = $(".chooseImg").children('img').attr('src');
        var aimImgId = $(".chooseImg").children('img').attr('imgid');
        var aimImgType = $(".chooseImg").children('img').attr('type');
        var LinkImg = oTarget.parent(".img-right-a").siblings('img.imgPoint');
        if(LinkImg.length == 1 && $(".chooseImg").length != 0){
            LinkImg.attr('src', aimImgSrc);
            LinkImg.attr('data-img-key', aimImgId);
            LinkImg.attr('type', aimImgType);
        }
        $('#materialDefaultBox').modal('hide');
        $(".chooseImg").removeClass('chooseImg');
    });

    //从素材库上传分类选择
    $('body').on('click','div.modal#choose_panoramic_material a',function(){
        var content_obj = $(this).parents('div.modal-content');
        $.ajax({
            url: $(this).attr('href'),
            data: [],
            success: function(res){
                content_obj.html(res);
                selectMaterial();
            }
        });
        return false;
    });

    //      背景音乐modal
    $("#bgMusicModal").on('show.bs.modal', function(e) {
        console.log("bgMusicModal");
        /* Act on the event */
    });

    $("#bgMusicModal").on('click', '.radio input', function(e) {
        var oIndex = $(this).val();
        $("#voice_content>div").eq(oIndex-1).show().siblings().hide();
    });

    //      播放背景音乐
    $("#bgMusicModal").on('click', '.playVoice', function(e) {
        if($(this).is(".played") == false){
            $(this).addClass('played').html("暂停");
            $(this).siblings('audio')[0].play();
        }else{
            $(this).removeClass('played').html("试听");
            $(this).siblings('audio')[0].pause();
        }
        e.preventDefault();
    })

    //      移除背景音乐
    $("#bgMusicModal").on('click', '.removeVoice', function(e) {
        $(this).siblings('audio').attr('src', '');
        $(this).siblings('.playVoice').removeClass('played').html("试听");
        $(this).parents('.row').find('.voice_title').html("还未选择音乐");
        $(this).parent(".btn-group").children('button').attr('disabled', 'disabled');
        e.preventDefault();
    })


    //      语音解说start
    $("#voiceModal").on('click', '.radio input', function(e) {
        var oIndex = $(this).val();
        $("#explain_content>div").eq(oIndex-1).show().siblings().hide();
    });

    //      播放语音解说
    $("#voiceModal").on('click', '.playVoice', function(e) {
        if($(this).is(".played") == false){
            $(this).addClass('played').html("暂停");
            $(this).siblings('audio')[0].play();
        }else{
            $(this).removeClass('played').html("试听");
            $(this).siblings('audio')[0].pause();
        }
        e.preventDefault();
    })

    //      移除语音解说
    $("#voiceModal").on('click', '.removeVoice', function(e) {
        $(this).siblings('audio').attr('src', '');
        $(this).siblings('.playVoice').removeClass('played').html("试听");
        $(this).parents('.row').find('.voice_title').html("还未选择音乐");
        $(this).parent(".btn-group").children('button').attr('disabled', 'disabled');
        e.preventDefault();
    })

    //      添加链接、电话与导航
    $("#myLinkModal").on('click', '#addLinkRow', function(e) {
        var addRowCount = $("#myLinkModal").find(".link-row").length;
        var addBox = $("#myLinkModal").find('.modal-body');
        if(addRowCount <= 2){
            var oAddStr = '<div class="row link-row" type="1"><div class="col-md-3 clearfix">'
                    +'<img class="imgPoint" src="'+defaultIcon+'" data-img-key="-1"><div class="img-right-a">'
                    +'<a data-toggle="modal" data-target="#materialDefaultBox">系统图标</a>'
                    +'<a data-toggle="modal" data-target="#materialBox">媒体库图标</a>'
                    +'</div></div><div class="col-md-3"><input type="text" class="form-control" placeholder="输入名称" maxlength="20">'
                    +'</div><div class="col-md-4"><input type="text" class="form-control" placeholder="输入链接地址或电话" maxlength="100"></div><div class="col-md-2">'
                    +'<button class="btn deleteLinkRow">删除</button></div></div>';
                    addBox.append(oAddStr);
                }else{
                    taagoo_obj.alert("可添加数量已达上限");
                }
        e.preventDefault();
    });

    $("#myLinkModal").on('click', '#addMapRow', function(e) {
        var addRowCount = $("#myLinkModal").find(".link-row").length;
        var addBox = $("#myLinkModal").find('.modal-body');
        if(addRowCount <= 2){
            var oAddStr = '<div class="row link-row" type="3"><div class="col-md-3 clearfix">'
                    +'<img class="imgPoint" src="'+defaultIcon+'" data-img-key="-1"><div class="img-right-a">'
                    +'<a data-toggle="modal" data-target="#materialDefaultBox">系统图标</a>'
                    +'<a data-toggle="modal" data-target="#materialBox">媒体库图标</a></div></div>'
                    +'<div class="col-md-3"><input type="text" class="form-control" placeholder="输入名称" maxlength="20"></div><div class="col-md-4">'
                    +'<span class="text-muted">未设置导航终点</span> <a class="map-mark-a" data-toggle="modal" data-target="#pano_upload_dialog" href="javascript:;" key="'+addRowCount+'">设置</a> <input type="hidden" name="address" id="address'+addRowCount+'" > <input type="hidden" name="lat" id="lat'+addRowCount+'" > <input type="hidden" name="lng" id="lng'+addRowCount+'" ></div>'
                    +'<div class="col-md-2"><button class="btn deleteLinkRow">删除</button></div></div>';
                    addBox.append(oAddStr);
                }else{
                    taagoo_obj.alert("可添加数量已达上限");
                }
        e.preventDefault();
    });

    $("#myLinkModal").on('click', '.deleteLinkRow', function(event) {
        $(this).parents('.link-row').remove();
        event.preventDefault();
        /* Act on the event */
    });


    //      遮罩切换
    $("#skyModal").on('click', '.allSingle input', function(e) {
        var oIndex = $(this).val();
        $(".sky_content>div").eq(oIndex-1).show().siblings().hide();
    });

    //      可视化编辑
    $("#oPanoSetting").click(function() {
        // console.log(viewPano);
        $("#panoExset").modal('show');
    });
    $("#panoExset").on('show.bs.modal', function(event) {
        var settings={'onstart':'js(eyes_obj.init());js(special_effect_obj.init());js(left_group_obj.init());js(sand_table_obj.init());'};
        var oxml = {swf:"/pano_player/tour.swf", xml:"/user-panoramic/adv-edit-xml.html?id="+panoramic_id, id:"EditPano", target:"opanoSet", html5:"prefer", mobilescale:1.0, passQueryParameters:true,consolelog:true,vars:settings,webglsettings:{preserveDrawingBuffer:true}};
        embedpano(oxml);
        $("#panoExset .right-eye-btn").click();
    });
    //      关闭编辑
    $("#panoExset").on('hide.bs.modal', function(event) {
        removepano("EditPano");
    });

    //      背景音乐设置
    $("#oMusic").click(function() {
        $("#bgMusicModal").modal('show');
    });

    //      语音解说设置
    $("#oVoice").click(function() {
        $("#voiceModal").modal('show');
    });

    //      链接、电话与导航
    $("#oLink").click(function() {
        $("#myLinkModal").modal('show');
    });

    //      天空/地面遮罩
    $("#oSky").click(function() {
        $("#skyModal").modal('show');
    });

    //      开场提示
    $("#oOpen").click(function() {
        $("#openModal").modal('show');
    });

    //      自定义LOGO
    $("#oLogo").click(function() {
        $("#logoModal").modal('show');
    });

    //点击保存
    $('button.advanced-setting-save-btn').click(function(){
        //重组分组和场景关系
        left_group_obj.buildSceneGroup();
        sand_table_obj.buildData();
        $.ajax({
            url: advanced_save_url,
            type: 'post',
            dataType: 'json',
            data: panoDataObj,
            success : function(res) {
                if(res.status==1){
                    taagoo_obj.alert('保存成功!',function () {

                    });
                }else{
                    taagoo_obj.alert('保存失败，请重试!',function () {

                    });
                }
            },
            error:function () {
                taagoo_obj.alert('保存失败，请重试!');
            }
        });
    });

    //      预览动景 ViewPanoBtn
    $("#panoPreview").on('show.bs.modal', function(event) {
        var settings={};
        ViewStatr(settings);
        panoRightBtn();
        var oxml = {swf:"/pano_player/tour.swf", xml:"/panoramic/play-xml.html?id="+panoramic_id, id:"ViewPano", target:"opanoView", html5:"prefer", mobilescale:1.0, passQueryParameters:true,consolelog:true,vars:settings};
        embedpano(oxml);
        tg_krpano_api.obj  = document.getElementById("ViewPano");
        eachDataHide();
    });
    

    $("#panoPreview").on('hide.bs.modal', function(event) {
        removepano("ViewPano")
    });

    //      视频热点
    $("#videoMater").on('show.bs.modal', function(e) {
        $.ajax({
            url: '/user-panoramic-material/all-list.html?panoramic_id='+panoDataObj.id,
            type: 'post',
            dataType: 'json',
            data: {param1: 'value1'},
            success: function(data) {
                if(data.status == 1){
                    $("#object_list").empty();
                    var data = data.data["video"];
                    var str = "";
                    for (var i in data) {
                        str += '<div class="col-md-3" data-name="'+data[i].name+'" data-id="'+data[i].id+'" data-location="'+data[i].path+'">'
                                +'<div class="card"><div class="media-wrapper" style="height: 130px;padding-top: 26px;">'
                                +'<img src="/images/video-play.png"></div><div class="card-heading"><span class="card-scene-name">'
                                +data[i].name+'</span></div></div> </div>'
                    }
                    $("#object_list").append(str);
                }
            }
        })
    });

    //保存
    $('#save-pano').click(function() {
        getPanoData();
        var _this = $(this);
        _this.attr('disabled', 'disabled');
        _this.children('span.text').html('保存中...');
        var sort_list = $('#sort-list');
        $.ajax({
            type: "POST",
            url: $('#w0').attr('action'),
            dataType: "json",
            data: panoDataObj,
            success: function(data) {
                if (!isNaN(data['status']) && parseInt(data['status']) == 1) {
                    taagoo_obj.alert('操作成功!');
                    _this.removeAttr('disabled');
                    _this.children('span.text').html('保存');
                    var changeData = data.data.changeData;
                    for (var scene_id in changeData){
                        $('div[data-scene-id="'+scene_id+'"]').attr('data-key',changeData[scene_id]);
                        sort_list.find('li[data-scene-id='+scene_id+']').attr('data-key',changeData[scene_id]);
                    }
                    panoDataObj = data.data.panoData;
                    panoDataObj.id = panoramic_id;
                } else {
                    taagoo_obj.alert('操作失败，' + data['msg'] + '！');
                    _this.removeAttr('disabled');
                    _this.children('span.text').html('保存');
                }
            },
            error: function() {
                taagoo_obj.alert('网络错误或超时，请稍后再试！');
                _this.removeAttr('disabled');
                _this.children('span.text').html('保存');
            }
        });
    });
    // 删除单个场景
    $("body").on('click', 'li.li div.del-hover', function(event) {
        var scene_id = $(this).parents("li").attr('data-scene-id');
        var scene_obj = $('li[data-scene-id="' + scene_id + '"]');
        delMaterial(scene_obj,$('#choose_panoramic_material div.row div.col-sm-4[data-key='+scene_id+']'));
        //$('tr[data-scene-id="' + delData[i] + '"]').remove();
    });
    // 模态框选中
    $('body').on('click', '#choose_panoramic_material div.row div.col-sm-4', function() {
        var select_span_obj = $(this).find('span.select_material');
        var select_li_obj = $('ul#sort-list li.li[data-scene-id='+$(this).attr('data-id')+']');
        if (select_li_obj.length != 0) {
            delMaterial(select_li_obj,select_span_obj);
        } else {
            $(this).append('<span class="select_material"></span>');
            addMaterial($(this));
        }
    });

    // 新增场景
    function addMaterial(_this){
        var result = {
            id : _this.attr('data-id')
        };
        var scene_name = scene_fix+result.id;
        var liIndex = $('#sort-list li.li').length;
        // 在js对象中增加
        var angle_of_view = {
            "sceneName": scene_fix+result.id,
            "hlookat": 0,
            "vlookat": 0,
            "fov": 95,
            "fovmin": 5,
            "fovmax": 120,
            "vlookatmin": -90,
            "vlookatmax": 90,
            "keepView": 0,
            "hlookatmin": -180,
            "hlookatmax": 180
        };
        var scene_group = {
            "sceneName": scene_name,
            "imgPath": _this.attr('thumb'),
            "sceneTitle": _this.attr('title')
        };
        var effect = {
            "sceneName": scene_name,
            "effectId": 0
        };
        var sky_land = {
            sceneID : scene_name,
            size : 100,
            type : 1,
            useShade : 0
        };
        panoDataObj.angle_of_view.push(angle_of_view);
        panoDataObj.scene_group.sceneGroups[0].scenes.push(scene_group);
        panoDataObj.special_effects.effectSettings.push(effect);
        panoDataObj.hotspot[scene_name] = [];
        if(panoDataObj.sky_land_shade.isWhole == 2){
            panoDataObj.sky_land_shade.shadeSetting.push(sky_land);
        }

        //添加场景
        var str = '<li class="li" data-scene-id="' + _this.attr('data-id') + '" data-key="'+result.id+'">' +
            '<div class="del-hover" title="移除单个场景">删除</div>' +
            '<div class="pano-thumb">' +
            '<img src="' + _this.attr('thumb') + '" alt="' + _this.attr('title') + '">' +
            '</div>' +
            '<div class="name-box clearfix">' +
            '<span class="pano-name">' + _this.attr('title') + '</span>' +
            '<input class="pano-rename" type="text" value="' + _this.attr('title') + '">' +
            '<button class="rename-btn" type="button" data-toggle="modal" data-target="#pano_rename"><i class="icon-remove-circle"></i>重命名</button>' +
            '</div>' +
            '</li>';
        $('#sort-list').append(str);
        // 添加在背景音乐
        var audiostr = '<div class="row" data-scene-id="' + _this.attr('data-id') + '" data-key="'+result.id+'">'+
            '<div class="col-md-4"><img class="voice-img" src="' + _this.attr('thumb') + '">'+
            '<div class="voice-scene-name">' + _this.attr('title') + '</div>'+
            '</div>'+
            '<div class="col-md-2">'+
            '<label class="voice_title">还未选择音乐</label>'+
            '</div>'+
            '<a data-toggle="modal" data-target="#materialBox" class="icon_voice">从媒体库选择音乐</a>'+
            '<div class="col-md-2">'+
            '<div class="btn-group">'+
            '<button class="btn voice-music-play playVoice" disabled="disabled" type="button">试听</button>'+
            '<button class="btn removeVoice" disabled="disabled" type="button">移除</button>'+
            '<audio src="" style="display:none" preload="none" data-audio-key="0"></audio>'+
            '</div>'+
            '</div>'+
            '</div>';
        $('#audioList').append(audiostr);
        // 添加在解说
        var commentarystr = '<div class="row" data-scene-id="' + _this.attr('data-id') + '" data-key="'+result.id+'">'+
            '<div class="col-md-4"><img class="voice-img" src="' + _this.attr('thumb') + '">'+
            '<div class="voice-scene-name">' + _this.attr('title') + '</div>'+
            '</div>'+
            '<div class="col-md-2">'+
            '<label class="voice_title">还未选择语音</label>'+
            '</div>'+
            '<a data-toggle="modal" data-target="#materialBox" class="icon_voice">从媒体库选择音乐</a>'+
            '<div class="col-md-2">'+
            '<div class="btn-group">'+
            '<button class="btn voice-music-play playVoice" disabled="disabled" type="button">试听</button>'+
            '<button class="btn removeVoice" disabled="disabled" type="button">移除</button>'+
            '<audio src="" style="display:none" preload="none" data-audio-key="0"></audio>'+
            '</div>'+
            '</div>'+
            '</div>';
        $('#commentaryList').append(commentarystr);
        // 遮罩
        var mask_str = '<div class="row" data-scene-id="' + _this.attr('data-id') + '" data-key="'+result.id+'">'+
            '<div class="col-md-3">'+
            '<div class="singImg"><img src="' + _this.attr('thumb') + '">'+
            '<label class="imgScene">' + _this.attr('title') + '</label>'+
            '</div>'+
            '</div>'+
            '<div class="label_radio">'+
            '<div class="col-md-4" >'+
            '<div class="radio">'+
            '<label>'+
            '<input type="radio" name="radioUse'+(liIndex+1)+'" value="0" checked="checked"> 不使用遮罩</label>'+
            '</div>'+
            '<div class="radio">'+
            '<label>'+
            '<input type="radio" name="radioUse'+(liIndex+1)+'" value="-1">使用微动景遮罩</label>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="col-md-2"><a data-toggle="modal" data-target="#materialBox" class="icon_media">从媒体库选择图片</a></div>'+
            '<div class="use_around clearfix" style="display:none;">'+
            '<div class="col-md-1" style="padding: 0;"><img style="height:61px;width:61px" src="" data-img-key="0"></div>'+
            '<div class="col-md-2 clearfix" style="height:61px;padding: 0;">'+
            '<div class="imgTitle" name="oneRowShadeName">微动景补地</div>'+
            '<div class="radio" style="margin:0;height:30px">'+
            '<label style="height:30px;line-height:30px">'+
            '<input type="radio" name="radioLocation'+(liIndex+1)+'" value="2" style="height:25px;">天空</label>'+
            '<label style="height:30px;line-height:30px">'+
            '<input type="radio" name="radioLocation'+(liIndex+1)+'" value="1" style="height:25px;" checked="checked">地面</label>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>';
        $("#oneDiv").append(mask_str);
        $('#panoNum').html('共'+liIndex+'个全景');
        panoDataObj.scene_list = sceneList();

    }
    // 删除场景
    function delMaterial(_this,span_obj){
        if ($('ul#sort-list li.li').length == 1) {
            taagoo_obj.alert('动景组至少包含一个场景！');
            return false;
        } else {
            span_obj.remove();

            var divObj = $('div[data-scene-id="'+_this.attr('data-scene-id')+'"]');
             /*panoDataObj.angle_of_view.splice(divObj.index(),1);*/
            for(x in panoDataObj.scene_group.sceneGroups){
                for (i in panoDataObj.scene_group.sceneGroups[x].scenes){
                    if(panoDataObj.scene_group.sceneGroups[x].scenes[i].sceneName == scene_fix+_this.attr('data-scene-id')){
                        panoDataObj.scene_group.sceneGroups[x].scenes.splice(i,1);
                    }
                }
            }
            // 删除场景
            _this.remove();
            divObj.remove();
            $('#panoNum').html('共'+$('#sort-list li.li').length+'个全景');
            panoDataObj.scene_list = sceneList();
        }
    }

    // 获取背景音乐
    $(document).on('click','div#bgMusicModal .btn-primary',function () {
        getBgMusic();
    });

    //语音解说
    $(document).on('click','div#voiceModal .btn-primary',function () {
        getSpeechExplain();
    });

    //链接与导航
    $(document).on('click','#myLinkModal .modal-footer .btn-primary',function () {
        var bool = true;
        $('div#myLinkModal input').each(function () {
            if($.trim($(this).val()) == ''){
                bool = false;
            }
        });
        if(bool){
            customIcon();
            $('.closeModal').click();
        }else{
            taagoo_obj.alert('请填写必要信息');
        }

    });

    // 获取遮罩信息
    $(document).on('click','div#skyModal .btn-primary',function () {
        skyLandShade()
    });

    // 开场提示
    $(document).on('click','#openModal .btn-primary',function () {
        openAlert();
    });

    //自定义logo
    $(document).on('click','div#logoModal .btn-primary',function () {
        customLogo();
    });

    //启动画面
    $(document).on('click','div#loadingModal .btn-primary',function () {
        loadingImg();
    });
    
    $(document).on('loaded.bs.modal','#choose_panoramic_material',function(){
        selectMaterial();
    });


    // 自定义图标的地图
    $('body').on('shown.bs.modal', '#pano_upload_dialog', function (event) {
        var sort = $(event.relatedTarget).attr('key');
        var type = $(event.relatedTarget).attr('type');
        var mapOpt;
        if(sort){
            mapOpt = {
                map_box: 'mapContent',
                lat : $('#lat'+sort).val(),
                lng : $('#lng'+sort).val(),
                address : $('#address'+sort).val(),
                confirmFunc: function (gecoInfo) {
                    $('#address'+sort).val(gecoInfo.address?gecoInfo.address:(gecoInfo.point.lng+','+gecoInfo.point.lat));
                    $('#lng'+sort).val(gecoInfo.point.lng);
                    $('#lat'+sort).val(gecoInfo.point.lat);
                    $('#pano_upload_dialog').modal('hide');
                    $('#myLinkModal div.link-row:eq('+sort+')').find('span.text-muted').html('已设置导航终点');
                }
            }
        }else{
            mapOpt = {
                map_box: 'mapContent',
                lat : $('#pano_lat').val(),
                lng : $('#pano_lng').val(),
                address : $('#pano_address').val(),
                confirmFunc: function (gecoInfo) {
                    $('#pano_address').val(gecoInfo.address?gecoInfo.address:(gecoInfo.point.lng+','+gecoInfo.point.lat));
                    $('#pano_lng').val(gecoInfo.point.lng);
                    $('#pano_lat').val(gecoInfo.point.lat);
                    $('#pano_upload_dialog').modal('hide');
                }
            }
        }
        if(type == 'show'){
            mapOpt.showSelectInfoWindow = false;
            mapOpt.showSearchMarker = false;
        }
        getBaiduMap(mapOpt);
    });
});
function selectMaterial(){
    $('ul#sort-list li.li').each(function () {
        $('div#choose_panoramic_material div.col-sm-4[data-id='+$(this).attr('data-scene-id')+']').append('<span class="select_material"></span>');
    });
}

function eachDataHide() {
	var parmes={
		"showlogo":"#logoImg",            // 隐藏LOGO
		"showpraise":"#praisebtn",        // 隐藏点赞图标 showpraise
		"showprofile":"#profilebtn",      //  隐藏简介 showprofile
		"showshare":"#sharebtn",          //  showshare
		"showuser":"#authorDiv",          // 隐藏作者名
		"showviewnum":"#viewnumDiv", //  隐藏人气
		"showvrglasses":".btn_vrmode", //     showvrglasses隐藏VR眼镜
		"comment":"#talkbtn",              // 说一说
		// "footmark":"#footmarkbtn",       // 足迹
		// "gyro":".btn_gyro_off",
		// "thumbs_opened":"#viewnumbtn"
	}
	for(var j in parmes) {
		if(panoDataObj[j] <1) {
			$(parmes[j]).show();
		}else{
                            $(parmes[j]).hide();
                    }
	}
}

//隐藏页面多余数据或者效果，比如点击沙盘需要取消特效
function resetAdvSettingShowData(){
    $(".square_eye,.timer").hide();
    var panoObj = document.getElementById("EditPano");
    panoObj.call('removeplugin(snow)');
    panoObj.call('set_hotspot_visible(false)');
}

//可视化编辑切换场景调用
function initAdvViewSetting(sceneName){
    //当前打开的为特效窗口
    if($('.pano-setting-container button.right-special-effect-btn').hasClass('setting-btn-clicked')){
        special_effect_obj.resetScene();
    }else if($('.pano-setting-container button.right-hot-btn').hasClass('setting-btn-clicked')){
        hotspotInd.addAllSpot();
    }else if($('.pano-setting-container button.right-sand-table-btn').hasClass('setting-btn-clicked')){
        sand_table_obj.resetScene();
    }else{
        eyes_obj.resetScene(sceneName)
    }
}