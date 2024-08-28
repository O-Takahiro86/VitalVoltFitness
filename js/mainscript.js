'use strict';

$(function(){

    // 読み込み時ふわっと表示
    $('body>*:not(header,.sub-nav)').animate({'opacity':1},1700);

    // ハンバーガーメニューopen〜close
    $(".openbtn4").click(function () {
        $(this).toggleClass('active');
        $('.main_nav-content').toggleClass('active');
    });

// windowスクロールイベント
    // ※デスクトップ版navの初期位置の変数
    let navPos = $('.pc-nav').offset().top;
    // ※スクロールの折り返し位置取得用の変数
    let lastScrollTop = 0;
    // ※headerのサイズ取得
    const headerSize = $('header').height();
    // ※bodyサイズ
    let bodySize = $('body').height();
    // loadしたときにスクロール量が初期位置より大きいならデスクトップ版navを固定
    if($(window).scrollTop() > navPos){
        $('.pc-nav').css({
            'position':'sticky',
            'top':headerSize
        })
    }
    $(window).scroll(function(event){
        // スクロール位置を取得
        let st = $(this).scrollTop();
        if(st > lastScrollTop){
            // 下にスクロールしている
            $('header').css('top',-headerSize); // headerを上に隠す
            $('.pc-nav').css({
                'position':'sticky',
                'top':0
            });
            // スクロール量が指定より大きいならbox-shadowつける
            if($(this).scrollTop() > navPos){
                $('.pc-nav').addClass('box_Shadow');
            }
        } else {
            // 上にスクロールしている
            $('header').css('top','0'); // headerをtopに表示
            $('.pc-nav').css('top',headerSize); // デスクトップ版navをheaderの直下にずらす
            // スクロール量が0なら
            if($(this).scrollTop() === 0){
                $('.pc-nav').css('position','static').removeClass('box_Shadow');
            }
        }
        lastScrollTop = st; // 折り返し地点更新

        // "最上部に戻るボタン"の表示切り替え
        if($(this).scrollTop() > bodySize/3){
            $('#pageTop').fadeIn();
        }else{
            $('#pageTop').fadeOut();
        }
    });

    // ページ内リンクで該当sectionに飛ぶ
    $('a[href ^="#"]').click(function(){
        let href = $(this).attr("href");
        let target = $(href == "#" || href == "" ? "html" : href);
        let position = target.offset().top;
        position = position - headerSize;
        $("body,html").animate({ scrollTop: position }, 500,'swing');
        return false;
    });

});