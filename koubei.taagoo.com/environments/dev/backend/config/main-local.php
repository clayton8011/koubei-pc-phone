<?php

$config = [
    'components' => [
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => '',
        ],
    ],
];

if (!YII_ENV_TEST) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
        'generators' => [ //here
            'crud' => [ //name generator
                'class' => 'my_gii\backend\crud\Generator',
                //'class' => 'yii\gii\generators\crud\Generator', //class generator
                'templates' => [ //setting for out templates
                    'myCrud' =>Yii::getAlias('@common').'\..\my_gii\backend\crud\default', //name template => path to template
                ]
            ],
            'model' =>[ //name generator
                'class' => 'my_gii\backend\model\Generator',
                'templates' => [ //setting for out templates
                    'myCrud' =>Yii::getAlias('@common').'\..\my_gii\backend\model\default', //name template => path to template
                ]
            ],
        ],
    ];
}

return $config;
