<?php
/* @var $this yii\web\View */
/* @var $scenic common\models\Scenic */
/* @var $member common\models\Member */
/* @var $shop common\models\KoubeiServiceMarketOrder */
?>
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <meta charset="UTF-8">
    <title>店铺筛选 </title>
    <link rel="stylesheet" type="text/css" href="/css/common.css"/>
    <link rel="stylesheet" type="text/css" href="/css/frontend_index.css"/>
    <link rel="stylesheet" type="text/css" href="/css/swiper-3.3.1.min.css"/>
    <link rel="stylesheet" type="text/css" href="/css/animate.min.css"/>
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
        .right-bottom-box {
            bottom: 4.98rem;
        }
        .loading-box {
        	background: rgba(0,0,0,0.6);
        }
    </style>
</head>
<body>
<div class="public-body" id="container">

</div>

<div class="left-top-box">
    <img class="now-point" src="/images/now-point.png"/>
</div>

<div class="flex-box filter-bottom">
    <div class="flex1 all active"></div>
    <div class="flex1 food"></div>
    <div class="flex1 buy"></div>
    <div class="flex1 server"></div>
</div>
<div class="right-bottom-box">
    <img class="plus" src="/images/plus.png"/>
    <img class="minus" src="/images/map-minus.png"/>
</div>
<div class="right-middle-box">
    <a href="<?= Yii::$app->urlManager->createUrl(['scenic/scenic/public', 'shop_id' => $shop->shop_id, 'merchant_pid' => $shop->merchant_pid])?>">
        <img src="/images/public-right.png"/>
    </a>
</div>
<div id="tip">

</div>
<div id="pano">

</div>
<div class="loading-box">
	<img src="/images/page-loading.gif" alt="" />
</div>
</body>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.3&key=<?= Yii::$app->params['map_key']?>"></script>
<script type="text/javascript">
    var filter_data = '';
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
                zoom: 16,
                center: [<?= $scenic->lng?>, <?= $scenic->lat?>]
            });
            this.mapObj= map;
            this.getNowPoint();
