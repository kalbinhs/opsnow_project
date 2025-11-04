package com.controller;

import com.dto.DepartmentInfoDTO;
import com.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService DepartmentService;

    @GetMapping
    public List<DepartmentInfoDTO> getAllDepartments() {
        return DepartmentService.getAllDepartments();
    }

    @GetMapping("/{departmentcode}")
    public DepartmentInfoDTO getDepartmentById(@PathVariable String departmentcode) {
        return DepartmentService.getDepartmentById(departmentcode.toUpperCase());
    }

    @PostMapping
    public String addDepartment(@RequestBody DepartmentInfoDTO Department) {
        DepartmentService.addDepartment(Department);
        return "Department added successfully";
    }

    @PutMapping("/{Departmentcode}")
    public String updateDepartment(@PathVariable String Departmentcode, @RequestBody DepartmentInfoDTO Department) {
        Department.setDepartmentcode(Departmentcode.toUpperCase());
        DepartmentService.updateDepartment(Department);
        return "Department updated successfully";
    }

    @DeleteMapping("/{Departmentcode}")
    public String deleteDepartment(@PathVariable String Departmentcode) {
        DepartmentService.deleteDepartment(Departmentcode.toUpperCase());
        return "Department deleted successfully";
    }
}
