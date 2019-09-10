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

<link rel="stylesheet" href="<c:url value="/public/css/create-dc1a43f515.css" />"
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
	<%@include file="/cp/public/head.jsp"%>
	<!-- END HEADER -->
	<div class="clearfix"></div>
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
		<!-- BEGIN SIDEBAR -->
		<%@include file="/cp/public/sidebar.jsp"%>
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
											<input name="projectName" type="text" class="form-control">
										</div>
									</div>
									<div class="form-group">
										<label class="control-label col-md-3">项目描述&nbsp;&nbsp;&nbsp;</label>
										<div class="col-md-7">
											<textarea name="describe" class="form-control" rows="2"></textarea>
										</div>
									</div>
									<div class="form-group">
										<label class="control-label col-md-3">扫描范围 <span
											class="required" aria-required="true">* </span> </label>
										<div class="col-md-7">
											<textarea name="target" class="form-control" rows="3"></textarea>
											<span class="help-block">
												<p>每行一个IP配置</p>
												<p>支持格式: 单个IP——10.0.0.1, CIDR——10.0.0.1/16
											</span>
										</div>
									</div>
									<div class="form-group">
										<label class="control-label col-md-3">黑名单 </label>
										<div class="col-md-7">
											<input name="blackListFile" type="file" accept=".txt,.json">
											<span class="help-block">
												<p>支持.txt和.json扩展名的文本文件, 其他类型的文件可能会导致异常错误</p>
												<p>每行一个IP配置</p>
												<p>支持格式: 单个IP——10.0.0.1, CIDR——10.0.0.1/16
												</p>
											</span>
										</div>
									</div>
									<div class="form-group">
										<label class="control-label col-md-3">任务类型 <span
											class="required" aria-required="true"> * </span> </label>
										<div class="col-md-2">
											<select class="form-control cycle-trl" name="projectFlag">
												<option value="0" selected>一次</option>
												<!--<option value="1">周期</option>-->
											</select>
										</div>
									</div>
									<div class="form-group cycle">
										<label class="control-label col-md-3">周期间隔 <span
											class="required" aria-required="true"> * </span> </label>
										<div class="col-md-3">
											<input class="ignore" name="space" type="text" size="5" value="0"> 天
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-12 area extra-info">
								<div class="portlet light bordered">
									<div class="portlet-title tabbable-line float">
										<ul class="nav nav-tabs">
											<li class="active" data-page="page2"><a href="#hd"
												data-toggle="tab" aria-expanded="true"> 主机发现 </a>
											</li>
											<li data-page="page3"><a href="#sc" data-toggle="tab"
												aria-expanded="false"> 服务探测 </a>
											</li>
											<li data-page="page4"><a href="#vm" data-toggle="tab"
												aria-expanded="false"> 漏洞挖掘 </a>
											</li>
										</ul>
									</div>
									<div class="portlet-body util-btn-margin-bottom-5">
										<div class="tab-content" style="display: none;">
											<div class="tab-pane active" id="hd">
												<div class="page page2">
													<div class="form-group">
														<label class="control-label col-md-3">探测强度等级 <span
															class="required" aria-required="true">* </span> </label>
														<div class="col-md-7">
															<select name="intensity" class="form-control">
																<option value="1" selected>1级(15)</option>
																<option value="2">2级(50)</option>
																<option value="3">3级(100)</option>
																<option value="4">4级(500)</option>
																<option value="5">5级(1000)</option>
															</select> <span class="help-block"> 括号中为该等级使用的热门端口数量 </span>
														</div>
													</div>
													<div class="form-group">
														<label class="col-md-3 control-label">探测协议 <span
															class="required" aria-required="true">* </span> </label>
														<div class="col-md-7">
															<select name="protocol" class="form-control">
																<option value="tcp" selected>TCP</option>
																<option value="udp">UDP</option>
																<option value="promis">TCP和UDP</option>
															</select>
														</div>
													</div>
													<div class="form-group">
														<label class="control-label col-md-3">额外端口 </label>
														<div class="col-md-7">
															<input name="hdAdditionPort" type="text"
																class="form-control"> <span class="help-block">
																需要额外扫描的tcp端口或端口段, 如有多个用空格隔开, 例如: 1-10 80 </span>
														</div>
													</div>
												</div>
											</div>
											<div class="tab-pane" id="sc">
												<div class="form-group page3">
													<label class="control-label col-md-3">扫描类型 <span
														class="required" aria-required="true">* </span> </label>
													<div class="col-md-7">
														<div class="mt-checkbox-inline scan-type">
															<label class="mt-checkbox mt-checkbox-outline"> <input
																name="tcpTmp" type="checkbox" checked>TCP: <span></span>
															</label> <select name="tcpList" class="form-control">
																<option value="sS" selected>sS</option>
																<option value="sA">sA</option>
																<option value="sT">sT</option>
																<option value="sF">sF</option>
																<option value="sI">sI</option>
																<option value="sM">sM</option>
																<option value="sN">sN</option>
																<option value="sW">sW</option>
																<option value="sX">sX</option>
															</select> <label class="mt-checkbox mt-checkbox-outline">
																<input name="udpTmp" type="checkbox" value="sU">UDP:sU
																<span></span> </label> <label
																class="mt-checkbox mt-checkbox-outline"> <input
																name="sctpTmp" type="checkbox" value="sY">SCTP:sY
																<span></span> </label> <input name="scanType" type="text"
																value="sS">
														</div>
													</div>
												</div>
												<div class="form-group">
													<label class="control-label col-md-3">热门端口 <span
														class="required" aria-required="true">* </span> </label>
													<div class="col-md-7">
														<input name="topPorts" type="number" min="1" max="1000"
															value="50" size=10>
															<span class="help-block">
															热门端口数范围1~1000 </span>
															<span class="help-block">
															系统会自动扫描视频监控协议常用端口 </span>
													</div>
												</div>
												<div class="form-group">
													<label class="control-label col-md-3">开启操作系统探测 <span
														class="required" aria-required="true">* </span> </label>
													<div class="col-md-7">
														<div class="mt-checkbox-inline">
															<label class="mt-radio mt-radio-outline">否 <input
																type="radio" value="0" name="enableOsDetec" checked>
																<span></span> </label> <label class="mt-radio mt-radio-outline">是
																<input type="radio" value="1" name="enableOsDetec">
																<span></span> </label>
														</div>
													</div>
												</div>
												<div class="form-group">
													<label class="control-label col-md-3">开启服务版本探测 <span
														class="required" aria-required="true">* </span> </label>
													<div class="col-md-7">
														<div class="mt-checkbox-inline">
															<label class="mt-radio mt-radio-outline">否 <input
																type="radio" value="0" name="enableVersionDetec" checked>
																<span></span> </label> <label class="mt-radio mt-radio-outline">是
																<input type="radio" value="1" name="enableVersionDetec">
																<span></span> </label>
														</div>
													</div>
												</div>
												<div class="form-group">
													<label class="control-label col-md-3">服务版本探测强度 </label>
													<div class="col-md-7">
														<select name="versionIntensity" class="form-control">
															<option value="1" selected>1</option>
															<option value="2">2</option>
															<option value="3">3</option>
															<option value="4">4</option>
															<option value="5">5</option>
															<option value="6">6</option>
															<option value="7" selected>7</option>
															<option value="8">8</option>
															<option value="9">9</option>
														</select> <span class="help-block"> 1. 此功能需要开启服务版本探测<br>
															2. 强度等级越高, 探测结果越准确, 同时消耗时间越多 </span>
													</div>
												</div>
												<div class="form-group">
													<label class="control-label col-md-3">额外TCP端口 </label>
													<div class="col-md-7">
														<input name="sdAdditionPortTcp" type="text"
															class="form-control"> <span class="help-block">
															需要额外扫描的tcp端口或端口段, 如有多个用空格隔开, 例如: 1-10 80 </span>
													</div>
												</div>
												<div class="form-group">
													<label class="control-label col-md-3">额外UDP端口 </label>
													<div class="col-md-7">
														<input name="sdAdditionPortUdp" type="text"
															class="form-control"> <span class="help-block">
															需要额外扫描的tcp端口或端口段, 如有多个用空格隔开, 例如: 1-10 80 </span>
													</div>
												</div>
												<div class="form-group">
													<label class="control-label col-md-3">禁止扫描端口 </label>
													<div class="col-md-7">
														<input name="excludePorts" type="text"
															class="form-control"> <span class="help-block">
															禁止扫描的端口或端口段, 如有多个用空格隔开, 例如: 1-10 80 </span>
													</div>
												</div>
											</div>
											<div class="tab-pane" id="vm">
												<div class="page page4">
													<div class="form-group">
														<label class="control-label col-md-3">弱口令探测协议 </label>
														<div class="col-md-7">
															<div class="mt-checkbox-inline">
																<label class="mt-checkbox mt-checkbox-outline">
																	<input name="probeModule" type="checkbox" value="ssh">ssh
																	<span></span> </label> <label
																	class="mt-checkbox mt-checkbox-outline"> <input
																	name="probeModule" type="checkbox" value="ftp">ftp
																	<span></span> </label> <label
																	class="mt-checkbox mt-checkbox-outline"> <input
																	name="probeModule" type="checkbox" value="rtsp">rtsp
																	<span></span> </label> <label
																	class="mt-checkbox mt-checkbox-outline"> <input
																	name="probeModule" type="checkbox" value="telnet">telnet
																	<span></span> </label>
															</div>
														</div>
													</div>
													<div class="form-group">
														<label class="control-label col-md-3">检测设备重启漏洞 <span
															class="required" aria-required="true">* </span> </label>
														<div class="col-md-7">
															<div class="mt-checkbox-inline">
																<label class="mt-radio mt-radio-outline">否 <input
																	type="radio" value="0" name="enableReboot" checked>
																	<span></span> </label> <label class="mt-radio mt-radio-outline">是
																	<input type="radio" value="1" name="enableReboot">
																	<span></span> </label>
															</div>
															<span class="help-block"> 是否检测会导致设备重启的漏洞? </span>
														</div>
													</div>
													<div class="form-group">
														<label class="control-label col-md-3">检测更改配置文件漏洞 <span
															class="required" aria-required="true">* </span> </label>
														<div class="col-md-7">
															<div class="mt-checkbox-inline">
																<label class="mt-radio mt-radio-outline">否 <input
																	type="radio" value="0" name="enableChange" checked>
																	<span></span> </label> <label class="mt-radio mt-radio-outline">是
																	<input type="radio" value="1" name="enableChange">
																	<span></span> </label>
															</div>
															<span class="help-block"> 是否检测会导致修改设备配置文件的漏洞? </span>
														</div>
													</div>
												</div>
											</div>
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
	<%@include file="/cp/public/footer.jsp"%>
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


	<script src="<c:url value="/public/js/common-c9ce5fd9a3.js" />"
		type="text/javascript"></script>

	<script src="<c:url value="/public/lib/jquery.validate.min.js" />"
		type="text/javascript"></script>
	<script src="<c:url value="/public/js/validate-config-9f3feb2fe8.js" />"
		type="text/javascript"></script>

	<script src="<c:url value="/public/js/create-39ed00d02d.js" />"
		type="text/javascript"></script>
	<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>