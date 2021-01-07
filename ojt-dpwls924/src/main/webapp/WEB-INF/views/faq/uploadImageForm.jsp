<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="/crewmate/core" prefix="core" %>
<div class="container">
	<article class="contents">
		<section class="contents-inner">
			<h4 class="mb10">이미지 업로드</h4>
			<div id="container_pop">
				<div class="form-group table align-center">
					<form action="" id="uploadImageForm" name="uploadImageForm" method="post" enctype="multipart/form-data">
						<input type="hidden" name="uploadPath" value/>
						<input type="hidden" name="paramId" value/>
						<table>
							<colgroup>
								<col width="15%">
								<col width="*">
							</colgroup>
								<tbody>
									<tr>
										<th><b>파일</b></th>
										<td>
											<input type="file" name="uploadImage" style="width:90%;"/>
										</td>
									</tr>
								</tbody>
						</table>
					</form>
					<div id="fileUpload" class="mb10 dragAndDropDiv" style="border:1px solid black; width:764px; height:300px; padding:3px">Drag & Drop Files Here</div>
					<div class="grid-box mt10">
						<p class="fl-r">
							<a href="javascipt://" class="btn btn-sm btn-blue btnImageUpload">업로드</a>
						</p>
					</div>
				</div>
			</div>
		</section>
	</article>
</div>
<script>


$(function(){
	var obj = $("#fileUpload");
	obj.on('dragenter', function(e){
		e.stopPropagation();
		e.preventDefault();
		$(this).css('border', '2px solid #5272A0');
	});
	obj.on('dragleave', function(e){
		e.stopPropagation();
		e.preventDefalut();
		$(this).css('border', '2px dotted #8296C2');
	});
	obj.on('drop', function(e){
		e.preventDefault();
		$(this).css('border', '2px dotted #8296C2');
		var files = e.orignalEvent.dataTransfer.files;
		if(files.length <1){
			return;
			upload();
		}
	});
	
});
</script>