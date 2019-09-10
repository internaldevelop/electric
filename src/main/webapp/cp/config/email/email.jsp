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
<meta charset="utf-8" />
<title>检查员管理</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1" name="viewport" />
<meta content="" name="description" />
<meta content="" name="author" />
<!-- BEGIN GLOBAL MANDATORY STYLES -->

<link
	href="<c:url value="/public/lib/metronic/assets/global/plugins/font-awesome/css/font-awesome.min.css" />"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/public/lib/metronic/assets/global/plugins/font-awesome/css/font-awesome.min.css" />"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/public/lib/metronic/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" />"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap/css/bootstrap.min.css" />"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" />"
	rel="stylesheet" type="text/css" />
<!-- END GLOBAL MANDATORY STYLES -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN THEME GLOBAL STYLES -->
<link
	href="<c:url value="/public/lib/metronic/assets/global/css/components.min.css" />"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/public/lib/metronic/assets/global/css/plugins.min.css" />"
	rel="stylesheet" type="text/css" />
<!-- END THEME GLOBAL STYLES -->
<!-- BEGIN THEME LAYOUT STYLES -->
<link
	href="<c:url value="/public/lib/metronic/assets/layouts/layout/css/layout.min.css" />"
	rel="stylesheet" type="text/css" />
<link
	href="<c:url value="/public/lib/metronic/assets/layouts/layout/css/themes/darkblue.min.css" />"
	rel="stylesheet" type="text/css" id="style_color" />
<link
	href="<c:url value="/public/lib/metronic/assets/layouts/layout/css/custom.min.css" />"
	rel="stylesheet" type="text/css" />
<link rel="stylesheet"
	href="<c:url value="/public/lib/sweet-alert/sweet-alert.css" />"
	type="text/css">

<link rel="stylesheet" href="<c:url value="/public/css/checker-b9d33c1d22.css" />"
	type="text/css">

<!-- END THEME STYLES -->
<link rel="shortcut icon" href="<c:url value="/public/img/favicon.ico" />" type="image/x-icon" />

