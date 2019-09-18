$(() => {
    //协议
    $('.inpBtn').click((e) => {
        e.preventDefault();
        $('.popBoxWrapper').css('display', 'none');
        $(document.body).addClass('body');
    })

    //第一步
    let oPhone = $('#oPhone');
    let oVerify = $('#oVerify');
    let oGetVerify = $('.getVerifyCode').eq(0);
    let phoneReg = /^1[3-9][0-9]{9}$/;
    let phone = '';
    let code;
    let verify = '';
    let flags = new Array(2).fill(false);

    oPhone.on('blur', (e) => {
        let flag = false;
        e.preventDefault();
        phone = oPhone.val().trim();

        if (phone.length == 0) {
            oPhone.next('span').addClass('err').text("手机号不能为空!");
            oPhone.parents(".form-group").addClass("form-group-error");
            flag = false;
        } else {
            if (phoneReg.test(phone)) {
                oPhone.next().addClass('info').text("手机号正确");
                oPhone.parents(".form-group").removeClass("form-group-error");
                flag = true;
            } else {
                oPhone.next('span').addClass('err').text("手机号不存在");
                flag = false;
            }
        }
        flags[0] = flag;
    });

    oVerify.on('blur', () => {
        verify = oVerify.val();
        if (verify == code) {
            if (flags[1] == true) {
                flags[1] == true;
            } else {
                flags[1] = false;
            }
        }
    })
    oGetVerify.on('click', (e) => {
        e.preventDefault();
        if (flags[0] == false) {
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
                    "mobile": '15607002736',
                    "content": `{\"code\":\"${code}\",\"minute\":\"3\",\"comName\":\"国美商城\"}`,
                    "tNum": "T150606060601",
                },

                error: function(xhr, textStatus, errorThrown) {
                    alert("操作失败!");
                },
                success: function(result) {
                    if (result.showapi_res_code == 0) {
                        flags[1] = true;
                    }
                }
            });
        }
    })

    let nextStep_1 = $('.nextStepBtn').eq(0);
    nextStep_1.on('click', (e) => {
        e.preventDefault();
        console.log(flags);

        // flags[0] = true;
        // flags[1] = true;
        if (flags.some((ele) => ele == false)) {
            return;
        } else {
            //下一步
            //1.step-slider变换
            $('.round-1').removeClass('active').siblings('.round-2').addClass('active');
            //1.step-content变换
            $('.round-1-content').removeClass('cur').next().addClass('cur');
        }
    })


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

    //第二步
})