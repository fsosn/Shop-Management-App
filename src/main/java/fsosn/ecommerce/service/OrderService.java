package fsosn.ecommerce.service;

import fsosn.ecommerce.model.Order;
import fsosn.ecommerce.exception.OrderNotFoundException;
import fsosn.ecommerce.repository.OrderRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Service
@Validated
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order getOrderById(Long id) {
        validateId(id);
        return orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(id));
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order createOrder(@Valid Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrder(Long id, @Valid Order updatedOrder) {
        validateId(id);
        return orderRepository.findById(id)
                .map(order -> {
                    order.setStatus(updatedOrder.getStatus());
                    order.setCustomerId(updatedOrder.getCustomerId());
                    order.setOrderDate(updatedOrder.getOrderDate());
                    order.setDescription(updatedOrder.getDescription());
                    return orderRepository.save(order);
                })
                .orElseThrow(() -> new OrderNotFoundException(id));
    }

    public void deleteOrder(Long id) {
        validateId(id);
        orderRepository.findById(id).ifPresentOrElse(
                orderRepository::delete, () -> {
                    throw new OrderNotFoundException(id);
                }
        );
    }

    private void validateId(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Order ID cannot be null.");
        }
    }
}
