package com.example.product.service;

import com.example.product.exception.ProductNotFoundException;
import com.example.product.model.Product;
import com.example.product.repository.ProductRepository;
import com.example.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductService(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    private Long getCurrentUserId() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByEmail(userDetails.getUsername()).orElseThrow().getId();
    }

    public Product getProductById(Long id) {
        return productRepository.findByIdAndUserId(id, getCurrentUserId())
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    public List<Product> getAllProducts() {
        return productRepository.findByUserId(getCurrentUserId());
    }

    public Page<Product> getProducts(int page, int size) {
        PageRequest pr = PageRequest.of(page, size);
        return productRepository.findByUserId(getCurrentUserId(), pr);
    }

    public Product createProduct(Product product) {
        product.setUserId(getCurrentUserId());
        return productRepository.save(product);
    }

    @Transactional
    public Product updateProduct(Long id, Product updatedProduct) {
        Product existingProduct = getProductById(id);

        if (!existingProduct.getUserId().equals(getCurrentUserId())) {
            throw new AccessDeniedException("Current user does not own the product with id: " + existingProduct.getId());
        }

        existingProduct.setTitle(updatedProduct.getTitle());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setPrice(updatedProduct.getPrice());

        return productRepository.save(existingProduct);
    }

    public void deleteProduct(Long id) {
        Product existingProduct = getProductById(id);

        if (!existingProduct.getUserId().equals(getCurrentUserId())) {
            throw new AccessDeniedException("Current user does not own the product with id: " + existingProduct.getId());
        }

        productRepository.delete(existingProduct);
    }
}
