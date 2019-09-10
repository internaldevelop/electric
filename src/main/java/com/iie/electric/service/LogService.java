package com.iie.electric.service;

import com.iie.electric.constant.LogConst;
import com.iie.electric.dao.LogDao;
import com.iie.electric.entity.Log;
import com.iie.electric.entityview.PageNation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

/**
 * Created by bo on 2019/1/11.
 */
@Service
public class LogService extends BaseService {
    @Autowired
    private LogDao logDao;
    @Autowired
    private GlobalVarService globalVarService;

    public PageNation getLogPageNation(int page, int perPage) {
        int allLogNum = logDao.countLog();
        return super.getPageNation(allLogNum, page, perPage);
    }

    public ArrayList<Log> getPageLogList(int page, int perPageNum) {
        int begin = (page - 1) * perPageNum;
        int offset = perPageNum;
        return logDao.listPageLog(begin, offset);
    }

    private Log constructLog(String type, String userName, String desc) {
        int logFlag = globalVarService.getLogFlag();
        if (logFlag == 1) {
            Log log = new Log();
            log.setType(type);
            log.setUser(userName);
            SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            log.setDate(sf.format(new Date()));
            log.setDesc(desc);
            return log;
        }
        return null;
    }

    //记录登录
    public void loggerLogin(String userName, String desc) {
        Log log = constructLog(LogConst.LOGIN, userName, desc);
        if (log != null) {
            logDao.addLog(log);
        }
    }

    public void loggerCreateProject(String userName, String desc) {
        Log log = constructLog(LogConst.PROJECT, userName, desc);
        if (log != null) {
            logDao.addLog(log);
        }
    }

    public void loggerDeleteProject(String userName, String desc) {
        Log log = constructLog(LogConst.PROJECT, userName, desc);
        if (log != null) {
            logDao.addLog(log);
        }
    }

    public void loggerDeleteTask(String userName, String desc) {
        Log log = constructLog(LogConst.TASK, userName, desc);
        if (log != null) {
            logDao.addLog(log);
        }
    }

    public void loggerDeleteChecker(String userName, String desc) {
        Log log = constructLog(LogConst.USER, userName, desc);
        if (log != null) {
            logDao.addLog(log);
        }
    }

    public void loggerAddChecker(String userName, String desc) {
        Log log = constructLog(LogConst.USER, userName, desc);
        if (log != null) {
            logDao.addLog(log);
        }
    }

    public void loggerError(String userName, String desc) {
        Log log = constructLog(LogConst.ERROR, userName, desc);
        if (log != null) {
            logDao.addLog(log);
        }
    }

}
