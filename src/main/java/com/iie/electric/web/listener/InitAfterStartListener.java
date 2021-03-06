package com.iie.electric.web.listener;

import com.iie.electric.service.ProjectService;
import com.iie.electric.service.TaskService;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * Created by bo on 2017/3/23.
 */
public class InitAfterStartListener implements ServletContextListener {
    WebApplicationContext context;

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        context = ContextLoader.getCurrentWebApplicationContext();
        TaskService taskService = (TaskService) context.getBean("taskService");
        ProjectService projectService = (ProjectService) context.getBean("projectService");
        taskService.endUnfinishedTask();
        projectService.endUnfinishedProject();
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        try {
            String cmd = "kill -9 `ps -ef | grep '/root/CyberPecker' | grep -v grep | awk '{print $2}'`";
            Runtime.getRuntime().exec(new String[]{"/bin/sh", "-c", cmd});
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
