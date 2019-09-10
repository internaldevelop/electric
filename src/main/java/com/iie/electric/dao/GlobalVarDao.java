package com.iie.electric.dao;

import com.iie.electric.entity.GlobalVar;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

public interface GlobalVarDao {

    @Select("select * from global_var where `name` = #{name}")
    public GlobalVar getGlobalVar(@Param("name") String name);

    @Update("update global_var set `value` = #{flag} where `name` = 'log'")
    void updateLogFlag(@Param("flag") String flag);
}