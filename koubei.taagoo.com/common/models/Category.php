<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "{{%category}}".
 *
 * @property string $id
 * @property string $name
 * @property string $level
 * @property integer $created_at
 */
class Category extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%category}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id','pid','koubei_id', 'created_at'], 'integer'],
            [['name'], 'string', 'max' => 100],
            [['level'], 'string', 'max' => 512]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => '分类ID',
            'pid'=>'父分类',
            'koubei_id'=>'口碑ID',
            'name' => '分类名称',
            'level' => '分类登记',
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
            'create' => ["id","pid","koubei_id","name","level","created_at"],
            'update' => ["id","pid","koubei_id","name","level","created_at"],
        ];
    }
}
