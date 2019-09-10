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
<title>任务详情</title>
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

<link rel="stylesheet"
	href="<c:url value="/public/css/common-7f959569e2.css" />" type="text/css">
<link rel="stylesheet"
	href="<c:url value="/public/css/task_detail-6aa79670d8.css" />" type="text/css">

<!-- END THEME STYLES -->
<link rel="shortcut icon" href="<c:url value="/public/img/favicon.ico" />" type="image/x-icon" />
<script
	src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery.min.js" />"
	type="text/javascript"></script>
<script>
	window.G = {
		projectID: '${projectID}',
		taskID: '${taskID}'
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
	<%@include file="/cp/public/head.jsp"%>
	<!-- END HEADER -->
	<div class="clearfix"></div>
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
		<!-- BEGIN SIDEBAR -->
		<%@include file="/cp/public/sidebar.jsp"%>
		<script>
			$('.page-sidebar-menu li.project_list').addClass('active open');
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
								<li><i class="icon-bar-chart"></i> <a href="<%=request.getContextPath()%>/project/project_list">项目列表</a>
									<i class="fa fa-angle-right"></i></li>
								<li><a href="<%=request.getContextPath()%>/project/project_detail?projectID=${projectID}">项目详情</a><i class="fa fa-angle-right"></i></li>
								<li><a href="javascript:;">任务详情</a></li>
							</ul>
						</div>
						<!-- END PAGE TITLE & BREADCRUMB-->
					</div>
				</div>
				<!-- END PAGE HEADER-->
				<div class="row">
					<p class="title">${projectName}</p>
					<div id="errMsg"></div>
					<div class="col-md-12 area">
						<p class="sub-title">任务概览</p>
						<div id="reportForm"></div>
						<div id="basic"></div>
						<div id="progress"></div>
						<div class="ctrl">
							<div class="progress-wrapper">
								<div class="content">
									<div class="outer-circle"></div>
									<div class="bg">
										<p class="number">
											<em>0</em>
											<span>%</span>
										</p>
										<div class="wave"></div>
									</div>
								</div>
							</div>
							<button class="c-btn btn-stop" disabled>停止任务</button>
						</div>
					</div>
					<div class="col-md-12 area">
						<p class="sub-title">结果统计</p>
						<div class="charts">
							<div class="row">
								<div class="col-lg-12">
									<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
										<div class="item">
											<p class="title">设备类型分布</p>
											<div id="device" class="content pie"></div>
										</div>
									</div>
									<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
										<div class="item">
											<p class="title">漏洞设备占比</p>
											<div id="vulDevice" class="content pie"></div>
										</div>
									</div>
									<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
										<div class="item">
											<p class="title">漏洞等级分布</p>
											<div id="vulLevel" class="content pie"></div>
										</div>
									</div>
									<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
										<div class="item">
											<p class="title">操作系统分布</p>
											<div id="os" class="content pie"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-lg-12">
									<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
										<div class="item">
											<p class="title">品牌分布</p>
											<div id="brand" class="content bar"></div>
										</div>
									</div>
									<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
										<div class="item">
											<p class="title">服务分布</p>
											<div id="service" class="content bar"></div>
										</div>
									</div>
									<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
										<div class="item">
											<p class="title">漏洞类型分布</p>
											<div id="vulStyle" class="content bar"></div>
										</div>
									</div>
									<!--
									<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
										<div class="item">
											<p class="title">漏洞危害分布</p>
											<div id="vulDanger" class="content bar"></div>
										</div>
									</div>
									-->
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-12 area">
						<p class="sub-title">设备列表</p>
						<div class="page-list">
							<div class="filter">
								<div class="operate">
									<label>搜索: <input type="search" class="form-control input-sm input-small input-inline kw" placeholder="">
									</label>
									<i class="fa fa-search btn-search"></i>
								</div>
								<p class="title deviceNum">共 <em></em> 条记录</p>
							</div>
							<div class="relative">
								<div id="table"></div>
								<div class="loading">
									<img src="../public/img/running.gif">
								</div>
								<div class="page relative center">
									<ul id="project-page"></ul>
									<div class="page-mask"></div>
								</div>
							</div>
							
						</div>
					</div>
				</div>
			</div>
			<!-- END CONTENT -->
		</div>
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

	<script src="<c:url value="/public/lib/echarts.min.js" />"
		type="text/javascript"></script>
	<script src="<c:url value="/public/lib/bootstrap-paginator.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/public/lib/sweet-alert/sweet-alert.min.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/public/lib/react-15.3.0/build/react.js" />"
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
	<script src="<c:url value="/public/js/task_detail-c04da00422.js" />"
		type="text/javascript"></script>
</body>
<!-- END BODY -->
</html>