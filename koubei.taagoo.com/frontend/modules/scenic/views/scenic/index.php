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
    <title><?= $scenic->title?></title>
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
    <link rel="stylesheet" type="text/css" href="/css/frontend_index.css?v=<?=time()?>"/>
    <link rel="stylesheet" type="text/css" href="/css/swiper-3.3.1.min.css"/>
    <link rel="stylesheet" type="text/css" href="/css/animate.min.css"/>
    <link rel="stylesheet" type="text/css" href="/css/scrollbar.css"/>
    <link rel="stylesheet" type="text/css" href="/css/jquery.rateyo.min.css"/>
    <style>
        @-ms-viewport { width:device-width; }
        @media only screen and (min-device-width:800px) { html { overflow:hidden; } }
        html { height:100%; }
        body { height:100%; overflow:hidden; margin:0; padding:0; font-family:microsoft yahei, Helvetica, sans-serif;  background-color:#000000; }
        .bottom-mini-height{
            height: 6.9rem;
        }
        .base-bottom{
            display:none;
        }
        div.spot-content-class {
        	display: block;
        }
        .content-class{
            display: none;
        }
        .content-class .scenic-inf-box{
            display: block;
        }
        .btn-grp-r .vrshow_radar_btn{
            position: relative;
            right: initial;
             top: auto;
             margin-top: 0;
             background: none no-repeat;
             z-index: 800;
             display: none;
             width: auto;
             height: auto;
             cursor: pointer;
            background-size: 0;
        }
    </style>

</head>
<body>

<div id="pano" style="position: absolute;width:100%; height:100%;display: <?= $scenic->type == 1 ? 'block' : 'none' ?>;"></div>

<div id="plane" style="position: absolute;width:100%; height:100%;display: <?= $scenic->type == 2 ? 'block' : 'none' ?>;">
    <img src="" alt="" index="-1">
</div>
<div class="pano-bg-box"></div>
<header class="head" data-role="header">
    <!-- <div class="back-box"> -->
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
    <!-- </div> -->
</header>

<div class="btn-grp-l">
    <a class="logo-link" href="#"><img src="/images/logo1.png" /></a>
    <div class="music-box">
        <button type="button" style="display: none;"  class="music-btn" href="#"><img src="/images/music.png" /></button>
        <ul class="music-list" style="display: none;"></ul>
    </div>
</div>
<div class="btn-grp-r">
    <a class="hongbao-link" href="#"><img src="/images/hongbao.png" /></a>
    <button class="map-btn vrshow_radar_btn"  style="display: none;" href="javascript:;" onClick="closeOpen('map');toggleKrpSandTable()"><img src="/images/map-tn.png" /></button>
</div>
<button class="cn-button" id="cn-button"></button>
<!--<div class="component">-->
<div class="manu-list hide">
    <ul>
        <li class="businessmen-btn"><img src="/images/tuijianshangjia.png"></li>
	    <li class="theme-btn"><img src="/images/jingquxinxi.png"></li>
	    <li class="tese-activity-btn"><img src="/images/tesehuodong.png"></li>
	    <li class="public-btn"><a href=""><img src="/images/gonggongsheshi.png"></a></li>
    </ul>
</div>
<!--</div>-->

<!--景区信息start-->
<div class="base-bottom base-high-bottom bottom-mini-height" id="index-bottom">
	<div class="tapSlide-all-box">
	    <div class="bottom-top">
	        <button class="swiper-down-btn swiper-up-btn" type="button" ></button>
	    </div>
	    <div class="base-addr flex-box base-high-addr base-slide-box">
	        <img class="bus-cir-img" src="<?= $scenic->getThumb()?>">
	        <div class="flex1">
	            <h5><?= $scenic->title?></h5>
	            <p class="text-over"><?= $scenic->address_info?></p>
	        </div>
	        <button class="by-car-btn" type="button" onclick="location.href='alipays://platformapi/startapp?appId=20000778&endName=<?= $scenic->title?>&endAddr=<?= $scenic->title?>&longitude=<?= $scenic->lng?>&latitude=<?= $scenic->lat?>&channel=71322'"> 打车去</button>
	    </div>
	</div>
    <div class="base-high-bottom-box content-class">



        <div class="scenic-inf-box">
            <div class="scenic-inf-section">
            <p class="inf-base-tip flex-box"><img src="/images/scenic-time.png"/><b>开放时间：</b><span class="flex1"><?php foreach ($scenicNotice as $key=>$item){if($item->title=='开放时间'){echo $item->content;break;}}?></span></p>
            <p class="inf-base-tip  flex-box"><img src="/images/scenic-ticket.png"/><b>门票价格：</b><span class="flex1"><?php foreach ($scenicNotice as $key=>$item){if($item->title=='门票价格'){echo $item->content;break;}}?></span></p>
            <p class="inf-base-tip inf-base-tip-last  flex-box"><img src="/images/scenic-layer.png"/><b>景点级别：</b><span class="flex1"><?=($scenic->scenic_level==1)?'AAA':($scenic->scenic_level==2?'AAAA':'AAAAA')?></span></p>
        </div>
            <?php
                foreach ($scenicNotice as $key=>$item){
                    if(in_array($item->title, ['开放时间','门票价格'])){
                        continue;
                    }
            ?>
                <div class="scenic-inf-section">
                    <h5 class="inf-title"><?=$item->title?>：</h5>
                    <p class="inf-detial scenic-introduction"><?=$item->content?></p>
                    <?php if($item->title=='景区介绍'){?>
                        <button class="show-all-inf-btn">查看全部 <img src="/images/all-down.png"></button>
                    <?php }?>
                </div>
            <?php
                }
            ?>
        </div>
    </div>
</div>
<!--景区信息end-->



<!--景区景点场景start-->
<div class="base-bottom scene-bottom" id="scenic-scene-bottom" style="display: none;">
    <div class="bottom-top">
        <div class="swiper-container" id="scenes-list">
            <ul class="swiper-wrapper scenes-sw-list">
                <?php foreach($scenicSpotList as $key=>$item){?>
                <li class="swiper-slide" data-spot-id="<?=$item->id?>" data-panoramic-id="<?=$item->panoramic_id?>"><img src="<?=$item->getThumb()?>"><p class="text-over"><?=$item->title?></p></li>
                <?php }?>
                <div class="swiper-pagination"></div>
            </ul>
        </div>
        <div class="line"></div>
    </div>
    <div class="base-addr flex-box base-high-addr">
        <img class="bus-cir-img" src="<?= $scenic->getThumb()?>">
        <div class="flex1">
            <h5><?= $scenic->title?></h5>
            <p class="text-over"><?= $scenic->address_info?></p>
        </div>
        <button class="by-car-btn" type="button" onclick="location.href='alipays://platformapi/startapp?appId=20000778&endName=<?= $scenic->title?>&endAddr=<?= $scenic->title?>&longitude=<?= $scenic->lng?>&latitude=<?= $scenic->lat?>&channel=71322'"> 打车去</button>
    </div>
</div>
<!--景区景点场景end-->



<!--头条信息start-->
<div class="base-bottom base-high-bottom" id="scenic-toutiao" style="display:none;">
	<div class="tapSlide-all-box">
	    <div class="bottom-top">
	        <button class="swiper-down-btn" type="button" ></button>
	    </div>
	     <div class="base-addr flex-box base-high-addr base-slide-box">
	        <img class="bus-cir-img" src="<?= $scenic->getThumb()?>">
	        <div class="flex1">
	            <h5><?= $scenic->title?></h5>
	            <p class="text-over"><?= $scenic->address_info?></p>
	        </div>
	        <button class="by-car-btn" type="button" onclick="location.href='alipays://platformapi/startapp?appId=20000778&endName=<?= $scenic->title?>&endAddr=<?= $scenic->title?>&longitude=<?= $scenic->lng?>&latitude=<?= $scenic->lat?>&channel=71322'"> 打车去</button>
	    </div>
    </div>
    <div class="base-high-bottom-box content-class" style="height: 100%;">
        <!--头条-->
        <div class="headlines-show-box" style="display:block;">
            <h2>景区头条</h2>
            <ul class="headlines-list" style="display: block;">
                <?php if ($headlines) : ?>
                <?php foreach ($headlines as $headline):?>
                    <li>
                        <a class="flex-box" href="<?= Yii::$app->urlManager->createUrl(['scenic/scenic/toutiao-detail','id'=> $headline['id']])?>" data-ajax="false">
                            <img src="<?= Yii::$app->params['alioss']['endpoint'].'/'.$headline['thumb_path'];?>"/>
                            <div class="flex1 flex-box">
                                <div class="headlines-detail">
                                    <h5><?= $headline['title']?></h5>
                                    <p class="headlines-link"><?= $headline['source']?><span><?= $headline['pub_time']?></span></p>
                                    <div class="headlines-time"><?= mb_substr(strip_tags($headline['content']),0,20)?></div>
                                </div>
                                <button class="headlines-more" style="display: block;min-height: 7.5rem;"></button>
                            </div>
                        </a>
                    </li>
                <?php endforeach;?>
                <?php endif;?>
            </ul>
        </div>
    </div>
</div>
<!--头条信息end-->

<!--特色活动start-->
<div class="base-bottom base-high-bottom bottom-mini-height" id="activity-bottom">
	<div class="tapSlide-all-box">
	    <div class="bottom-top">
	        <button class="swiper-down-btn swiper-up-btn" type="button" ></button>
	    </div>
	    <div class="base-addr flex-box base-high-addr base-slide-box">
	        <img class="bus-cir-img" src="<?= $scenic->getThumb()?>">
	        <div class="flex1">
	            <h5><?= $scenic->title?></h5>
	            <p class="text-over"><?= $scenic->address_info?></p>
	        </div>
	        <button class="by-car-btn" type="button" onclick="location.href='alipays://platformapi/startapp?appId=20000778&endName=<?= $scenic->title?>&endAddr=<?= $scenic->title?>&longitude=<?= $scenic->lng?>&latitude=<?= $scenic->lat?>&channel=71322'"> 打车去</button>
	    </div>
    </div>
    <div class="base-high-bottom-box content-class">
        <div class="activity-box" style="display: block;">
            <h2>特色活动</h2>
            <ul class="headlines-list">
                <?php if ($activity):?>
                <?php foreach ($activity as $active):?>
                <li>
                    <a class="flex-box" href="<?= Yii::$app->urlManager->createUrl(['scenic/scenic/activity-detail','id' => $active['id']])?>" data-ajax="false">
                        <img src="<?= Yii::$app->params['alioss']['endpoint'].'/'.$active['thumb_path'];?>"/>
                        <div class="flex1 flex-box">
                            <div class="headlines-detail activity-detail">
                                <h5><?= $active['title']?></h5>
                                <p class="headlines-time activity-time"><?= $active['introduce']?></p>
                            </div>
                            <button class="headlines-more"></button>
                        </div>
                    </a>
                </li>
                <?php
                    endforeach; endif;
                ?>
            </ul>
        </div>
    </div>
</div>
<!--特色活动end-->


<!--景点详情start-->
<div class="base-bottom scenic-spot-bottom" id="spot-detail-bottom" style="display: none;">
	<div class="tapSlide-all-box">
	    <div class="bottom-top">
	        <button class="swiper-down-btn" type="button" ></button>
	        <div class="base-addr flex-box scenic-spot-addr">
	            <h5 class="text-over"></h5>
	        </div>
	        <button class="spot-back-btn" type="button"></button>
	    </div>
    </div>
    <div class="line spot-line"></div>
    <div class="scenic-spot-detial content-class spot-content-class">
        <b>景点介绍：</b>
        <p></p>
        <button class="show-all-btn">查看全部 <img src="/images/all-down.png"/></button>
    </div>
    <div class="swiper-box" style="background: #fff;">
        <div class="swiper-container" id="scenic-spot-list">
            <ul class="swiper-wrapper scenic-spot-sw-list">

<!--                <li class="swiper-slide"><img src="/images/scene-img.png"><p class="text-over">阿迪专卖店2</p></li>-->
                <div class="swiper-pagination"></div>
            </ul>
        </div>
    </div>
    <div style="background: #fff;position: absolute;bottom: 0;width: 100%;height:4rem;z-index: -1;"></div>
</div>
<!--景点详情end-->


<!--主题推荐-->
<div class="base-bottom base-high-bottom bottom-mini-height" id="zhutituijian-bottom">
	<div class="tapSlide-all-box">
	    <div class="bottom-top">
	        <button class="swiper-down-btn swiper-up-btn" type="button" ></button>
	    </div>
	    <div class="base-addr flex-box base-high-addr base-slide-box">
	        <img class="bus-cir-img" src="<?= $scenic->getThumb()?>">
	        <div class="flex1">
	            <h5><?= $scenic->title?></h5>
	            <p class="text-over"><?= $scenic->address_info?></p>
	        </div>
	        <button class="by-car-btn" type="button" onclick="location.href='alipays://platformapi/startapp?appId=20000778&endName=<?= $scenic->title?>&endAddr=<?= $scenic->title?>&longitude=<?= $scenic->lng?>&latitude=<?= $scenic->lat?>&channel=71322'"> 打车去</button>
	    </div>
    </div>
    <div class="base-high-bottom-box content-class">
        <div class="activity-box" style="display: block;">
            <!-- <img src="/images/zhuti.png"> -->
        </div>
    </div>
</div>
<!--主题推荐end-->

<!--推荐商家 好店-->
<div class="base-bottom base-high-bottom bottom-mini-height" id="haodian-bottom">
	<div class="tapSlide-all-box">
	    <div class="bottom-top">
	        <button class="swiper-down-btn swiper-up-btn" type="button" ></button>
	    </div>
	    <div class="base-addr flex-box base-high-addr base-slide-box">
	        <img class="bus-cir-img" src="<?= $scenic->getThumb()?>">
	        <div class="flex1">
	            <h5><?= $scenic->title?></h5>
	            <p class="text-over"><?= $scenic->address_info?></p>
	        </div>
	        <button class="by-car-btn" type="button" onclick="location.href='alipays://platformapi/startapp?appId=20000778&endName=<?= $scenic->title?>&endAddr=<?= $scenic->title?>&longitude=<?= $scenic->lng?>&latitude=<?= $scenic->lat?>&channel=71322'"> 打车去</button>
	    </div>
    </div>
    <div class="base-high-bottom-box content-class">
        <div class="activity-box" style="display: block;">
<!--        	<div class="businessmen-head flex-box">-->
<!--				<div>-->
<!--					<input type="text" name="" id="" value="" placeholder="搜一搜西式快餐" />-->
<!--				</div>-->
<!--			</div>-->
			<ul class="bus-sel-grp flex-box">
				<li class="food-btn">全部分类</li>
				<li class="near-btn">附近</li>
				<li class="sort-btn">智能排序</li>
<!--				<li class="filter-btn">筛选</li>-->
			</ul>
        	<div id="wrapper">
        		<div id="scroller">
			    	<ul class="businessmen-list" id="thelist"></ul>
		        	<div id="pullUp">
			            <span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多...</span>
			        </div>
                </div>
            </div>
            <div class="select-show-box">
				<div class="food-box">
					<div class="clearfix">
						<div class="foodbox-left">
							<ul class="foodbox-left-list" id="first-category">
	                            <li  data-id="0" class="active">全部</li>
	                        </ul>
                        </div>
                        <div class="foodbox-right">
                        	<ul class="foodbox-right-list"  id="second-category"></ul>
                        </div>
					</div>
				</div>
				<div class="near-box">
					<div class="clearfix">
						<ul class="nearbox-left">
							<li class="active">附近</li>
<!--							<li>热门商圈</li>-->
<!--							<li>朝阳区</li>-->
<!--							<li>海淀区</li>-->
						</ul>
						<ul class="nearbox-right">
							<li data-val="">全部</li>
							<li data-val="1">1km</li>
							<li data-val="3">3km</li>
							<li data-val="5">5km</li>
							<li data-val="10">10km</li>
						</ul>
					</div>
				</div>
				<div class="sort-box">
					<ul class="sort-list">
						<li data-val="" class="active">智能排序</li>
						<li data-val="1">人气优先</li>
						<li data-val="2">离我最近</li>
						<li data-val="3">回头客最多</li>
<!--						<li>我的优惠</li>-->
<!--						<li>畅销单品</li>-->
					</ul>
				</div>
				<div class="filter-box">
					<div class="">
						<div class="filter-list-box">
							<h5>优惠和权益</h5>
							<ul class="sel-offer-list clearfix">
								<li>折扣</li>
								<li>优惠券</li>
								<li>买单立减</li>
								<li>储值卡</li>
							</ul>
							<h5>服务</h5>
							<ul class="sel-server-list clearfix">
								<li>点菜</li>
								<li>排号</li>
								<li>预订</li>
								<li>外卖</li>
								<li>包厢</li>
								<li>无地沟油</li>
								<li>营业中</li>
							</ul>
							<h5>价格</h5>
							<ul class="sel-price-list clearfix">
								<li>50以下</li>
								<li>50-100</li>
								<li>100-300</li>
								<li>300以上</li>
							</ul>
						</div>
							<div class="bus-sel-btngrp-box flex-box">
								<button class="flex1 bus-sel-reset" type="button">重置</button>
								<button class="flex1 bus-sel-confirm" type="button">确定</button>
							</div>
					</div>
				</div>
			</div>
        </div>
    </div>
</div>
<!--推荐商家 好店end-->

<!--特惠 原红包-->
<div class="base-bottom base-high-bottom bottom-mini-height" id="linghongbao-bottom" >
	<div class="tapSlide-all-box">
	    <div class="bottom-top">
	        <button class="swiper-down-btn swiper-up-btn" type="button" ></button>
	    </div>
	    <div class="base-addr flex-box base-high-addr base-slide-box">
	        <img class="bus-cir-img" src="<?= $scenic->getThumb()?>">
	        <div class="flex1">
	            <h5><?= $scenic->title?></h5>
	            <p class="text-over"><?= $scenic->address_info?></p>
	        </div>
	        <button class="by-car-btn" type="button" onclick="location.href='alipays://platformapi/startapp?appId=20000778&endName=<?= $scenic->title?>&endAddr=<?= $scenic->title?>&longitude=<?= $scenic->lng?>&latitude=<?= $scenic->lat?>&channel=71322'"> 打车去</button>
	    </div>
    </div>
    <div class="base-high-bottom-box content-class">
        <div class="offer-box">
			<h2>时下特惠</h2>
			<ul class="offer-list"></ul>
    	</div>
</div>
<!--特惠 原红包end-->



<div class="modal" id="video_player_modal" data-keyboard="false" style="z-index:2002;display:none;background: transparent;position: absolute;width:100%;height:100%;">
    <div class="modal-dialog" style="width: 100%;height: 100%;border-width: 0;">
        <div class="modal-body" style="padding: 0;width: 100%;height: 100%;">
            <div class="prism-player" id="J_prismPlayer" >
                <div class="spotVideoBox" style="width:90%;" id="spotVideoBox"></div>
            </div>
        </div>
    </div>
</div>


<div  id="red-pop"  class="activity-modal" style="display: none;">
            <div class="ac-modal-conetent" style="margin-top:30%;">
                <div class="ac-modal-box"  style="background: none;">
                    <div style="position: absolute;right: 0;width:100px;height:50px;" onclick="$('#red-pop').hide();"></div>
                    <img src="/images/red_lingqu.png"/>
                    <div style="position: absolute;margin-top: -50px;width: 100%;height: 50px;" onclick="$('#red-pop img').attr('src','/images/red_yilingqu.png');setCookie('red',1);" ></div>
                </div>
            </div>
        </div>
</div>

<div class="loading-box">
	<img src="/images/page-loading.gif" alt="" />
</div>
</body>
<script language="JavaScript" type="text/javascript" src="/pano_player/custom/js/jquery-1.9.1.js"></script>
<script language="JavaScript" type="text/javascript" src="/pano_player/custom/js/common.js"></script>
<script language="JavaScript" type="text/javascript" src="/pano_player/tour.js"></script>
<script language="JavaScript" type="text/javascript" src="/pano_player/alivideo/alivideo.js"></script>
<script language="JavaScript" type="text/javascript" src="/pano_player/custom/js/object.js"></script>
<script language="JavaScript" type="text/javascript" src="/js/jquery.rateyo.min.js"></script>
<script type="text/javascript">
    $("button").attr('data-role','none');
    $("select").attr('data-role','none');
</script>
<script type="text/javascript" src="/pano_player/alivideo/alivideo.js"></script>
<script src="/js/jquery.mobile-1.3.2.min.js"></script>
<script src="/js/swiper-3.3.1.jquery.min.js"></script>
<script src="/js/swiper.animate1.0.2.min.js"></script>
<script src="/js/iscroll.js" type="text/javascript" charset="utf-8"></script>
<script src="https://a.alipayobjects.com/g/h5-lib/alipayjsapi/3.0.3/alipayjsapi.inc.min.js"></script>

<script>

    //店铺滚动开始
    var myScroll,
        pullUpEl, pullUpOffset,
        generatedCount = 0;
function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}


