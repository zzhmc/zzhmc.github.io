
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 
<title>Wopop</title>
<link href="./Wopop_files/style_log.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="./Wopop_files/style.css">
<link rel="stylesheet" type="text/css" href="./Wopop_files/userpanel.css">
<link rel="stylesheet" type="text/css" href="./Wopop_files/jquery.ui.all.css">
 
<style type="text/css">
<!--
.STYLE1 {
	font-size: 24px;
	color: #000000;
	font-weight: bold;
}
 
.p_left{display:inline;}
.p_right{display:inline;} 
-->
</style>
</head>
 
<body class="login" mycollectionplug="bind">
<div class="login_m">
<div class="login_logo STYLE1">系统登录</div>
<div class="login_boder">
 
<div class="login_padding" id="login_model">
<form action="loginpost.jsp" method="post">
<% 
	Object error=session.getAttribute("error");
   if(error!=null)
   {
%>
	<span style="color:red"><%=error %></span>
	<%} %>
 
  <h2>账号</h2>
  <label>
    <input type="text" id="username" name="username" class="txt_input txt_input2" onfocus="if (value ==&#39;Your name&#39;){value =&#39;&#39;}" onblur="if (value ==&#39;&#39;){value=&#39;Your name&#39;}" value="Your name">
  </label>
  <h2>密码</h2>
  <label>
    <input type="password" name="userpwd" id="userpwd" class="txt_input" onfocus="if (value ==&#39;******&#39;){value =&#39;&#39;}" onblur="if (value ==&#39;&#39;){value=&#39;******&#39;}" value="******">
  </label>
   <p class="forgot p_left"><a id="iforget" href="register.jsp">注册账号/</a></p>
  <p class="forgot p_right"><a id="iforget1" href="javascript:void(0);">忘记密码？</a></p>
  <div class="rem_sub">
  <div class="rem_sub_l">
  <input type="checkbox" name="checkbox" id="save_me">
   <label for="checkbox">记住密码</label>
   </div>
    <label>
      <input type="submit" class="sub_button" name="button" id="button" value="登录" style="opacity: 0.7;">	  
    </label>	
  </div>
</div>
</form>
<div id="forget_model" class="login_padding" style="display:none">
<br>
   <h1>Forgot password</h1>
   <br>
   <div class="forget_model_h2">(Please enter your registered email below and the system will automatically reset users’ password and send it to user’s registered email address.)</div>
    <label>
    <input type="text" id="usrmail" class="txt_input txt_input2">
   </label>
  <div class="rem_sub">
  <div class="rem_sub_l">
   </div>
    <label>
     <input type="submit" class="sub_buttons" name="button" id="Retrievenow" value="Retrieve now" style="opacity: 0.7;">    
    </label>
  </div>
</div>
<!--login_padding  Sign up end-->
</div><!--login_boder end-->
</div><!--login_m end-->
</body></html>
