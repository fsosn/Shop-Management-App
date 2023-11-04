package fsosn.ecommerce.order.repository;

import fsosn.ecommerce.order.model.Order;
import fsosn.ecommerce.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o.productList FROM Order o WHERE o.id = :orderId")
    List<Product> getOrderProductListById(Long orderId);
}