<script
	src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery.min.js" />"
	type="text/javascript"></script>
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
<body
	class="page-header-fixed page-sidebar-closed-hide-logo page-content-white">
	<!-- BEGIN HEADER -->
	<%@include file="/cp/public/head.jsp"%>
	<!-- END HEADER -->
	<div class="clearfix"></div>
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
		<!-- BEGIN SIDEBAR -->
		<%@include file="/cp/public/sidebar.jsp"%>
		<script>
			$('.page-sidebar-menu li.checker').addClass('active open');
			//$('.page-sidebar-menu li.config').find('.arrow').addClass('open');
			//$('.page-sidebar-menu li.config li.checker').addClass('active');
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
								<li><i class="fa fa-home"></i> <a href="javascript:;">系统设置</a>
									<i class="fa fa-angle-right"></i></li>
								<li><a href="javascript:;">检查员管理</a></li>
							</ul>
						</div>
						<!-- END PAGE TITLE & BREADCRUMB-->
					</div>
				</div>
				<!-- END PAGE HEADER-->
				<div class="row">
					<div class="col-md-12">
						<div class="add-wrapper">
							<a class="btn c-btn add" href="" data-toggle="modal">添加检查员</a>
						</div>
						
						<div id="table"></div>
						<div class="loading">
							<img src="../public/img/running.gif">
						</div>
						<div class="page relative center">
							<ul id="project-page"></ul>
							<div class="page-mask"></div>
						</div>
						<div class="modal fade in" id="addOrChangeModel" tabindex="-1"
							role="basic" aria-hidden="true">
							<div class="modal-dialog">
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal"
											aria-hidden="true"></button>
										<h4 class="modal-title"></h4>
									</div>
									<div class="modal-body">
										<!--表单开始-->
										<div class="form">
											<form id="addOrChange" action="" class="form-horizontal"
												role="form" enctype="multipart/form-data" method="POST">
												<div class="form-body">
													<div class="form-group">
														<label class="col-md-3 control-label">用户名 <span
															class="required" aria-required="true">* </span> </label>
														<div class="col-md-8">
															<input name="userName" type="text" class="form-control">
														</div>
													</div>
													<div class="form-group">
														<label class="col-md-3 control-label">姓名 <span
															class="required" aria-required="true">* </span> </label>
														<div class="col-md-8">
															<input name="realName" type="text" class="form-control">
														</div>
													</div>
													<div class="form-group">
														<label class="col-md-3 control-label">密码 <span
															class="required" aria-required="true">* </span> </label>
														<div class="col-md-8">
															<input name="ps" id="ps" type="password"
																class="form-control">
														</div>
													</div>
													<div class="form-group">
														<label class="col-md-3 control-label">确认密码 <span
															class="required" aria-required="true">* </span> </label>
														<div class="col-md-8">
															<input name="confirmPs" type="password"
																class="form-control">
														</div>
													</div>
													<div class="form-group permission-item">
														<label class="col-md-3 control-label">添加漏洞库 <span
															class="required" aria-required="true">* </span> </label>
														<div class="col-md-8">
															<div class="mt-checkbox-inline">
																<label class="mt-radio mt-radio-outline">禁止 <input type="radio" value="0" name="enableManageVulLib" checked>
																	<span class="forbid-bind"></span> </label>
																<label class="mt-radio mt-radio-outline">允许 <input type="radio" value="1" name="enableManageVulLib">
																	<span class="allow-bind"></span> </label>
															</div>
														</div>
													</div>
												</div>
												<div class="modal-footer">
													<button type="button" class="c-btn submit">提 交</button>
													<button type="button" class="c-btn"
														data-dismiss="modal">取 消</button>
												</div>
											</form>

										</div>
										<!--表单结束-->
									</div>

								</div>
								<!-- /.modal-content -->
							</div>
							<!-- /.modal-dialog -->
						</div>
					</div>
				</div>
			</div>
			<!-- END CONTENT -->
		</div>
	</div>
	<!-- END CONTAINER -->
	<div class="modal fade in" id="permissionModal" tabindex="-1" role="basic" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
											aria-hidden="true"></button>
					<h4 class="modal-title">检查员权限管理</h4>
				</div>
				<div class="modal-body">
					<div class="form">
						<form id="changePermission" action="" class="form-horizontal"
							role="form" enctype="multipart/form-data">
							<div class="form-body">
								<div class="form-group">
									<label class="col-md-3 control-label">添加漏洞库 <span
										class="required" aria-required="true">* </span> </label>
									<div class="col-md-8">
										<div class="mt-checkbox-inline">
											<label class="mt-radio mt-radio-outline">禁止 <input type="radio" value="0" name="enableManageVulLib" checked>
												<span class="forbid-bind"></span> </label>
											<label class="mt-radio mt-radio-outline">允许 <input type="radio" value="1" name="enableManageVulLib">
												<span class="allow-bind"></span> </label>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="c-btn ok">确 定</button>
					<button type="button" class="c-btn cancel"
						data-dismiss="modal">取 消</button>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
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
	<%@include file="/cp/public/footer.jsp"%>
	<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
	<!--[if lt IE 9]>
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/respond.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/excanvas.min.js" />" type="text/javascript"></script> 
<![endif]-->
	<script
		src="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap/js/bootstrap.min.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/public/lib/metronic/assets/global/plugins/js.cookie.min.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery.blockui.min.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" />"
		type="text/javascript"></script>
	<!-- END CORE PLUGINS -->
	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<script
		src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery-ui/jquery-ui.min.js" />"
		type="text/javascript"></script>
	<!-- END PAGE LEVEL PLUGINS -->
	<!-- BEGIN THEME GLOBAL SCRIPTS -->
	<script
		src="<c:url value="/public/lib/metronic/assets/global/scripts/app.min.js" />"
		type="text/javascript"></script>
	<!-- END THEME GLOBAL SCRIPTS -->
	<!-- BEGIN PAGE LEVEL SCRIPTS -->
	<script
		src="<c:url value="/public/lib/metronic/assets/pages/scripts/ui-modals.min.js" />"
		type="text/javascript"></script>
	<!-- END PAGE LEVEL SCRIPTS -->
	<!-- BEGIN THEME LAYOUT SCRIPTS -->
	<script
		src="<c:url value="/public/lib/metronic/assets/layouts/layout2/scripts/layout.min.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/public/lib/metronic/assets/layouts/layout2/scripts/demo.min.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/public/lib/metronic/assets/layouts/global/scripts/quick-sidebar.min.js" />"
		type="text/javascript"></script>

	<script src="<c:url value="/public/lib/bootstrap-paginator.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/public/lib/sweet-alert/sweet-alert.min.js" />"
		type="text/javascript"></script>
	<script src="<c:url value="/public/lib/react-15.3.0/build/react.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/public/lib/react-15.3.0/build/react-dom.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/public/lib/react-15.3.0/build/browser.min.js" />"
		type="text/javascript"></script>
	<script src="<c:url value="/public/lib/jquery.validate.min.js" />"
		type="text/javascript"></script>
	<script src="<c:url value="/public/js/common-c9ce5fd9a3.js" />"
		type="text/javascript"></script>
	<script src="<c:url value="/public/js/validate-config-9f3feb2fe8.js" />"
		type="text/javascript"></script>
	<script src="<c:url value="/public/js/subscribe-6dce02cc75.js" />"
		type="text/javascript"></script>
	<script src="<c:url value="/public/js/checker-8572122aaa.js" />"
		type="text/javascript"></script>

</body>
<!-- END BODY -->
</html>