//		        console.log(map);
        },
        getNowPoint:function(){
            var geolocation,map = myMap.mapObj;
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

            $.ajax({
                type : 'post',
                url : '<?= Yii::$app->urlManager->createUrl(['scenic/scenic/get-scenic-shop'])?>',
                data : {
                    id : '<?= $scenic->id?>',
                    merchant_pid : '<?= $member->user_id?>'
                },
                dataType : 'json',
                success : function (resutls) {
                    filter_data = resutls.data;
                    addPoint(0);
                    $(".loading-box").hide();
                }
            });
        },
        addMarker:function(map){
            var _this=this;
            _this.getNowPoint(myMap.mapObj);
            if( _this.addPointNum.length == 0) {
                _this.addPointNum = _this.nowPoint;
                var marker= new AMap.Marker({
                    map: map,
                    position:_this.addPointNum,
                    icon: new AMap.Icon({
                        size: new AMap.Size(40, 50),  //图标大小
                        image: "images/parkingPoint.png",
                    })
                });
                _this.addMarkerObj.push(marker);
            }
        },
        newWindow:function(point,data){
            var infoWindow = new AMap.InfoWindow({
                isCustom: true,  //使用自定义窗体
                content: createInfoWindow(point,data),
                offset: new AMap.Pixel(0, -310)//-113, -140
            });
            infoWindow.open(myMap.mapObj,point);
        }
    }
    function createInfoWindow(poi,data) {
        var info = document.createElement("div");
        info.className = "info";
        var content=[];
        /*$.ajax({
            type:"get",
            url:"",
            data:{poi},
            async:true,
            success:function(data){
//      		content.push('<div class="info-top flex-box"><img src="'+data.img+'"/><div class="flex1 info-top-right"><h5 class="text-over">');
//      		content.push(data.title+'<img src="/images/map-pai.png"/></h5><p class="text-over map-renjun"><span class="map-fire">'+data)
            },
            error:function(){

            }
        });*/

        var voucherList = '', starStr = '';
        if(undefined!=data['voucherList']){
            for (var j=0;j<data['voucherList'].length;j++){
                var voucher = data['voucherList'][j];
                if(!voucher['item_logo']){
                    continue;
                }
                //voucherList+='<p class="quan text-over"><a href="'+voucher['voucher_detail_url']+'"><img src="'+voucher['item_logo']+'"/> '+voucher['item_name']+'</a></p>';
                if(j == 0){
                    voucherList += '<a href="'+voucher['voucher_detail_url']+'"><p class="text-over"><img class="maidan-img" src="/images/map-maidan.png"/><img src="'+voucher['item_logo']+'"/>'+voucher['item_name']+'</p></a>';
                }else{
                    voucherList += '<a href="'+voucher['voucher_detail_url']+'"><p class="half-right text-over"><img src="'+voucher['item_logo']+'"/>'+voucher['item_name']+'</p></a>';
                }
            }
        }
        if(data['star']){
            data['star'] = parseInt(data['star']);
            while(data['star']--){
                starStr += '<img src="/images/fire.png"/>';
            }
        }
        var htl='<a href="'+data.action_param+'"><div class="info-top flex-box"><img src="'+data.main_img_url+'"/><div class="flex1 info-top-right">'+
            '<h5 class="text-over">'+data.shop_name+'<img src="/images/map-pai.png"/></h5><p class="text-over map-renjun"><span class="map-fire">'+data.popularity+'</span>'+starStr+'<span>'+data.price_average+'</span></p><p class="map-add text-over">'+data.address+'</p></div></div><div class="info-bottom">';
        if(data.shop_recommend_one_tag_compose != ''){
            htl += '<p class="half-right text-over"></a><img src="/images/map-zan.png"/>'+data.shop_recommend_one_tag_compose+'</p>';
        }
        htl += '';
        htl += voucherList+'</div><img class="map-arrow" src="/images/map-arrow.png"/>';
        info.innerHTML=htl;
        return info;
    }
    function closeInfoWindow() {
        myMap.mapObj.clearInfoWindow();
    }

</script>
<script src="/js/jquery-2.2.1.min.js"></script>
<script type="text/javascript">

    $(document).ready(function(){
        myMap.init();
        AMap.event.addListener(myMap.mapObj, "click", function(e) {
            closeInfoWindow();
        });
        $(".filter-bottom").find("div").on("touchstart",function(){
            $(this).addClass('active').siblings().removeClass("active");
        })
        $(".all").on('touchstart',function(){
            addPoint(0)
        })
        $(".food").on('touchstart',function(){
            addPoint(1)
        })
        $(".buy").on('touchstart',function(){
            addPoint(2)
        })
        $(".server").on('touchstart',function(){
            addPoint(3)
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
    })
    function addPoint(type) {
    	closeInfoWindow();
        myMap.mapObj.remove(myMap.searchPoint);
        for(var i in filter_data){
            if(type == 0){
                addMarket(filter_data[i]);
            }else{
                if(filter_data[i].category == type){
                    addMarket(filter_data[i]);
                }
            }
        }
    }

    function addMarket(data){
        var img = '',i = data.shop_id;
        switch (data.category){
            case 1:
                img="/images/food-point.png";
                break;
            case 2:
                img="/images/buy-point.png";
                break;
            case 3:
                img="/images/server-point.png";
                break;
            default:
                break;
        }
        var ar = [data.longitude, data.latitude];
        var marker = new AMap.Marker({
            position: ar,
            map : myMap.mapObj,
            extensions: 'all',
            icon: new AMap.Icon({
                size: new AMap.Size(22, 26),  //图标大小
                image: img,
            }),
            label:{i:0}
        });
        myMap.searchPoint.push(marker);
        marker.on('click',function(e){
            target=e.target;
            var point=[];
            point.push(e.target.getPosition().lng);
            point.push(e.target.getPosition().lat);
            myMap.newWindow(point,data);
            myMap.mapObj.setCenter(ar)
        });
    }
</script>
</html>
