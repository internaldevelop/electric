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
  <title>${actionName }</title>
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

        var DateFormatter = {
            Patterns:{
                YEAR      : /y/g,
                MONTH     : /M/g,
                DAY       : /d/g,
                HOUR      : /H/g,
                MINUTE    : /m/g,
                SECOND    : /s/g,
                MILSECOND : /f/g
            },
            FormatPatterns:function(format){
                return eval("/"+
                    format
                        .replace(this.Patterns.YEAR,'[0-9]')
                        .replace(this.Patterns.MONTH,'[0-9]')
                        .replace(this.Patterns.DAY,'[0-9]')
                        .replace(this.Patterns.HOUR,'[0-9]')
                        .replace(this.Patterns.MINUTE,'[0-9]')
                        .replace(this.Patterns.SECOND,'[0-9]')
                        .replace(this.Patterns.MILSECOND,'[0-9]')+
                    "/g");
            },
            DateISO:function(value,format){
                var formatReg = "";
                if(value == "" || format=="")
                    return false;
                formatReg = this.FormatPatterns(format);
                return formatReg.test(value);
            }
        }

        function CheckDateTime(str){
            var reg = /^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
            var r = str.match(reg);
            if(r==null)return false;
            r[2]=r[2]-1;
            var d= new Date(r[1], r[2],r[3], r[4],r[5], r[6]);
            if(d.getFullYear()!=r[1])return false;
            if(d.getMonth()!=r[2])return false;
            if(d.getDate()!=r[3])return false;
            if(d.getHours()!=r[4])return false;
            if(d.getMinutes()!=r[5])return false;
            if(d.getSeconds()!=r[6])return false;
            return true;
        }

        function checkForm(){
            var pat=new RegExp("[^a-zA-Z0-9\_\-]","i");
            var vul_id=$("#vul_id").val();
            var vul_name=$("#vul_name").val();
            var vul_type=$("#vul_type").val();
            var vul_time=$("#vul_time").val();
//            var ret = DateFormatter.DateISO(vul_time, 'yyyy-MM-dd HH:mm:ss')
            var ret = CheckDateTime(vul_time);
            var description=$("#description").val();
            var type=$("#first_type").val();
            var brand=$("#affect_brand").val();
            var affect_product = $("#affect_product").val();
            var risklevel = $("#risklevel").val();
            var dangers = $("#dangers").val();
            if(vul_id==null || vul_id=="" || pat.test(vul_id)==true){
                $("#error").html("漏洞编号不符合要求！");
                return false;
            }
            if(vul_name==null || vul_name==""){
                $("#error").html("漏洞名称不能为空！");
                return false;
            }
             if(vul_name.length > 50){
                $("#error").html("漏洞名称不得超过50个字符");
                return false;
            }
            if (vul_type==null || vul_type=="") {
                $("#error").html("漏洞类型不能为空！");
                return false;
            }
             if (vul_type > 20) {
                $("#error").html("漏洞类型不得超过20个字符");
                return false;
            }
            if(vul_time==null || vul_time==""){
                $("#error").html("漏洞时间不能为空！");
                return false;
            }
            // if(!ret){
            //     $("#error").html("请检查输入时间！");
            //     return false;
            // }
            if (affect_product == null || affect_product == "") {
                $("#error").html("设备型号不能为空！");
                return false;
            }
            if (affect_product.length > 20) {
                $("#error").html("设备型号不得超过20个字符");
                return false;
            }
             if(type==null || type==""){
                $("#error").html("设备类型不能为空！");
                return false;
            }
              if(type.length > 20){
                $("#error").html("设备类型不得超过20个字符！");
                return false;
            }
            if(brand==null || brand==""){
                $("#error").html("设备品牌不能为空");
                return false;
            }
            if(brand.length > 20){
                $("#error").html("设备品牌不能超过20个字符");
                return false;
            }
            if (risklevel == null || risklevel=="") {
              $("#error").html("危险等级不能为空");
                return false;
            }
            if (dangers == null || dangers=="") {
              $("#error").html("漏洞危害不能为空");
                return false;
            }
            if (dangers.length > 50) {
              $("#error").html("漏洞危害不能超过50个字符");
                return false;
            }
            if(description==null || description==""){
                $("#error").html("漏洞详情不能为空！");
                return false;
            }
            if(description.length > 50){
                $("#error").html("漏洞详情不能超过50个字符！");
                return false;
            }

           
            return true;
        }

        function resetValue(){
            $("#vul_id").val("");
            $("#vul_name").val("");
            $("#vul_type").val("");
            $("#vul_time").val("");
            $("#first_type").val("");
            $("#affect_product").val("");
            $("#affect_brand").val("");
            $("#risklevel").val("");
            $("#dangers").val("");
            $("#description").val("");
            $("#Filename").val("");
        }

        function submitFrom(){
            if (checkForm()) {
                if(confirm("确定提交吗?")){
                    $.post("${pageContext.request.contextPath}/vulner_manage/vulner/save",$("#vulner").serialize(),
                        function(result){
                            var result=eval('('+result+')');
                            alert(result.info);
                            window.location.href="${pageContext.request.contextPath}/vulner_manage/vulner/list";
                        }
                    );
                }
            }
        }

        function submitFrom_file(){
            if (checkForm()){
                if(confirm("确定提交吗?")){
                    var form = new FormData(document.getElementById("vulner"));
                    $.ajax({
                        url:"${pageContext.request.contextPath}/vulner_manage/vulner/save",
                        type:"post",
                        data:form,
                        processData:false,
                        contentType:false,
                        success:function(result){
                            var result=eval('('+result+')');
                            var a = result.poc_message? result.poc_message : "";
                            alert(result.vul_message+" "+a);
                            window.location.href="${pageContext.request.contextPath}/vulner_manage/vulner/list";
                          
                        }
                    });
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
<body class="page-header-fixed page-sidebar-closed-hide-logo page-content-white">
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
                                <li><span class="glyphicon glyphicon-home"></span>&nbsp;<a href="${pageContext.request.contextPath}/vulner_manage/vulner/list">返回列表</a></li>
                                <li> > </li>
                                <li class="active"><a href="javascript:;">${actionName }</a></li>
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
                        <form class="form-horizontal" id="vulner">
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span style="color: red;margin-right: 3px;">*</span>漏洞编号：</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" maxlength="100" id="vul_id" name="vul_id" value="${vulner.vul_id }"
                                           style="width: 300px" required="required" placeholder="编号格式：xxx-yyyy-xxx...">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span style="color: red;margin-right: 3px;">*</span>漏洞名称：</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" maxlength="100" id="vul_name" name="vul_name" value="${vulner.vul_name }"
                                           style="width: 300px" placeholder="请输入漏洞名称">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span style="color: red;margin-right: 3px;">*</span>漏洞类型：</label>
                                <div class="col-sm-10">
                                    <select class="form-control" style="width: 300px" id="vul_type" name="vul_type">
                                        <option value="">请选择...</option>
                                        <option value="未知分类" ${'未知分类'==vulner.vul_type?'selected':''}>未知分类</option>
                                        <option value="弱密钥" ${'弱密钥'==vulner.vul_type?'selected':''}>弱密钥</option>
                                        <option value="口令暴力破解" ${'口令暴力破解'==vulner.vul_type?'selected':''}>口令暴力破解</option>
                                        <option value="命令注入" ${'命令注入'==vulner.vul_type?'selected':''}>命令注入</option>
                                        <option value="口令明文" ${'口令明文'==vulner.vul_type?'selected':''}>口令明文</option>
                                        <option value="拒绝服务" ${'拒绝服务'==vulner.vul_type?'selected':''}>拒绝服务</option>
                                        <option value="文件包含" ${'文件包含'==vulner.vul_type?'selected':''}>文件包含</option>
                                        <option value="目录遍历" ${'目录遍历'==vulner.vul_type?'selected':''}>目录遍历</option>
                                        <option value="硬编码" ${'硬编码'==vulner.vul_type?'selected':''}>硬编码</option>
                                        <option value="缓冲区溢出" ${'缓冲区溢出'==vulner.vul_type?'selected':''}>缓冲区溢出</option>
                                        <option value="认证缺失" ${'认证缺失'==vulner.vul_type?'selected':''}>认证缺失</option>
                                        <option value="越权访问" ${'越权访问'==vulner.vul_type?'selected':''}>越权访问</option>
                                        <option value="跨站脚本攻击" ${'跨站脚本攻击'==vulner.vul_type?'selected':''}>跨站脚本攻击</option>
                                        <option value="跨站请求伪造" ${'跨站请求伪造'==vulner.vul_type?'selected':''}>跨站请求伪造</option>
                                        <option value="验证绕过" ${'验证绕过'==vulner.vul_type?'selected':''}>验证绕过</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span style="color: red;margin-right: 3px;">*</span>漏洞时间：</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" maxlength="100" id="vul_time" name="vul_time" value="${vulner.vul_time }"
                                           style="width: 300px" required="required" placeholder="合法时间格式：yyyy-MM-dd HH:mm:ss">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span style="color: red;margin-right: 3px;">*</span>设备型号：</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" maxlength="200" id="affect_product" name="affect_product" value="${vulner.affect_product }"
                                           style="width: 300px" placeholder="多种型号以,号分隔">
                                </div>
                            </div>
                             <div class="form-group">
                                <label class="col-sm-2 control-label"><span style="color: red;margin-right: 3px;">*</span>设备类型：</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" maxlength="200" id="first_type" name="first_type" value="${vulner.first_type }"
                                           style="width: 300px" placeholder="多种类型以,号分隔">
                                </div>
                            </div>
                             <div class="form-group">
                                <label class="col-sm-2 control-label"><span style="color: red;margin-right: 3px;">*</span>设备品牌：</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" maxlength="200" id="affect_brand" name="affect_brand" value="${vulner.affect_brand }"
                                           style="width: 300px" placeholder="多种品牌以,号分隔">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span style="color: red;margin-right: 3px;">*</span>危险等级：</label>
                                <div class="col-sm-10">
                                    <select class="form-control" style="width: 300px" id="risklevel" name="risklevel">
                                        <option value="">请选择...</option>
                                        <option value="高危" ${'危急'==vulner.risklevel?'selected':''}>危急</option>
                                        <option value="高危" ${'高危'==vulner.risklevel?'selected':''}>高危</option>
                                        <option value="中危" ${'中危'==vulner.risklevel?'selected':''}>中危</option>
                                        <option value="低危" ${'低危'==vulner.risklevel?'selected':''}>低危</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span style="color: red;margin-right: 3px;">*</span>漏洞危害：</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" maxlength="500" id="dangers" name="dangers" value="${vulner.dangers }"
                                           style="width: 300px" placeholder="描述该漏洞可能造成的后果...">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span style="color: red;margin-right: 3px;">*</span>漏洞详情：</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" rows="4" maxlength="1000" id="description" name="description" required="required">${vulner.description }</textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label">验证脚本：</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="poc_filepath" name="poc_filepath" value="${vulner.poc_filepath }" readOnly="true">
                                    <textarea class="form-control" rows="8" maxlength="10000" id="poc_content" name="poc_content">${vulner.poc_content }</textarea>
                                    <p align=left></p><br>
                                    <input id="Filename" name="Filename" type="file"><br>
                                    <p align=left><b>* *** 请务必阅读以下要求，否则脚本文件无法上传！ ***</b></p>
                                    <p align=left></p><br>
                                    <p align=left>* 1. 漏洞验证脚本文件，以漏洞编号命名加".py"结尾，为Python可执行程序</p>
                                    <p align=left>* 2. 请注意！脚本文件中【类名】不能包含"-"字符，请务必将漏洞编号中的"-"替换成"_"形成类名</p>
                                    <p align=left>* 3. 文件以漏洞编号(不更改符号！)+".py"命名，程序文件格式如下：</p><br>
                                    <p align=left>"""</p>
                                    <p align=left>&emsp;&emsp;Cisco Linksys WVC54GCA absolute path traversal vulnerability</p>
                                    <p align=left>Absolute path traversal vulnerability in adm/file.cgi on the Cisco Linksys WVC54GCA wireless video camera with</p>
                                    <p align=left>firmware 1.00R24 and possibly 1.00R22 allows remote attackers to read arbitrary files via an absolute pathname in</p>
                                    <p align=left>the this_file parameter.</p>
                                    <p align=left>NOTE:</p>
                                    <p align=left>&emsp;&emsp;(1)the vulnerable parameter ('this_file') is not filtered at all whatsoever.</p>
                                    <p align=left>&emsp;&emsp;(2)traversal via a .. (dot dot) is probably also possible.</p>
                                    <p align=left></p><br>
                                    <p align=left>"""</p><br>
                                    <p align=left><i><b>class ELE_2016_001(object):</b></i></p><br>
                                    <p align=left><i><b>&emsp;&emsp;def __init__(self, host, port=80, *args, **kwargs):</b></i></p>
                                    <p align=left><i><b>&emsp;&emsp;&emsp;&emsp;pass</b></i></p>
                                    <p align=left></p><br>
                                    <p align=left><i><b>&emsp;&emsp;def verify(self):</b></i></p>
                                    <p align=left><i><b>&emsp;&emsp;&emsp;&emsp;ret = {"status": False, "data": None}</b></i></p>
                                    <p align=left><i><b>&emsp;&emsp;&emsp;&emsp;……</b></i></p>
                                    <p align=left><i><b>&emsp;&emsp;&emsp;&emsp;return ret</b></i>
                                    </p>
                                </div>
                                <%--<div class="col-md-7">--%>
                                    <%--<input name="blackListFile" type="file" accept=".txt,.json">--%>
                                    <%--<span class="help-block">--%>
                                                <%--</span>--%>
                                <%--</div>--%>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-offset-2 col-sm-10">
                                    <input type="hidden" id="s_value" name="s_value" value="${vulner.s_value }"/>
                                    <input type="hidden" id="s_method" name="s_method" value="${vulner.s_method }"/>
                                    <button type="button" class="btn btn-primary" onclick="submitFrom_file()">保存</button>&nbsp;&nbsp;
                                    <%--<button type="button" class="btn btn-primary" onclick="submitFrom()">保存</button>&nbsp;&nbsp;--%>
                                    <button type="button" class="btn btn-primary" onclick="resetValue()">重置</button>&nbsp;&nbsp;
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

<script>
    (function(){
        var value= $("#poc_filepath").val();
        console.log(value);
        if(value == "No"){
            $("#poc_content").css("display","none");
        }else{
            $("#poc_content").css("display","block");
        }
    }());
</script>
<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>
