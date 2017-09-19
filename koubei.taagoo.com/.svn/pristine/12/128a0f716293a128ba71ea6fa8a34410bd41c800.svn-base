<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        <meta charset="UTF-8">
        <title><?=$headLine->title?></title>
        <link rel="stylesheet" type="text/css" href="/css/common.css"/>
        <link rel="stylesheet" type="text/css" href="/css/frontend_index.css"/>
        <link rel="stylesheet" type="text/css" href="/css/swiper-3.3.1.min.css"/>
        <link rel="stylesheet" type="text/css" href="/css/animate.min.css"/>
    </head>
    <body class="headlines-page-body">
       <!--  <header class="headlines-head" data-role="header">
            <button class="headlines-hd-back"></button>
            <button class="headlines-hd-more"></button>
        </header> -->
        <div class="headlines-body">
            <h1 class="text-over"><?=$headLine->title?></h1>
            <h5 class="text-over"><?=$headLine->pub_time?> 来自<?=$headLine->source?></h5>
            <img src="<?=Yii::$app->params['pano_format_domain'].$headLine->thumb_path?> "/>
            <?=$headLine->content?>
            <div class="turijian-read-box">
                <h5>推荐阅读</h5>
                <ul class="turijian-read-list">
                    <?php
                    foreach($headLineList as $key =>$item){
                    ?>
                    <li>
                        <a class="flex-box" href='<?=Yii::$app->urlManager->createUrl(['scenic/scenic/toutiao-detail','id'=>$item->id])?>'>
                            <img src="<?=Yii::$app->params['pano_format_domain'].$item->thumb_path?> "/>
                            <div class="flex1 read-right-box">
                                <p><?=$item->title?></p>
                                <span class="text-over"><?=$item->pub_time?> 来自<?=$item->source?></span>
                            </div>
                        </a>
                    </li>
                    <?php
                    }
                    ?>
                </ul>
            </div>
        </div>
    </body>
</html>
