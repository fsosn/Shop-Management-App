package fsosn.ecommerce.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;

import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "CUSTOMER_ORDER")
public class Order {

    private @Id
    @GeneratedValue Long id;
    @NotNull(message = "Status cannot be null.")
    private Status status;
    @NotNull(message = "Customer ID cannot be null.")
    private Long customerId;
    @NotNull(message = "Order date cannot be null.")
    @Past(message = "Order date must be in the past.")
    private LocalDate orderDate;
    @NotBlank(message = "Description cannot be blank.")
    private String description;

    public Order() {
    }

    public Order(Status status, Long customerId, LocalDate orderDate, String description) {
        this.status = status;
        this.customerId = customerId;
        this.orderDate = orderDate;
        this.description = description;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return Objects.equals(id, order.id) && status == order.status && Objects.equals(customerId, order.customerId) && Objects.equals(orderDate, order.orderDate) && Objects.equals(description, order.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, status, customerId, orderDate, description);
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", status=" + status +
                ", customerId=" + customerId +
                ", orderDateTime=" + orderDate +
                ", description='" + description + '\'' +
                '}';
    }
}