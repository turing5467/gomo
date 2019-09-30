$(() => {

    let o = e5.getUrlPrmt(window.location.search);
    let {
        code,
        type,
        num
    } = o;
    let data = null;
    $.ajax({
        type: "get",
        url: "../server/getDetailData.php",
        data: {
            code
        },
        async: false,
        dataType: "json",
        success: function(response) {
            data = response[0];
        }
    });
    $('.item-info').html(() => {
        return `<div class="item-info-body clearfix">   <div class="msg">    <i class="c-i add-cart-success"></i>商品已成功加入购物车！   </div>    <div class="fl">       <div class="clearfix mb15">     <a href="./detail.html?code=${data.code}" class="imgLink fl">      <img width="50" height="50" src="${data.mini_pics.split(',')[0].replace('_50','_80')}">     </a>     <div class="imgContent fl">      <p><a href="./detail.html?code=${data.code}" class="title text-overflow" title="${data.name}" target="_blank">${data.name}</a></p>      <p>                               <span>版本：${data.types.split(',')[type-1]}</span>                             <span>数量：${num}</span>      </p>     </div>    </div>      </div>   <div class="mt10 fr">    <a defurl="./detail.html?code=${data.code}" id="idGoBack" class="cart-success-btn btn-default40" style="margin-right:7px;">返回</a>    <a href="./cart.html" class="cart-success-btn btn-primary40">我的购物车<em class="c-i arrowRight-white"></em></a>   </div>  </div>`
    });
    $('#idGoBack').click((e) => {
        window.history.back();
    })
})