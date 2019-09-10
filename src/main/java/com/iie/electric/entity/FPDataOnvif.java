package com.iie.electric.entity;

import org.codehaus.jackson.annotate.JsonProperty;

public class FPDataOnvif {
    private String onvif;
    @JsonProperty("device_service")
    private String deviceService;

    public String getOnvif() {
        return onvif;
    }

    public void setOnvif(String onvif) {
        this.onvif = onvif;
    }

    public String getDeviceService() {
        return deviceService;
    }

    public void setDeviceService(String deviceService) {
        this.deviceService = deviceService;
    }
}
