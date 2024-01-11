package com.example.order.model;

import com.example.product.model.Product;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @SequenceGenerator(
            name = "orders_sequence",
            sequenceName = "orders_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "orders_sequence"
    )
    private Long id;

    @Enumerated(EnumType.STRING)
    private Status status;

    @NotNull(message = "Customer ID cannot be null.")
    private Long customerId;

    @NotNull(message = "Order date cannot be null.")
    @Past(message = "Order date must be in the past.")
    private LocalDate orderDate;

    @NotBlank(message = "Address cannot be blank.")
    private String address;

    @ManyToMany(cascade = CascadeType.REMOVE)
    @JoinTable(
            name = "order_products",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> productList;

    public void addProductToList(Product product) {
        this.productList.add(product);
    }

    public void removeProductById(Long productId) {
        productList.removeIf(product -> Objects.equals(product.getId(), productId));
    }
}
