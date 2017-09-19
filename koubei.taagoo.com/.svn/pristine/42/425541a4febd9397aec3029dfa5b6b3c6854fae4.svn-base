<?php

namespace frontend\modules\scenic\controllers;

use common\models\KoubeiServiceMarketOrder;
use common\models\PanoramicMaterial;
use common\models\ScenicAudio;
use common\models\ScenicDrawing;
use Yii;
use common\models\Scenic;
use common\models\Panoramic;
use common\models\PanoramicList;
use yii\web\ForbiddenHttpException;
use yii\web\Response;


/**
 * Default controller for the `scenic` module
 */
class ScenicAdminController extends BaseController
{

    public $layout = '/scenic_backend';
    public $enableCsrfValidation = false;

    /**
     * 初始页面
     */
    public function actionIndex()
    {
        $scenicModel = Scenic::findOne(['user_id' => Yii::$app->user->id]);
        return $this->render('default', [
            'scenic' => $scenicModel ? true : false
        ]);
    }
    
    /**
     * 创建或修改景区
     * @return string
     */
    public function actionScenicArea()
    {
        $order = KoubeiServiceMarketOrder::findOne(['merchant_pid' => Yii::$app->user->Identity->user_id]);
        if($order){
            return $this->render('scenic_area',['order' => $order]);
        }
        throw new ForbiddenHttpException('The requested page does not exist.');
    }
    
    /**
     * 获取当前用户的景点信息
     */
    public function actionScenicInfo()
    {
        $return['status'] = 0;
        Yii::$app->response->format = Response::FORMAT_JSON;
        $scenicModel = Scenic::find()->where(['user_id' => Yii::$app->user->id])->asArray()->one();
        if($scenicModel && $scenicModel['panoramic_id']){
            $scenicModel['address'] = explode('|',$scenicModel['address']);
            if(count($scenicModel['address']) < 3){
                array_push($scenicModel['address'],'');
            }
            $return['data'] = $scenicModel;
            $return['status'] = 1;
            $return['data']['panoramicData'] = [];
            $panoramic = Panoramic::find()->where(['id' => $scenicModel['panoramic_id'], 'status' => 1])->one();
            if ($panoramic) {
                $panoramicList = PanoramicList::find()->where(['panoramic_id' => $panoramic->id, 'status' => 1])->limit(8);
                if ($panoramicList->count() > 0) {
                    $data = [];
                    foreach ($panoramicList->all() as $listKey => $listVal) {
                        $panoramicMaterialModel = $listVal->panoramicMaterial;
                        $data[$listKey]['scene_id'] = $listVal->panoramic_material_id;
                        $data[$listKey]['title'] = $listVal->getTitle()['default'];
                        $data[$listKey]['thumb'] = $panoramicMaterialModel->getThumbs()['default'];
                        $data[$listKey]['status'] = $panoramicMaterialModel->status;
                    }
                    $return['status'] = 1;
                    $return['data']['panoramicData'] = $data;
                }
            }
            // 音频
            $return['data']['audioData'] = ScenicAudio::find()
                ->where(['user_id' => Yii::$app->user->id, 'rel_type' => 1, 'rel_id' => $scenicModel['id'], 'status' => 1])
                ->select('id,title')->all();
            //手绘图
            $return['data']['drawingData'] = ScenicDrawing::find()->where(['user_id' => Yii::$app->user->id, 'status' => 1])->select('id,title')->all();
        }
        return $return;
    }
    
