<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "{{%scenic_audio}}".
 *
 * @property integer $id
 * @property string $title
 * @property integer $path
 * @property integer $user_id
 * @property integer $size
 * @property integer $status
 * @property integer $created_at
 */
class ScenicAudio extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%scenic_audio}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['title', 'path', 'user_id'], 'required'],
            [['user_id', 'created_at'], 'integer'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => '名称',
            'path' => '路径',
            'user_id' => '用户ID',
            'size' => '大小',
            'rel_type'=>'1景区,2景点',
            'rel_id'=>'对应rel_type的表ID',
            'status' => '状态',
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
            'create' => ['title', 'path', 'user_id', 'size', 'created_at','rel_type','rel_id'],
            'update'=>['rel_id'],
            'rename' => ['title'],
            'update_type' => ['rel_type', 'rel_id'],
            'delete' => ['status']
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
     * 添加音频
     */
    public static function addAudio($data)
    {
        $audioModel = new self();
        $audioModel->scenario = 'create';
        $audioModel->title = $data->post('file_title');
        $audioModel->size = $data->post('size');
        $audioModel->path = $data->post('filename');
        $audioModel->user_id = Yii::$app->user->id;
        $audioModel->rel_type = $data->post('rel_type')?$data->post('rel_type'):1;
        if($audioModel->save()){
            return $audioModel;
        }
        return false;
    }
}
