package com.iie.electric.dao;

import com.iie.electric.entity.ProbeConfig;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

/**
 * Created by bo on 2017/4/9.
 */
@Repository
public interface ProbeConfigDao {

    @Select("select count(*) from probe_config where section = #{section}")
    int countSectionNum(@Param("section") String section);

    @Insert("insert into probe_config(section,type,port,req,encoding,zgrab_default) values(#{probeConfig.section},#{probeConfig.type},#{probeConfig.port},#{probeConfig.req},#{probeConfig.encoding},#{probeConfig.zgrabDefault})")
    int addProbeConfig(@Param("probeConfig") ProbeConfig probeConfig);

    @Delete("delete from probe_config where section = #{section}")
    int deleteProbeConfig(@Param("section") String section);
}
