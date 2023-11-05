package fsosn.ecommerce;

import fsosn.ecommerce.order.model.Order;
import fsosn.ecommerce.order.model.Status;
import fsosn.ecommerce.order.repository.OrderRepository;
import fsosn.ecommerce.product.model.Product;
import fsosn.ecommerce.product.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Configuration
public class LoadDatabase {

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);
    private final int numOfProducts = 5;
    private final int numOfOrders = 25;
    private final long seed = 123L;
    private Random random;

    @Bean
    CommandLineRunner initProductDatabase(ProductRepository productRepository) {
        return args -> {
            List<Product> products = generateProducts();
            log.info("Preloading " + products.size() + " products into the product table:");
            productRepository.saveAll(products);
            log.info("Preloaded products into the product table.");
        };
    }

    @Bean
    CommandLineRunner initOrderDatabase(OrderRepository orderRepository, ProductRepository productRepository) {
        this.random = new Random(this.seed);

        return args -> {
            List<Order> orders = generateOrders(productRepository);
            log.info("Preloading " + orders.size() + " orders into the order table.");
            orderRepository.saveAll(orders);
            log.info("Preloaded orders into the order table.");
        };
    }

    private List<Product> generateProducts() {
        List<Product> products = new ArrayList<>();

        for (int i = 1; i <= numOfProducts; i++) {
            String title = "product " + i;
            String description = "description " + i;
            BigDecimal price = BigDecimal.valueOf(this.random.nextDouble() * 100);
            Product product = new Product(title, description, price);
            products.add(product);
        }

        return products;
    }

    private List<Order> generateOrders(ProductRepository productRepository) {
        List<Order> orderList = new ArrayList<>();

        for (int i = 1; i <= this.numOfOrders; i++) {
            Order order = new Order(
                    getRandomStatus(),
                    this.random.nextLong(1L, 100L),
                    getRandomDate(),
                    "sample address " + i,
                    getRandomProducts(productRepository)
            );
            orderList.add(order);
        }

        return orderList;
    }

    private Status getRandomStatus() {
        Status[] statuses = Status.values();
        return statuses[random.nextInt(statuses.length)];
    }

    private LocalDate getRandomDate() {
        long minDay = LocalDate.of(2023, 10, 1).toEpochDay();
        long maxDay = LocalDate.of(2023, 10, 31).toEpochDay();
        long randomDay = minDay + this.random.nextInt((int) (maxDay - minDay));
        return LocalDate.ofEpochDay(randomDay);
    }

    private List<Product> getRandomProducts(ProductRepository productRepository) {
        List<Product> allProducts = productRepository.findAll();
        List<Product> selectedProducts = new ArrayList<>();

        int numProducts = this.random.nextInt(numOfProducts) + 1;

        for (int i = 0; i < numProducts; i++) {
            int randomIndex = this.random.nextInt(allProducts.size());
            selectedProducts.add(allProducts.get(randomIndex));
        }

        return selectedProducts;
    }
}
