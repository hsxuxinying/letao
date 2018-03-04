/**
 * Created by Me on 2018/3/4.
 */
$(function(){
    var page = 1;
    var pageSize = 5;
//    1.��Ⱦ�б�ҳ
    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:page,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                $('tbody').html(template("user_tmp",info));
                //    ��Ⱦ��ҳ
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//Ĭ����2�������bootstrap3�汾�������������
                    currentPage:page,//��ǰҳ
                    totalPages:Math.ceil(info.total/info.size),//��ҳ��
                    //size:"small",//���ÿؼ��Ĵ�С��mini, small, normal,large
                    onPageClicked:function(a, b, c,p){
                        //Ϊ��ť�󶨵���¼� page:��ǰ����İ�ťֵ
                        page = p;
                        //    ������Ⱦ
                        render();
                    }
                });
            }
        });
    }
    render();
//    2.���ý��û����ð�ť
    $('tbody').on('click','.btn',function(){
        //����ģ̬��
        $('#userModal').modal('show');
        //��ȡ�˰�ť��id
        var id = $(this).parent().data('id');
        //    �ж�isDelete��ֵ
        var isDelete = $(this).hasClass('btn-success')?1:0;
        //    ���ȷ�ϰ�ťʱ������ajax����
        $('.btn_confirm').off().on('click',function(){
            $.ajax({
                type:'POST',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                dataType:'json',
                success:function(info){
                    //console.log(info);
                    if(info.success){
                        //    Ӱ��ģ̬��
                        $('#userModal').modal('hide');
                        //������Ⱦ
                        render();
                    }

                }
            })
        })



    })





});