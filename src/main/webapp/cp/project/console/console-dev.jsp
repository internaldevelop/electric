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
<title>控制台</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1" name="viewport"/>
<meta content="" name="description"/>
<meta content="" name="author"/>
<!-- BEGIN GLOBAL MANDATORY STYLES -->
<link href="<c:url value="/lib/metronic/assets/global/plugins/font-awesome/css/font-awesome.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/lib/metronic/assets/global/plugins/font-awesome/css/font-awesome.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/lib/metronic/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/lib/metronic/assets/global/plugins/bootstrap/css/bootstrap.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/lib/metronic/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" />" rel="stylesheet" type="text/css" />
<!-- END GLOBAL MANDATORY STYLES -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN THEME GLOBAL STYLES -->
<link href="<c:url value="/lib/metronic/assets/global/css/components.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/lib/metronic/assets/global/css/plugins.min.css" />" rel="stylesheet" type="text/css" />
<!-- END THEME GLOBAL STYLES -->
<!-- BEGIN THEME LAYOUT STYLES -->
<link href="<c:url value="/lib/metronic/assets/layouts/layout/css/layout.min.css" />" rel="stylesheet" type="text/css" />
<link href="<c:url value="/lib/metronic/assets/layouts/layout/css/themes/darkblue.min.css" />" rel="stylesheet" type="text/css" id="style_color" />
<link href="<c:url value="/lib/metronic/assets/layouts/layout/css/custom.min.css" />" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<c:url value="/lib/sweet-alert/sweet-alert.css" />" type="text/css">

<link rel="stylesheet" href="<c:url value="/css/common.css" />" type="text/css">

