<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "{{%category_relation}}".
 *
 * @property integer $id
 * @property integer $category_id
 * @property string $shop_id
 * @property integer $created_at
 */
class CategoryRelation extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%category_relation}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'category_id','mall_id', 'created_at'], 'integer'],
            [['shop_id'], 'string', 'max' => 64]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'category_id' => '分类ID',
            'mall_id'=>'店铺所属mallID',
            'shop_id' => '店铺ID',
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
            'create' => ["id","category_id",'mall_id',"shop_id","created_at"],
            'update' => ["id","category_id",'mall_id',"shop_id","created_at"],
        ];
    }

    public function getCategory(){
        return $this->hasOne('common\models\Category', ['id' => 'category_id']);
    }
}
