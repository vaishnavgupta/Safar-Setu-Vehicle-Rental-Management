package org.vaishnav.safarsetu.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.vaishnav.safarsetu.payload.response.ApiResponse;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(VehicleCategoryException.class)
    private ResponseEntity<ApiResponse> handleCategoryException( VehicleCategoryException exception ){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body( new ApiResponse(exception.getMessage(), false) );
    }

}
