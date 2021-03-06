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
<meta charset="utf-8" />
<title>设备详情</title>
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

<!-- END THEME STYLES -->
<link rel="shortcut icon" href="<c:url value="/public/img/favicon.ico" />" type="image/x-icon" />

<link rel="stylesheet" href="<c:url value="/public/css/device_detail-3e28644f5f.css" />"
	type="text/css">

<script
		src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery.min.js" />"
		type="text/javascript"></script>
<script type="text/javascript">
	window.G = {
		projectID: '${projectID}',
		taskID: '${taskID}',
		ip: '${ip}'
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
			$('.page-sidebar-menu li.project_list').addClass('active open');
		</script>
		<!-- END SIDEBAR -->
		<!-- BEGIN CONTENT -->
		<div class="page-content-wrapper">
			<div class="page-content relative">
				<!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
				<!-- /.modal -->
				<!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
				<!-- BEGIN STYLE CUSTOMIZER -->
				<!-- BEGIN PAGE HEADER-->
				<div class="row">
					<div class="col-md-12">
						<!-- BEGIN PAGE TITLE & BREADCRUMB-->
						<div class="page-bar">
							<ul class="page-breadcrumb">
								<li><i class="icon-bar-chart"></i> <a href="<%=request.getContextPath()%>/project/project_list">项目列表</a>
									<i class="fa fa-angle-right"></i></li>
								<li><a href="<%=request.getContextPath()%>/project/project_detail?projectID=${projectID}">项目详情</a><i class="fa fa-angle-right"></i></li>
								<li><a href="<%=request.getContextPath()%>/project/task_detail?projectID=${projectID}&taskID=${taskID}">任务详情</a><i class="fa fa-angle-right"></i></li>
								<li><a href="javascript:;">设备详情</a></li>
							</ul>
						</div>
						<!-- END PAGE TITLE & BREADCRUMB-->
					</div>
				</div>
				<!-- END PAGE HEADER-->
				<div class="row">
					<p class="title">${ip}</p>
					<div class="col-md-12 area">
						<div class="item">
							<label>设备类型: </label>
							<div class="sub-item">
								<span class="des">${style}</span>
							</div>
						</div>
						<div class="item">
							<label>品牌型号: </label>
							<div class="sub-item">
								<span class="des">${brand}</span>
							</div>
						</div>
						<div class="item">
							<label>网络服务: </label>
							<div class="sub-item">
								<ul>
									<c:forEach items="${service}" var="item">
										<c:choose>
											<c:when test="${item.version ne ''}">
											  	<c:choose>
												    <c:when test="${item.name eq 'http'}">
												   		<li><a class="c-btn" href="${item.name}://${ip}:${item.port}"  target="_blank">${item.name}-${item.version}:${item.port}</a></li>
												    </c:when>
												    <c:otherwise>
												    	<c:choose>
														   	<c:when test="${item.name eq 'https'}">
															   	<li><a class="c-btn" href="${item.name}://${ip}:${item.port}" target="_blank">${item.name}-${item.version}:${item.port}</a></li>
															</c:when>
															<c:otherwise>
																<li>${item.name}-${item.version}:${item.port}</li>
															</c:otherwise>
														</c:choose>
												    </c:otherwise>
												</c:choose>
											</c:when>
										 	<c:otherwise>
												<c:choose>
												    <c:when test="${item.name eq 'http'}">
												   		<li><a class="c-btn" href="${item.name}://${ip}:${item.port}"  target="_blank">${item.name}:${item.port}</a></li>
												    </c:when>
												    <c:otherwise>
												    	<c:choose>
														   	<c:when test="${item.name eq 'https'}">
															   	<li><a class="c-btn" href="${item.name}://${ip}:${item.port}" target="_blank">${item.name}:${item.port}</a></li>
															</c:when>
															<c:otherwise>
																<li>${item.name}:${item.port}</li>
															</c:otherwise>
														</c:choose>
												    </c:otherwise>
												</c:choose>
											</c:otherwise>
										</c:choose>
									</c:forEach>
								</ul>
							</div>
						</div>
						<div class="item">
							<label>漏洞详情: </label>
							<div class="sub-item">
								<div class="deep-scan">
									<button class="c-btn" data-ip="${ip}" data-method="exploit">exploit</button>
									<button class="c-btn" data-ip="${ip}" data-method="openvas">OpenVAS</button>
								</div>
								<div class="relative">
									<div id="table"></div>
									<div class="loading">
										<img src="../public/img/running.gif">
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- END CONTENT -->
	</div>
	<!-- END CONTAINER -->
	<!-- BEGIN FOOTER -->
	<div class="modal fade" id="checkVulModel" tabindex="-1" data-backdrop="static" role="basic" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
					<h4 class="modal-title">漏洞验证</h4>
				</div>
				<div class="modal-body">
					 <!--表单开始-->
					 <div class="form">
						<form id="verifyVul" action="" class="form-horizontal" role="form" method="GET">
							<div class="form-body">
							</div>
						</form>
					</div>
					 <!--表单结束-->
				</div>
				<div class="modal-footer">
					<button type="button" class="c-btn submit">确 定</button>
					<button type="button" class="c-btn" data-dismiss="modal">取 消</button>
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
	<%@include file="/WEB-INF/cp/public/footer.jsp"%>
	<!-- END FOOTER -->
	<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
	<!-- BEGIN CORE PLUGINS -->
	<!--[if lt IE 9]>
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/respond.min.js" />"></script>
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/excanvas.min.js" />"></script> 
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
	<script
		src="<c:url value="/public/lib/metronic/assets/global/plugins/datatables/datatables.min.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/public/lib/metronic/assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js" />"
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
	<script src="<c:url value="/public/lib/react-15.3.0/build/react.js" />"
		type="text/javascript"></script>
	<script
		src="<c:url value="/public/lib/react-15.3.0/build/react-dom.js" />"
		type="text/javascript"></script>
	<script src="<c:url value="/public/lib/jquery.validate.min.js" />" type="text/javascript"></script>
	<script src="<c:url value="/public/js/subscribe-2fc74f0121.js" />"
		type="text/javascript"></script>
	<script src="<c:url value="/public/js/device_detail-2725ba3369.js" />" type="text/javascript"></script>

	<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>