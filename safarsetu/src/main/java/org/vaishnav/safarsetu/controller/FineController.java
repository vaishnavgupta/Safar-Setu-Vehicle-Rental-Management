package org.vaishnav.safarsetu.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vaishnav.safarsetu.domain.FineStatus;
import org.vaishnav.safarsetu.domain.FineType;
import org.vaishnav.safarsetu.payload.dto.FineDto;
import org.vaishnav.safarsetu.payload.request.CreateFineRequest;
import org.vaishnav.safarsetu.payload.response.ApiResponse;
import org.vaishnav.safarsetu.payload.response.PaymentInitiateResponse;
import org.vaishnav.safarsetu.service.FineService;

import java.util.List;

@RestController
@RequestMapping("/api/fine")
@RequiredArgsConstructor
public class FineController {

    private final FineService fineService;

    @PostMapping
    public ResponseEntity<?> createFine(
            @Valid @RequestBody CreateFineRequest request
    ) {
        try{
            FineDto dto = fineService.createFine(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(dto);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body( new ApiResponse("Error: " + e.getMessage(),false) );
        }
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<?> payFine(
            @PathVariable Long id,
            @RequestParam(required = false) String transactionId
    ) {
        try{
            PaymentInitiateResponse response = fineService.payFine(id, transactionId);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body( new ApiResponse("Error: " + e.getMessage(),false) );
        }
    }

    // AdminController -> Waive Fine

    @GetMapping
    public ResponseEntity<?> getMyFines(
            @RequestParam(required = false) FineStatus status,
            @RequestParam(required = false) FineType type
            ) {
        try{
            List<FineDto> dtoList = fineService.getMyFines(status, type);
            return ResponseEntity.status(HttpStatus.OK).body(dtoList);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body( new ApiResponse("Error: " + e.getMessage(),false) );
        }
    }

    // AdminController -> Get All Fines

}
