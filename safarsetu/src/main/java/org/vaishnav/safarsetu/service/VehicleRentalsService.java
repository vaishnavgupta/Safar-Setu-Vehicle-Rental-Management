package org.vaishnav.safarsetu.service;

import org.vaishnav.safarsetu.domain.RentalStatus;
import org.vaishnav.safarsetu.exception.UserException;
import org.vaishnav.safarsetu.exception.VehicleException;
import org.vaishnav.safarsetu.payload.dto.VehicleRentalsDto;
import org.vaishnav.safarsetu.payload.request.CheckinRequest;
import org.vaishnav.safarsetu.payload.request.CheckoutRequest;
import org.vaishnav.safarsetu.payload.request.RenewalRequest;
import org.vaishnav.safarsetu.payload.request.VehicleRentalSearchRequest;
import org.vaishnav.safarsetu.payload.response.PageResponse;

public interface VehicleRentalsService {

    VehicleRentalsDto checkoutVehicle(CheckoutRequest request) throws Exception;

    VehicleRentalsDto checkoutVehicleForUser(Long userId, CheckoutRequest request) throws Exception;

    VehicleRentalsDto checkinVehicle(CheckinRequest request) throws Exception;

    VehicleRentalsDto renewCheckout(RenewalRequest request) throws Exception;

    PageResponse<VehicleRentalsDto> getMyVehicleRentals(
            RentalStatus status,        //filter a/q to Status
            int page,
            int size
    ) throws UserException;

    PageResponse<VehicleRentalsDto> getAllVehicleRentals(
            VehicleRentalSearchRequest request
    );

    int updateOverdueVehicleRentals();
}
