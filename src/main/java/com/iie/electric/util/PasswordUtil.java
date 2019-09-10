package com.iie.electric.util;

import com.iie.electric.entity.User;
import cryptix.jce.provider.MD5;
import org.apache.commons.codec.digest.DigestUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by bo on 2018/9/14.
 */
public class PasswordUtil {

    //检查密码是否符合复杂度要求(大于8位长度，数字、字母、特殊字符~!@#$%^&*_组合)
    public static boolean checkPasswd(String password) {
        String regEx = ".*(?=.*\\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*_]).{8,}";
        Pattern pattern = Pattern.compile(regEx);
        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
    }

    //对用户的密码加密
    public static void encryptPassword(User user) {
        String salt = MD5Util.getRandomString(15); //15位的随机数
        String passwd = new MD5().toMD5(user.getPasswd());
    }

//    public static void main(String[] args){
////        System.out.println(checkPasswd("1234abcd!@#$"));
//        String str = "admin1234abcd!@#$";
////        String passwd = new MD5().toMD5(str.getBytes()).toLowerCase();
////        System.out.println(new MD5().toMD5(passwd + "zod44").toLowerCase());
////        System.out.println(passwd);
////        System.out.println(new MD5().toMD5("admin1234abcd").toLowerCase());
//        System.out.println(new MD5().toMD5(str+"ft423").toLowerCase());
//    }


}
