/**
 * Created by Me on 2018/3/2.
 */
$(function(){
    //1.���ý�����
    //���û���Ȧ
    NProgress.configure(
        { showSpinner: false }
    );
    //����������
    $(document).ajaxStart(function () {
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        NProgress.done();
    })

//2.�����˵�����ʾ������
    $('.second').prev().on('click',function(){
        $(this).next().slideToggle();
    })
//    3.���������ʾ������
    $('.menu .list').on('click',function(){
        //console.log(1);
        $('.lt_aside').toggleClass('now');
        $('.lt_main').toggleClass('now');

    })
//    4.�˳�����
    $('.loginout').on('click',function(){
        $('#modalLoginOut').modal('show');
    })
    $('.login-out').on('click',function(){
    //    ����ajas����ͨ���������˳��˺�
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            dataType:'json',
            success:function(info){
                //console.log(info);
                if(info.success){
                //    �˳��ɹ�
                    location.href = "login.html";
                }
            }
        })
    })
//    1.������ǵ�¼ҳ��ÿ��ҳ���ʼ�ͷ���ajax����,�жϵ�ǰ�û��Ƿ��¼
    if(location.href.indexOf('login.html') == -1){
        $.ajax({
            type:'get',
            url:'/employee/checkRootLogin',
            dataType:'json',
            success:function(info){
                console.log(info);
                if(info.error == 400){
                    location.href = 'login.html'
                }
            }
        })
    }


});