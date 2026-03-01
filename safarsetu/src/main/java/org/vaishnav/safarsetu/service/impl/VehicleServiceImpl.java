package org.vaishnav.safarsetu.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.vaishnav.safarsetu.exception.VehicleException;
import org.vaishnav.safarsetu.mapper.VehicleMapper;
import org.vaishnav.safarsetu.models.Vehicle;
import org.vaishnav.safarsetu.payload.dto.VehicleDto;
import org.vaishnav.safarsetu.payload.request.VehicleSearchRequest;
import org.vaishnav.safarsetu.payload.response.PageResponse;
import org.vaishnav.safarsetu.repository.VehicleRepository;
import org.vaishnav.safarsetu.service.VehicleService;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;
    private final VehicleMapper vehicleMapper;

    @Override
    public VehicleDto createVehicle(VehicleDto vehicleDto) throws VehicleException {
        if( vehicleRepository.existsByRegistrationNumber(vehicleDto.getRegistrationNumber()) ){
            throw new VehicleException("Registration Number already exists " + vehicleDto.getRegistrationNumber());
        }
        Vehicle vehicle = vehicleMapper.convertVehicleDtoToVehicle(vehicleDto);

        vehicle.isAvailableUnitsValid();

        Vehicle savedVehicle = vehicleRepository.save(vehicle);
        return vehicleMapper.convertVehicleToVehicleDto(savedVehicle);
    }

    @Override
    public VehicleDto getVehicleById(Long id) throws VehicleException {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow( () -> new VehicleException("Vehicle does not exists with id: " + id) );
        return vehicleMapper.convertVehicleToVehicleDto(vehicle);
    }

    @Override
    public List<VehicleDto> createVehicleInBulk(List<VehicleDto> vehicleDtos) throws VehicleException {

        List<VehicleDto> savedVehicleDtos = new ArrayList<>();

        for ( VehicleDto vehicleDto : vehicleDtos ) {
            savedVehicleDtos.add(createVehicle(vehicleDto));
        }

        return savedVehicleDtos;
    }

    @Override
    public VehicleDto getVehicleByRegsNumber(String regsNumber) throws VehicleException {
        Vehicle vehicle = vehicleRepository.findByRegistrationNumber(regsNumber)
                .orElseThrow( () -> new VehicleException("Vehicle does not exists with registration number: " + regsNumber) );
        return vehicleMapper.convertVehicleToVehicleDto(vehicle);
    }

    @Override
    public VehicleDto updateVehicle(Long id, VehicleDto vehicleDto) throws VehicleException {
        Vehicle existingVehicle = vehicleRepository.findById(id)
                .orElseThrow( () -> new VehicleException("Vehicle does not exists with id: " + id) );
        vehicleMapper.updateVehicleFromVehicleDto(existingVehicle, vehicleDto);
        existingVehicle.isAvailableUnitsValid();
        Vehicle updatedVehicle = vehicleRepository.save(existingVehicle);
        return vehicleMapper.convertVehicleToVehicleDto(updatedVehicle);
    }

    // Soft delete
    @Override
    public void deleteVehicle(Long id) throws VehicleException {
        Vehicle existingVehicle = vehicleRepository.findById(id)
                .orElseThrow( () -> new VehicleException("Vehicle does not exists with id: " + id) );
        existingVehicle.setActive(false);
        vehicleRepository.save(existingVehicle);
    }

    @Override
    public void hardDeleteVehicle(Long id) throws VehicleException {
        Vehicle existingVehicle = vehicleRepository.findById(id)
                .orElseThrow( () -> new VehicleException("Vehicle does not exists with id: " + id) );
        vehicleRepository.delete(existingVehicle);
    }

    @Override
    public PageResponse<VehicleDto> searchVehicleWithFilter(VehicleSearchRequest searchRequest) {
        Page<Vehicle> page = vehicleRepository.searchVehicleWithFilters(
                searchRequest.getSearchTerm(),
                searchRequest.getVehicleCategoryId(),
                searchRequest.isAvailableOnly(),
                getPageable(searchRequest.getPageSize(), searchRequest.getPage(), searchRequest.getSortBy(),  searchRequest.getSortOrder())
        );
        return vehicleMapper.getPageResponseDto(page);
    }

    @Override
    public long getTotalActiveVehicle() {
        return vehicleRepository.countByActiveTrue();
    }

    @Override
    public long getTotalAvailableVehicle() {
        return vehicleRepository.countAvailableUnits();
    }

    private Pageable getPageable(int pageSize, int page, String sortBy, String sortDirection) {
        pageSize = Math.min(pageSize, 10);
        pageSize = Math.max(pageSize, 1);
        Sort sort = sortDirection.equalsIgnoreCase("ASC")
                ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        return PageRequest.of(page, pageSize, sort);
    }
}
