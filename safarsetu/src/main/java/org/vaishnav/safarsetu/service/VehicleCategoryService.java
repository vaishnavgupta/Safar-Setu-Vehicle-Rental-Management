package org.vaishnav.safarsetu.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.vaishnav.safarsetu.exception.VehicleCategoryException;
import org.vaishnav.safarsetu.payload.dto.VehicleCategoryDto;

import java.util.List;

public interface VehicleCategoryService {
    VehicleCategoryDto createVehicleCategory(VehicleCategoryDto vehicleCategoryDto) ;

    List<VehicleCategoryDto> getAllVehicleCategory();

    VehicleCategoryDto getVehicleCategoryById(Long id) throws VehicleCategoryException;

    VehicleCategoryDto updateVehicleCategory(Long id, VehicleCategoryDto vehicleCategoryDto) throws VehicleCategoryException;

    void deleteVehicleCategory(Long id) throws VehicleCategoryException;

    void hardDeleteVehicleCategory(Long id) throws VehicleCategoryException;

    List<VehicleCategoryDto> getAllCategoryWithSubCategory();

    List<VehicleCategoryDto> getTopLevelCategory();

    //Page<VehicleCategoryDto> searchVehicleCategory(String searchTerm, Pageable pageable);

    long getTotalActiveVehicleCategory();

    long getVehicleCountByCategory(Long categoryId);

}
