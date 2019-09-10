package com.iie.electric.service;

import java.security.interfaces.RSAPrivateKey;
import java.util.ArrayList;
import java.util.Map;

import com.iie.electric.dao.UserDao;
import com.iie.electric.entity.Task;
import com.iie.electric.entity.User;
import com.iie.electric.entityview.PageNation;
import com.iie.electric.util.Constant;

import com.iie.electric.util.PasswordUtil;
import com.iie.electric.util.RSAUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cryptix.jce.provider.MD5;

@Service
public class UserService extends BaseService {
    @Autowired
    private UserDao userDao;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private TaskService taskService;
    @Autowired
    private TaskResultService taskResultService;

    //检查登录用户，判断是否登录正确
    public int checkLoginUser(String userType, String userName, String passwd, String randomKey) {
        User user = userDao.getUserByTypeAndName(userType, userName);
        if (user == null) { //用户不存在
            return Constant.USER_NOT_EXIST;
        } else {
            long interval = System.currentTimeMillis() - user.getLastLoginTime();//此次登录与上次登录的间隔
            if ((user.getLeftTryNum() == 0) && (interval <= Constant.LOGIN_INTERVAL)) {
                return Constant.USER_LOCKED;
            } else {
                String password = new MD5().toMD5(user.getPasswd() + randomKey).toLowerCase();
                if (!password.equals(passwd)) {
                    return Constant.USER_PASSWD_ERROR;
                }
            }
        }
        return Constant.USER_LOGIN_SUCCESS;
    }

    //通过用户名查找用户
    public User getUserByUserName(String userName) {
        return userDao.getUserByUserName(userName);
    }

    //更新用户的登录状态
    public void updateUserLoginState(String userName, int leftTryNum, long lastLoginTime) {
        userDao.updateUserLoginState(userName, leftTryNum, lastLoginTime);
    }

    //修改账户信息(1:修改成功,-1:密码不对,-2:两次输入新密码不一致)
    public int changeUserInfo(String userName, String realName, String orgPasswd,
                              String newPasswd, String confirmNewPasswd, Map<String, Object> rsaKey) throws Exception {
        RSAPrivateKey privateKey = (RSAPrivateKey) rsaKey.get("private");
        orgPasswd = RSAUtil.decryptByPrivateKey(orgPasswd, privateKey);
        newPasswd = RSAUtil.decryptByPrivateKey(newPasswd, privateKey);
        confirmNewPasswd = RSAUtil.decryptByPrivateKey(confirmNewPasswd, privateKey);

        User user = userDao.getUserByUserName(userName);

        if (!PasswordUtil.checkPasswd(newPasswd)) {
            return -4;
        }
        if (newPasswd.contains(userName)) { //不能包含用户名或者与用户名相同
            return -5;
        }
        if (!newPasswd.equals(confirmNewPasswd)) {
            return -2;
        }

        orgPasswd = new MD5().toMD5(userName + orgPasswd).toLowerCase();
        newPasswd = new MD5().toMD5(userName + newPasswd).toLowerCase();
        // 用户输入的密码不对
        if (!orgPasswd.equals(user.getPasswd())) {
            return -1;
        }
        if (newPasswd.equals(user.getPasswd())) { //新密码跟用户之前的密码一样(相当于没有修改)
            return -3;
        }
        userDao.changeUserInfo(userName, realName, newPasswd);
        return 1;
    }

    //
    public PageNation getCheckerPageNation(int page, int perPage) {
        int allCheckerNum = userDao.countChecker();
        return super.getPageNation(allCheckerNum, page, perPage);
    }

    //删除检查员
    public int deleteChecker(String checkerName) {
        int num = userDao.hasAlreadyExitsChecker(checkerName);
        if (num == 0) {
            return -1;
        }
        userDao.deleteChecker(checkerName);
        //删除检查员创建的项目、任务、任务结果、报表等
        ArrayList<Task> taskList = taskService.getCheckerTaskList(checkerName);
        projectService.deleteCheckerProject(checkerName);
        for (int i = 0; i < taskList.size(); i++) {
            taskService.deleteCheckerTask(checkerName);
            taskResultService.deleteTaskResult(taskList.get(i).getTaskID());
            //DelFilesUtil.clearFiles();
        }
        return 1;
    }

    //添加一个检查员(-1:用户已经存在,-2：两次输入的密码不对)
    public int addChecker(String userType, String checkerName, String realName, String passwd,
                          String confirmPasswd, long addTime, int addVul, Map<String, Object> rsaKey) throws Exception {
        RSAPrivateKey privateKey = (RSAPrivateKey) rsaKey.get("private");
        passwd = RSAUtil.decryptByPrivateKey(passwd, privateKey);
        confirmPasswd = RSAUtil.decryptByPrivateKey(confirmPasswd, privateKey);

//        int num = userDao.hasAlreadyExitsChecker(checkerName);
        User user = getUserByUserName(checkerName);
        if (user != null) {
            if (user.getDelFlag() == 1) {
                return -6;
            } else {
                return -1;
            }
        }
//        if (num > 0) {
//            return -1;
//        }
        if (!PasswordUtil.checkPasswd(passwd)) {
            return -2;
        }
        if (!passwd.equals(confirmPasswd)) {
            return -3;
        }
        if (passwd.contains(checkerName)) { //不能包含用户名或者与用户名相同
            return -4;
        }

        passwd = new MD5().toMD5(checkerName + passwd).toLowerCase();
        userDao.addChecker(checkerName, passwd, userType, realName, addTime, Constant.MAX_LOGIN_NUM, addVul);
        return 1;
    }

    //修改检查员的漏洞管理权限
    public void updateCheckerAddVul(String checkerName, int addVul) {
        userDao.updateCheckerAddVul(checkerName, addVul);
    }

    //修改检查员信息
    public int changeChecker(String checkerName, String passwd, String confirmPasswd, Map<String, Object> rsaKey) throws Exception {
        RSAPrivateKey privateKey = (RSAPrivateKey) rsaKey.get("private");
        passwd = RSAUtil.decryptByPrivateKey(passwd, privateKey);
        confirmPasswd = RSAUtil.decryptByPrivateKey(confirmPasswd, privateKey);

        int num = userDao.hasAlreadyExitsChecker(checkerName);
        if (num == 0) {
            return -1;
        }
        if (!PasswordUtil.checkPasswd(passwd)) {
            return -2;
        }
        if (!passwd.equals(confirmPasswd)) {
            return -3;
        }
        if (passwd.contains(checkerName)) { //不能包含用户名或者与用户名相同
            return -4;
        }

        passwd = new MD5().toMD5(checkerName + passwd).toLowerCase();
        userDao.changeChecker(checkerName, passwd);
        return 1;
    }

    //获取指定页数的检查员
    public ArrayList<User> getPageCheckerList(int page, int perPageNum) {
        int begin = (page - 1) * perPageNum;
        int offset = perPageNum;
        ArrayList<User> userArrayList = userDao.getPageCheckerList(begin, offset);

        for (User user : userArrayList) {
            if (user.getUserType().equals("admin")) {
                user.setUserType("管理员");
            } else if (user.getUserType().equals("audit")) {
                user.setUserType("审计员");
            } else if (user.getUserType().equals("checker")) {
                user.setUserType("普通用户");
            }
        }
        return userArrayList;
    }

}
