//package com.example;
//
//import com.example.product.model.Product;
//import com.example.product.repository.ProductRepository;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.math.BigDecimal;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Random;
//
//@Configuration
//public class LoadProducts {
//
//    private static final Logger log = LoggerFactory.getLogger(LoadProducts.class);
//    private final int numOfProducts = 5;
//    private final long seed = 123L;
//    private Random random;
//
//    @Bean
//    CommandLineRunner initProductDatabase(ProductRepository productRepository) {
//        return args -> {
//            List<Product> products = generateProducts();
//            log.info("Preloading " + products.size() + " products into the product table:");
//            productRepository.saveAll(products);
//            log.info("Preloaded products into the product table.");
//        };
//    }
//
//    private List<Product> generateProducts() {
//        List<Product> products = new ArrayList<>();
//
//        this.random = new Random(this.seed);
//
//        for (int i = 1; i <= numOfProducts; i++) {
//            String title = "product " + i;
//            String description = "description " + i;
//            BigDecimal price = BigDecimal.valueOf(this.random.nextDouble() * 100);
//            Product product = new Product(title, description, price);
//            products.add(product);
//        }
//
//        return products;
//    }
//}
