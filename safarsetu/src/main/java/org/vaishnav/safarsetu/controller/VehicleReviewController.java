package org.vaishnav.safarsetu.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vaishnav.safarsetu.payload.dto.VehicleReviewDto;
import org.vaishnav.safarsetu.payload.request.CreateReviewRequest;
import org.vaishnav.safarsetu.payload.request.UpdateReviewRequest;
import org.vaishnav.safarsetu.payload.response.ApiResponse;
import org.vaishnav.safarsetu.payload.response.PageResponse;
import org.vaishnav.safarsetu.service.VehicleReviewService;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class VehicleReviewController {
    private final VehicleReviewService reviewService;

    @PostMapping
    public ResponseEntity<?> createReview(@Valid @RequestBody CreateReviewRequest request) {
        try {
            VehicleReviewDto dto = reviewService.createReview(request);
            return ResponseEntity.ok().body(dto);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<?> updateReview(@PathVariable Long reviewId, @Valid @RequestBody UpdateReviewRequest request) {
        try {
            VehicleReviewDto dto = reviewService.updateReview(reviewId, request);
            return ResponseEntity.ok().body(dto);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<ApiResponse> deleteReview(@PathVariable Long reviewId) throws Exception {
        reviewService.deleteReview(reviewId);
        ApiResponse response = new ApiResponse(
                "Vehicle Review deleted successfully" ,true
        );
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<?> getReviewsByVehicle(
            @PathVariable Long vehicleId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) throws Exception {
        PageResponse<VehicleReviewDto> responsePage = reviewService.getAllReviewsByVehicleId(
                vehicleId, page, size
        ) ;
        return ResponseEntity.ok().body(responsePage);
    }

}
