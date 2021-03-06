<?php

namespace frontend\assets;

use yii\web\AssetBundle;
use yii\web\View;

/**
 * Main frontend application asset bundle.
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/index-reset.css',
        'css/bootstrap.min.css',
    ];
    public $js = [
        ['js/jquery-2.2.1.min.js','position' => View::POS_HEAD],
        ['js/bootstrap.min.js','position' => View::POS_HEAD]
    ];
    public $depends = [
        //'yii\web\YiiAsset',
        //'yii\bootstrap\BootstrapAsset',
    ];

    //定义按需加载JS方法，注意加载顺序在最后
    public static function addScript($view, $jsfile,$option=[]) {
        $option = $option+['depends' => 'frontend\assets\AppAsset'];
        $view->registerJsFile($jsfile, $option);
    }

    //定义按需加载css方法，注意加载顺序在最后
    public static function addCss($view, $cssfile) {
        $view->registerCssFile($cssfile, ['depends' => 'frontend\assets\AppAsset']);
    }
}
