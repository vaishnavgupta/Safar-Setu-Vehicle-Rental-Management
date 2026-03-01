package org.vaishnav.safarsetu.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.vaishnav.safarsetu.domain.RentalStatus;
import org.vaishnav.safarsetu.models.User;
import org.vaishnav.safarsetu.models.VehicleRentals;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Repository
public interface VehicleRentalsRepository extends JpaRepository<VehicleRentals, Long> {

    Page<VehicleRentals> findByStatus(RentalStatus status, Pageable pageable);

    Page<VehicleRentals> findByUserId(Long userId, Pageable pageable);

    Page<VehicleRentals> findByStatusAndUser(RentalStatus status, User user, Pageable pageable);

    @Query("""
       SELECT CASE WHEN COUNT(vr) > 0 THEN TRUE ELSE FALSE END FROM VehicleRentals vr
       WHERE vr.user.id=:userId AND vr.vehicle.id=:vehicleId
       AND ( vr.status = 'ACTIVE' OR vr.status = 'OVERDUE' )
""")
    boolean hasActiveCheckout(@Param("userId") Long userId, @Param("vehicleId") Long vehicleId);

    @Query("""
        SELECT COUNT(vr) FROM VehicleRentals vr
        WHERE vr.user.id=:userId AND ( vr.status=org.vaishnav.safarsetu.domain.RentalStatus.ACTIVE OR vr.status=org.vaishnav.safarsetu.domain.RentalStatus.OVERDUE)
""")
    long countActiveRentalsByUserId(@Param("userId") Long userId);

    @Query("""
        SELECT COUNT(vr) FROM VehicleRentals vr
        WHERE vr.user.id=:userId AND vr.status='OVERDUE'
""")
    long countOverdueRentalsByUserId(@Param("userId") Long userId);

    @Query("""
        SELECT vr FROM VehicleRentals vr WHERE vr.dueDate < :currentDate
        AND (vr.status='ACTIVE' OR vr.status='OVERDUE')
""")
    Page<VehicleRentals> getOverdueRentals(@Param("currentDate") LocalDateTime currentDate, Pageable pageable );

    @Query("""
        SELECT vr FROM VehicleRentals vr
        WHERE vr.vehicle.id=:vehicleId
""")
    Page<VehicleRentals> findByVehicleId(@Param("vehicleId") Long vehicleId, Pageable pageable);

    @Query("""
        SELECT vr FROM VehicleRentals vr
        WHERE vr.checkoutDate BETWEEN :startDate AND :endDate
""")
    Page<VehicleRentals> findVehicleRentalsByDateRange(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            Pageable pageable
    );

    boolean existsByUserIdAndVehicleIdAndStatus(Long userId, Long vehicleId, RentalStatus status);
}
