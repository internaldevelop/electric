<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" import="com.iie.electric.entity.User" %>

<div class="page-header navbar navbar-fixed-top">
	<!-- BEGIN HEADER INNER -->
	<div class="page-header-inner">
		<!-- BEGIN LOGO -->

		<p class="system-title">终端系统漏洞扫描工具 </p>

		<!-- END LOGO -->
		<!-- BEGIN RESPONSIVE MENU TOGGLER -->
		<div class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
		</div>
		<!-- END RESPONSIVE MENU TOGGLER -->
		<!-- BEGIN TOP NAVIGATION MENU -->
		<div class="top-menu">
			<ul class="nav navbar-nav pull-right">
				<!-- BEGIN NOTIFICATION DROPDOWN -->
				<li class="user">
					<i class="fa fa-user"></i><span class="username"><%String realname=((User)request.getSession().getAttribute("USER_CONTEXT")).getRealName();String username=((User)request.getSession().getAttribute("USER_CONTEXT")).getUserName();if(realname.equals("")) {out.print(username);}else{out.print( realname );}%></span>
				</li>
				<li class="sign-out">
					<a href="<%=request.getContextPath()%>/logout">
						<i class="fa fa-sign-out"></i><span class="username">退出</span>
					</a>
				</li>

				<!-- END USER LOGIN DROPDOWN -->
				<!-- END USER LOGIN DROPDOWN -->
			</ul>
		</div>
		<!-- END TOP NAVIGATION MENU -->
	</div>
	<!-- END HEADER INNER -->
</div>
