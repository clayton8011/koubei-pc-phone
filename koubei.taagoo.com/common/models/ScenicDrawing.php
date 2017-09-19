<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "{{%scenic_drawing}}".
 *
 * @property integer $id
 * @property string $title
 * @property integer $path
 * @property integer $user_id
 * @property integer $width
 * @property integer $height
 * @property integer $size
 * @property integer $created_at
 */
class ScenicDrawing extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%scenic_drawing}}';
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
            'title' => '景区名称',
            'path' => '路径',
            'user_id' => '用户ID',
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
            'create' => ['title', 'path', 'size', 'width', 'height', 'user_id', 'created_at'],
            'rename' => ['title'],
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
     * 添加手绘图
     */
    public static function addDrawing($data)
    {
        $drawingModel = new self();
        $drawingModel->scenario = 'create';
        $drawingModel->title = $data->post('file_title');
        $drawingModel->size = $data->post('size');
        $drawingModel->width = $data->post('width');
        $drawingModel->height = $data->post('height');
        $drawingModel->path = $data->post('filename');
        $drawingModel->user_id = Yii::$app->user->id;
        if($drawingModel->save()){
            return $drawingModel;
        }
        return false;
    }
}
