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
<title>项目详情</title>
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
	href="<c:url value="/public/css/project_detail-998dff83e0.css" />" type="text/css">

<!-- END THEME STYLES  -->
<link rel="shortcut icon" href="<c:url value="/public/img/favicon.ico" />" type="image/x-icon" />

<script
		src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery.min.js" />"
		type="text/javascript"></script>

<script type="text/javascript">
	window.G = {
		projectID: '${projectID}',
		projectName: '${projectName}',
		userType: '${userType}'
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
								<li><a href="javascript:;">项目详情</a></li>
							</ul>
						</div>
						<!-- END PAGE TITLE & BREADCRUMB-->
					</div>
				</div>
				<!-- END PAGE HEADER-->
				<div class="row main-content">
					<p class="title">${projectName}</p>
					<div class="btn-group">
						<button class="c-btn" data-style="exec">手动执行</button>
						<button class="c-btn" data-style="check-config">查看配置</button>
					</div>
					<div class="col-md-12 area">
						<p class="sub-title"><i class="fa fa-line-chart"></i> 资产漏洞趋势表</p>
						<div id="charts"></div>
					</div>
					<div class="col-md-12 area">
						<p class="sub-title"><i class="fa fa-list-ul"></i> 任务列表</p>
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
			<!-- END CONTENT -->
		</div>
	</div>
	<!-- END CONTAINER -->
	<!--配置框开始-->
	<div class="bootbox modal fade bootbox-alert in" id="config" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">项目配置参数</h4>
				</div>
				<div class="modal-body">
					<!--配置详情开始-->
					<div class="detail">
						<!--表单开始-->
						<div class="form">
							<div id="config" class="form-horizontal">
								<div class="form-body">
									<h2 class="title">1. 主机发现</h2>
									<div class="form-group c-list projectName">
										<label class="control-label col-md-5 col-xs-6">项目名称 </label>
										<div class="col-md-6 col-xs-6 c-content">
										</div>
									</div>
									<div class="form-group c-list describe">
										<label class="control-label col-md-5 col-xs-6">项目描述 </label>
										<div class="col-md-6 col-xs-6 c-content">
										</div>
									</div>
									<div class="form-group c-list target">
										<label class="control-label col-md-5 col-xs-6">扫描范围</label>
										<div class="col-md-6 col-xs-6 c-content">
										</div>
									</div>
									<div class="form-group c-list intensity">
										<label class="control-label col-md-5 col-xs-6">探测强度等级</label>
										<div class="col-md-6 col-xs-6 c-content">
											1级
										</div>
									</div>
									<div class="form-group c-list protocol">
										<label class="control-label col-md-5 col-xs-6">探测协议</label>
										<div class="col-md-6 col-xs-6 c-content">
											tcp与udp
										</div>
									</div>
									<div class="form-group c-list hdAdditionPort">
										<label class="control-label col-md-5 col-xs-6">主机发现额外端口</label>
										<div class="col-md-6 col-xs-6 c-content">
										</div>
									</div>
									<h2 class="title">2. 服务探测</h2>
									<div class="form-group c-list scanType">
										<label class="control-label col-md-5 col-xs-6">扫描类型</label>
										<div class="col-md-6 col-xs-6 c-content">
											TCP:sS UDP:sU
										</div>
									</div>
									<div class="form-group c-list topPorts">
										<label class="control-label col-md-5 col-xs-6">热门端口</label>
										<div class="col-md-6 col-xs-6 c-content">
											800
										</div>
									</div>
									<div class="form-group c-list enableOsDetec">
										<label class="control-label col-md-5 col-xs-6">开启操作系统探测</label>
										<div class="col-md-6 col-xs-6 c-content">
											是
										</div>
									</div>
									<div class="form-group c-list enableVersionDetec">
										<label class="control-label col-md-5 col-xs-6">开启服务版本探测</label>
										<div class="col-md-6 col-xs-6 c-content">
											是
										</div>
									</div>
									<div class="form-group c-list versionIntensity">
										<label class="control-label col-md-5 col-xs-6">服务版本探测强度</label>
										<div class="col-md-6 col-xs-6 c-content">
											6
										</div>
									</div>
									<div class="form-group c-list sdAdditionPortTcp">
										<label class="control-label col-md-5 col-xs-6">额外TCP端口</label>
										<div class="col-md-6 col-xs-6 c-content">
										</div>
									</div>
									<div class="form-group c-list sdAdditionPortUdp">
										<label class="control-label col-md-5 col-xs-6">额外UDP端口</label>
										<div class="col-md-6 col-xs-6 c-content">
										</div>
									</div>
									<div class="form-group c-list excludePorts">
										<label class="control-label col-md-5 col-xs-6">禁止扫描端口</label>
										<div class="col-md-6 col-xs-6 c-content">
											63 96 58
										</div>
									</div>
									<h2 class="title">3. 其他</h2>
									<div class="form-group c-list probeModule">
										<label class="control-label col-md-5 col-xs-6">弱口令探测协议</label>
										<div class="col-md-6 col-xs-6 c-content">
											ssh ftp
										</div>
									</div>
									<div class="form-group c-list enableReboot">
										<label class="control-label col-md-5 col-xs-6">检测设备重启漏洞</label>
										<div class="col-md-6 col-xs-6 c-content">
											否
										</div>
									</div>
									<div class="form-group c-list enableChange">
										<label class="control-label col-md-5 col-xs-6">检测更改配置文件漏洞</label>
										<div class="col-md-6 col-xs-6 c-content">
											
										</div>
									</div>
									<div class="form-group c-list projectFlag">
										<label class="control-label col-md-5 col-xs-6">任务类型</label>
										<div class="col-md-6 col-xs-6 c-content">
											周期
										</div>
									</div>
									<div class="form-group c-list space">
										<label class="control-label col-md-5 col-xs-6">周期</label>
										<div class="col-md-6 col-xs-6 c-content">
										</div>
									</div>
								</div>
							</div>
						</div>
						<!--表单结束-->
					</div>
					<!--配置详情结束-->
				</div>
				<div class="modal-footer">
					<div class="config-loading"><img src="../public/img/running.gif" style="height:40px"></div>
	                <div class="form-group" style="text-align:center;">
						<button type="button" class="c-btn" data-dismiss="modal">关闭</button>
					</div>
	            </div>
			</div>
		</div>
	</div>
	<!--配置框结束-->
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
	<script src="<c:url value="/public/lib/echarts.min.js" />"
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
	<script src="<c:url value="/public/js/project_detail-3a78634316.js" />"
		type="text/javascript"></script>
</body>
<!-- END BODY -->
</html>