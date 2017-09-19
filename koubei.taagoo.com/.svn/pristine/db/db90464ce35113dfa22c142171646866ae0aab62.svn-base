<?php
/**
 * This is the template for generating a CRUD controller class file.
 */

use yii\db\ActiveRecordInterface;
use yii\helpers\StringHelper;


/* @var $this yii\web\View */
/* @var $generator yii\gii\generators\crud\Generator */

$controllerClass = StringHelper::basename($generator->controllerClass);
$modelClass = StringHelper::basename($generator->modelClass);
$searchModelClass = StringHelper::basename($generator->searchModelClass);
if ($modelClass === $searchModelClass) {
    $searchModelAlias = $searchModelClass . 'Search';
}

/* @var $class ActiveRecordInterface */
$class = $generator->modelClass;
$pks = $class::primaryKey();
$urlParams = $generator->generateUrlParams();
$actionParams = $generator->generateActionParams();
$actionParamComments = $generator->generateActionParamComments();

echo "<?php\n";
$model = new $generator->modelClass;
$row = $model->db->createCommand('SHOW CREATE TABLE `' . $model->tableSchema->name.'`')->queryOne();
$table_comment = '';
if($row['Create Table']){
     preg_match('/COMMENT=\'(.*)\'$/', $row['Create Table'],$math);
     if($math[1]){
        $table_comment = $math[1];
     }
}
echo '//'.$table_comment.'管理';
?>

namespace <?= StringHelper::dirname(ltrim($generator->controllerClass, '\\')) ?>;

use Yii;
use <?= ltrim($generator->modelClass, '\\') ?>;
<?php if (!empty($generator->searchModelClass)): ?>
use <?= ltrim($generator->searchModelClass, '\\') . (isset($searchModelAlias) ? " as $searchModelAlias" : "") ?>;
<?php else: ?>
use yii\data\ActiveDataProvider;
<?php endif; ?>
use <?= ltrim($generator->baseControllerClass, '\\') ?>;
use yii\web\NotFoundHttpException;

/**
 * <?= $controllerClass ?> implements the CRUD actions for <?= $modelClass ?> model.
 */
class <?= $controllerClass ?> extends <?= StringHelper::basename($generator->baseControllerClass) . "\n" ?>
{

    /**
     * 列表
     * @return  {[type]} [description]
     * @version 1.0      <?= date('Y-m-d\TH:i:s+0800')?>

     * @author cnzhangxl@foxmail.com
     */
    public function actionIndex()
    {
<?php if (!empty($generator->searchModelClass)): ?>
        $searchModel = new <?= isset($searchModelAlias) ? $searchModelAlias : $searchModelClass ?>();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
<?php else: ?>
        $dataProvider = new ActiveDataProvider([
            'query' => <?= $modelClass ?>::find(),
        ]);

        return $this->render('index', [
            'dataProvider' => $dataProvider,
        ]);
<?php endif; ?>
    }


    /**
     * 详情
     * <?= implode("\n     * ", $actionParamComments) . "\n" ?>
     * @return  {[type]}                          [description]
     * @version 1.0      <?= date('Y-m-d\TH:i:s+0800')?>

     * @author cnzhangxl@foxmail.com
     */
    public function actionView(<?= $actionParams ?>)
    {
        return $this->render('view', [
            'model' => $this->findModel(<?= $actionParams ?>),
        ]);
    }

    /**
     * 新建
     * @return  {[type]}                          [description]
     * @version 1.0      <?= date('Y-m-d\TH:i:s+0800')?>

     * @author cnzhangxl@foxmail.com
     */
    public function actionCreate()
    {
        $this->layout=false;
        $model = new <?= $modelClass ?>(['scenario' => 'create']);
        <?php
            if(in_array('mg_id', $generator->getColumnNames())){
                echo '$model->mg_id = Yii::$app->user->id;';
            }
        ?>

        if ($model->load(Yii::$app->request->post())) {
            if($model->save()){
                return json_encode(['status'=>1]);
            }else{
                $msgArr = [];
                foreach($model->errors as $key=>$row){
                    $msgArr[] = implode(',',$row);
                }
                return json_encode(['status'=>0,'msg'=>implode("<br/>",$msgArr)]);
            }
        } else {
            return $this->render('create', [
                'model' => $model,
            ]);
        }
    }

    /**
     * 修改
     * <?= implode("\n     * ", $actionParamComments) . "\n" ?>
     * @return  {[type]}                          [description]
     * @version 1.0      <?= date('Y-m-d\TH:i:s+0800')?>

     * @author cnzhangxl@foxmail.com
     */
    public function actionUpdate(<?= $actionParams ?>)
    {
        $this->layout = false;
        $model = $this->findModel($id);
        $model->scenario = 'update';
        if ($model->load(Yii::$app->request->post())) {
            if($model->save()){
                return json_encode(['status'=>1]);
            }else{
                $msgArr = [];
                foreach($model->errors as $key=>$row){
                    $msgArr[] = implode(',',$row);
                }
                return json_encode(['status'=>0,'msg'=>implode("<br/>",$msgArr)]);
            }
        } else {
            return $this->render('update', [
                'model' => $model,
            ]);
        }
    }


    /**
     * Finds the <?= $modelClass ?> model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * <?= implode("\n     * ", $actionParamComments) . "\n" ?>
     * @return <?=                   $modelClass ?> the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel(<?= $actionParams ?>)
    {
<?php
if (count($pks) === 1) {
    $condition = '$id';
} else {
    $condition = [];
    foreach ($pks as $pk) {
        $condition[] = "'$pk' => \$$pk";
    }
    $condition = '[' . implode(', ', $condition) . ']';
}
?>
        if (($model = <?= $modelClass ?>::findOne(<?= $condition ?>)) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }


    /**
     * 修改状态
     * <?= implode("\n     * ", $actionParamComments) . "\n" ?>
     * @return  {[type]}                          [description]
     * @version 1.0      <?= date('Y-m-d\TH:i:s+0800')?>

     * @author cnzhangxl@foxmail.com
     */
    public function actionSetStatus($status){
        return $this->setStatus($status,"common\models\<?=$modelClass?>");
    }
}
