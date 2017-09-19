<?php
use frontend\assets\AppAsset;
?>
    <input type="hidden" id="scenic-spot-id" value="<?=$scenicSpotModel->id?>">
<input type="hidden" id="default_material_id" value="<?=$scenicSpotModel->default_material_id?>">
<div class="headlines-box base-width">
    <div class="shadow-box shadow-box-first">
        <p class="scenic-area-title lg-title">景点信息配置</p>
        <div class="activity-inf-box">
<!--            <p class="scenic-edit-tips" id="error_tip" style="width: 380px"><label>请输入景点名称/请上传全景照片</label><img class="close-tip pull-right" src="/images/tip-close.png"></p>-->
            <div class="input-box">
                <label>景点名称</label>
                <div>
                    <input type="text" name="" id="title" value="<?=$scenicSpotModel->title?>" placeholder="请输入景点名称" style="width: 410px;">

                    <label class="inside-label inside-label-last">显示权重</label>
                    <select class="base-sel" name="grade" id="grade">
                        <option <?=$scenicSpotModel->sort==1?'selected="selected"':''?> value="1">1</option>
                        <option <?=$scenicSpotModel->sort==2?'selected="selected"':''?>  value="2">2</option>
                        <option <?=$scenicSpotModel->sort==3?'selected="selected"':''?>  value="3">3</option>
                        <option <?=$scenicSpotModel->sort==4?'selected="selected"':''?>  value="4">4</option>
                        <option <?=$scenicSpotModel->sort==5?'selected="selected"':''?>  value="5">5</option>
                        <option <?=$scenicSpotModel->sort==6?'selected="selected"':''?>  value="6">6</option>
                        <option <?=$scenicSpotModel->sort==7?'selected="selected"':''?>  value="7">7</option>
                        <option <?=$scenicSpotModel->sort==8?'selected="selected"':''?>  value="8">8</option>
                        <option <?=$scenicSpotModel->sort==9?'selected="selected"':''?>  value="9">9</option>
                        <option <?=$scenicSpotModel->sort==10?'selected="selected"':''?>  value="10">10</option>
                    </select>
                </div>
                <label>全景照片</label>
                <div style="position: relative;">
                    <div>
                        <div class="updata-box" id="upload-material">
                            <img class="updata-img" style="margin-top: 96px;" src="/images/updata.png"/>
                            <p class="updata-tip">点击或拖拽上传1张全景照片(长宽比例为2:1)</p>
                        </div>
                        <div id="material-file" style="display: none;"></div>
                    </div>
                    <div class="swiper-container swiper-container-horizontal">
                        <ul class="add-scene-list swiper-wrapper clearfix">
                            <?php foreach ($panoramicList as $item){?>
                            <li scene-id="<?=$item->panoramic_material_id?>" id="scene_<?=$item->panoramic_material_id?>">
                                <img src="<?=$item->panoramicMaterial->getThumbs()['default']?>">
                                <div class="del-btn-box">
                                    <button class="pull-left set-default-spot" type="button" ><?=$item->panoramic_material_id!=$scenicSpotModel->default_material_id?'设为':''?>默认</button>
                                    <button class="pull-right" type="button">删除</button>
                                </div>
                                <p class="text-over vr-set-title"><?=$item->panoramic_material_title?></p>
                                <button class="rename-btn" data-toggle="modal" data-target="#rename-modal"><img
                                            src="/images/rename-btn.png">重命名
                                </button>
                            </li>
                            <?php }?>
                        </ul>
                        <!--<div class="swiper-pagination"></div>-->
                    </div>