<!-- END THEME STYLES -->
<style>
	/*控制台*/
	.console{ height: 200px; }
	.console.x-show{ display: block; animation: fadein 2s; animation-fill-mode: forwards; }
	.console.x-hide{ display: none; animation: fadeout 2s; animation-fill-mode: forwards; }
	.console.all{ height: 400px; }
	.console .header{ padding: 6px; border: 1px solid #000; }
	.console.all .content{ height: 370px; }
	.console .content{ height: 170px; overflow: auto; border: 1px solid #000; border-top: none; background: #000; color: #fff; }
	.console .content p{ padding: 6px 2px; }
	
	.error{ color: #f00; }
	
	@keyframes fadein{
		0%{
			transform: scale(0);
		}
		100%{
			transform: scale(1);
		}
	}
	@keyframes fadeout{
		0%{
			transform: scale(1);
		}
		100%{
			transform: scale(0);
		}
	}
</style>
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
			<!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			
			<!-- /.modal -->
			<!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			<!-- BEGIN STYLE CUSTOMIZER -->
			
			<!-- BEGIN PAGE HEADER-->
			<!-- BEGIN PAGE HEADER-->
			<div class="row">
				<div class="col-md-12">
					<!-- BEGIN PAGE TITLE & BREADCRUMB-->
					<div class="page-bar" style="border-bottom:none;">
                        <ul class="page-breadcrumb">
                        	<li>
                        		<i class="fa fa-user-md"></i>
                                <a href="index.html">控制台</a>
                            </li>
                        </ul>
                    </div>
					<!-- END PAGE TITLE & BREADCRUMB-->
				</div>
			</div>
			<!-- END PAGE HEADER-->
			<!-- END PAGE HEADER-->
			<div class="clearfix"></div>
			<div class="mt-checkbox-inline">
                <label class="mt-radio mt-radio-outline">全部
                    <input type="radio" value="all" name="ctrl" checked>
                    <span></span>
                </label>
                <label class="mt-radio mt-radio-outline">子功能
                    <input type="radio" value="sub" name="ctrl">
                    <span></span>
                </label>
            </div>
			<div id="consoles" class="row"></div>
		</div>
	</div>
	<!-- END CONTENT -->
</div>
<!-- END CONTAINER -->
<!-- BEGIN FOOTER -->
<%@include file="/cp/public/footer.jsp" %>
<!-- END FOOTER -->
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<!-- BEGIN CORE PLUGINS -->
<script>
	var X = {
		taskId: '${taskid}',
		projectId: '${projectid}',
		tplDevice: '',
		root: '<%=request.getContextPath()%>'
	};
</script>

<script src="<c:url value="/lib/metronic/assets/global/plugins/jquery.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/lib/metronic/assets/global/plugins/bootstrap/js/bootstrap.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/lib/metronic/assets/global/scripts/app.min.js" />" type="text/javascript"></script>
<script src="<c:url value="/lib/metronic/assets/layouts/layout/scripts/layout.min.js" />" type="text/javascript"></script>

<script src="<c:url value="/lib/sweet-alert/sweet-alert.min.js" />" type="text/javascript"></script>
<script type="text/javascript" src="<c:url value="/lib/react-15.3.0/build/react.js" />"></script>
<script type="text/javascript" src="<c:url value="/lib/react-15.3.0/build/react-dom.js" />"></script>
<script src="<c:url value="/lib/react-15.3.0/build/browser.min.js" />"></script>

<script src="<c:url value="/js/common.js" />" type="text/javascript"></script>

<script>
	$( '.page-sidebar-menu li.print' ).addClass( 'active' );
	
	//整个控制台组件，可以通过rConsole.setState({message:....})进行打印信息的添加
	//考虑到打印信息比较多，就采用直接操作DOM的方式来添加打印信息，否则messages数组保存的东系太多了
	var rConsole; 
	var messageObj = [
		{
			key: 'all',
			name: '全部打印信息',
			messages: []
		},
		{
			key: 'HD',
			name: 'h子软件',
			messages: []
		},
		{
			key: 'SD',
			name: 's子软件',
			messages: []
		},
		{
			key: 'OD',
			name: 'o子软件',
			messages: []
		},
		{
			key: 'DR',
			name: 'd子软件',
			messages: []
		},
		{
			key: 'WP',
			name: 'w子软件',
			messages: []
		},
		{
			key: 'VS',
			name: 'v子软件',
			messages: []
		},
		{
			key: 'SC',
			name: '控制子软件',
			messages: []
		}
	];
</script>

<script type="text/babel">

	var Message = React.createClass({
	  render: function() {
	    return (
	    	<p>
	    		{this.props.text}
	    	</p>
	    )
	  }
	});

	var Console = React.createClass({
		render: function() {
			var messageArr = [],
				classes;

			this.props.info.messages.forEach( function( val ) {
				messageArr.push( <Message key={val} text={val}/> );
			} )
			
			if( this.props.info.key === 'all' ) {
				classes = 'console col-lg-6 col-md-6 col-sm-12 col-xs-12 x-show ' + this.props.info.key;
			} else {
				classes = 'console col-lg-4 col-md-4 col-sm-6 col-xs-6 x-hide ' + this.props.info.key;
			}
		    return (
		    	<div className={classes}>
					<div className="header">{this.props.info.name}</div>
					<div className="content">
						{messageArr}
					</div>
		    	</div>
		    )
		     
		}
	});

	var Content = React.createClass({
		getInitialState: function() {
			return {
				message: messageObj
			}
		},
		render: function() {
			var i,
				consoles = [];

			for( i = 0; i < this.state.message.length; i++ ) {
				consoles.push(
					<Console key={i} info={this.state.message[ i ]}/>
				);
			}
			return (
		    	<div className="console-wrap" >
					{consoles}
		    	</div>
		    )
		}
	});

	rConsole = ReactDOM.render(
	  <Content/>,
	  document.getElementById( 'consoles' )
	);

</script>
<script src="<c:url value="/cp/project/console/console.js" />" type="text/javascript"></script>
</body>
<!-- END BODY -->
</html>