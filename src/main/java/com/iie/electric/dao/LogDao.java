package com.iie.electric.dao;

import com.iie.electric.entity.Log;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.ArrayList;

/**
 * Created by bo on 2019/1/11.
 */
public interface LogDao {

    @Insert("insert into log(`type`,`user`,`date`,`desc`) values(#{log.type},#{log.user},#{log.date},#{log.desc})")
    void addLog(@Param("log") Log log);

    @Select("select * from log order by id desc limit #{offset} offset #{begin}")
    ArrayList<Log> listPageLog(@Param("begin") int begin, @Param("offset") int offset);

    @Select("select count(*) from log")
    int countLog();
}
