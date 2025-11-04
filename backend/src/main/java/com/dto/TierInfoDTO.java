package com.dto;

public class TierInfoDTO {
    private Integer responsecode;
    private String responsemessage;
    private Integer tiercode;
    private String tiername;

    public TierInfoDTO() {}

    public TierInfoDTO(Integer responsecode, String responsemessage, Integer tiercode, String tiername) {
        this.responsecode = responsecode;
        this.responsemessage = responsemessage;
        this.tiercode = tiercode;
        this.tiername = tiername;
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

    public Integer getTiercode() {
        return tiercode;
    }
    public void setTiercode(Integer tiercode) {
        this.tiercode = tiercode;
    }

    public String getTiername() {
        return tiername;
    }
    public void setTiername(String tiername) {
        this.tiername = tiername;
    }
}
