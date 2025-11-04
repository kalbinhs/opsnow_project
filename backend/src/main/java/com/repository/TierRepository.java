package com.repository;

import com.dto.TierInfoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class TierRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<TierInfoDTO> findAll() {
        String sql = "SELECT * FROM tiers";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TierInfoDTO.class));
    }

    public TierInfoDTO findById(int tiercode) {
        String sql = "SELECT * FROM tiers WHERE tiercode = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(TierInfoDTO.class), tiercode);
    }

    public int delete(int tiercode) {
        String sql = "DELETE FROM tiers WHERE tiercode = ?";
        return jdbcTemplate.update(sql, tiercode);
    }

    public int save(TierInfoDTO tier) {
        String sql = "INSERT INTO tiers (tiercode, tiername) "
                   + "VALUES (?, ?)";
        return jdbcTemplate.update(sql,
                tier.getTiercode(),
                tier.getTiername()
        );
    }

    public int update(TierInfoDTO tier) {
        String sql = "UPDATE tiers SET tiername = ? "
                   + "WHERE tiercode = ?";
        return jdbcTemplate.update(sql,
                tier.getTiername(),
                tier.getTiercode()
        );
    }
}
