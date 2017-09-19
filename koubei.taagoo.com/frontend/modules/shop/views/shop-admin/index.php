<?php

/* @var $this yii\web\View */
/* @var $shop common\models\KoubeiServiceMarketOrder */

$this->title = '店铺管理';

use yii\helpers\Html;
use frontend\assets\AppAsset;
?>
<div class="content-right pull-right">
    <div class="shop-admin-box">
        <h5 class="shop-title-name"><?= $shop->shop_name?></h5>
        <div class="shangquan-box">
            <label class="shangq-addr">店铺地址：</label><input class="shangq-addr-input" type="text" name="" id="" value="<?= $shop->address?>" placeholder="请输入店铺地址" /><br />
            <label>全景照片：</label><span class="shangq-tips">请上传1到8张全景照片(长宽比例为2:1)</span>
            <ul class="add-sceneimg-list clearfix">
                <li>
                    <div class="shangq-add-img" id="selectfiles">
                    </div>
                    <div id="container"></div>
                </li>
            </ul>
            <label class="page-addr">页面地址：</label><input class="page-addr-input" type="text" id="pano_url" value="" placeholder="全景地址" /><a class="shangq-link" id="preview" href="javascript:;">预览</a><a class="shangq-link" data-toggle="modal" data-garget="#2Dcode-modal" href="#2Dcode-modal">二维码</a><a class="shangq-link" onclick="$('#pano_url').focus();">复制地址</a>
            <div class="clearfix">
                <label class="pull-left page-addr">口碑上线：</label><input class="mui-switch pull-left mui-switch-animbg" <?=$shop->shop_status=='ONLINE'?'checked="checked"':''?> type="checkbox" disabled id="online" />
            </div>
            <!--<div class="clearfix">
                <label class="page-addr">页面模版：</label>
                <a href="#" class="pull-right shangq-more">更多&gt;</a>
            </div>
            <ul class="template-list clearfix">
                <li>
                    <img src="/images/template-list.png"/>
                    <div class="template-btn-grp clearfix">
                        <button class="pull-left" type="button">预览</button>
                        <button class="pull-right" type="button">选用</button>
                    </div>
                    <p class="template-selected">当前模版</p>
                </li>
            </ul>-->
        </div>
    </div>
</div>

<!--modal-->
<div id="vr-preview-modal" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document" style="margin-top:100px;background: none;box-shadow: none;width: 330px;">
        <div class="modal-content" style="background: none;box-shadow: none;border: none;">
            <button type="button" style="opacity:1;cursor: pointer;" class="close" data-dismiss="modal" aria-label="Close"><img src="/images/vr-pre-close.png"/></button>
            <div class="modal-body" style="padding-top: 28px;width: 257px;">
                <div class="" id="krpano">
                    <img src="/images/template-list.png"/>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="2Dcode-modal">
    <div class="modal-dialog" role="document" style="width: 378px;margin-top: 150px;">
    	<button type="button"  data-dismiss="modal" aria-label="Close" style="position: absolute;right: -53px;top: -20px;background: none;"><img src="/images/vr-pre-close.png"/></button>
        <div class="modal-content" style="width: 378px;height: 411px;border-radius: 0;border: none;padding-top: 36px;">
            <img id="" src="" data-src="<?= Yii::$app->urlManager->createUrl(['shop/shop-admin/qrcode','url'=> ''])?>" style="width: 312px;height: 312px;display: block;margin: 0 auto;">
            <p style="color: #333333;font-size: 24px;text-align: center;margin-top: 15px;">请打开微信客户端“扫一扫”</p>
        </div>
    </div>
</div>

<div class="modal fade" id="rename-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" style="width: 466px;height: 278px;margin-top: 150px;"  role="document">
        <div class="modal-content" style="width: 466px;height: 278px;border-radius: 30px;">
            <div class="modal-body rename-body">
                <h5>重命名照片</h5>
                <p>请为此图片输入名称</p>
                <input class="rename-input" type="text" name="" id="" value="" />
                <input class="scene-id" type="hidden" name="" id="" value="" />
            </div>
            <div class="modal-footer rename-footer clearfix">
                <button type="button" class="" data-dismiss="modal">取消</button>
                <button type="button" id="rename-submit">确定</button>
            </div>
        </div>
    </div>
</div>

