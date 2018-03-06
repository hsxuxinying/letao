/**
 * Created by Me on 2018/3/5.
 */
$(function(){
    //渲染列表数据
    var page = 1;
    var pageSize = 3;
    function render(){
        $.ajax({
            type:'GET',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(info){
                //console.log(info);
                $('tbody').html(template('second_tmp',info));
                $('#pagintor').bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    onPageClicked:function(a, b, c,p){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        page = p;
                        render();
                    }
                })
            }
        })
    }
    render();
    //    2.添加分类
    $('.add_secondcate').on('click',function(){
        //1.显示模态框
        $('#secondCateModal').modal('show');
        //    2.加载一级分类的数据
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:100
            },
            dataType:'json',
            success:function(info){
                $('.dropdown-menu').html(template('firstchoose_tmp',info))
            }
        })

    })
    //    3.设置一级分类
    //    点击dropdown-menu下面的li
    $('.dropdown-menu').on('click','a',function(){
        //一级分类名称
        $('.drop_text').text($(this).text());
        var id = $(this).parent().data("id");
        //设置隐藏域的内容，以便向后台传参
        $("[name='categoryId']").val(id);
        $("#form").data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    })
    //    4.设置图片
    $("#uploadpic").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            //console.log(data);
            //获取上传图片的地址
            var picUrl = data.result.picAddr;
            //console.log(picUrl);
            //将图片更换
            $('.img_box img').attr('src',picUrl);
            //设置隐藏域的值
            $("[name='brandLogo']").val(picUrl);
            $("#form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
        }
    });
    //    5.表单校验
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName:{
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入二级分类的名称'
                    }
                }
            },
            brandLogo:{
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传品牌图片'
                    }
                }
            }
        }
    })
//    6.表单校验成功后，发送ajax请求
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$('#form').serialize(),
            dataType:'json',
            success:function(info){
                //console.log(info);
                if(info.success){
                //    关闭模态框
                    $('#secondCateModal').modal('hide');
                //    渲染第一页
                    page = 1;
                    render();
                //    重置表单
                    $("#form").data('bootstrapValidator').resetForm(true);
                    $('.drop_text').text('请选择一级分类');
                    $('.img_box img').attr('src','./images/none.png');
                }
            }
        })
    });

})
