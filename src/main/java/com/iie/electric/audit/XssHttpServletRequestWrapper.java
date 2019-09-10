package com.iie.electric.audit;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

/**
 * Created by bo on 2018/9/7.
 */
public class XssHttpServletRequestWrapper extends HttpServletRequestWrapper {
    boolean isUpData = false;// 判断是否是上传 上传忽略

    public XssHttpServletRequestWrapper(HttpServletRequest servletRequest) {
        super(servletRequest);
        String contentType = servletRequest.getContentType();
        if (null != contentType)
            isUpData = contentType.startsWith("multipart");
    }

    @Override
    public String[] getParameterValues(String parameter) {
        String[] values = super.getParameterValues(parameter);
        if (values == null) {
            return null;
        }
        int count = values.length;
        String[] encodedValues = new String[count];
        for (int i = 0; i < count; i++) {
            encodedValues[i] = cleanXSS(values[i]);
        }
        return encodedValues;
    }

    @Override
    public String getParameter(String parameter) {
        String value = super.getParameter(parameter);
        if (value == null) {
            return null;
        }
        return cleanXSS(value);
    }

    /**
     * 获取request的属性时，做xss过滤
     */
    @Override
    public Object getAttribute(String name) {
        Object value = super.getAttribute(name);
        if (null != value && value instanceof String) {
            value = cleanXSS((String) value);
        }
        return value;
    }

    @Override
    public String getHeader(String name) {
        String value = super.getHeader(name);
        if (value == null)
            return null;
        return cleanXSS(value);
    }

    @Override
    public ServletInputStream getInputStream() {
        try {
            if (isUpData) { //对于文件上传请求没有转换XSS特殊字符
                return super.getInputStream();
            } else {
                final ByteArrayInputStream bais = new ByteArrayInputStream(inputHandlers(super.getInputStream()).getBytes("utf-8"));
                return new ServletInputStream() {
                    @Override
                    public int read() throws IOException {
                        return bais.read();
                    }

                    @Override
                    public boolean isFinished() {
                        return false;
                    }

                    @Override
                    public boolean isReady() {
                        return false;
                    }

                    @Override
                    public void setReadListener(ReadListener readListener) {
                    }
                };
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private String inputHandlers(ServletInputStream servletInputStream) {
        StringBuilder sb = new StringBuilder();
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new InputStreamReader(servletInputStream, Charset.forName("UTF-8")));
            String line = "";
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (servletInputStream != null) {
                try {
                    servletInputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return cleanXSS(sb.toString());
    }

    private static String cleanXSS(String value) {
        //几种常见的web攻击:http://jingyan.baidu.com/article/0202781178e19e1bcc9ce5c7.html
        value = value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
        //%3C是URL对<字符的编码
        value = value.replaceAll("%3C", "&lt;").replaceAll("%3E", "&gt;");
        value = value.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");
        //%28是(转义后的字符编码 , %29是)转义后的字符编码
        value = value.replaceAll("%28", "&#40;").replaceAll("%29", "&#41;");
        //&#39;是单引号ASCII编码后的表现形式
        value = value.replaceAll("'", "&#39;");
        //eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码
        value = value.replaceAll("eval\\((.*)\\)", "");
        //防止如javascript:alert(doucment.cookie)可以看到当前站点的cookie（如果有的话）的攻击
        value = value.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
//        value = value.replaceAll("script", "");
        return value;
    }

}