<!--                    <div class="swiper-button-next custom-next"></div>-->
<!--                    <div class="swiper-button-prev custom-prev swiper-button-disabled"></div>-->

                </div>

            </div>
        </div>
    </div>
    <div class="shadow-box">
        <div class="scenic-area-inf-box">
            <div class="input-box">

                <label style="display: none;">页面地址</label>
                <div style="display: none;">
                    <input class="url" type="text" name="" id="" value="" placeholder="">
                    <a class="link-type" href="#">预览</a>
                    <button class="link-type">二维码</button>
                    <button class="link-type link-type-last">复制地址</button>
                </div>


                <label>景区文字介绍</label>
                <div style="position: relative;">
                    <textarea id="introduce" class="textarea-inp" placeholder="请输入景区介绍" maxlength="200" name="" rows="" cols=""><?=$scenicSpotModel->introduce?></textarea>
                    <span class="textarea-number">0/200</span>
                </div>

                <label>插入语音</label>
                <div>
                    <div>
                        <div class="updata-box" style="height: 220px;" id="upload-audio">
                            <img class="updata-img" style="margin-top: 38px;" src="/images/updata.png"/>
                            <p class="updata-tip">点击或将文件拖拽到这里上传，只能上传一段语音</p>
                        </div>
                        <div id="audio-file" style="display: none;"></div>
                    </div>
                    <ul class="updata-music-list" id="audio-list">
                        <?php foreach ($scenicRadioList as $item){?>
                            <li class="" audio-id="<?=$item->id?>" id="audio_<?=$item->id?>">
                                <p class="text-over"><?=$item->title?></p>
                                <div class="gress-box"><div style="width: 100%;"></div></div>
                                <div class="music-btn-grp">
                                    <button class="set-default"><?=$item->id==$scenicSpotModel->audio_id?'设为':''?>默认</button>
                                    <button class="delect-btn"></button><button class="edit-btn"></button>
                                </div>
                            </li>
                        <?php }?>
                    </ul>
                </div>
                <label></label>
                <div>
                    <div class="sub-button-grp">
                        <button class="save-btn"  data-loading-text="保存中...">保存</button>
                        <button class="cancel-btn" onclick="location.href='<?=Yii::$app->urlManager->createUrl(['scenic/scenic-spot/index'])?>'">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<div class="modal fade" id="rename-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" style="width: 466px;height: 278px;margin-top: 150px;"  role="document">
        <div class="modal-content" style="width: 466px;height: 278px;border-radius: 30px;">
            <div class="modal-body rename-body">
                <h5>重命名照片</h5>
                <p>请为此图片输入名称</p>
                <input class="rename-input" type="text" value="" />
                <input class="scene-id" type="hidden" value="" />
            </div>
            <div class="modal-footer rename-footer clearfix">
                <button type="button" class="" data-dismiss="modal">取消</button>
                <button type="button" id="rename-submit">确定</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="audio-rename" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" style="width: 466px;height: 278px;margin-top: 150px;"  role="document">
        <div class="modal-content" style="width: 466px;height: 278px;border-radius: 30px;">
            <div class="modal-body rename-body">
                <h5>重命名音乐</h5>
                <p>请为此音乐输入名称</p>
                <input class="rename-input" type="text" value="" />
                <input class="audio-id" type="hidden" value="" />
            </div>
            <div class="modal-footer rename-footer clearfix">
                <button type="button" class="" data-dismiss="modal">取消</button>
                <button type="button" class="rename-submit">确定</button>
            </div>
        </div>
    </div>
</div>

<?php $this->beginBlock('material')?>

//点击保存
$('.save-btn').click(function(){
    materialSpotPano.saveScenic($(this));
});


// 获取全景信息

materialSpotPano.save_scenic_spot_url = '<?= Yii::$app->urlManager->createUrl(['scenic/scenic-spot/save'])?>';
materialSpotPano.getMaterial_url = '<?= Yii::$app->urlManager->createUrl(['scenic/scenic-admin/scenic-info'])?>';
materialSpotPano.getThumb_url = '<?= Yii::$app->urlManager->createUrl(['scenic/scenic-admin/get-thumb'])?>';
materialSpotPano.online_url = '<?= Yii::$app->urlManager->createUrl(['shop/shop-admin/pub-service'])?>';
materialSpotPano.pano_url = '<?= Yii::$app->request->hostInfo . Yii::$app->urlManager->createUrl(['shop/pano/view','shop_id' => ''])?>';
materialSpotPano.getMaterial($('.add-scene-list'));