function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); //正则匹配
    if(arr=document.cookie.match(reg)){
      return unescape(arr[2]);
    }
    else{
     return null;
    }
}
if(getCookie('red')){
    $('#red-pop img').attr('src','/images/red_yilingqu.png');
}


    var pageObj ={
        callBack:function(json){
            //回调

        }
    };
    //景区对象
    var scenicPageObj = {
        pano_id:'<?=$model->id?>',
        pano_json_url:'<?=Yii::$app->urlManager->createUrl(['scenic/scenic/pano-json'])?>',
        base_xml_url:'<?=Yii::$app->urlManager->createUrl(['scenic/scenic/play-xml','id'=>$model->id])?>',
        login_id:'',
        login_url:'<?= urlencode(Yii::$app->request->hostInfo.Yii::$app->request->getUrl())?>',
        login_avatar:'',
        do_comment_url:'<?=Yii::$app->urlManager->createUrl(['/user-panoramic/do-comment','id'=>$model->id])?>',
        is_praise:''
    };
    //景点对象
    var spotPageObj = {
        pano_id:'<?=$model->id?>',
        pano_json_url:'<?=Yii::$app->urlManager->createUrl(['scenic/scenic/pano-json'])?>',
        base_xml_url:'<?=Yii::$app->urlManager->createUrl(['scenic/scenic/play-xml','id'=>''])?>',
        login_id:'',
        login_url:'<?= urlencode(Yii::$app->request->hostInfo.Yii::$app->request->getUrl())?>',
        login_avatar:'',
        do_comment_url:'<?=Yii::$app->urlManager->createUrl(['/user-panoramic/do-comment','id'=>$model->id])?>',
        is_praise:'',
        callBack:function(json){
            $('#spot-detail-bottom ul.scenic-spot-sw-list').html('');
            if(json.scene_list){
                for (var i=0;i<json.scene_list.length;i++){
                    $('#spot-detail-bottom ul.scenic-spot-sw-list').append('<li class="swiper-slide" data-scene-name="'+json.scene_list[i].sceneName+'"><img src="'+json.scene_list[i].thumbPath+'"><p class="text-over">'+json.scene_list[i].scene_title+'</p></li>');
                }
                if(!$('#scenic-spot-list').is(':hidden')){
                    //景点场景滚动
                    var swiper = new Swiper('#scenic-spot-list', {
                            // pagination: '.swiper-pagination',
                            slidesPerView: 4,
                            paginationClickable: false,
                            spaceBetween: "2.5%",
                            freeMode: true
                        });
                    //景点场景滚动 end
                }
            }
        }
    };
    var thisPageObj = {
        audioObj:null,
        shopPage:1,
        category_id:0,//搜索用
        categoryData:null,
        longitude:'',
        latitude:'',
        nearVal:'',//附近
        sortVal:'',//智能排序
        shopLoading:false,
        materialUrl:'<?=Yii::$app->params['pano_format_domain']?>',
        init:function(){

            $('ul.sort-list li').on('click',function(){
                var dataVal = $(this).attr('data-val');
                if(dataVal==''){
                    $('ul.bus-sel-grp li.sort-btn').tap().html('智能排序');
                }else{
                    $('ul.bus-sel-grp li.sort-btn').tap().html($(this).html());
                }
                thisPageObj.sortVal = dataVal;
                thisPageObj.getShopList(1);
                return false;
            });
            $('ul.nearbox-right li').on('click',function(){
                var dataVal = $(this).attr('data-val');
                if(dataVal==''){
                    $('ul.bus-sel-grp li.near-btn').tap().html('附近');
                }else{
                    $('ul.bus-sel-grp li.near-btn').tap().html($(this).html());
                }
                thisPageObj.nearVal = dataVal;
                thisPageObj.getShopList(1);
                return false;
            });
            ap.getLocation(function(res) {
                //经纬度获取
                if(undefined!=res.longitude && undefined!=res.latitude){
                    thisPageObj.longitude = res.longitude;
                    thisPageObj.latitude = res.latitude;
                }
                thisPageObj.goHaodian();
            });
            //上下按钮公共事件
            $('div.tapSlide-all-box').on('tap',function(event){
            	var event = event || window.event;
            	console.log(event.target);
            	if(event.target.className=="by-car-btn") {
            		location.href='alipays://platformapi/startapp?appId=20000778&endName=<?= $scenic->title?>&endAddr=<?= $scenic->title?>&longitude=<?= $scenic->lng?>&latitude=<?= $scenic->lat?>&channel=71322'
            		return false;
            	}
            	if(event.target.className=="spot-back-btn") {
            		thisPageObj.goScenicScene();
			  		thisPageObj.hideManu();
            		return false;
            	}
            	// thisPageObj.collapseBaseBox(eventObj);
                 var thisBtn = $(this).find('button.swiper-down-btn');
                 var parents_id = thisBtn.parents('div.base-bottom').attr('id');
           		if(thisBtn.hasClass('swiper-up-btn')){
					thisBtn.removeClass('swiper-up-btn');
					thisBtn.parents('div.base-bottom').removeClass('bottom-mini-height');
					thisBtn.parents('div.base-bottom').find('div.content-class').fadeIn();
	                if($("#spot-detail-bottom").hasClass("scenic-show-all")) {
						$("#spot-detail-bottom").removeClass("scenic-short-height scenic-half-height");
						$(".scenic-spot-detial").fadeIn();
					}else{
						$("#spot-detail-bottom").removeClass("scenic-short-height").addClass("scenic-half-height");
						$(".scenic-spot-detial").fadeIn();
					}
            	}else {
                     //头条点击直接显示景区信息
                     // if (parents_id == 'scenic-toutiao') {
                     //     thisPageObj.goScenicInfo();
                     // }else
					if(parents_id=='linghongbao-bottom'){
                      //领红包
                      $("#linghongbao-bottom").addClass("bottom-mini-height");

                	}else 	if(parents_id=='spot-detail-bottom'){
                      //景点展示
                      thisBtn.addClass('swiper-up-btn');
                      $("#spot-detail-bottom").removeClass("scenic-half-height").addClass("scenic-short-height");
                      $(".scenic-spot-detial").fadeOut(50);

                	}else{
                      thisBtn.parents('div.base-bottom').addClass('bottom-mini-height');
                	}
//
                  thisBtn.addClass('swiper-up-btn');
                  thisBtn.parents('div.base-bottom').find('div.content-class').fadeOut(600);
            	}
                 return false;
            });

//			景点信息点击显示全部

			$(".show-all-inf-btn").on('tap',function(){
				thisPageObj.showInfAll(this)
			})

            //头条头部点击，显示头条
            $("#toutiao-sw").on('tap',function(){
                var thisDiv = $('#scenic-toutiao');
                thisPageObj.showButtonCommon(thisDiv);
                $('#scenic-toutiao .content-class').show();
                thisDiv.removeClass('bottom-mini-height');
                return false;
            });

            //右侧菜单图标点击 start

            //好店推荐
            $('li.businessmen-btn').on('tap',function(){
                thisPageObj.goHaodian();
                $('#haodian-bottom button.swiper-down-btn').tap();
                return false;
            });

            //景区介绍
            $('li.theme-btn').on('tap',function(){
                thisPageObj.goScenicInfo();
                $('#index-bottom button.swiper-down-btn').tap();
                return false;
            });


            //主题推荐
            // $('li.theme-btn').on('tap',function(){
            //     thisPageObj.goZhuti();
            //     $('#zhutituijian-bottom button.swiper-down-btn').tap();
            //     return false;
            // });

            //特色活动
            $('li.tese-activity-btn').on('tap',function(){
                thisPageObj.goActivity();
                $('#activity-bottom button.swiper-down-btn').tap();
                return false;
            });
            //景点列表
            $("#cn-button,li.vr-btn").on('tap',function() {
                if ($('div.manu-list').hasClass('opened-nav')) {

                    //隐藏后就显示景区景点选择框
                    thisPageObj.hideManu();
                    thisPageObj.goScenicScene();
                } else {
                    //打开后就显示景区信息
                    thisPageObj.showManu();
                    thisPageObj.goScenicInfo();
                }
                return false;
            });

//			景点返回
//			  $(".spot-back-btn").on('tap',function() {
//			  	console.log("back");
//			  	thisPageObj.goScenicScene();
//			  	thisPageObj.hideManu();
//			  });

            //地图
            $('li.public-btn').on('tap',function(){
                location.href="<?=Yii::$app->urlManager->createUrl(['scenic/scenic/public','shop_id' => $shop->shop_id , 'merchant_pid' => $shop->merchant_pid])?>";
                return false;
            });
            $('a.hongbao-link').on('tap',function(){
                closeOpen();
            	if($("#linghongbao-bottom").is(":hidden")){
            		thisPageObj.goLinghongbao();
            		$('#linghongbao-bottom button.swiper-down-btn').tap();
            	}else {
            		$('#linghongbao-bottom button.swiper-down-btn').tap();
            	}
            });
            //红包

            //右侧菜单图标点击 end

            //景点列表点击显示景点场景start
            $('#scenes-list ul li').on('tap',function(){
                spotPageObj.pano_id = $(this).attr('data-panoramic-id');
                spotPageObj.base_xml_url = '<?=Yii::$app->urlManager->createUrl(['scenic/scenic/play-xml','id'=>''])?>'+spotPageObj.pano_id;
                //获取景点信息
                $.ajax({
                    type: 'post',
                    url:'<?=Yii::$app->urlManager->createUrl(['scenic/scenic/spot-json'])?>',
                    data: {id: $(this).attr('data-spot-id')},
                    dataType: 'json',
                    success: function (res) {
                        if(res.status==1){
                            $('#spot-detail-bottom h5.text-over').html(res.data.info.title);
                            $('#spot-detail-bottom div.scenic-spot-detial p').html(res.data.info.introduce);
                            thisPageObj.showAudioList(res.data);
                        }
                    }
                });
                thisPageObj.showPano(spotPageObj);
                thisPageObj.goSpotDetail();
                if(play_type == 2){
                    $('#pano').show();
                    $('#plane').hide();
                }
                return false;
            });
            //景点列表点击显示景点场景end

            //景点详情页切换场景
            $('#spot-detail-bottom').on('tap','li',function(){
                var krpano = document.getElementById('krpanoSWFObject');
                krpano.call('loadscene('+$(this).attr('data-scene-name')+', null, MERGE);');
                return false;
            });
            //景点详情页切换场景

            //讲解音乐列表 start
            $(".music-btn").on('tap',function() {
                closeOpen('music');
               if(!thisPageObj.audioObj){
                    thisPageObj.audioObj = document.createElement("audio");
                }
               if(!$('ul.music-list').is(":hidden")) {
                    $('ul.music-list').hide();
               }else if(!thisPageObj.audioObj.paused){
                    thisPageObj.audioObj.pause();
                }else {
                	var ulList = $('ul.music-list').show();
                }
                return false;
            });
            $('.music-list').on('tap','li',function(){
                $('.music-list li').removeClass('active');
                $(this).addClass('active');
                 if(!thisPageObj.audioObj){
                    thisPageObj.audioObj = document.createElement("audio");
                }
                if(thisPageObj.audioObj.src!=$(this).attr('data-url')){
                    thisPageObj.audioObj.pause();
                    thisPageObj.audioObj.src = $(this).attr('data-url');
                }
                thisPageObj.audioObj.play();
                $('ul.music-list').hide();
                return false;
            });
            document.addEventListener("WeixinJSBridgeReady", function () {
                if(thisPageObj.audioObj){
                    thisPageObj.audioObj.play();
                }
            }, false);
            //讲解音乐列表 end

            //景区介绍查看全部start
            $('.show-all-btn').on('tap',function(){
                thisPageObj.showSpotAll(this);
                 return false;
            });
            //景区介绍查看全部end

            //临时点击事件好店筛选
            $(".bus-sel-grp").on('tap', 'li',function(){
				if($(this).hasClass("active")) {
					$(".select-show-box").fadeOut();
					$(this).removeClass("active");
				}else {
					$(this).addClass("active").siblings().removeClass("active");
					var ind= $(this).index();
					$(".select-show-box").show().children("div").eq(ind).fadeIn().siblings().hide();
				}

			});
			$(".foodbox-left,.sort-list,.nearbox-left,.nearbox-right,.sel-price-list,.sel-server-list,.sel-offer-list").on('tap', 'li',function(){
				if(this.className == "active") {
					this.className="";
				}else {
					$(this).addClass("active").siblings().removeClass("active");
				}
			});
			//临时点击事件好店筛选end

            thisPageObj.showPano(scenicPageObj);
            thisPageObj.showManu();

//          默认隐藏
//          thisPageObj.goScenicInfo();

//            thisPageObj.goHaodian();
            thisPageObj.scroolToutiao();//头条切换

        },
        showInfAll:function(obj) {
            var cl=obj.className;
            if(cl == "show-all-inf-btn") {
                $(obj).parents('div.content-class').find('p.inf-detial').addClass('inf-showed');
                obj.className="show-all-inf-btn showed";
                obj.innerHTML="收起全部<img src=\"/images/all-down.png\">"
            }else {
                $(obj).parents('div.content-class').find('p.inf-detial').removeClass('inf-showed');
                obj.className="show-all-inf-btn";
                obj.innerHTML="查看全部<img src=\"/images/all-down.png\">"
            }
        },
        showSpotAll:function(obj) {
			var cl=obj.className;
			if(cl == "show-all-btn") {
				$(".scenic-spot-bottom").removeClass("scenic-half-height").addClass('scenic-show-all');
				obj.className="show-all-btn showed";
				obj.innerHTML="收起全部<img src=\"/images/all-down.png\">"
			}else {
				$(".scenic-spot-bottom").removeClass('scenic-show-all');
				obj.className="show-all-btn";
				obj.innerHTML="查看全部<img src=\"/images/all-down.png\">"
			}
		},
        showPano:function(pageObjData){
            removepano('krpanoSWFObject');
            pageObj = pageObjData;
            initPano();
        },
        scroolToutiao:function(){
            var swiper = new Swiper('#toutiao-sw', {
                //	        pagination: '.swiper-pagination',
                //	        nextButton: '.swiper-button-next',
                //	        prevButton: '.swiper-button-prev',
                paginationClickable: true,
                spaceBetween: 30,
                centeredSlides: true,
                autoplay: 2000,
                autoplayDisableOnInteraction: false,
                direction: 'vertical',
                loop: true
            });
        },
        //显示底部不同页面公共调用
        showButtonCommon:function(obj){
            $('div.base-bottom').hide();
//          $('div.base-bottom .content-class').hide();
            $('.swiper-down-btn').removeClass('swiper-up-btn');
            obj.show();
            if(obj.attr('id')!='scenic-toutiao' && obj.attr('id')!='spot-detail-bottom'){
                //头条默认打开内容
                obj.find('.swiper-down-btn').addClass('swiper-up-btn');
            }
        },
        showAudioList:function(json){
            $('ul.music-list').empty();
            if(json.audio.length>0){
                $('button.music-btn').show();
                for(var i=0;i<json.audio.length;i++){
                    $('ul.music-list').append('<li data-url="'+thisPageObj.materialUrl+json.audio[i]['path']+'">'+json.audio[i]['title']+'</li>');
                }
                $('ul.music-list li:eq(0)').tap();//播放第一个音乐
            }else{
                $('button.music-btn').hide();
            }
        },
        //进入景区信息
        goScenicInfo:function(){
            var thisDiv = $('#index-bottom');
            thisPageObj.showButtonCommon(thisDiv);

            //获取景区信息
            $.ajax({
                type: 'post',
                url:'<?=Yii::$app->urlManager->createUrl(['scenic/scenic/scenic-json'])?>',
                data: {id: '<?=$scenic->id?>'},
                dataType: 'json',
                success: function (res) {
                    if(res.status==1){
                        $('#spot-detail-bottom h5.text-over').html(res.data.info.title);
                        $('#spot-detail-bottom div.scenic-spot-detial p').html(res.data.info.introduce);
                        thisPageObj.showAudioList(res.data);
                    }
                }
            });
            //thisDiv.addClass('bottom-mini-height');
        },
        //进入景点详情
        goSpotDetail:function(){
            var thisDiv = $('#spot-detail-bottom');
            thisPageObj.showButtonCommon(thisDiv);
        },
        //进入特色活动
        goActivity:function(){
            var thisDiv = $('#activity-bottom');
            thisPageObj.showButtonCommon(thisDiv);
        },
        goZhuti:function(){
             var thisDiv = $('#zhutituijian-bottom');
            thisPageObj.showButtonCommon(thisDiv);
        },
        goHaodian:function(){
            var thisDiv = $('#haodian-bottom');
            thisPageObj.showButtonCommon(thisDiv);
            //获取景点信息
            if($('ul.businessmen-list').html()!=''){
                return false;
            }
            thisPageObj.getShopList(1);
        },
        getShopCategory:function(){
            if($('#first-category li').length==1){
                $.ajax({
                    type: 'post',
                    url:'<?=Yii::$app->urlManager->createUrl(['scenic/scenic/get-category'])?>',
                    data: {shop_id:'<?=Yii::$app->request->get('shop_id')?>','merchant_pid':'<?=Yii::$app->request->get('merchant_pid')?>'},
                    dataType: 'json',
                    success: function (res) {
                        if(res.data){
                            var categoryList = '';
                            if(undefined!=res.data){
                                thisPageObj.categoryData = res.data;
                                var firstCategory = undefined!=res.data[0]?res.data[0]:null;
                                for (var j=0;j<firstCategory.length;j++){
                                    var category = firstCategory[j];
                                    categoryList +='<li  data-id="'+category['id']+'">'+category['name']+'</li>';
                                }
                            }
                            if($('#first-category li').length==1){
                                $('#first-category').append(categoryList);
                                $('#first-category li').on('click',function(){
                                    $('#second-category').html('');
                                    var dataId = $(this).attr('data-id');
                                    if(dataId=='0'){
                                        thisPageObj.category_id=0;
                                        thisPageObj.getShopList(1);
                                        $('ul.bus-sel-grp li.food-btn').tap().html('全部分类');
                                        return;
                                    }
                                    if(undefined!=thisPageObj.categoryData[dataId]){
                                        var str = '';
                                        for(var j=0;j<thisPageObj.categoryData[dataId].length;j++){
                                            var category = thisPageObj.categoryData[dataId][j];
                                            str += '<li  data-id="'+category['id']+'">'+category['name']+'</li>';
                                        }
                                        $('#second-category').html(str);
                                        $('#second-category li').on('click',function(){
                                            thisPageObj.category_id = $(this).attr('data-id');
                                            thisPageObj.getShopList(1);
                                            $('ul.bus-sel-grp li.food-btn').tap().html($(this).html());
                                        });
                                    }
                                });
                            }
                        }
                    },error:function(){
                    }
                });
            }
        },
        getShopList:function(page){
            if(thisPageObj.shopLoading){
                return false;
            }
            thisPageObj.getShopCategory();
            thisPageObj.shopLoading=true;
            if((page?page:thisPageObj.shopPage)==1){
                $('ul.businessmen-list').html('');
                myScroll.refresh();
            }
            $.ajax({
                type: 'post',
                url:'<?=Yii::$app->urlManager->createUrl(['scenic/scenic/get-shop'])?>',
                data: {id:'<?=$scenic->id?>','merchant_pid':'<?=Yii::$app->request->get('merchant_pid')?>',page:(page?page:thisPageObj.shopPage),category_id:thisPageObj.category_id,longitude:thisPageObj.longitude,latitude:thisPageObj.latitude,near_val:thisPageObj.nearVal,sort_val:thisPageObj.sortVal},
                dataType: 'json',
                success: function (res) {
                     thisPageObj.shopLoading = false;
                    if(res.status==1){
                        var listArr = [];
                        for(var i=0;i<res.data.length;i++){
                            var item = res['data'][i];
                            var starStr = '';
                            var voucherList = '';
                            if(undefined!=item['voucherList']){
                                for (var j=0;j<item['voucherList'].length;j++){
                                    var voucher = item['voucherList'][j];
                                    if(!voucher['item_logo']){
                                        continue;
                                    }
                                    voucherList+='<p class="quan text-over"><a href="'+voucher['voucher_detail_url']+'"><img src="'+voucher['item_logo']+'"/> '+voucher['item_name']+'</a></p>';
                                }
                            }
                            if(item['star']){
                                item['star'] = parseInt(item['star']);
                                while(item['star']--){
                                    starStr+='<img src="/images/fire.png"/>';
                                }
                            }
                            listArr.push(
                            '<li class="flex-box">\
                                <a  href="'+item['action_param']+'">\
                                <img class="businessmen-img" src="'+item['main_img_url']+'"\/></a>\
                                <div class="bus-list-infbox">\
                                <a  href="'+item['action_param']+'">\
                                    <h5 class="text-over">'+item['main_shop_name']+(item['branch_shop_name']?'（'+item['branch_shop_name']+'）':'')+'</h5>\
                                    <p class="renjun text-over"><em>'+item['popularity']+'</em>'+starStr+'<span>'+item['price_average']+'</span></p>\
                                        <p class="caixi text-over">'+item['address']+' '+item['rel_distance']+'KM </p>\
                                        '+(item['shop_recommend_one_tag_compose']?('<p class="quan text-over"><img src="/images/zan.png">'+item['shop_recommend_one_tag_compose']):'')+'</p>\
                                        </a>\
                                        '+voucherList+'\
                                </div>\
                                </li>');
                        }
                        if(listArr.length>0){
                            $('#pullUp').show();
                            thisPageObj.shopPage = thisPageObj.shopPage+1;
                            $('ul.businessmen-list').append(listArr.join(''));
                            myScroll.refresh();
//                            $('li.new-add').each(function(){
//                                    var thisObj = $(this).find('.star-img');
//                                    thisObj.rateYo({
//                                        starWidth: "14px",
//                                      rating: parseFloat(thisObj.attr('data-star'))
//                                    });
//                            });
//                            $('li.new-add').removeClass('new-add');
                        }else{
                            $('#pullUp').hide();
                        }
                    }
                },error:function(){
                     thisPageObj.shopLoading = false;
                }
            });
        },
        goLinghongbao:function(){
            var thisDiv = $('#linghongbao-bottom');
            thisPageObj.showButtonCommon(thisDiv);
            $.ajax({
                type: 'post',
                url:'<?=Yii::$app->urlManager->createUrl(['scenic/scenic/get-voucher'])?>',
                data: {shop_id:'<?=Yii::$app->request->get('shop_id')?>','merchant_pid':'<?=Yii::$app->request->get('merchant_pid')?>'},
                dataType: 'json',
                success: function (res) {
                    if(res.data){
                        var voucherList = '';
                        if(undefined!=res.data){
                            for (var j=0;j<res.data.length;j++){
                                var voucher = res.data[j];
                                if(!voucher['item_logo']){
                                    continue;
                                }
                                voucherList+='<li>\
                                    <a  class="flex-box" href="'+voucher['voucher_detail_url']+'">\
                                    <img class="offer-ls-img" src="'+voucher['item_logo']+'"/>\
                                    <div class="offer-ls-name">\
                                    <h5 class="text-over">'+voucher['shop_name']+'</h5>\
                                    <p class="text-over">'+voucher['item_name']+'</p>\
                                    </div>\
                                    <div class="offer-ls-lingqu"><h5>免费领</h5></div>\
                                    </a>\
                                    </li>';
                            }
                        }
                        if($('#linghongbao-bottom ul.offer-list').html()==''){
                            $('#linghongbao-bottom ul.offer-list').html(voucherList)
                        }
                    }
                },error:function(){
                }
            });




            //var thisDiv = $('#linghongbao-bottom');
            //thisPageObj.showButtonCommon(thisDiv);
        },
        //显示景区景点列表
        goScenicScene:function(){
            var thisDiv = $('#scenic-scene-bottom');
            thisPageObj.showButtonCommon(thisDiv);
            //景区景点滚动
            var swiper = new Swiper('#scenes-list', {
                    // pagination: '.swiper-pagination',
                    slidesPerView: 4,
                    paginationClickable: false,
                    spaceBetween: "2.5%",
                    freeMode: true
                });
            //景区景点滚动 end
        },
        hideManu:function() {
            $(".manu-list").removeClass("opened-nav");
            document.getElementById("cn-button").className="cn-button";
            $("#shop-list").removeClass('swiper-container-hide');
            setTimeout(function() {
                $(".manu-list").width("0");
            },300)
        },
        showManu:function() {
            $(".manu-list").addClass("opened-nav");
            document.getElementById("cn-button").className="cn-button active";
            $(".manu-list").width("28.8%");
        },
        collapseBaseBox:function(obj){

                    $(obj).parent().tap();
                    return false;







			var cal=obj.className,
				parentNd=$(obj).closest(".base-high-bottom"),
				parentBottom=parentNd.find(".base-high-bottom-box");
			if(cal == "swiper-down-btn") {
				parentNd.height("7rem");
				parentBottom.css({"opacity":"0"});
				obj.className = "swiper-down-btn swiper-up-btn";
			} else {
				parentNd.height("77.15%");
				parentBottom.css({"opacity":"1"});
				obj.className = "swiper-down-btn";
			}
		},
    }
