package com.example.product.controller;

import com.example.product.model.Product;
import com.example.product.model.ProductModelAssembler;
import com.example.product.service.ProductService;
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
@RequestMapping("${api.products.basepath}")
@CrossOrigin(origins = {"${host.frontend}", "${host.mobile}"}, allowCredentials = "true")
public class ProductController {

    private final ProductService productService;
    private final ProductModelAssembler assembler;

    public ProductController(ProductService productService, ProductModelAssembler assembler) {
        this.productService = productService;
        this.assembler = assembler;
    }

    @GetMapping("${api.products.get}/{id}")
    public EntityModel<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return assembler.toModel(product);
    }

    @GetMapping("${api.products.get.all}")
    public CollectionModel<EntityModel<Product>> getAllProducts() {
        List<EntityModel<Product>> products = productService.getAllProducts().stream()
                .map(assembler::toModel)
                .toList();

        return CollectionModel.of(products, linkTo(methodOn(ProductController.class).getAllProducts()).withSelfRel());
    }

    @GetMapping("${api.products.get}")
    public CollectionModel<EntityModel<Product>> getProducts(@RequestParam int page, @RequestParam int size) {
        List<EntityModel<Product>> products = productService.getProducts(page, size).stream()
                .map(product -> assembler.toModel(product, page, size))
                .collect(Collectors.toList());

        return CollectionModel.of(products, linkTo(methodOn(ProductController.class).getProducts(page, size)).withSelfRel());
    }

    @PostMapping("${api.products.create}")
    public ResponseEntity<?> createOrder(@Valid @RequestBody Product product) {
        Product createdProduct = productService.createProduct(product);
        EntityModel<Product> entityModel = assembler.toModel(createdProduct);

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }

    @PutMapping("${api.products.update}")
    public ResponseEntity<?> updateProduct(@Valid @RequestBody Product newProduct, @RequestParam Long id) {
        Product updatedOrder = productService.updateProduct(id, newProduct);
        EntityModel<Product> entityModel = assembler.toModel(updatedOrder);

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }

    @DeleteMapping("${api.products.delete}")
    public ResponseEntity<?> deleteProduct(@RequestParam Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