//阻止浏览器默认行为
document.addEventListener( "dragleave", function(e) {
    e.preventDefault();
}, false);
document.addEventListener( "drop", function(e) {
    e.preventDefault();
}, false);
document.addEventListener( "dragenter", function(e) {
    e.preventDefault();
}, false);
document.addEventListener( "dragover", function(e) {
    e.preventDefault();
}, false);


var box = document.getElementById("upload-material"); //drop区域的DOM元素
box.addEventListener("drop", function (e) {
    var fileList = e.dataTransfer.files; //获取文件对象

    var up = uploader_material_obj.uploader; //plupload的实例对象

    //检测是否是拖拽文件到页面的操作
    if (fileList.length == 0) {
        return false;
    }
    if(fileList.length > 1){
        alert('仅支持单文件拖拽上传');
    }
    up.addFile(fileList[0]);

}, false);

materialSpotPano.checkPanoramicProcess("<?=Yii::$app->params['cloud_websocket_service']['ws_server'].'?token='.md5(Yii::$app->params['cloud_websocket_service']['websocket_token'].Yii::$app->user->id).'&user_id='.Yii::$app->user->id?>","<?=Yii::$app->user->id?>");
// 上传图片

var uploader_material_obj = get_uploader_obj({
    mime_types: [
        {title: "jpg,png", extensions: "jpg,png"},
    ],
    browse_button : 'upload-material',
    container_box : 'material-file',
    max_file_size: '150mb',
    get_policy_url: '<?=Yii::$app->urlManager->createUrl(['shop/shop-admin/get-policy', 'type' => 'upload_pano'])?>',
    selected_upload: false,
    one_file : true
});

uploader_material_obj.uploader.init();
uploader_material_obj.files_added = function (up, files) {
    var start = true;
    var x = 0;
    for(var i = 0; i < files.length; i++){
        x = i;
        var reader = new FileReader();
        reader.readAsDataURL(files[i].getNative());
        reader.onload = (function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                if(checkImgWidthAndHeight(this.width, this.height)){
                    if((x + 1 == files.length) && start){
                        var str = '';
                        for(var i = 0; i < files.length; i++){
                            str += '<li scene-id="" id="'+files[i].id+'">'+
                                '<img src=""/>'+
                                '<div class="del-btn-box">'+
                                '<button class="pull-left set-default-spot" type="button" >设为默认</button>'+
                                '<button class="pull-right" type="button">删除</button>'+
                                '</div>'+
                                '<p class="text-over vr-set-title">'+files[i].name.substring(0, files[i].name.lastIndexOf('.'))+'</p>'+
                                '<div class="progress-box">'+
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
                        $('.add-scene-list').append(str);
                        uploader_material_obj.start_upload();
                    }else{
                        start = false;
                    }
                }
            }
        });
    }
};

uploader_material_obj.upload_progress = function(up, file){
    businessCircle.progress(file.id ,file.percent);
}

uploader_material_obj.upload_success = function (up, file, info, json) {
    json['type'] = 'images';
    json['file_title'] = file.name.substring(0, file.name.lastIndexOf('.'));
    $.ajax({
        type: 'POST',
        url: "<?=Yii::$app->urlManager->createUrl(['scenic/scenic-admin/add-material'])?>",
        data: json,
        success: function (res) {
            if (res.status == 1) {
                $('#'+file.id).attr('scene-id',res.data.scene_id);
                //$('#'+file.id).find('.progress-box').hide();
                $('#'+file.id).children('img').attr('src','/images/cutting.png');
                $('#'+file.id).append('<button class="rename-btn" data-toggle="modal" data-target="#rename-modal"><img src="/images/rename-btn.png">重命名</button>');
                $('#'+file.id).attr('id', 'scene_' + res.data.scene_id);
                businessCircle.progress('scene_'+res.data.scene_id ,0);
                materialSpotPano.scenic_data.panoramicData.push({scene_id : res.data.scene_id, title : json.file_title});
            } else {
                alert(json.file_title+'上传失败，请重试。');
            }
        },
        error: function () {
            alert('上传失败，请重试。');
        },
        dataType: 'json'
    });
}

