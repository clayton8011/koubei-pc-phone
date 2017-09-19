<?php
return [
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => [
        'redis' => [
            'class' => 'yii\redis\Connection',
            'hostname' => '192.168.1.66',
            'port' => 6380,
            'database' => 0,
            'password'=>'taagoo'
        ],
        'cache' => [
            'class' => 'yii\redis\Cache',
            'keyPrefix' => 'cache-vr-cloud_'.((isset($_GET['is_preview']) && $_GET['is_preview']==1)?'pre_':''),
        ],
        'urlManager'=>array(
            'enablePrettyUrl' => true, //对url进行美化
            'showScriptName' => false,//隐藏index.php
            'suffix' => '.html',//后缀
            'enableStrictParsing'=>FALSE,//不要求网址严格匹配，则不需要输入rules
            'rules' => [
            ]//网址匹配规则
        ),
    ],
    'modules' => [
        'redactor' => 'yii\redactor\RedactorModule',
    ],
];
