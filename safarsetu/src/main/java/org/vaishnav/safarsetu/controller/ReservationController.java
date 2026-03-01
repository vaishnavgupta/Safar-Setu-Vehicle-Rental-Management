package org.vaishnav.safarsetu.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vaishnav.safarsetu.domain.ReservationStatus;
import org.vaishnav.safarsetu.exception.UserException;
import org.vaishnav.safarsetu.payload.dto.ReservationDto;
import org.vaishnav.safarsetu.payload.request.ReservationRequest;
import org.vaishnav.safarsetu.payload.request.ReservationSearchRequest;
import org.vaishnav.safarsetu.payload.response.ApiResponse;
import org.vaishnav.safarsetu.payload.response.PageResponse;
import org.vaishnav.safarsetu.service.ReservationService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reservations")
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<?> createReservation(@Valid @RequestBody ReservationRequest request) {
        try{
            ReservationDto dto = reservationService.createReservation(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(dto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body( new ApiResponse("Error: " + e.getMessage(), false) );
        }
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<?> createReservationForUser(@PathVariable Long userId, @Valid @RequestBody ReservationRequest request) {
        try{
            ReservationDto dto = reservationService.createReservationForUser(request, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(dto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body( new ApiResponse("Error: " + e.getMessage(), false) );
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelReservation(@PathVariable Long id) {
        try{
            ReservationDto dto = reservationService.cancelReservation(id);
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body( new ApiResponse("Error: " + e.getMessage(), false) );
        }
    }

    @PostMapping("/{id}/fulfill")
    public ResponseEntity<?> fulfillReservation(@PathVariable Long id) {
        try{
            ReservationDto dto = reservationService.fulfillReservation(id);
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body( new ApiResponse("Error: " + e.getMessage(), false) );
        }
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyReservations(
            @RequestParam(required = false) ReservationStatus status,
            @RequestParam(defaultValue = "false") Boolean activeOnly,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "DESC") String sortDirection,
            @RequestParam(defaultValue = "reservedAt") String sortBy
    ) throws UserException {
        ReservationSearchRequest request = ReservationSearchRequest.builder()
                .status(status)
                .active0nly(activeOnly)
                .page(page)
                .size(size)
                .sortDirection(sortDirection)
                .sortBy(sortBy)
                .build();
        PageResponse<ReservationDto> dtoPageResponse = reservationService.getMyReservations(
                request
        );
        return ResponseEntity.status(HttpStatus.OK).body(dtoPageResponse);
    }


    @GetMapping
    public ResponseEntity<?> searchReservations(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) Long vehicleId,
            @RequestParam(required = false) ReservationStatus status,
            @RequestParam(required = false) Boolean activeOnly,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "DESC") String sortDirection,
            @RequestParam(defaultValue = "reservedAt") String sortBy
    )  {
        ReservationSearchRequest request = ReservationSearchRequest.builder()
                .userId(userId)
                .vehicleId(vehicleId)
                .status(status)
                .active0nly(activeOnly)
                .page(page)
                .size(size)
                .sortDirection(sortDirection)
                .sortBy(sortBy)
                .build();
        PageResponse<ReservationDto> dtoPageResponse = reservationService.searchReservations(
                request
        );
        return ResponseEntity.status(HttpStatus.OK).body(dtoPageResponse);
    }

}
