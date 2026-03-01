package org.vaishnav.safarsetu.service;

import org.vaishnav.safarsetu.exception.UserException;
import org.vaishnav.safarsetu.payload.dto.ReservationDto;
import org.vaishnav.safarsetu.payload.request.ReservationRequest;
import org.vaishnav.safarsetu.payload.request.ReservationSearchRequest;
import org.vaishnav.safarsetu.payload.response.PageResponse;

public interface ReservationService {

    ReservationDto createReservation(ReservationRequest request) throws Exception;

    ReservationDto createReservationForUser(ReservationRequest request, Long userId) throws Exception;

    ReservationDto cancelReservation(Long reservationId) throws Exception;

    ReservationDto fulfillReservation(Long reservationId) throws Exception;

    PageResponse<ReservationDto> getMyReservations(ReservationSearchRequest request) throws UserException;

    PageResponse<ReservationDto> searchReservations(ReservationSearchRequest request);

}
