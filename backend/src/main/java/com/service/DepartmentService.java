package com.service;

import com.dto.DepartmentInfoDTO;
import com.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository DepartmentRepository;

    public List<DepartmentInfoDTO> getAllDepartments() {
        return DepartmentRepository.findAll();
    }

    public DepartmentInfoDTO getDepartmentById(String departmentcode) {
        DepartmentInfoDTO response = new DepartmentInfoDTO();
        if(departmentcode == null || departmentcode.isEmpty()) {
            response.setResponsecode(400);
            response.setResponsemessage("Department code is required");
            return response;
        }
        response = DepartmentRepository.findById(departmentcode);
        return response;
    }

    public void deleteDepartment(String Departmentcode) {
        DepartmentRepository.delete(Departmentcode);
    }

    public void addDepartment(DepartmentInfoDTO Department) {
        DepartmentRepository.save(Department);
    }

    public void updateDepartment(DepartmentInfoDTO Department) {
        DepartmentRepository.update(Department);
    }

}
