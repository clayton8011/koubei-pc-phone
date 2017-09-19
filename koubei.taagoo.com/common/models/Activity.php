<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "{{%activity}}".
 *
 * @property integer $id
 * @property string $title
 * @property integer $user_id
 * @property string $scenic_time
 * @property integer $sort
 * @property string $thumb_path
 * @property string $address
 * @property string $address_info
 * @property string $lat
 * @property string $lng
 * @property string $introduce
 * @property integer $is_ticket
 * @property string $ticket_price
 * @property string $traffic
 * @property integer $status
 * @property integer $created_at
 */
class Activity extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%activity}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_id', 'sort', 'is_ticket', 'status', 'created_at'], 'integer'],
            [['introduce', 'traffic'], 'string'],
            [['title'], 'string', 'max' => 50],
            [['scenic_time', 'ticket_price'], 'string', 'max' => 125],
            [['thumb_path'], 'string', 'max' => 512],
            [['address'], 'string', 'max' => 100],
            [['address_info'], 'string', 'max' => 200],
            [['lat', 'lng'], 'string', 'max' => 20]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => '活动标题',
            'user_id' => '用户ID',
            'scenic_time' => '开始时间',
            'sort' => '显示权重',
            'thumb_path' => '封面图',
            'address' => '地址',
            'address_info' => '详细地址',
            'lat' => '纬度',
            'lng' => '经度',
            'introduce' => '活动介绍',
            'is_ticket' => '是否有门票 1 有 2 没有',
            'ticket_price' => '门票价格',
            'traffic' => '交通攻略',
            'status' => '1上线 3下线 3删除',
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
            'create' => ["id","title","user_id","scenic_time","sort","thumb_path","address","address_info","lat","lng","introduce","is_ticket","ticket_price","traffic","status","created_at"],
            'update' => ["id","title","user_id","scenic_time","sort","thumb_path","address","address_info","lat","lng","introduce","is_ticket","ticket_price","traffic","status","created_at"],
        ];
    }
}
