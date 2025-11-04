package com.repository;

import com.dto.EmployeeInfoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.time.LocalDateTime;

@Repository
public class EmployeeRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<EmployeeInfoDTO> findAll() {
        String sql = "SELECT e.empno, e.empname, e.tiercode, t.tiername, e.locationcode, l.locationname, "
                + "e.departmentcode, d.departmentname, e.supervisorcode, es.empname AS supervisorname, "
                + "e.salary, e.entrydate "
                + "FROM employees e "
                + "LEFT JOIN tiers t ON e.tiercode = t.tiercode "
                + "LEFT JOIN locations l ON e.locationcode = l.locationcode "
                + "LEFT JOIN departments d ON e.departmentcode = d.departmentcode "
                + "LEFT JOIN employees es ON e.supervisorcode = es.empno "
                + "ORDER BY e.empno ASC";
        
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(EmployeeInfoDTO.class));
    }

    public EmployeeInfoDTO findById(int empno) {
        String sql = "SELECT e.empno, e.empname, e.tiercode, t.tiername, e.locationcode, l.locationname, "
                + "e.departmentcode, d.departmentname, e.supervisorcode, es.empname AS supervisorname, "
                + "e.salary, e.entrydate "
                + "FROM employees e "
                + "LEFT JOIN tiers t ON e.tiercode = t.tiercode "
                + "LEFT JOIN locations l ON e.locationcode = l.locationcode "
                + "LEFT JOIN departments d ON e.departmentcode = d.departmentcode "
                + "LEFT JOIN employees es ON e.supervisorcode = es.empno "
                + "WHERE e.empno = ?";
        
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(EmployeeInfoDTO.class), empno);
    }

    public int save(EmployeeInfoDTO employee) {
        LocalDateTime now = LocalDateTime.now();
        String sql = "INSERT INTO employees (empno, empname, tiercode, locationcode, departmentcode, supervisorcode, salary, entrydate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql,
                employee.getEmpno(),
                employee.getEmpname(),
                employee.getTiercode(),
                employee.getLocationcode(),
                employee.getDepartmentcode(),
                employee.getSupervisorcode(),
                employee.getSalary(),
                now
        );
    }

    public int update(EmployeeInfoDTO employee) {
        String sql = "UPDATE employees SET empname = ?, tiercode = ?, locationcode = ?, "
                   + "departmentcode = ?, supervisorcode = ?, salary = ? "
                   + "WHERE empno = ?";
        return jdbcTemplate.update(sql,
                employee.getEmpname(),
                employee.getTiercode(),
                employee.getLocationcode(),
                employee.getDepartmentcode(),
                employee.getSupervisorcode(),
                employee.getSalary(),
                employee.getEmpno()
        );
    }

    public int delete(int empno) {
        String sql = "DELETE FROM employees WHERE empno = ?";
        return jdbcTemplate.update(sql, empno);
    }
}
