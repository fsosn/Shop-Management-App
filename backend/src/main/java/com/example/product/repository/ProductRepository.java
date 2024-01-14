package com.example.product.repository;

import com.example.product.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByUserId(Long userId);

    Page<Product> findAllByUserId(Long userId, Pageable pageable);

    Optional<Product> findByIdAndUserId(Long id, Long userId);
}
