package com.dto;

public class LocationInfoDTO {
    private Integer responsecode;
    private String responsemessage;
    private String locationcode;
    private String locationname;

    public LocationInfoDTO() {}

    public LocationInfoDTO(Integer responsecode, String responsemessage, String locationcode, String locationname) {
        this.responsecode = responsecode;
        this.responsemessage = responsemessage;
        this.locationcode = locationcode;
        this.locationname = locationname;
    }

    public Integer getResponsecode() {
        return responsecode;
    }  

    public void setResponsecode(Integer responsecode) {
        this.responsecode = responsecode;
    }

    public String getResponsemessage() {
        return responsemessage;
    }

    public void setResponsemessage(String responsemessage) {
        this.responsemessage = responsemessage;
    }

    public String getLocationcode() {
        return locationcode;
    }
    public void setLocationcode(String locationcode) {
        this.locationcode = locationcode;
    }

    public String getLocationname() {
        return locationname;
    }
    public void setLocationname(String locationname) {
        this.locationname = locationname;
    }

}
