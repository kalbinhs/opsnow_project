package com.controller;

import com.dto.LocationInfoDTO;
import com.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    @Autowired
    private LocationService LocationService;

    @GetMapping
    public List<LocationInfoDTO> getAllLocations() {
        return LocationService.getAllLocations();
    }

    @GetMapping("/{locationcode}")
    public LocationInfoDTO getLocationById(@PathVariable String locationcode) {
        return LocationService.getLocationById(locationcode.toUpperCase());
    }

    @PostMapping
    public String addLocation(@RequestBody LocationInfoDTO location) {
        LocationService.addLocation(location);
        return "Location added successfully";
    }

    @PutMapping("/{locationcode}")
    public String updateLocation(@PathVariable String locationcode, @RequestBody LocationInfoDTO Location) {
        Location.setLocationcode(locationcode.toUpperCase());
        LocationService.updateLocation(Location);
        return "Location updated successfully";
    }

    @DeleteMapping("/{locationcode}")
    public String deleteLocation(@PathVariable String locationcode) {
        LocationService.deleteLocation(locationcode.toUpperCase());
        return "Location deleted successfully";
    }
}
