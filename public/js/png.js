//验证码验证
function captchaVerify(pic_id) {
  var captcha = new TencentCaptcha('2060717600', function(ret) {
    if (ret.ret == 1) {
      layer.msg('抱歉，验证失败！');
      return false;
    }
    var url = '/callback/captcha/verify';
    $.get(url, ret, function(data) {
      if (data.res_code == 'SUCCESS') {
        pngDownload(pic_id);
      } else {
        layer.msg('抱歉，验证失败！');
      }
    }, 'json');
  });
  captcha.show();
}
//登录
function signIn() {
  login_box = layer.open({
    type: 2,
    title: false,
    shadeClose: false,
    offset: '180px',
    closeBtn: [1, true],
    area: ['400px', '250px'],
    content: ['/login', 'no']
  });
}
//注册
function signUp() {
  login_box = layer.open({
    type: 2,
    title: false,
    shadeClose: false,
    offset: '180px',
    closeBtn: [1, true],
    area: ['400px', '380px'],
    content: ['/register', 'no']
  });
}
//图片举报
function picReport(pic_id) {
  $.get('/ajax/is_login', function(res) {
    if (res.res_code === 'NO_LOGIN') {
      signIn();
      return false;
    }
    var url = '/service/report?pic_id=' + pic_id;
    layer.open({
      type: 2,
      title: '举报图片',
      shadeClose: false,
      area: ['380px', '480px'],
      content: [url, 'no']
    });
  }, 'json');
}
//图片缩放
function picZoomOut() {
  layer.open({
    type: 1,
    title: false,
    area: ['710px', '710px'],
    content: $('#png-img-zoom')
  });
}

function picZoomIn() {
  layer.closeAll();
}

//用户信息
$(function() {
  $("img.lazy").lazyload();

  layui.use(['layer', 'element'], function() {
    var layer = layui.layer;
    //下载操作
    $('#btnPngDown').click(function() {
      var id = $(this).attr('data-id');
      window.open('/down/' + id);
    });

    //图片举报
    $('#toPngReport').click(function() {
      var pic_id = $(this).attr('data-id');
      picReport(pic_id);
    });
  });
});
