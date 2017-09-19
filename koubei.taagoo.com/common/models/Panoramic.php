<?php

namespace common\models;

use Yii;
use common\models\PanoramicList;

/**
 * This is the model class for table "{{%panoramic}}".
 *
 * @property integer $id
 * @property integer $member_id
 * @property integer $shop_id
 * @property integer $template
 * @property integer $showlogo
 * @property integer $custom_logo
 * @property integer $status
 * @property integer $process_percent
 * @property integer $created_at
 */
class Panoramic extends \yii\db\ActiveRecord
{
    public $checkbox = array();
    public $defaultMask = '/images/mask.png';
    public $defaultIcon = 'http://pano.taagoo.com/static/player/1.19-pr6/system-icon/link.png';
    public $defaultImg = '/images/lazy.png';
    public $defaultLogo = '/images/logo1.png';
    public $openAlert = '/images/openalert.png';
    public $sceneFix = 'scene_';

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%panoramic}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [

        ];
    }


    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'member_id' => '所属用户',
            'shop_id' => '商铺ID',
            'template' => '模板',
            'showlogo' => '是否显示logo',
            'custom_logo' => 'logo ID',
            'status' => '状态',
            'process_percent' => '发布进度',
            'created_at' => '创建日期',
        ];
    }

    public function beforeValidate()
    {
        if ($this->scenario != 'default' && $this->scenario != 'search') {
            if ($this->isNewRecord) {
                $this->created_at = time();
            }
        }
        return parent::beforeValidate();
    }


    /**
     * 场景设置
     * @return  {[type]} [description]
     * @version 1.0      2015-12-31T15:48:46+0800
     * @author cnzhangxl@foxmail.com
     */
    public function scenarios()
    {
        return [
            'create' => ['member_id', 'shop_id', 'showlogo', 'custom_logo', 'status', 'process_percent', 'created_at'],
        ];
    }

    /**
     * 获取用户信息
     * @date   2016-03-24T10:53:02+0800
     * @author cnzhangxl@foxmail.com
     * @return [type]                   [description]
     */
    public function getMember()
    {
        return $this->hasOne('common\models\Member', ['id' => 'member_id']);
    }

    /**
     * 获取缩略图
     */
    public static function getThumbs($model){
        $data = ['default'=>''];
        $thumb = is_array($model) ? $model['thumbs'] : $model->thumbs;
        $panoramic_id = is_array($model) ? $model['id'] : $model->id;
        if($thumb){
            $data['default'] = $thumb;
        }else{
            $panoramicListOne = PanoramicList::find()->where(['panoramic_id'=>$panoramic_id,'status'=>1])->orderBy('id asc')->one();
            if($panoramicListOne){
                $PanoramicMaterial = $panoramicListOne->panoramicMaterial;
                if($PanoramicMaterial){
                    $data['default'] = $PanoramicMaterial->getThumbs()['default'];
                }
            }
        }
        return $data;
    }

    /**
     * 动景播放json
     * @param $id integer 动景id
     * @return $returnData [array]
     */
    public static function getPlayJson($id)
    {
        $returnData = [];
        $pano = Panoramic::findOne($id);

        $returnData['name'] = '';
        $returnData['lng'] = '';
        $returnData['lat'] = '';
        $returnData['address'] = '';
        $returnData['summary'] = '';
        $returnData['thumb_path'] = '';
        $returnData['play_rules'] = 1;//小行星开场
        $returnData['thumbs_opened'] = 0;//打开缩略图
        $returnData['autorotate'] = 1;//自动旋转
        $returnData['flag_publish'] = 1; // 发布全景
        $returnData['footmark'] = 0; // 足迹
        $returnData['gyro'] = 0; // 手机陀螺仪
        $returnData['comment'] = 0; // 显示说一说
        $returnData['showlogo'] = 0; // 显示logo
        $returnData['showuser'] = 1; // 作者名
        $returnData['showviewnum'] = 1; // 人气
        $returnData['showvrglasses'] = 1; // VR眼镜
        $returnData['showprofile'] = 1; // 简介
        $returnData['showpraise'] = 1; // 点赞
        $returnData['showshare'] = 1;// 分享
        $returnData['sand_table']['isOpen'] = 0; //沙盘
        //$returnData['sand_table']['sandTables'] = SandTable::getSandTable($pano);
        $returnData['scene_group']['sceneGroups'] = [];
        $returnData['angle_of_view'] = [];
        $returnData['hotspot'] = [];
        $sceneList = PanoramicList::find()->where(['panoramic_id' => $id, 'status' => 1])->orderBy('sort_val asc')->all();
        $bg_music = [];
        $speech_explain = [];
        $sky_land_shade = [];
        foreach ($sceneList as $key => $row) {
            $angle_of_view['sceneName'] = $pano->sceneFix . $row->panoramic_material_id;
            $hotspot = [];
            $sand_table = [];
            $comment = [];
            $special_effects = [];
            $panoramicMaterial = $row->panoramicMaterial;
            $returnData['scene_list'][$key]['id'] = $row->id;
            $returnData['scene_list'][$key]['sceneName'] = $angle_of_view['sceneName'];
            $returnData['scene_list'][$key]['scene_id'] = $panoramicMaterial->id;
            $returnData['scene_list'][$key]['scene_title'] = $row->getTitle()['default'];
            $returnData['scene_list'][$key]['thumbPath'] = $panoramicMaterial->getThumbs()['default'];
            if ($panoramicMaterial->status != 4 && $panoramicMaterial->status != 6) {
                $angle_of_view['hlookat'] = 0;
                $angle_of_view['vlookat'] = 0;
                $angle_of_view['fov'] = 95;
                $angle_of_view['fovmin'] = 5;
                $angle_of_view['fovmax'] = 120;
                $angle_of_view['vlookatmin'] = 90;
                $angle_of_view['vlookatmax'] = -90;
                $angle_of_view['keepView'] = 0;
                $angle_of_view['hlookatmin'] = -180;
                $angle_of_view['hlookatmax'] = 180;
                //$hotspot = PanoHot::getHotspot($row->id);
                /*$special_effects['sceneName'] = $angle_of_view['sceneName'];
                $special_effects['effectId'] = 1;
                $special_effects['isOpen'] = true;
                $special_effects['type'] = 1;
                $special_effects['effectType'] = 'smileys';*/
                /*if ($row->wonder_id != 0) { // 特效
                    $special_effects['isOpen'] = $row->wonder_open == 1 ? true : false;

                    $special_effects['effectType'] = $row->wonder_type == 1 ? PanoramicList::getWonder()[$row->wonder_id]['onstart'] : 'custom';
                    $special_effects['type'] = $row->wonder_type;
                    if ($row->wonder_type == 2) {
                        $special_effects['imageUrl'] = Yii::$app->params['oss_domain'] . PanoramicImges::getImgUrl($row->wonder_id);
                    }
                }*/
                /*if ($pano->music_type == 2) {
                    $music['mediaID'] = $row->audio_id;
                    $music['sceneID'] = $row->panoramic_material_id;
                    if ($row->audio_id != 0) {
                        $music_id = $row->audio;
                        $music['mediaUrl'] = $music_id->getAudioUrl($music_id);
                        $music['mediaTitle'] = $music_id->title;
                    }
                    $bg_music[] = $music;
                    unset($music);
                }*/

                /*if ($pano->commentary_type == 2) {
                    $music['mediaID'] = $row->commentary_id;
                    $music['sceneID'] = $row->panoramic_material_id;
                    if ($row->commentary_id != 0) {
                        $music_id = $row->commentary;
                        $music['mediaUrl'] = $music_id->getAudioUrl($music_id);
                        $music['mediaTitle'] = $music_id->title;
                    }
                    $speech_explain[] = $music;
                    unset($music);
                }*/

                /*if ($pano->mask == 2) {

                    $mask['useShade'] = $row->mask_id;
                    $mask['type'] = $row->mask_type;
                    $mask['sceneID'] = $angle_of_view['sceneName'];
                    $mask['size'] = $row->mask_size;
                    if ($row->mask_id != 0) {
                        $mask_id = $row->maskPic;
                        $mask['imgPath'] = $row->mask_id == -1 ? $pano->defaultMask : $mask_id->getThumbs($mask_id)['default'];
                    }
                    $sky_land_shade[] = $mask;
                    unset($mask);
                }*/
                //$comment = $row->getComment();
            } else {
                $angle_of_view['hlookat'] = 0;
                $angle_of_view['vlookat'] = 0;
                $angle_of_view['fov'] = 95;
                $angle_of_view['fovmin'] = 5;
                $angle_of_view['fovmax'] = 120;
                $angle_of_view['vlookatmin'] = 90;
                $angle_of_view['vlookatmax'] = -90;
                $angle_of_view['keepView'] = 0;
                $angle_of_view['hlookatmin'] = -180;
                $angle_of_view['hlookatmax'] = 180;
            }
            $returnData['angle_of_view'][] = $angle_of_view;
            $returnData['hotspot'][$angle_of_view['sceneName']] = $hotspot;
            $returnData['commentInfo'][$angle_of_view['sceneName']] = $comment;
            $returnData['special_effects']['effectSettings'][] = $special_effects;
        }
        $returnData['bg_music']['isWhole'] = 1;
        $returnData['bg_music']['sceneSettings'][0]['mediaID'] = 0;
        /*if ($pano->music_type == 1) { // 背景音乐
            $returnData['bg_music']['sceneSettings'][0]['mediaID'] = $pano->global_music;
            if ($pano->global_music != 0) {
                $music = $pano->audio;
                $returnData['bg_music']['sceneSettings'][0] = array(
                    "mediaID" => $pano->global_music,
                    "mediaUrl" => $music->getAudioUrl($music),
                    "mediaTitle" => $music->title
                );
            }
        } else {
            $returnData['bg_music']['sceneSettings'] = $bg_music;
        }*/

        $returnData['speech_explain']['isWhole'] = 1;
        $returnData['speech_explain']['sceneSettings'][0]["mediaID"] = 0;
        /*if ($pano->commentary_type == 1) { // 解说
            $returnData['speech_explain']['sceneSettings'][0]["mediaID"] = $pano->global_commentary;
            if ($pano->global_commentary != 0) {
                $music = $pano->commentary;
                $returnData['speech_explain']['sceneSettings'][0] = array(
                    "mediaID" => $pano->global_commentary,
                    "mediaUrl" => $music->getAudioUrl($music),
                    "mediaTitle" => $music->title
                );
            }
        } else {
            $returnData['speech_explain']['sceneSettings'] = $speech_explain;
        }*/
        // custom_right_button 自定义按钮
        $returnData['custom_right_button']['linkSettings'] = [];
        /*foreach ($pano->getCustomIcon() as $key => $iconVal) {
            $iconData['title'] = $iconVal->title;
            $iconData['icon_id'] = $iconVal->icon_id;
            $iconData['icon'] = $iconVal->icon_id == -1 ? $pano->defaultIcon : $iconVal->getIcon();
            $iconData['icon_type'] = $iconVal->icon_type == 2 ? 'custom' : 'system';
            $iconData['type'] = $iconVal->type;
            if ($iconVal->type == 3) {
                $iconData['address'] = $iconVal->address;
                $iconData['lat'] = $iconVal->lat;
                $iconData['lng'] = $iconVal->lng;
            } else {
                $iconData['content'] = $iconVal->content;
            }
            $returnData['custom_right_button']['linkSettings'][] = $iconData;
        }*/

        //遮罩
        $returnData['sky_land_shade']['isWhole'] = 1;
        $returnData['sky_land_shade']['shadeSetting'][0] = array(
            "useShade" => 0,
            "type" => 1,
            "size" => 100
        );
        /*if ($pano->mask == 1) {

            $returnData['sky_land_shade']['shadeSetting'][0] = array(
                "useShade" => $pano->mask_id,
                "type" => $pano->mask_type,
                "size" => $pano->mask_size
            );
            if ($pano->mask_id != 0) {
                $music = $pano->maskPic;
                $returnData['sky_land_shade']['shadeSetting'][0]["imgPath"] = $pano->mask_id == -1 ? $pano->defaultMask : $music->getThumbs($music)['default'];
            }
        } else {
            $returnData['sky_land_shade']['shadeSetting'] = $sky_land_shade;
        }*/
        // 开场提示
        $openAlert['iconID'] = 0;
        /*if ($openAlert['iconID'] != 0) {
            $openAlert['imgPath'] = $openAlert['iconID'] == -1 ? $pano->openAlert : $pano->openingTips->getThumbs($pano->openingTips)['default'];
        }*/
        $returnData['openAlert'] = $openAlert;
        // 自定义logo
        $customLogo['useCustomLogo'] = $pano->custom_logo;
        $customLogo['logoLink'] = 'http://we.taagoo.com';
        $customLogo['imgPath'] = $customLogo['useCustomLogo'] == 0 ? $pano->defaultLogo : $pano->customLogo->getThumbs($pano->customLogo)['default'];
        $returnData['custom_logo'] = $customLogo;

        // 启动画面
        $loadingImg['useLoadingImg'] = 0;
        /*if ($loadingImg['useLoadingImg'] != 0) {
            $loadingImg['lodingImgPath'] = $loadingImg['useLoadingImg'] == -1 ? $pano->defaultLogo : $pano->customLogo->getThumbs($pano->customLogo)['default'];
        }*/
        $returnData['loading_img'] = $loadingImg;
        $tour_guide['useStartImg'] = 0;
        $tour_guide['useEndImg'] = 0;
        $tour_guide['startImgUrl'] = '';
        $tour_guide['endImgUrl'] = '';
        $tour_guide['points'] = [];
        $returnData['tour_guide'] = $tour_guide;
        //$countNum = $pano->getCounterNum($pano->id);
        // 点赞数
        $returnData['praiseNum'] = 0;
        //人气数
        $returnData['counterNum'] = ['click' => 0];

        return $returnData;
    }

    /**
     * 添加动景
     * @param $shop_id string 店铺ID
     * @return mixed
     */
    public static function createPanoramic($shop_id)
    {
        $panoramicModel = self::findOne(['shop_id'=>$shop_id,'status'=>1]);
        if(!$panoramicModel){
            $panoramicModel = new self();
            $panoramicModel->scenario = 'create';
            $panoramicModel->member_id = Yii::$app->user->id;
            $panoramicModel->shop_id = $shop_id;
            $panoramicModel->template = 1; // 默认模板
            if(!$panoramicModel->save()){
                return false;
            }
        }
        return $panoramicModel;
    }
}
