<%@ page language="java" pageEncoding="utf-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  

<html>
	<head>
		<title>这是测试页面</title>
		<style type="text/css" src="../resource/css/easyui.css"> </style>
	</head>
<body>  
	<h2>--------------这是测试页面--------------</h2>
	<h3>${title}</h3>
	<c:forEach var="test" items="${testList}" >
		<p>姓名： ${test.name}</p>
		<p>测试值： ${test.status}</p>
	</c:forEach>
	<br>
	<h2>--------------下拉框插件--------------</h2>
		<span>性别：</span><input id="status" class="easyui-combobox" />
	<h2>--------------异步加载--------------</h2>
	    <div id="content">
	    
	    </div>
	
<script type="text/javascript" src="http://cdn.staticfile.org/jquery/1.9.1/jquery.min.js"></script>  
<script type="text/javascript" src="../resource/js/jquery/jquery.min.js"></script>  
<script type="text/javascript" src="../resource/js/jquery/jquery.easyui.min.js"></script>  
<script type="text/javascript">
    var datas = [{"id":"1","text":"男"}, {"id":"1","text":"女"}];
	$(function(){
		$('#status').combobox({
			data: datas,
			valueField : id,
			textField : text,
			panelHeight : 'auto',
			editable:false ,
			required : required,
			filter : function(q, row) {
				return row[$(this).combobox('options').textField].indexOf(q) == 0;
			},
			onSelect : function(r){
				console.log(r);
			}
		});
		
		
	})
</script>
</body>  
</html>