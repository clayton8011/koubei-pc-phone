<?php //此文件为首页、等layout文件?>
<?= $this->render('_head'); ?>
    <div class="wrapper base-width clearfix">
        <?= $this->render('_left'); ?>
        <div class="content-right pull-right">
            <?= $content ?>
        </div>
    </div>
<?php $this->endBody() ?>
    </body>
    </html>
<?php $this->endPage() ?>