    /**
     * 添加全景
     */
    public function actionAddMaterial()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $return = ['status' => 0, 'data' => []];
        if (Yii::$app->request->post()) {
            $post = Yii::$app->request;
            $materialModel = PanoramicMaterial::addMaterial($post);
            if ($materialModel){
                $return['status'] = 1;
                $return['data']['scene_id'] = $materialModel->id;
            }
        }
        return $return;
    }

    /**
     * 获取缩略图
     */
    public function actionGetThumb()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $return = ['status' => 0];
        $post = Yii::$app->request;
        if($post->post()){
            $materialModel = PanoramicMaterial::findOne($post->post('scene_id'));
            if($materialModel){
                $return['status'] = 1;
                $return['data'] = $materialModel->getThumbs()['default'];
            }
        }
        return $return;
    }

    /**
     * 保存音频
     */
    public function actionSaveAudio()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $return = ['status' => 0, 'data' => []];
        if (Yii::$app->request->post()) {
            $post = Yii::$app->request;
            $audioModel = ScenicAudio::addAudio($post);
            if ($audioModel){
                $return['status'] = 1;
                $return['data']['id'] = $audioModel->id;
                $return['data']['title'] = $audioModel->title;
            }
        }
        return $return;
    }
    
    /**
     * 删除音频
     */
    public function actionDeleteAudio()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $return = ['status' => 0];
        if (Yii::$app->request->post()) {
            $post = Yii::$app->request;
            $audioModel = ScenicAudio::findOne($post->post('audio_id'));
            if($audioModel){
                $audioModel->scenario = 'delete';
                $audioModel->status = 2;
                if ($audioModel->save()){
                    $return['status'] = 1;
                }
            }
        }
        return $return;
    }
    
    /**
     * 重命名音频
     */
    public function actionRenameAudio()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $return = ['status' => 0];
        if (Yii::$app->request->post()) {
            $post = Yii::$app->request;
            $audioModel = ScenicAudio::findOne($post->post('audio_id'));
            if($audioModel){
                $audioModel->scenario = 'rename';
                $audioModel->title = $post->post('title');
                if ($audioModel->save()){
                    $return['status'] = 1;
                }
            }
        }
        return $return;
    }

    /**
     * 保存音频
     */
    public function actionSaveDrawing()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $return = ['status' => 0, 'data' => []];
        if (Yii::$app->request->post()) {
            $post = Yii::$app->request;
            $audioModel = ScenicDrawing::addDrawing($post);
            if ($audioModel){
                $return['status'] = 1;
                $return['data']['id'] = $audioModel->id;
                $return['data']['title'] = $audioModel->title;
            }
        }
        return $return;
    }

    /**
     * 删除音频
     */
    public function actionDeleteDrawing()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $return = ['status' => 0];
        if (Yii::$app->request->post()) {
            $post = Yii::$app->request;
            $drawingModel = ScenicDrawing::findOne($post->post('drawing_id'));
            if($drawingModel){
                $drawingModel->scenario = 'delete';
                $drawingModel->status = 2;
                if ($drawingModel->save()){
                    $return['status'] = 1;
                }
            }
        }
        return $return;
    }

    /**
     * 重命名音频
     */
    public function actionRenameDrawing()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $return = ['status' => 0];
        if (Yii::$app->request->post()) {
            $post = Yii::$app->request;
            $drawingModel = ScenicDrawing::findOne($post->post('drawing_id'));
            if($drawingModel){
                $drawingModel->scenario = 'rename';
                $drawingModel->title = $post->post('title');
                if ($drawingModel->save()){
                    $return['status'] = 1;
                }
            }
        }
        return $return;
    }
    
    /**
     * 保存景区
     */
    public function actionSaveScenic()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $return = ['status' => 0, 'data' => []];
        if (Yii::$app->request->post()) {
            $post = Yii::$app->request;
            $transaction = Yii::$app->db->beginTransaction();
            try {
                $scenicModel = Scenic::findOne(['user_id' => Yii::$app->user->id]);
                if($scenicModel){
                    $scenicModel->scenario = 'update';
                }else{
                    $scenicModel = new Scenic();
                    $scenicModel->scenario = 'create';
                    $scenicModel->user_id = Yii::$app->user->id;
                }
                $scenicModel->title = $post->post('title');
                $scenicModel->scenic_level = $post->post('scenic_level');
                $scenicModel->scenic_type = $post->post('scenic_type');
                $scenicModel->introduce = $post->post('introduce');
                $scenicModel->audio_id = $post->post('audio_id');
                $scenicModel->drawing_open = $post->post('drawing_open');
                $scenicModel->drawing = $post->post('drawing');
                $scenicModel->drawing = $post->post('drawing');
                $scenicModel->lng = $post->post('lng');
                $scenicModel->lat = $post->post('lat');
                $scenicModel->thumb = $post->post('thumb');
                $scenicModel->address_info = $post->post('address_info');
                $scenicModel->address = trim($post->post('address')[0].'|'.$post->post('address')[1].'|'.$post->post('address')[2]);
                if($scenicModel->scenario == 'create'){
                    $panoramicModel = new Panoramic();
                    $panoramicModel->scenario = 'create';
                    $panoramicModel->member_id = Yii::$app->user->id;
                    $panoramicModel->shop_id = 0;
                    $panoramicModel->template = 1; // 默认模板
                    if(!$panoramicModel->save()){
                        Yii::error($panoramicModel);
                        throw new \Exception(implode(',',$panoramicModel->errors));
                    }
                    $scenicModel->panoramic_id = $panoramicModel->id;
                }else {
                    $panoramicModel = Panoramic::findOne($scenicModel->panoramic_id);
                }
                PanoramicList::updateAll(['lock' => 1],'`panoramic_id`='.$panoramicModel->id.' and `status`=1');
                if($post->post('panoramicData')){
                    foreach ($post->post('panoramicData') as $sceneKey => $sceneVal){
                        $panoramicList = PanoramicList::findOne(['panoramic_id' => $panoramicModel->id, 'panoramic_material_id' => $sceneVal['scene_id'], 'status' => 1]);
                        if($panoramicList){
                            $panoramicList->scenario = 'update';
                        }else{
                            $panoramicList = new PanoramicList();
                            $panoramicList->scenario = 'create';
                            $panoramicList->panoramic_id = $panoramicModel->id;
                            $panoramicList->panoramic_material_id = $sceneVal['scene_id'];
                        }
                        $panoramicList->lock = 0;
                        $panoramicList->sort_val = $sceneKey;
                        $panoramicList->panoramic_material_title = $sceneVal['title'];
                        if(!$panoramicList->save()){
                            Yii::error($panoramicList);
                            throw new \Exception(implode(',',$panoramicList->errors));
                        }
                    }
                }
                PanoramicList::updateAll(['status' => 2],'`panoramic_id`='.$panoramicModel->id.' and `lock`=1');
                if(!$scenicModel->save()){
                    Yii::error($scenicModel);
                    throw new \Exception(implode(',',$scenicModel->errors));
                }

                if($post->post('audioData')){
                    foreach ($post->post('audioData') as $audioKey => $audioVal){
                        $scenicAudio = ScenicAudio::findOne($audioVal['id']);
                        $scenicAudio->scenario = 'update_type';
                        $scenicAudio->rel_type = 1;
                        $scenicAudio->rel_id = $scenicModel->id;
                        if(!$scenicAudio->save()){
                            Yii::error($scenicAudio);
                            throw new \Exception(implode(',',$scenicAudio->errors));
                        }
                    }
                }
                $transaction->commit();
                $return['status'] = 1;
            }catch (\Exception $e) {
                $error = $e->getMessage();
                $transaction->rollBack();
                $return['msg'] = $error;
            }
        }
        return $return;
    }
}