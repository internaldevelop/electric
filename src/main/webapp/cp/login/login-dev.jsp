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
<title>登录</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1" name="viewport"/>
<meta content="" name="description"/>
<meta content="" name="author"/>
 <!-- BEGIN GLOBAL MANDATORY STYLES -->
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/font-awesome/css/font-awesome.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap/css/bootstrap.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" />" rel="stylesheet" type="text/css" />
<!-- END GLOBAL MANDATORY STYLES -->
<!-- BEGIN THEME GLOBAL STYLES -->
<link href="<c:url value="/public/lib/metronic/assets/global/css/components.min.css" />" rel="stylesheet" id="style_components" type="text/css" />
<link href="<c:url value="/public/lib/metronic/assets/global/css/plugins.min.css" />" rel="stylesheet" type="text/css" />
<!-- END THEME GLOBAL STYLES -->
<!-- BEGIN PAGE LEVEL STYLES -->
<link href="<c:url value="/public/lib/metronic/assets/pages/css/lock.min.css" />" rel="stylesheet" type="text/css" />
<!-- END PAGE LEVEL STYLES -->
<!-- BEGIN THEME LAYOUT STYLES -->
<!-- END THEME LAYOUT STYLES -->
<link rel="shortcut icon" href="<c:url value="/public/img/favicon.ico" />" type="image/x-icon" />
<!-- END THEME STYLES -->
<link href="<c:url value="/public/css/common.css" />" rel="stylesheet" type="text/css"/>
<link href="<c:url value="/public/css/login.css" />" rel="stylesheet" type="text/css"/>

</head>
<body class="login">
	<div class="page-lock">
        <div class="page-body">
            <div class="lock-head logo"> 视频监控安全测评 </div>
            <div class="lock-body">
				<c:if test="${bizMsg ne ''}">
            		<div class="alert alert-danger">
						<i class="fa fa-minus-circle"></i>
            			<p class="content">${bizMsg}</p>
            		</div>
				</c:if>
                <form class="lock-form pull-left" action="login_check" method="POST">
                	<div class="form-group">
                		<select name="usertype">
                			<option value="admin">管理员</option>
                			<option value="checker">检查员</option>
                		</select>
                	</div>
                    <div class="form-group">
                        <input class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="" name="username" value="admin" />
                    </div>
                    <div class="form-group">
                        <input class="form-control placeholder-no-fix" type="password" value="admin" autocomplete="off" placeholder="密码" autofocus name="password" />
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn uppercase">登&nbsp;&nbsp;录</button>
                    </div>
                </form>
            </div>
            <div class="lock-bottom">
            </div>
        </div>
        <div class="page-footer-custom"> ©2016 中国科学院信息工程研究所 版权所有 </div>
    </div>
	<script src="<c:url value="/public/lib/metronic/assets/global/plugins/jquery.min.js" />" type="text/javascript"></script>
	<script src="<c:url value="/public/lib/jquery.validate.min.js" />" type="text/javascript"></script>
	<script src="<c:url value="/public/lib/md5.js" />" type="text/javascript"></script>
	<script>
	    var mask = '${mask}';

	    $( 'form' ).submit( function( e ) {
	      var pw = $( 'input[name="password"]' );

	      if( pw.val().trim() !== '' ) {
	        pw.val( hex_md5( pw.val().trim() + mask ) );

	        return true;
	      }

	      //e.preventDefault();
	      return false;
	    } )

	    $.extend($.validator.messages, {
			required: "这是必填字段",
		});

		$( 'form' ).validate( {
		    rules: {
		    	username: 'required',
		    	password: 'required'
		    }
		} );
	</script>
</body>
</html>