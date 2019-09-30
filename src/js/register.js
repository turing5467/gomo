$(() => {
    //协议
    $('.inpBtn').click((e) => {
        e.preventDefault();
        $('.popBoxWrapper').css('display', 'none');
        $(document.body).addClass('body');
    })

    //第一步
    //元素
    let oPhone = $('#oPhone');
    let enPhone = $('.enPhone');
    let oName = $('#oName');
    let oPwd = $('#oPwd');
    let oVerify = $('#oVerify');
    let oGetVerify = $('.getVerifyCode').eq(0);
    let oRemainSeconds = $('.remainSeconds');
    let nextStep_1 = $('.nextStepBtn').eq(0);
    let nextStep_2 = $('.nextStepBtn').eq(1);
    let goShop = $('.go-shopping');
    let clearTextBtn = $('.clearTextBtn');
    let remain5Sseconds = $('.remain-5-seconds');

    //值
    let phoneReg = /^1[3-9][0-9]{9}$/;
    let nameReg = /^[a-zA-Z][a-zA-Z0-9]{5,9}$/; /* 请设置您的用户名(6~8位字母*/
    let passwordReg = /^[a-zA-Z0-9]{6,16}$/;
    let phone = '';
    let username = '';
    let pwd = '';
    let code;
    let verify = '';
    let flags_1 = new Array(2).fill(false);
    let flags_2 = new Array(2).fill(false);


    oPhone.on('input', (e) => {
        let flag = false;
        e.preventDefault();
        phone = oPhone.val().trim();

        if (phone.length == 0) {
            oPhone.next('span').addClass('err').text("请输入手机号!");
            oPhone.parent().addClass("form-group-error");
            flag = false;
        } else {
            if (phoneReg.test(phone)) {
                oPhone.next().addClass('info').text("手机号正确");
                oPhone.parent().removeClass("form-group-error");
                flag = true;
                enPhone.text(phone);
            } else {
                oPhone.next('span').removeClass('info').addClass('err').text("手机号不存在");
                flag = false;
            }
        }
        flags_1[0] = flag;
    });





    oGetVerify.on('click', (e) => {
        e.preventDefault();
        if (flags_1[0] == false) {
            return;
        } else {
            code = e5.getRandom(1000, 9999);
            $.ajax({
                type: 'post',
                url: 'http://route.showapi.com/28-1',
                dataType: 'json',
                data: {
                    "showapi_timestamp": formatterDateTime(),
                    "showapi_appid": '104996', //appid
                    "showapi_sign": "e5e61227fb274a89afdd47d3164180d6", //密钥secret
                    "mobile": phone,
                    "content": `{\"code\":\"${code}\",\"minute\":\"3\",\"comName\":\"国美商城\"}`,
                    "tNum": "T150606060601",
                },
                error: function(xhr, textStatus, errorThrown) {
                    alert("操作失败!");
                },
                success: function(result) {
                    if (result.showapi_res_code == 0) {
                        flags_1[1] = true;
                        oRemainSeconds.parent().addClass('active');
                        remainSecond(oRemainSeconds, 59);
                        oRemainSeconds.parent().removeClass('active');
                    }
                }
            });
        }
    })
    nextStep(nextStep_1, flags_1, '.round-1', '.round-2', '.round-1-content')

    oVerify.on('input', () => {
        verify = oVerify.val();

        if (verify == code) {
            if (flags_1[1] == true) {
                flags_1[1] = true;
            } else {
                flags_1[1] = false;
            }
        }
    })

    oName.on('input', (e) => {
        let flag = false;
        username = oName.val().trim();
        if (username.length < 6) {
            oName.parent().addClass("form-group-error");
            flag = false;
            oName.next('span').addClass('err').text("用户名太短!");
            if (username.length == 0) {
                oName.next('span').text("请输入用户名!");
            }

        } else {
            if (nameReg.test(username)) {

                $.ajax({
                    type: "post",
                    url: "../server/usernameUnique.php",
                    data: {
                        username
                    },
                    // dataType: "dataType",
                    success: function(response) {
                        //response 为 0 ,用户名重复
                        //为1,可用
                        if (response == 0) {
                            oName.parent().addClass("form-group-error");
                            flag = false;
                            oName.next('span').addClass('err').text("用户名已被注册!");
                        } else if (response == 1) {
                            oName.parent().removeClass("form-group-error");
                            flag = true;
                            oName.next('span').addClass('info').text("用户名可用!");
                        }
                    }
                });


            } else {
                oName.parent().removeClass("form-group-error");
                flag = false;
                oName.next('span').addClass('err').text("用户名非法!");
            }
        }
        flags_2[0] = flag;
    });

    oPwd.on('input', (e) => {
        let flag = false;
        pwd = oPwd.val().trim();
        if (pwd.length < 6) {

            oPwd.parent().addClass("form-group-error");
            flag = false;
            oPwd.next('span').addClass('err').text("请输入6位数以上密码!");
            if (pwd.length == 0) {
                oPwd.next('span').text("密码不能为空!");
            }
        } else {
            if (passwordReg.test(pwd)) {
                oPwd.parent().removeClass("form-group-error");
                flag = true;
                oPwd.next('span').addClass('info').text("密码合格!");
            } else {
                oPwd.parent().addClass("form-group-error");
                flag = false;
                oPwd.next('span').addClass('err').text("密码不合格!");
            }
        }
        flags_2[1] = flag;
    });

    nextStep(nextStep_2, flags_2, '.round-2', '.round-3', '.round-2-content');
    nextStep_2.on('click', () => {
        $.ajax({
            type: "post",
            url: "../server/register.php",
            data: {
                phone,
                username,
                pwd
            }
        }).done(() => {
            remainSecond(remain5Sseconds, 4, () => {
                window.location.href = './index.html';
            });
        });

    });
    goShop.click((e) => {
        e.preventDefault();
        window.location.href = './index.html';
    })

    clearTextBtn.click((e) => {
        e.preventDefault();
        $(e.target).siblings('input').val('');
    })


    function remainSecond(ele, i, fn, ms = 1000) {
        // i--;
        let timer = window.setInterval(() => {
            ele.text(i);
            if (i == 0) {
                clearInterval(timer);
                fn();
            }
            i--;
        }, ms);
    }

    function formatterDateTime() {
        var date = new Date()
        var month = date.getMonth() + 1
        var datetime = date.getFullYear() +
            "" // "年"
            +
            (month >= 10 ? month : "0" + month) +
            "" // "月"
            +
            (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate()) +
            "" +
            (date.getHours() < 10 ? "0" + date.getHours() : date
                .getHours()) +
            "" +
            (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                .getMinutes()) +
            "" +
            (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                .getSeconds());
        return datetime;
    }

    function nextStep(ele, flagArr, str1, str2, str3) {
        ele.on('click', (e) => {
            e.preventDefault();
            // flagArr[0] = true;
            // flagArr[1] = true;
            if (flagArr.some((ele) => ele == false)) {
                return false;
            } else {
                //下一步
                //1.step-slider变换

                $(str1).next().addClass('active');
                $(str1).siblings(str2).addClass('active');

                //2.step-content变换
                $(str3).removeClass('cur').next().addClass('cur');
            }
        })
    }
})