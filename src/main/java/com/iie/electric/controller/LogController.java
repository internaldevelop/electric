package com.iie.electric.controller;

import com.iie.electric.entity.Log;
import com.iie.electric.entityview.PageNation;
import com.iie.electric.service.GlobalVarService;
import com.iie.electric.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by bo on 2019/1/11.
 */
@Controller
public class LogController {
    @Autowired
    private LogService logService;
    @Autowired
    private GlobalVarService globalVarService;

    @RequestMapping("/log")
    public String loadLogPage(ModelMap modelMap) {
        int flag = globalVarService.getLogFlag();
        modelMap.put("flag", flag);
        return "/log/log";
    }

    //获取检查员的列表
    @RequestMapping(value = "/log_list")
    @ResponseBody
    public Map<String, Object> getLogList(@RequestParam("page") int page,
                                          @RequestParam("perPage") int perPage) {
        Map<String, Object> modelMap = new HashMap<>();
        PageNation pageNation = logService.getLogPageNation(page, perPage);
        ArrayList<Log> logList = logService.getPageLogList(page, perPage);
        modelMap.put("bizNo", 1);
        modelMap.put("bizMsg", "");
        modelMap.put("pagenation", pageNation);
        modelMap.put("logList", logList);
        return modelMap;
    }

    @RequestMapping(value = "/update_log_flag")
    @ResponseBody
    public Map<String, Object> updateLogFlag(@RequestParam("flag") int flag) {
        Map<String, Object> modelMap = new HashMap<>();
        globalVarService.updateLogFlag(flag);
        modelMap.put("bizNo", 1);
        modelMap.put("bizMsg", "");
        return modelMap;
    }

}
