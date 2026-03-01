package org.vaishnav.safarsetu.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.vaishnav.safarsetu.models.VehicleReview;

@Repository
public interface VehicleReviewRepository extends JpaRepository<VehicleReview, Long> {

    @Query("""
        SELECT vr FROM VehicleReview vr
        WHERE vr.vehicle.id = :vehicleId
""")
    Page<VehicleReview> findByVehicleId(@Param("vehicleId") Long vehicleId, Pageable pageable);

    boolean existsByUserIdAndVehicleId(Long userId, Long vehicleId);

}
