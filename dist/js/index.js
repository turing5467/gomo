"use strict";$(document).ready(function(){var n=$(".pre"),e=$(".nex"),t=[0,0];n.eq(0).click(function(){i($(".mrbq_body ul li"),t,0)}),e.eq(0).click(function(){a($(".mrbq_body ul li"),t,0)}),n.eq(1).click(function(){i($(".guess_main ul"),t,1)}),e.eq(1).click(function(){a($(".guess_main ul"),t,1)});var i=function(n,e,t){var i=n.length;0==e[t]?e[t]=i-1:--e[t],n.eq(e[t]).css({display:"block"}).siblings().css({display:"none"})},a=function(n,e,t){var i=n.length;e[t]==i-1?e[t]=0:++e[t],n.eq(e[t]).css({display:"block"}).siblings().css({display:"none"})},r=$(".mrbq_body ul").eq(0);$.getJSON("../server/mrbq.json",function(n){for(var e=n.length,t=Math.ceil(e/4),i=0;i<t;i++){var a=4*i,s=n.slice(a,a+4).map(function(n,e){return'<div class="list_li fl ">\n                            <a href="# ">\n                                <img src='+n.src+'>\n                                <div class="price ">\n                                    <i>'+n.price+'</i>\n                                    <i class="del ">'+n.del_price+'</i>\n                                </div>\n                                <p class="name ">'+n.title+"</p>\n                            </a>\n                        </div>"});$('<li class="clearfix ">').html(s).appendTo(r)}});var s=$(".guess_main");new Promise(function(i){$.getJSON("../server/guess.json",function(e){for(var n=function(n){$("<ul>").html(function(){return e[n].map(function(n){return'<li>\n                                    <a href="# ">\n                                        <img src='+n.img+">\n                                        <p class=guess_title>"+n.guess_title+'\n                                        </p>\n                                        <p class="guess_price ">\n                                            '+n.guess_price+"\n                                        </p>\n                                    </a>\n                                </li>"})}).appendTo(s)},t=0;t<e.length;t++)n(t);i()})}).then(function(){s.find("ul").eq(0).css({display:"block"})}),$(".search-box").clone().appendTo($(".stick-nav .w1200-bg"));var l=Cookie.get("userId");$.ajax({type:"get",url:"../server/getUserName.php",data:{id:l},dataType:"json",success:function(n){"success"==n.status?($(".user-name").eq(0).text(n.data[0].username),$(".top-left").eq(0).prepend('<a class=fl href="./index.html">国美首页</a>')):($(".logout").eq(0).remove(),$(".top-left").eq(0).append('<a href="./login.html">登陆</a><a class="gome-link-register" href="./register.html">注册有礼<i></i></a>'))}}),$(".logout a").click(function(n){n.preventDefault(),Cookie.remove("userId"),window.location.href="./login.html"}),$.ajax({type:"get",url:"../server/getCart.php",data:{id:l},dataType:"json",success:function(n){$("#commerceItemQuantityId").html(n.length),0!=n.length&&$(".shop-car").addClass("havecount")}});var c=$(".nav-first");$.getJSON("../server/nav.json?version=1",function(n){var e=n.map(function(n,e){var t=n.l_titles.map(function(n){return'<a href="./">'+n+"</a>"}).join(""),i='<div class="sec-tags clearfix ">'+n.r_l_tags.map(function(n,e){return'<a href="#" class="sec-tag ">'+n+"</a>"}).join("")+"</div>",a="<div class=sec-lists>"+n.r_l_navs.map(function(n,e){var t='<div class="title">'+n.n_l_title+"</div>",i=n.r_l_contents.map(function(n,e){return n.className?'<a class="hot " href="./cat.html?intcmp='+n.code+'" code='+n.code+">"+n.text+"</a>":'<a href="./cat.html?intcmp='+n.code+'" code='+n.code+">"+n.text+"</a>"}).join("");return"<div class=sec-list>"+(t+(i="<div class=list>"+i+"</div>"))+"</div>"}).join("")+"</div>",s='<div class="top_img_box ">'+n.r_r_brand_imgs.map(function(n,e){return'<a href="javascript:;"><img src='+n+"></a>"}).join("")+"</div>";return n.r_r_big_img&&(s+='<div class="bottom_img_box">\n                <a href="# ">\n                    <img src='+n.r_r_big_img+">\n                </a>\n            </div>"),"<li>"+(t+('<div class="nav-second clearfix ">'+(i+a+('<div class="sec-right-box clearfix ">'+s+"</div>"))+"</div>"))+"</li>"});c.html(e),c.clone(!0).appendTo($(".top-nav-l"))}),$("#slide").enCarousel({_width:750,_height:450,nextText:">",prevText:"<",fade:1e3,time:3e3,pagelocat:!0});var o=$(".hour").eq(0),d=$(".minute").eq(0),p=$(".second").eq(0),u=new Date,v=new Date;v.setHours(v.getHours()+3);var f=e5.getEndTime(u,v),m=f.h,g=f.m,h=f.s;o.text(m.toString().padStart(2,"0")),d.text(g.toString().padStart(2,"0")),p.text(h.toString().padStart(2,"0")),window.setInterval(function(){u=new Date;var n=e5.getEndTime(u,v),e=n.h,t=n.m,i=n.s;o.text(e.toString().padStart(2,"0")),d.text(t.toString().padStart(2,"0")),p.text(i.toString().padStart(2,"0"))},1e3);var _=null;function b(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:10;_&&clearInterval(),_=setInterval(function(){var n=$(document).scrollTop();n<e?n+t<e?$(document).scrollTop(n+t):$(document).scrollTop(e):e<n-t?$(document).scrollTop(n-t):$(document).scrollTop(e),n==e&&clearInterval(_)},1)}new Promise(function(e){$.getJSON("../server/floor.json",function(n){$(".floors").eq(0).html(function(){return n.map(function(n,e){var t=$('<div class="floor "></div>'),i=$("<div class=mt></div>");$("<div class=mtTop></div>").html(n.title).appendTo(i).appendTo(i),$("<ul class=tab></ul>").html(function(){return n.tab_titles.map(function(n,e){return"<li><a href=#>"+n+"</a></li>"}).join("")}).appendTo(i);var a=$("<div class=mc></div>"),s=$("<div class=mc_l></div>");$("<a class=mc_l_img><img src="+n.channel_img+"></a>").appendTo(s);var r=$("<div class=keyAll></div>");$("<div class=channelbg></div>").html("<div class=channel>"+n.channel+"</div>").appendTo(r),$('<div class="keywords"></div>').html(function(){return n.keywords.map(function(n){return $("<ul>").html(n.map(function(n){return'<li><a href="#">'+n+"</a></li>"}).join("")).get(0).outerHTML}).join("")}).appendTo(r),r.appendTo(s),s.appendTo(a);var l=$("<div class=main_wrap></div>"),c=$("<div class=main></div>");$("<div class=mc_c></div>").html(function(){return"<ul class=slider>"+n.tab_content_1.l_imgs.map(function(n){return'<li>\n                                        <a href="javascript:; ">\n                                            <img src='+n+">\n                                        </a>\n                                        </li>"}).join("")+"</ul>"}).appendTo(c),$("<div class=mc_r></div>").html(function(){return"<ul class=mc_r_inner>"+n.tab_content_1.r_imgs.map(function(n){return'<li>\n                                        <a href="javascript:; ">\n                                            <img src='+n+"></a>\n                                        </li>"}).join("")+"</ul>"}).appendTo(c);return c.appendTo(l),n.tab_contents.forEach(function(n){$("<div class=main>").html(function(){return"<ul class=main_inner>"+n.map(function(n){return'<li>\n                                                <a href="# ">\n                                                    <img src='+n.img+" alt="+n.title+'>\n                                                    <p class="p_name ">'+n.title+'\n                                                    </p>\n                                                    <p class="p_price ">'+n.price+"\n                                                    </p>\n                                                </a>\n                                                </li>"}).join("")+"</ul>"}).appendTo(l)}),l.append("<div class=page_slider><p class=page_down><a href=javascript:; class=slider_next></a><span class=next></span></p></div>"),l.appendTo(a),i.appendTo(t),a.appendTo(t),t.get(0).outerHTML}).join("")}),e()})}).then(function(){$(".tab").each(function(n,e){$(e).find("li").eq(0).addClass("active")});var i=new Array($(".tab").length).fill(0);$(".tab li").on("mouseenter",function(n){var e=n.currentTarget;$(e).addClass("active").siblings().removeClass("active");var t=$(e).index();$(e).parents(".floor").find(".main").eq(t).css("display","block").siblings(".main").css("display","none"),i[$(e).parents(".floor").index()]=t}),$(".main").on("click",".next",function(n){n.preventDefault()});var a=$(".floor");$(".slider_next");$(".page_slider").click(function(n){var e=$(n.target).parents(".floor").index(),t=a.eq(e).find(".tab li").length;i[e]==t-1?i[e]=0:++i[e],$(".tab").eq(e).find("li").eq(i[e]).trigger("mouseenter")});var s=$("#elevator"),r=$(".handler"),l=$(".stick-nav"),c=Array.from(a.map(function(n,e){return $(e).offset().top}));$(window).scroll(e5.throttle(function(){var t=$(window).scrollTop(),n=c[0],e=c[c.length-1]+300;if(n<=t&&t<=e){s.css("display","block"),window.innerWidth<1200&&s.css("display","none");var i=c.findIndex(function(n,e){return c[e+1]>=t});r.eq(i).addClass("current").siblings().removeClass("current")}else 700<=t?(l.css("display","block"),s.css("display","none")):t<700&&(l.css("display","none"),s.css("display","none"))},100)),$(window).resize(e5.throttle(function(){window.innerWidth<1200&&s.css("display","none")},500)),r.on("click","a",function(n){n.preventDefault();var e=$(n.currentTarget).parent().index();b(c[e]+1,30)}),$(".flTop a").click(function(n){n.preventDefault(),b(0,30)}),$(".fl_bottom a").click(function(n){n.preventDefault(),b($(document).innerHeight()-window.innerHeight,20)})})});