<?php
/* @var $shop array */
?>
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <meta charset="UTF-8">
    <title>公共设施 </title>
    <link rel="stylesheet" type="text/css" href="/css/common.css"/>
    <link rel="stylesheet" type="text/css" href="/css/frontend_index.css"/>
    <link rel="stylesheet" type="text/css" href="/css/swiper-3.3.1.min.css"/>
    <link rel="stylesheet" type="text/css" href="/css/animate.min.css"/>
    <div class="CodeMirror-cursor" style="left: 246px; top: 140px; height: 20px;">&nbsp;</div>
    <style type="text/css">
        body,html,#container{
            height: 100%;
            margin: 0px;
            font: 12px Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial;
        }
        .info-title{
            color: white;
            font-size: 14px;
            background-color: rgba(0,155,255,0.8);
            line-height: 26px;
            padding: 0px 0 0 6px;
            font-weight: lighter;
            letter-spacing: 1px
        }
        .info-content{
            padding: 4px;
            color: #666666;
            line-height: 23px;
        }
        .info-content img{
            width: 68px;
            height: 68px;
            float: left;
            margin: 3px;
        }
        #tip {
            display: none;
            position: absolute;
            top: 50%;
            width: 100%;
            text-align: center;
            font-size: 16px;
            background: rgba(0,0,0,0.6);
            color: #fff;
            padding: 10px 0;
        }
    </style>
</head>
<body>
<!--<header class="public-head" data-role="header">
    <button class="headlines-hd-back" onclick="history.go(-1)"></button>
    <p>公共设施</p>
</header>-->
<div class="public-body" id="container">

</div>
<div class="public-bottom flex-box">
    <div class="flex1 disability"></div>
    <div class="flex1 hospital"></div>
    <div class="flex1 parking"></div>
    <div class="flex1 toilet"></div>
</div>
<div class="left-top-box">
    <img class="now-point" src="/images/now-point.png"/>
    <img class="back-parking-point" src="/images/back-point.png"/>
</div>
<div class="left-bottom-box">
    <img class="parking-point" src="/images/parking-point.png"/>
    <img class="remove-point" src="/images/remove-point.png"/>
</div>
<div class="right-bottom-box">
    <img class="plus" src="/images/plus.png"/>
    <img class="minus" src="/images/map-minus.png"/>
</div>
<div class="right-middle-box">
    <a href="<?= Yii::$app->urlManager->createUrl(['scenic/scenic/shop-filter','shop_id' => $shop->get('shop_id'), 'merchant_pid' => $shop->get('merchant_pid')])?>">
	    <img class="go-filter" src="/images/filter-right.png"/>
    </a>
</div>
<div id="tip">

