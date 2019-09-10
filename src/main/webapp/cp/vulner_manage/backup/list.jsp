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
    <title>备份列表</title>
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
          href="<c:url value="/public/css/project_list-444315aa4a.css" />"
          type="text/css">

    <!-- END THEME STYLES -->
    <link rel="shortcut icon" href="<c:url value="/public/img/favicon.ico" />" type="image/x-icon" />

    <script
            src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery.min.js" />"
            type="text/javascript"></script>
    <script type="text/javascript">
        window.G = {
            userType: '${userType}'
        }
    </script>

    <script type="text/javascript">
        function backupRecover(id,time,remark){
            if(confirm("确定要恢复数据库吗?")){
                $.post("${pageContext.request.contextPath}/vulner_manage/backup/recover",{id:id,time:time,remark:remark},
                    function(result){
                        var result=eval('('+result+')');
                        alert(result.info);
                        window.location.href="${pageContext.request.contextPath}/vulner_manage/vulner/list";
                    }
                );
            }
        };

        function backupDelete(id,time,remark){
            if(confirm("确定要删除这条记录吗?")){
                $.post("${pageContext.request.contextPath}/vulner_manage/backup/delete",{id:id,time:time,remark:remark},
                    function(result){
                        var result=eval('('+result+')');
                        alert(result.info);
                        window.location.href="${pageContext.request.contextPath}/vulner_manage/backup/list";
                    }
                );
            }
        };
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
<div class="page-container ">
    <!-- BEGIN SIDEBAR -->
    <%@include file="/WEB-INF/cp/public/sidebar.jsp"%>
    <script>
        $('.page-sidebar-menu li.vulner').addClass('active open');
    </script>
    <!-- END SIDEBAR -->
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content row">
            <!-- BEGIN STYLE CUSTOMIZER -->
            <!-- END STYLE CUSTOMIZER -->
            <!-- BEGIN PAGE HEADER-->
            <div class="col-md-10">
                <div class="row">
                    <div class="col-md-12">
                        <!-- BEGIN PAGE TITLE & BREADCRUMB-->
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li><i class="icon-bar-chart"></i> <a href="javascript:;">备份列表</a>
                                </li>
                            </ul>
                        </div>
                        <!-- END PAGE TITLE & BREADCRUMB-->
                    </div>
                </div>
                <!-- END PAGE HEADER-->
                <div class="row main-content">
                    <div class="col-md-12">
                        <div class="row search" style="padding-bottom:2mm;">
                            <div class="col-md-8">
                                <form action="${pageContext.request.contextPath}/vulner_manage/backup/list" method="post">
                                    <div class="input-group" style="width: 300px">
                                        <input type="text" class="form-control" maxlength="100" name="time" value="${s_backup.time }" placeholder="请输入查询关键字...">
                                        <span class="input-group-btn">
                                            <button class="btn btn-default" type="submit"><span class="glyphicon glyphicon-search"></span>&nbsp;查询</button>
                                        </span>
                                    </div>
                                </form>
                            </div>
                            <div class="col-md-4 row" style="float: right;">
                                <div class="col-md-6" >
                                    <button type="button" class="btn btn-primary" style="float: right;" onclick="javascript:window.location.href='${pageContext.request.contextPath}/vulner_manage/backup/pre_add_backup'">新建备份</button>
                                </div>
                                <div class="col-md-6" style="float: right;">
                                    <button type="button" class="btn btn-primary" style="float: right;" onclick="javascript:window.location.href='${pageContext.request.contextPath}/vulner_manage/backup/preUpload'">上传备份文件</button>
                                </div>
                            </div>
                        </div>

                        <div id="table"></div>
    <%--添加部分——————用于显示备份记录表--%>
                            <table data-reactroot="" class="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>编号</th>
                                    <th>备份时间</th>
                                    <th>备份说明</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>

                                <c:forEach var="backup" items="${backupList }" varStatus="status">
                                    <tr>
                                        <td>${status.index+1 }</td>
                                        <td>${backup.time }</td>
                                        <td>${backup.remark }</td>
                                        <td>
                                            <button type="button" class="btn btn-info btn-xs" onclick='backupRecover("${backup.id }","${backup.time }","${backup.remark }")'>恢复</button>
                                            <button type="button" class="btn btn-info btn-xs" onclick="javascript:window.location.href='${pageContext.request.contextPath}/vulner_manage/backup/export?id=${backup.id }&time=${backup.time }&remark=${backup.remark }'">导出</button>
                                            <button type="button" class="btn btn-danger btn-xs" onclick='backupDelete("${backup.id }","${backup.time }","${backup.remark }")'>删除</button>
                                        </td>
                                    </tr>
                                </c:forEach>

                                </tbody>
                            </table>

                            <nav >
                                <ul class="pagination">
                                    ${pageCode }
                                </ul>
                            </nav>
    <%--表结束--%>
                        <div class="page relative center">
                            <ul id="project-page"></ul>
                            <div class="page-mask"></div>
                        </div>
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
        <!-- END CONTENT -->
    </div>
</div>
<%--<div class="modal fade in" id="popModal" tabindex="-1" data-backdrop="static" role="basic" aria-hidden="true">--%>
    <%--<div class="modal-dialog">--%>
        <%--<div class="modal-content">--%>
            <%--<div class="modal-header">--%>
                <%--<h4 class="modal-title"></h4>--%>
            <%--</div>--%>
            <%--<div class="modal-body">--%>

            <%--</div>--%>
            <%--<div class="modal-footer">--%>
                <%--<button type="button" class="btn ok">确 定</button>--%>
                <%--<button type="button" class="btn cancel"--%>
                        <%--data-dismiss="modal">取 消</button>--%>
            <%--</div>--%>
        <%--</div>--%>
        <%--<!-- /.modal-content -->--%>
    <%--</div>--%>
    <%--<!-- /.modal-dialog -->--%>
<%--</div>--%>
<!-- END CONTAINER -->
<%@include file="/WEB-INF/cp/public/footer.jsp"%>

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
<script src="<c:url value="/public/lib/jquery.validate.min.js" />"
        type="text/javascript"></script>
<%--<script src="<c:url value="/public/js/common-c9ce5fd9a3.js" />"--%>
        <%--type="text/javascript"></script>--%>
<%--<script src="<c:url value="/public/js/validate-config-9f3feb2fe8.js" />"--%>
        <%--type="text/javascript"></script>--%>
<%--<script src="<c:url value="/public/js/subscribe-6dce02cc75.js" />"--%>
        <%--type="text/javascript"></script>--%>
<%--<script src="<c:url value="/public/js/project_list-aa8d6bd556.js" />"--%>
        <%--type="text/javascript"></script>--%>
</body>
<!-- END BODY -->
</html>