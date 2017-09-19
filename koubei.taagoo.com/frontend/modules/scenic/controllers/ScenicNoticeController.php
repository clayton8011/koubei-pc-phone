<?php

namespace frontend\modules\scenic\controllers;

use Yii;
use common\models\Scenic;
use common\models\ScenicNotice;
use yii\web\ForbiddenHttpException;
use yii\web\Response;

/**
 * Default controller for the `scenic-notice` module
 */
class ScenicNoticeController extends BaseController
{
    public $layout = '/scenic_backend';
    public $enableCsrfValidation = false;

    /**
     * 景区须知编辑
     */
    public function actionIndex()
    {
        $scenicModel = Scenic::findOne(['user_id' => Yii::$app->user->id]);
        if ($scenicModel) {
            $noticeList = ScenicNotice::find()->where(['scenic_id' => $scenicModel->id])->asArray()->all();
            return $this->render('index',[
                'noticeList' => $noticeList
            ]);
        } else {
            throw new ForbiddenHttpException('景区不存在，请返回编辑景区。');
        }
    }
    
    /**
     * 保存须知
     */
    public function actionSaveNotice()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $return = ['status' => 0];
        if (Yii::$app->request->post()) {
            $post = Yii::$app->request;
            $scenicModel = Scenic::findOne(['user_id' => Yii::$app->user->id]);
            $transaction = Yii::$app->db->beginTransaction();
            try {
                ScenicNotice::updateAll(['lock' => 1],['scenic_id'=> $scenicModel->id]);
                foreach ($post->post('data') as $noticeKey => $noticeVal){
                    if(isset($noticeVal['id']) && $noticeVal['id']){
                        $noticeModel = ScenicNotice::findOne($noticeVal['id']);
                        if($noticeModel){
                            $noticeModel->scenario = 'update';
                        }else{
                            $noticeModel = new ScenicNotice();
                            $noticeModel->scenario = 'create';
                        }
                    }else{
                        $noticeModel = new ScenicNotice();
                        $noticeModel->scenario = 'create';
                    }
                    $noticeModel->title = $noticeVal['title'];
                    $noticeModel->content = $noticeVal['content'];
                    $noticeModel->scenic_id = $scenicModel->id;
                    $noticeModel->lock = 0;
                    if(!$noticeModel->save()) {
                        Yii::error($noticeModel);
                        throw new \Exception(implode(',',$noticeModel->errors));
                    }
                    $return['data'][$noticeKey]['title'] = $noticeModel->title;
                    $return['data'][$noticeKey]['id'] = $noticeModel->id;
                }
                ScenicNotice::deleteAll(['scenic_id'=> $scenicModel->id, 'lock' => 1]);
                $transaction->commit();
                $return['status'] = 1;
            }catch (\Exception $e) {
                $error = $e->getMessage();
                //print_r($e);die;
                $transaction->rollBack();
                $return['msg'] = $error;
            }
        }
        return $return;
    }
}
