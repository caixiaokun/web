/**
 * Created by Administrator on 2016/6/15.
 */
window.onload= function () {
     $.ajax({
                type:'post',
                url:'js/message.php',
                async:true,
                dataType : "json",
                success:function(data){
                    var itemtext='';
                    for(var i = 0;i < data.length; i++){
                        itemtext+='<div class="message-item">';
                        itemtext+='<div class="message-item-con">';
                        itemtext+=data[i].content;
                        itemtext+='<div>';
                        itemtext+='<div class="info-txt clearfix">'
                        itemtext+= '<span class="date">'+data[i].date+'</span>'
                        itemtext+= '<span class="send-name">'+data[i].anthor+'</span>'
                        itemtext+='<div>';
                        itemtext+='<div>';
                     $('.show-message').prepend(itemtext).children(0).eq(0).hide().slideDown(300);
                         var itemtext='';
                    }       
                },
                error:function(){ 
                }
            })
       $(document).keyup(function () {
            var key=($("textarea").val()).length
            if(key>0){
                $('.clearText').addClass('clearbgcolor')
            }else if($("textarea").val()===''){
                $('.clearText').removeClass('clearbgcolor')
            }
      })
       //点击登录
       $('.right-nav').find('li').eq(2).click(function(){
         $('.mask-login').show();
       })
    //循环遍历创建表情
    var faceimg = '';
    for(i=0;i<75;i++){
        faceimg+='<li><a href="javascript:void(0)"><img src="images/face/'+(i+1)+'.gif" face="<emt>'+(i+1)+'</emt>"/></a></li>';
    };
    //检测输入框变化，清空文本按钮变色
    $("textarea").val()
    $("#select-face").prepend(faceimg);
    $('#closeface').click(function () {
        $('.faceimg').slideUp(300);
    });
    $('.clearText').click(function () {
        $('#txt-area').val(' ')
        $(this).removeClass('clearbgcolor')
    })
    $('.face-ico').click(function () {
        var disp=$('.faceimg').css('display')
        if(disp==='none'){
            $('.faceimg').slideDown(300);
        }else{
            $('.faceimg').slideUp(300);
        }

    });
    var faceArr= $('#select-face li img')
    var txtar=$('#txt-area')
    for(var i=0;i<faceArr.length;i++){
        faceArr.eq(i).click(function () {
            var txt=txtar.val();
            txt+=$(this).attr('face');
            $('.faceimg').slideUp(300);
            return  txtar.val(txt);
        })
    }
    var falg=true;
    $('.sendbtn').click(function () {
        var uname=$('.useername').html();
        if(uname==="用户名"){
            // alert('请您先登录')
            $('.mask-login').show();
            return false
        }
        else{
            if(txtar.val()==0){
                if(falg){
                    $('.sent-tip').eq(0).fadeIn(1).fadeOut(3000);
                    falg=false;
                }
                falg=true;
            }
            else{
                var datatime= new Date
                var day=datatime.getDate();
                var year=datatime.getFullYear();
                var month=datatime.getMonth();
		 var shi=datatime.getHours();
                var feng=datatime.getMinutes();
                var miao=datatime.getSeconds();
                var itemtext='';
                txts=txtar.val();
 		//var txts=txts.replace(/</g,'&lt;').replace(/>/g,'&gt;');
                for(var i=0;i<100;i++) {
                    for (var j = 0; j < 60; j++) {
                        txts = txts.replace('<emt>' + (i + 1) + '</emt>', '<img src="images/face/' + (i + 1) + '.gif"/>');
                    }
                }
                itemtext+='<div class="message-item">';
                itemtext+='<div class="message-item-con">';
                itemtext+=txts;
                itemtext+='<div>';
                itemtext+='<div class="info-txt clearfix">'
                itemtext+= '<span class="date">'+year+'-'+(month+1)+'-'+day+'</span>'
                itemtext+= '<span class="send-name">'+$('.useername').html()+'</span>'
                itemtext+='<div>';
                itemtext+='<div>';
                $('.show-message').prepend(itemtext).children(0).eq(0).hide().slideDown(400);
                $('.sent-tip').eq(1).fadeIn(1).fadeOut(3000);
                 $('#txt-area').val(' ')
                  $('.clearText').removeClass('clearbgcolor')
                //向数据库插入数据
                var obj={};
                obj.con=txts;
                obj.ant=$('.useername').html();
                obj.date=year+'-'+(month+1)+'-'+day+" "+shi+":"+feng+":"+miao;
                $.post('js/message.php',{data:obj},function(msg){
                    //插入成功返回信息
                    //alert(msg.info);
                },'json');
                //发送的时候重新请求更新数据库
                setTimeout(function(){
                      $.ajax({
                        type:'post',
                        url:'js/message.php',
                        async:true,
                        dataType : "json",
                        success:function(data){
                             $('.show-message').html(' ')
                            var itemtext='';
                            for(var i = 0;i < data.length; i++){
                                itemtext+='<div class="message-item">';
                                itemtext+='<div class="message-item-con">';
                                itemtext+=data[i].content;
                                itemtext+='<div>';
                                itemtext+='<div class="info-txt clearfix">'
                                itemtext+= '<span class="date">'+data[i].date+'</span>'
                                itemtext+= '<span class="send-name">'+data[i].anthor+'</span>'
                                itemtext+='<div>';
                                itemtext+='<div>';
                             $('.show-message').prepend(itemtext).children(0).eq(0).hide().show();
                                 var itemtext='';
                    }       
                },
                error:function(){ 
                }
            })
                  },200) 
            }
        }
    });
    $('.btn-login').click(function () {
            var un=$('#username').val();
            var pw=$('#password').val();
        var param='?username='+un+"&"+"password="+pw;
        $.ajax({
            type:'get',
            // url:'http://192.168.114.40/message/wjs/js/togin1.php'+param,//教室IP用
            url:'js/togin1.php'+param,
            dataType:'text',
            success: function (data) {
               if(data == 1){
                    $('.useername').html($('#username').val());
                       $('.log-off').html('退出登录')
                     $('.mask-login').fadeOut()
                }else if(data == 2){
                    alert("用户名或者密码错误");
                 
                   $('#password').val('');
                }
            },
            error: function () {
                alert('获取数据失败')
            }
        })

    })
    $('.btn-cancel').click(function () {
        $('.mask-login').fadeOut()
    })
    //退出登录
     $('.log-off').html()
        $('.log-off').click(function(){
            
              if($('.log-off').html()==='登录'){
                 $('.mask-login').show();
              }
              else{
                    var cname= $('.useername').html()
                     if(cname!='用户名'){
                        alert('确定退出吗？')
                        $('#username').val('');
                        $('#password').val('');
                        $('.mask-login').fadeIn()
                        $('.useername').html('用户名')
                        $('.log-off').html('登录')
                 }
              }
           
        })
         //天气查询
    $('#search').click(function () {
        var city=$('#city').val();
        $.ajax({
            type:'get',
            url:'http://api.map.baidu.com/telematics/v3/weather?output=json&ak=0A5bc3c4fb543c8f9bc54b77bc155724',
            data:{
                location:city||'广州',
            },
            dataType:'jsonp',
            success: function (data) {
                var weatherdata=data.results[0].weather_data
                var html = template('template_weather',{weather:weatherdata});
                $('tbody').html(html);
            },
            error: function () {
                alert('获取百度天气接口失败')
            }
        })
    })
    //点击刷新
    $('.refresh').click(function(){
        $('.refresh').children().toggleClass('anima');
         $.ajax({
                type:'post',
                url:'js/message.php',
                async:true,
                dataType : "json",
                success:function(data){
                      $('.show-message').html(' ')
                    var itemtext='';
                    for(var i = 0;i < data.length; i++){
                        itemtext+='<div class="message-item">';
                        itemtext+='<div class="message-item-con">';
                        itemtext+=data[i].content;
                        itemtext+='<div>';
                        itemtext+='<div class="info-txt clearfix">'
                        itemtext+= '<span class="date">'+data[i].date+'</span>'
                        itemtext+= '<span class="send-name">'+data[i].anthor+'</span>'
                        itemtext+='<div>';
                        itemtext+='<div>';
                     $('.show-message').prepend(itemtext).children(0).eq(0).hide().slideDown(500);
                         var itemtext='';
                    }       
                },
                error:function(){ 
                    alert("连接后台服务器失败，请检查网络配置")
                }
            })
    })
}
