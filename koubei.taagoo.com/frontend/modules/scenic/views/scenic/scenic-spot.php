<?php
use common\models\Panoramic;
/* @var $this yii\web\View */
/* @var $shop common\models\KoubeiServiceMarketOrder */
/* @var $model common\models\Panoramic */
/* @var $scenic common\models\Scenic */
/* @var $headlines array */
/* @var $activity array */
?>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <title><?=$scenicSpot->title?></title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta content="no-cache, no-store, must-revalidate" http-equiv="Cache-Control" />
    <meta content="no-cache" http-equiv="Pragma" />
    <meta content="0" http-equiv="Expires" />
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <link rel="stylesheet" href="/pano_player/custom/css/response.css">
    <link rel="stylesheet" href="/pano_player/custom/css/redefine.css">
    <link rel="stylesheet" href="/pano_player/alivideo/alivideo.css" />
    <link rel="stylesheet" type="text/css" href="/css/common.css"/>
    <link rel="stylesheet" type="text/css" href="/css/frontend_index.css"/>
    <link rel="stylesheet" type="text/css" href="/css/swiper-3.3.1.min.css"/>
    <link rel="stylesheet" type="text/css" href="/css/animate.min.css"/>
    <style>
        @-ms-viewport { width:device-width; }
        @media only screen and (min-device-width:800px) { html { overflow:hidden; } }
        html { height:100%; }
        body { height:100%; overflow:hidden; margin:0; padding:0; font-family:microsoft yahei, Helvetica, sans-serif;  background-color:#000000; }
    </style>
    <script>
        var pageObj = {
            pano_id:'<?=$model->id?>',
            pano_json_url:'<?=Yii::$app->urlManager->createUrl(['scenic/scenic/pano-json'])?>',
            base_xml_url:'<?=Yii::$app->urlManager->createUrl(['scenic/scenic/play-xml','id'=>$model->id])?>',
            login_id:'',
            login_url:'<?= urlencode(Yii::$app->request->hostInfo.Yii::$app->request->getUrl())?>',
            login_avatar:'',
            do_comment_url:'<?=Yii::$app->urlManager->createUrl(['/user-panoramic/do-comment','id'=>$model->id])?>',
            is_praise:''
        };
    </script>
    <script language="JavaScript" type="text/javascript" src="/pano_player/custom/js/jquery-1.9.1.js"></script>
    <script language="JavaScript" type="text/javascript" src="/pano_player/custom/js/common.js"></script>
    <script language="JavaScript" type="text/javascript" src="/pano_player/custom/js/vrshow.js"></script>
    <script language="JavaScript" type="text/javascript" src="/pano_player/tour.js"></script>
</head>
<body>

<div id="pano" style="position: absolute;width:100%; height:100%;"></div>

<header class="head" data-role="header">
    <!-- <div class="back-box"> -->
    <button class="back-btn-base" data-rel="back" type="button" data-add-back-btn="true" >口碑</button>
    <div class="headlines-box">
        <div>
            <h5>景区头条</h5>
            <div class="swiper-container" id="toutiao-sw">
                <div class="swiper-wrapper">
                    <?php foreach ($headlines as $key => $headline):?>
                        <?php if($key > 4){break;}?>
                        <div class="swiper-slide"><?= $headline['title']?></div>
                    <?php endforeach;?>
                </div>
            </div>
        </div>
    </div>
    <button class="more-btn-base" type="button"></button>

    <!-- </div> -->
</header>

<div class="btn-grp-l">
    <a class="logo-link" href="#"><img src="/images/logo1.png" /></a>
    <div class="music-box">
        <button type="button"  class="music-btn" href="#"><img src="/images/music.png" /></button>
        <ul class="music-list" style="display: none;">
            <li>中文</li>
            <li>English</li>
        </ul>
    </div>
</div>
<div class="btn-grp-r">
    <a class="hongbao-link" href="#"><img src="/images/hongbao.png" /></a>
    <button class="map-btn" href="#"><img src="/images/map-tn.png" /></button>
</div>
<button class="cn-button" id="cn-button"></button>
<!--<div class="component">-->
<div class="manu-list hide">
    <ul>
        <li class="businessmen-btn"><img src="/images/tuijianshangjia.png"></li>
        <li class="tese-activity-btn"><img src="/images/tesehuodong.png"></li>
        <li class="vr-btn"><img src="/images/vr.png"></li>
        <li class="theme-btn"><img src="/images/zhutituijian.png"></li>
        <li class="public-btn"><a href=""><img src="/images/gonggongsheshi.png"></a></li>
    </ul>
</div>
<!--</div>-->
<!--景点-->
<div class="base-bottom scenic-spot-bottom" style="display: none;">
    <div class="bottom-top">
        <button class="swiper-down-btn" id="scenic-spot-sw-btn" type="button" ></button>
        <div class="base-addr flex-box scenic-spot-addr">
            <h5 class="text-over">三里屯太古里</h5>
        </div>
    </div>
    <div class="line"></div>
    <div class="scenic-spot-detial">
        <b>景点介绍：</b>
        <p>什刹海指前海、后海和西海三个湖泊及临近地区，这里拥有大片优美的湖面，也是北京著名的一片历史街区，众多名人故居、王府等古迹散落其中，还有贴近老百...生活的各类美食，后海酒吧街更是京城夜生活的老牌胜地。夏天来坐游船初到什刹海，第一眼一定被大片潋艳的湖光所吸引。...垂柳毵毵，远山秀色如黛，风光绮丽，为燕京胜...之一。今天，这里仍旧保存着十分难得的自然景观和人文胜迹交相辉映的历史风貌，宋庆龄故居、郭沫若故居、恭王府花园、广化寺、火神庙、钟鼓楼和银锭桥等古迹将什刹海点缀得美丽灿烂。
            近年来，什刹海酒吧街已成为京城夜色中最热闹的地方之一。这里还聚集着众多北京风味的特色餐厅。你可以品酒泛舟，览湖光粼粼，或徜徉两岸，听杨柳婆娑，或搜寻美食，尝御膳家宴，或投宿胡同人家品着原汁的京味儿。</p>
        <button class="show-all-btn">查看全部 <img src="/images/all-down.png"/></button>
    </div>
    <div class="swiper-box" style="background: #fff;">
        <div class="swiper-container" id="scenic-spot-list">
            <ul class="swiper-wrapper scenic-spot-sw-list">
                <li class="swiper-slide"><img src="/images/scene-img.png"><p class="text-over">阿迪专卖店</p></li>
                <li class="swiper-slide"><img src="/images/scene-img.png"><p class="text-over">阿迪专卖店9</p></li>
                <li class="swiper-slide"><img src="/images/scene-img.png"><p class="text-over">阿专卖店</p></li>
                <li class="swiper-slide"><img src="/images/scene-img.png"><p class="text-over">迪专卖店</p></li>
                <li class="swiper-slide"><img src="/images/scene-img.png"><p class="text-over">阿迪专卖店0</p></li>
                <li class="swiper-slide"><img src="/images/scene-img.png"><p class="text-over">阿迪专卖店1</p></li>
                <li class="swiper-slide"><img src="/images/scene-img.png"><p class="text-over">阿迪专卖店2</p></li>
                <div class="swiper-pagination"></div>
            </ul>
        </div>
    </div>
</div>
<!--场景-->
<div class="base-bottom scene-bottom" style="display: none;">
    <div class="bottom-top">
        <button class="swiper-down-btn" id="scenes-sw-btn"  type="button" ></button>
        <div class="swiper-container" id="scenes-list">
            <ul class="swiper-wrapper scenes-sw-list">
                <li class="swiper-slide"><img src="/images/scene-img.png"><p class="text-over">阿迪专卖店</p></li>
                <li class="swiper-slide"><img src="/images/scene-img.png"><p class="text-over">阿迪专卖店9</p></li>
                <li class="swiper-slide"><img src="/images/scene-img.png"><p class="text-over">阿专卖店</p></li>
                <li class="swiper-slide"><img src="/images/scene-img.png"><p class="text-over">迪专卖店</p></li>
                <li class="swiper-slide"><img src="/images/scene-img.png"><p class="text-over">阿迪专卖店0</p></li>
                <li class="swiper-slide"><img src="/images/scene-img.png"><p class="text-over">阿迪专卖店1</p></li>
                <li class="swiper-slide"><img src="/images/scene-img.png"><p class="text-over">阿迪专卖店2</p></li>
                <div class="swiper-pagination"></div>
            </ul>
        </div>
        <div class="line"></div>
    </div>
    <div class="base-addr flex-box scene-addr">
        <img class="bus-cir-img" src="/images/shangquan-name.png">
        <div class="flex1">
            <h5>三里屯太古里</h5>
            <p class="text-over">朝阳区三里屯路19号院</p>
        </div>
        <button class="by-car-btn" type="button"> 打车去</button>
    </div>
</div>
<!--公共部分 头条，景区信息等-->
<div class="base-bottom base-high-bottom">
    <div class="bottom-top">
        <button class="swiper-down-btn" id="base-high-sw-btn" type="button" ></button>
    </div>
    <div class="base-addr flex-box base-high-addr">
        <img class="bus-cir-img" src="<?= $scenic->getThumb()?>">
        <div class="flex1">
            <h5><?= $scenic->title?></h5>
            <p class="text-over"><?= $scenic->address_info?></p>
        </div>
        <button class="by-car-btn" type="button" onclick="location.href='https://common.diditaxi.com.cn/general/webEntry#/'"> 打车去</button>
    </div>
    <div class="base-high-bottom-box">
        <!--头条-->
        <div class="headlines-show-box">
            <h2>景区头条</h2>
            <ul class="headlines-list">
                <?php foreach ($headlines as $headline):?>
                    <li class="flex-box">
                        <a class="flex-box" href="<?= Yii::$app->urlManager->createUrl(['scenic/scenic/toutiao-detail','id'=> $headline['id']])?>" data-ajax="false">
                            <img src="<?= Yii::$app->params['alioss']['endpoint'].'/'.$headline['thumb_path'];?>"/>
                            <div class="flex1 flex-box">
                                <div class="headlines-detail">
                                    <h5><?= $headline['title']?></h5>
                                    <p class="headlines-link"><?= $headline['source']?><span><?= $headline['pub_time']?></span></p>
                                    <div class="headlines-time"><?= $headline['content']?></div>
                                </div>
                                <button class="headlines-more"></button>
                            </div>
                        </a>
                    </li>
                <?php endforeach;?>
            </ul>
        </div>
        <!--景区信息-->
        <div class="scenic-inf-box">
            <div class="scenic-inf-section">
                <p class="inf-base-tip"><img src="/images/scenic-time.png"/><b>开放时间：</b>全天开放</p>
                <p class="inf-base-tip"><img src="/images/scenic-ticket.png"/><b>门票价格：</b>免费</p>
                <p class="inf-base-tip inf-base-tip-last"><img src="/images/scenic-layer.png"/><b>景点级别：</b>AAAA</p>
            </div>
            <div class="scenic-inf-section">
                <h5 class="inf-title">景点介绍：</h5>
                <p class="inf-detial scenic-introduction">什刹海也写作“十刹海”，四周原有十座佛寺，故有此称。随着时间发展逐渐形成西海﹑后海﹑前海，三海水道相通。自清代起就成为游乐消夏之所。三海碧波荡漾什刹海也写作“十刹海”，四周原有十座佛寺，故有此称。随着时间发展逐渐形成西海﹑后海﹑前海，三海水道相通。自清代起就成为游乐消夏之所。三海碧波荡漾</p>
                <button class="show-all-inf-btn">查看全部 <img src="/images/all-down.png"/></button>
            </div>
            <div class="scenic-inf-section">
                <h5 class="inf-title">交通信息：</h5>
                <p class="inf-detial">乘坐地铁6号线到北海北站下车或乘坐5、60、107、124路等公交车到鼓楼站下车。乘坐13、107、111、118、609、623路在北海北门下车，沿着前海向北步行可到达。公交地安门外站——60路; 82路; 90内; 90外; 107路; 124路; 204夜班车内; 204夜班车外；</p>
            </div>
        </div>
        <!--特色活动-->
        <div class="activity-box">
            <h2>特色活动</h2>
            <ul class="headlines-list">
                <?php foreach ($activity as $active)?>
                <li class="flex-box">
                    <a class="flex-box" href="<?= Yii::$app->urlManager->createUrl(['scenic/scenic/activity-detail','id' => $active['id']])?>" data-ajax="false">
                        <img src="<?= Yii::$app->params['alioss']['endpoint'].'/'.$active['thumb_path'];?>"/>
                        <div class="flex1 flex-box">
                            <div class="headlines-detail">
                                <h5><?= $active['title']?></h5>
                                <p class="headlines-time"><?= $active['introduce']?></p>
                            </div>
                            <button class="headlines-more"></button>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <!--推荐商家-->
        <div class="businessmen-box">
            推荐商家
        </div>
        <!--主题推荐-->
        <div class="theme-box">
            主题推荐
        </div>
        <!--公共设施-->
        <!--<div class="public-box">
            公共设施
        </div>-->
    </div>
</div>

</body>

<script language="JavaScript" type="text/javascript" src="/pano_player/custom/js/object.js"></script>
<script type="text/javascript">
    $("button").attr('data-role','none');
    $("select").attr('data-role','none');
</script>
<script type="text/javascript" src="/pano_player/alivideo/alivideo.js"></script>
<script src="/js/jquery.mobile-1.3.2.min.js"></script>
<script src="/js/swiper-3.3.1.jquery.min.js"></script>
<script src="/js/swiper.animate1.0.2.min.js"></script>
<script src="/js/modile-scenic.js" type="text/javascript" charset="utf-8"></script>
</html>