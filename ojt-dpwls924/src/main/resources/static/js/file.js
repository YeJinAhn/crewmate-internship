/******************************************************************************
    작성자 : 김기석
    작성일 : 2014.08.03
    기능 : 파일 첨부 인터페이스 제공
    참고사항 :
        HTML5 기반의 기능 구현임.
******************************************************************************/
$.crewFileLib = {
    // 첨부된 파일 정보를 반환함.
    fileList : function(){
        var rv = [];
        
        $(this).find("tr.fileUnit").each(function(idx){
            $(this).data("fileInfo").dispNo = $(this).find("input.dispNo").val();
            $(this).data("fileInfo").alt = $(this).find("input.alt").val();
            rv.push($(this).data("fileInfo"));
        });
        
        return rv;
    },
    
    //
    fileListSerializeObject : function(name){
        if (typeof name == "undefined") {
            name = "fileList";
        }
        
        var fileList = $(this).fileList();
        let obj = {};
        if (fileList.length == 0) {
            return obj;
        }
        
        let keyArr = Object.keys(fileList[0]);

        for(var i = 0; i < fileList.length; i++) {
            for (let key of keyArr) {
                obj[name + "[" + i + "]." + key] = fileList[i][key];
            }
        }

        return obj;
    },
    
    fileSerializeObject : function (name) {
        if (typeof name == "undefined") {
            name = "fileList";
        }
        var fileList = $(this).data("fileInfo");
        
        let obj = {};
        if (fileList.length == 0) {
            return obj;
        }
        let keyArr = Object.keys(fileList[0]);

        for(var i = 0; i < fileList.length; i++) {
            for (let key of keyArr) {
                obj[name + "[" + i + "]." + key] = fileList[i][key];
                if (key == "alt") {
                    obj[name + "[" + i + "]." + key] = $(this).find(".alt").val();
                }
            }
        }

        return obj;
    },

    // 첨부된 파일의 개수를 반환함.
    fileCnt : function(){
        var rv = 0;
        var fileList    = $(this).fileList();
        
        for(var i=0, f ; f = fileList[i] ; i++){
            if(f.useYn == "Y"){ rv++; }
        }
        
        return rv;
    }, 

    setFileUploadUI : function(options) {
        var defaults = {
            url             : "/common/file/upload",
            allowFileExt    : ["jpg", "gif", "jpeg", "png"],        // 등록 가능 파일 정보 구성
            imageFileExt    : ["jpg", "gif", "jpeg", "png"],        // 이미지 파일 확장자 정보 구성
            attCnt          : 0,                            // 첨부 가능한 파일의 개수, 0이 아니면 검증 로직을 수행하게 됨.
            fileInfoList    : [], 
            orgCheckFileType : "",                      // 원본에 대한 파일타입
            basePath        : ""    ,                   // 수정모드에서 기존의 이미지를 출력하기 위한 기본 경로(원본)
            basePath2       : "",                       // 임시저장모드에서 임시저장으로 등록된 기존의 이미지를 출력하기 위한 기본 경로(임시)
            alt             : true,                     // alt 영역 표시 여부
            flag            : "real",                   // 이미지 경로 호출 플래그 real : 이미지경로서버, image : 로컬경로
            unit            : "list"                  // 이미지 UI unit (single : 단일 이미지, list : 복수 이미지)
        };
        
        options = $.extend(true, defaults, options);

        if (options.unit == "single") {
            $.crewFileLib.singleUnit(this, options);
        } else {
            $.crewFileLib.listUnit(this, options);
        }
    },
    
    // 파일 업로드 인터페이스 처리(단일형)
    singleUnit : function($this, options) {
        var obj = $($this);
        var fileList = [];
        var html = [];
        // 옵션 정보 저장
        obj.data("options", options);

        // 
        var isNotEmpty = common.isNotEmpty(options.fileInfoList) && options.fileInfoList.length != 0;
        var file = (isNotEmpty)? options.fileInfoList : {};
        var alt = (common.isEmpty(file.alt))? "" : file.alt;
        
        // 초기로딩시의 첨부파일 정보 구성
        file.key = file.fileSeq;
        file.useYn = "Y";
        file.tempFile = file.path;

        // tempFile정보가 존재한다면 수정상태임.
        var ext = $.crewFileLib.getFileExt(file.orgFileNm);
        if(file.tempFile && file.tempFile != ""){
            var src;
            if(options.flag == "real"){
                src = '/common/file/imageView?orgFileNm='+file.name+'&tempFile=' + file.tempFile + '&flag=real';
                // 파일이 이미지인지 여부를 판단함.
                if($.crewFileLib.arrayHasValue(options.imageFileExt, ext)){
                    html.push("<a href='" + src + "' class='url'>" + file.orgFileNm + "</a>");
                }
            } else if(options.flag == "image"){
                if(options.orgCheckFileType && options.orgCheckFileType.indexOf(file.fileType) == -1){
                    src = options.basePath2 + file.tempFile;
                }else{
                    src = options.basePath + file.tempFile; 
                }
                
                var errorUrl = "//" + shop.serverImg + "/resources/image/noimg.jpg";
                // 파일이 이미지인지 여부를 판단함.
                if($.crewFileLib.arrayHasValue(options.imageFileExt, ext)){
                    html.push("<img class='imgView imgPreview' src='" + src + "' alt='" + alt + "' onerror='javascript:common.imgError(this)' />");
                }
            }
            
            
        } else {
            // 파일이 이미지인지 여부를 판단함.
            if(options.flag == "real"){
                html.push("<a href='' class='url'></a>");
            } else if(options.flag == "image"){
                var errorUrl = "//" + shop.serverImg + "/resources/image/noimg.jpg";
                html.push("<img class='imgView imgPreview' src='' alt='' onerror='javascript:common.imgError(this)' />");
            }
        }

        html.push('<div class="upld_button">');
        html.push('<button class="btn btn-file">찾아보기</button>');
        html.push('<input type="file" name="selectFile" class="input-type" />');
        // flag가 video가 아닌 경우에만 표시
        if(options.flag != "video") {
            html.push('<button type="button" class="btn del btnRemove" >X</button>');
        }
        file.orgFileNm = (common.isEmpty(file.orgFileNm))? "" : file.orgFileNm;
        html.push('<input type="text" class="input-file fileName" value="' + file.orgFileNm + '" disabled>');
        // 이미지인 경우 ALT 영역 추가
        if (options.flag == "image" && options.alt) {
            html.push('<input type="text" class="input-file alt" value="' + alt + '">');
        }
        html.push('</div>');
        if (isNotEmpty) {
            fileList.push(file);
        }
       
        obj.html(html.join(""));
        
        obj.data("fileInfo", fileList);
        // input file 이벤트 처리
        obj.find("input[name=selectFile]").on('change', $.crewFileLib.uploadOneFile);
        obj.find("button.btnRemove").on('click', $.crewFileLib.deleteFileInfo);
    },
    
    // 파일 업로드 인터페이스 처리(목록형)
    listUnit : function($this, options){
        var obj = $($this);
        
        // 옵션 정보 저장
        obj.data("options", options);
        
        // 영역 기본 구조 구성
        var html = [];

        html.push("<table class='table'>");
        html.push("<colgroup>");
        html.push("<col style='width: 35%;'>");
        html.push("<col style='width: 100px;'>");
        html.push("<col style='width: 60px;'>");
        html.push("<col style='width: 140px;'>");
        html.push("<col style='width: 180px;'>");
        html.push("</colgroup>");
        html.push("<thead>");
        html.push("<tr>");
        html.push("<th>파일명</th>");
        html.push("<th>크기</th>");
        html.push("<th>상태</th>");
        html.push("<th>이미지</th>");
        // 이미지인 경우 ALT 영역 추가
        if (options.flag == "image" && options.alt) {
            html.push("<th>ALT</th>")
        }
        html.push("<th>전시 순서</th>");
        html.push("<th>기능</th>");
        html.push("</tr>");
        html.push("</thead>");
        html.push("<tbody class='fileList'>");
        html.push("</tbody>");
        html.push("</table>");
        
        
        html.push("<div class='upld_button'>");
        html.push(" <input type='file' name='selectFile' />");
        html.push("</div>");
        
        obj.html(html.join(""));
        
        var fileInfoList = (common.isNotEmpty(options.fileInfoList))? options.fileInfoList : [];
        
        // 초기로딩시의 첨부파일 정보 구성
        for(var i=0, file; file = fileInfoList[i] ; i++){
            file.key = file.fileSeq;
            file.useYn = "Y";
            file.tempFile = file.path;
            var f       = { name : file.orgFileNm, size : file.fileSize, tempFile : file.path, fileType : file.fileType, dispNo : file.dispNo, alt : file.alt };
            var unit    = $.crewFileLib.createFileUnit($this, f);
            
            if(unit != null){
                $(unit).data("fileInfo", file);
                $(unit).find(".status").html("완료");
            }
        }
        
        
        
        // input file 이벤트 처리
        obj.find("input[name=selectFile]").on('change', $.crewFileLib.fileSelectChange);
        
        
        // drag & drop 이벤트 처리
        obj.on('dragenter', function (e){
            e.stopPropagation();
            e.preventDefault();
            $($this).css('border', '2px solid #0B85A1');
        });

        obj.on('dragover', function (e){
            e.stopPropagation();
            e.preventDefault();
        });

        obj.on('drop', function (e){
            var files   = e.originalEvent.dataTransfer.files;
            var options = $($this).data("options");

            // HTML5 미지원이면 종료
            if(!files){ return; }
            
            $($this).css('border', '2px dotted #0B85A1');
            e.preventDefault();
            
            // 첨부 파일 개수 체크
            if(options.attCnt != 0){
                if($($this).fileCnt() + files.length > options.attCnt){
                    alert("파일은 최대 " + options.attCnt + "개까지 등록이 가능합니다.");
                    return;
                }
            }

            // 파일첨부 처리
            for(var i=0, file ; file = files[i] ; i++){
                file.dispNo = 1;
                var unit = $.crewFileLib.createFileUnit($this, file);
                if(unit != null){ $.crewFileLib.uploadFile(unit, file, options); }
            }
        });     
    }, 
    
    
    // 파일명에서 확장자 정보를 반환함.
    getFileExt : function(filename){
        if(filename == null || filename == undefined || filename == 'null' || filename == 'undefined' || filename == ''){ return ""; }
        return (filename.lastIndexOf(".") == -1 ? "" : filename.substring(filename.lastIndexOf(".")+1)).toLowerCase();
    }, 
    
    
    // 해당 배열에 해당값이 있는지 여부를 반환함.
    arrayHasValue : function(arr, val){
        for(var i=0 , v ; v = arr[i] ; i++){
            if(v == val){ return true; }
        }
        return false;
    }, 
    
    
    // 첨부 파일 정보 영역을 생성하고 해당 유닛을 반환함.
    createFileUnit : function(cont, file){
        var options = $(cont).data("options");

        console.debug(options);

        // 파일 확장자 체크
        var ext = $.crewFileLib.getFileExt(file.name);
        if(!$.crewFileLib.arrayHasValue(options.allowFileExt, ext)){
            alert(file.name + " 파일은 등록할 수 없습니다."); // 파일은 등록할 수 없습니다.
            return null;
        }
        
        var alt = (common.isEmpty(file.alt))? "" : file.alt;
        
        // unit create
        var html = [];
        html.push("<tr class='fileUnit'>");
        html.push("<td>"+file.name+"</td>"); //파일이름
        if(file.size){
            html.push("<td class='filesize'>"+file.size+" byte</td>"); //사이즈    
        }else{
            html.push("<td class='filesize'>"+file.size+"</td>"); //사이즈
        }
        
        html.push("<td><span class='status'>0%</span></td>"); //상태

        // tempFile정보가 존재한다면 수정상태임.
        var ext = $.crewFileLib.getFileExt(file.name);
        if(file.tempFile && file.tempFile != ""){
            var src;
            if(options.flag == "real"){
                src = '/common/file/imageView?filename='+file.name+'&tempFile=' + options.basePath + file.tempFile + '&flag=real';
            }else if(options.flag == "image"){
                if(options.orgCheckFileType && options.orgCheckFileType.indexOf(file.fileType) == -1){
                    src = options.basePath2 + file.tempFile;
                }else{
                    src = options.basePath + file.tempFile; 
                }
            }
            
            // 파일이 이미지인지 여부를 판단함.
            var errorUrl = "//" + shop.serverImg + "/resources/image/noimg.jpg";
            if($.crewFileLib.arrayHasValue(options.imageFileExt, ext)){
                html.push("<td><img style='width: 80px; height: 80px;' src='" + src + "' alt='" + alt + "' class='imgView imgPreview' onerror='javascript:common.imgError(this);'/></td>"); //이미지
            } else {
                html.push("<td>-</td>");
            }
        }else{
            // 파일이 이미지인지 여부를 판단함.
            if($.crewFileLib.arrayHasValue(options.imageFileExt, ext)){
                html.push("<td><img style='width: 80px; height: 80px;' class='imgView imgPreview' /></td>"); //이미지
            } else {
                html.push("<td>-</td>");
            }
        }
        // 이미지인 경우 ALT 영역 추가
        
        if (options.flag == "image" && options.alt) {
            html.push('<td><input type="text" class="alt" value="' + alt + '"></td>');
        }
        
        html.push("<td><input  type='text' class='dispNo' value='" + file.dispNo + "' /></td>");
        html.push("<td><button type='button' class='button del btnRemove' style='cursor:pointer;'>삭제</button></td>");
        html.push("</tr>");

        var li = $(html.join("")).appendTo($(cont).find(".fileList"));
        

        // 삭제버튼 이벤트 핸들 처리
        $(cont).find(".btnRemove").click(function(e){
            var li = $(this).parent().parent();
            li.addClass('deleteFile');
            // 숨기기
            li.hide();
            
            // 데이터 처리
            var fileInfo = li.data("fileInfo");
            fileInfo.useYn = "N";
            li.data("fileInfo", fileInfo);
        });

        
        return li.get(0);
    }, 
    
    // 파일 정보 삭제
    deleteFileInfo : function(e) {
        var $div = $(this).parent().parent();
        
        var flag = $div.data("options").flag;
        var fileList = $div.data("fileInfo");
        for (let i = 0; i < fileList.length; i++) {
            fileList[i].useYn = "N"
        }
        
        // 영역 초기화
        $div.find("input.fileName").val("");
        if (flag == "image") {
            $div.find("img.imgPreview").attr('src', "");
            $div.find("img.imgPreview").attr('alt', "");
            $div.find("input.alt").val("");
        } else {
            $div.find("a.url").text("");
            $div.find("a.url").attr('href', "");
        }
    },
    
    // 단일 파일 전송 처리 
    uploadOneFile : function(e) {
        var $div = $(this).parent().parent();
        var options = $div.data("options");
        var fileList = $div.data("fileInfo");
        
        // 확장자가 유효한지 체크
        var ext = $.crewFileLib.getFileExt(this.files[0].name);
        if(!$.crewFileLib.arrayHasValue(options.allowFileExt, ext)){
            alert(this.files[0].name + " 파일은 등록할 수 없습니다.");
            return null;
        }
        // input tag에 파일명 설정
        $div.find(".fileName").val($(this).val().replace(/^.*[\\/]/, ''));
        
        // 등록된 파일의 사용여부를 N으로 변경
        for (let i = 0; i < fileList.length; i++) {
            fileList[i].useYn = "N";
        }
        
        $.crewFileLib.uploadFile($div, this.files[0], options);
    },
    
    // 파일 전송 처리
    uploadFile : function(unit, file, options){
        var percent = 0;
        var formData = new FormData();
        formData.append('file', file);
        
        $.ajax({
            xhr : function() {
                var xhrobj = $.ajaxSettings.xhr();
                if (xhrobj.upload) {
                    xhrobj.upload.addEventListener('progress', function(event) {
                        percent = 0;
                        var position = event.loaded || event.position;
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }

                        $(unit).find(".status").html(percent + "%");
                    }, false);
                }
                return xhrobj;
            },
            url             : options.url,
            type            : "POST",
            contentType     : false,
            processData     : false,
            cache           : false,
            data            : formData,
            dataType        : "json", 
            success         : function(data){
                console.debug(data);
                
                if(!data.infoMap.list){
                    alert(data.message);
                    $(unit).remove();
                    
                    return;
                }
                
                
                // 처리결과 처리
                $(unit).find(".status").html(percent + "%");
                
                // 이미지 세팅 - 첨부 파일이 이미지인 경우에만 처리해야 함. - 수정 필요함.
                var src = '/common/file/imageView?orgFileNm='+data.infoMap.list[0].orgFileNm + '&tempFile=' + data.infoMap.list[0].tempFile + '&flag=temp';
                
                // flag 값에 따라 태그에 맞는 값을 넣어줌
                if (options.flag == "real") {
                    $(unit).find("a.url").attr('href', src);
                    $(unit).find("a.url").text(data.infoMap.list[0].orgFileNm);
                }
                
                if (options.flag == "image") {
                    $(unit).find(".imgView").attr('src', src);
                }
                
                // 처리 결과를 가지고 있음.
                if (options.unit == "single") {
                    $(unit).data("fileInfo").push(data.infoMap.list[0]);
                } else {
                    $(unit).data("fileInfo", data.infoMap.list[0]);
                }
            }
        });
    }, 

    // 일반 파일 전송 처리 -> jquery.form 플러그인 필요함.
    uploadCommon : function(options){
        var defaults = {
            input           : null,             // input object. jquery오브젝트가 아님! 
            success         : null, 
            uploadProgress  : null, 
            url             : "/common/file/upload.json"    
        };
        options = $.extend(true, defaults, options); 
        
        
        var key         = Math.ceil(Math.random() * 1000000);
        var formName    = "tempForm" + key;

        var html = [];
        html.push("<form name='tempForm" + key + "' method='post' enctype='multipart/form-data' style='display:none;'>");
        html.push("</form>");
        $(options.input).after(html.join(""));

        // 폼의 input file 구성
        var form = $("form[name=" + formName + "]");
        form.append(options.input);

        // 전송
        form.ajaxSubmit({
            url         : options.url,
            dataType    : "json", 
            complete: function(xhr) {
                console.debug("complete");              
                // 임시폼 삭제 처리
                form.before(options.input);
                form.remove();
            },
            uploadProgress : function(event, position, total, percentComplete) {
                if(typeof(options.uploadProgress) == "function"){
                    options.uploadProgress(event, position, total, percentComplete);
                    
                }               
            },
            success: function(data, xhr, status) {
                console.debug("uploadCommon success");
                console.debug(data);
                
                if(typeof(options.success) == "function"){
                    options.success(data, xhr, status);
                }
            }
        }); 
    },  
    
    
    // 파일 선택 input change 이벤트 핸들...
    fileSelectChange : function(e){
        var cont    = $(this).parent().parent().get(0);
        var options = $(cont).data("options");
        
        // HTML5를 지원여부에 따라 다르게 처리해야됨.
        if(this.files){
            // 첨부 파일 개수 체크
            var isAdd = true;
            if(options.attCnt != 0){
                if($(cont).fileCnt() + this.files.length > options.attCnt){
                    alert("파일은 최대 " + options.attCnt + "개까지 등록이 가능합니다.");
                    isAdd = false;
                }
            }
            
            // 파일 첨부 처리
            if(isAdd){
                for(var i=0, file ; file = this.files[i] ; i++){
                    file.dispNo = 1;
                    var unit = $.crewFileLib.createFileUnit($(this).parent().parent().get(0), file);
                    if(unit != null){ $.crewFileLib.uploadFile(unit, file, options); }
                }
            }
            
            // input 초기화 - 밑에서 공통으로 초기화 하면 비동기 처리이기 때문에 파일전송이 비정상적으로 작동함. -> 따로따로 초기화 할 것!
            var parent = $(this).parent();
            parent.html("<input type='file' name='selectFile' />");
            parent.find("input[name=selectFile]").on('change', $.crewFileLib.fileSelectChange);         
        }else{
            // html5를 지원하지 않으면 jquery.form을 이용해서 전송한다.
            // 첨부 파일 개수 체크
            var isAdd = true;
            if(options.attCnt != 0){
                if($(cont).fileCnt() + 1 > options.attCnt){
                    alert("파일은 최대 " + options.attCnt + "개까지 등록이 가능합니다.");
                    isAdd = false;
                }
            }
            
            
            // 파일처리
            var parent = $(this).parent();
            
            if(isAdd){
                var file = {
                    name : this.value.substring(this.value.lastIndexOf("\\")+1), 
                    size : 0
                };
                
                var unit    = $.crewFileLib.createFileUnit($(this).parent().parent().get(0), file);

                if(unit != null){
                    $.crewFileLib.uploadCommon({
                        input           : this,             // input object. jquery오브젝트가 아님! 
                        url             : options.url, 
                        success         : function(data, xhr, status){
                            // 파일정보 처리
                            $(unit).find(".filesize").html(data.result[0].filesize+' byte');
                            $(unit).find(".status").html("100%");

                            // 이미지 세팅 - 이거는 고쳐야 함. - 이미지가 아닌 경우도 있음.
                            var src = '/common/file/imageView?filename='+data.infoMap.list[0].filename+'&tempFile=' + data.infoMap.list[0].tempFile + '&flag=temp';
                            $(unit).find(".imgView").attr('src', src);
                            

                            // 처리 결과를 가지고 있음.
                            $(unit).data("fileInfo", data.infoMap.list[0]);
                            
                     
                            // input box의 값 초기화
                            parent.html("<input type='file' name='selectFile' />");
                            parent.find("input[name=selectFile]").on('change', $.crewFileLib.fileSelectChange);
                        },  
                        uploadProgress  : function(event, position, total, percentComplete){
                            //alert(event);
                        }
                    });
                
                }
            }else{
                // input box의 값 초기화
                parent.html("<input type='file' name='selectFile' />");
                parent.find("input[name=selectFile]").on('change', $.crewFileLib.fileSelectChange);
            }
        }
    }, 
    
    // 해당 영역에 파일이 드래그 되었을 경우 해당 input에 정보를 셋팅함.
    addFile : function(options){
        var area        = $(this);
        var defaults    = {
            input       : null,         // input file 오브젝트      -> jquery 오브젝트임.
            multiple    : false         // 복수개 허용여부 
        };
        options = $.extend(true, defaults, options);
        
        // 유효성 체크
        if(options.input == null){
            alert("파일 영역을 지정해 주십시오.");
            return;
        }
        
        // 옵션 저장
        area.data("options", options);
        
        // 영역에 파일이 드롭되는 이벤트 추가 처리 -> 이벤트를 모두 멈춰야 함. 안그러면 브라우저가 파일을 해석해 버림.
        area.on('dragenter', function (e){
            //console.debug("dragenter");
            e.stopPropagation();
            e.preventDefault();
        });

        area.on('dragover', function (e){
            //console.debug("dragover");
            e.stopPropagation();
            e.preventDefault();
        });     
        
        
        area.on('drop', function (e){
            //console.debug("drop");
            e.preventDefault();
            
            var files   = e.originalEvent.dataTransfer.files;

            if(files.length != 1 && !options.multple){
                alert("select one file!");
                return;
            }
            
            // input에 값을 설정함.
            options.input.get(0).files = files;
        });
    },
    
    // SmartEditor2 이미지 업로드
    editorFileUpload : function(options){
        var defaults = {
            url             : "/common/file/upload",
            allowFileExt    : ["jpg", "gif", "jpeg", "png"],        // 등록 가능 파일 정보 구성
            attCnt          : 0,                            // 첨부 가능한 파일의 개수, 0이 아니면 검증 로직을 수행하게 됨.
            fileInfoList    : [],
            targetTextArea : 'textarea',
            lang : null
        };
                
        options = $.extend(true, defaults, options);
        
        var obj = $(this);
        
        // 옵션 정보 저장
        obj.data("options", options);
        
        // 영역 기본 구조 구성
        var html = [];
        
        html.push("<table class='table'>");
        html.push("<thead>");
        html.push("<tr>");
        html.push("<th>파일명</th>");
        html.push("<th>크기</th>");
        html.push("<th>상태</th>");
        html.push("<th>기능</th>");
        html.push("</tr>");
        html.push("</thead>");
        html.push("<tbody class='editorFileList'>");
        html.push("</tbody>");
        html.push("</table>");
        
        html.push("<div>");
        if(options.lang){
            html.push("<input type='file' name='addImage' id='addImage_" + options.lang + "'/>");   
        }else{
            html.push("<input type='file' name='addImage' id='addImage'/>");
        }
        
        html.push("</div>");
        
        obj.html(html.join(""));
        
        // input file 이벤트 처리
        obj.find("input[name=addImage]").on('change', $.crewFileLib.editorFileSelectChange);
    },
    
    // 파일 선택 input change 이벤트 핸들...
    editorFileSelectChange : function(e){
        
        var cont    = $(this).parent().parent().get(0);
        var options = $(cont).data("options");

        // HTML5를 지원여부에 따라 다르게 처리해야됨.
        if (this.files) {
            // 유효성 체크
            var unit = $.crewFileLib.editorCreateFileUnit($(this).parent().parent().get(0), this.files[0]);
            
            // temp 저장 및 에디터 커서 위치에 이미지 삽입
            if(unit != null){ $.crewFileLib.editorUploadFile(unit, this.files[0], options); }
            
            // input 초기화
            var parent = $(this).parent();
            parent.find('input[name=addImage]').val('');
        } else {
            // html5를 지원하지 않으면 jquery.form을 이용해서 전송한다.
            // 파일처리
            var file = {
                name : this.value.substring(this.value.lastIndexOf("\\")+1), 
                size : 0,
                dispNo : 1
            };
            
            var unit = $.crewFileLib.editorCreateFileUnit($(this).parent().parent().get(0), file);
            // if(unit != null){ $.crewFileLib.editorUploadFile(unit, this.files, options); }
            
            if(unit != null){
                $.crewFileLib.uploadCommon({
                    input           : this,             // input object. jquery오브젝트가 아님! 
                    url             : options.url, 
                    success         : function(data, xhr, status){

                        var src = '/common/file/imageView?filename='+data.result[0].filename+'&tempFile=' + data.result[0].tempFile + '&flag=temp';                      
                        
                        // 처리 결과를 가지고 있음.
                        $(unit).data("editorFileInfo", data.result[0]);
                        
                        // input 초기화
                        var parent = $(this).parent();
                        parent.find('input[name=addImage]').val('');
                    },  
                    uploadProgress  : function(event, position, total, percentComplete){
                        //alert(event);
                    }
                });
            
            }
        }
        
    },
    
    // 유효성 체크
    editorCreateFileUnit : function(cont, file){
        console.debug(file)
        var options = $(cont).data("options");
        
        console.debug(options);
        
        // 파일 확장자 체크
        var ext = $.crewFileLib.getFileExt(file.name);
        if(!$.crewFileLib.arrayHasValue(options.allowFileExt, ext)){
            alert(file.name + " 파일은 등록할 수 없습니다.");
            return null;
        }
        
        // unit create
        var html = [];
        
        html.push("<tr class='editorFileUnit'>");
        html.push("<td>"+file.name+"</td>"); //파일이름
        html.push("<td>"+file.size+" byte</td>"); //사이즈
        html.push("<td><span class='status'>0%</span></td>");
        html.push("<td><button type='button' class='button del btnRemove' style='cursor:pointer;'>삭제</button></td>");
        html.push("</tr>");
        
        var li = $(html.join("")).appendTo($(cont).find(".editorFileList"));
        
        // 삭제버튼 이벤트 핸들 처리
        $(cont).find(".btnRemove").click(function(e){
            // var li = $(this).parent();
            var li = $(this).parent().parent();
            
            // 숨기기
            li.hide();
            
            // 데이터 처리
            var editorFileInfo = li.data("editorFileInfo");
            editorFileInfo.useYn = "N";
            li.data("editorFileInfo", editorFileInfo);
        });

        
        return li.get(0);
    },
    
    // temp 저장 및 에디터 커서 위치에 이미지 삽입
    editorUploadFile : function(unit, file, options){
        var percent = 0;
        var formData = new FormData();
        formData.append('file', file);
        
        $.ajax({
            xhr : function() {
                var xhrobj = $.ajaxSettings.xhr();
                if (xhrobj.upload) {
                    xhrobj.upload.addEventListener('progress', function(event) {
                        percent = 0;
                        var position = event.loaded || event.position;
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }
                        
                        $(unit).find(".status").html(percent + "%");
                    }, false);
                }
                return xhrobj;
            },
            url             : options.url,
            type            : "POST",
            contentType     : false,
            processData     : false,
            cache           : false,
            data            : formData,
            dataType        : "json", 
            success         : function(data){
                console.debug(data);
                
                if(!data.infoMap.list){
                    alert(data.message);
                    $(unit).remove();
                    
                    return;
                }
                
                // 처리결과 처리
                $(unit).find(".status").html(percent + "%");
                //확장자 추출
                if (data.infoMap.list[0].orgFileNm != null) {
                    
                    // 에디터 화면세팅
//                      <img src="http://img.naver.net/static/www/u/2013/0731/nmms_224940510.gif" /> //사이즈 X
//                      <img style="width: 100px; height: 150px;" src="http://img.naver.net/static/www/u/2013/0731/nmms_224940510.gif" /> //사이즈 O
                    //let src = '/common/file/imageView?filename=' + data.infoMap.list[0].orgFileNm +'&tempFile=' + data.infoMap.list[0].tempFile;
                    
                    
                    // 처리 결과를 가지고 있음.
                    $(unit).data("editorFileInfo", data.infoMap.list[0]);
                    
                }
            }
            
        });
        
    },
    
    // 에디터 이미지 파일 정보를 반환함.
    editorFileList : function(){
        var rv = [];
        
        // 사용 여부기 Y인 항목만 배열에 push
        $(this).find("tr.editorFileUnit").each(function(idx){
            if ($(this).data("editorFileInfo").useYn == "Y") {
                $(this).data("editorFileInfo").dispNo = 1;
                rv.push($(this).data("editorFileInfo"));
            }
        });
        
        return rv;
    }
};


(function($) {
    $.fn.setFileUploadUI     = $.crewFileLib.setFileUploadUI;
    $.fn.listUnit       = $.crewFileLib.listUnit;
    $.fn.singleUnit     = $.crewFileLib.singleUnit;
    $.fn.fileList       = $.crewFileLib.fileList;
    $.fn.fileCnt        = $.crewFileLib.fileCnt;
    $.fn.addFile        = $.crewFileLib.addFile;
    $.fn.fileListSerializeObject = $.crewFileLib.fileListSerializeObject;
    $.fn.fileSerializeObject = $.crewFileLib.fileSerializeObject;
    
    $.fn.editorFileUpload   = $.crewFileLib.editorFileUpload;
    $.fn.editorFileList     = $.crewFileLib.editorFileList;
})(jQuery);
