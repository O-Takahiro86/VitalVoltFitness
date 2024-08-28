'use strict';

$(function(){
    // 変数・定数・配列・オブジェクト
    let boolean; // true or false
    let storage = sessionStorage;
    let loginState = storage.getItem('Login_State'); // Keyの値
    let memberName ; // ログイン者の名前取得用

    // 共通項目

    $('body>*:not(header)').css('opacity',1);

        // スクロールイベント
    function AutoResize(){
        let windowSize = $(window).height();
        let bodySize = $('body').height();
        let footerSize = $('footer').height();
        let headerSize = $('header').height();
        let timeHeadSize = $('.time-head').height();

        // footer static - sticky
        if(bodySize - footerSize >= windowSize){
            $('footer').css('position','static');
        }else{
            $('footer').css('position',"");
        }

        // カレンダーsticky
        $('.time-head').css({
            'position':'sticky',
            'top':headerSize,
            'z-index':2
        });

        setTimeout(AutoResize,100);
    }

    AutoResize(); // 初期稼働

        // inputBOX選択時
    $('input').each(function(){
        $(this).focus(function(){
            $(this).css({
                'border':'2px solid #e4820b',
                'background-color':""
            });
        }).blur(function(){
            $(this).css('border',"");
        });
    });

    // function
        // 属性ボタンを選択中orログイン中以外はmainの内容を非表示
    function memberAttr_State(event){
        if(!event){ // false
            $('#main_container').css('display','none');
        }else{ //true
            $('#main_container').css('display',"");
        }
    };
        // memberAttr_State 判別用
    function Select_State(){
        if($('.memberAttr button').hasClass('select') || loginState == 'Login'){
            boolean = true;
        }else{
            boolean = false;
        }
        memberAttr_State(boolean);
    }

        // プログラム選択を解除
    function ProgramDeselect(){
        let programs = $('.select-item');
        programs.each(function(){
            if($(this).hasClass('select')){
                $(this).removeClass('select');
                $(this).find('i.fa-check').addClass('hidden');
            }
        });
        Trainer_Select();
        Guidance_Select();
    };

        // プログラムが選択(.select)されていたらトレーナー選択画面出現
    function Trainer_Select (){
        if($('.training').hasClass('select')){
            $('.trainer-select').show();
        }else{
            $('.trainer-select').hide();
        }
        Calendar_Appear();
    };

        // 健康習慣プログラムが選択(.select)されていたら窓口を出す
    function Guidance_Select(){
        if($('#Guidance').hasClass('select')){
            $('.guidance-form').show();
        }else{
            $('.guidance-form').hide();
        }
            // トレーナーの.select外す
        let trainer =$('.trainer-select .gym-staff');
        trainer.each(function(){
            if($(this).hasClass('select')){
                $(this).removeClass('select');
                $(this).find('i.fa-check').addClass('hidden');
            }
        });

        Calendar_Appear();
    }

        // トレーナーが選択されていたらカレンダー表示
    function Calendar_Appear(){
        if($('#Personal,#OnlinePersonal').hasClass('select') && $('.gym-staff').hasClass('select')){
            $('.time-table').show();
            // ログインしてなければuser入力画面開く
            if(loginState !== 'Login'){
                $('#firstUserField').fadeIn();
            }
        }else{
            $('.time-table').hide();
            $('#firstUserField').fadeOut();
        }
    };

    // メイン

    // フォーム利用者の属性選択時の色付け
        // 会員
    $('#member').click(function(){
        $(this).addClass('select');
        $('#firstUser').removeClass('select');
    });

        // 初回利用(体験)
    $('#firstUser').click(function(){
        $(this).toggleClass('select');
        $('#member').removeClass('select');
        // プログラムメニューを出現
        $('.member-form').toggle('fast',function(){
            if($('#Guidance').hasClass('hidden')){
                $('#Guidance').removeClass('hidden');
            }
        });

        Select_State();
    });

    // ログイン処理
        // ログイン画面出現
    $('#member').click(function(){
        if($('#member').hasClass('select') || loginState !== "Login"){
            $('#overlay').fadeIn();
            $('#login').fadeIn();
        }
    });

        // ログインボタンの動作
    $('#loginButton').click(function(){
        // ログイン画面の空欄チェック
        let Checked = true; // 始めはtrue
        $(".login-item").each(function(){
            if($(this).val()===""){
                $(this).attr('placeholder','※入力してください').css('background-color','rgba(239,137,178,0.7)');
                Checked = false; // 空欄があればfalse
            }
        });

        // 空欄でなければログインする
        if(Checked){
            storage.setItem('Login_State','Login'); //KeyにログインState
            loginState = storage.getItem('Login_State');
            memberName = $('input[name="member-ID"]').val();
            $('#overlay').fadeOut();
            $('#login').fadeOut();
            window.alert(`ログインしました。${memberName} 様、こんにちは！`);
            // 画面表示変更
            $('#attention').html("<p><strong>"+memberName+" 様</strong>、ようこそ！</p>");
            $('div.memberAttr').html('<button id="logout">ログアウト</button>');
            // プログラムメニューを表示する
            $('.member-form').show('fast',function(){
                if(!$('#Guidance').hasClass('hidden')){
                    $('#Guidance').addClass('hidden');
                }
            });
            // カレンダーの日時選択を解除
            $('#calendarTable td').removeClass('selected');
            $('#selectedDateTime').text("");

            Select_State();
            ProgramDeselect(); // 選択中のプログラム解除
        }
    });

        // 閉じるボタンの動作
    $('#closeButton1').click(function(){
        $('#overlay').fadeOut();
        $('#login').fadeOut();
        // ログイン画面の入力内容削除
        $('input.login-item').each(function(){
            $(this).val("").css('background-color',"").removeAttr('placeholder');
        });
        $('#member').removeClass('select');
        $('#firstUser').removeClass('select');
        $('.member-form').hide('fast',function(){
            if(!$('#Guidance').hasClass('hidden')){
                $('#Guidance').addClass('hidden');
            }
        });

        Select_State();
    });

    // プログラム選択処理
        // 選択したプログラム色付け
    $('#Personal').click(function(){
        $(this).toggleClass('select');
        $(this).find('i.fa-check').toggleClass('hidden');
        $('#OnlinePersonal').removeClass('select');
        $('#OnlinePersonal').find('i.fa-check').addClass('hidden');
        $('#Guidance').removeClass('select');
        $('#Guidance').find('i.fa-check').addClass('hidden');
        Trainer_Select();
        Guidance_Select();
    });
    $('#OnlinePersonal').click(function(){
        $(this).toggleClass('select');
        $(this).find('i.fa-check').toggleClass('hidden');
        $('#Personal').removeClass('select');
        $('#Personal').find('i.fa-check').addClass('hidden');
        $('#Guidance').removeClass('select');
        $('#Guidance').find('i.fa-check').addClass('hidden');
        Trainer_Select();
        Guidance_Select();
    });
    $('#Guidance').click(function(){
        $(this).toggleClass('select');
        $(this).find('i.fa-check').toggleClass('hidden');
        $('#Personal').removeClass('select');
        $('#Personal').find('i.fa-check').addClass('hidden');
        $('#OnlinePersonal').removeClass('select');
        $('#OnlinePersonal').find('i.fa-check').addClass('hidden');
        Trainer_Select();
        Guidance_Select();
    });

    // トレーナー選択画面
        // 選択したら色付け
    $('#TheMaccho').click(function(){
        $(this).toggleClass('select');
        $(this).find('i.fa-check').toggleClass('hidden');
        $('#TheExercise').removeClass('select');
        $('#TheExercise').find('i.fa-check').addClass('hidden');
        Calendar_Appear();
    });
    $('#TheExercise').click(function(){
        $(this).toggleClass('select');
        $(this).find('i.fa-check').toggleClass('hidden');
        $('#TheMaccho').removeClass('select');
        $('#TheMaccho').find('i.fa-check').addClass('hidden');
        Calendar_Appear();
    });

    // 健康習慣フォーム
    $('#confirm_btn').click(function(){
        let Checked = true;
        let Name;
        let Email;
        let Program;
        $('#guidance_form input').each(function(){
            if($(this).val()===""){
                $(this).attr('placeholder','※入力してください').css('background-color','rgba(239,137,178,0.7)');
                Checked = false;
            }
        });
        if($('select[name="guidance_program"]').val()===null){
            $('span#required_msg').html('<small>※選択してください</small>').css('color','red');
            Checked = false;
        }else{
            $('span#required_msg').html("").css('color',"");
        }
        // 入力内容確認画面fadeIn
        if(Checked){
            Name = $('input[name="name"]').val();
            Email = $('input[name="e-mail"]').val();
            Program = $('select[name="guidance_program"]').val();
            // オーバーレイ表示
            $('#overlay').fadeIn();
            $('#guidance_confirm').fadeIn();

            $('#name_confirm').text(Name);
            $('#email_confirm').text(Email);
            $('#program_confirm').text(Program);

        }
    });

        // 送信ボタンの動作
    $('#submit,#decided_btn').click(function(){
        alert('送信しました。ご登録のメールアドレスにご予約に関する情報をお送りします。');
        location.reload();
    });
        // 修正ボタンの動作
    $('#fix_btn').click(function(){
        $('#overlay').fadeOut();
        $('#guidance_confirm').fadeOut();
    });


        // 日時選択用カレンダー
    let today = new Date();
    today.setDate(today.getDate() + 1); // 初期表示を明日からに設定
    let Capacity = ["○", "-"];
    let maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 1); // 今日から1ヶ月後

        // 一週間分を表示
    function updateWeekDisplay(startDate) {
        let endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        let startString = (startDate.getMonth() + 1) + "/" + startDate.getDate();
        let endString = (endDate.getMonth() + 1) + "/" + endDate.getDate();
        $("#One_Week").text(startString + " - " + endString);
    }
        // カレンダー生成
    function generateCalendar(startDate) {
        let daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
        let hours = [];
        for (let h = 10; h <= 21; h++) {
            hours.push(h + ":00");
        }

        let table = $("#calendarTable");
        table.empty();
        let thead = $("<thead></thead>");
        let headerRow = $("<tr></tr>");
        headerRow.append("<th></th>");
        for (let i = 0; i < 7; i++) {
            let date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            let day = daysOfWeek[date.getDay()];
            let dateString = (date.getMonth() + 1) + "/" + date.getDate() + " (" + day + ")";
            let th = $("<th></th>").text(dateString);

            // 土曜は青色、日曜は赤色の背景に設定
            if (day === "土") {
                th.addClass("saturday");
            } else if (day === "日") {
                th.addClass("sunday");
            }

            headerRow.append(th);
        }
        thead.append(headerRow);
        table.append(thead);

        let tbody = $("<tbody></tbody>");
        for (let j = 0; j < hours.length; j++) {
            let row = $("<tr></tr>");
            row.append("<td>" + hours[j] + "</td>");
            for (let k = 0; k < 7; k++) {
                let date = new Date(startDate);
                date.setDate(startDate.getDate() + k);
                let randomIndex = Math.floor(Math.random() * 2);
                let cellContent = Capacity[randomIndex];
                let cell = $("<td></td>").text(cellContent);

                if (date > maxDate) {
                    cellContent = "-";
                    cell.text(cellContent);
                    cell.addClass("unavailable");
                } else if (cellContent === "○") {
                    cell.addClass("clickable");
                    cell.on("click", function() {
                        $("td").removeClass("selected");
                        $(this).addClass("selected");

                        let selectedRow = $(this).closest("tr").index();
                        let selectedColumn = $(this).index();
                        let selectedHour = hours[selectedRow];
                        let selectedDay = $('thead th').eq(selectedColumn).text();
                        $("#selectedDateTime").html(selectedDay + " " + selectedHour).css({
                            'border':'1px double #29323D',
                            'background-color':'#f4b88e'
                        });
                    });
                }

                row.append(cell);
            }
            tbody.append(row);
        }
        table.append(tbody);
    }

    function isWithinDateRange(date) {
        let now = new Date();
        now.setDate(now.getDate() - 1);
        return date >= now && date <= maxDate;
    }

    function updateCalendar(direction) {
        let newDate = new Date(today);
        newDate.setDate(today.getDate() + direction);
        if (isWithinDateRange(newDate)) {
            today = newDate;
            updateWeekDisplay(today);
            generateCalendar(today);
        }
    }

    updateWeekDisplay(today); // 初期表示
    generateCalendar(today); // 初期表示

    $("#prev").click(function() {
        updateCalendar(-7);
    });

    $("#next").click(function() {
        updateCalendar(7);
    });

    // 最終入力確認画面
    $('#timeCalendar_confirm').click(function(){
        let Checked = true;
        let Name;
        let Gender;
        let Age;
        let Tel;
        let Email;
        let Program;
        let Trainer;
        let Schedule;

        // ゲストユーザーなら入力内容確認
        if(loginState !== 'Login'){
            $('#firstUserField input:not([type="radio"])').each(function(){
                if($(this).val()===""){
                    $(this).attr('placeholder','※入力してください').css('background-color','rgba(239,137,178,0.7)');
                    Checked = false;
                }
            });
        }
        // カレンダー日時選択しているか
        if($('#selectedDateTime').text()===""){
            $('#required_msg2').html('<small>日時を選択してください</small>').css('color','red');
            Checked = false;
        }
        // 会員もゲストも共通項目は先に取得
        Program = $('#program .select').find('span.program-name').text();
        Trainer = $('#trainer .select').find('span.trainer-name').text();
        Schedule = $('#selectedDateTime').text();

        // 入力内容確認画面fadeIn
        if(Checked && loginState !=='Login'){
            Name = $('input[name="firstUser_name"]').val();
            Gender = $('input[name="gender"]:checked').val();
            Age = $('input[name="age"]').val();
            Tel = $('input[name="tel"]').val();
            Email = $('input[name="firstUser_email"]').val();

            $('#program_name').text(Program);
            $('#trainer_name').text(Trainer);
            $('#schedule').text(Schedule);
            $('#experiencer').text(Name);
            $('#experiencer_gender').text(Gender);
            $('#experiencer_age').text(Age);
            $('#experiencer_tel').text(Tel);
            $('#experiencer_email').text(Email);

            // オーバーレイ表示
            $('#overlay').fadeIn();
            $('#final_confirm').fadeIn();

        }else if(Checked && loginState === 'Login'){
            $('#program_name').text(Program);
            $('#trainer_name').text(Trainer);
            $('#schedule').text(Schedule);

            $('#finalConfirm_text').prepend(memberName + "様、")
            $('#firstUser_info').css('display','none');
            $('#overlay').fadeIn();
            $('#final_confirm').fadeIn();
        }
    });

    // 訂正ボタン処理
    $('#correct_btn').click(function(){
        $('#overlay').fadeOut();
        $('#final_confirm').fadeOut();
    });

    // ログアウト処理
    $('.memberAttr').on('click','#logout',function(){
        window.alert(memberName+'様、さようなら！');
        location.reload();
    });

    // ページ更新・遷移・離脱時にsessionStorageのKeyを消去
    $(window).on('beforeunload', function(){
        if(loginState === "Login"){
            storage.clear();
        }
    });

});
