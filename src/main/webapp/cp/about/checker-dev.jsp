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
<title>Metronic | Admin Dashboard Template</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1" name="viewport"/>
<meta content="" name="description"/>
<meta content="" name="author"/>
<!-- BEGIN GLOBAL MANDATORY STYLES -->

<link href="<c:url value="/public/lib/metronic/assets/global/plugins/font-awesome/css/font-awesome.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/font-awesome/css/font-awesome.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap/css/bootstrap.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" />" rel="stylesheet" type="text/css" />
<!-- END GLOBAL MANDATORY STYLES -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN THEME GLOBAL STYLES -->
<link href="<c:url value="/public/lib/metronic/assets/global/css/components.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/global/css/plugins.min.css" />" rel="stylesheet" type="text/css" />
<!-- END THEME GLOBAL STYLES -->
<!-- BEGIN THEME LAYOUT STYLES -->
<link href="<c:url value="/public/lib/metronic/assets/layouts/layout/css/layout.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/layouts/layout/css/themes/darkblue.min.css" />" rel="stylesheet" type="text/css" id="style_color" />
<link href="<c:url value="/public/lib/metronic/assets/layouts/layout/css/custom.min.css" />" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<c:url value="/public/lib/sweet-alert/sweet-alert.css" />" type="text/css">

<link rel="stylesheet" href="<c:url value="/public/css-dev/common.css" />" type="text/css">

<!-- END THEME STYLES -->
<link rel="shortcut icon" href="favicon.ico"/>
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
					<div class="page-bar" style="border-bottom:none;">
                        <ul class="page-breadcrumb">
                        	<li>
                        		<i class="fa fa-home"></i>
                                <a href="javascript:;">关于</a>
                                <i class="fa fa-angle-right"></i>
                            </li>
                            <li>
                            	<a href="javascript:;">项目详情</a>
                            </li>
                        </ul>
                    </div>
					<!-- END PAGE TITLE & BREADCRUMB-->
				</div>
			</div>
			<!-- END PAGE HEADER-->
			<div class="row">
				<div class="col-md-12">
					<a class="btn red btn-outline sbold addChecker" href="" data-toggle="modal">添加</a>
					<div id="table"></div>
					<div class="loading" style="display: none;"><img src="public/img/running.gif" style="height:50px"></div>
					<div class="page relative center">
						<ul id="project-page" style="cursor:pointer;"></ul>
						<div class="page-mask" style="display: none;"></div>
					</div>
					<div class="modal fade in" id="addOrUpdateModel" tabindex="-1" role="basic" aria-hidden="true" style="padding-left: 17px;">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
								<h4 class="modal-title">添加弱秘钥</h4>
							</div>
							<div class="modal-body">
								 <!--表单开始-->
								 <div class="form">
									<form id="addOrUpdate" action="aa" class="form-horizontal" role="form" enctype="multipart/form-data" method="POST">
										<div class="form-body">
											<div class="form-group">
												<label class="col-md-3 control-label">用户名
													<span class="required" aria-required="true">* </span>
												</label>
												<div class="col-md-8">
													<input name="checkScript" type="file" class="form-control" readonly>
												</div>
											</div>
											<div class="form-group">
												<label class="col-md-3 control-label">密码
													<span class="required" aria-required="true">* </span>
												</label>
												<div class="col-md-8">
													<input name="password" type="file" class="form-control" readonly>
												</div>
											</div>
											<div class="form-group">
												<label class="col-md-3 control-label">确认密码
													<span class="required" aria-required="true">* </span>
												</label>
												<div class="col-md-8">
													<input name="password" type="file" class="form-control" readonly>
												</div>
											</div>
										</div>
										<div class="modal-footer">
											<button type="submit" class="btn blue submit">添加</button>
											<button type="button" class="btn default" data-dismiss="modal">取消</button>
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
<!-- END CONTAINER -->
<%@include file="/cp/public/footer.jsp" %>
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<!--[if lt IE 9]>
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/respond.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/excanvas.min.js" />" type="text/javascript"></script> 
<![endif]-->
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap/js/bootstrap.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/js.cookie.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery.blockui.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" />" type="text/javascript"></script>
<!-- END CORE PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery-ui/jquery-ui.min.js" />" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN THEME GLOBAL SCRIPTS -->
<script src="<c:url value="/public/lib/metronic/assets/global/scripts/app.min.js" />" type="text/javascript"></script>
<!-- END THEME GLOBAL SCRIPTS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="<c:url value="/public/lib/metronic/assets/pages/scripts/ui-modals.min.js" />" type="text/javascript"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<!-- BEGIN THEME LAYOUT SCRIPTS -->
<script src="<c:url value="/public/lib/metronic/assets/layouts/layout2/scripts/layout.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/layouts/layout2/scripts/demo.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/layouts/global/scripts/quick-sidebar.min.js" />" type="text/javascript"></script>

<script src="<c:url value="/public/lib/bootstrap-paginator.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/sweet-alert/sweet-alert.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/react-15.3.0/build/react.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/react-15.3.0/build/react-dom.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/react-15.3.0/build/browser.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/jquery.validate.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/js-dev/common.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/js-dev/validate-config.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/js-dev/subscribe.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/js/about.min.js" />" type="text/javascript"></script>

<script>
	$( '.page-sidebar-menu li.about' ).addClass( 'active' );
</script>
</body>
<!-- END BODY -->
</html>