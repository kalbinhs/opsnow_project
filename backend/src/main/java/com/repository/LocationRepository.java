package com.repository;

import com.dto.LocationInfoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class LocationRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<LocationInfoDTO> findAll() {
        String sql = "SELECT * FROM locations";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(LocationInfoDTO.class));
    }

    public LocationInfoDTO findById(String locationcode) {
        String sql = "SELECT * FROM locations WHERE locationcode = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(LocationInfoDTO.class), locationcode);
    }

    public int delete(String locationcode) {
        String sql = "DELETE FROM locations WHERE locationcode = ?";
        return jdbcTemplate.update(sql, locationcode);
    }

    public int save(LocationInfoDTO location) {
        String sql = "INSERT INTO locations (locationcode, locationname) "
                   + "VALUES (?, ?)";
        return jdbcTemplate.update(sql,
                location.getLocationcode(),
                location.getLocationname()
        );
    }
    
    public int update(LocationInfoDTO location) {
        String sql = "UPDATE locations SET locationname = ? "
                   + "WHERE locationcode = ?";
        return jdbcTemplate.update(sql,
                location.getLocationname(),
                location.getLocationcode()
        );
    }
}