//验证图片大小限制
function checkImgWidthAndHeight(width, height) {
    if (width != 2 * height) {
        alert('球面全景图片必须为2:1比例');
        return false;
    }
    //if (width < 2000 || height < 1000) {
    //alert('球面全景图片像素必须为2000*1000以上');
    //return false;
    //}
    return true;
}

// 删除
$(document).on('click','.del-btn-box butto.pull-right',function () {
    var scene_id = $(this).parents('li').attr('scene-id');
    $(this).parents('li').remove();

    materialSpotPano.scenic_data.panoramicData.removeByValue = function(val) {
        for(var i=0; i < this.length; i++) {
            if(this[i].scene_id == val) {
                this.splice(i, 1);
                break;
            }
        }
    }
    materialSpotPano.scenic_data.panoramicData.removeByValue(scene_id);
});

//设为默认
$(document).on('click','.set-default-spot',function(){
    $('.set-default-spot').html('设为默认');
    $('#default_material_id').val($(this).parents('li').attr('scene-id'));
    $(this).html('默认');
});

//		重命名
$(document).on('click','.rename-btn',function() {
    var txt=$(this).parent().find('.vr-set-title').text();
    var scene_id = $(this).parent().attr('scene-id');
    $('#rename-modal .rename-input').val(txt);
    $('#rename-modal .scene-id').val(scene_id);
});
$("#rename-modal").on('hide.bs.modal',function(){
    $('#rename-modal .rename-input').val("");
    $('#rename-modal .scene-id').val("");
});

$(document).on('click','#rename-submit',function() {
    var rename_val = $('#rename-modal .rename-input').val();
    var scene_id = $('#rename-modal .scene-id').val();
    $('#scene_'+ scene_id +' .text-over').text(rename_val);
    materialSpotPano.scenic_data.panoramicData.rename = function(val,rename_val) {
        for(var i=0; i < this.length; i++) {
            if(this[i].scene_id == val) {
                this[i].title = rename_val;
                break;
            }
        }
    }
    materialSpotPano.scenic_data.panoramicData.rename(scene_id, rename_val);
    $('#rename-modal').modal('hide');
});

// 预览
$(document).on('click','#preview',function (){
    var url = $('#pano_url').val();
    if(url != ''){
        window.open(url);
    }
});
// 口碑上线
$("#online").click(function(){
    materialSpotPano.koubeiOnline(( $(this).is(':checked') ? 1 : 0 ));
    return false;
});

$('.user-name').text('用户：');
<?php
$this->endBlock();
$this->registerJs($this->blocks['material']);
?>





<?php $this->beginBlock('audio')?>

// 上传音频
var uploader_audio_obj = get_uploader_obj({
    mime_types: [
        {title: "mp3", extensions: "mp3"},
    ],
    browse_button : 'upload-audio',
    container_box : 'audio-file',
    max_file_size: '5mb',
    get_policy_url: '<?=Yii::$app->urlManager->createUrl(['shop/shop-admin/get-policy', 'type' => 'material_music'])?>',
    selected_upload: false,
    one_file : true
});

uploader_audio_obj.uploader.init();
var box = document.getElementById("upload-audio"); //drop区域的DOM元素
box.addEventListener("drop", function (e) {
    var fileList = e.dataTransfer.files; //获取文件对象

    var up = uploader_audio_obj.uploader; //plupload的实例对象

    //检测是否是拖拽文件到页面的操作
    if (fileList.length == 0) {
        return false;
    }
    if(fileList.length > 1){
        alert('仅支持单文件拖拽上传');
    }
    up.addFile(fileList[0]);

}, false);

