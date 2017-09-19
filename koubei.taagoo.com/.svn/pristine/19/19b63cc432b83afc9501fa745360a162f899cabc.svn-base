<?php

use yii\helpers\Inflector;
use yii\helpers\StringHelper;

/* @var $this yii\web\View */
/* @var $generator yii\gii\generators\crud\Generator */

echo "<?php\n";
?>

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model <?= ltrim($generator->searchModelClass, '\\') ?> */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="<?= Inflector::camel2id(StringHelper::basename($generator->modelClass)) ?>-search">

    <?= "<?php " ?>$form = ActiveForm::begin([
        'id'=>'searchFormId',
        'action' => ['index'],
        'method' => 'get',
        'options'  => ['class'=>'search-form','data-pjax' => true]
    ]); ?>

<?php
$count = 0;
$tableSchema = $generator->getTableSchema();

foreach ($generator->getColumnNames() as $attribute) {
    // if (++$count < 6) {
        $column = $tableSchema->columns[$attribute];
        if($column->type!='text' && $attribute!='created_at' && $attribute!='updated_at' && $attribute!='id'){
            if($attribute=='status'){
                echo "    <?= " . "\$form->field(\$model, '".$attribute."')->textInput()->dropDownList(common\models\Common::getStatus());" . " ?>";
            }else if($attribute=='mg_id'){
                echo "    <?= " . "\$form->field(\$model, '".$attribute."')->textInput()->dropDownList(backend\models\Manager::getSelect());" . " ?>";
            }else{
                echo "    <?= " . $generator->generateActiveSearchField($attribute) . " ?>";
            }
            echo "\n";
        }
    // } else {
        //echo "    <?php // echo " . $generator->generateActiveSearchField($attribute) . " ?\>\n\n";
    // }
}
?>
    <div class="form-group search-btn">
        <?= "<?= " ?>Html::submitButton(<?= $generator->generateString('搜索') ?>, ['class' => 'btn btn-primary']) ?>
        <?= "<?= " ?>Html::resetButton(<?= $generator->generateString('重置') ?>, ['class' => 'btn btn-default']) ?>
    </div>
    <?= "<?php " ?>ActiveForm::end(); ?>
</div>
