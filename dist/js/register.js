"use strict";$(function(){$(".inpBtn").click(function(e){e.preventDefault(),$(".popBoxWrapper").css("display","none"),$(document.body).addClass("body")});var n=$("#oPhone"),r=$(".enPhone"),a=$("#oName"),o=$("#oPwd"),e=$("#oVerify"),t=$(".getVerifyCode").eq(0),s=$(".remainSeconds"),i=$(".nextStepBtn").eq(0),d=$(".nextStepBtn").eq(1),l=$(".go-shopping"),p=$(".clearTextBtn"),u=$(".remain-5-seconds"),c=/^1[3-9][0-9]{9}$/,f=/^[a-zA-Z][a-zA-Z0-9]{5,9}$/,g=/^[a-zA-Z0-9]{6,16}$/,m="",x="",v="",C=void 0,h=new Array(2).fill(!1),w=new Array(2).fill(!1);function y(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:1e3,a=window.setInterval(function(){e.text(t),0==t&&(clearInterval(a),n()),t--},r)}function D(e,t,n,r,a){e.on("click",function(e){if(e.preventDefault(),t.some(function(e){return 0==e}))return!1;$(n).next().addClass("active"),$(n).siblings(r).addClass("active"),$(a).removeClass("cur").next().addClass("cur")})}n.on("input",function(e){var t=!1;e.preventDefault(),0==(m=n.val().trim()).length?(n.next("span").addClass("err").text("请输入手机号!"),n.parent().addClass("form-group-error"),t=!1):c.test(m)?(n.next().addClass("info").text("手机号正确"),n.parent().removeClass("form-group-error"),t=!0,r.text(m)):(n.next("span").removeClass("info").addClass("err").text("手机号不存在"),t=!1),h[0]=t}),e.on("input",function(){e.val()==C&&(1==h[1]?h[1]=!0:h[1]=!1)}),t.on("click",function(e){var t,n;(e.preventDefault(),0!=h[0])&&(C=e5.getRandom(1e3,9999),$.ajax({type:"post",url:"http://route.showapi.com/28-1",dataType:"json",data:{showapi_timestamp:(t=new Date,n=t.getMonth()+1,t.getFullYear()+""+(10<=n?n:"0"+n)+(t.getDate()<10?"0"+t.getDate():t.getDate())+(t.getHours()<10?"0"+t.getHours():t.getHours())+(t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes())+(t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds())),showapi_appid:"104996",showapi_sign:"e5e61227fb274a89afdd47d3164180d6",mobile:m,content:'{"code":"'+C+'","minute":"3","comName":"国美商城"}',tNum:"T150606060601"},error:function(e,t,n){alert("操作失败!")},success:function(e){0==e.showapi_res_code&&(h[1]=!0,s.parent().addClass("active"),y(s,59),s.parent().removeClass("active"))}}))}),D(i,h,".round-1",".round-2",".round-1-content"),a.on("input",function(e){var t=!1;(x=a.val().trim()).length<6?(a.parent().addClass("form-group-error"),t=!1,a.next("span").addClass("err").text("用户名太短!"),0==x.length&&a.next("span").text("请输入用户名!")):f.test(x)?$.ajax({type:"post",url:"../server/usernameUnique.php",data:{username:x},success:function(e){0==e?(a.parent().addClass("form-group-error"),t=!1,a.next("span").addClass("err").text("用户名已被注册!")):1==e&&(a.parent().removeClass("form-group-error"),t=!0,a.next("span").addClass("info").text("用户名可用!"))}}):(a.parent().removeClass("form-group-error"),t=!1,a.next("span").addClass("err").text("用户名非法!")),w[0]=t}),o.on("input",function(e){var t=!1;(v=o.val().trim()).length<6?(o.parent().addClass("form-group-error"),t=!1,o.next("span").addClass("err").text("请输入6位数以上密码!"),0==v.length&&o.next("span").text("密码不能为空!")):g.test(v)?(o.parent().removeClass("form-group-error"),t=!0,o.next("span").addClass("info").text("密码合格!")):(o.parent().addClass("form-group-error"),t=!1,o.next("span").addClass("err").text("密码不合格!")),w[1]=t}),D(d,w,".round-2",".round-3",".round-2-content"),d.on("click",function(){$.ajax({type:"post",url:"../server/register.php",data:{phone:m,username:x,pwd:v},success:function(e){console.log(e)}}).done(function(){y(u,4,function(){window.location.href="./index.html"})})}),l.click(function(e){e.preventDefault(),window.location.href="./index.html"}),p.click(function(e){e.preventDefault(),$(e.target).siblings("input").val("")})});