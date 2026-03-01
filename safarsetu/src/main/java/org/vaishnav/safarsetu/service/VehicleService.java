package org.vaishnav.safarsetu.service;

import org.vaishnav.safarsetu.exception.VehicleException;
import org.vaishnav.safarsetu.payload.dto.VehicleDto;
import org.vaishnav.safarsetu.payload.response.PageResponse;
import org.vaishnav.safarsetu.payload.request.VehicleSearchRequest;

import java.util.List;

public interface VehicleService {

    VehicleDto createVehicle(VehicleDto vehicleDto) throws VehicleException;

    VehicleDto getVehicleById(Long id) throws VehicleException;

    List<VehicleDto> createVehicleInBulk(List<VehicleDto> vehicleDtos) throws VehicleException;

    VehicleDto getVehicleByRegsNumber(String regsNumber) throws VehicleException;

    VehicleDto updateVehicle(Long id, VehicleDto vehicleDto) throws VehicleException;

    void deleteVehicle(Long id) throws VehicleException;

    void hardDeleteVehicle(Long id) throws VehicleException;

    PageResponse<VehicleDto> searchVehicleWithFilter(VehicleSearchRequest searchRequest);

    long getTotalActiveVehicle();

    long getTotalAvailableVehicle();
}
