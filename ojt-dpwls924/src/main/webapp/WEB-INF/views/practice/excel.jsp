<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="/crewmate/core" prefix="core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form action="/excel/read" method="POST" enctype="multipart/form-data">
		<input type="file" name="file" />
		<input type="submit" value="제출"/>
		<button type="button" onclick="sleep();"></button>
	</form>
	<div id="wrap">
	<table>
		<caption></caption>
		<colgroup><col /><col /><col /><col /></colgroup>
		<thead>
		<tr>
		<th></th>
		<th colspan="3">옆으로 세칸</th>
		</tr>
		</thead>
		<tbody>
		<tr>
		<td rowspan="3">아래로 세칸</td>
		<td>내용</td>
		<td>내용</td>
		<td>내용</td>
		</tr>
		</tbody>
	</table>
	</div>
<script type="text/javascript">
	/*function msgBox(){
		var answer;
		answer = confirm("");
		
		if(answer == true){
			alert("환영");
		}
	}
	msgBox();*/

	function sleep(ms){
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	const getDog = async () => {
		await sleep(1000);
		return '멍멍이';
	};
	const getRabbit = async () => {
		await sleep(500);
		return '토끼';
	};
	const getTurtle = async () => {
		await sleep(3000);
		return '거북이';
	};
	async function process(){
		const dog = await getDog();
		console.log(dog);
		const rabbit = await getRabbit();
		console.log(rabbit);
		const turtle = await getTurtle();
		console.log(turtle);
	}
	process();
</script>
</body>
</html>