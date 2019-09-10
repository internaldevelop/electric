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
<title>网络配置</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1" name="viewport"/>
<meta content="" name="description"/>
<meta content="" name="author"/>
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/font-awesome/css/font-awesome.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap/css/bootstrap.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/global/css/components.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/layouts/layout/css/layout.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/layouts/layout/css/themes/darkblue.min.css" />" rel="stylesheet" type="text/css" id="style_color" />
<link href="<c:url value="/public/lib/sweet-alert/sweet-alert.css" />" rel="stylesheet" type="text/css">
<link href="<c:url value="/public/lib/slider/bootstrap-slider.min.css" />" rel="stylesheet" type="text/css">

<link href="<c:url value="/public/css/network-77d6d8ea8f.css" />" rel="stylesheet" type="text/css">
<link rel="shortcut icon" href="<c:url value="/public/img/favicon.ico" />" type="image/x-icon" />
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery.min.js" />" type="text/javascript"></script>
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
<%@include file="/WEB-INF/cp/public/head.jsp" %>
<!-- END HEADER -->
<div class="clearfix"></div>
<!-- BEGIN CONTAINER -->
<div class="page-container">
	<!-- BEGIN SIDEBAR -->
	<%@include file="/WEB-INF/cp/public/sidebar.jsp" %>
	<script>
		$('.page-sidebar-menu li.network').addClass('active open');
	</script>
	<!-- END SIDEBAR -->
	<!-- BEGIN CONTENT -->
	<div class="page-content-wrapper">
		<div class="page-content">
			<!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			
			<!-- /.modal -->
			<!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			<!-- BEGIN STYLE CUSTOMIZER -->

			<!-- END STYLE CUSTOMIZER -->
			<!-- BEGIN PAGE HEADER-->
			<div class="row">
				<div class="col-md-12">
					<!-- BEGIN PAGE TITLE & BREADCRUMB-->
					<div class="page-bar">
                        <ul class="page-breadcrumb">
                        	<li>
                        		<i class="fa fa-globe"></i>
                                <a href="javascript:;">网络设置</a>
                            </li>
                        </ul>
                    </div>
					<!-- END PAGE TITLE & BREADCRUMB-->
				</div>
				<div class="col-xs-6">
	                <form action="" id="netConfig" method="POST"
	                class="form-horizontal center" enctype="multipart/form-data" role="form">
		                <div class="text-left relative">
	                    <div class="form-group">
	                        <label class="col-xs-3 control-label">通信端口
	                            <span class="required" aria-required="true">* </span>
	                        </label>
	                        <div class="col-xs-7">
	                            <input name="ethName" type="text" class="form-control" readonly value="eth0">
	                        </div>
	                    </div>
	                    <div class="form-group">
	                        <label class="col-xs-3 control-label">方式
	                            <span class="required" aria-required="true">* </span>
	                        </label>
	                        <div class="col-xs-7">
	                            <select name="dhcpFlag" class="form-control dhcpFlag" disabled>
	                                <option value="0" slected>静态地址</option>
	                                <option value="1">DHCP</option>
	                            </select>
	                        </div>
	                    </div>
	                    <div class="form-group no-dhcp-wrapper">
	                        <label class="col-xs-3 control-label">IP
	                            <span class="required" aria-required="true">* </span>
	                        </label>
	                        <div class="col-xs-7">
	                            <input name="ip" type="text" class="no-dhcp form-control" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group no-dhcp-wrapper">
	                        <label class="col-xs-3 control-label">子网掩码
	                            <span class="required" aria-required="true">* </span>
	                        </label>
	                        <div class="col-xs-7">
	                            <input name="netmask" type="text" class="no-dhcp form-control" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group no-dhcp-wrapper">
	                        <label class="col-xs-3 control-label">网关</label>
	                        <div class="col-xs-7">
	                            <input name="gateway" type="text" class="no-dhcp form-control" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group no-dhcp-wrapper">
	                        <label class="col-xs-3 control-label">首选DNS</label>
	                        <div class="col-xs-7">
	                            <input name="dns1" type="text" class="no-dhcp form-control" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group no-dhcp-wrapper">
	                        <label class="col-xs-3 control-label">备用DNS</label>
	                        <div class="col-xs-7">
	                            <input name="dns2" type="text" class="no-dhcp form-control" disabled>
	                        </div>
	                    </div>
	                    <div class="form-group">
							<label class="col-md-3 control-label">带宽</label>
							<div class="col-md-9">
								<div class="bandwidth-wrapper">
									<label>3M</label>
									<input id="bandwidth" data-slider-id='bandwidthSlider' type="text" data-slider-min="3" data-slider-max="10" data-slider-step="0.1" data-slider-value="5" disabled/>
									<label>10M</label>
								</div>
							</div>
							<input name="bandwidth" type="hidden" value="5">
						</div>
	                    <div class="mask"></div>
		                </div>
		                <div class="op-btns">
	                    <button type="button" class="c-btn edit">编辑</button>
	                    <button type="button" class="c-btn edit-ok">确定</button>
	                    <button type="button" class="c-btn edit-cancel">取消</button>
		                </div>
		                    <!--<button type="button" class="u-btn submit">修 改</button>-->
		                <div class="loading"><img src="../public/img/running.gif"></div>
	                </form>
	        	</div>
			</div>
			<!-- END PAGE HEADER-->
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
<%@include file="/WEB-INF/cp/public/footer.jsp" %>

<script>
	$( '.page-sidebar-menu li.config' ).addClass( 'active open' );
	$( '.page-sidebar-menu li.config' ).find( '.arrow' ).addClass( 'open' );
	$( '.page-sidebar-menu li.config li.network' ).addClass( 'active' );

	window.G = {
        netConfig: {
            ethName: '${netConfig.ethName}',
            dhcpFlag: '${netConfig.dhcpFlag}',
            ip: '${netConfig.ip}',
            gateway: '${netConfig.gateway}',
            netmask: '${netConfig.netmask}',
            dns1: '${netConfig.dns1}',
            bandwidth: ${netConfig.bandwidth}
        }
	};
</script>
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap/js/bootstrap.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery-ui/jquery-ui.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/global/scripts/app.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/metronic/assets/layouts/layout/scripts/layout.min.js" />" type="text/javascript"></script>

<script src="<c:url value="/public/lib/sweet-alert/sweet-alert.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/slider/bootstrap-slider.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/lib/jquery.validate.min.js" />" type="text/javascript"></script>

<script src="<c:url value="/public/js/validate-config-c05a002e2e.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/js/common-5047d336cd.js" />" type="text/javascript"></script>
<script src="<c:url value="/public/js/network-f0579ae49d.js" />" type="text/javascript"></script>
</body>
<!-- END BODY -->
</html>