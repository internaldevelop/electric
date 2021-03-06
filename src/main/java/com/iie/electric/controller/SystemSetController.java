package com.iie.electric.controller;

import com.iie.electric.entity.Network;
import com.iie.electric.entity.User;
import com.iie.electric.entityview.PageNation;
import com.iie.electric.service.EmailService;
import com.iie.electric.service.LogService;
import com.iie.electric.service.NetConfService;
import com.iie.electric.service.UserService;
import com.iie.electric.util.RSAUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.security.interfaces.RSAPublicKey;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/config")
public class SystemSetController extends BaseController {
    @Autowired
    private NetConfService netConfService;
    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private LogService logService;

    //加载网络配置页面
    @RequestMapping(value = "/network")
    public String netConfPage(ModelMap modelMap) {
        modelMap.put("netConfig", netConfService.getEth0NetConfigure("eth0"));
        return "/config/network/network";
    }

    // 修改网络配置
    @RequestMapping(value = "/setNetConfig", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> changeNetConfigure(Network network) throws Exception {
        Map<String, Object> modelMap = new HashMap<>();
        int netConfNo = -1;
        network.setEthName("eth0");
        if (netConfService.changeConfig(network)) {
            netConfNo = 1;
        }

        modelMap.put("bizNo", netConfNo);
        if (netConfNo == -1) {
            modelMap.put("bizMsg", "网络设置失败！");
        }
        modelMap.put("netConfig", netConfService.getEth0NetConfigure("eth0"));
        return modelMap;
    }

    // 加载账号管理页面
    @RequestMapping(value = "/user")
    public String userManagePage(HttpServletRequest request, ModelMap model) {
        User user = userService.getUserByUserName(getSessionUser(request).getUserName());
        if (user.getRealName().equals("")) {
            model.addAttribute("isFirst", 1);
        } else {
            model.addAttribute("isFirst", -1);
        }
        model.addAttribute("userName", user.getUserName());
        model.addAttribute("realName", user.getRealName());
        return "/config/user/user";
    }

    // 修改账户信息
    @RequestMapping(value = "/changePs", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> changeUserInfo(
            @RequestParam("username") String userName,
            @RequestParam("realName") String realName,
            @RequestParam("oldPs") String orgPasswd,
            @RequestParam("newPs") String newPasswd,
            @RequestParam("confirmNewPs") String confirmNewPasswd, HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<>();
        try {
            Map<String, Object> rsaKey = (Map<String, Object>) request.getSession().getAttribute("rsaKey");
            if (getSessionUser(request) != null && rsaKey != null) {
                int changeState = userService.changeUserInfo(userName, realName, orgPasswd, newPasswd, confirmNewPasswd, rsaKey);
                if (changeState == 1) {
                    User user = getSessionUser(request);
                    user.setRealName(realName);
                    user.setPasswd(newPasswd);
                    setSessionUser(request, user);
                }
                modelMap.put("bizNo", 1);
                modelMap.put("bizMsg", "");
                modelMap.put("changeState", changeState);
                return modelMap;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        modelMap.put("bizNo", -1);
        modelMap.put("bizMsg", "");
        modelMap.put("changeState", -6);
        return modelMap;
    }

    //加载检查员管理页面
    @RequestMapping(value = "/checker")
    public String checkerManagePage() {
        return "/config/checker/checker";
    }

    //获取检查员的列表
    @RequestMapping(value = "/checker_list")
    @ResponseBody
    public Map<String, Object> getCheckerList(@RequestParam("page") int page,
                                              @RequestParam("perPage") int perPage) {
        Map<String, Object> modelMap = new HashMap<>();
        PageNation pageNation = userService.getCheckerPageNation(page, perPage);
        ArrayList<User> checkerList = userService.getPageCheckerList(page, perPage);
        modelMap.put("bizNo", 1);
        modelMap.put("bizMsg", "");
        modelMap.put("pagenation", pageNation);
        modelMap.put("checkerList", checkerList);
        return modelMap;
    }

    //删除检查员
    @RequestMapping(value = "/delete_checker")
    @ResponseBody
    public Map<String, Object> deleteChecker(HttpServletRequest request, @RequestParam("userName") String checkerName) {
        Map<String, Object> modelMap = new HashMap<>();
        int delState = userService.deleteChecker(checkerName);
        if (delState > 0) {
            User user = getSessionUser(request);
            String desc = "用户" + user.getUserName() + "删除检查员：" + checkerName;
            logService.loggerDeleteChecker(user.getUserName(), desc);
        }
        modelMap.put("bizNo", delState);
        modelMap.put("bizMsg", "");
        return modelMap;
    }

    // 添加检查员
    @RequestMapping(value = "/add_checker")
    @ResponseBody
    public Map<String, Object> addChecker(
            @RequestParam("userType") String userType,
            @RequestParam("userName") String checkerName,
            @RequestParam("realName") String realName,
            @RequestParam("ps") String passwd,
            @RequestParam("confirmPs") String confirmPasswd,
            @RequestParam("enableManageVulLib") int addVul, HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<>();

        Map<String, Object> rsaKey = (Map<String, Object>) request.getSession().getAttribute("rsaKey");
        if (rsaKey == null) {
            modelMap.put("bizNo", -5);
            modelMap.put("bizMsg", "");
            modelMap.put("checkerInfo", "");
            return modelMap;
        }

        try {
            long addTime = System.currentTimeMillis();
            int addState = userService.addChecker(userType, checkerName, realName, passwd, confirmPasswd, addTime, addVul, rsaKey);
            modelMap.put("bizNo", addState);
            modelMap.put("bizMsg", "");
            if (addState == 1) {
                User user = userService.getUserByUserName(checkerName);
                modelMap.put("checkerInfo", user);

                User user1 = getSessionUser(request);
                String desc = "用户" + user1.getUserName() + "添加了用户：" + checkerName;
                logService.loggerAddChecker(user1.getUserName(), desc);
            } else {
                modelMap.put("checkerInfo", "");
            }
        } catch (Exception e) {
            modelMap.put("bizNo", -5);
            modelMap.put("bizMsg", "");
            modelMap.put("checkerInfo", "");
        }
        return modelMap;
    }

    //修改检查员的漏洞管理权限
    @RequestMapping(value = "/change_permission")
    @ResponseBody
    public Map<String, Object> changeCheckerVul(
            @RequestParam("userName") String checkerName,
            @RequestParam("enableManageVulLib") int addVul) {
        Map<String, Object> modelMap = new HashMap<>();
        userService.updateCheckerAddVul(checkerName, addVul);
        modelMap.put("bizNo", 1);
        modelMap.put("bizMsg", "");
        return modelMap;
    }

    //修改检查员
    @RequestMapping(value = "/change_checker")
    @ResponseBody
    public Map<String, Object> changeChecker(
            @RequestParam("userName") String checkerName,
            @RequestParam("realName") String realName,
            @RequestParam("ps") String passwd,
            @RequestParam("confirmPs") String confirmPasswd, HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<>();

        Map<String, Object> rsaKey = (Map<String, Object>) request.getSession().getAttribute("rsaKey");
        if (rsaKey == null) {
            modelMap.put("bizNo", -5);
            modelMap.put("bizMsg", "");
            return modelMap;
        }

        try {
            int changeState = userService.changeChecker(checkerName, passwd, confirmPasswd, rsaKey);
            modelMap.put("bizNo", changeState);
            modelMap.put("bizMsg", "");
        } catch (Exception e) {
            modelMap.put("bizNo", -5);
            modelMap.put("bizMsg", "");
        }

        return modelMap;
    }

    //生成公私秘钥对，返回公钥
    @RequestMapping(value = "/rsa_key")
    @ResponseBody
    public Map<String, Object> generateRSAKey(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<>();
        try {
            Map<String, Object> rsaKey = (Map<String, Object>) request.getSession().getAttribute("rsaKey");
            //将公钥返回到前端
            if (rsaKey == null) {
                Map<String, Object> map = RSAUtil.getKeys();
                RSAPublicKey rsaPublicKey = (RSAPublicKey) map.get("public");
                modelMap.put("bizNo", 1);
                modelMap.put("bizMsg", "");
                modelMap.put("modulus", rsaPublicKey.getModulus().toString(16));
                modelMap.put("exponent", rsaPublicKey.getPublicExponent().toString(16));
                request.getSession().setAttribute("rsaKey", map);
            } else {
                RSAPublicKey rsaPublicKey = (RSAPublicKey) rsaKey.get("public");
                modelMap.put("bizNo", 1);
                modelMap.put("bizMsg", "");
                modelMap.put("modulus", rsaPublicKey.getModulus().toString(16));
                modelMap.put("exponent", rsaPublicKey.getPublicExponent().toString(16));
            }
        } catch (Exception e) {
            e.printStackTrace();
            modelMap.put("bizNo", -1);
            modelMap.put("bizMsg", "");
            modelMap.put("modulus", "");
            modelMap.put("exponent", "");
        }

        return modelMap;
    }


    //加载email配置界面
    @RequestMapping(value = "/email")
    public String emailPage(HttpServletRequest request, ModelMap model) {
        User user = userService.getUserByUserName(getSessionUser(request).getUserName());
        ArrayList<HashMap<String, String>> receiverList = emailService.getUserSendEmails(user.getUserName());
        model.addAttribute("sendAddr", user.getEmailName());
        model.addAttribute("emailSubject", user.getEmailSubject());
        model.addAttribute("emailContent", user.getEmailContent());
        model.addAttribute("receiverList", receiverList);
        return "/config/email/email";
    }

    //修改邮箱信息
    @RequestMapping(value = "/changeEmail", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> changeEmail(
            @RequestParam("sendAddr") String sendAddr,
            @RequestParam("sendPS") String sendPS,
            @RequestParam("confirmPS") String confirmPS,
            @RequestParam("emailSubject") String emailSubject,
            @RequestParam("emailContent") String emailContent, HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<>();
        String userName = getSessionUser(request).getUserName();
        HashMap<String, Object> state = emailService.changeEmail(sendAddr, sendPS, confirmPS, emailSubject, emailContent, userName);
        modelMap.put("bizNo", state.get("bizNo"));
        modelMap.put("bizMsg", state.get("bizMsg"));
        return modelMap;
    }

    //添加收件人
    @RequestMapping(value = "/addReceiver", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addReceiver(
            @RequestParam("receiverName") String receiverName,
            @RequestParam("receiverAddr") String receiverAddr,
            HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<>();
        int state = emailService.addToemail(getSessionUser(request).getUserName(), receiverName, receiverAddr);
        modelMap.put("bizNo", state);
        modelMap.put("bizMsg", state);
        return modelMap;
    }

    //删除收件人
    @RequestMapping(value = "deleteReceiver", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deleteReceiver(
            @RequestParam("receiverName") String receiverName,
            @RequestParam("receiverAddr") String receiverAddr,
            HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<>();
        int state = emailService.deleteToemail(getSessionUser(request).getUserName(), receiverAddr);
        modelMap.put("bizNo", state);
        modelMap.put("bizMsg", state);
        return modelMap;
    }
}
