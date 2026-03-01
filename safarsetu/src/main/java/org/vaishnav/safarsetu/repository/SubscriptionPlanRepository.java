package org.vaishnav.safarsetu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vaishnav.safarsetu.models.SubscriptionPlan;

import java.util.Optional;

@Repository
public interface SubscriptionPlanRepository extends JpaRepository<SubscriptionPlan,Long> {

    boolean existsByPlanCode (String planCode);
    Optional<SubscriptionPlan> findByPlanCode(String planCode);

}
