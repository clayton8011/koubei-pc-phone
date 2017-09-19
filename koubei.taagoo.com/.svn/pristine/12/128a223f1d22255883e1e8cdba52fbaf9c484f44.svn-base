<?php
use common\models\PanoramicList;
use common\models\PanoramicAtlas;
use common\models\PanoHot;
use common\models\PanoramicComment;

$cacheKey = 'koubei:play_xml:cache:'.$model->id;
if ($this->beginCache($cacheKey,['duration' => 3600])) {
?>
<krpano version="1.19" title="abcde" debugmode="false" showerrors="false">
    <security>
        <crossdomainxml url="/crossdomain.xml"/>
        <allowdomain domain="*"/>
    </security>
    <!--    <hotspot name="nadirlogo" url="/static/vender/krpano/snow_idmage/heart.png" keep="true" ath="0" atv="90" distorted="true" scale="1.0" rotate="0.0" rotatewithview="false" onclick="switch(rotatewithview);invalidatescreen();"/>-->


    <include url="%SWFPATH%/skin/vtourskin.xml" />
    <include url="%SWFPATH%/custom/xml/autorotate.xml" />
    <include url="%SWFPATH%/custom/xml/object.xml" />
    <include url="%SWFPATH%/plugins/video-player.xml"/>
    <contextmenu fullscreen="false" versioninfo="false">
        <item name="logo" caption="大国慧谷" separator="true" onclick="openurl('http://www.taagoo.com/')" devices="flash|webgl"/>
    </contextmenu>
    <include url="%SWFPATH%/custom/plugin/bbgmusic/plugin.xml" />
    <include url="%SWFPATH%/custom/plugin/open_alert/plugin.xml" />
    <!--    <include url="%SWFPATH%/static/plugin/custom_right_button/xml/plugin.xml.php" />-->
    <include url="%SWFPATH%/custom/plugin/shade_sky_floor/plugin.xml" />
    <include url="%SWFPATH%/custom/plugin/comment/plugin.xml" />

    <action name="startup" autorun="onstart">
        if(startscene === null OR !scene[get(startscene)],
        copy(startscene,scene[0].name); );
        if(device.fullscreensupport == true,js(showFullscreenBtn()););
        if(device.mobile OR device.tablet,js(hideShareAndFootmarkBtn()););
        loadscene(get(startscene), null, MERGE);
        if(startactions !== null, startactions() );
    </action>
    <?php
    $sceneList = PanoramicList::find()->where(['panoramic_id'=>$model->id,'status'=>1])->orderBy('sort_val asc')->all();
   /* $sceneGroup = PanoramicList::find()->where(['panoramic_id'=>$model->id,'status'=>1])->orderBy('sort_val asc')->select('atlas_id')->column();
    $sceneGroup = array_unique($sceneGroup);*/
    $albumArr = [];
    foreach ($sceneList as $key => $row) {
        $panoramicMaterial = $row->panoramicMaterial;
        $previewUrl = $panoramicMaterial->getPicPreview();
        $thumb_url = $previewUrl.'thumb.jpg?v='.time();
        $albumName = '场景选择';
        $albumId = 0;
        /*if($row->atlas_id>0){
            $PanoramicAtlas = PanoramicAtlas::findOne($row->atlas_id);
            $albumName = $PanoramicAtlas->atlas_name;
            $albumId = $PanoramicAtlas->id;
        }*/

        $albumStr = '';
        /*if((!isset($albumArr[$albumId])) && count($sceneGroup) > 1){
            $albumStr = 'album="'.$albumName.'"';
        }*/
        ?>
        <scene name="scene_<?=$panoramicMaterial->id?>" title="<?=$row->getTitle()['default'];?>"  <?=$albumStr?>  onstart="activatespot(90)" thumburl="<?=$thumb_url?>" lat="" lng="" heading="" >
            <view hlookat="0" vlookat="0" fovtype="MFOV" fov="95" fovmin="5" fovmax="120" vlookatmin="90" vlookatmax="-90" limitview="fullrage"/>
            <preview url="<?=$previewUrl?>preview.jpg" />
            <?=$panoramicMaterial->getSceneContent($previewUrl);?>
        </scene>
        <?php
        $albumArr[$albumId] = 1;
    }
    ?>
    <include url="%SWFPATH%/custom/xml/newFun.xml"/>
</krpano>
<?php
    $this->endCache();
}?>