<?php
//此文件为公共头部
/* @var $this \yii\web\View */
/* @var $content string */
use frontend\assets\AppAsset;
use yii\helpers\Html;
$this_action = Yii::$app->controller->action->id;
$this_controller = Yii::$app->controller->id;
AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body class="color-body">
<?php $this->beginBody() ?>
<header>
    <div class="header base-width">
        <div class="pull-left"><img src="/images/logo.png"/></div>
        <ul class="pull-left manu-list">
            <li class="<?php if($this_controller == 'scenic-admin' || $this_controller == 'scenic-notice' || $this_controller == 'scenic-spot')echo 'active';?>"><a href="<?= Yii::$app->urlManager->createUrl(['scenic/scenic-admin/index'])?>">景区景点</a></li>
            <li class="<?php if($this_controller == 'head-lines')echo 'active';?>"><a href="<?= Yii::$app->urlManager->createUrl(['scenic/head-lines/index'])?>">景区头条</a></li>
            <li class="<?php if($this_controller == 'activity')echo 'active';?>"><a href="<?= Yii::$app->urlManager->createUrl(['scenic/activity/index'])?>">景区活动</a></li>
        </ul>
        <div class="pull-right">
            <span class="user-name">用户：TOM</span>
            <button class="exit-btn" type="button" onclick="location.href='<?= Yii::$app->urlManager->createUrl(['scenic/base/logout'])?>'">退出登录</button>
        </div>
    </div>
</header>