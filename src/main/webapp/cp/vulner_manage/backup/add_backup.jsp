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
    <title>新建备份</title>
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
        function checkinput(){
            var pat=new RegExp("[^a-zA-Z0-9\_\u4e00-\u9fa5]","i");
            var strTest = $("#remark").val();
            if(strTest==null || strTest==""){
                $("#error").html("备份说明不能为空！");
                return false;
            }
            if(pat.test(strTest)==true)
            {
                alert("包含非法字符！请重新输入！");
                return false;
            }
            return true;
        }

        function submitFrom(){
            if (checkinput()){
                if(confirm("确定新建此备份吗?")){
                    $.post("${pageContext.request.contextPath}/vulner_manage/backup/add_backup",$("#backup").serialize(),
                        function(result){
                            var result=eval('('+result+')');
                            alert(result.info);
                            window.location.href="${pageContext.request.contextPath}/vulner_manage/backup/list";
                        }
                    );
                }
            }
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
        $('.page-sidebar-menu li.vulner').addClass('active open');
        /*$('.page-sidebar-menu li.project').find('.arrow').addClass('open');
         $('.page-sidebar-menu li.project li.create_project').addClass(
         'active');*/
    </script>
    <!-- END SIDEBAR -->
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content row">
            <!-- BEGIN PAGE HEADER-->
            <div class="col-md-10">
                <div class="row">
                    <div class="col-md-12">
                        <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                        <div class="page-bar" style="border-bottom:none;">
                            <ul class="page-breadcrumb">
                                <li><span class="glyphicon glyphicon-home"></span>&nbsp;<a href="${pageContext.request.contextPath}/vulner_manage/backup/list">返回列表</a></li>
                                <li> > </li>
                                <li><a href="javascript:;">新建备份</a></li>
                            </ul>
                        </div>
                        <!-- END PAGE TITLE & BREADCRUMB-->
                    </div>
                </div>
                <!-- END PAGE HEADER-->

                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">${actionName }</h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal" id="backup">
                            <div class="form-group">
                                <label class="col-sm-2 control-label">备份ID：</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" maxlength="100" id="id" name="id" value="${backup.id }" style="width: 300px" readOnly="true">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">备份时间：</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" maxlength="100" id="time" name="time" value="${backup.time }" style="width: 300px" readOnly="true">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">备份说明：</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" maxlength="500" id="remark" name="remark" value="${backup.remark }" maxlength="15" style="width: 300px"
                                           required="required" placeholder="十五个字符以内，请勿包含特殊字符...">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-offset-2 col-sm-10">
                                    <button type="button" class="btn btn-primary" onclick="submitFrom()">提交备份</button>&nbsp;&nbsp;
                                    <font color="red" id="error"></font>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="list-group">
                    <a href="javascript:;" class="list-group-item active">漏洞库管理</a>
                    <a href="${pageContext.request.contextPath}/vulner_manage/vulner/list" class="list-group-item">漏洞管理</a>
                    <a href="${pageContext.request.contextPath}/vulner_manage/backup/list" class="list-group-item">备份恢复</a>
                </div>
            </div>
        </div>
    </div>
</div>
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

<script src="<c:url value="/public/lib/jquery.validate.min.js" />"
        type="text/javascript"></script>
<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>