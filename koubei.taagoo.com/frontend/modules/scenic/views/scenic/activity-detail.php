<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <meta charset="UTF-8">
    <title><?=$activity->title?></title>
    <link rel="stylesheet" type="text/css" href="/css/common.css"/>
    <link rel="stylesheet" type="text/css" href="/css/frontend_index.css"/>
    <link rel="stylesheet" type="text/css" href="/css/swiper-3.3.1.min.css"/>
    <link rel="stylesheet" type="text/css" href="/css/animate.min.css"/>
</head>
<body>
<header class="head activity-head" data-role="header">
    <!-- <div class="back-box"> -->
<!--     <button class="back-btn-base" data-rel="back" type="button" data-add-back-btn="true" >返回</button>
    <div class="headlines-box" style="background: none;height: 2.5rem;">
    </div>
    <button class="more-btn-base" type="button"></button> -->

    <!-- </div> -->
</header>
<div class="activity-body">
    <div class="activity-banner">
        <img src="<?=Yii::$app->params['pano_format_domain'].$activity->thumb_path?>"/>
    </div>
    <div class="base-addr flex-box base-high-addr" style="box-shadow: 0 1px 4px #f2f1f1;height: 6.5rem;padding: 1rem 0 1rem 4.2%;">
        <img class="bus-cir-img" style="width: 4.5rem;height: 4.5rem;margin-right: 1.25rem;" src="<?=Yii::$app->params['pano_format_domain'].$activity->thumb_path?>">
        <div class="flex1">
            <h5><?=$scenic->title?></h5>
            <p class="text-over"><?=$activity->address_info?></p>
        </div>
        <button class="by-car-btn" type="button" onclick="location.href='https://common.diditaxi.com.cn/general/webEntry#/'"> 打车去</button>
    </div>
    <div class="activity-inf-box">
        <div>
            <div class="activity-section">
                <p class="inf-base-tip"><img src="/images/scenic-time.png"/><b>开放时间：</b><?=$activity->scenic_time?></p>
                <p class="inf-base-tip"><img src="/images/scenic-ticket.png"/><b>门票价格：</b><?=$activity->ticket_price?></p>
                <p class="inf-base-tip inf-base-tip-last" id="to-line-show"><img src="/images/about-line.png"/><b>相关路线</b><img class="line-more" src="/images/tourtiao-more.png"/></p>
            </div>
            <div class="activity-gr-line"></div>
        </div>
        <div>
            <div class="activity-section">
                <h5>活动介绍</h5>
                <p style="line-height: 1.8;color: #222222;"> <?=$activity->introduce?></p>
            </div>
            <div class="activity-gr-line"></div>
        </div>
        <div>
            <div class="activity-section" style="padding-top:1.25rem ;">
                <h5>其他活动</h5>
                <div class="swiper-container" id="other-activity-list">
                    <div class="swiper-wrapper">
                    <?php
                        foreach ($scenicList as $key => $item) {
                    ?>
                         <div class="swiper-slide"><a href="<?=Yii::$app->urlManager->createUrl(['scenic/scenic/activity-detail','id'=>$item->id])?>"><img src="<?=Yii::$app->params['pano_format_domain'].$item->thumb_path?>"/><p><?=$item->title?></p></a></div>
                    <?php
                        }
                    ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="activity-modal">
    <div class="ac-modal-conetent">
        <div class="ac-modal-box">
            <div class="ac-modal-head">相关线路</div>
            <div class="ac-moal-detial">
                <?=$activity->traffic?>
            </div>
        </div>
        <button class="ac-close-btn"></button>
    </div>
</div>
<div id="line-box" class="activity-modal" style="display: none;">
	<div class="ac-modal-conetent">
		<div class="ac-modal-box">
			<div class="ac-modal-head">相关线路</div>
			<div class="ac-moal-detial">
				<h5>1.公交</h5>
				<p>地安门外站——60路; 82路; 90内; 90外; 107路; 124路; 204夜班车内; 204夜班车外；</p>
				<p>北海北门站——13路; 42路; 90内; 90外; 107路; 111路; 118路; 204夜班车内; 204夜班车外; 609路; 612路; 623路; 701路；</p>
				<p class="last-ac-de-row">地安门内站——5路; 111路; 124路; 210路夜班车; 609路</p>
				<h5>2.地铁</h5>
				<p class="last-ac-de-row">地铁6号线——北海北门站</p>
			</div>
		</div>
		<button class="ac-close-btn" data-role="none"></button>
	</div>
</div>
<script src="/js/jquery-2.2.1.min.js"></script>
<!--去除JQ M默认行为-->
<!--<script type="text/javascript">
    $("button").attr('data-role','none');
    $("select").attr('data-role','none');
</script>
<script src="/js/jquery.mobile-1.3.2.min.js"></script>-->
<script src="/js/swiper-3.3.1.jquery.min.js"></script>
<script src="/js/swiper.animate1.0.2.min.js"></script>
<script src="/js/modile-scenic.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
	$(function(){
		//路线弹层
				$("#to-line-show").on('touchstart',function(){
					$("#line-box").fadeIn();
					return false;
				})
				$(".ac-close-btn").on('touchstart',function(){
					$("#line-box").fadeOut();
					return false;
				})
	})
</script>
</body>

</html>
