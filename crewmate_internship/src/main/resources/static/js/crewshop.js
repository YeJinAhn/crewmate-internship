var form = {
    ajaxValidate : function (data, isAlert) {
        if(data.resultCode == 1) {
           return true;
        }else if(data.resultCode == 8100){
            alert('접근권한이 없습니다.');
            location.reload();
        }else{
            if(data.message) {
                alert(data.message);
            } else {
                alert("장애가 발생하였습니다.");
            }
            return false;
        }
    }
};

var common = {
    isNotEmpty : function(_str) {
        let obj = String(_str);
        if (obj == null || obj == undefined || obj == 'null'
                || obj == 'undefined' || obj == '')
            return false;
        else
            return true;
    },
    isEmpty : function(_str) {
        return !common.isNotEmpty(_str);
    },
    // 엔터값 체크후 해당 콜백함수 호출
    checkEnter : function(jqObj, callback){
        jqObj.bind("keydown", function(e){
            if(e.keyCode == "13"){
                callback();
            }
        });
    },
    imgError : function (_this){
        var errorUrl = "//" + shop.serverImg + "/resources/image/noimg.jpg";

        if($(_this).attr('src') == errorUrl){
            return;
        }else{
            $(_this).attr('src',errorUrl);
        }
    },

    typeArr : ['ctg', 'menu', 'shop', 'infoNoti', 'faq'],

    /**
     * 전시카테고리 하위 카테고리 select태그 동적 생성
     * ex) onChange='setCtgSelect(this, type)';
     */
    setCtgSelect : function (obj, type) {
        var $obj = $(obj);

        // type 값이 존재할 때 ctg or menu가 아닌 경우 종료
        if (common.isNotEmpty(type) && common.typeArr.indexOf(type) == -1) {
            return;
        }
        
        // type 값이 없는 경우 디폴트 ctg
        if (common.isEmpty(type)) {
            type = 'ctg';
        }

        // 카테고리 고유번호
        var ctgSeq = $obj.val();

        var name = $obj.attr('name');

        // 카테고리 고유번호가 없는 경우
        if (common.isEmpty(ctgSeq)) {
            // 다음 나오는 select 전부 삭제
            $obj.nextAll('select[name="'+name+'"]').remove();

            return;
        }

        $.ajax({
            url: '/' + type + '/' + type + 'SubList'
           , data: {'prntCtgSeq' : ctgSeq}
           , success: function(data) {

               if (!form.ajaxValidate(data)) {
                   return;
               }

               var list = data.infoMap.list;

               $obj.nextAll('select[name="'+name+'"]').remove();

               if (list.length != 0) {
                   var htmlArr = [];
                   htmlArr.push('<select class="ctgSel" name="' + name + '"'+ 'onChange=common.setCtgSelect(this,"'+type+'");>');
                   htmlArr.push('<option value="">선택</option>');
                   for (var i = 0, t; t = list[i]; i++) {
                       htmlArr.push('<option value="' + t.ctgSeq + '">'+ t.ctgNm + '</option>');
                   }
                   htmlArr.push('</select>');
                   // 현재 select태그 다음에 요소 추가
                   $obj.after(htmlArr.join());
               }
           }
           , error: function(xhr, status, error) {
           }
        });
    },

    timer : null,

    /**
     * 동적 카테고리 셀렉트생성 초기화
     */
    initCtgSelect : function (ctgSeq, name) {

        var $ctgSelect = null;
        if (common.isEmpty(name)) {
            // 해당 onchange 이벤트를 갖고있는 select 조회
            $ctgSelect = $('select[onchange^="common.setCtgSelect"]');
            name = $ctgSelect.attr('name');
        } else{
            $ctgSelect = $('select[name="'+name+'"][onchange^="common.setCtgSelect"]');
        }

        if ($ctgSelect.length == 0 || common.isEmpty(ctgSeq) || common.isEmpty(name)) {
            return;
        }

        // number로 넘어온경우 문자열로 변환
        if (typeof ctgSeq == 'number') {
            ctgSeq = String(ctgSeq);
        }

        // ,로 구분되어 값이 넘어올 경우 맨 마지막 값으로 세팅하나 1234, 와 같이 넘어올 경우 맨 앞 데이터 세팅
        if (ctgSeq.includes(',')) {
            if(!common.isEmpty(ctgSeq.split(',').pop())){
                ctgSeq = ctgSeq.split(',').pop();
            }else{
                ctgSeq = ctgSeq.split(',')[0];
            }
        }

        var onchange = $ctgSelect.attr('onchange')
        var type = 'ctg';
        // 타입에 맞는 문자열이 존재하면 해당 타입으로 설정
        for (var t of common.typeArr) {
            if (onchange.includes(t)) {
                type = t;
                break;
            }
        }

        $.ajax({
            url: '/' + type + '/' + type + 'Data'
           , data: {'ctgSeq' : ctgSeq}
           , success: function(data) {

               if (!form.ajaxValidate(data)) {
                   return;
               }

               var path = data.infoMap.data.path;

               if (!common.isEmpty(path)){
                   var p = path.split(',');
                   // path에 있는 루트번호 제거
                   p.shift();
                   var $obj = $ctgSelect.first();
                   var s = common.changeCtgSelect($obj, p, 0);
                   common.timer = setInterval(function(){
                       s.done(function(o, a, i){
                           if (o.next('select[name="'+name+'"]').length > 0){
                               $obj = o.next('select[name="'+name+'"]');
                               s = common.changeCtgSelect($obj, a, ++i);
                           }
                       }).fail(function(data){
                           console.log(data);
                       });
                   }, 100);
               }
           }
           , error: function(xhr, status, error) {
           }
        });
    },

    /**
     * select value 세팅후 강제 change이벤트
     * $obj - value 세팅 및 change 이벤트 발생시킬 객체
     * arr - value에 세팅할 값들이 존재하는 arr
     * idx - arr에서 꺼내올 index
     */
    changeCtgSelect : function ($obj, arr, idx) {
        var deferred = $.Deferred();

        if (idx < arr.length) {
            $obj.val(arr[idx]);
            $obj.change();

            deferred.resolve($obj, arr, idx);
        } else {
            deferred.reject('error');
        }

        if (idx+1 >= arr.length) {
            clearInterval(common.timer);
        }

        return deferred.promise();
    },

    /**
     * div 태그끼리 서로 겹치는지 여부
     */
    isCollision : function ($obj, $target) {
        var oLeft = $obj.offset().left;
        var oTop = $obj.offset().top;
        // top값에서 height만큼 더해주면 요소의 bottom값
        var oBottom = oTop + $obj.outerHeight(true);
        // left값에서 width만큼 더해주면 right값
        var oRight = oLeft + $obj.outerWidth(true);

        var tLeft = $target.offset().left;
        var tTop = $target.offset().top;
        var tBottom = tTop + $target.outerHeight(true);
        var tRight = tLeft + $target.outerWidth(true);

        /**
         * 겹치는 순간 가로, 세로가 겹쳐지는 것이므로 가로, 세로 어느 한 부분이라도 겹치지 않을 경우 false
         * 딱 맞닿는 것까지는 허용
         */
        if (oBottom <= tTop || oTop >= tBottom || oRight <= tLeft || oLeft >= tRight) {
            return false;
        }

        return true;
    }
};