package org.vaishnav.safarsetu.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.vaishnav.safarsetu.config.AppConstants;
import org.vaishnav.safarsetu.config.GeminiClientService;
import org.vaishnav.safarsetu.models.Vehicle;
import org.vaishnav.safarsetu.payload.request.TripPlannerRequest;
import org.vaishnav.safarsetu.payload.response.TripPlannerResponse;
import org.vaishnav.safarsetu.repository.VehicleRepository;
import org.vaishnav.safarsetu.service.AITripService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class AITripServiceImpl implements AITripService {
    private final VehicleRepository vehicleRepository;
    private final GeminiClientService  geminiClientService;
    private final ObjectMapper objectMapper;

    @Override
    public List<Vehicle> filterVehicles(TripPlannerRequest request) {
        List<Vehicle> vehicles = vehicleRepository.findByActiveTrue();

        return vehicles.stream()
                .filter(vehicle -> vehicle.getSeatingCapacity() >= request.getPassengers())
                .filter(vehicle -> vehicle.getAvailableUnits() > 0)
                .limit(3)
                .toList();
    }

    private double calculateTripCost(Vehicle vehicle, TripPlannerRequest request) {
        double rentalCost = vehicle.getRentalPrice().doubleValue() * request.getDurationDays();
        double fuelCost = request.getDistanceKm() * AppConstants.FUEL_AVERAGE_COST;
        return rentalCost + fuelCost;
    }

    @Override
    public String buildPrompt(TripPlannerRequest request) {
        List<Vehicle> vehicles = filterVehicles(request);

        Map<String, Double> costMap = new HashMap<>();

        for (Vehicle vehicle : vehicles) {
            double tripCost = calculateTripCost(vehicle, request);
            costMap.put(vehicle.getModelName(), tripCost);
        }

        StringBuilder vehicleSection = new StringBuilder();
        int index = 1;

        for (Vehicle v : vehicles) {
            Double cost = costMap.get(v.getModelName());

            vehicleSection.append(index++)
                    .append(". ")
                    .append(v.getModelName())
                    .append(" (")
                    .append(v.getCategory().getName())
                    .append(")")
                    .append(" – Estimated Cost: ")
                    .append(cost)
                    .append(" INR\n");
        }
        String tripDetails = String.format("""
                                User trip details:
                                Distance: %d km
                                Duration: %d days
                                Passengers: %d
                                Budget: %.2f INR
                                Trip Type: %s
                                Luggage Required: %s
                        """,
                request.getDistanceKm(),
                request.getDurationDays(),
                request.getPassengers(),
                request.getBudget(),
                request.getTripType(),
                request.getLuggageRequired() ? "Yes" : "No"
        );

        return """
                You are an intelligent vehicle recommendation assistant for Safar Setu - Vehicle Rental Management System.
                
                %s
                
                Available vehicles:
                %s
                
                SafarSetu Features:
                - Flexible rental plans
                - Affordable subscription discounts
                - Well maintained fleet
                - 24/7 roadside support
                - Transparent pricing
                
                Tasks:
                1. Recommend ONE vehicle strictly from the list only.
                2. Explain clearly why it suits the user's trip.
                3. Suggest one alternative from the list.
                4. Add an attractive and persuasive call-to-action.
                5. Do NOT invent new vehicles.
                
                If no vehicle fits budget, recommend closest match.
                Return response strictly in JSON format:
                
                {
                  "recommendedVehicle": "",
                  "reason": "",
                  "alternativeVehicle": "",
                  "callToAction": "",
                  "estimatedCost": ""
                }
                """.formatted(tripDetails, vehicleSection.toString());
    }



    private String extractTextFromGeminiResponse(String rawResponse) throws Exception {

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(rawResponse);

        return root
                .path("candidates")
                .get(0)
                .path("content")
                .path("parts")
                .get(0)
                .path("text")
                .asText();
    }

    private String extractJson(String aiText) {

        int start = aiText.indexOf("{");
        int end = aiText.lastIndexOf("}");

        if (start != -1 && end != -1) {
            return aiText.substring(start, end + 1);
        }

        throw new RuntimeException("Invalid AI JSON response");
    }

    @Override
    public TripPlannerResponse getFromAI(TripPlannerRequest request) {

        try {

            String prompt = buildPrompt(request);

            String rawResponse = geminiClientService.callGemini(prompt);

            if (rawResponse == null || rawResponse.isBlank()) {
                throw new RuntimeException("Empty AI response");
            }

            String aiText = extractTextFromGeminiResponse(rawResponse);

            String jsonText = extractJson(aiText);

            TripPlannerResponse response =
                    objectMapper.readValue(jsonText, TripPlannerResponse.class);

            validateAIResponse(response);

            return response;

        } catch (Exception e) {
            System.err.println(e.getMessage());
            return fallbackRecommendation(request);
        }
    }

    private void validateAIResponse(TripPlannerResponse response) {

        if (response.getRecommendedVehicle() == null ||
                response.getRecommendedVehicle().isBlank()) {
            throw new RuntimeException("Invalid AI vehicle recommendation");
        }

        if (response.getReason() == null ||
                response.getReason().length() < 10) {
            throw new RuntimeException("Invalid AI reasoning");
        }
    }

    private TripPlannerResponse fallbackRecommendation(TripPlannerRequest request) {

        return TripPlannerResponse.builder()
                .recommendedVehicle("Sedan")
                .reason("Based on your trip details, this vehicle fits well.")
                .alternativeVehicle("SUV")
                .callToAction("Login now to explore available vehicles on SafarSetu!")
                .matchPercentage(85)
                .build();
    }



}
