package org.vaishnav.safarsetu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.vaishnav.safarsetu.models.VehicleCategory;

import java.util.List;

@Repository
public interface VehicleCategoryRepository extends JpaRepository<VehicleCategory, Long> {

    List<VehicleCategory> findByActiveTrueOrderByDisplayOrderAsc();

    List<VehicleCategory> findByParentCategoryIsNullAndActiveTrueOrderByDisplayOrderAsc();

    List<VehicleCategory> findByParentCategoryAndActiveTrueOrderByDisplayOrderAsc(VehicleCategory parentCategory);

    long countByActiveTrue();

//    @Query("SELECT COUNT(b) FROM book AS b WHERE b.category.id = :categoryId")
//    long countVehicleByCategory(@Param("categoryId") Long categoryId);

}
