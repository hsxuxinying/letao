/**
 * Created by Me on 2018/3/6.
 */
    //1.初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
    });

//2.从地址栏中获取参数，并转化城对象
function getPrame(key){
    //    获取地址并解码
    var prame = decodeURI(location.search);
    //    获取?后面的参数
    prame = prame.slice(1);
    //    转化成数组
    var arr = prame.split('&');
    //遍历数组把数组转化成对象
    var obj = {};
    arr.forEach(function(element,index){
        console.log(element);
        //    以等号为分隔符分割数组
        var key = element.split('=')[0];
        var value = element.split('=')[1];
        obj[key] = value;
    })
    return obj[key];
}

var gallery = mui('.mui-slider');
gallery.slider({
    interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});



