/******************************************************************************
	작성자 : 김기석
	작성일 : 2015.07.21
	기능 : 파일 첨부 인터페이스 제공
	참고사항 :
		HTML5 기반의 기능 구현임.
******************************************************************************/
$.crewFileGroupLib = {
	// 첨부된 파일 정보를 반환함.
	fileGroupList : function(groupId){
		var rv			= [];
		var groupId		= groupId || "ALL";
		var selector	= "tr.fileUnit" + (groupId == "ALL" ? "" : "." + groupId);
		
		$(this).find(selector).each(function(idx){
			rv.push($(this).data("fileInfo"));
		});
		
		return rv;
	},
		
		
		
	// 파일 업로드 인터페이스 처리
	fileGroupUpload : function(options){
		var defaults = {
			group				: { DE : "DE", OV : "OV" },			// 파일 그룹 정보
			url					: "/common/file/upload.json",
			allowFileExt		: ["jpg", "gif", "jpeg", "png"],	// 등록 가능 파일 정보 구성
			imageFileExt		: ["jpg", "gif", "jpeg", "png"],	// 이미지 파일 확장자 정보 구성
			attCnt				: 0,								// 첨부 가능한 파일의 개수, 0이 아니면 검증 로직을 수행하게 됨.
			fileInfoList		: { DE : [], OV : []},				// 기존에 첨부된 파일들의 정보 
			orgCheckFileType	: "",								// 원본에 대한 파일타입
			basePath			: "",								// 수정모드에서 기존의 이미지를 출력하기 위한 기본 경로(원본)
			basePath2   		: "",								// 임시저장모드에서 임시저장으로 등록된 기존의 이미지를 출력하기 위한 기본 경로(임시)
			flag 				: "real",							// 이미지 경로 호출 플래그 real : 이미지경로서버, image : 로컬경로
			serverImg			: ""								// 이미지 서버 경로 -> 외부 이미지인 경우에 사용함.
		};
		
		options = $.extend(defaults, options);

		var area	= $(this);
		var key		= crew.guid();

		

		// 영역 기본 구조 구성
		var html = [];

		html.push("<table class='table-list'>");
		html.push("	<colgroup>");
		html.push("		<col style='width: 43px;'>");
		html.push("		<col style='width: 20%;'>");
		html.push("		<col style='width: 100px;'>");
		html.push("		<col style='width: 60px;'>");
		html.push("		<col style='width: 60px;'>");
		html.push("		<col style='width: 180px;'>");
		html.push("	</colgroup>");
		html.push("	<thead>");
		html.push("		<tr>");
		html.push("			<th>구분</th>");
		html.push("			<th>파일명</th>");
		html.push("			<th>크기</th>");
		html.push("			<th>상태</th>");
		html.push("			<th>이미지</th>");
		html.push("			<th>비고</th>");
		html.push("		</tr>");
		html.push("	</thead>");
		html.push("	<tbody class='fileList'>");
		html.push("	</tbody>");
		html.push("</table>");
		
		if(options.attCnt != 1){
			html.push("<div class='funcArea' style='text-align:right;'>");
			html.push("	<button onclick=\"$.crewFileGroupLib.addFileAttArea(this, '" + key + "')\" class='btn btn-table-inner'>파일추가</button>");
			html.push("</div>");			
		}
		
		area.html(html.join(""));
		
		// 옵션 정보 구성
		options.key			= key;
		area.addClass(key);
		area.data("options", options);
		
		// 파일 첨부 영역 생성 수정 (2016-05-18 김세형)
		$.crewFileGroupLib.createFileAttArea(key, options.fileInfoList);
	}, 
	
	
	// 파일 첨부 영역을 생성함.
	addFileAttArea : function(obj, key){
		var area		= $("." + key);
		var options		= area.data("options");

		if(options.attCnt > options.attCntCurr){
			if(options.attCnt == (options.attCntCurr + 1)){
				area.find(".funcArea").hide();
			}			
			
			
			// 빈 파일 정보 구성
			var f = { filename : "", filesize : "", tempFile : "", fileType : "" };
			var fileInfoList = {};
			for(var k in options.group){	fileInfoList[k] = [f];	}
			
			$.crewFileGroupLib.createFileAttArea(key, fileInfoList);
		}else{
			return;
		}
	},
	
	// 파일 첨부 영역 하나 생성 (2016-05-18 김세형)
	createFileOne : function(key, group, obj){
		var area		= $("." + key);
		var options		= area.data("options");
		var fileList	= area.find(".fileList");
		var html		= [];
		var trKey		= crew.guid();
		var file		= obj || { filename : "", filesize : "", tempFile : "", fileType : "" };
		
		html.push("<tr class='" + trKey + " fileUnit " + group + "'>");
		html.push("	<td style='text-align:center;' class='group'>" + options.group[group] + "</td>"); 					// 구분
		html.push("	<td style='text-align:center;' class='filename clearArea'>" + file.filename + "</td>");				// 파일명
		if(file.filesize){
			html.push("	<td style='text-align:center;' class='filesize clearArea'>" + file.filesize + " byte</td>"); 	// 크기	
		}else{
			html.push("	<td style='text-align:center;' class='filesize clearArea'>" + file.filesize + "</td>"); 		// 크기
		}
		html.push("	<td style='text-align:center; width: '60px;'' class='status clearArea'>" + (file.filesize && file.filesize != 0 ? "100%" : "0%") + "</td>");		// 상태
		html.push("	<td style='text-align:center;' class='image clearArea'>");																	// 이미지
		
		var ext	= $.crewFileLib.getFileExt(file.filename ? file.filename : "");
		if(file.tempFile && file.tempFile != ""){
			var src;
			if(options.flag == "real"){
				src = '/common/file/imageView.do?filename='+file.filename+'&tempFile=' + options.basePath + file.tempFile + '&flag=real';
			}else if(options.flag == "image"){
				if(options.orgCheckFileType && options.orgCheckFileType.indexOf(file.fileType) == -1){
					src = options.basePath2 + file.tempFile;
				}else{
					src = options.basePath + file.tempFile;	
				}
			}
			
			// 파일이 이미지인지 여부를 판단함.
			if($.crewFileLib.arrayHasValue(options.imageFileExt, ext)){
				html.push("<img src='" + options.serverImg + src + "' onerror='javascript:imgError(this,\"" + options.serverImg + "/resources/image/noimg.jpg\");' width='50' height='50' class='imgPreview'/>"); //이미지
			}
		}
		html.push("	</td>");								
		html.push("	<td style='text-align:center;' class='func'>");										// 비고
		html.push("		<span class='btn add'><input type='file' name='selectFile' onchange=\"$.crewFileGroupLib.fileSelectChange(this, '" + key + "', '" + trKey + "')\" /></span>");
		html.push("		<button style='cursor:pointer; display:none;' class='btn btn-table-inner remove' onclick=\"$.crewFileGroupLib.fileSelectRemove(this, '" + key + "', '" + trKey + "')\">삭제</button>");
		html.push("	</td>");
		html.push("</tr>");
		
		fileList.append(html.join(""));
		
		// 파일정보가 존재한다면 파일정보 저장 처리 및 버튼 컨트롤
		var tr = fileList.find("tr:last");
		if(file.filename){
			tr.data("fileInfo", file);
			tr.find(".func > .btn").hide();
			tr.find(".func > .remove").show();
		}else{
			tr.data("fileInfo", null);
			tr.find(".func > .btn").hide();
			tr.find(".func > .add").show();				
		}		
		
		
		// 이미지 처리
		if(tr.find(".image>img").length == 0){
			$.crewFileGroupLib.targetAreaResize(key);
		}else{
			tr.find(".image>img").error(function(){ $.crewFileGroupLib.targetAreaResize(key);});
			tr.find(".image>img").load(function(){ $.crewFileGroupLib.targetAreaResize(key);});	
		}
	},
	
	// 파일 첨부 영역을 생성함.
	createFileAttArea : function(key, fileInfoList){
		var area		= $("." + key);
		var options		= area.data("options");
		var attCntCurr	= options.attCntCurr || 0;
		
		// 기존에 첨부된 파일정보가 존재하는 경우의 처리 - 첫번째 key를 기준으로 루프의 횟수를 판단해서 처리함. 추가로 최대 추가 개수까지만 루프를 처리함.
		/*var firstKey = "";
		for(var k in options.group) { firstKey = k; break; }*/
		
		// 수정 -> 첫번째 key가 length가 0일 경우 나머지 키의 데이터를 처리하지 못함 (최대값으로 수정)
		var maxLen = 0;
		var maxKey = "";
		for(var k in options.group) {
			var len = fileInfoList[k].length;
			if(len > maxLen) {
				maxLen = len;
				maxKey = k;
			}
		}
		
		for(var i=0 ; i < maxLen && i < options.attCnt ; i++){
			// 그룹단위로 파일첨부 인터페이스를 구성함.
			for(var k in options.group) {
				$.crewFileGroupLib.createFileOne(key, k, fileInfoList[k][i]);
			}
			
			attCntCurr++;
		}
		
		
		// 위에서 영역을 생성하지 않은경우 1개를 기본값으로 등록함. - 신규 등록인 경우
		if(attCntCurr == 0){
			for(var k in options.group) {
				$.crewFileGroupLib.createFileOne(key, k);
			}
			attCntCurr++;
		}
		
		
		// 파일추가 버튼 컨트롤
		if(options.attCnt == attCntCurr){
			$(".funcArea").hide();
		}else{
			$(".funcArea").show();
		}
		

		// 옵션 정보 저장 - 최대 개수
		options.attCntCurr = attCntCurr;
		area.data("options", options);
	}, 

	// 파일 선택 input change 이벤트 핸들...
	fileSelectChange : function(obj, key, trKey){
		var area	= $("." + key);
		var options = area.data("options");
		var tr		= $("." + trKey);

		// 파일 확장자 체크
		var ext	= $.crewFileLib.getFileExt(obj.value);
		if(!$.crewFileLib.arrayHasValue(options.allowFileExt, ext)){
			alert(obj.value + " 파일은 등록할 수 없습니다.");
			//alert(lang.fn.messagePartChange(lang.common.alertNotFileReg, obj.value));
			obj.value = '';
			return null;
		}
		
		// jquery.form을 이용해서 전송한다.

		// 파일정보 구성
		tr.find(".filename").html(obj.value.substring(obj.value.lastIndexOf("\\")+1));
		tr.find(".size").html(0);


		// 업로드 처리
		$.crewFileLib.uploadCommon({
			input			: obj,				// input object. jquery오브젝트가 아님! 
			url				: options.url, 
			success			: function(data, xhr, status){
				// 파일정보 처리
				tr.find(".filesize").html(data.result[0].filesize+' byte');
				tr.find(".status").html("100%");

				// 파일이 이미지인 경우 세팅
				var ext	= $.crewFileLib.getFileExt(obj.value);
				if($.crewFileLib.arrayHasValue(options.imageFileExt, ext)){
					var src = '/common/file/imageView.do?filename='+data.result[0].filename+'&tempFile=' + data.result[0].tempFile + '&flag=temp';
					tr.find(".image").html("<img src='" + src + "' onerror='javascript:imgError(this,\"" + options.serverImg + "/resources/image/noimg.jpg\");' width='50' height='50' class='imgPreview' />");
				}
				
				// 처리 결과를 가지고 있음.
				tr.data("fileInfo", data.result[0]);
				
				// 버튼 컨트롤
				tr.find(".func").find(".btn").hide();
				tr.find(".func").find(".remove").show();
				
				// 파일 선택 인터페이스 초기화
				tr.find(".func").find(".add").html("<input type='file' name='selectFile' onchange=\"$.crewFileGroupLib.fileSelectChange(this, '" + key + "', '" + trKey + "')\" />");
				
				tr.find(".image>img").error(function(){ $.crewFileGroupLib.targetAreaResize(key);});
				tr.find(".image>img").load(function(){ $.crewFileGroupLib.targetAreaResize(key);});
				
				
			},  
			uploadProgress	: function(event, position, total, percentComplete){
				//alert(event);
				console.debug(position + ", " + total + ", " + percentComplete);
				tr.find(".status").html(percentComplete + "%");
			}
		});
	}, 
	
	// 파일 삭제 처리
	fileSelectRemove : function(obj, key, trKey){
		var area		= $("." + key);
		var fileList	= area.find(".fileList");
		var options 	= area.data("options");
		var tr			= $("." + trKey);

		// UI 처리
		tr.find(".clearArea").html("");
		tr.find(".status").html("0%");
		
		// 버튼 컨트롤
		tr.find(".func").find(".btn").hide();
		tr.find(".func").find(".add").show();

		// 데이터 처리
		var fileInfo = tr.data("fileInfo");
		fileInfo.useYn = "N";
		
		// 삭제한 항목을 복제해서 별도로 가지고 있음. -> 서버전송용
		var trCopy = tr.clone();
		trCopy.removeClass(trKey).addClass(crew.guid()).hide();
		trCopy.data("fileInfo", fileInfo);
		fileList.append(trCopy);
		
		// 원본 데이터 삭제 처리
		tr.data("fileInfo", null);
		
		$.crewFileGroupLib.targetAreaResize(key);
	},
	
	
	//영역이 추가 및 변경 되는 높이만큼 target영역 재높이 설정
	targetAreaResize : function(key){
		$('.'+key).css('height',$('.'+key).find('table').height()+($('.'+key).find('.funcArea').length > 0 ? $('.'+key).find('.funcArea').height() : 0));			
	}
};


(function($) {
	$.fn.fileGroupUpload	= $.crewFileGroupLib.fileGroupUpload;
	$.fn.fileGroupList		= $.crewFileGroupLib.fileGroupList;
	
	/*
	$.fn.fileList		= $.crewFileLib.fileList;
	$.fn.fileCnt		= $.crewFileLib.fileCnt;
	$.fn.addFile		= $.crewFileLib.addFile;
	
	$.fn.editorFileUpload	= $.crewFileLib.editorFileUpload;
	$.fn.editorFileList		= $.crewFileLib.editorFileList;
	*/
})(jQuery);
