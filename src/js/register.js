$(() => {

    //先清除cookie
    Cookie.remove('userId');
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
        e.preventDefault();
        phone = oPhone.val().trim();

        if (phone.length == 0) {
            oPhone.next('span').addClass('err').text("请输入手机号!");
            oPhone.parent().addClass("form-group-error");
            flags_1[0] = false;
        } else {
            if (phoneReg.test(phone)) {
                $.ajax({
                    type: "get",
                    url: "../server/phoneUnique.php",
                    data: {
                        phone
                    },
                    success: function(response) {
                        if (response == 0) {
                            oPhone.parent().addClass("form-group-error");
                            flags_1[0] = false;
                            oPhone.next('span').addClass('err').text("手机号已被注册!");
                        } else if (response == 1) {
                            oPhone.parent().removeClass("form-group-error");
                            flags_1[0] = true;
                            oPhone.next('span').addClass('info').text("手机号可用!");
                            enPhone.text(phone);
                        }

                    }
                });
            } else {
                oPhone.next('span').removeClass('info').addClass('err').text("手机号不存在");
                flags_1[0] = false;
            }
        }
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
                    "showapi_appid": '105009', //appid
                    "showapi_sign": "51084e3ee1f34d5c86af6e0e3506a8fa", //密钥secret
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
                        new Promise((resolve) => {
                            remainSecond(oRemainSeconds, 59, () => {
                                resolve();
                            });
                        }).then(() => {
                            oRemainSeconds.parent().removeClass('active');
                        })
                    }
                }
            });
        }
    });

    nextStep_1.click((e) => {
        e.preventDefault();
        nextStep(flags_1, '.round-1', '.round-2', '.round-1-content');
    })
    oVerify.on('input', () => {
        verify = oVerify.val();
        flags_1[1] = (verify == code);
    })

    oName.on('input', (e) => {
        //由于涉及请求(异步),因此不可以直接定义flag变量
        username = oName.val().trim();
        if (username.length < 6) {
            oName.parent().addClass("form-group-error");
            flags_2[0] = false;
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
                    success: function(response) {
                        if (response == 0) {
                            oName.parent().addClass("form-group-error");
                            flags_2[0] = false;
                            oName.next('span').addClass('err').text("用户名已被注册!");
                        } else if (response == 1) {
                            oName.parent().removeClass("form-group-error");
                            flags_2[0] = true;
                            oName.next('span').addClass('info').text("用户名可用!");
                        }
                    }
                });

            } else {
                oName.parent().removeClass("form-group-error");
                flags_2[0] = false;
                oName.next('span').addClass('err').text("用户名非法!");
            }
        }
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

    nextStep_2.click((e) => {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "../server/register.php",
            data: {
                phone,
                username,
                pwd
            },
            success(res) {
                if (res == 1) {
                    nextStep(flags_2, '.round-2', '.round-3', '.round-2-content');
                    remainSecond(remain5Sseconds, 4, () => {
                        window.location.href = './login.html';
                    });

                }
            }
        })

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
                fn && fn();
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

    function nextStep(flagArr, str1, str2, str3) {

        if (flagArr.some((e) => e == false)) {
            return;
        } else {
            //1.step-slider变换
            $(str1).next().addClass('active');
            $(str1).siblings(str2).addClass('active');

            //2.step-content变换
            $(str3).removeClass('cur').next().addClass('cur');
        }
    }
})