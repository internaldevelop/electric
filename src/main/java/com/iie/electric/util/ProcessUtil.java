package com.iie.electric.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import static java.lang.Runtime.getRuntime;

/**
 * Created by bo on 2019/1/11.
 */
public class ProcessUtil {

    public static int countProcess() {
        int num = 0;
        try {
//            Process process = Runtime.getRuntime().exec(new String[]{"/bin/sh", "-c", "ps -aux | grep python | wc -l"});
            Process process = Runtime.getRuntime().exec(new String[]{"/bin/sh", "-c", "ps -aux | grep python"});
            BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream(), "UTF-8"));
            String result;
            while ((result = br.readLine()) != null) {
//                return Integer.parseInt(result) - 3;
                if(result.contains("CyberPecker")){
                    num++;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return num;
    }

    public static void main(String[] args){
        System.out.println(countProcess());
    }

}
