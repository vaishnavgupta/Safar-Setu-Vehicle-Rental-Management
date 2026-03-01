package org.vaishnav.safarsetu.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.vaishnav.safarsetu.mapper.VehicleReviewMapper;
import org.vaishnav.safarsetu.models.User;
import org.vaishnav.safarsetu.models.Vehicle;
import org.vaishnav.safarsetu.models.VehicleReview;
import org.vaishnav.safarsetu.payload.dto.VehicleReviewDto;
import org.vaishnav.safarsetu.payload.request.CreateReviewRequest;
import org.vaishnav.safarsetu.payload.request.UpdateReviewRequest;
import org.vaishnav.safarsetu.payload.response.PageResponse;
import org.vaishnav.safarsetu.repository.VehicleRepository;
import org.vaishnav.safarsetu.repository.VehicleReviewRepository;
import org.vaishnav.safarsetu.service.UserService;
import org.vaishnav.safarsetu.service.VehicleReviewService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleReviewServiceImpl implements VehicleReviewService {
    private final VehicleReviewRepository vehicleReviewRepository;
    private final UserService userService;
    private final VehicleRepository  vehicleRepository;
    private final VehicleReviewMapper vehicleReviewMapper;

    @Override
    public VehicleReviewDto createReview(CreateReviewRequest request) throws Exception {
        User currUser = userService.getCurrentUser();

        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new Exception("Vehicle Not Found with id: " + request.getVehicleId()));

        //exists by userId and bookId
        if( vehicleReviewRepository.existsByUserIdAndVehicleId(currUser.getId(), vehicle.getId()) ) {
            throw new Exception("Vehicle Review already exists for user with id " + currUser.getId() + " and vehicle with id " + vehicle.getId());
        }

        VehicleReview vehicleReview = VehicleReview.builder()
                .user(currUser)
                .vehicle(vehicle)
                .rating(request.getRating())
                .reviewText(request.getReviewText())
                .title(request.getTitle())
                .build();

        VehicleReview savedReview = vehicleReviewRepository.save(vehicleReview);

        return vehicleReviewMapper.reviewToDto(savedReview);
    }

    @Override
    public VehicleReviewDto updateReview(Long reviewId, UpdateReviewRequest request) throws Exception {
        User currUser = userService.getCurrentUser();

        VehicleReview review = vehicleReviewRepository.findById(reviewId)
                .orElseThrow(() -> new Exception("Vehicle Review does not exists with id: " + reviewId));

        if ( !review.getUser().getId().equals(currUser.getId()) ) {
            throw new Exception("User does not belong to this vehicle review. AUTH_ERROR ");
        }

        review.setRating(request.getRating());
        review.setReviewText(request.getReviewText());
        review.setTitle(request.getTitle());

        VehicleReview savedReview = vehicleReviewRepository.save(review);
        return vehicleReviewMapper.reviewToDto(savedReview);
    }

    @Override
    public void deleteReview(Long reviewId) throws Exception {
        User currUser = userService.getCurrentUser();

        VehicleReview review = vehicleReviewRepository.findById(reviewId)
                .orElseThrow(() -> new Exception("Vehicle Review does not exists with id: " + reviewId));

        if ( !review.getUser().getId().equals(currUser.getId()) ) {
            throw new Exception("User does not belong to this vehicle review. AUTH_ERROR ");
        }

        vehicleReviewRepository.delete(review);
    }

    @Override
    public PageResponse<VehicleReviewDto> getAllReviewsByVehicleId(Long vehicleId, int page, int size) {
        page = Math.min(page, 1000);
        size = Math.min(size, 200);
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        Page<VehicleReview> reviewPage = vehicleReviewRepository.findByVehicleId(vehicleId, pageable);

        List<VehicleReviewDto> dtoList = reviewPage.getContent()
                .stream()
                .map(vehicleReviewMapper::reviewToDto)
                .toList();

        PageResponse<VehicleReviewDto> response = new PageResponse<>();

        response.setContent(dtoList);
        response.setFirst(reviewPage.isFirst());
        response.setLast(reviewPage.isLast());
        response.setTotalElements(reviewPage.getTotalElements());
        response.setTotalPages(reviewPage.getTotalPages());
        response.setPageSize(reviewPage.getSize());
        response.setEmpty(reviewPage.isEmpty());

        return response;
    }
}
