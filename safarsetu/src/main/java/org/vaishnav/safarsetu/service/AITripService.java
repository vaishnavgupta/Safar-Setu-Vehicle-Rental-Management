package org.vaishnav.safarsetu.service;

import org.vaishnav.safarsetu.models.Vehicle;
import org.vaishnav.safarsetu.payload.request.TripPlannerRequest;
import org.vaishnav.safarsetu.payload.response.TripPlannerResponse;

import java.util.List;
import java.util.Map;

public interface AITripService {

    List<Vehicle> filterVehicles(TripPlannerRequest request);

    String buildPrompt(
            TripPlannerRequest request
    );

    TripPlannerResponse getFromAI(TripPlannerRequest request) throws Exception;

}
