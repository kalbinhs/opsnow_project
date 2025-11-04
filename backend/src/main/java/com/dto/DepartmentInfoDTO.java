package com.dto;

public class DepartmentInfoDTO {
    private Integer responsecode;
    private String responsemessage;
    private String departmentcode;
    private String departmentname;

    public DepartmentInfoDTO() {}

    public DepartmentInfoDTO(Integer responsecode, String responsemessage, String departmentcode, String departmentname) {
        this.responsecode = responsecode;
        this.responsemessage = responsemessage;
        this.departmentcode = departmentcode;
        this.departmentname = departmentname;
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

    public String getDepartmentcode() {
        return departmentcode;
    }
    public void setDepartmentcode(String departmentcode) {
        this.departmentcode = departmentcode;
    }

    public String getDepartmentname() {
        return departmentname;
    }
    public void setDepartmentname(String departmentname) {
        this.departmentname = departmentname;
    }

}