</script>
<script language="JavaScript" type="text/javascript" src="/pano_player/custom/js/vrshow.js"></script>
<script>
    thisPageObj.init();




function pullUpAction () {
    setTimeout(function () {    // <-- Simulate network congestion, remove setTimeout from production!
        thisPageObj.getShopList();
         // 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000);   // <-- Simulate network congestion, remove setTimeout from production!
}

/**
 * 初始化iScroll控件
 */
function loaded() {
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    myScroll = new iScroll('wrapper', {
        scrollbarClass: 'myScrollbar', /* 重要样式 */
        useTransition: false, /* 此属性不知用意，本人从true改为false */
        topOffset: 0,
        onRefresh: function () {
            if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
            }
        },
        onScrollMove: function () {
             if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
            }
            pullUpAction(); // Execute custom function (ajax call?)
        }
    });
    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) {
	if($(e.target).parents("#scroller").length>0){
		e.preventDefault();
	}
	}, false);
document.addEventListener('DOMContentLoaded', loaded, false);


//店铺滚动结束


//滑动开始
	var touchUpDown={
		y:null,
		oldY:null,
		newY:null,
		domObj:"tapSlide-all-box",
		init:function(){
			var _this= touchUpDown;
			var swipObj=document.getElementsByClassName(_this.domObj);
			for (var i = 0;i<swipObj.length;i++) {
				swipObj[i].addEventListener("touchstart",_this.touchStart,false);
				swipObj[i].addEventListener("touchend",_this.touchEnd,false);
			}
		},
		touchStart:function(event) {
			var event = event || window.event;
			this.oldY=event.touches[0].clientY;
			console.log(this.oldY);
		},
		touchEnd:function(event){
			var event = event || window.event;
//			console.log(event.target);
			var eventObjBtn = $(event.target).closest(".tapSlide-all-box").find(".bottom-top button");
//			console.log(eventObjBtn);
			this.newY=event.changedTouches[0].clientY;
			distanceY = this.newY-this.oldY;
			thisObj=eventObjBtn.get(0);
			if(Math.abs(distanceY)>10){
				if(distanceY<0){
				    console.log('往上滑动');
				    if(thisObj.className== "swiper-down-btn swiper-up-btn") {
						thisPageObj.collapseBaseBox(thisObj)
					}else {
						  return;
					}
				}else if(distanceY>0){
					console.log('往下滑动');
					//if(thisObj.className== "swiper-down-btn") {
						thisPageObj.collapseBaseBox(thisObj)
					// }else {
					// 	  return;
					// }
				}
			}
		},
		touchmove:function(event){// 暂时没有使用
			var event = event || window.event;
		    this.newY = event.touches[0].clientY;
		    console.log(this.newY);
		    distanceY = this.newY-this.oldY;
		}
	}
    $('#pano').on('tap',function(){
        if(!$('#haodian-bottom').is(':hidden') && !$('#haodian-bottom .content-class').is(':hidden')){
            $('#haodian-bottom div.bottom-top').tap();
        }else if(!$('#index-bottom').is(':hidden') && !$('#index-bottom .content-class').is(':hidden')){
            $('#index-bottom div.bottom-top').tap();
        }else if(!$('#activity-bottom').is(':hidden') && !$('#activity-bottom .content-class').is(':hidden')){
            $('#activity-bottom div.bottom-top').tap();
        }else if(!$('#spot-detail-bottom').is(':hidden') && !$('#spot-detail-bottom .content-class').is(':hidden')){
            $('#spot-detail-bottom div.bottom-top').tap();
        }else if(!$('#scenic-toutiao').is(':hidden') && !$('#scenic-toutiao .content-class').is(':hidden')){
            $('#scenic-toutiao div.bottom-top').tap();
        }
    });
    function closeOpen(type){
        if(type!='music'){
            $('.music-list').hide();
        }
        $('#red-pop').hide();
        if(type!='map'){
            var krpano = document.getElementById('krpanoSWFObject');
            var isVisible = krpano.get('layer[mapcontainer].visible');
            if(isVisible){
                krpano.set('layer[mapcontainer].visible',false);
            }
        }
    }
