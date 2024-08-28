'use strict';

$(function(){

    $('form').on('focus', 'input:not([type="submit"]), textarea', function() {
        // フォームのエリア選択時に色を変える
        $(this).css('border', '3px solid #e4820b');

        if($(this).attr('placeholder')==='※必須項目です'){
            $(this).attr('placeholder',"").css({
                'background-color':"",
                'color':""
            });
        }
    }).on('blur','input:not([type="submit"]),textarea',function(){
        $(this).css('border',"");
    });

    // submit処理
    $('form').submit(function(){
        let valid = true; // フィールド有効判別値

        $('input,textarea').each(function(){
            if($(this).val()===""){
                $(this).attr('placeholder','※必須項目です').css('background-color','rgba(239,137,178,0.7)');
                valid = false;
            }
        });

        // valid===trueなら送信してよい
        if(valid){
            $('#overlay').fadeIn();
            $('#thankYou_message').fadeIn();
        }
        return false; // 疑似サイトのため送信は止めておく
    });

    // オーバーレイとメッセージを非表示にする
    $('#closeButton').on('click', function() {
        $('#overlay').fadeOut();
        $('#thankYou_message').fadeOut();
        $( 'input:not([type="submit"]), textarea').val("");
    });
});