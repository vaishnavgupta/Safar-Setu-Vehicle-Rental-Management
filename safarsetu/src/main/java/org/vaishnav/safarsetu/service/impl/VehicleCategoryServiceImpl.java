package org.vaishnav.safarsetu.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.vaishnav.safarsetu.exception.VehicleCategoryException;
import org.vaishnav.safarsetu.mapper.VehicleCategoryMapper;
import org.vaishnav.safarsetu.models.VehicleCategory;
import org.vaishnav.safarsetu.payload.dto.VehicleCategoryDto;
import org.vaishnav.safarsetu.repository.VehicleCategoryRepository;
import org.vaishnav.safarsetu.service.VehicleCategoryService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VehicleCategoryServiceImpl implements VehicleCategoryService {

    private final VehicleCategoryRepository vehicleCategoryRepository;
    private final VehicleCategoryMapper vehicleCategoryMapper;


    @Override
    public VehicleCategoryDto createVehicleCategory(VehicleCategoryDto vehicleCategoryDto) {

        VehicleCategory vehicleCategory = VehicleCategoryMapper.getVehicleCategory(vehicleCategoryDto);

        if(vehicleCategoryDto.getParentCategoryId() != null){
            VehicleCategory parentCategory = vehicleCategoryRepository.findById(vehicleCategoryDto.getParentCategoryId())
                    .orElseThrow(() -> new RuntimeException("Parent Category Not Found"));
            vehicleCategory.setParentCategory(parentCategory);
        }

        VehicleCategory savedVehicleCategory = vehicleCategoryRepository.save(vehicleCategory);

        return VehicleCategoryMapper.getVehicleCategoryDto(savedVehicleCategory);
    }

    @Override
    public List<VehicleCategoryDto> getAllVehicleCategory() {
        List<VehicleCategory> vehicleCategoryList = vehicleCategoryRepository.findAll();

        return vehicleCategoryList.stream()
                .map(category -> VehicleCategoryMapper.getVehicleCategoryDto(category))
                .collect(Collectors.toList());
    }

    @Override
    public VehicleCategoryDto getVehicleCategoryById(Long id) throws VehicleCategoryException {
        VehicleCategory vehicleCategory = vehicleCategoryRepository.findById(id)
                .orElseThrow(() -> new VehicleCategoryException("Vehicle Category Not Found"));

        return VehicleCategoryMapper.getVehicleCategoryDto(vehicleCategory);
    }

    @Override
    public VehicleCategoryDto updateVehicleCategory(Long id, VehicleCategoryDto vehicleCategoryDto) throws VehicleCategoryException {
        VehicleCategory existingCategory = vehicleCategoryRepository.findById(id)
                .orElseThrow(() -> new VehicleCategoryException("Vehicle Category Not Found"));

        vehicleCategoryMapper.updateEntityFromDto(vehicleCategoryDto, existingCategory);

        VehicleCategory savedVehicleCategory = vehicleCategoryRepository.save(existingCategory);

        return VehicleCategoryMapper.getVehicleCategoryDto(savedVehicleCategory);
    }

    @Override
    public void deleteVehicleCategory(Long id) throws VehicleCategoryException {
        VehicleCategory existingCategory = vehicleCategoryRepository.findById(id)
                .orElseThrow(() -> new VehicleCategoryException("Vehicle Category Not Found"));

        existingCategory.setActive(false);
        vehicleCategoryRepository.save(existingCategory);
    }

    @Override
    public void hardDeleteVehicleCategory(Long id) throws VehicleCategoryException {
        VehicleCategory existingCategory = vehicleCategoryRepository.findById(id)
                .orElseThrow(() -> new VehicleCategoryException("Vehicle Category Not Found"));

        vehicleCategoryRepository.delete(existingCategory);
    }

    @Override
    public List<VehicleCategoryDto> getAllCategoryWithSubCategory() {
        List<VehicleCategory> topLevelVehicleCategory = vehicleCategoryRepository
                .findByParentCategoryIsNullAndActiveTrueOrderByDisplayOrderAsc();
        List<VehicleCategoryDto> lstDto = new ArrayList<>();
        for(VehicleCategory vehicleCategory : topLevelVehicleCategory){
            lstDto.add(VehicleCategoryMapper.getVehicleCategoryDto(vehicleCategory));
        }

        return lstDto;
    }

    @Override
    public List<VehicleCategoryDto> getTopLevelCategory() {
        List<VehicleCategory> topLevelVehicleCategory = vehicleCategoryRepository
                .findByParentCategoryIsNullAndActiveTrueOrderByDisplayOrderAsc();
        List<VehicleCategoryDto> lstDto = new ArrayList<>();
        for(VehicleCategory vehicleCategory : topLevelVehicleCategory){
            lstDto.add(VehicleCategoryMapper.getVehicleCategoryDto(vehicleCategory));
        }

        return lstDto;
    }

    @Override
    public long getTotalActiveVehicleCategory() {
        return vehicleCategoryRepository.countByActiveTrue();
    }

    @Override
    public long getVehicleCountByCategory(Long categoryId) {
        return 0;
    }


}
