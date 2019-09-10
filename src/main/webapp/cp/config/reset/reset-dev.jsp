<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<!-- 
Template Name: Metronic - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.1.1
Version: 3.0.1
Author: KeenThemes
Website: http://www.keenthemes.com/
Contact: support@keenthemes.com
Follow: www.twitter.com/keenthemes
Like: www.facebook.com/keenthemes
Purchase: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
License: You must have a valid license purchased only from themeforest(the above link) in order to legally use the theme for your project.
-->
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
<meta charset="utf-8"/>
<title>账户重置</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1" name="viewport"/>
<meta content="" name="description"/>
<meta content="" name="author"/>
<!-- BEGIN GLOBAL MANDATORY STYLES -->
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/font-awesome/css/font-awesome.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap/css/bootstrap.min.css" />" rel="stylesheet" type="text/css" />

<link href="<c:url value="/public//lib/metronic/assets/global/css/components.min.css" />" rel="stylesheet" type="text/css" />
<!-- END THEME GLOBAL STYLES -->
<!-- BEGIN THEME LAYOUT STYLES -->
<link href="<c:url value="/public/lib/metronic/assets/layouts/layout/css/layout.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/layouts/layout/css/themes/darkblue.min.css" />" rel="stylesheet" type="text/css" id="style_color" />

<link rel="stylesheet" href="<c:url value="/public/css-dev/common.css" />" type="text/css">
<link rel="shortcut icon" href="<c:url value="/public/img/favicon.ico" />" type="image/x-icon" />
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery.min.js" />" type="text/javascript"></script>
<!-- END GLOBAL MANDATORY STYLES -->
<style>
	label.error{ color: red; }
</style>

</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<!-- DOC: Apply "page-header-fixed-mobile" and "page-footer-fixed-mobile" class to body element to force fixed header or footer in mobile devices -->
<!-- DOC: Apply "page-sidebar-closed" class to the body and "page-sidebar-menu-closed" class to the sidebar menu element to hide the sidebar by default -->
<!-- DOC: Apply "page-sidebar-hide" class to the body to make the sidebar completely hidden on toggle -->
<!-- DOC: Apply "page-sidebar-closed-hide-logo" class to the body element to make the logo hidden on sidebar toggle -->
<!-- DOC: Apply "page-sidebar-hide" class to body element to completely hide the sidebar on sidebar toggle -->
<!-- DOC: Apply "page-sidebar-fixed" class to have fixed sidebar -->
<!-- DOC: Apply "page-footer-fixed" class to the body element to have fixed footer -->
<!-- DOC: Apply "page-sidebar-reversed" class to put the sidebar on the right side -->
<!-- DOC: Apply "page-full-width" class to the body element to have full width page without the sidebar menu -->
<body class="page-header-fixed page-sidebar-closed-hide-logo page-content-white">
<!-- BEGIN HEADER -->
<%@include file="/cp/public/head.jsp" %>
<!-- END HEADER -->
<div class="clearfix"></div>
<!-- BEGIN CONTAINER -->
<div class="page-container">
	<!-- BEGIN SIDEBAR -->
	<%@include file="/cp/public/sidebar.jsp" %>
	<script>
		$( '.page-sidebar-menu li.config' ).addClass( 'active open' );
		$( '.page-sidebar-menu li.config' ).find( '.arrow' ).addClass( 'open' );
		$( '.page-sidebar-menu li.config li.reset' ).addClass( 'active' );
	</script>
	<!-- END SIDEBAR -->
	<!-- BEGIN CONTENT -->
	<div class="page-content-wrapper">
		<div class="page-content">
			<!-- BEGIN STYLE CUSTOMIZER -->
			<!-- END STYLE CUSTOMIZER -->
			<!-- BEGIN PAGE HEADER-->
			<div class="row">
				<div class="col-md-12">
					<!-- BEGIN PAGE TITLE & BREADCRUMB-->
					<div class="page-bar">
                        <ul class="page-breadcrumb">
                        	<li>
                        		<i class="fa fa-cog"></i>
                                <a href="javascript:;">系统设置</a>
                                <i class="fa fa-angle-right"></i>
                            </li>
                            <li>
                            	<a href="javascript:;">账号管理</a>
                            </li>
                        </ul>
                    </div>
					<!-- END PAGE TITLE & BREADCRUMB-->
				</div>
			</div>
			<!-- END PAGE HEADER-->
			<!--表单开始-->
			<div class="form relative">
				<form action="" name="pwChange" id="pwChange" class="form-horizontal" method="GET" role="form">
					<div class="form-body">		
					    <div class="alert center" style="display:none;"></div>
						<div class="form-group">
							<label class="col-md-5 control-label">用户名</label>
							<div class="col-md-3">
								<input name="username" type="text" class="form-control" value="${userName}" readonly>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-5 control-label">姓名</label>
							<div class="col-md-3">
								<input name="realName" id="realName" type="text" class="form-control" value="${realName}" readonly>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-5 control-label">密码</label>
							<div class="col-md-3">
								<input name="ps" id="ps" type="password" class="form-control">
							</div>
						</div>
						<div class="form-group" style="text-align:center;">
							<button type="button" class="btn blue submit">重置</button>
						</div>
					</div>
				</form>
				<div class="loading"><img src="../public/img/running.gif" style="height:40px"></div>
			</div>
			<!--表单结束-->
		</div>
	</div>
	<!-- END CONTENT -->
</div>
<!-- END CONTAINER -->
<%@include file="/cp/public/footer.jsp" %>
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap/js/bootstrap.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/global/scripts/app.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/layouts/layout/scripts/layout.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/jquery.validate.min.js" />" type="text/javascript"></script>

<script src="<c:url value="/public/js-dev/validate-config.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/js/reset.min.js" />" type="text/javascript"></script>

</body>
<!-- END BODY -->
</html>