package org.vaishnav.safarsetu.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vaishnav.safarsetu.domain.RentalStatus;
import org.vaishnav.safarsetu.payload.dto.VehicleRentalsDto;
import org.vaishnav.safarsetu.payload.request.CheckinRequest;
import org.vaishnav.safarsetu.payload.request.CheckoutRequest;
import org.vaishnav.safarsetu.payload.request.RenewalRequest;
import org.vaishnav.safarsetu.payload.response.ApiResponse;
import org.vaishnav.safarsetu.payload.response.PageResponse;
import org.vaishnav.safarsetu.service.VehicleRentalsService;

@RestController
@RequestMapping("/api/vehicle-rentals")
@RequiredArgsConstructor
public class VehicleRentalsController {
    private final VehicleRentalsService vehicleRentalsService;

    @PostMapping("/checkout")
    public ResponseEntity<?> checkoutVehicle(@Valid @RequestBody CheckoutRequest request) {
        try {
            VehicleRentalsDto dto = vehicleRentalsService
                    .checkoutVehicle(request);
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse("Error: " + e.getMessage(), false));
        }
    }

    // AdminController -> Checkout for user

    @PostMapping("/checkin")
    public ResponseEntity<?> checkinVehicle(@Valid @RequestBody CheckinRequest request) {
        try {
            VehicleRentalsDto dto = vehicleRentalsService
                    .checkinVehicle(request);
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error: " + e.getMessage(), false));
        }
    }

    @PostMapping("/renew")
    public ResponseEntity<?> renew(@Valid @RequestBody RenewalRequest request) {
        try {
            VehicleRentalsDto dto = vehicleRentalsService
                    .renewCheckout(request);
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error: " + e.getMessage(), false));
        }
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyRentals(
            @RequestParam(required = false) RentalStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        try {
             PageResponse<VehicleRentalsDto> rentalsPage = vehicleRentalsService.getMyVehicleRentals(status, page, size);
             return ResponseEntity.ok(rentalsPage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse("Error: " + e.getMessage(), false));
        }
    }

    // AdminController -> Get All VehicleRentals
}
