package org.vaishnav.safarsetu.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.vaishnav.safarsetu.domain.ReservationStatus;
import org.vaishnav.safarsetu.models.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("""
        SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM Reservation r
        WHERE r.user.id = :userId AND r.vehicle.id = :vehicleId
        AND ( r.status = 'PENDING' OR r.status = 'AVAILABLE' )
""")
    boolean hasActiveReservation(@Param("userId") Long userId, @Param("vehicleId") Long vehicleId);

    @Query("""
        SELECT COUNT(r) FROM Reservation r
        WHERE r.user.id = :userId AND ( r.status = 'PENDING' OR r.status = 'AVAILABLE' )
""")
    long countActiveReservationsByUserId(@Param("userId") Long userId);

    @Query("""
        SELECT COUNT(r) FROM Reservation r
        WHERE r.vehicle.id = :vehicleId AND r.status = 'PENDING'
""")
    long countPendingReservationsByVehicle(@Param("vehicleId") Long vehicleId);

    @Query("""
        SELECT r FROM Reservation r
        WHERE (:userId IS NULL OR r.user.id = :userId) AND
        (:vehicleId IS NULL OR r.vehicle.id = :vehicleId) AND
        (:status IS NULL OR r.status = :status) AND
        (:active = FALSE OR (r.status = 'PENDING' OR r.status = 'AVAILABLE'))
""")
    Page<Reservation> searchReservationsWithFilters(@Param("userId") Long userId,
                                                    @Param("vehicleId") Long vehicleId,
                                                    @Param("status") ReservationStatus status,
                                                    @Param("active") Boolean active,
                                                    Pageable pageable
    );
}
