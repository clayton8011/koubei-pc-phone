<?php

use yii\helpers\Inflector;
use yii\helpers\StringHelper;


/* @var $this yii\web\View */
/* @var $generator yii\gii\generators\crud\Generator */

$urlParams = $generator->generateUrlParams();
$nameAttribute = $generator->getNameAttribute();

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
use <?= $generator->indexWidgetType === 'grid' ? "yii\\grid\\GridView" : "yii\\widgets\\ListView" ?>;
use yii\widgets\Pjax;

/* @var $this yii\web\View */
<?= !empty($generator->searchModelClass) ? "/* @var \$searchModel " . ltrim($generator->searchModelClass, '\\') . " */\n" : '' ?>
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = <?= $generator->generateString(($table_comment?$table_comment:Inflector::camel2words(StringHelper::basename($generator->modelClass))).'列表') ?>;
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="col-xs-12">
    <div class="box box-primary">
        <div class="box-header with-border"><?php if(!empty($generator->searchModelClass)): ?> <?= "<?php " . ($generator->indexWidgetType === 'grid' ? "" : "") ?>echo $this->render('_search', ['model' => $searchModel]); ?><?php endif; ?></div>
        <div class="box-body  no-padding">
        <?php if ($generator->indexWidgetType === 'grid'): ?>
    <?= "<?php \n" ?>
            Pjax::begin(['id'=>'pjax_data_list']);
            echo GridView::widget([
                'layout' =>  '<div class="mailbox-controls">'.Html::a('<i class="fa fa-plus"></i>新建',['create'],['rhref'=>Yii::$app->urlManager->createUrl(['create']),'class'=>'btn btn-default btn-sm publish_btn','data-toggle'=>'modal','data-target'=>'#create_dialog']).Html::button('<i class="fa fa-check-circle "></i>删除',['class'=>'btn btn-default btn-sm pl','go_url'=>'.','pjax'=>'pjax_data_list','href'=>Yii::$app->urlManager->createUrl(['panoramic/set-status','status'=>1])]).'<div class="pull-right">{summary}</div></div>'."\n{items}\n{pager}",
                'options'=>['id'=>'mulitoperator-data-list'],
                'dataProvider' => $dataProvider,
                <?= (!empty($generator->searchModelClass) ? "//'filterModel' => \$searchModel,\n                'columns' => [\n" : "                'columns' => [\n")."                   ['class' => 'yii\grid\CheckboxColumn','name' => 'id','headerOptions' => ['width' => '35']],\n"; ?>
                        <?php
                            $count = 0;
                            if (($tableSchema = $generator->getTableSchema()) === false) {
                                foreach ($generator->getColumnNames() as $name) {
                                    if (++$count < 6) {
                                        echo "            '" . $name . "',\n";
                                    } else {
                                        echo "            // '" . $name . "',\n";
                                    }
                                }
                            } else {
                                foreach ($tableSchema->columns as $column) {
                                    $format = $generator->generateColumnFormat($column);
                                    // if (++$count < 6) {
                                    if(in_array($column->name,['id','updated_at'])){
                                        continue;
                                    }else if($column->name=='mg_id'){
                                        echo "            ['attribute' => 'mg_id','value'=>function(\$data){return \$data->manager->username;}],\n";
                                    }else if($column->name=='status'){
                                        echo "            ['attribute' => 'status','value'=>function(\$data){return common\models\Common::getStatus()[\$data->status];}],\n";
                                    }else if($column->name=='created_at'){
                                        echo "            ['attribute' => 'created_at','value'=>function(\$data){return date('Y-m-d H:i',\$data->created_at);}],\n";
                                    }else{
                                        if($column->type!='integer'){
                                            echo "            ['attribute' => '".$column->name."','value'=>function(\$data){return \$data->".$column->name.";},'enableSorting'=>false],\n";
                                        }else{
                                            echo "            ['attribute' => '".$column->name."','value'=>function(\$data){return \$data->".$column->name.";}],\n";
                                        }
                                    }
                                    // } else {
                                    //     echo "            // '" . $column->name . ($format === 'text' ? "" : ":" . $format) . "',\n";
                                    // }
                                }
                            }
                        ?>
                [
                    'class' => 'yii\grid\ActionColumn',
                    'template' => '{view} {update}',
                    'buttons' => [
                        'view'=>function($url,$model){
                            return Html::a('详细', $url,['data-pjax'=>0]);
                        },
                        'update'=>function($url,$model){
                            return Html::a('修改', $url,['class'=>'updateBtn','data-target'=>"#update_dialog",'data-toggle'=>"modal"]);
                        },
                    ]
                ],
            ],
        ]);
        Pjax::end();
        ?>
        <?php else: ?>
            <?= "<?= " ?>ListView::widget([
                'dataProvider' => $dataProvider,
                'itemOptions' => ['class' => 'item'],
                'itemView' => function ($model, $key, $index, $widget) {
                    return Html::a(Html::encode($model-><?= $nameAttribute ?>), ['view', <?= $urlParams ?>]);
                },
            ]) ?>
        <?php endif; ?>
</div>
    </div>
</div>
