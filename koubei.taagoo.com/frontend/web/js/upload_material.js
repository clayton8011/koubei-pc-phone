var material = {
    getMaterial_url: '',
    rename_url: '',
    delete_url: '',
    pano_url: '',
    shop_id: '',
    panoramic_id: '',
    getThumb_url : '',
    merchant_pid : '',
    online_url : '',
    pub_onlining:false,
    getMaterial: function (_listObj) {
        $.ajax({
            type: 'post',
            url: material.getMaterial_url,
            data: {
                shop_id: material.shop_id
            },
            dataType: 'json',
            success: function (result) {
                var str = '';
                if (result.status == 1) {
                    var length = result.data.scene_data.length;
                    if (length > 0) {
                        material.panoramic_id = result.data.panoramic_id;
                        $('#pano_url').val(material.pano_url + material.shop_id + '&merchant_pid=' + material.merchant_pid);
                        $('.mui-switch').removeAttr('disabled');
                        var scene_data = result.data.scene_data;
                        for (var i in scene_data) {
                            str += '<li scene-id="' + scene_data[i].scene_id + '">' +
                                '<img src="' + scene_data[i].thumb + '"/>' +
                                '<div class="del-btn-box">' +
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
                    }
                    if (length >= 8) {
                        $('#selectfiles').parent().hide();
                    }
                }
                _listObj.prepend(str);
            }
        });
    },
    renameFun: function (data, callback) {
        $.ajax({
            type: 'post',
            url: material.rename_url,
            dataType: 'json',
            data: data,
            success: function (result) {
                callback(result);
            }
        });
    },
    deleteMaterial: function (data, callback) {
        $.ajax({
            type: 'post',
            url: material.delete_url,
            dataType: 'json',
            data: data,
            success: function (result) {
                callback(result);
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
                                var thisObj = $('.add-sceneimg-list li[scene-id='+id+']');
                                thisObj.attr('id',id);
                                businessCircle.progress(id, arr[id]);
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
    koubeiOnline : function (status) {
        if(material.pub_onlining){
            return;
        }
        material.pub_onlining = true;
        $.ajax({
            type : 'post',
            url : material.online_url,
            data : {shop_id : material.shop_id, status : status},
            dataType:'json',
            success : function (result){
                material.pub_onlining = false;
                var tipType = '';
                if(status==1){
                    tipType = '上架';
                }else{
                    tipType = '下架';
                }
                if(result.status == 1){
                    $('#online').prop('checked',status);
                    alert(tipType+'成功!');
                }else {
                    alert(tipType+'失败!');
                }
            },error:function(){
                material.pub_onlining = false;
            }
        });
    }
};