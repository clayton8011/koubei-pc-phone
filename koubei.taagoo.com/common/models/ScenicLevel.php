<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "{{%scenic_level}}".
 *
 * @property integer $id
 * @property string $name
 * @property integer $created_at
 */
class ScenicLevel extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%scenic_level}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name'], 'required'],
            [['created_at'], 'integer'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => '等级名称',
            'created_at' => '创建日期',
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
            'create' => ['name', 'created_at'],
            'update' => ['name', 'created_at']
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
     * 获取选择值
     * @date   2016-03-10T15:52:55+0800
     * @author cnzhangxl@foxmail.com
     * @param  [type]                   $show_select [description]
     * @return [type]                                [description]
     */
    public static function getSelect($show_select=true){
        $query = self::find();
        $data = $query->all();
        return ($show_select?['' => '请选择']:[])+yii\helpers\ArrayHelper::map($data, 'id', 'name');
    }
}
