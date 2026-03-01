package org.vaishnav.safarsetu.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.vaishnav.safarsetu.payload.request.TripPlannerRequest;
import org.vaishnav.safarsetu.payload.response.TripPlannerResponse;
import org.vaishnav.safarsetu.service.AITripService;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AITripController {

    private final AITripService aITripService;

    @PostMapping
    public ResponseEntity<?> getAITripRecommendation(@Valid @RequestBody TripPlannerRequest request) throws Exception {
        TripPlannerResponse response = aITripService.getFromAI(request);
        return ResponseEntity.ok(response);
    }

}
