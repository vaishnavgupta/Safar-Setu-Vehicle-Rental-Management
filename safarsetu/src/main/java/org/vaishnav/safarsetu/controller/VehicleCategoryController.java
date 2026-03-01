package org.vaishnav.safarsetu.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vaishnav.safarsetu.exception.VehicleCategoryException;
import org.vaishnav.safarsetu.payload.dto.VehicleCategoryDto;
import org.vaishnav.safarsetu.payload.response.ApiResponse;
import org.vaishnav.safarsetu.service.VehicleCategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class VehicleCategoryController {

    private final VehicleCategoryService vehicleCategoryService;

    @GetMapping
    public ResponseEntity< List<VehicleCategoryDto> > getAllVehicleCategory() {
        List<VehicleCategoryDto> vehicleCategoryDtoList = vehicleCategoryService.getAllVehicleCategory();
        return ResponseEntity.ok(vehicleCategoryDtoList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehicleCategoryDto> getVehicleCategoryById(@PathVariable("id") Long id) throws VehicleCategoryException {
        VehicleCategoryDto dto = vehicleCategoryService.getVehicleCategoryById(id);
        return ResponseEntity.ok(dto);
    }

    // TODO : Get Vehicle Category with Subcategory

    @GetMapping("/top-level")
    public ResponseEntity<?> getTopVehicleCategory() {
        List<VehicleCategoryDto> dtoList = vehicleCategoryService.getTopLevelCategory();
        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/count")
    public ResponseEntity<?> getTotalActiveCategory(){
        return ResponseEntity.ok( vehicleCategoryService.getTotalActiveVehicleCategory() );
    }

    @GetMapping("/{id}/vehicle-count")
    public ResponseEntity<?> getVehicleCountByCategory(@PathVariable("id") Long id){
        return ResponseEntity.ok( vehicleCategoryService.getVehicleCountByCategory(id) );
    }
}
