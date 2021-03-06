var material = {
    getMaterial_url: '',
    pano_url: '',
    panoramic_id: '',
    getThumb_url : '',
    online_url : '',
    saveScenic_url : '',
    pub_onlining:false,
    map : null,
    scenic_data : {
        title : '',
        start_rule : 1,
        scenic_type : 0,
        scenic_level : 0,
        panoramic_id : 0,
        panoramicData : [],
        lng : '',
        lat : '',
        introduce : '',
        drawing_open : 0,
        drawingData : '',
        drawing : 0,
        created_at : 0,
        audio_id : 0,
        audioData : [],
        address : [],
        address_info : '',
        thumb : 0
    },
    getMaterial: function (_listObj) {
        $.ajax({
            type: 'post',
            url: material.getMaterial_url,
            data: {
                shop_id: material.shop_id
            },
            dataType: 'json',
            success: function (result) {
                if (result.status == 1) {
                    $('#scenic-play-url').val(material.pano_url);
                    var scenic_data= result.data;
                    material.scenic_data = scenic_data;
                    $('#title').val(scenic_data.title);
                    $('#level').val(scenic_data.scenic_level);
                    $('#type').val(scenic_data.scenic_type);
                    $('#introduce').val(scenic_data.introduce);
                    if(scenic_data.start_rule == 2){
                        $('#just').attr('checked','checked');
                    }else if(scenic_data.start_rule == 3){
                        $('#back').attr('checked','checked');
                    }
                    var length = scenic_data.panoramicData.length;
                    // 动景
                    if (scenic_data.panoramic_id != 0 && length) {
                        material.panoramic_id = scenic_data.panoramic_id;
                        //$('#pano_url').val(material.pano_url + material.shop_id + '&merchant_pid=' + material.merchant_pid);
                        //$('.mui-switch').removeAttr('disabled');
                        var scene_data = scenic_data.panoramicData;
                        var str = '';
                        for (var i in scene_data) {
                            str += '<li scene-id="' + scene_data[i].scene_id + '" id="scene_' + scene_data[i].scene_id + '">' +
                                '<img src="' + scene_data[i].thumb + '"/>' +
                                '<div class="del-btn-box">' +
                                (scenic_data.thumb == scene_data[i].scene_id ?
                                    '<button type="button" class="max-hover-btn">默认展示</button>':
                                    '<button class="pull-left" type="button">设为默认</button><button class="pull-right" type="button">删除</button>') +
                                '</div>' +
                                '<p class="text-over vr-set-title">' + scene_data[i].title + '</p>' +
                                '<button class="rename-btn" data-toggle="modal" data-target="#rename-modal" ><img src="/images/rename-btn.png"/>重命名</button>' +
                                '<div class="progress-box" '+ (scene_data[i].status != 7 && scene_data[i].status != 5 ? 'style="display:none;"' : '')+ '>'+
                                '<div class="progress-bg">'+
                                '<div class="progress-left">'+
                                '<div class="circleProgress leftcircle"></div>'+
                                '</div>'+
                                '<div class="progress-right">'+
                                '<div class="circleProgress rightcircle"></div>'+
                                '</div>'+
                                '<p class="pro-number">0%</p>'+
                                '</div>'+
                                '</div>'+
                                '</li>';
                        }
                        _listObj.prepend(str);
                    }
                    // 音频
                    if(scenic_data.audioData){
                        var str = '';
                        for(var i in scenic_data.audioData){
                            str += '<li audio-id="'+scenic_data.audioData[i].id+'" id="auido_' + scenic_data.audioData[i].id + '">' +
                                '<p class="text-over">'+scenic_data.audioData[i].title+'</p>'+
                                '<div class="gress-box">'+
                                '<div style="width: 10%;">'+
                                '</div>'+
                                '</div>'+
                                '<div class="music-btn-grp">'+
                                '<button class="set-default">'+(scenic_data.audioData[i].id == scenic_data.audio_id ? '默认' : '设为默认')+'</button>'+
                                '<button class="delect-btn"></button>'+
                                '<button class="edit-btn"></button>'+
                                '</div>'+
                                '</li>';
                        }
                        $('#audio-list').html(str);
                    }
                    // 手绘图
                    $('#drawing-open').attr('checked',(scenic_data.drawing_open == 1 ? true : false));
                    if(scenic_data.drawingData){
                        var str = '';
                        for(var i in scenic_data.drawingData){
                            str += '<li drawing-id="'+scenic_data.drawingData[i].id+'" id="drawing_'+scenic_data.drawingData[i].id+'">'+
                                '<p class="text-over">'+scenic_data.drawingData[i].title+'</p>'+
                                '<div class="gress-box">'+
                                '<div style="width: 10%;">'+
                                '</div>'+
                                '</div>'+
                                '<div class="music-btn-grp">'+
                                '<button class="set-default">'+(scenic_data.drawingData[i].id == scenic_data.drawing ? '默认' : '设为默认')+'</button>'+
                                '<button class="delect-btn"></button>'+
                                '<button class="edit-btn"></button>'+
                                '</div>'+
                                '</li>';
                        }
                        $('#drawing-list').html(str);
                    }
                    // 地址
                    $("#citySelect").citySelect({
                        nodata: "none",
                        required: false,
                        prov: scenic_data.address[0],
                        city:scenic_data.address[1],
                        dist:scenic_data.address[2]
                    });
                    $('#address-info').val(scenic_data.address_info);
                    // 地图加载
                    if(scenic_data.lng && scenic_data.lat){
                        material.map.setMarket([scenic_data.lng, scenic_data.lat]);
                        material.map.obj.setCenter([scenic_data.lng, scenic_data.lat]);
                        material.map.obj.setZoom(13);
                    }

                }
            }
        });
    },
    checkPanoramicProcess: function (ws_server, user_id) {
        if (!ws_server || !user_id) {
            return false;
        }
        if (window.WebSocket || window.MozWebSocket) {
            var ws = new WebSocket(ws_server);
            ws.onopen = function (evt) {
                ws.send('{"cmd":"websocket_cutpano_process","data":{"user_id":' + user_id + '}}');
            };
            ws.onclose = function (evt) {

            };
            ws.onmessage = function (evt) {
                var data = eval("(" + evt.data + ")");
                switch (data.cmd) {
                    case 'websocket_cutpano_material_process':
                        var arr = data.data;
                        if (arr) {
                            for (var id in arr) {
                                var thisObj = $('#scene_'+id);

                                businessCircle.progress(thisObj.attr('id'), arr[id]);
                                if (arr[id] == 100) {
                                    // 请求缩略图 去掉进度条
                                    thisObj.find('.progress-box').hide();
                                    $.ajax({
                                        type : 'post',
                                        url : material.getThumb_url,
                                        data : {scene_id : thisObj.attr('scene-id')},
                                        success : function (result) {
                                            if(result.status == 1){
                                                thisObj.children('img').attr('src',result.data);
                                            }
                                        }
                                    });

                                }
                            }
                        }
                        break;
                    default:
                        break;
                }
            };
            ws.onerror = function (evt) {

            };
        }
    },
    saveScenic : function () {
        $.ajax({
            type : 'post',
            url : material.saveScenic_url,
            data : material.scenic_data,
            dataType : 'json',
            success : function (result) {
                if(result.status == 1){
                    $('#scenic-play-url').val(material.pano_url);
                    location.href = material.scenic_index;
                    alert('保存成功');
                }else{
                    alert(result.msg);
                }
            },
            error : function () {
                alert('保存失败');
            }
        });
    }
};



