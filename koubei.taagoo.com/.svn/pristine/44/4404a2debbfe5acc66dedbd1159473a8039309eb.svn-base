<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "tg_scenic_notice".
 *
 * @property integer $id
 * @property string $title
 * @property string $content
 * @property integer $scenic_id
 * @property integer $lock
 * @property integer $created_at
 */
class ScenicNotice extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'tg_scenic_notice';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['title','content'], 'required'],
            [['id', 'scenic_id', 'lock', 'created_at'], 'integer'],
            [['content'], 'string'],
            [['title'], 'string', 'max' => 50],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => 'Title',
            'content' => 'Content',
            'scenic_id' => 'Scenic ID',
            'lock' => 'Lock',
            'created_at' => 'Created At',
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
            'create' => ['id','title','content','scenic_id','lock','created_at'],
            'update' => ['id','title','content','scenic_id','lock','created_at']
        ];
    }
}
