/**
 * Created by Me on 2018/3/6.
 */

$(function(){
    //侧边栏
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        success:function(info){
            //console.log(info);
            $('.cateFirst').html(template('firstCate_tmp',info));
            render(1);
        }
    })

//    二级分类菜单
    $('.cateFirst').on('click','li',function(){
        $(this).addClass('now').siblings().removeClass('now')
    //    获取该分类的id
        var id = $(this).data('id');
        //console.log(id);
        render(id);
        //console.log(mui('.mui-scroll-wrapper').scroll()[1]);
        //点击一级分类切换后，将区域滚动到0,0的位置
        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,100);//100毫秒滚动到顶
    })
    function render(id){
        $.ajax({
            type:'GET',
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            success:function(info){
                console.log(info);
                $('.secondCate').html(template('secondCate_tmp',info));
            }
        })
    }
})