<?php $this->beginBlock('page_foot') ?>
    // 获取全景信息
    material.getMaterial_url = '<?= Yii::$app->urlManager->createUrl(['shop/shop-admin/get-panoramic'])?>';
    material.rename_url = '<?= Yii::$app->urlManager->createUrl(['shop/shop-admin/rename-material'])?>';
    material.delete_url = '<?= Yii::$app->urlManager->createUrl(['shop/shop-admin/delete-material'])?>';
    material.getThumb_url = '<?= Yii::$app->urlManager->createUrl(['shop/shop-admin/get-thumb'])?>';
    material.online_url = '<?= Yii::$app->urlManager->createUrl(['shop/shop-admin/pub-service'])?>';
    material.pano_url = '<?= Yii::$app->request->hostInfo . Yii::$app->urlManager->createUrl(['shop/pano/view','shop_id' => ''])?>';
    material.shop_id = '<?= $shop->shop_id?>';
    material.merchant_pid = '<?= $shop->merchant_pid?>';
    material.getMaterial($('.add-sceneimg-list'));
    material.checkPanoramicProcess("<?=Yii::$app->params['cloud_websocket_service']['ws_server'].'?token='.md5(Yii::$app->params['cloud_websocket_service']['websocket_token'].Yii::$app->user->id).'&user_id='.Yii::$app->user->id?>","<?=Yii::$app->user->id?>");
    // 上传图片
    var uploader_video_obj = get_uploader_obj({
        mime_types: [
            {title: "jpg,png", extensions: "jpg,png"},
        ],
        max_file_size: '150mb',
        get_policy_url: '<?=Yii::$app->urlManager->createUrl(['shop/shop-admin/get-policy', 'type' => 'upload_pano'])?>',
        selected_upload: false,
        one_file : true
    });

    uploader_video_obj.uploader.init();
    uploader_video_obj.files_added = function (up, files) {
        var length = files.length + $('.add-sceneimg-list li').length;
        if(length > 9){
            alert('只能上传八张图片哦！');
            return false;
        }
        if(length == 9){
            $('#selectfiles').parent().hide();
        }
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
                    if(!checkImgWidthAndHeight(this.width, this.height)){
                        start = false;
                    }
                    if((x + 1 == files.length) && start){
                        var str = '';
                        for(var i = 0; i < files.length; i++){
                            str += '<li scene-id="" id="'+files[i].id+'">'+
                                '<img src=""/>'+
                                '<div class="del-btn-box">'+
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
                        $('.shangq-add-img').parent().before(str);
                        uploader_video_obj.start_upload();
                    }
                }
            });
        }
    };

    uploader_video_obj.upload_progress = function(up, file){
        businessCircle.progress(file.id ,file.percent);
    }

    uploader_video_obj.upload_success = function (up, file, info, json) {
        json['type'] = 'images';
        json['file_title'] = file.name.substring(0, file.name.lastIndexOf('.'));
        json['panoramic_id'] = material.panoramic_id;
        json['shop_id'] = material.shop_id;
        $.ajax({
            type: 'POST',
            url: "<?=Yii::$app->urlManager->createUrl(['shop/shop-admin/add-material'])?>",
            data: json,
            success: function (res) {
                if (res.status == 1) {
                    $('#'+file.id).attr('scene-id',res.data.scene_id);
                    //$('#'+file.id).find('.progress-box').hide();
                    businessCircle.progress(file.id ,0);
                    material.panoramic_id = res.data.panoramic_id;
                    $('#pano_url').val(material.pano_url + material.shop_id + '&merchant_pid=' + material.merchant_pid);
                    $('#'+file.id).children('img').attr('src','/images/cutting.png');
                    $('#'+file.id).append('<button class="rename-btn"><img src="/images/rename-btn.png"/>重命名</button>');
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
        /*if (width < 2000 || height < 1000) {
            alert('球面全景图片像素必须为2000*1000以上');
            return false;
        }*/
        return true;
    }

    // 删除
    $('.add-sceneimg-list').on('click','.del-btn-box button',function () {
        var scene_id = $(this).parents('li').attr('scene-id');
        var data = {
            scene_id : scene_id,
            panoramic_id : material.panoramic_id
        }
        material.deleteMaterial(data,businessCircle.deleteCallback);
    });
    // 重命名
    $(document).on('click','#rename-submit',function() {
        var data = {
            panoramic_id : material.panoramic_id,
            rename_val :  $('.rename-input').val(),
            scene_id :  $('.scene-id').val()
        };
        if($.trim(data.rename_val) == ''){
            alert('不能为空');return false;
        }
        material.renameFun(data,businessCircle.renameCallback);
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
        material.koubeiOnline(( $(this).is(':checked') ? 1 : 0 ));
        return false;
    });

    $('.user-name').text('用户：<?= $shop->shop_name?>');
<?php
$this->endBlock();
$this->registerJs($this->blocks['page_foot']);
AppAsset::addScript($this,"@web/js/upload_material.js");
AppAsset::addScript($this,"@web/js/oss_upload/lib/plupload-2.1.2/js/plupload.full.min.js");
AppAsset::addScript($this,"@web/js/oss_upload/upload.js");
?>   