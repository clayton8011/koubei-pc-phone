<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "{{%headlines}}".
 *
 * @property integer $id
 * @property string $title
 * @property string $thumb_path
 * @property string $pub_time
 * @property string $source
 * @property integer $sort
 * @property string $content
 * @property integer $user_id
 * @property integer $created_at
 */
class Headlines extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%headlines}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['sort', 'user_id', 'created_at'], 'integer'],
            [['content'], 'string'],
            [['title'], 'string', 'max' => 100],
            [['thumb_path'], 'string', 'max' => 512],
            [['pub_time'], 'string', 'max' => 125],
            [['source'], 'string', 'max' => 50],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => '头条名称',
            'thumb_path' => '头条封面图',
            'pub_time' => '发布时间',
            'source' => '来源',
            'sort' => '权重',
            'content' => '内容',
            'user_id' => '用户ID',
            'created_at' => '创建时间',
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
            'create' => ['id','title','thumb_path','pub_time','source','sort','content','user_id','created_at'],
            'update' => ['id','title','thumb_path','pub_time','source','sort','content','user_id','created_at']
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
}
