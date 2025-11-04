package com.repository;

import com.dto.DepartmentInfoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class DepartmentRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<DepartmentInfoDTO> findAll() {
        String sql = "SELECT * FROM departments";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(DepartmentInfoDTO.class));
    }

    public DepartmentInfoDTO findById(String departmentcode) {
        DepartmentInfoDTO department = new DepartmentInfoDTO();
        try {
            String sql = "SELECT * FROM departments WHERE departmentcode = ?";
            department = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(DepartmentInfoDTO.class), departmentcode);
            if(department != null) {
                department.setResponsecode(200);
                department.setResponsemessage("Success");
            }
            return department;
        } catch (Exception e) {
            e.printStackTrace();
            department.setResponsecode(404);
            department.setResponsemessage("Department not found");
            return department;
        }
    }

    public int delete(String departmentcode) {
        String sql = "DELETE FROM departments WHERE departmentcode = ?";
        return jdbcTemplate.update(sql, departmentcode);
    }

    public int save(DepartmentInfoDTO department) {
        String sql = "INSERT INTO departments (departmentcode, departmentname) "
                   + "VALUES (?, ?)";
        return jdbcTemplate.update(sql,
                department.getDepartmentcode(),
                department.getDepartmentname()
        );
    }
    
    public int update(DepartmentInfoDTO department) {
        String sql = "UPDATE departments SET departmentname = ? "
                   + "WHERE departmentcode = ?";
        return jdbcTemplate.update(sql,
                department.getDepartmentname(),
                department.getDepartmentcode()
        );
    }
}
