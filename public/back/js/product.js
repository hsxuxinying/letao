/**
 * Created by Me on 2018/3/5.
 */
$(function(){
    var page = 1;
    var pageSize = 3;
    var result = [];
//    1.渲染列表数据
    function render(){
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                //console.log(info);
                $('tbody').html(template("product_tmp",info));
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    itemTexts:function(type,page, current){
                        //console.log(type,page, current);
                        switch(type){
                            case 'first':
                                return '首页';
                            case 'prev':
                                return '上一页';
                            case 'next':
                                return '下一页';
                            case 'last':
                                return '尾页';
                            default :
                                return page;
                        }

                    },
                    tooltipTitles:function(type,page, current){
                        switch(type){
                            case 'first':
                                return '首页';
                            case 'prev':
                                return '上一页';
                            case 'next':
                                return '下一页';
                            case 'last':
                                return '尾页';
                            default :
                                return page;
                        }
                    },
                    useBootstrapTooltip:true,
                    onPageClicked:function(a, b, c,p){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        page = p;
                        render();
                    }
                });

            }
        })
    }
    render();
//    2.点击添加商品按钮
    $('.add_product').on('click',function(){
        //1.显示模态框
        $('#productModal').modal('show');
    //    2.加载二级分类数据
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:100
            },
            success:function(info){
                //console.log(info);
                $('.dropdown-menu').html(template('secondchoose_tmp',info));
            }
        })
    })
    //    3.设置dropdown-menu的值
    $('.dropdown-menu').on('click','a',function(){
        //设置下拉菜单显示的值
        $('.drop_text').text($(this).text());
        //    获取id
        var id = $(this).data('id');
        $("[name='brandId']").val(id);
        $("#form").data('bootstrapValidator').updateStatus('brandId', 'VALID');
    })
//    4.初始化图片
    $("#uploadpic").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
                //console.log(data);
            //数组中先增加元素，之后数组长度+1
            console.log(result.length);

            if(result.length >= 3){
                return;
            }
            //获取上传图片的地址
            var picUrl = data.result.picAddr;
        //    把图片添加到img_box盒子中
            $('<img src="'+ picUrl+'" alt=""/>').appendTo('.img_box');


            result.push(data.result);
            console.log(result);
        //    判断添加了几张图片
            if(result.length == 3){
               $("#form").data('bootstrapValidator').updateStatus('productLogo', 'VALID');
            }else{
                $("#form").data('bootstrapValidator').updateStatus('productLogo', 'INVALID');
            }
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
            brandId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    //正则校验
                    //非0开头的数字
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '请输入非0开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品尺码(32-46)'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '请输入商品尺码(如:32-46)'
                    }
                }
            },
            oldPrice: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品原价'
                    },

                }
            },
            price: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品价格'
                    },

                }
            },
            productLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传三张图片'
                    },

                }
            },
        }

    })
//    6.表单校验成功时，发送ajax请求
    //    表单校验成功是
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        var prame = $('#form').serialize();
        prame += '&picName1=' + result[0].picName + '&picAddr1=' + result[0].picAddr
        prame += '&picName2=' + result[1].picName + '&picAddr2=' + result[1].picAddr
        prame += '&picName3=' + result[2].picName + '&picAddr3=' + result[2].picAddr
        console.log(prame);
        //    发送ajax请求
            $.ajax({
                type:'POST',
                url:'/product/addProduct',
                data:prame,
                success:function(info){
                    console.log(info);
                    if(info.success){
                    //    隐藏模态框
                        $('#productModal').modal('hide');
                        //重新渲染
                        page = 1;
                        render();
                    //    重置表单
                        $("#form").data('bootstrapValidator').resetForm(true);
                        $('.drop_text').text('请选择二级分类');
                        $('.img_box img').remove();
                        result = [];

                    }
                }
            })

    })


})