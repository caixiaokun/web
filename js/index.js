/**
 * ITCAST WEB
 * Created by zhousg on 2016/5/17.
 */
$(function(){
    banner();
    moblietab();
    $('[data-toggle="tooltip"]').tooltip();
});
/*轮播图*/
function banner(){
    var data = [
        {
            "bac":"images/slide_01_2000x410.jpg",
            "img":"images/slide_01_640x340.jpg"
        },
        {
            "bac":"images/slide_02_2000x410.jpg",
            "img":"images/slide_02_640x340.jpg"
        },
        {
            "bac":"images/slide_03_2000x410.jpg",
            "img":"images/slide_03_640x340.jpg"
        },
        {
            "bac":"images/slide_04_2000x410.jpg",
            "img":"images/slide_04_640x340.jpg"
        }
    ]
    /*渲染*/
    var render = function(){
        var width=$(window).width();//获取当前屏幕宽度
        var isMobile=false;
        if(width<768){
            isMobile=true;
        }
        //获取模板当中的字符串
        var pointTemplatestr=$('#point_template').html();
        var imageTemplatestr=$('#image_template').html();
        /*转化成模版函数*/
        var pointTemplate= _.template(pointTemplatestr);
        var imageTemplate= _.template(imageTemplatestr);
        //传入数据，解析成html字符
        var pointhtml = pointTemplate({model:data});
        var imagehtml = imageTemplate({model:data,isMobile:isMobile})
        //渲染到页面中
        $('.carousel-indicators').html(pointhtml);
        $('.carousel-inner').html(imagehtml);
    }
    $(window).on('resize',function(){
        render();
    }).trigger('resize');
    var startX = 0, moveX = 0 , distanceX = 0 , isMove = false;
    $('.carousel-inner').on('touchstart', function (e) {
        startX= e.originalEvent.touches[0].clientX;
    }).on('touchmove',function(e){
        moveX= e.originalEvent.touches[0].clientX;
        distanceX=moveX-startX;
        isMove=true;
    }).on('touchend',function(e){
        if(Math.abs(distanceX)>50&&isMove) {
            if(distanceX>0){
                $('.carousel').carousel('prev')
            }else{
                $('.carousel').carousel('next')
            }
        }
    })
    startX = 0, moveX = 0 , distanceX = 0 , isMove = false;
}
//产品
$(function () {
    $('#keyWord').keyup(function () {
        var kw=$('#keyWord').val();
        document.getElementById('list').innerHTML = '';
        $.ajax({
            type:"get",
            url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+kw,
            async:true,
            dataType : "jsonp",
            jsonp: "cb",
            success: function (data) {
                var tag = '<ul>';
                for(var i=0;i<data.s.length;i++){
                    tag += '<li>'+data.s[i]+'</li>';
                }
                tag += '</ul>';
                $('#list').html(tag).show();
                $('#list').find('li').hover(function(){
                    $(this).addClass('on').siblings().removeClass('on')
                    var cc=this.innerHTML;
                    $('#keyWord').val(cc);
                })
                $('#list').find('li').click(function () {
                    var cc=this.innerHTML;
                    $('#keyWord').val(cc);
                    $('#list').hide();

                })
            },
            error: function () {
                console.log('获取百度接口失败');
            }
        })
    })
    //$(document).keydown(function (event) {
    //    var keynum=event.keyCode;
    //    if(keynum==38){
    //        var $clight=$(".on");//获取当前点亮的
    //        if($clight.prev().length==0){
    //            $clight.removeClass("current");
    //            //没有点亮的
    //            $("#list>ul>li:first-child").addClass("on")
    //            var av=$("#list>ul>li:first-child").html();
    //            console.log(av)
    //
    //        }
    //        else{
    //            $($clight).removeClass("on").prev().addClass("on");
    //            var av=$($clight).html();
    //            console.log(av)
    //        }
    //        var cc=$('on').innerHTML;
    //        $('#keyWord').val(cc);
    //
    //    }
    //    else if(keynum==40){
    //        var $clight=$(".on");//获取当前点亮的
    //        if($clight.next().length==0){
    //            $clight.removeClass("on");
    //            $("#list>ul>li:first-child").addClass("on")
    //        }else{
    //            $($clight).removeClass("on").next().addClass("on");
    //        }
    //        console.log('xia')
    //    }
    //})
})
function moblietab(){
    var $parent =$('.wjs_prodout_tab_parent')
    var $ul=$parent.find('ul')
    var lis= $ul.find('li');
    var widthsum=0;//所有li的宽度总和
    lis.each(function(i,item){
        widthsum+=$(item).innerWidth();
    })
    //s设置ul的宽度
    $ul.width(widthsum);
    console.log(widthsum)
    //调用滑动函数，
    itcast.iScroll({
        swipeDom:$parent[0],//获取滑动的对象
        swipeType:'x',//滑动的方向
        swipeDistance:50// 缓冲距离
    })
}