uploader_audio_obj.files_added = function (up, files) {
    var str = '';
    for(var i = 0; i < files.length; i++){
        str += '<li class="updating" audio-id="" id="' + files[i].id + '">' +
            '<p class="text-over">'+files[i].name.substring(0, files[i].name.lastIndexOf('.'))+'</p>'+
            '<div class="gress-box">'+
            '<div style="width: 0;"></div>'+
            '</div>'+
            '<div class="music-btn-grp">'+
            '<button class="delect-btn"></button>'+
            '</div>'+
            '</li>';
    }
    $('#audio-list').append(str);
    uploader_audio_obj.start_upload();
};

uploader_audio_obj.upload_progress = function(up, file){
    businessCircle.material_progress($('#'+file.id) ,file.percent);
}

uploader_audio_obj.upload_success = function (up, file, info, json) {
    json['file_title'] = file.name.substring(0, file.name.lastIndexOf('.'));
    json['rel_type'] = 2;
    $.ajax({
        type: 'POST',
        url: "<?=Yii::$app->urlManager->createUrl(['scenic/scenic-admin/save-audio'])?>",
        data: json,
        success: function (res) {
            console.log(res);
            if (res.status == 1) {
                $('#'+file.id).attr('id','audio_'+res.data.id).attr('audio-id',res.data.id).removeClass('updating');
                var thisObj = $('#audio_'+res.data.id);
                thisObj.find('.music-btn-grp').append('<button class="edit-btn"></button>');
                thisObj.find('.music-btn-grp').prepend('<button class="set-default">设为默认</button>');
            } else {
                alert(json.file_title+'上传失败，请重试。');
            }
        },
        error: function () {
            alert('上传失败，请重试。');
        },
        dataType: 'json'
    });
}
// 删除
$(document).on('click','#audio-list .delect-btn',function(){
    var parent = $(this).parents('li');
    var audio_id = parent.attr('audio-id');
    $.ajax({
        type : 'POST',
        url : '<?=Yii::$app->urlManager->createUrl(['scenic/scenic-admin/delete-audio'])?>',
        data : {audio_id : audio_id},
        dataType : 'json',
        success : function (result){
            if(result.status == 1){
                if(audio_id == material.scenic_data.audio_id){
                    material.scenic_data.audio_id = "0";
                }
                parent.remove();
            }else{
                alert('删除失败');
            }
        },
        error : function (){
            alert('删除失败')
        }
    });
});

// 重命名
$(document).on('click','#audio-list .edit-btn',function(){
    $('#audio-rename .audio-id').val($(this).parents('li').attr('audio-id'));
    $('#audio-rename .rename-input').val($(this).parents('li').find('.text-over').html());
    $('#audio-rename').modal('show');
});
$(document).on('click','#audio-rename .rename-submit',function() {
    var rename_val = $('#audio-rename .rename-input').val();
    var audio_id = $('#audio-rename .audio-id').val();
    $.ajax({
        type : 'post',
        url : '<?=Yii::$app->urlManager->createUrl(['scenic/scenic-admin/rename-audio'])?>',
        data : {audio_id : audio_id, title : rename_val},
        dataType : 'json',
        success : function(result){
            if(result.status == 1){
                $('#audio_'+ audio_id +' .text-over').text(rename_val);
                $('#audio-rename').modal('hide');
            }else{
                alert('命名失败请重试');
            }
        },
        error : function (){
            alert('命名失败请重试');
        }
    });
});

// 设为默认
$(document).on('click','#audio-list .set-default', function(){
    var audio_id = $(this).parents('li').attr('audio-id');
    $('#audio-list').attr('default-audio',audio_id);
    $('#audio-list .set-default').text('设为默认');
    $(this).text('默认');
});
<?php
$this->endBlock();
$this->registerJs($this->blocks['audio']);
?>


<?php
AppAsset::addScript($this,"@web/js/2.0/upload_material.js");
AppAsset::addScript($this,"@web/js/2.0/cloud-business.js");
AppAsset::addScript($this,"@web/js/oss_upload/lib/plupload-2.1.2/js/plupload.full.min.js");
AppAsset::addScript($this,"@web/js/oss_upload/upload.js");
?>
