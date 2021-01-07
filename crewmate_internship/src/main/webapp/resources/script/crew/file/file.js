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
			rv.push($(this).data("fileInfo"));
		});
		
		return rv;
	},
	
	// 첨부된 파일의 개수를 반환함.
	fileCnt : function(){
		var rv = 0;
		var fileList	= $(this).fileList();
		
		for(var i=0, f ; f = fileList[i] ; i++){
			if(f.useYn == "Y"){ rv++; }
		}
		
		return rv;
	}, 
		
		
	// 파일 업로드 인터페이스 처리
	fileUpload : function(options){
		var defaults = {
			url				: "/common/file/upload.json",
			allowFileExt	: ["jpg", "gif", "jpeg", "png"],		// 등록 가능 파일 정보 구성
			imageFileExt	: ["jpg", "gif", "jpeg", "png"],		// 이미지 파일 확장자 정보 구성
			attCnt			: 0,							// 첨부 가능한 파일의 개수, 0이 아니면 검증 로직을 수행하게 됨.
			fileInfoList	: [], 
			orgCheckFileType : "",						// 원본에 대한 파일타입
			basePath		: ""	,					// 수정모드에서 기존의 이미지를 출력하기 위한 기본 경로(원본)
			basePath2   	: "",						// 임시저장모드에서 임시저장으로 등록된 기존의 이미지를 출력하기 위한 기본 경로(임시)
			flag 			: "real"					// 이미지 경로 호출 플래그 real : 이미지경로서버, image : 로컬경로  
		};
		
		options = $.extend(true, defaults, options);
		
		
		var obj = $(this);
		
		// 옵션 정보 저장
		obj.data("options", options);
		
		// 영역 기본 구조 구성
		var html = [];

		html.push("<table class='table'>");
		html.push("<colgroup>");
		html.push("<col style='width: 40%;'>");
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
		html.push("<th>기능</th>");
		html.push("</tr>");
		html.push("</thead>");
		html.push("<tbody class='fileList'>");
		html.push("</tbody>");
		html.push("</table>");
		
		
		html.push("<div class='upld_button'>");
		html.push("	<input type='file' name='selectFile' />");
		html.push("</div>");
		
		obj.html(html.join(""));
		
		
		// 초기로딩시의 첨부파일 정보 구성
		for(var i=0, file; file = options.fileInfoList[i] ; i++){
			var f		= { name : file.filename, size : file.filesize, tempFile : file.tempFile, fileType : file.fileType };
			var unit	= $.crewFileLib.createFileUnit(this, f);
			
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
			$(this).css('border', '2px solid #0B85A1');
		});

		obj.on('dragover', function (e){
			e.stopPropagation();
			e.preventDefault();
		});

		obj.on('drop', function (e){
			var files	= e.originalEvent.dataTransfer.files;
			var options	= $(this).data("options");

			// HTML5 미지원이면 종료
			if(!files){ return; }
			
			$(this).css('border', '2px dotted #0B85A1');
			e.preventDefault();
			
			// 첨부 파일 개수 체크
			if(options.attCnt != 0){
				if($(this).fileCnt() + files.length > options.attCnt){
					alert("파일은 최대 " + options.attCnt + "개까지 등록이 가능합니다.");
					return;
				}
			}

			// 파일첨부 처리
			for(var i=0, file ; file = files[i] ; i++){
				var unit = $.crewFileLib.createFileUnit(this, file);
				if(unit != null){ $.crewFileLib.uploadFile(unit, file, options); }
			}
		});		
	}, 
	
	
	// 파일명에서 확장자 정보를 반환함.
	getFileExt : function(filename){
		if(filename == ""){ return ""; }
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
		var options	= $(cont).data("options");

		
		console.debug(options);
		
		// 파일 확장자 체크
		var ext	= $.crewFileLib.getFileExt(file.name);
		if(!$.crewFileLib.arrayHasValue(options.allowFileExt, ext)){
			alert(file.name + " 파일은 등록할 수 없습니다."); // 파일은 등록할 수 없습니다.
			return null;
		}
		
		// unit create
		var html = [];
		html.push("<tr class='fileUnit'>");
		html.push("<td>"+file.name+"</td>"); //파일이름
		if(file.size){
			html.push("<td class='filesize'>"+file.size+" byte</td>"); //사이즈	
		}else{
			html.push("<td class='filesize'>-</td>"); //사이즈 0 일 때
		}
		
		html.push("<td><span class='status'>0%</span></td>"); //상태

		// tempFile정보가 존재한다면 수정상태임.
		var ext	= $.crewFileLib.getFileExt(file.name);
		if(file.tempFile && file.tempFile != ""){
			var src;
			if(options.flag == "real"){
				src = '/common/file/imageView.do?filename='+file.name+'&tempFile=' + options.basePath + file.tempFile + '&flag=real';
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
				html.push("<td><img style='width: 80px; height: 80px;' src='" + src + "' class='imgView imgPreview' onerror='javascript:imgError(this,\"" + errorUrl + "\");'/></td>"); //이미지
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
	
	
	// 파일 전송 처리
	uploadFile : function(unit, file, options){
		var percent = 0;
		var formData = new FormData();
		formData.append('file', file);
		
		$.ajax({
			xhr	: function() {
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
			url				: options.url,
			type			: "POST",
			contentType		: false,
			processData		: false,
			cache			: false,
			data			: formData,
			dataType		: "json", 
			success			: function(data){
				console.debug(data);
				
				// 2016.06.09 - 정재요 - 파일 업로드 중 에러 발생시 처리 추가.
				if(!data.result){
					alert(data.message);
					$(unit).remove();
					
					return;
				}
				
				
				// 처리결과 처리
				$(unit).find(".status").html(percent + "%");
				
				// 이미지 세팅 - 첨부 파일이 이미지인 경우에만 처리해야 함. - 수정 필요함.
				var src = '/common/file/imageView.do?filename='+data.result[0].filename+'&tempFile=' + data.result[0].tempFile + '&flag=temp';
				$(unit).find(".imgView").attr('src', src);
				
				// 처리 결과를 가지고 있음.
				$(unit).data("fileInfo", data.result[0]);
			}
		});
	}, 

	// 일반 파일 전송 처리 -> jquery.form 플러그인 필요함.
	uploadCommon : function(options){
		var defaults = {
			input			: null,				// input object. jquery오브젝트가 아님! 
			success			: null, 
			uploadProgress	: null, 
			url				: "/common/file/upload.json"	
		};
		options = $.extend(true, defaults, options); 
		
		
		var key			= Math.ceil(Math.random() * 1000000);
		var formName	= "tempForm" + key;

		var html = [];
		html.push("<form name='tempForm" + key + "' method='post' enctype='multipart/form-data' style='display:none;'>");
		html.push("</form>");
		$(options.input).after(html.join(""));

		// 폼의 input file 구성
		var form = $("form[name=" + formName + "]");
		form.append(options.input);

		// 전송
		form.ajaxSubmit({
			url			: options.url,
			dataType	: "json", 
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
		var cont	= $(this).parent().parent().get(0);
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
				
				var unit	= $.crewFileLib.createFileUnit($(this).parent().parent().get(0), file);

				if(unit != null){
					$.crewFileLib.uploadCommon({
						input			: this,				// input object. jquery오브젝트가 아님! 
						url				: options.url, 
						success			: function(data, xhr, status){
							// 파일정보 처리
							$(unit).find(".filesize").html(data.result[0].filesize+' byte');
							$(unit).find(".status").html("100%");

							// 이미지 세팅 - 이거는 고쳐야 함. - 이미지가 아닌 경우도 있음.
							var src = '/common/file/imageView.do?filename='+data.result[0].filename+'&tempFile=' + data.result[0].tempFile + '&flag=temp';
							$(unit).find(".imgView").attr('src', src);
							

							// 처리 결과를 가지고 있음.
							$(unit).data("fileInfo", data.result[0]);
							
							// input box의 값 초기화
							parent.html("<input type='file' name='selectFile' />");
							parent.find("input[name=selectFile]").on('change', $.crewFileLib.fileSelectChange);						
						},  
						uploadProgress	: function(event, position, total, percentComplete){
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
		var area		= $(this);
		var defaults	= {
			input		: null,			// input file 오브젝트		-> jquery 오브젝트임.
			multiple	: false			// 복수개 허용여부 
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
			
			var files	= e.originalEvent.dataTransfer.files;

			if(files.length != 1 && !options.multple){
				alert("select one file!");
				return;
			}
			
			// input에 값을 설정함.
			options.input.get(0).files = files;
		});
	},
	
	// sceditor 이미지 찾기
	editorFileUpload : function(options){
		var defaults = {
			url				: "/common/file/upload.json",
			allowFileExt	: ["jpg", "gif", "jpeg", "png"],		// 등록 가능 파일 정보 구성
			attCnt			: 0,							// 첨부 가능한 파일의 개수, 0이 아니면 검증 로직을 수행하게 됨.
			fileInfoList	: [],
			targetTextArea : 'textarea',
			lang : null
		};
				
		options = $.extend(true, defaults, options);
		
		var obj = $(this);
		
		// 옵션 정보 저장
		obj.data("options", options);
		
		// 영역 기본 구조 구성
		var html = [];
		
		html.push("<table class='table' style='display: none;'>");
		html.push("<thead>");
		html.push("<tr>");
		html.push("<th>파일명</th>");
		html.push("<th>크기</th>");
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
		
		var cont	= $(this).parent().parent().get(0);
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
				size : 0
			};
			
			var unit = $.crewFileLib.editorCreateFileUnit($(this).parent().parent().get(0), file);
			// if(unit != null){ $.crewFileLib.editorUploadFile(unit, this.files, options); }
			
			if(unit != null){
				$.crewFileLib.uploadCommon({
					input			: this,				// input object. jquery오브젝트가 아님! 
					url				: options.url, 
					success			: function(data, xhr, status){

						var src = '/common/file/imageView.do?filename='+data.result[0].filename+'&tempFile=' + data.result[0].tempFile + '&flag=temp';						
						$(options.targetTextArea).sceditor('instance').insert("<img src='" + src + "' />");
						
						// 처리 결과를 가지고 있음.
						$(unit).data("editorFileInfo", data.result[0]);
						
						// input 초기화
						var parent = $(this).parent();
						parent.find('input[name=addImage]').val('');
					},  
					uploadProgress	: function(event, position, total, percentComplete){
						//alert(event);
					}
				});
			
			}
		}
		
	},
	
	// 유효성 체크
	editorCreateFileUnit : function(cont, file){
		var options	= $(cont).data("options");
		
		console.debug(options);
		
		// 파일 확장자 체크
		var ext	= $.crewFileLib.getFileExt(file.name);
		if(!$.crewFileLib.arrayHasValue(options.allowFileExt, ext)){
			alert(file.name + " 파일은 등록할 수 없습니다.");
			return null;
		}
		
		// unit create
		var html = [];
		
		html.push("<tr class='editorFileUnit'>");
		html.push("<td>"+file.name+"</td>"); //파일이름
		html.push("<td>"+file.size+"</td>"); //사이즈
		html.push("</tr>");
		
		var li = $(html.join("")).appendTo($(cont).find(".editorFileList"));
		
		// 삭제버튼 이벤트 핸들 처리
		$(cont).find(".btnRemove").click(function(e){
			// var li = $(this).parent();
			var li = $(this).parent().parent();
			
			// 숨기기
			li.hide();
			
			// 데이터 처리
			var fileInfo = li.data("fileInfo");
			fileInfo.useYn = "N";
			li.data("fileInfo", fileInfo);
		});

		
		return li.get(0);
	},
	
	// temp 저장 및 에디터 커서 위치에 이미지 삽입
	editorUploadFile : function(unit, file, options){
		var percent = 0;
		var formData = new FormData();
		formData.append('file', file);
		
		$.ajax({
			xhr	: function() {
				var xhrobj = $.ajaxSettings.xhr();
				if (xhrobj.upload) {
					xhrobj.upload.addEventListener('progress', function(event) {
						percent = 0;
						var position = event.loaded || event.position;
						var total = event.total;
						if (event.lengthComputable) {
							percent = Math.ceil(position / total * 100);
						}
					}, false);
				}
				return xhrobj;
			},
			url				: options.url,
			type			: "POST",
			contentType		: false,
			processData		: false,
			cache			: false,
			data			: formData,
			dataType		: "json", 
			success			: function(data){
				
				console.debug(data);
				if (percent == 100) {
					//확장자 추출
					if (data.result[0].filename != null) {
						
						// 에디터 화면세팅
//						<img src="http://img.naver.net/static/www/u/2013/0731/nmms_224940510.gif" /> //사이즈 X
//						<img style="width: 100px; height: 150px;" src="http://img.naver.net/static/www/u/2013/0731/nmms_224940510.gif" /> //사이즈 O
						src = '/common/file/imageView.do?filename='+data.result[0].filename+'&tempFile='+data.result[0].tempFile;
						
						$(options.targetTextArea).sceditor('instance').insert("<img src='" + src + "' />");
						
						// 처리 결과를 가지고 있음.
						$(unit).data("editorFileInfo", data.result[0]);
						
					}
					
				}
				
			}
			
		});
		
	},
	
	// 에디터 이미지 파일 정보를 반환함.
	editorFileList : function(){
		var rv = [];
		
		$(this).find("tr.editorFileUnit").each(function(idx){
			rv.push($(this).data("editorFileInfo"));
		});
		
		return rv;
	}
};


(function($) {
	$.fn.fileUpload		= $.crewFileLib.fileUpload;
	$.fn.fileList		= $.crewFileLib.fileList;
	$.fn.fileCnt		= $.crewFileLib.fileCnt;
	$.fn.addFile		= $.crewFileLib.addFile;
	
	$.fn.editorFileUpload	= $.crewFileLib.editorFileUpload;
	$.fn.editorFileList		= $.crewFileLib.editorFileList;
})(jQuery);






