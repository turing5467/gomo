"use strict";$(function(){var s=Cookie.get("userId");$.ajax({type:"get",url:"../server/getCart.php",data:{id:s},dataType:"json",async:!1,success:function(t){var c=[];t.forEach(function(a,t){var e=c.findIndex(function(t){return t.shop_name==a[4]});if(-1!=e)c[e].products.push(a);else{var o={};o.shop_name=a[4],o.products=[],o.products.push(a),c.push(o)}}),c.forEach(function(t){return t.products.sort(function(t,a){return t[1]==a[1]?1*t[3]-1*a[3]:t[1]-a[1]})}),c.forEach(function(t){var a,e;a=t,e=$(".cart-list").eq(0),$('<div class="cart-shop-header "></div>').html(function(){return'\n            <div class="cart-col-1">\n                <div class="good-checkboxs-no checkShop" style="margin-top: 13px;">       \n                    <input type="checkbox" style="display: none;">      \n                </div>\n            </div>\n            <div class="cart-col-2">\n                <a href="//mall.gome.com.cn/80006441/" title="永兴电脑专营店" class="black cart-shop-name cart-shop-name-fixed " target="_blank">'+a.shop_name+'</a>                             <span style="display: inline-block" class="cart-kf cart-header-kf customerServiceAshes" data-shopname="'+a.shop_name+'">      \n                    <i style="cursor: pointer;vertical-align: middle;" class="c-i c-kf-on"></i>      \n                    <span class="contact-customer-word contact-font">在线客服</span>\n                </span>\n            </div>\n            '}).appendTo(e),$('<div class="cart-shop-goods cart-shop-goods-normal"></div>').html(function(){return a.products.map(function(t){return'<div class="cart-shop-good clearfix  cart-shop-good-common" id='+t[0]+'>\n                    <div class="cart-col-1 border-top ">\n                        <div class="good-checkboxs-no checkItem">        \n                            <input type="checkbox" name="good" style="display: none;">\n                        </div>\n                    </div>\n                    <div class="cart-col-2" style="height: 82px;">\n                        <a href="./detail.html?code='+t[0]+'" target="_blank" class="g-img">\n                            <img src='+t[2].split(",")[0].replace("_30","_80")+' alt="">           </a>  </div>  <div class="fl">   <div class="clearfix">    <div style="" class="cart-col-3">     <div class="cart-good-name">            <a href="./detail.html?code='+t[0]+'" target="_blank" title="'+t[1]+'">'+t[1]+"("+t[6].split(",")[t[7]-1]+')</a>     </div>     <div class="support-server clearfix">                   <i class="c-i seven border-radius-icon" title="支持7天无理由退货"></i>                 </div>                             </div>                  \n                            <div class="cart-col-8">\n                                <div class="cart-good-pro">\n                                    <div class="cart-saleprops-text">\n                                        <div class="cart-salesPro-item">              <span class="cart-good-key" title="版本">版本</span>                          <span class="cart-good-value" data-type='+t[7]+' title="'+(""==t[6].split(",")[t[7]-1].trim()?t[1]:t[6].split(",")[t[7]-1])+'">：'+(""==t[6].split(",")[t[7]-1].trim()?t[1]:t[6].split(",")[t[7]-1])+'</span>                      </div>                                        </div>                               <div class="cart-coupon cart-modify-saleprops">                                     <div class="cart-coupon-box" gui-popupbox="">                                          <div class="js-show-salepropsBox">                  </div></div></div></div></div>            \x3c!--sales property --\x3e\n                                        <div class="cart-col-4 cart-price-height47">     <div class="cart-good-real-price " data-price='+t[3]+">             \x3c!--主品--\x3e       ¥&nbsp;"+t[3]+'                    </div>               <div class="red">           </div>             </div>   <div class="cart-col-5">                                                                <div class="gui-count cart-count">\n                                        <a href="javascript:;" class="gui-count-btn gui-count-sub '+("1"==t[8]?"gui-count-disabled":"")+'">-</a>\n                                        <a href="javascript:;" class="gui-count-btn gui-count-add">+</a>\n                                        <div class="gui-count-input">\n                                            <input  class="dytest " type="text" value="'+t[8]+'">\n                                        </div></div>                           </div>  <div class="cart-col-6 ">      <div class="cart-good-amount">    ¥&nbsp;'+(t[3]*t[8]).toFixed(2)+'       </div>    </div>  </div>  <div class="cart-good-box"></div>  </div>  <div class="cart-col-7">       <div class="cart-good-fun delfixed">     <a href="javascript:;" >     删除     </a>    </div>                         </div>          </div>'}).join("")}).appendTo(e)})}}),$.ajaxSetup({url:"../server/addToCart.php",global:!1,type:"POST"});$(".cart-list").eq(0);var n=$(".selected-item").eq(0),d=$(".selected-price").eq(0),t=$(".dytest"),a=$(".gui-count-add"),e=$(".gui-count-sub");t.on("input change",function(t){var a=$(t.target).parents(".cart-shop-good").attr("id"),e=$(t.target).val()-0,o=$(t.target).parents(".cart-shop-good").find(".cart-good-value").data("type")-0,c=$(t.target).parents(".cart-shop-good").find(".cart-good-real-price").data("price");$(t.target).parents(".cart-shop-good").find(".cart-good-amount").text("¥ "+(e*c).toFixed(2)),$.ajax({data:{id:s,product_code:a,num:e,type:o,flag:1}}),n.text(u()),d.text("￥"+h())}),a.click(function(t){$(t.target).parent().find(".gui-count-sub").removeClass("gui-count-disabled");var a=$(t.target).parent().find(".dytest").eq(0);a.val(1*a.val()+1);var e=1*a.val(),o=$(t.target).parents(".cart-shop-good").attr("id"),c=$(t.target).parents(".cart-shop-good").find(".cart-good-value").data("type")-0;$.ajax({data:{id:s,product_code:o,num:e,type:c,flag:1}});var r=$(t.target).parents(".cart-shop-good").find(".cart-good-real-price").data("price");$(t.target).parents(".cart-shop-good").find(".cart-good-amount").text("¥ "+(e*r).toFixed(2)),n.text(u()),d.text("￥"+h())}),e.click(function(t){var a=void 0,e=$(t.target).parent().find(".dytest").eq(0);if(1<e.val()){e.val(e.val()-1),a=1*e.val();var o=$(t.target).parents(".cart-shop-good").attr("id"),c=$(t.target).parents(".cart-shop-good").find(".cart-good-value").data("type")-0;$.ajax({data:{id:s,product_code:o,num:a,type:c,flag:1}})}else e.val(1);1==(a=e.val())&&$(t.target).addClass("gui-count-disabled");var r=$(t.target).parents(".cart-shop-good").find(".cart-good-real-price").data("price");$(t.target).parents(".cart-shop-good").find(".cart-good-amount").text("¥ "+(a*r).toFixed(2)),n.text(u()),d.text("￥"+h())}),$(".delfixed").click(function(t){if(confirm("确定要删除选中商品吗?")){var a=$(t.target).parents(".cart-shop-good").eq(0),e=$(t.target).parents(".cart-shop-goods").eq(0),o=a.attr("id"),c=a.find(".cart-good-value").data("type")-0;$.ajax({url:"../server/deleteFromCart.php",data:{id:s,product_code:o,type:c},success:function(t){t&&(a.remove(),0==e.children().length&&(e.prev().remove(),e.remove()))}})}}),$(".del-goods").click(function(t){confirm("确定要删除选中商品吗?")&&($(".cart-shop-goods").find(".checkbox_chose").each(function(t,a){var e=$(a).parents(".cart-shop-good").eq(0),o=$(a).parents(".cart-shop-goods").eq(0),c=e.attr("id"),r=e.find(".cart-good-value").data("type")-0;$.ajax({url:"../server/deleteFromCart.php",data:{id:s,product_code:c,type:r},success:function(t){t&&(e.remove(),0==o.children().length&&(o.prev().remove(),o.remove()))}})}),n.text(u()),d.text("￥"+h()))});var r=$(".checkAll"),o=$(".checkShop"),c=$(".checkItem"),i=Array.from(o),l=Array.from(c);function p(t){t.addClass("c-i checkbox_chose").removeClass("good-checkboxs-no")}function v(t){t.addClass("good-checkboxs-no").removeClass("c-i").removeClass("checkbox_chose")}function u(){var e=0;return c.each(function(t,a){$(a).is(".checkbox_chose")&&(e+=1*$(a).parents(".cart-shop-good").find(".dytest").eq(0).val())}),e}function h(){var e=0;return c.each(function(t,a){$(a).is(".checkbox_chose")&&(e+=1*$(a).parents(".cart-shop-good").find(".cart-good-amount").eq(0).text().trim().slice(2))}),e.toFixed(2)}r.on("click",function(t){$(t.target).hasClass("checkbox_chose")?(v(r),v(o),v(c)):(p(r),p(o),p(c)),n.text(u()),d.text("￥"+h())}),o.on("click",function(t){var a=$(t.target).parent().find(".checkShop"),e=a.hasClass("checkbox_chose"),o=a.parents(".cart-shop-header").next().find(".checkItem");e?(v(a),v(o)):(p(a),p(o)),i.every(function(t){return $(t).is(".checkbox_chose")})?p(r):i.some(function(t){return $(t).is(".good-checkboxs-no")})&&v(r),n.text(u()),d.text("￥"+h())}),c.on("click",function(t){var a=$(t.target),e=$(t.target).hasClass("checkbox_chose"),o=Array.from(a.parents(".cart-shop-goods").find(".checkItem")),c=a.parents(".cart-shop-goods").prev().find(".checkShop");e?v(a):p(a),o.every(function(t){return $(t).is(".checkbox_chose")})?(p(c),l.every(function(t){return $(t).is(".checkbox_chose")})&&p(r)):o.some(function(t){return $(t).is(".good-checkboxs-no")})&&(v(c),v(r)),n.text(u()),d.text("￥"+h())})});