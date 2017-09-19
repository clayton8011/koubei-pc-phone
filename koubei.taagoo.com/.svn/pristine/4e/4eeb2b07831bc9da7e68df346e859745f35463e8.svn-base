<?php
//此文件为公共头部
/* @var $this \yii\web\View */
/* @var $content string */
use frontend\assets\AppAsset;
use yii\helpers\Html;

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
        <div class="pull-right">
            <span class="user-name">用户：</span>
            <button class="exit-btn" type="button" onclick="location.href='<?= Yii::$app->urlManager->createUrl(['shop/shop-admin/logout'])?>'">退出登录</button>
        </div>
    </div>
</header>