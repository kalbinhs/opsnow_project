package com.service;

import com.dto.LocationInfoDTO;
import com.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationRepository LocationRepository;

    public List<LocationInfoDTO> getAllLocations() {
        return LocationRepository.findAll();
    }

    public LocationInfoDTO getLocationById(String locationcode) {
        return LocationRepository.findById(locationcode);
    }

    public void deleteLocation(String locationcode) {
        LocationRepository.delete(locationcode);
    }

    public void addLocation(LocationInfoDTO location) {
        LocationRepository.save(location);
    }

    public void updateLocation(LocationInfoDTO Location) {
        LocationRepository.update(Location);
    }
}
