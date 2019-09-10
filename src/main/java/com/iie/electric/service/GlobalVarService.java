package com.iie.electric.service;

import com.iie.electric.dao.GlobalVarDao;
import com.iie.electric.entity.GlobalVar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GlobalVarService {
    @Autowired
    private GlobalVarDao globalVarDao;

    public int getLogFlag() {
        GlobalVar globalVar = globalVarDao.getGlobalVar("log");
        if (globalVar != null) {
            return Integer.parseInt(globalVar.getValue());
        }
        return 1;
    }

    public void updateLogFlag(int flag) {
        globalVarDao.updateLogFlag(flag+"");
    }

}
