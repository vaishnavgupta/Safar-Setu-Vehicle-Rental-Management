package org.vaishnav.safarsetu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.vaishnav.safarsetu.models.Subscription;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    @Query("""
        SELECT s FROM Subscription as s
        WHERE s.user.id = :userId
        AND s.isActive = true
        AND s.startDate<=:todayDate AND s.endDate>=:todayDate
""")
    Optional<Subscription> findActiveSubscriptionsByUserId (
            @Param("userId") Long userId,
            @Param("todayDate")LocalDate todayDate
            );

    @Query("""
        SELECT s FROM Subscription s
        WHERE s.isActive = true AND
        s.endDate<:todayDate
""")
    List<Subscription> findExpiredActiveSubscription(
            @Param("todayDate")LocalDate todayDate
    );

}