document.addEventListener('DOMContentLoaded', touchUpDown.init, false);
// document.querySelector('body').addEventListener('touchstart', function (ev) {
//     event.preventDefault();
// });
//滑动结束


//loading
	function loadingHide(){
		if(!$(".loading-box").is(":hidden")) {
                                $(".loading-box").fadeOut();
                                setTimeout(function() {
                                    thisPageObj.goScenicInfo();
                                    $(".head").css({"display":"flex"});
                                    $('.btn-grp-l,.btn-grp-r,.manu-list,#cn-button').fadeIn(1000);
                                },1000)
			
		}
	}
            /*function loadingPic() {
                    if(!$(".loading-box").is(":hidden")) {
                        $(".loading-box").fadeOut();
                    }
            }*/
//loading end

</script>
<script>
    var play_type = '<?= $scenic->type?>';
    var plane = <?= json_encode($scenic->getPlane())?>;
    if(plane.length > 0 && play_type == 2){
        setbgPlane();
        setInterval(function () {
            setbgPlane();
        },10000);
    }
    function setbgPlane() {
        var img = $('#plane img');
        var index = img.attr('index');
        var i = index >= plane.length-1 ? 0 : parseInt(index) + 1;
        img.fadeOut(500);
        setTimeout(function () {
            img.attr('src',plane[i]).attr('index',i);
        },500);
        img.fadeIn();
    }
</script>

<script src="https://s13.cnzz.com/z_stat.php?id=1263596654&web_id=1263596654" language="JavaScript"></script>
<script>
    var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    $('body').append('<div style="display: none;">'+unescape("%3Cspan id='cnzz_stat_icon_1258842782'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s13.cnzz.com/z_stat.php%3Fid%3D1263596654&web_id%3D1263596654' type='text/javascript'%3E%3C/script%3E")+'</div>');
</script>
</html>