</div>
</body>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.3&key=c6a41fadba9a8a02660d68c99403122d"></script>
<script type="text/javascript">
    var myMap = {
        mapObj:null,
        nowPoint:[],
        city:null,
        addPointNum:[],
        addMarkerObj:[],
        searchPoint:[],
        init:function(){
            var map = new AMap.Map('container',{
                resizeEnable: true,
                zoom: 10,
                center: [116.480983, 40.0958]
            });
            this.mapObj= map;
            this.getNowPoint(this.mapObj);
//		        console.log(map);
        },
        getNowPoint:function(map){
            var geolocation;
            map.plugin('AMap.Geolocation', function() {
                geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                    buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    showButton:false
                });
                map.addControl(geolocation);
                geolocation.getCurrentPosition();
                AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
                AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
            });
            //解析定位结果
            function onComplete(data) {
                $("#tip").hide();
                console.log(data.addressComponent.citycode);
                myMap.city=data.addressComponent.citycode;
                var str=[];
                str.push(data.position.getLng());
                str.push(data.position.getLat());
//			        if(data.accuracy){
//			             str.push('精度：' + data.accuracy + ' 米');
//			        }//如为IP精确定位结果则没有精度信息
//			        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
                myMap.nowPoint=str;
//			        console.log(str);
            }
            //解析定位错误信息
            function onError(data) {
                $("#tip").show();
                document.getElementById('tip').innerHTML = '定位失败';
            }
        },
        addMarker:function(map){
            console.log(map);
            var _this=this;
            _this.getNowPoint(myMap.mapObj);
            if( _this.addPointNum.length == 0) {
                _this.addPointNum = _this.nowPoint;
                var marker= new AMap.Marker({
                    map: map,
                    position:_this.addPointNum,
                    icon: new AMap.Icon({
                        size: new AMap.Size(40, 50),  //图标大小
                        image: "/images/parkingPoint.png",
                    })
                });
                _this.addMarkerObj.push(marker);
            }
        },
        searchNear:function(name,city){
            var _this=this,
                j=0;
            _this.mapObj.remove(_this.searchPoint);
            _this.searchPoint = [];
            $('.amap-info').find('div').hide();
            AMap.service(["AMap.PlaceSearch"], function() {
                var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                    pageSize: 5,
                    type: name,
                    pageIndex: 1,
                    city: city, //城市
                    //map: _this.mapObj,
//			            panel: "panel"
                });
                placeSearch.searchNearBy('', _this.nowPoint, 200, function(status, result) {
                    if(status !== "no_data"){
                        var _pois=result.poiList.pois;
                        for(var i=0;i<_pois.length;i++) {
                            var ar = [_pois[i].location.lng,_pois[i].location.lat];
                            var marker = new AMap.Marker({
                                position: ar,
                                map : _this.mapObj,
                                extensions: 'all',
                                icon: new AMap.Icon({
                                    size: new AMap.Size(22, 33),  //图标大小
                                    image: "/images/default_point.png",
                                })
                            });
                            _this.searchPoint.push(marker);
                            marker.on('click',function(e){
                                infowindow.open(_this.mapObj,e.target.getPosition());
                            })
                            AMap.plugin('AMap.AdvancedInfoWindow',function(){
                                infowindow = new AMap.AdvancedInfoWindow({
                                    content: '<div class="info-title">高德地图</div><div class="info-content">'+
                                    '<img src="/images/amap.jpg">'+
                                    _pois[i].name+'</div>',
                                    offset: new AMap.Pixel(0, -30)
                                });
                            })
                        }
                        _this.mapObj.setZoom(16);
                    }
                });
            })
        }
    }

</script>
<script src="/js/jquery-2.2.1.min.js"></script>
<script type="text/javascript">

    $(document).ready(function(){
        myMap.init();
        $(".public-bottom").find("div").on("touchstart",function(){
            $(this).addClass('active').siblings().removeClass("active");
        })
        $(".disability").on('touchstart',function(){
            myMap.searchNear("残疾人",myMap.city);
        })
        $(".hospital").on('touchstart',function(){
            myMap.searchNear("医院",myMap.city);
        })
        $(".parking").on('touchstart',function(){
            console.log(myMap.city)
            myMap.searchNear("停车场",myMap.city);
        })
        $(".toilet").on('touchstart',function(){
            myMap.searchNear("公共厕所",myMap.city);
        })
        $(".plus").on('touchstart',function(){
            var old=myMap.mapObj.getZoom();
            myMap.mapObj.setZoom(old+1);
        })
        $(".minus").on('touchstart',function(){
            var old=myMap.mapObj.getZoom();
            myMap.mapObj.setZoom(old-1);
        })
        $(".now-point").on('touchstart',function(){
            myMap.getNowPoint(myMap.mapObj);
            if(myMap.nowPoint.length >0) {
                myMap.mapObj.setCenter(myMap.nowPoint)
            }
        })
        $(".back-parking-point").on('touchstart',function(){
            if (myMap.addPointNum.length >0){
                myMap.mapObj.setCenter(myMap.addPointNum);
            }
        })
        $(".parking-point").on('touchstart',function(){
            myMap.addMarker(myMap.mapObj);
        })
        $(".remove-point").on('touchstart',function(){
            myMap.mapObj.remove(myMap.addMarkerObj[0]);
            myMap.addPointNum.length=0;
            myMap.addMarkerObj.length=0;
        })
    })
</script>
</html>
