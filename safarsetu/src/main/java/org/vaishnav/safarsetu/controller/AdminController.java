package org.vaishnav.safarsetu.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vaishnav.safarsetu.domain.FineStatus;
import org.vaishnav.safarsetu.domain.FineType;
import org.vaishnav.safarsetu.exception.SubscriptionPlanException;
import org.vaishnav.safarsetu.exception.VehicleCategoryException;
import org.vaishnav.safarsetu.exception.VehicleException;
import org.vaishnav.safarsetu.payload.dto.*;
import org.vaishnav.safarsetu.payload.request.CheckoutRequest;
import org.vaishnav.safarsetu.payload.request.VehicleRentalSearchRequest;
import org.vaishnav.safarsetu.payload.request.WaiveFineRequest;
import org.vaishnav.safarsetu.payload.response.ApiResponse;
import org.vaishnav.safarsetu.payload.response.PageResponse;
import org.vaishnav.safarsetu.service.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final VehicleService vehicleService;
    private final VehicleCategoryService vehicleCategoryService;
    private final SubscriptionPlanService subscriptionPlanService;
    private final SubscriptionService subscriptionService;
    private final PaymentService paymentService;
    private final VehicleRentalsService vehicleRentalsService;
    private final FineService fineService;

    // Contains all the endpoints that requires ROLE_ADMIN

    // "/vehicle"
    @PostMapping("/vehicle")
    public ResponseEntity<VehicleDto> createVehicle(@Valid @RequestBody VehicleDto vehicleDto) throws VehicleException {
        VehicleDto dto = vehicleService.createVehicle(vehicleDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PostMapping("/vehicle/bulk")
    public ResponseEntity<?> createVehicleInBulk(@Valid @RequestBody List<VehicleDto> vehicleDtos) throws VehicleException {
        List<VehicleDto> dtos = vehicleService.createVehicleInBulk(vehicleDtos);
        return ResponseEntity.status(HttpStatus.CREATED).body(dtos);
    }

    @DeleteMapping("/vehicle/{id}")
    public ResponseEntity<ApiResponse> deleteVehicle(@PathVariable Long id) throws VehicleException {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body( new ApiResponse("Vehicle soft deleted successfully", true) );
    }

    @DeleteMapping("/vehicle/{id}/hard")
    public ResponseEntity<ApiResponse> hardDeleteVehicle(@PathVariable Long id) throws VehicleException {
        vehicleService.hardDeleteVehicle(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body( new ApiResponse("Vehicle hard deleted successfully", true) );
    }

    // "/category"
    @PostMapping("/category")
    public ResponseEntity<VehicleCategoryDto> createVehicleCategory(@RequestBody VehicleCategoryDto vehicleCategoryDto) {
        VehicleCategoryDto createdVehicleCategoryDto = vehicleCategoryService.createVehicleCategory(vehicleCategoryDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdVehicleCategoryDto);
    }

    @PutMapping("/category/{id}")
    public ResponseEntity<VehicleCategoryDto> updateVehicleCategory(@PathVariable("id") Long id, @RequestBody VehicleCategoryDto vehicleCategoryDto) throws VehicleCategoryException {
        VehicleCategoryDto dto = vehicleCategoryService.updateVehicleCategory(id, vehicleCategoryDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @DeleteMapping("/category/{id}")
    public ResponseEntity<?> deleteVehicleCategory(@PathVariable("id") Long id) throws VehicleCategoryException {
        vehicleCategoryService.deleteVehicleCategory(id);
        ApiResponse apiResponse = new ApiResponse("Vehicle Category - Soft Deleted", true);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(apiResponse);
    }

    @DeleteMapping("/category/{id}/hard")
    public ResponseEntity<?> deleteVehicleCategoryHard(@PathVariable("id") Long id) throws VehicleCategoryException {
        vehicleCategoryService.hardDeleteVehicleCategory(id);
        ApiResponse apiResponse = new ApiResponse("Vehicle Category - Hard Deleted", true);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(apiResponse);
    }

    // " /subscription-plans "

    @PostMapping("/subscription-plans")
    public ResponseEntity<SubscriptionPlanDto> createSubscriptionPlan( @Valid @RequestBody SubscriptionPlanDto subscriptionPlanDto ) throws SubscriptionPlanException {
        SubscriptionPlanDto createdSubscriptionPlanDto = subscriptionPlanService.createSubscriptionPlan(subscriptionPlanDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSubscriptionPlanDto);
    }

    @PutMapping("/subscription-plans/{id}")
    public ResponseEntity<SubscriptionPlanDto> updateSubscriptionPlan(@PathVariable Long id, @Valid @RequestBody SubscriptionPlanDto subscriptionPlanDto ) throws SubscriptionPlanException {
        SubscriptionPlanDto updateSubscriptionPlanDto = subscriptionPlanService.updateSubscriptionPlan(id, subscriptionPlanDto);
        return ResponseEntity.status(HttpStatus.OK).body(updateSubscriptionPlanDto);
    }

    @DeleteMapping("/subscription-plans/{id}")
    public ResponseEntity<ApiResponse> deleteSubscriptionPlan(@PathVariable Long id) throws SubscriptionPlanException {
        subscriptionPlanService.deleteSubscriptionPlan(id);

        ApiResponse apiResponse = new ApiResponse("Subscription Plan with id:" + id + " - Deleted Successfully", true);

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

    // " /subscriptions "
    @GetMapping("/subscriptions")
    public ResponseEntity< ? > getAllActiveSubscriptions() {
        int page = 0;
        int size = 10;
        Pageable pageable = PageRequest.of(page, size);
        List<SubscriptionDto> allSubscriptions = subscriptionService.getAllSubscriptions( pageable );
        return ResponseEntity.ok(allSubscriptions);
    }

    @GetMapping("/subscriptions/deactivate-expired")
    public ResponseEntity< ? > deactivateExpiredSubscriptions() throws Exception {
        subscriptionService.deactivateExpiredSubscription();
        ApiResponse response = new ApiResponse(
                "All expired subscriptions deactivated successfully",
                true
        );
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // " /payments "

    @GetMapping("/payments")
    public ResponseEntity<?> getAllPayments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortOrder
    ) {
        Sort sort = sortOrder.equalsIgnoreCase("DESC")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<PaymentDto> allPayments = paymentService.getAllPayments(pageable);
        return ResponseEntity.ok(allPayments);
    }

    // " /vehicle-rentals "

    @PostMapping("/vehicle-rentals/checkout/{userId}")
    public ResponseEntity<?> checkoutVehicleForUser(@PathVariable Long userId, @Valid @RequestBody CheckoutRequest request) {
        try {
            VehicleRentalsDto dto = vehicleRentalsService
                    .checkoutVehicleForUser(userId, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(dto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse("Admin Bad Request: " + e.getMessage(), false));
        }
    }

    @PostMapping("/vehicle-rentals/search")
    public ResponseEntity<?> searchAllRentals(@RequestBody VehicleRentalSearchRequest request) {
        try {
            PageResponse<VehicleRentalsDto> pageDto = vehicleRentalsService
                    .getAllVehicleRentals( request);
            return ResponseEntity.status(HttpStatus.OK).body(pageDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Unable to search: " + e.getMessage(), false));
        }
    }

    @PutMapping("/vehicle-rentals/update-overdue")
    public ResponseEntity<?> updateOverdue() {
        try {
            int cnt = vehicleRentalsService.updateOverdueVehicleRentals();
            return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Updated Successfully\nUpdated Records: "+ cnt, true));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Unable to update overdue: " + e.getMessage(), false));
        }
    }

    // " /fine "
    @PostMapping("/fine/waive")
    public ResponseEntity<?> waiveFine(@Valid @RequestBody WaiveFineRequest request) {
        try{
            FineDto dto = fineService.waiveFine(request);
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body( new ApiResponse("Error: " + e.getMessage(),false) );
        }
    }

    @GetMapping("/fine/all")
    public ResponseEntity<?> getAllFines(
            @RequestParam(required = false) FineStatus status,
            @RequestParam(required = false) FineType type,
            @RequestParam(required = false) Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        try{
            PageResponse<FineDto> dtoPageResponse = fineService.getAllFines(
                    status, type, userId, page, size
            );
            return ResponseEntity.ok(dtoPageResponse);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body( new ApiResponse("Error: " + e.getMessage(),false) );
        }
    }

}
