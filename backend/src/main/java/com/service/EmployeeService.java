package com.service;

import com.dto.EmployeeInfoDTO;
import com.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<EmployeeInfoDTO> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public EmployeeInfoDTO getEmployeeById(int empno) {
        return employeeRepository.findById(empno);
    }

    public void addEmployee(EmployeeInfoDTO employee) {
        employeeRepository.save(employee);
    }

    public void updateEmployee(EmployeeInfoDTO employee) {
        employeeRepository.update(employee);
    }

    public void deleteEmployee(int id) {
        employeeRepository.delete(id);
    }
}
