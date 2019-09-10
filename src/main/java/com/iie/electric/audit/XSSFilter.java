package com.iie.electric.audit;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * Created by bo on 2018/9/7.
 * 自定义过滤器预防跨站脚本攻击XSS
 */
public class XSSFilter implements Filter {
    FilterConfig filterConfig = null;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        this.filterConfig = filterConfig;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        chain.doFilter(new XssHttpServletRequestWrapper((HttpServletRequest) request), response);
    }

    @Override
    public void destroy() {
        this.filterConfig = null;
    }

}