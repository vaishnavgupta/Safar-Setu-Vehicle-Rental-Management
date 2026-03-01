package org.vaishnav.safarsetu.service;

import org.vaishnav.safarsetu.exception.UserException;
import org.vaishnav.safarsetu.payload.dto.VehicleReviewDto;
import org.vaishnav.safarsetu.payload.request.CreateReviewRequest;
import org.vaishnav.safarsetu.payload.request.UpdateReviewRequest;
import org.vaishnav.safarsetu.payload.response.PageResponse;

public interface VehicleReviewService {

    public VehicleReviewDto createReview(CreateReviewRequest request) throws Exception;

    public VehicleReviewDto updateReview(Long reviewId, UpdateReviewRequest request) throws Exception;

    void deleteReview(Long reviewId) throws Exception;

    PageResponse<VehicleReviewDto> getAllReviewsByVehicleId(Long vehicleId, int page, int size);

}
