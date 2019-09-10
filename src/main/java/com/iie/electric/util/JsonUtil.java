package com.iie.electric.util;

import java.io.IOException;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONException;
import org.json.JSONObject;

public class JsonUtil {

	//将json转化为实体POJO
	public static <T> Object JsonToObj(String jsonStr, Class<T> obj) {
		T t = null;
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			t = objectMapper.readValue(jsonStr, obj);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return t;
	}
    
	// 将实体POJO转化为json对象
	public static <T> JSONObject objectToJson(T obj) {
		ObjectMapper mapper = new ObjectMapper();
		String jsonStr = "";
		JSONObject jsonObj = null;

		try {
			jsonStr = mapper.writeValueAsString(obj);
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		try {
			jsonObj = new JSONObject(jsonStr);
		} catch (JSONException e) {
			e.printStackTrace();
		}

		return jsonObj;
	}
}
