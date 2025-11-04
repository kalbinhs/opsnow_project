package com.service;

import com.dto.TierInfoDTO;
import com.repository.TierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TierService {

    @Autowired
    private TierRepository TierRepository;

    public List<TierInfoDTO> getAllTiers() {
        return TierRepository.findAll();
    }

    public TierInfoDTO getTierById(int tiercode) {
        return TierRepository.findById(tiercode);
    }

    public void deleteTier(int tiercode) {
        TierRepository.delete(tiercode);
    }

    public void addTier(TierInfoDTO tier) {
        TierRepository.save(tier);
    }

    public void updateTier(TierInfoDTO Tier) {
        TierRepository.update(Tier);
    }
}
