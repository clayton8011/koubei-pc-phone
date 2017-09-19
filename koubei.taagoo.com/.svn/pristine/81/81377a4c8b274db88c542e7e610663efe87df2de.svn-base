<?php
/* @var $this yii\web\View */
/* @var $headlines array */

use frontend\assets\AppAsset;
$this->title = '景区头条';
?>
<div class="headlines-box base-width">
    <div class="shadow-box shadow-box-first">
        <p class="scenic-area-title lg-title">景区头条</p>
        <div class="activity-inf-box">
            <div class="input-box">
                <input type="hidden" id="head-id">
                <label>头条名称</label>
                <div>
                    <input class="max-input" type="text" name="" id="title" value="" placeholder="请输入名称" />
                </div>
                <label>头条来源</label>
                <div>
                    <input class="max-input" type="text" name="" id="source" value="" placeholder="请输入来源" />
                </div>
                <label>发布时间</label>
                <div>
                    <input class="max-input" type="text" name="" id="pub_time" value="" placeholder="请输入显示时间" />
                </div>
                <label>权重</label>
                <div>
                    <select name="" class="max-input" id="sort">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <label>封面图</label>
                <div class="clearfix">
                    <div class="updata-box activity-sm-input pull-left" style="height: 196px;" id="upload-thumb">
                        <img class="updata-img" style="margin-top: 34px;" src="/images/activity-updata.png">
                        <p class="updata-tip">点击或拖拽上传封面照片（限一张，格式为jpg)</p>
                    </div>
                    <div id="thumb-file" style="display: none;"></div>
                    <input type="hidden" id="thumb_path">
                    <div class="pull-left" style="margin-left: 50px;">
                        <div class="activity-view-box">
                            <img class="activity-view-img" src="" id="thumb"/>
                        </div>
                    </div>
                </div>
                <label>活动内容介绍</label>
                <div>
<!--                    <textarea class="textarea-inp" placeholder="请输入编辑内容" maxlength="200" name="" rows="" cols="" id="content"></textarea>-->
                    <?= \yii\redactor\widgets\Redactor::widget(array(
                        'options'=>array(
                            'class'=>'textarea-inp',
                            'id'=>'content',
                            'maxlength'=>'200',
                            'placeholder'=>'请输入编辑内容',
                        ),
                    )) ?>
                </div>
                <label></label>
                <div>
                    <div class="sub-button-grp">
                        <button class="save-btn">保存</button>
                        <button class="cancel-btn">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php foreach ($headlines as $headKey => $headVal) :?>
    <div class="shadow-box" id="head_<?= $headVal['id']?>" head-id="<?= $headVal['id']?>" sort="<?= $headVal['sort']?>" thumb="<?= $headVal['thumb_path']?>">
        <div class="clearfix head-title-box">
            <p class="pull-left head-title"  role="button" data-toggle="collapse" href="#headlines-<?= $headVal['id']?>" aria-expanded="false" aria-controls="collapseExample"><?= $headVal['title']?></p>
            <div class="pull-right">
                <button type="button" class="head-edit-btn"><img src="/images/edit-btn.png"/> 编辑</button>
                <button type="button" class="head-del-btn"><img src="/images/del-btn.png"/> 删除</button>
            </div>
        </div>
        <div class="collapse" id="headlines-<?= $headVal['id']?>">
            <div class="head-list-detial">
                <h5>头条来源：<span class="from source"><?= $headVal['source']?></span> 发布时间：<span class="pub_time"><?= $headVal['pub_time']?></span></h5>
                <div class="content"><?= $headVal['content']?></div>
            </div>
        </div>
    </div>
    <?php endforeach;?>
</div>
<div class="modal-box" id="delete-modal">
    <div class="modal-cont">
        <img src="/images/del-tip.png"/>
        <span>确认删除吗？</span>
        <input type="hidden" class="head-id">
        <div>
            <button class="modal-confirm">确定</button>
            <button class="modal-cancel">取消</button>
        </div>
    </div>
