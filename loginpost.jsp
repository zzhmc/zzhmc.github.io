
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.*" %>
<%@ page import="P1.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
 
 
<%
 
 
 
	String username=request.getParameter("username");
 
	String password=request.getParameter("userpwd");
	try {
 
		// 加载数据库驱动，注册到驱动管理器
 
		Class.forName("com.mysql.cj.jdbc.Driver");
 
		// 数据库连接字符串
 
		String url = "jdbc:mysql://localhost:3306/abc?useUnicode=true&characterEncoding=utf8&rewriteBatchedStatements=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true";
 
		// 数据库用户名
 
		String usename = "1";
 
		// 数据库密码
 
		String psw = "1";
 
		// 创建Connection连接
 
		Connection conn = DriverManager.getConnection(url,usename,psw);
 
		// 判断 数据库连接是否为空
 
		if(conn != null){			
 
			String sql="select * from login where account='"+username+"' and password='"+ password + "'";
 
			Statement stmt = conn.createStatement();
 
			ResultSet rs=stmt.executeQuery(sql);
 
			if(rs.next()){
				
				response.sendRedirect("main.jsp");				
 
			}else{
				session.setAttribute("error", "账号或密码错误,请重新输入");
				response.sendRedirect("login.jsp");
			}			
 
			// 输出连接信息
 
			//out.println("数据库连接成功！");
 
			// 关闭数据库连接
 
			conn.close();
 
		}else{
 
			// 输出连接信息
 
			out.println("数据库连接失败！");						
 
		}
 
	} catch (ClassNotFoundException e) {
 
		e.printStackTrace();
 
	} catch (SQLException e) {
 
		e.printStackTrace();
 
	}
 
%>
 
</body>
 
</html>
