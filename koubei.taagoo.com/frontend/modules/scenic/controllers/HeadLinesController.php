<?php

namespace frontend\modules\scenic\controllers;

use Yii;
use common\models\Headlines;
use yii\web\Response;

/**
 * Default controller for the `head-lines` module
 */
class HeadLinesController extends BaseController
{
    public $layout = '/scenic_backend';
    public $enableCsrfValidation = false;

    /**
     * 头条管理页面
     */
    public function actionIndex()
    {
        $headLines = Headlines::find()->where(['user_id' => Yii::$app->user->id])->orderBy('id desc')->asArray()->all();
        return $this->render('index',[
            'headlines' => $headLines
        ]);
    }
    
    /**
     * 保存数据
     */
    public function actionSaveHead()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $return = ['status' => 0];
        if (Yii::$app->request->post()) {
            $post = Yii::$app->request;
            if($post->post('id')){
                $headlineModel = Headlines::findOne(['id'=>$post->post('id'), 'user_id' =>Yii::$app->user->id ]);
                if($headlineModel){
                    $headlineModel->scenario = 'update';
                }else{
                    $headlineModel = new Headlines();
                    $headlineModel->scenario = 'create';
                }
            }else{
                $headlineModel = new Headlines();
                $headlineModel->scenario = 'create';
            }

            $headlineModel->title = $post->post('title');
            $headlineModel->source = $post->post('source');
            $headlineModel->sort = $post->post('sort');
            $headlineModel->thumb_path = $post->post('thumb_path');
            $headlineModel->pub_time = $post->post('pub_time');
            $headlineModel->content = $post->post('content');
            $headlineModel->user_id = Yii::$app->user->id;
            if($headlineModel->save()){
                $return['status'] = 1;
                $return['data']['id'] = $headlineModel->id;
            }else{
                $return['msg'] = implode(',',$headlineModel->errors);
            }
        }
        return $return;
    }

    /**
     * 删除头条
     */
    public function actionDelete()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $return = ['status' => 0];
        if (Yii::$app->request->post()) {
            $post = Yii::$app->request;
            $headlineModel = Headlines::findOne(['id'=>$post->post('head_id'), 'user_id' =>Yii::$app->user->id ]);
            if($headlineModel){
                if($headlineModel->delete()){
                    $return['status'] = 1;
                }
            }
        }
        return $return;
    }
}