</div>
<?php $this->beginBlock('save-headline')?>
    $('.sub-button-grp .save-btn').click(function(){
        var save_data = {};
        if(!$('#title').val()){
            alert('标题！');return false;
        }
        save_data.title = $('#title').val();
        if(!$('#source').val()){
            alert('来源！');return false;
        }
        save_data.source = $('#source').val();
        if(!$('#pub_time').val()){
            alert('发布时间！');return false;
        }
        save_data.pub_time = $('#pub_time').val();
        if(!$('#sort').val()){
            alert('权重！');return false;
        }
        save_data.sort = $('#sort').val();
        if(!$('#thumb_path').val()){
            alert('封面！');return false;
        }
        save_data.thumb_path = $('#thumb_path').val();
        if(!$('#content').val()){
            alert('内容！');return false;
        }
        save_data.content = $('#content').val();
        save_data.id = $('#head-id').val();
        $.ajax({
            type : 'post',
            url : '<?= Yii::$app->urlManager->createUrl(['scenic/head-lines/save-head'])?>',
            data : save_data,
            dataType : 'json',
            success : function(result){
                if(result.status == 1){
                    if(result.data.id != save_data.id){
                        str = '<div class="shadow-box"  id="head_'+result.data.id+'" head-id="'+result.data.id+'" sort="'+save_data.sort+'" thumb="'+save_data.thumb_path+'">'+
                            '<div class="clearfix head-title-box">'+
                                '<p class="pull-left head-title"  role="button" data-toggle="collapse" href="#headlines-'+result.data.id+'" aria-expanded="false" aria-controls="collapseExample">'+save_data.title+'</p>'+
                                '<div class="pull-right">'+
                                    '<button type="button" class="head-edit-btn"><img src="/images/edit-btn.png"/> 编辑</button>'+
                                    '<button type="button" class="head-del-btn"><img src="/images/del-btn.png"/> 删除</button>'+
                                '</div>'+
                            '</div>'+
                            '<div class="collapse" id="headlines-'+result.data.id+'">'+
                                '<div class="head-list-detial">'+
                                    '<h5>头条来源：<span class="from source">'+save_data.source+'</span> 发布时间：<span class="pub_time">'+save_data.pub_time+'</span></h5>'+
                                    '<div class="content">'+save_data.content+'</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
                        $('.shadow-box-first').after(str);
                    }else{
                        $('#head_'+save_data.id).attr('sort',save_data.sort);
                        $('#head_'+save_data.id).attr('thumb',save_data.thumb_path);
                        $('#head_'+save_data.id).find('.head-title').text(save_data.title);
                        $('#head_'+save_data.id).find('.source').text(save_data.source);
                        $('#head_'+save_data.id).find('.pub_time').text(save_data.pub_time);
                        $('#head_'+save_data.id).find('.content').html(save_data.content);
                    }
                    reset();
                }else{
                    alert(result.msg);
                }
            },
            error : function (){
                alert('保存失败');
            }
        });
    });

    // 取消
    $('.sub-button-grp .cancel-btn').click(function(){
        reset();
    });
    function reset(){
        $('.input-box input,textarea').val(null);
        $('#sort').val(1);
        $('#thumb').attr('src',null);
        $('.redactor-editor').html(null);
    }

    $('.re-formatting').click(function(){
        window.scrollBy(0,60);
    });
    $(document).on('mouseover','.redactor-dropdown-box-formatting a',function(){
        window.scrollBy(0,60);
    });
<?php
$this->endBlock();
$this->registerJs($this->blocks['save-headline']);
?>

<?php $this->beginBlock('edit')?>
    $(document).on('click','.head-edit-btn',function(){
        _this = $(this).parents('.shadow-box');
        $('#head-id').val(_this.attr('head-id'));
        $('#title').val(_this.find('.head-title').text());
        $('#source').val(_this.find('.source').text());
        $('#pub_time').val(_this.find('.pub_time').text());
        $('#thumb_path').val(_this.attr('thumb'));
        $('#thumb').attr('src','<?= Yii::$app->params['alioss']['endpoint'];?>/'+_this.attr('thumb'));
        $('#content').val(_this.find('.content').html());
        $('.redactor-editor').html(_this.find('.content').html());
    });
<?php
$this->endBlock();
$this->registerJs($this->blocks['edit']);
?>
<?php $this->beginBlock('delete')?>
$(document).on('click','.head-del-btn',function(){
    var head_id = $(this).parents('.shadow-box').attr('head-id');
    $('#delete-modal').show();
    $('#delete-modal .head-id').val(head_id);
});

$('#delete-modal .modal-confirm').click(function(){
    var head_id = $('#delete-modal .head-id').val();
    if(head_id){
        $.ajax({
            type : 'post',
            url : '<?= Yii::$app->urlManager->createUrl(['scenic/head-lines/delete'])?>',
            data : {head_id : head_id},
            dataType : 'json',
            success : function(result){
                if(result.status == 1){
                    $('#head_'+head_id).remove();
                    $('#delete-modal .head-id').val(null);
                    $('#delete-modal').hide();
                }else{
                    alert('删除失败');
                }
            },
            error : function(){
                alert('删除失败');
            }
        })
    }
});

$("#delete-modal .modal-cancel").click(function(){
    $('#delete-modal').hide();
});
<?php
$this->endBlock();
$this->registerJs($this->blocks['delete']);
?>
<?php $this->beginBlock('thumb');?>
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

    // 上传封面
    var uploader_thumb_obj = get_uploader_obj({
        mime_types: [
            {title: "jpg", extensions: "jpg"},
        ],
        browse_button : 'upload-thumb',
        container_box : 'thumb-file',
        max_file_size: '5mb',
        get_policy_url: '<?=Yii::$app->urlManager->createUrl(['shop/shop-admin/get-policy', 'type' => 'material_images'])?>',
        selected_upload: true,
        one_file : true
    });

    uploader_thumb_obj.uploader.init();
    var box = document.getElementById("upload-thumb"); //drop区域的DOM元素
    box.addEventListener("drop", function (e) {
        var fileList = e.dataTransfer.files; //获取文件对象

        var up = uploader_thumb_obj.uploader; //plupload的实例对象

        //检测是否是拖拽文件到页面的操作
        if (fileList.length == 0) {
            return false;
        }
        if(fileList.length > 1){
            alert('仅支持单文件拖拽上传');
        }
        up.addFile(fileList[0]);

    }, false);

    uploader_thumb_obj.upload_success = function (up, file, info, json) {
        $('#thumb').attr('src','<?= Yii::$app->params['alioss']['endpoint'];?>/'+json.filename);
        $('#thumb_path').val(json.filename);
    }
<?php
$this->endBlock();
$this->registerJs($this->blocks['thumb']);
?>

<?php
AppAsset::addCss($this,"@web/css/2.0/index.css");
AppAsset::addScript($this,"@web/js/oss_upload/lib/plupload-2.1.2/js/plupload.full.min.js");
AppAsset::addScript($this,"@web/js/oss_upload/upload.js");
?>
