$(() => {

    Cookie.remove('userId');

    let oPhone = $('#phone');
    let oPassword = $('#password');
    let loginBtn = $('.loginBtn').eq(0);
    let clearTextBtn = $('.clearText');

    let errTip = $('.err-tip').eq(0);
    let autoLogin = $('.autoLogin').eq(0);
    let warningTip = $('.warning-tip').eq(0);

    let phone = '';
    let password = '';
    let isAutoLogin = false;

    //自动登录
    let userInfo = store.get('userInfo');
    if (userInfo) {
        oPhone.val(userInfo.phone);
        oPassword.val(userInfo.password);
        autoLogin.prop('checked', 'checked')
    }

    autoLogin.change((e) => {
        isAutoLogin = $(e.target).prop('checked');
        if (isAutoLogin) {
            warningTip.slideDown(0).siblings('.tips').slideUp(0);
        }
    });

    loginBtn.click((e) => {
        e.preventDefault();
        phone = oPhone.val();
        password = oPassword.val();

        let data = {
            phone,
            password
        }
        $.ajax({
            type: "post",
            url: "../server/login.php",
            data,
            dataType: 'json',
            success: function(response) {
                if (response.status == "success") {
                    if (isAutoLogin) {
                        store.set('userInfo', data);
                    } else {
                        store.remove('userInfo');
                    }
                    // document.cookie = `userId=${response.data[0].id}`;
                    Cookie.remove('userId');
                    Cookie.set('userId', response.data[0].id)

                    window.location.href = './index.html';
                } else {
                    errTip.slideDown(0).siblings('.tips').slideUp(0);
                }
            }
        });
    });

    //无关紧要
    //扫码登录 <=> 账户登录
    let loginTab = $('.login-tab');
    loginTab.click((e) => {
        e.preventDefault();
        let etp = $(e.target).parent();
        let i = etp.index();
        etp.addClass('cur').siblings().removeClass('cur');
        $('.login-con').eq(i).addClass('curr').siblings().removeClass('curr')
    })

    let moreBtn = $('.more');

    clearTextBtn.click((e) => {
        e.preventDefault();
        $(e.target).siblings('input').val('');
    })

    //更多
    moreBtn.click((e) => {
        e.preventDefault();
        let et = $(e.target);
        et.toggleClass('active');
        let etps = $(e.target).parent().siblings();
        toggleHeight(etps, 26, 56);
    });

    function toggleHeight(ele, h1, h2) {
        let h = ele.height();
        if (h == h2) {
            ele.animate({
                height: h1 + 'px'
            });
        } else {
            ele.animate({
                height: h2 + 'px'
            });
        }
    }
})