package com.example.order.model;

import com.example.product.model.Product;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "orders")
public class Order {

    private @Id
    @SequenceGenerator(
            name = "orders_sequence",
            sequenceName = "orders_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "orders_sequence"
    )
    Long id;
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

    public Order() {
    }

    public Order(Status status,
                 Long customerId,
                 LocalDate orderDate,
                 String address, List<Product> productList) {
        this.status = status;
        this.customerId = customerId;
        this.orderDate = orderDate;
        this.address = address;
        this.productList = productList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String description) {
        this.address = description;
    }

    public List<Product> getProductList() {
        return productList;
    }

    public void setProductList(List<Product> productList) {
        this.productList = productList;
    }

    public void addProductToList(Product product) {
        this.productList.add(product);
    }

    public void removeProductById(Long productId) {
        productList.removeIf(product -> Objects.equals(product.getId(), productId));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return Objects.equals(id, order.id) && status == order.status && Objects.equals(customerId, order.customerId) && Objects.equals(orderDate, order.orderDate) && Objects.equals(address, order.address) && Objects.equals(productList, order.productList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, status, customerId, orderDate, address, productList);
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", status=" + status +
                ", customerId=" + customerId +
                ", orderDate=" + orderDate +
                ", address='" + address + '\'' +
                ", productList=" + productList +
                '}';
    }
}