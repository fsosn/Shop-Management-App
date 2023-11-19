package com.example.order.controller;

import com.example.order.model.Order;
import com.example.order.model.OrderModelAssembler;
import com.example.order.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("${api.orders.basepath}")
public class OrderController {

    private final OrderService orderService;
    private final OrderModelAssembler assembler;

    public OrderController(OrderService orderService, OrderModelAssembler assembler) {
        this.orderService = orderService;
        this.assembler = assembler;
    }

    @GetMapping("${api.orders.get}/{id}")
    public EntityModel<Order> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        return assembler.toModel(order);
    }

    @GetMapping("${api.orders.get}/all")
    public CollectionModel<EntityModel<Order>> getAllOrders() {
        List<EntityModel<Order>> orders = orderService.getAllOrders().stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(orders, linkTo(methodOn(OrderController.class).getAllOrders()).withSelfRel());
    }

    @GetMapping("${api.orders.get}")
    public CollectionModel<EntityModel<Order>> getOrders(@RequestParam int page, @RequestParam int size) {
        List<EntityModel<Order>> orders = orderService.getAllOrders(page, size).stream()
                .map(order -> assembler.toModel(order, page, size))
                .collect(Collectors.toList());

        return CollectionModel.of(orders, linkTo(methodOn(OrderController.class).getOrders(page, size)).withSelfRel());
    }

    @PostMapping("${api.orders.create}")
    public ResponseEntity<?> createOrder(@Valid @RequestBody Order order) {
        Order createdOrder = orderService.createOrder(order);
        EntityModel<Order> entityModel = assembler.toModel(createdOrder);

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }

    @PutMapping("${api.orders.update}/{id}")
    public ResponseEntity<?> updateOrder(@Valid @RequestBody Order newOrder, @PathVariable Long id) {
        Order updatedOrder = orderService.updateOrder(id, newOrder);
        EntityModel<Order> entityModel = assembler.toModel(updatedOrder);

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }

    @PutMapping("${api.orders.update}/{orderId}/add-product")
    public ResponseEntity<?> addProductToOrder(@PathVariable Long orderId, @RequestBody Long productId) {
        Order updatedOrder = orderService.addProductToOrder(orderId, productId);
        EntityModel<Order> entityModel = assembler.toModel(updatedOrder);

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }

    @PutMapping("${api.orders.update}/{orderId}/remove-product")
    public ResponseEntity<?> removeProductFromOrder(@PathVariable Long orderId, @RequestBody Long productId) {
        Order updatedOrder = orderService.removeProductFromOrder(orderId, productId);
        EntityModel<Order> entityModel = assembler.toModel(updatedOrder);

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }

    @DeleteMapping("${api.orders.delete}/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
