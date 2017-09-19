<?php

use yii\helpers\Inflector;
use yii\helpers\StringHelper;

/* @var $this yii\web\View */
/* @var $generator yii\gii\generators\crud\Generator */

/* @var $model \yii\db\ActiveRecord */
$model = new $generator->modelClass();
$safeAttributes = $model->safeAttributes();
if (empty($safeAttributes)) {
    $safeAttributes = $model->attributes();
}

echo "<?php\n";
?>

use yii\helpers\Html;
use yii\widgets\ActiveForm;


/* @var $this yii\web\View */
/* @var $model <?= ltrim($generator->modelClass, '\\') ?> */
/* @var $form yii\widgets\ActiveForm */
?>

<?= "<?php " ?>$form = ActiveForm::begin(['options' => ['data-async' => '','callback'=>'(function(id){$.pjax.reload({container:"#pjax_data_list"});})']]); ?>
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title"><?='<?=$model->isNewRecord ? "新建" : "编辑"?>'?></h4>
    </div>
    <div class="modal-body">
    <?php foreach ($generator->getColumnNames() as $attribute) {
        if (in_array($attribute, $safeAttributes) && $attribute!='id') {
            if(in_array($attribute, array('created_at','updated_at'))) continue;
            if($attribute=='status'){
                echo "    <?= \$form->field(\$model, 'status')->textInput()->dropDownList(common\models\Common::getStatus()); ?>\n\n";
                continue;
            }
            echo "    <?= " . $generator->generateActiveField($attribute) . " ?>\n\n";
        }
    } ?>
    </div>
    <div class="modal-footer">
        <?= "<?= " ?> Html::submitButton($model->isNewRecord ? '创建' : '更新', ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
    </div>
<?= "<?php " ?>ActiveForm::end(); ?>


