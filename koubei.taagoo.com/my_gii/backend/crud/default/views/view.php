<?php

use yii\helpers\Inflector;
use yii\helpers\StringHelper;

/* @var $this yii\web\View */
/* @var $generator yii\gii\generators\crud\Generator */

$urlParams = $generator->generateUrlParams();

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
?>

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model <?= ltrim($generator->modelClass, '\\') ?> */

$this->title = <?= $generator->generateString(($table_comment?$table_comment:Inflector::camel2words(StringHelper::basename($generator->modelClass))).'详情') ?>;
$this->params['breadcrumbs'][] = ['label' => <?= $generator->generateString(($table_comment?$table_comment:Inflector::pluralize(Inflector::camel2words(StringHelper::basename($generator->modelClass)))).'列表') ?>, 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>

<div class="col-md-3">
  <!-- Profile Image -->
  <div class="box box-primary">
    <div class="box-body box-profile text-center">
      <h3 class="profile-username" ><?= "<?= " ?> $model->id?></h3>
      <!-- <p class="text-muted text-center">xxx</p> -->
        <?= "<?= " ?>Html::a('修改', ['update', <?= $urlParams ?>], ['class' => 'btn btn-primary']) ?>
        <?= "<?= " ?>Html::a('删除', ['set-status', <?= $urlParams ?>,'status'=>1], [
        'class' => 'btn btn-danger',
        'data' => [
            'confirm' => '确定要删除吗？',
            'method' => 'post',
        ],
        ]) ?>
    </div><!-- /.box-body -->
  </div><!-- /.box -->

  <!-- About Me Box -->
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">详细信息</h3>
    </div><!-- /.box-header -->
    <div class="box-body">
        <?= "<?= " ?>DetailView::widget([
            'model' => $model,
            'template' => '<strong><i class="fa fa-file-text-o margin-r-5"></i>  {label}</strong><p class="text-muted">{value} </p> <hr>',
            'attributes' => [
        <?php
        if (($tableSchema = $generator->getTableSchema()) === false) {
            foreach ($generator->getColumnNames() as $name) {
                echo "            '" . $name . "',\n";
            }
        } else {
            foreach ($generator->getTableSchema()->columns as $column) {
                if($column->name=='id') continue;

                if(in_array($column->name,array('created_at','updated_at')))
                {
                  echo "                   ['attribute' => '" . $column->name . ($format === 'text' ? "" : ":" . $format) . "','value'=>date('Y-m-d H:i:s',\$model->$column->name)],\n";
                  continue;
                }
                if($column->name == 'status')
                {
                  echo "                   ['attribute' => 'status','value'=>common\models\Common::getStatus()[\$model->status]],\n";
                  continue;
                }
                $format = $generator->generateColumnFormat($column);
                echo "                   '" . $column->name . ($format === 'text' ? "" : ":" . $format) . "',\n";
            }
        }
        ?>
            ],
        ]) ?>
    </div><!-- /.box-body -->
  </div><!-- /.box -->
</div>

<div class="col-md-9">
  <div class="nav-tabs-custom">
    <ul class="nav nav-tabs">
      <li class="active"><a data-toggle="tab" href="#activity">Activity</a></li>
      <li><a data-toggle="tab" href="#activity2">Activity2</a></li>
    </ul>
    </ul>
    <div class="tab-content">
      <div id="activity" class="active tab-pane">
        example.
      </div><!-- /.tab-pane -->
      <div id="activity2" class="tab-pane">
        example.
      </div><!-- /.tab-pane -->
    </div><!-- /.tab-content -->
  </div><!-- /.nav-tabs-custom -->
</div>