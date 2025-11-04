package com.controller;

import com.dto.TierInfoDTO;
import com.service.TierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tiers")
public class TierController {

    @Autowired
    private TierService TierService;

    @GetMapping
    public List<TierInfoDTO> getAllTiers() {
        return TierService.getAllTiers();
    }

    @GetMapping("/{tiercode}")
    public TierInfoDTO getTierById(@PathVariable Integer tiercode) {
        return TierService.getTierById(tiercode);
    }

    @PostMapping
    public String addTier(@RequestBody TierInfoDTO tier) {
        TierService.addTier(tier);
        return "Tier added successfully";
    }

    @PutMapping("/{tiercode}")
    public String updateTier(@PathVariable Integer tiercode, @RequestBody TierInfoDTO Tier) {
        Tier.setTiercode(tiercode);
        TierService.updateTier(Tier);
        return "Tier updated successfully";
    }

    @DeleteMapping("/{tiercode}")
    public String deleteTier(@PathVariable Integer tiercode) {
        TierService.deleteTier(tiercode);
        return "Tier deleted successfully";
    }
}
