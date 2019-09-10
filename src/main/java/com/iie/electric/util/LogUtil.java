package com.iie.electric.util;

import org.apache.log4j.Logger;

public class LogUtil {
	private static final Logger taskCmd = Logger.getLogger("runTaskCmdFile");
	private static final Logger taskResult = Logger.getLogger("taskResultFile");
	private static final Logger scError = Logger.getLogger("scErrorFile");
	private static final Logger deepScan = Logger.getLogger("deepScanFile");
	
	//保存每次任务调用控制子软件的命令参数
	public static void taskCmdLog(String cmd){
		taskCmd.debug(cmd);
	}
	
	//保存每次任务执行的结果
	public static void taskResultLog(String result){
		taskResult.debug(result);
	}
	
	//控制子软件错误
	public static void scErrorLog(String error){
		scError.debug(error);
	}

	//深度扫描
	public static void deepScanLog(String scan){
		deepScan.debug(scan);
	}
}
