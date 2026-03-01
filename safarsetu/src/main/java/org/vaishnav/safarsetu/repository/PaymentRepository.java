package org.vaishnav.safarsetu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vaishnav.safarsetu.models.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
