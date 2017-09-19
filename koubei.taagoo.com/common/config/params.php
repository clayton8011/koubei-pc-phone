<?php
return [
    /*'adminEmail' => 'admin@example.com',
    'supportEmail' => 'support@example.com',
    'user.passwordResetTokenExpire' => 3600,
    'line_www_domain' =>'http://we.taagoo.com',//显示www地址
    'pano_format_domain'=>'http://test-pano.taagoo.cn/', // 线上pre环境改为 http://i%d.taagoo.com/
    'pano_format_domain_num'=>4,//这个是分流域名的数量
    ## 阿里账号配置
    'aliyun_app' => [
        'gatewayUrl' => 'https://openapi.alipay.com/gateway.do', //API网关 注意沙箱应用和应用不同
        'appId' => '2017050407108776', // appID
        // 开发者私钥
        'rsaPrivateKey' => 'MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDVDDFsRb4jybGaIAgAlHXNrosYDOyvk2ED4V3QIgnQPG8MjgWl3DVtFg+tKaUOhHXWBKffyWFAFWWU02bnIuoPiPHNe1XdNyXInxm9kTQFkCXIsJebEjOx73EsisUQmI0l/MFcR4IVJUz6rwiJ3vAiK0jnyZgEzu+XoqShZ1zOF5hvYrjKQqVvZo5dWgM2EcEQeEH7l4Z2Dn6WGUPn2+mlC/1RTVj+3hSX3B1ohH9+JIe2UpR1U530Y5c+ud2FI9eH7+emjLhOlsMPCMr/PW3BUSzgetAxAWXCNgNkFavzUVG+RqydKOZPRTPakDM1TwikfipThvRq+hE3J2Qmc9LlAgMBAAECggEAUkjDTe4h4fCkh8KXVKICXc5sKn3TbHyfm8APW7PJ1oOA4Hh59fV3LQq4Q0kyVskSOfbSX7yHsxiQg0qjE+KIRDfALHzWTPpfvXy1lGHglcV20mxiIaKGFNNGAs4WDrLc0S8t/1YfB8vAT5IK2jUgyhGttthFvpWuNAK9Uxl43p/J40Sal5BLEiEsyI+9DdQGR3SzKeY3f63tzPiuwnyvknwW6R+EKwDfoimsee5a2Y+Vkzbc0yWEVuumvZM/cI/nHhzPhvY6BSm725yPAk2cdq2zIS0N9f05UuaaFiQx3TOYDls1cdONVWlcufu3r1WIGqnEfztpKqhoqJDc+6XcAQKBgQDw+7zoaEdaWtBY6MVgVfNQILTct1zJbGDGTLBbsz1S7rSZCTID497fCp22gn7y5QMojrxFMIQPuybgscjEK4hRPpX5tKAZ2lY1cjAJ9DYCu3ji9j9alVI023UBvlmXPb3cjvvCLy/oPjqY7SpIT2lzIpTPZQDBGmbLDoWt82YPGQKBgQDiUtA7i/HhjIige2mJAkCLMnvs4uFmPg20dGNyxdGKlYkjLVdlLl1H9/N+KgneuRC2gmeLCogd9MmFQ4k9jy0/RHT6NIlAUjtdVgvILLjJKLH/+XEH3PJafOyRDaQM7YK8sI3e+GZkPxew5q2WUONntdZE1Uf5+AsmRS137w93rQKBgQDKd1bSFLrOSTp/WKJsPAp/KduLDWuht7LfKJOLl95QDUoiwb0J06vuzSaQrrcmMA8lRjccEpUB+oXBht1dJA4V5HVxJLbWwcBoixWdZ1bxmL0KQ0YbPxWgXznBS0JOdYtNAby3+5lOkOn+jlRWCJJaL5XDYeLuWtY+iGb8LWF0EQKBgQCxslPMbRR9AtpDJqK18A69O+YRGBHhNNeN19Q9SRQ8uyvxcqgryTt0Rjnn1RnqxWNZ6QljIeG9o3SWLXCT5Nah1h4CVT1uQyJZJjYZ9QMg7dLUKAWXJuMiKPOU8CDeBZ2giP7bEi1SiDcRrgyc+OWTiDGz2cGpghc+9RG+GPUMAQKBgQCkdkP4ISNNwGQ1J7vS+J+MsyyBx4XiPN3dWytICL21ZGoRkvKgJtLe57r7218EW0RTPCHnckktZo251lC6qs7xtE/7atnynYnLRpquvn9KzKK4zHOMoyzD4cb/uOXZUlH+V+ew0nWNWKcsTrNJ2X2JOnPW8RT6Nju0n8AHorUVDA==',
        'charset' => 'UTF-8', // 编码
        'signType' => 'RSA2', // 密钥类型
        //支付宝公钥
        'alipayrsaPublicKey' => 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5WdYunwpynIxQHXj6scfB9yrwTEgkKBpaF4tJZ6gbLlEWEfMy2lKeTg2ZxCx42QhKbZ0vMY3LljdaE6ZDld7kG67zGYQbstEdNa8W66LauzfphlhEJZmE9rjxA00vkKb18dn2wj3WkAdj6kCdxyKXf5LJsWfP+CZlTJwshtMti7wRd2mHh15hX8aDLD5EABOt7tV/Z6VY6INCoId92W8KWmij+eCd8q4k/8Vnp9NUMdcyDT6esHudDZVUP3tnWzZlLnoReG59U+u7qHJs7Dyvzp0TvMrM9nK90ToVR0uo4d9Rq7zkoPjR+9mjl6vJbbdqjexFicOuyzi+ipMta5rkQIDAQAB',
        'openauth' => 'https://openauth.alipay.com/oauth2/appToAppAuth.htm', //授权登录 注意沙箱应用和应用不同
        'redirect_uri' => 'http://koubei.taagoo.com/auth/auth.html', //授权回调地址
        'aes' => 'agGgLK3yaNC7mKyHhmuziw==', // AES 密钥
        'format' => 'json', // AES 密钥
    ],
    //切图服务配置
    'cut_service'=>[
        'ip'=>'192.168.1.66',
        'port'=>'9501',
        'timeout'=>50,
        'notify_sign'=>'woeqqjdfposasdfiuy98&U'
    ],
    //动景云商 websocket配置
    'cloud_websocket_service'=>[
        'ws_server'=>'ws://prewei.taagoo.com:9701/',
        //签名，防止非法访问socket
        'websocket_token'=>'qwertyuiopasdfghjkl123'
    ],*/

//
   'adminEmail' => 'admin@example.com',
   'supportEmail' => 'support@example.com',
   'user.passwordResetTokenExpire' => 3600,
   'line_www_domain' =>'http://we.taagoo.com',//显示www地址
   'pano_format_domain'=>'http://test-pano.taagoo.cn/', // 线上pre环境改为 http://i%d.taagoo.com/
   'pano_format_domain_num'=>4,//这个是分流域名的数量
   ## 阿里账号配置
   'aliyun_app' => [
       'gatewayUrl' => 'https://openapi.alipaydev.com/gateway.do', //API网关 注意沙箱应用和应用不同
       'appId' => '2016080200145712', // appID
       // 开发者私钥
       'rsaPrivateKey' => 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDR1fFDYHlfWLk+LZ/NHVFOO4+b3uH7fgE/Rqsl0P8vhndTWYum5YV2COgvQlXcSLuQJQycvGszFXXmlElbKJ2RB5wa8ohCaGt3zosRc9mYJr+Yej7pbJDd6gFbkDhGJuyFUe9i99XOJbhBA7GpjLsjk770FINbrFyp9XLb/pCxYTOrXkGlTyoAAe5dQY/c/e/JthnPUSOPaW79bufFy2MAMRPP5ikZ48R9k8KPr3r5gpoiWD7+GPaNP9xCDRD0vOuhDBGwks5CBrTey30NYXZCoNsC+yxpZGU99Ah8P7gaH5q42Cw/ri2uG4nFjgbX5QupIgaobAyRjPZkjICqLzgnAgMBAAECggEAa3Ywj7vpjK3oeHJvI2F/URxpqH7VprFaPCiZ380P0yv/Ej2Kqpdi6RcYqZNEW4MYI3MF6YMJN2knL0YD515+i1alWJuasr+9QecSC4cUCbrWZmU8sNh7vFpqBZVvbGXkvUY/3aRk56UjnpAgvV8oO8kfguq6dwlnj1b3UrklKuFZ0VXMd8WacaEGN4B8263NDHO6S7A7Evw2kuhraUb7x4ABJh8w1LUpoXLH+/Wm9GLlx8OMndkACiazlo+JjRxKx9aP5qafumwdFluh0KazIVh1KsniLdlKo3f+oTLfFvo3K5o+ENy1z91/OW5Um8sPifuJD2sUCpOK7TxWADBk0QKBgQD41tCqN1/qhk9YRt3+76WlgrXoeDweTFeJq/JDsWvdwGXpdU4tV3CL2zPgcpED4+SfpweAxxSL9/tgwol4T7Phkx9NqMwgD59WkU4KL7QLQj6U0zRVTzAwW0CD46wrD+AuGBLCcFO/UNbR+aM/Hf7GOJqGH01jfYNw3SFpkrLxCQKBgQDX38qPKCxjTq7P1qYLUNzfXIrYrPC1RXSBu8KY8iFo5uPGNlChCChJXzJMX6njT1umHfnPY46M3gcXUTT02RIpm6+cYZuwdEp2zlueoUtsFZGFtMS8PZORnzN9kdRzX/R9vN4VQFUrsDzI4+TBEve8Tiy6PsgX0uTzp98AsYybrwKBgCbGMlWTs1pz+0EiKc1jwkf8CiRjN9rwwmMta96ocspnBHpQURI3oc3pJjg/IeGdTS6jdEPYwZbd2UnGhm083ia0KhiLyOLmDEoM8kAcFs36UI4YKvtwD245ieADRfyfyKrmDWZG4oXZLuAhKhLXta9leo6Tqhdqo2Se0GoG9eMhAoGAHZAhPk+jHIp2+DGOFbiiNtiGjzvHzxtO5EFhWe620pXkFY30psjmM34c9kaXjnCcvXgXcOZSbEovsGrHlMxxZ09R0lmvp4+VbwW9mFDAcnHVtvjVhG3uWp/xvj2NWauHYPzPcRuZTl1ZRa2n8yT01k3iZDMa1eBkyFVx/bdS6TMCgYEA9xrLk5p0pDZZh5SLHJpcFeIv2FJ+skxAhYt5v+yOWhGtAjq9O9q7Xw8bmuchz14DMnOONtezxKpw7Ri2qm8QsLJADxPZeIyZcS5Cjhy3ayAgDtUtoAFrW/Rh5HmWqPLk01S7DH6f0pBDZ7xxZOafjrkX9u77hbopHoQmYCjaiyI=',
       'charset' => 'UTF-8', // 编码
       'signType' => 'RSA2', // 密钥类型
       //支付宝公钥
       'alipayrsaPublicKey' => 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuLLZEXH0cRdpqcgZCVRhYuiTQSokNuP8qBJbVYL4fsiXEBvJemweOe15Yhj65E6DjqSUtot6sjHjVUSo7CQZG4xQDFZiTdqGz/zm1mxUBzRiospt63Iv4FA6EDnGv6qVdtpwinCLJP2AHe8uONE1dLNosQWp6bWXEArsnOtTFTzrxHQngU8P+XdohHXx5eeJJuiLazexvDf2ebkvjZzzybhI7H75KOvsgivaeLf00Gzw7P7CD/1eyRIUfFU/RpmJXOLxplyWlGchDVAITGqAX9wc//G2IWUcPLAMs+dmOWeWY/s+H7FAhmxNk0b0c13zAiPGkJH3hb8SmzUxDDzE3wIDAQAB',
       'openauth' => 'https://openauth.alipaydev.com/oauth2/appToAppAuth.htm', //授权登录 注意沙箱应用和应用不同
       'redirect_uri' => 'http://koubei.taagoo.com/auth/auth.html', //授权回调地址
       'aes' => 'dmvNDJd6azgBP98nsCYCfQ==', // AES 密钥
       'format' => 'json', // AES 密钥
   ],
   //切图服务配置
   'cut_service'=>[
       'ip'=>'192.168.1.66',
       'port'=>'9501',
       'timeout'=>50,
       'notify_sign'=>'woeqqjdfposasdfiuy98&U'
   ],
   //动景云商 websocket配置
   'cloud_websocket_service'=>[
       'ws_server'=>'ws://prewei.taagoo.com:9701/',
       //签名，防止非法访问socket
       'websocket_token'=>'qwertyuiopasdfghjkl123'
   ],
];
