<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" import="com.iie.electric.entity.User" %>

<div class="page-sidebar-wrapper" style="position:fixed;z-index:2">
		<!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
		<!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
		<div class="page-sidebar navbar-collapse collapse">
			<!-- BEGIN SIDEBAR MENU -->
			 <ul class="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" style="padding-top: 20px">
          <li class="nav-item start project_list">
              <a href="<%=request.getContextPath()%>/project/project_list" class="nav-link ">
                  <i class="icon-bar-chart"></i>
                  <span class="title">项目列表</span>
                  <span class="selected"></span>
              </a>
          </li>
          <li class="nav-item start create_project">
              <a href="<%=request.getContextPath()%>/project/create_project" class="nav-link ">
                  <i class="fa fa-plus-square"></i>
                  <span class="title">新建项目</span>
                  <span class="selected"></span>
              </a>
          </li>
          <li class="nav-item start network">
              <a href="<%=request.getContextPath()%>/config/network" class="nav-link ">
                  <i class="fa fa-globe"></i>
                  <span class="title">网络设置</span>
                  <span class="selected"></span>
              </a>
          </li>
          <li class="nav-item start checker">
            <a href="<%=request.getContextPath()%>/config/checker" class="nav-link">
                <i class="fa fa-group"></i>
                <span class="title">检查员管理</span>
                <span class="selected"></span>
            </a>
          </li>
          <li class="nav-item start user">
              <a href="<%=request.getContextPath()%>/config/user" class="nav-link ">
                  <i class="fa fa-user"></i>
                  <span class="title">账号管</span>
                  <span class="selected"></span>
              </a>
          </li>
      </ul>
			<!-- END SIDEBAR MENU -->
		</div>
	</div>