<?php
use frontend\assets\AppAsset;
$this->title = '景区景点';
?>
<div class="base-content base-width">
    <div class="scenic-area-inf">
        <p class="scenic-area-title">景区信息编辑</p>
        <ul class="scenic-area-edit-list clearfix">
            <li>
                <div class="scenic-area-li-link">
                    <img src="/images/jq-base.png"/>
                    <h5>景区基础信息</h5>
                    <p>包括景区名称、等级、地址和封面等</p>
                </div>
                <div class="p-list-hover-box"><a href="javascript:void(0);" id="edit-scenic"><img src="/images/edit-lg.png"/></a></div>
            </li>
            <li>
                <div class="scenic-area-li-link">
                    <img src="/images/jq-tip.png"/>
                    <h5>景区须知</h5>
                    <p>包括景区介绍，开放时间，推荐游玩时间，交通攻略和门票信息</p>
                </div>
                <div class="p-list-hover-box"></div><div class="p-list-hover-box"><a href="javascript:void(0);"  id="edit-scenic-notice"><img src="/images/edit-lg.png"/></a></div>
            <li>
                <div class="scenic-area-li-link">
                    <img src="/images/jq-admin.png"/>
                    <h5>景点管理</h5>
                    <p>包括景点名称、介绍、VR展示等</p>
                </div>
                <div class="p-list-hover-box"><a href="javascript:void(0);" id="edit-scenic-spot"><img src="/images/edit-lg.png"/></a></div>
            </li>
    <!--            <li>-->
    <!--                <div class="scenic-area-li-link">-->
    <!--                    <img src="/images/jq-didanpu.png"/>-->
    <!--                    <h5>景区店铺管理</h5>-->
    <!--                    <p>包括景区店铺的下家</p>-->
    <!--                </div>-->
    <!--                <div class="p-list-hover-box"><a href="javascript:void(0);"><img src="/images/edit-lg.png"/></a></div>-->
    <!--            </li>-->
        </ul>
    </div>
</div>
<?php $this->beginBlock('page_foot') ?>
var scenic = '<?= $scenic?>';
$('#edit-scenic,#edit-scenic-spot,#edit-scenic-notice').click(function(){
    if(scenic){
        switch($(this).attr('id')){
            case 'edit-scenic':
                location.href = '<?= Yii::$app->urlManager->createUrl(['scenic/scenic-admin/scenic-area'])?>';
            break;
            case 'edit-scenic-notice':
                location.href = '<?= Yii::$app->urlManager->createUrl(['scenic/scenic-notice/index'])?>';
            break;
            case 'edit-scenic-spot':
                location.href = '<?= Yii::$app->urlManager->createUrl(['scenic/scenic-spot/index'])?>';
            break;
        }
    }else{
        showCreate('您还没有景区，点击我开始建立吧！','<?= Yii::$app->urlManager->createUrl(['scenic/scenic-admin/scenic-area'])?>');
    }
});

$('#edit-scenic,#edit-scenic-spot').click(function(){
    if(scenic){
        switch($(this).attr('id')){
            case 'edit-scenic':
                location.href = '<?= Yii::$app->urlManager->createUrl(['scenic/scenic-admin/scenic-area'])?>';
                break;
            case 'edit-scenic-spot':
                location.href = '<?= Yii::$app->urlManager->createUrl(['scenic/scenic-spot/index'])?>';
                break;
        }
    }else{
        showCreate('您还没有景区，点击我开始建立吧！','<?= Yii::$app->urlManager->createUrl(['scenic/scenic-admin/scenic-area'])?>');
    }
});
function showCreate(text,url){
    var content = '<div class="no-scenic-area-inf">'+
        '<img src="/images/no-infor.png"/>'+
        '<p>'+text+'</p>'+
        '<button class="new-bulid-btn" type="button" onclick="location.href=\''+url+'\'">新建</button>'+
    '</div>';
    $('.base-content').html(content);
    $(".no-scenic-area-inf").fadeIn();
}
<?php
$this->endBlock();
$this->registerJs($this->blocks['page_foot']);
?>
<?php
AppAsset::addCss($this,"@web/css/2.0/index.css");
AppAsset::addScript($this,"@web/js/2.0/cloud-business.js");
?>
