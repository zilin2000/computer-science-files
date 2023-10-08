<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"	import="java.util.Date"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	hello index1 你好
	
	<%!
		public String name;
		public Date date = new Date();
		public void init(){
			name = "Bruce";

		}
	%>
	<%
		init();
		out.println("hello JSP");
		out.println(name + date);
	%>
</body>
</html>