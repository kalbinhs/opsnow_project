package com.dto;

public class EmployeeInfoDTO {
    private Integer responsecode;
    private String responsemessage;
    private Integer empno;
    private String empname;
    private Integer tiercode;
    private String tiername;
    private String locationcode;
    private String locationname;
    private String departmentcode;
    private String departmentname;
    private Integer supervisorcode;
    private String supervisorname;
    private double salary;
    private String entrydate;

    public EmployeeInfoDTO() {}

    public EmployeeInfoDTO(Integer responsecode, String responsemessage,
                           Integer empno, String empname, Integer tiercode, String tiername,
                           String locationcode, String locationname,
                           String departmentcode, String departmentname,
                           Integer supervisorcode, String supervisorname,
                           double salary, String entrydate) {
        this.responsecode = responsecode;
        this.responsemessage = responsemessage;
        this.empno = empno;
        this.empname = empname;
        this.tiercode = tiercode;
        this.tiername = tiername;
        this.locationcode = locationcode;
        this.locationname = locationname;
        this.departmentcode = departmentcode;
        this.departmentname = departmentname;
        this.supervisorcode = supervisorcode;
        this.supervisorname = supervisorname;
        this.salary = salary;
        this.entrydate = entrydate;
    }

    public Integer getResponsecode() {
        return responsecode;
    }

    public void setResponsecode(Integer responsecode) {
        this.responsecode = responsecode;
    }

    public Integer getEmpno() {
        return empno;
    }
    public void setEmpno(Integer empno) {
        this.empno = empno;
    }

    public String getEmpname() {
        return empname;
    }
    public void setEmpname(String empname) {
        this.empname = empname;
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

    public Integer getSupervisorcode() {
        return supervisorcode;
    }
    public void setSupervisorcode(Integer supervisorcode) {
        this.supervisorcode = supervisorcode;
    }

    public String getSupervisorname() {
        return supervisorname;
    }
    public void setSupervisorname(String supervisorname) {
        this.supervisorname = supervisorname;
    }

    public double getSalary() {
        return salary;
    }
    public void setSalary(double salary) {
        this.salary = salary;
    }

    public String getEntrydate() {
        return entrydate;
    }
    public void setEntrydate(String entrydate) {
        this.entrydate = entrydate;
    }
}
