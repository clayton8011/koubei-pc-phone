<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "{{%voucher}}".
 *
 * @property string $item_id
 * @property string $voucher_type
 * @property string $shop_name
 * @property string $voucher_detail_url
 * @property string $item_name
 * @property string $item_logo
 * @property string $shop_id
 * @property string $mall_id
 */
class Voucher extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%voucher}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['item_id', 'shop_id', 'mall_id'], 'required'],
            [['item_id', 'voucher_type', 'shop_id', 'mall_id'], 'string', 'max' => 64],
            [['shop_name'], 'string', 'max' => 255],
            [['voucher_detail_url', 'item_name', 'item_logo'], 'string', 'max' => 512]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'item_id' => '优惠券ID',
            'voucher_type' => '优惠券类型',
            'shop_name' => '店铺名称',
            'voucher_detail_url' => '店铺url',
            'item_name' => '优惠券名称',
            'item_logo' => '活动logo',
            'shop_id' => '店铺ID',
            'mall_id' => 'mallId',
        ];
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
            'create' => ["item_id","voucher_type","shop_name","voucher_detail_url","item_name","item_logo","shop_id","mall_id"],
            'update' => ["item_id","voucher_type","shop_name","voucher_detail_url","item_name","item_logo","shop_id","mall_id"],
        ];
    }
}
