<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%> 
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
<title>配置邮箱</title>
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

<link rel="stylesheet" href="<c:url value="/public/css/user-4babbfa446.css" />" type="text/css">
<link rel="shortcut icon" href="<c:url value="/public/img/favicon.ico" />" type="image/x-icon" />
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery.min.js" />" type="text/javascript"></script>
<!-- END GLOBAL MANDATORY STYLES -->

<script>
	window.G = {
		isFirst: '${isFirst}'
	}
</script>
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
		$( '.page-sidebar-menu li.user' ).addClass( 'active open' );
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
                        		<i class="fa fa-user"></i>
                                <a href="javascript:;">邮箱设置</a>
                            </li>
                        </ul>
                    </div>
					<!-- END PAGE TITLE & BREADCRUMB-->
				</div>
			</div>
			<!-- END PAGE HEADER-->
			<!--表单开始-->
			<div class="form relative">
				<form action="" name="emailConfig" id="emailConfig" class="form-horizontal" role="form">
					<div class="form-body">
						<div class="form-group">
							<label class="col-md-5 control-label">发件箱<span class="required" aria-required="true">* </span></label>
							<div class="col-md-3">
								<input name="sendAddr" type="text" class="form-control" value="${sendAddr}">
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-5 control-label">发件箱密码<span class="required" aria-required="true">* </span></label>
							<div class="col-lg-3 col-md-5 col-sm-7">
								<input name="sendPS" id="sendPS" type="password" class="form-control">
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-5 control-label">确认密码<span class="required" aria-required="true">* </span></label>
							<div class="col-md-3">
								<input name="confirmPS" id="confirmNewPs" type="password" class="form-control">
							</div>
						</div>
						<div class="form-group" style="margin-left:5%;text-align:center;">
							<button type="button" class="c-btn submit">提 交</button>
						</div>
					</div>
				</form>
				<form action="" name="" class="form-horizontal" role="form">
					<div class="form-group">
						<label class="col-md-5 control-label">收件人</label>
						<div class="col-lg-5">
							<ul class="receive">
								<c:if test="${fn:length(receiverList) gt 0}">
									<c:forEach items="${vulDes}" var="item" varStatus="ul">
										<li class="item" title="${item.receiverAddr}">
											<span class="name">${item.receiverName}</span>
											<i class="fa fa-times delete"></i>
										</li>
									</c:forEach>
								</c:if>
								<c:if test="${fn:length(vulDes) eq 0}">
									<li class="no-receiver">
										未添加收件人
									</li>
								</c:if>
							</ul>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-5 control-label">添加收件人</label>
						<div class="col-lg-7">
							<div class="add-wrapper">
								<label class="item add-name">
									<span class="add-title">姓名: </span>
									<input name="receiverName" type="text" class="form-control" data-rule="required">
								</label>
								<label class="item add-addr">
									<span class="add-title">邮箱: </span>
									<input name="receiverAddr" type="text" class="form-control" data-rule="required email">
								</label>
								<button type="button" class="add-receive btn green">添加</button>
							</div>
						</div>
					</div>
				</form>
				<div class="loading"><img src="../public/img/running.gif"></div>
			</div>
			<!--表单结束-->
		</div>
	</div>
	<!-- END CONTENT -->
</div>
<!-- END CONTAINER -->
<div class="modal fade in" id="popModal" tabindex="-1" data-backdrop="static" role="basic" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title"></h4>
			</div>
			<div class="modal-body">
				
			</div>
			<div class="modal-footer">
				<button type="button" class="btn ok">确 定</button>
				<button type="button" class="btn cancel"
					data-dismiss="modal">取 消</button>
			</div>
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<%@include file="/cp/public/footer.jsp" %>
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap/js/bootstrap.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/global/scripts/app.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/layouts/layout/scripts/layout.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/jquery.validate.min.js" />" type="text/javascript"></script>

<script src="<c:url value="/public/js/validate-config-9f3feb2fe8.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/js/user-a37034a168.js" />" type="text/javascript"></script>

</body>
<!-- END BODY -->
</html>