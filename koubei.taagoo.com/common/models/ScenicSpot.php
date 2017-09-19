<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "{{%scenic_spot}}".
 *
 * @property integer $id
 * @property string $title
 * @property integer $user_id
 * @property integer $sort
 * @property integer $panoramic_id
 * @property string $introduce
 * @property integer $audio_id
 * @property integer $created_at
 */
class ScenicSpot extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%scenic_spot}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_id', 'sort', 'panoramic_id', 'audio_id', 'created_at','status','default_material_id'], 'integer'],
            [['introduce'], 'string'],
            [['title'], 'string', 'max' => 50]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => '景点名称',
            'user_id' => '用户ID',
            'sort' => '显示权重',
            'panoramic_id' => '动景ID',
            'introduce' => '景点介绍',
            'audio_id' => '景点解说',
            'status'=>'1正常 2 删除',
            'default_material_id'=>'默认图片',
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
            'create' => ["id","title","user_id","sort","panoramic_id","introduce","audio_id","created_at",'status','default_material_id'],
            'update' => ["id","title","user_id","sort","panoramic_id","introduce","audio_id","created_at",'status','default_material_id'],
        ];
    }

    /**
     * @return string
     */
    public function getThumb(){
        if($this->default_material_id){
            $material = PanoramicMaterial::findOne($this->default_material_id);
            if($material){
                return $material->getThumbs()['default'];
            }
        }
        return PanoramicList::findOne(['panoramic_id' => $this->panoramic_id, 'status' => 1])->panoramicMaterial->getThumbs()['default'];
    }
}
