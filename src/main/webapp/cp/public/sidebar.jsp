<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" import="com.iie.electric.entity.User" %>

<div class="page-sidebar-wrapper" style="position:fixed;z-index:2">
        <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
        <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
        <div class="page-sidebar navbar-collapse collapse">
            <!-- BEGIN SIDEBAR MENU -->
      <%
        //获取上下文路径
        String contextPath = request.getContextPath();
        //获取真实姓名
        String userType = ((User)request.getSession().getAttribute("USER_CONTEXT")).getUserType();
        //如果是superAdmin，那么它也是asmin用户
        Boolean isAdmin = false;
        Boolean isSuperAdmin = false;
        Boolean isAudit = false;
        Boolean isChecker = false;
        int enableManageVulLib = ((User)request.getSession().getAttribute("USER_CONTEXT")).getEnableManageVulLib();

        if( userType.equals( "admin" ) ) {
          isAdmin = true;
        } else if( userType.equals( "superAdmin" ) ) {
          isAdmin = true;
          isSuperAdmin = true;
        }else if( userType.equals( "checker" ) ) {
          isChecker = true;
        }else if( userType.equals( "audit" ) ) {
          isAudit = true;
        }
      %>
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
          <%
            if( isAdmin == true ) {
              String checker = "<li class=\"nav-item start checker\">" +
                          "<a href=\"" + contextPath + "/config/checker\" class=\"nav-link\">" +
                              "<i class=\"fa fa-group\"></i> " +
                              "<span class=\"title\">用户管理</span>" +
                              "<span class=\"selected\"></span>" +
                          "</a>" +
                       "</li>"+
            "<li class=\"nav-item start log\">" +
                          "<a href=\"" + contextPath + "/log\" class=\"nav-link\">" +
                              "<i class=\"fa fa-file-text-o\"></i> " +
                              "<span class=\"title\">日志管理</span>" +
                              "<span class=\"selected\"></span>" +
                          "</a>" +
                       "</li>"+
                        "<li class=\"nav-item start user\">" +
                          "<a href=\"" + contextPath + "/config/user\" class=\"nav-link \">" +
                              "<i class=\"fa fa-user\"></i>" +
                              "<span class=\"title\" style=\"padding-left: 3px;\">账号管理</span>" +
                              "<span class=\"selected\"></span>" +
                         " </a>" +
                      "</li>" +
                      "<li class=\"nav-item start email\">" +
                         " <a href=\"" + contextPath + "/config/email\" class=\"nav-link\">" +
                              "<i class=\"fa fa-inbox\"></i>" +
                             " <span class=\"title\">邮箱管理</span>" +
                             " <span class=\"selected\"></span>" +
                          "</a>" +
                      "</li>";
              out.print(checker);
            }else if( isAudit == true ){
              String checker =  "<li class=\"nav-item start user\">" +
                          "<a href=\"" + contextPath + "/config/user\" class=\"nav-link \">" +
                              "<i class=\"fa fa-user\"></i>" +
                              "<span class=\"title\" style=\"padding-left: 3px;\">账号管理</span>" +
                              "<span class=\"selected\"></span>" +
                         " </a>" +
                      "</li>" +
                      "<li class=\"nav-item start log\">" +
                            "<a href=\"" + contextPath + "/log\" class=\"nav-link\">" +
                                "<i class=\"fa fa-file-text-o\"></i> " +
                                "<span class=\"title\">日志管理</span>" +
                                "<span class=\"selected\"></span>" +
                            "</a>" +
                         "</li>";
               out.print(checker);          
            }else if(isChecker == true){
              String checker =  "<li class=\"nav-item start user\">" +
                          "<a href=\"" + contextPath + "/config/user\" class=\"nav-link \">" +
                              "<i class=\"fa fa-user\"></i>" +
                              "<span class=\"title\" style=\"padding-left: 3px;\">账号管理</span>" +
                              "<span class=\"selected\"></span>" +
                         " </a>" +
                      "</li>" +
                      "<li class=\"nav-item start email\">" +
                         " <a href=\"" + contextPath + "/config/email\" class=\"nav-link\">" +
                              "<i class=\"fa fa-inbox\"></i>" +
                             " <span class=\"title\">邮箱管理</span>" +
                             " <span class=\"selected\"></span>" +
                          "</a>" +
                      "</li>";
                      out.print(checker); 
            }
              
          %>
         
    

          <%
            if( enableManageVulLib == 1 ) {
              String vulLib = "<li class=\"nav-item start vulner\">" +
                                "<a href=\"" + contextPath + "/vulner_manage/vulner/list\" class=\"nav-link\">" +
                                  "<i class=\"fa fa-user\"></i>" +
                                  "<span class=\"title\">用户漏洞</span>" +
                                  "<span class=\"selected\"></span>" +
                                "</a>" +
                              "</li>" +
                              "<li class=\"nav-item start banner\">" +
                                "<a href=\"" + contextPath + "/banner\" class=\"nav-link\">" +
                                  "<i class=\"fa fa-user\"></i>" +
                                  "<span class=\"title\">用户指纹</span>" +
                                  "<span class=\"selected\"></span>" +
                                "</a>" +
                              "</li>";
              out.print(vulLib);
            }
          %>
      </ul>
            <!-- END SIDEBAR MENU -->
        </div>
    </div>