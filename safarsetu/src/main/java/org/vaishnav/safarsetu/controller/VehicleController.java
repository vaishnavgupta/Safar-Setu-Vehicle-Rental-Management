package org.vaishnav.safarsetu.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vaishnav.safarsetu.exception.VehicleException;
import org.vaishnav.safarsetu.payload.dto.VehicleDto;
import org.vaishnav.safarsetu.payload.request.VehicleSearchRequest;
import org.vaishnav.safarsetu.payload.response.PageResponse;
import org.vaishnav.safarsetu.service.VehicleService;

@RestController
@RequestMapping("/api/vehicle")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;


    @GetMapping("/{id}")
    public ResponseEntity<?> getVehicleById(@PathVariable Long id) throws VehicleException {
        VehicleDto dto = vehicleService.getVehicleById(id);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateVehicle(@PathVariable Long id, @RequestBody VehicleDto vehicleDto) throws VehicleException {
        VehicleDto dto = vehicleService.updateVehicle(id, vehicleDto);
        return ResponseEntity.ok(dto);
    }



    @PostMapping("/search")
    public ResponseEntity<PageResponse<VehicleDto>> advancedSearch(@RequestBody VehicleSearchRequest vehicleSearchRequest){
        PageResponse<VehicleDto> response = vehicleService.searchVehicleWithFilter(
                vehicleSearchRequest
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats")
    public ResponseEntity<VehicleStatsResponse> getVehicleStats(){
        long totalActive = vehicleService.getTotalActiveVehicle();
        long totalVehicleAvailable = vehicleService.getTotalAvailableVehicle();

        VehicleStatsResponse statsResponse = new VehicleStatsResponse(totalActive, totalVehicleAvailable);
        return ResponseEntity.ok(statsResponse);
    }


    public static class VehicleStatsResponse {
        public long totalActive;
        public long totalVehicleAvailable;
        public VehicleStatsResponse(long totalActive, long totalVehicleAvailable) {
            this.totalActive = totalActive;
            this.totalVehicleAvailable = totalVehicleAvailable;
        }
    }

}
