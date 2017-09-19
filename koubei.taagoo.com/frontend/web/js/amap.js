function setAmap(options) {
    var map = {
        obj : null,
        options : options,//传递过来的参数
        districtSearch : null,//传递过来的参数
        polygons : [],
        init : function () {
            map.obj = new AMap.Map(map.options.container, {
                resizeEnable: true,
                zoom:3,
                center: [map.options.lng ? map.options.lng : 116.397428, map.options.lat ? map.options.lat : 39.90923]
            });

            map.obj.on("click", function(e){
                if(!e.overlay){
                    map.obj.clearMap();
                    map.setMarket([e.lnglat.lng, e.lnglat.lat]);
                    if(map.options.setlnglat){
                        map.options.setlnglat(e.lnglat.lng, e.lnglat.lat);
                    }
                    map.obj.setCenter([e.lnglat.lng, e.lnglat.lat]);
                }
            });

            //实例化DistrictSearch
            map.districtSearch = new AMap.DistrictSearch({
                subdistrict: 1,   //返回下一级行政区
                level: 'city',
                showbiz:false  //查询行政级别为 市
            });
        },
        setMarket : function (position) {
            marker = new AMap.Marker({
                position: position,
                map : map.obj,
                extensions: 'all',  //返回行政区边界坐标组等具体信息
            });
        },
        searchDistrict : function (level, name) {
            //清除地图上所有覆盖物
            for (var i = 0, l = map.polygons.length; i < l; i++) {
                map.polygons[i].setMap(null);
            }
            map.districtSearch.setLevel(level);
            map.districtSearch.setExtensions('all');
            map.districtSearch.search(name,function(status, result){
                if(status=='complete'){
                    map.getData(result.districtList[0]);
                }
            })
        },
        getData : function(data) {
            var bounds = data.boundaries;
            if (bounds) {
                for (var i = 0, l = bounds.length; i < l; i++) {
                    var polygon = new AMap.Polygon({
                        map: map.obj,
                        strokeWeight: 1,
                        strokeColor: '#CC66CC',
                        fillColor: '#CCF3FF',
                        fillOpacity: 0.5,
                        path: bounds[i]
                    });
                    map.polygons.push(polygon);
                }
                map.obj.setFitView();//地图自适应
            }
        },
        placeSearch : function (city,Keyword) {
            AMap.service('AMap.PlaceSearch',function(){//回调函数
                //实例化PlaceSearch
                var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                    pageSize: 1,
                    pageIndex: 1,
                });
                placeSearch.setCity(city);
                //关键字查询
                placeSearch.search(Keyword, function(status, result) {
                    if(status == 'complete'){
                        var location = result.poiList.pois[0];
                        map.obj.clearMap();
                        if(location){
                            map.setMarket([location.location.lng, location.location.lat]);
                            if(map.options.setlnglat){
                                map.options.setlnglat(location.location.lng, location.location.lat);
                            }
                            map.obj.setCenter([location.location.lng, location.location.lat]);
                            map.obj.setZoom(13);
                        }
                    }
                });
            })
        }
    };
    map.init();
    return map;
}
