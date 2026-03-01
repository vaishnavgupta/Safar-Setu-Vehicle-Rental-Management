package org.vaishnav.safarsetu.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.vaishnav.safarsetu.models.Vehicle;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    Optional<Vehicle> findByRegistrationNumber(String registrationNumber);

    boolean existsByRegistrationNumber(String registrationNumber);

    @Query("""
    SELECT v FROM Vehicle v
    WHERE
    (
        :searchTerm IS NULL OR
        lower(v.modelName) LIKE lower(concat('%', :searchTerm, '%')) OR
        lower(v.brand) LIKE lower(concat('%', :searchTerm, '%')) OR
        lower(v.registrationNumber) LIKE lower(concat('%', :searchTerm, '%'))
    )
    AND (:categoryId IS NULL OR v.category.id = :categoryId)
    AND (:availableOnly IS NULL OR :availableOnly = false OR v.availableUnits > 0)
    AND v.active = true
""")
    Page<Vehicle> searchVehicleWithFilters(
            @Param("searchTerm") String searchTerm,
            @Param("categoryId") Long categoryId,
            @Param("availableOnly") boolean availableOnly,
            Pageable pageable
    );

    long countByActiveTrue();

    @Query("SELECT COUNT(v) FROM Vehicle v WHERE v.availableUnits > 0 AND v.active = true")
    long countAvailableUnits();

    List<Vehicle> findByActiveTrue();

}
