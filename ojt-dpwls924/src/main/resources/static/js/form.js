/******************************************************************************
    작성자 : 김기석
    작성일 : 2011.05.03
    기능 : 유효성 체크 기능 라이브러리 제공
    참고사항 :
        경고메세지는 자동구성으로 처리하지만 사용자 attribute를 해당 클래스명과 동일하게 설정할 수도 있음.
            => <input type="text" class="required" name="ordNm" title="주문자명" required="주문자 이름은 필수입니다." />
******************************************************************************/
$.crewFormLib = {
    // 폼 유효성 체크 기본값들...
    validateFormDefaults : {
        msgType : "alert",                // 메세지 형식 [dialog|alert]
        chkClass : ["required"],        // 이항목은 현재 미사용중임.
        chkMsg : {
            "required"        : "[{0}] 항목은 필수입니다.",                // title attribute로 대체함.
            "onlynum"        : "[{0}] 항목은 숫자만 입력 가능합니다.",        // title attribute로 대체함.
            "zeroCheck"        : "[{0}] 항목은 0을 입력할 수 없습니다.",         // title attribute로 대체함.
            "emailCheck"    : "메일주소가 형식에 맞지 않습니다.",
            "hpCheck"        : "휴대폰번호가 형식에 맞지 않습니다.",
            "telCheck"        : "전화번호가 형식에 맞지 않습니다."
        }
    },


    // 해당 폼의 유효성을 체크함. - 1개 폼에 대해서 처리함.
    validateForm : function(options){
        var defaults = {
            form    : null
        };

        var form = $(this).get(0);
        if(form.tagName.toLowerCase() != "form"){ crew.alert(lang.form.notFormObject, "validateForm"); return false; }
        defaults.form = form;

        options = $.extend(true, defaults, $.crewFormLib.validateFormDefaults, options);
        if(options.form == null){ crew.alert(lang.form.entryFormNotValidValidationCheck); return false; }


        // 유효성 체크 처리
        var f = $(options.form);
        var isValidate = true;
        options.chkResult = {};
        f.data("validate_options", options);

        f.find("input,select,textarea").each(function(idx){
            if(!$.crewFormLib.validateElement(f, this)){ isValidate = false; }
        });

        // 유효성 체크 결과 노출
        if(!isValidate){ $.crewFormLib.showMsg(f); }

        return isValidate;
    },


    // 해당 폼 구성 요소의 유효성 검사
    validateElement : function(target, e){
        var options = target.data("validate_options");
        var chkResult = options.chkResult;
        var rv = true;
        var isValidateElement = false;

        // 유효성 체크
        if($(e).hasClass("required")){
            if(!chkResult[e.name]){ chkResult[e.name] = {}; }
            chkResult[e.name]["required"] = "";
            isValidateElement = true;

            if(!$.crewFormLib.checkRequired(e)){
                chkResult[e.name]["required"] = $.crewFormLib.getMsg(options, "required", e);
                chkResult[e.name]["obj"] = e;
                options.chkResult = chkResult;
                target.data("validate_options", options);
                rv = false;
            }
        }

        if($(e).hasClass("onlynum")){
            if(!chkResult[e.name]){ chkResult[e.name] = {}; }
            chkResult[e.name]["onlynum"] = "";
            isValidateElement = true;

            if(!$.crewFormLib.checkOnlyNum(e)){
                chkResult[e.name]["onlynum"] = $.crewFormLib.getMsg(options, "onlynum", e);
                chkResult[e.name]["obj"] = e;
                options.chkResult = chkResult;
                target.data("validate_options", options);
                rv = false;
            }

            if($(e).hasClass("zeroCheck")){
                if(rv && $.trim(e.value) == '0'){
                    chkResult[e.name]["zeroCheck"] = $.crewFormLib.getMsg(options, "zeroCheck", e);
                    chkResult[e.name]["obj"] = e;
                    options.chkResult = chkResult;
                    target.data("validate_options", options);
                    rv = false;
                }
            }
        }

        if($(e).hasClass("emailCheck")){
            if(!chkResult[e.name]){ chkResult[e.name] = {}; }
            if(rv && !$.crewFormLib.patternCheck('email',$.trim(e.value))){
                chkResult[e.name]["emailCheck"] = $.crewFormLib.getMsg(options, "emailCheck", e);
                chkResult[e.name]["obj"] = e;
                options.chkResult = chkResult;
                target.data("validate_options", options);
                rv = false;
            }
        }

        if($(e).hasClass("hpCheck")){
            if(!chkResult[e.name]){ chkResult[e.name] = {}; }
            if(rv && !$.crewFormLib.patternCheck('hp',$.trim(e.value))){
                chkResult[e.name]["hpCheck"] = $.crewFormLib.getMsg(options, "hpCheck", e);
                chkResult[e.name]["obj"] = e;
                options.chkResult = chkResult;
                target.data("validate_options", options);
                rv = false;
            }
        }

        if($(e).hasClass("telCheck")){
            if(!chkResult[e.name]){ chkResult[e.name] = {}; }
            if(rv && !$.crewFormLib.patternCheck('tel',$.trim(e.value))){
                console.log('cccc' +e.name);
                chkResult[e.name]["telCheck"] = $.crewFormLib.getMsg(options, "telCheck", e);
                chkResult[e.name]["obj"] = e;
                options.chkResult = chkResult;
                target.data("validate_options", options);
                rv = false;
            }
        }




        // 이벤트 핸들 추가
        if(options.msgType == "dialog"){
            if(isValidateElement && $(e).data("validateElementEvent") == null){
                $(e).data("validate_target", target);
                $(e).data("validate_options", options);

                switch(e.tagName.toLowerCase()){
                    case "input" :
                        $(e).keyup(function(event){
                            $.crewFormLib.validateElement($(this).data("validate_target"), this);
                            $.crewFormLib.showMsg($(this).data("validate_target"));
                        });
                        break;
                }

                $(e).data("validateElementEvent", true);
            }
        }

        return rv;
    },


    // 필수 입력값 체크
    checkRequired : function(obj){
        var val = "";

        switch(obj.tagName.toLowerCase()){
            case "input" :
                switch(obj.type.toLowerCase()){
                    case "hidden"    : val = obj.value; break;
                    case "text"      : val = obj.value; break;
                    case "tel"       : val = obj.value; break;
                    case "email"     : val = obj.value; break;
                    case "number"    : val = obj.value; break;
                    case "password"  : val = obj.value; break;
                    case "checkbox"  :
                    case "radio"     :
                        val = $("input[name='" + obj.name + "']:checked").val() ? $("input[name='" + obj.name + "']:checked").val() : "";
                        break;
                    default :
                        //alert(obj.type.toLowerCase() + " 항목에 대한 정의가 필요함");
                        alert(lang.fn.messagePartChange(lang.form.definitionIsRequiredForTheEntry, obj.type.toLowerCase()));
                }
                break;
            case "select" :        val = obj.value; break;
            case "textarea" :    val = obj.value; break;
            default :
                //alert(obj.tagName.toLowerCase() + "항목에 대한 필수값 체크 로직이 누락되어 있음.");
                alert(lang.fn.messagePartChange(lang.form.checkTheLogicRequiredValuesMinssing, obj.tagName.toLowerCase()));
                return false;
        }
        return !($.trim(val) == "");
    },


    // 숫자 입력 값 체크
    checkOnlyNum : function(obj){
        var val = "";

        switch(obj.tagName.toLowerCase()){
            case "input" :
                switch(obj.type.toLowerCase()){
                    case "text" : val = $.trim(obj.value); break;
                }
                break;
            default : return true;
        }

        if(val == ""){ return true; }
        else{
            return !isNaN(val.replace(/[.]/g, ''));
        }
    },



    // 메세지 노출
    showMsg : function(target){
        var options = target.data("validate_options");
        switch(options.msgType){
            case "dialog" : $.crewFormLib.showMsgDialog(target); break;
            case "alert" : $.crewFormLib.showMsgAlert(target); break;
        }
    },


    // 메세지 노출 - alert
    showMsgAlert : function(target){
        var options = target.data("validate_options");
        var chkResult = options.chkResult;

        for(var name in chkResult){
            for(var key in chkResult[name]){
                if(chkResult[name][key] != ""){
                    alert(chkResult[name][key]);
                    //$("input[name=" + name + "]").focus();
                    chkResult[name]["obj"].focus();
                    return;
                }
            }
        }
    },


    // 메세지 노출 - 다이얼로그
    showMsgDialog : function(target){
        var options = target.data("validate_options");
        var chkResult = options.chkResult;

        var html = [];
        for(var name in chkResult){
            for(var key in chkResult[name]){
                if(chkResult[name][key] != ""){
                    html.push("<div class='validate_result_item' style='cursor:pointer;' id='result_" + name + "_" + key + "'>" + chkResult[name][key] + "</div>");
                }
            }
        }

        // 보여줄 메세지가 존재하는 경우
        if(html.length > 0){
            // 내용구성
            if($(".crewFormLibResult").size() == 0){
                $("<div class='crewFormLibResult'><div class='crewFormLibResultMsg' style='text-align:left;'></div></div>").appendTo("body");
                $(".crewFormLibResult").dialog({
                    autoOpen : false,
                    title : lang.form.RequiredValueCheck,
                    position : ["right", "top"]
                });
            }
            $(".crewFormLibResultMsg").html(html.join(""));



            // 클릭 이벤트 핸들 처리
            $(".crewFormLibResultMsg").find(".validate_result_item").mouseover(function(event){
                var info = this.id.split("_");
                target.find("input[name=" + info[1] + "]").focus();
            });

            // 다이얼로그 보이기
            if($(".crewFormLibResult").dialog("isOpen") != true){
                $(".crewFormLibResult").dialog("open");
            }
        }else{
            $(".crewFormLibResult").dialog('close');
        }
    },


    // 메세지 반환
    getMsg : function(options, key, obj){
        var msg = options.chkMsg[key];
        var title = $(obj).prop("title") == "" ? obj.name : $(obj).prop("title");

        switch(key){
            case "required" :
            case "zeroCheck":
            case "onlynum" :
            case "emailCheck" :
            case "hpCheck" :
            case "telCheck" :
                msg = typeof($(obj).prop(key)) == "string" ? $(obj).prop(key) : msg.replace(/\{0\}/gi, title);
                break;
        }

        return msg;
    },

    // 해당 폼의 값을 JSON으로 리턴함.
    serializeObject : function(pre){
        if (typeof pre == "undefined") {
            pre = '';
        }else{
            pre = pre + ".";
        }

        var o = {};
        var a = this.serializeArray();

        $.each(a, function() {
            if (o[pre + this.name] !== undefined) {
                if (!o[pre + this.name].push) {
                    o[pre + this.name] = [o[pre +this.name]];
                }

                o[pre +this.name].push(this.value || '');
            } else {
                o[pre + this.name] = this.value || '';
            }
        });

        return o;
    },

    // 해당 데이터를 받아서 입력폼에 값을 채워넣는다. => form 태그에 사용할 것! => 해당 필드의 값이 없으면 초기화 시킴.
    fillForm : function(data){
        var f = $(this);
        data = $.extend(true, {}, data);

        // input 태그에 대한 처리
        f.find("input").each(function(idx){
            var e        = $(this);
            var type    = e.prop("type").toUpperCase();
            var name    = e.prop("name");

            if(type == "HIDDEN" || type == "TEXT"){
                e.val(data[name] ? data[name] : "");
            }else{
                //alert(type + "에 대한 처리가 정의되지 않았음");
                alert(lang.fn.messagePartChange(lang.form.ProcessingIsNotDefined, type));
            }
        });


        // select에 대한 처리
        f.find("select").each(function(idx){
            var e        = $(this);
            var name    = e.prop("name");
            var val        = data[name] ? data[name] : "";
            e.find("option[value=" + val + "]").prop("selected", true);
        });
    },

    // 폼의 입력값을 초기화 시킵 => 지정한 data의 값이 존재하면 해당 값을 초기화함.
    clearForm : function(data){
        var f = $(this);
        data = $.extend(true, data);

        // input 태그에 대한 처리
        f.find("input").each(function(idx){
            if(type == "HIDDEN" || type == "TEXT"){
                e.val(data[key]);
            }else{
                //alert(type + "에 대한 처리가 정의되지 않았음");
                alert(lang.fn.messagePartChange(lang.form.ProcessingIsNotDefined, type));
            }
        });
    },

    //이메일/연락처에 대한 패턴 체크
    patternCheck : function(type, value){
        if(value){
            switch (type) {
            case "email":
                return /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/.test(value);
                break;
            case "hp":
                return /^([\d]){3}-?([\d]){3,4}-?([\d]){4}$/.test(value);
                break;
            case "tel":
                return /^([\d]){2,3}-?([\d]){3,4}-?([\d]){4}$/.test(value);
            }
        }else{
            return true;
        }
    }
};


(function($) {
    $.fn.validateForm        = $.crewFormLib.validateForm;
    $.fn.serializeObject    = $.crewFormLib.serializeObject;
    $.fn.fillForm            = $.crewFormLib.fillForm;
})(jQuery);