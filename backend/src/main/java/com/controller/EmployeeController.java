package com.controller;

import com.dto.EmployeeInfoDTO;
import com.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<EmployeeInfoDTO> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{empno}")
    public EmployeeInfoDTO getEmployeeById(@PathVariable int empno) {
        return employeeService.getEmployeeById(empno);
    }

    @PostMapping
    public String addEmployee(@RequestBody EmployeeInfoDTO employee) {
        employeeService.addEmployee(employee);
        return "Employee added successfully";
    }

    @PutMapping("/{empno}")
    public String updateEmployee(@PathVariable int empno, @RequestBody EmployeeInfoDTO employee) {
        employee.setEmpno(empno);
        employeeService.updateEmployee(employee);
        return "Employee updated successfully";
    }

    @DeleteMapping("/{empno}")
    public String deleteEmployee(@PathVariable int empno) {
        employeeService.deleteEmployee(empno);
        return "Employee deleted successfully";
    }
}
