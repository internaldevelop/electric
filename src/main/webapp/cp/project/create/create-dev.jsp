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
<title>新建项目</title>
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

<link rel="stylesheet" href="<c:url value="/public/css/create.css" />"
	type="text/css">
<link rel="shortcut icon"
	href="<c:url value="/public/img/favicon.ico" />" type="image/x-icon" />
<script
	src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery.min.js" />"
	type="text/javascript"></script>
<script type="text/javascript">
	window.G = {
		bizNo: '${bizNo}'
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
<body
	class="page-header-fixed page-sidebar-closed-hide-logo page-content-white">
	<!-- BEGIN HEADER -->
	<%@include file="/WEB-INF/cp/public/head.jsp"%>
	<!-- END HEADER -->
	<div class="clearfix"></div>
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
		<!-- BEGIN SIDEBAR -->
		<%@include file="/WEB-INF/cp/public/sidebar.jsp"%>
		<script>
			$('.page-sidebar-menu li.create_project').addClass('active open');
			/*$('.page-sidebar-menu li.project').find('.arrow').addClass('open');
			$('.page-sidebar-menu li.project li.create_project').addClass(
					'active');*/
		</script>
		<!-- END SIDEBAR -->
		<!-- BEGIN CONTENT -->
		<div class="page-content-wrapper">
			<div class="page-content">
				<!-- BEGIN PAGE HEADER-->
				<div class="row">
					<div class="col-md-12">
						<!-- BEGIN PAGE TITLE & BREADCRUMB-->
						<div class="page-bar" style="border-bottom:none;">
							<ul class="page-breadcrumb">
								<li><i class="fa fa-plus-square"></i> <a
									href="javascript:;">新建项目</a></li>
							</ul>
						</div>
						<!-- END PAGE TITLE & BREADCRUMB-->
					</div>
				</div>
				<!-- END PAGE HEADER-->
				<div class="row">
					<div class="form col-lg-8 col-md-12 col-sm-12 col-xs-12">
						<form action="create" id="config" method="POST"
							class="form-horizontal" enctype="multipart/form-data" role="form">
							<div class="col-md-12 area">
								<p class="sub-title">基本信息</p>
								<div class="page page1">
									<div class="form-group">
										<label class="control-label col-md-3">项目名称 <span
											class="required" aria-required="true"> * </span> </label>
										<div class="col-md-7">
											<input name="projectName" type="text" maxlength="100" class="form-control">
										</div>
									</div>
									<div class="form-group">
										<label class="control-label col-md-3">项目描述&nbsp;&nbsp;&nbsp;</label>
										<div class="col-md-7">
											<textarea name="describe" maxlength="500" class="form-control" rows="2"></textarea>
										</div>
									</div>
									<div class="form-group">
										<label class="control-label col-md-3">扫描范围 <span
											class="required" aria-required="true">* </span> </label>
										<div class="col-md-7">
											<textarea name="target" maxlength="1000" class="form-control" rows="3"></textarea>
											<span class="help-block">
												<p>每行一个IP配置</p>
												<p>支持格式: 单个IP——10.0.0.1, CIDR——10.0.0.1/16
											</span>
										</div>
									</div>
								</div>
							</div>
							<button type="submit" class="c-btn blue submit">提 交</button>
						</form>
					</div>
				</div>
			</div>

			<!--表单开始-->
			<!--
				<div class="tabbable tabbable-tabdrop">
					<ul class="nav nav-tabs">
						<li class="active"><a href="#page1" data-toggle="tab"
							aria-expanded="true">基本信息</a></li>
						<li class=""><a href="#page2" data-toggle="tab"
							aria-expanded="false">主机发现</a></li>
						<li class=""><a href="#page3" data-toggle="tab"
							aria-expanded="false">服务探测</a></li>
						<li class=""><a href="#page4" data-toggle="tab"
							aria-expanded="false">漏洞挖掘</a></li>
					</ul>
					<div class="form center col-lg-8 col-md-12 col-sm-12 col-xs-12">
						<form action="create" id="config" method="POST"
							class="form-horizontal" enctype="multipart/form-data" role="form">
							<div class="form-body text-left">
								<div class="tab-content">
									<div class="tab-pane active" id="page1">
										
									</div>
									<div class="tab-pane" id="page2">
										
									</div>

									<div class="tab-pane" id="page3">
										<div class="page page3">
											
									</div>
									<div class="tab-pane" id="page4">
										
										</div>
									</div>
								</div>
							</div>
							<button type="submit" class="btn blue submit">提交</button>
						</form>
					</div>
				</div>
			</div>
			-->
			<!--表单结束-->
		</div>
	</div>
	<!-- END CONTENT -->
	<!-- END CONTAINER -->
	<!--提示框开始-->
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
		</div>
	</div>
	<!--提示框结束-->
	<%@include file="/WEB-INF/cp/public/footer.jsp"%>
	<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
	<!-- BEGIN CORE PLUGINS -->
	<!--[if lt IE 9]>
<script src="<c:url value="/lib/metronic/assets/global/plugins/respond.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/lib/metronic/assets/global/plugins/excanvas.min.js" />" type="text/javascript"></script> 
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
		src="<c:url value="/public/lib/metronic/assets/layouts/layout/scripts/layout.min.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/public/lib/metronic/assets/layouts/layout/scripts/demo.min.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/public/lib/metronic/assets/layouts/global/scripts/quick-sidebar.min.js" />"
		type="text/javascript"></script>

	<script src="<c:url value="/public/lib/bootstrap-paginator.js" />"
		type="text/javascript"></script>
	<script src="<c:url value="/public/lib/echarts.min.js" />"
		type="text/javascript"></script>

	<script src="<c:url value="/public/lib/bootstrap-paginator.js" />"
		type="text/javascript"></script>
	<script src="<c:url value="/public/lib/echarts.min.js" />"
		type="text/javascript"></script>
	<script src="<c:url value="/public/lib/masonry.pkgd.min.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/public/lib/sweet-alert/sweet-alert.min.js" />"
		type="text/javascript"></script>


	<script src="<c:url value="/public/js/common.js" />"
		type="text/javascript"></script>

	<script src="<c:url value="/public/lib/jquery.validate.min.js" />"
		type="text/javascript"></script>
	<script src="<c:url value="/public/js/validate-config.js" />"
		type="text/javascript"></script>

	<script src="<c:url value="/public/js/create.js" />"
		type="text/javascript"></script>
	<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>