var materialSpotPano = {
    save_scenic_spot_url:'',
    getMaterial_url: '',
    pano_url: '',
    panoramic_id: '',
    getThumb_url : '',
    online_url : '',
    pub_onlining:false,
    scenic_data : {
        title : '',
        start_rule : 1,
        scenic_type : 0,
        scenic_level : 0,
        panoramic_id : 0,
        panoramicData : [],
        lng : '',
        lat : '',
        introduce : '',
        drawing_open : 0,
        drawingData : '',
        drawing : 0,
        created_at : 0,
        audio_id : 0,
        audioData : [],
        address : [],
        address_info : ''
    },
    getMaterial: function (_listObj) {
        $.ajax({
            type: 'post',
            url: material.getMaterial_url,
            data: {
                shop_id: material.shop_id
            },
            dataType: 'json',
            success: function (result) {
                if (result.status == 1) {
                    var scenic_data= result.data;
                    material.scenic_data = scenic_data;
                    $('#title').val(scenic_data.title);
                    $('#level').val(scenic_data.scenic_level);
                    $('#type').val(scenic_data.scenic_type);
                    $('#introduce').val(scenic_data.introduce);
                    if(scenic_data.start_rule == 2){
                        $('#just').attr('checked','checked');
                    }else if(scenic_data.start_rule == 3){
                        $('#back').attr('checked','checked');
                    }
                    var length = scenic_data.panoramicData.length;
                    // 动景
                    if (scenic_data.panoramic_id != 0 && length) {
                        material.panoramic_id = scenic_data.panoramic_id;
                        //$('#pano_url').val(material.pano_url + material.shop_id + '&merchant_pid=' + material.merchant_pid);
                        //$('.mui-switch').removeAttr('disabled');
                        var scene_data = scenic_data.panoramicData;
                        var str = '';
                        for (var i in scene_data) {
                            str += '<li scene-id="' + scene_data[i].scene_id + '" id="scene_' + scene_data[i].scene_id + '">' +
                                '<img src="' + scene_data[i].thumb + '"/>' +
                                '<div class="del-btn-box">' +
                                '<button class="pull-left set-default-spot" type="button" >设为默认</button>'+
                                '<button class="pull-right" type="button">删除</button>' +
                                '</div>' +
                                '<p class="text-over vr-set-title">' + scene_data[i].title + '</p>' +
                                '<button class="rename-btn" data-toggle="modal" data-target="#rename-modal" ><img src="/images/rename-btn.png"/>重命名</button>' +
                                '<div class="progress-box" '+ (scene_data[i].status != 7 && scene_data[i].status != 5 ? 'style="display:none;"' : '')+ '>'+
                                '<div class="progress-bg">'+
                                '<div class="progress-left">'+
                                '<div class="circleProgress leftcircle"></div>'+
                                '</div>'+
                                '<div class="progress-right">'+
                                '<div class="circleProgress rightcircle"></div>'+
                                '</div>'+
                                '<p class="pro-number">0%</p>'+
                                '</div>'+
                                '</div>'+
                                '</li>';
                        }
                        _listObj.prepend(str);
                    }
                    // 音频
                    if(scenic_data.audioData){
                        var str = '';
                        for(var i in scenic_data.audioData){
                            str += '<li audio-id="'+scenic_data.audioData[i].id+'" id="auido_' + scenic_data.audioData[i].id + '">' +
                                '<p class="text-over">'+scenic_data.audioData[i].title+'</p>'+
                                '<div class="gress-box">'+
                                '<div style="width: 10%;">'+
                                '</div>'+
                                '</div>'+
                                '<div class="music-btn-grp">'+
                                '<button class="set-default">'+(scenic_data.audioData[i].id == scenic_data.audio_id ? '默认' : '设为默认')+'</button>'+
                                '<button class="delect-btn"></button>'+
                                '<button class="edit-btn"></button>'+
                                '</div>'+
                                '</li>';
                        }
                        $('#audio-list').html(str);
                    }
                    // 手绘图
                    $('#drawing-open').attr('checked',(scenic_data.drawing_open == 1 ? true : false));
                    if(scenic_data.drawingData){
                        var str = '';
                        for(var i in scenic_data.drawingData){
                            str += '<li drawing-id="'+scenic_data.drawingData[i].id+'" id="drawing_'+scenic_data.drawingData[i].id+'">'+
                                '<p class="text-over">'+scenic_data.drawingData[i].title+'</p>'+
                                '<div class="gress-box">'+
                                '<div style="width: 10%;">'+
                                '</div>'+
                                '</div>'+
                                '<div class="music-btn-grp">'+
                                '<button class="set-default">'+(scenic_data.drawingData[i].id == scenic_data.drawing ? '默认' : '设为默认')+'</button>'+
                                '<button class="delect-btn"></button>'+
                                '<button class="edit-btn"></button>'+
                                '</div>'+
                                '</li>';
                        }
                        $('#drawing-list').html(str);
                    }
                    // 地址
                    $("#citySelect").citySelect({
                        nodata: "none",
                        required: false,
                        prov: scenic_data.address[0],
                        city:scenic_data.address[1],
                        dist:scenic_data.address[2]
                    });
                    $('#address-info').val(scenic_data.address_info);
                }
            }
        });
    },
    checkPanoramicProcess: function (ws_server, user_id) {
        if (!ws_server || !user_id) {
            return false;
        }
        if (window.WebSocket || window.MozWebSocket) {
            var ws = new WebSocket(ws_server);
            ws.onopen = function (evt) {
                ws.send('{"cmd":"websocket_cutpano_process","data":{"user_id":' + user_id + '}}');
            };
            ws.onclose = function (evt) {

            };
            ws.onmessage = function (evt) {
                var data = eval("(" + evt.data + ")");
                switch (data.cmd) {
                    case 'websocket_cutpano_material_process':
                        var arr = data.data;
                        if (arr) {
                            for (var id in arr) {
                                var thisObj = $('.add-scene-list li[scene-id='+id+']');

                                businessCircle.progress(thisObj.attr('id'), arr[id]);
                                if (arr[id] == 100) {
                                    // 请求缩略图 去掉进度条
                                    thisObj.find('.progress-box').hide();
                                    $.ajax({
                                        type : 'post',
                                        url : materialSpotPano.getThumb_url,
                                        data : {scene_id : thisObj.attr('scene-id')},
                                        success : function (result) {
                                            if(result.status == 1){
                                                thisObj.children('img').attr('src',result.data);
                                            }
                                        }
                                    });

                                }
                            }
                        }
                        break;
                    default:
                        break;
                }
            };
            ws.onerror = function (evt) {

            };
        }
    },
    error:function(msg,obj){
        if(obj){
            obj.focus();
        }
        alert(msg);
    },

    saveScenic : function (thisBtn) {
        var dataObj = {
            id:$('#scenic-spot-id').val(),
            grade:$('#grade').val(),
            title:'',
            audioList:[],
            sceneList:[],
            introduce:'',
            defaultAudio:$('#audio-list').attr('default-audio'),
            default_material_id:$('#default_material_id').val()
        };
        var obj = $('#title');
        dataObj.title =obj.val();
        if(!dataObj.title){
            materialSpotPano.error('景点名称不能为空。',obj);
            return false;
        }

        $('#audio-list li').each(function(){
           var thisObj =  $(this);
            dataObj.audioList.push(thisObj.attr('audio-id'));
        });

        $('ul.add-scene-list li').each(function(){
            var thisObj =  $(this);
            dataObj.sceneList.push({id:thisObj.attr('scene-id'),title:thisObj.find('.vr-set-title').text()});
        });

        if(!dataObj.sceneList){
            materialSpotPano.error('全景照片不能为空。');
            return false;
        }
        var obj = $('#introduce');
        dataObj.introduce = obj.val();
        if(!dataObj.introduce){
            materialSpotPano.error('景区介绍不能为空。',obj);
            return false;
        }
        thisBtn.button('loading');
        $.ajax({
            type: 'post',
            url: materialSpotPano.save_scenic_spot_url,
            data: dataObj,
            dataType: 'json',
            success: function (result) {
                if(result.status==1){
                    $('#scenic-spot-id').val(result['data']['scenic_spot_id']);
                    alert('保存成功，可点击预览查看。');
                }else{
                    materialSpotPano.error(result.msg);
                }
                thisBtn.button('reset');
            },
            error:function(){
                thisBtn.button('reset');
                materialSpotPano.error('保存出错请重试。');
            }
        });

    }
};