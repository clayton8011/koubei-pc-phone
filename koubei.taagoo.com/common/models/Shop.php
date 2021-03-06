<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "{{%shop}}".
 *
 * @property string $shop_id
 * @property string $merchant_pid
 * @property string $gmt_create
 * @property string $status
 * @property double $star
 * @property double $score
 * @property string $province_code
 * @property string $city_code
 * @property string $district_code
 * @property string $pic_coll
 * @property string $brand_name
 * @property string $main_image
 * @property string $shop_type
 * @property string $main_shop_name
 * @property string $address
 * @property string $longitude
 * @property string $latitude
 * @property string $branch_shop_name
 * @property string $is_show
 * @property integer $created_at
 */
class Shop extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%shop}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['shop_id'], 'required'],
            [['star', 'score'], 'number'],
            [['pic_coll', 'main_shop_name', 'address'], 'string'],
            [['created_at'], 'integer'],
            [['shop_id'], 'string', 'max' => 64],
            [['merchant_pid'], 'string', 'max' => 16],
            [['gmt_create', 'status', 'province_code', 'city_code', 'district_code', 'brand_name', 'shop_type', 'longitude', 'latitude', 'branch_shop_name'], 'string', 'max' => 32],
            [['main_image','category_ids'], 'string', 'max' => 512],
            [['is_show'], 'string', 'max' => 1]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'shop_id' => '店铺ID',
            'merchant_pid' => '商户PID',
            'gmt_create' => '创建时间',
            'category_ids'=>'分类字符串',
            'status' => '开店状态',
            'star' => '星级',
            'score' => '分数',
            'province_code' => '省份编码',
            'city_code' => '城市编码',
            'district_code' => '区县编码',
            'pic_coll' => '图片集',
            'brand_name' => '品牌名称',
            'main_image' => '品牌LOGO',
            'shop_type' => '商店类型',
            'main_shop_name' => '主店名',
            'address' => '门店详细地址',
            'longitude' => '经度',
            'latitude' => '纬度',
            'branch_shop_name' => '分店名称',
            'is_show' => '门店是否在客户端显示T显示F表示隐藏',
            'created_at' => '创建时间',
        ];
    }
    public function beforeValidate()
    {
        if($this->scenario!='default' && $this->scenario!='search'){
            if ($this->isNewRecord) {
                $this->created_at = time();
            }
        }
        return parent::beforeValidate();;
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
            'create' => ['category_ids',"shop_id","merchant_pid","gmt_create","status","star","score","province_code","city_code","district_code","pic_coll","brand_name","main_image","shop_type","main_shop_name","address","longitude","latitude","branch_shop_name","is_show","created_at"],
            'update' => ['category_ids',"shop_id","merchant_pid","gmt_create","status","star","score","province_code","city_code","district_code","pic_coll","brand_name","main_image","shop_type","main_shop_name","address","longitude","latitude","branch_shop_name","is_show","created_at"],
        ];
    }

    public function getCatogoryRealition()
    {
        return $this->hasMany(CategoryRelation::className(), ['shop_id' => 'shop_id']);
    }
}
