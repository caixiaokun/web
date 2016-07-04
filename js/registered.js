    window.onload=function(){
                  var index=0;
            setInterval(function(){
             $('.big_banner_pic li').eq(index).fadeIn().siblings().fadeOut();
             index=++index>4?0:index;
            },3000);
            $('#Username').focusout(function(){
              var un=$('#Username').val();
              reg = /^[\u4E00-\u9FA5]{2,4}$/;
            if(!reg.test(un)){
                $('.rigister-tip').css({color:'red'}).html('警告！！！用户名不合法').fadeIn().fadeOut(3000)
                 $('#Username').val('')

            }
             var param='?username='+un;
                 $.ajax({
                        type:'get',
                        url:'js/registered.php'+param,
                        dataType:'text',
                        success: function (data) {
                           if(data == 1){
                             $('.rigister-tip').css({color:'red'}).html('该用户已经被注册').fadeIn().fadeOut(5000)
                                $('#Username').val('')
                            }
                            else if(data == 2){
                             
                            }
                      },
                        error: function () {
                            alert('获取后台数据失败，请检查网络设置')
                        }
        })
            })

            $('.rigister').click(function(){
                if($("#password").val()===""||$('#Username').val()===""){
                      $('.rigister-tip').css({color:'red'}).html('用户名或密码不能为空').fadeIn().fadeOut(5000)
                    return false;
                }
                if($("#password").val()!=$("#confpwd").val()){
                    $('.rigister-tip').css({color:'red'}).html('2次密码不一样').fadeIn().fadeOut(5000)
                    return false;
                }
               
                // 向数据库插入用户数据
                var obj={};
                obj.uname= $("#Username").val();
                obj.pwd=$("#password").val();
                $.post('js/registered.php',{data:obj},function(msg){
                 $('.rigister-tip').css({color:'green'}).html(msg.info+"!!!"+"用户名:"+obj.uname).fadeIn().fadeOut(5000);
                },'json');

                 //防止用户多次注册同一个用户名
                $("#password").val('')
                $('#confpwd').val('')
            })













}
