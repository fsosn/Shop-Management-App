package com.example.order.service;

import com.example.order.exception.OrderNotFoundException;
import com.example.order.model.Order;
import com.example.order.repository.OrderRepository;
import com.example.product.exception.ProductNotFoundException;
import com.example.product.model.Product;
import com.example.product.repository.ProductRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;

@Service
@Validated
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(id));
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Page<Order> getAllOrders(int page, int size) {
        PageRequest pr = PageRequest.of(page, size);
        return orderRepository.findAll(pr);
    }

    public List<Product> getProductListById(Long id) {
        return orderRepository.getOrderProductListById(id);
    }

    public Order createOrder(@Valid Order order) {
        return orderRepository.save(order);
    }

    @Transactional
    public Order updateOrder(Long id, @Valid Order updatedOrder) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setStatus(updatedOrder.getStatus());
                    order.setCustomerId(updatedOrder.getCustomerId());
                    order.setOrderDate(updatedOrder.getOrderDate());
                    order.setAddress(updatedOrder.getAddress());
                    order.setProductList(updatedOrder.getProductList());
                    return orderRepository.save(order);
                })
                .orElseThrow(() -> new OrderNotFoundException(id));
    }

    @Transactional
    public Order addProductToOrder(Long orderId, Long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isEmpty()) {
            throw new ProductNotFoundException(productId);
        }

        return orderRepository.findById(orderId)
                .map(order -> {
                    order.addProductToList(optionalProduct.get());
                    return orderRepository.save(order);
                })
                .orElseThrow(() -> new OrderNotFoundException(orderId));
    }

    @Transactional
    public Order removeProductFromOrder(Long orderId, Long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty()) {
            throw new ProductNotFoundException(productId);
        }

        return orderRepository.findById(orderId)
                .map(order -> {
                    order.removeProductById(productId);
                    return orderRepository.save(order);
                })
                .orElseThrow(() -> new OrderNotFoundException(orderId));
    }

    public void deleteOrder(Long id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order != null) {
            order.getProductList().clear();
            orderRepository.delete(order);
        }
        else{
            throw new OrderNotFoundException(id);
        }
    }
}
