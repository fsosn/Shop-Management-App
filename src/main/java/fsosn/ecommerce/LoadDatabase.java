package fsosn.ecommerce;

import fsosn.ecommerce.model.Order;
import fsosn.ecommerce.repository.OrderRepository;
import fsosn.ecommerce.model.Status;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.IntStream;

@Configuration
public class LoadDatabase {

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);
    private final int numOfOrders = 100;

    private Status getRandomStatus() {
        Random random = new Random();
        Status[] statuses = Status.values();
        return statuses[random.nextInt(statuses.length)];
    }

    private LocalDate getRandomDate() {
        long minDay = LocalDate.of(2020, 1, 1).toEpochDay();
        long maxDay = LocalDate.of(2023, 10, 31).toEpochDay();
        long randomDay = ThreadLocalRandom.current().nextLong(minDay, maxDay);
        return LocalDate.ofEpochDay(randomDay);
    }

    private List<Order> generateDatabase(int numOfOrders) {
        return IntStream.rangeClosed(1, numOfOrders)
                .mapToObj(i -> new Order(
                        getRandomStatus(),
                        new Random().nextLong(),
                        getRandomDate(),
                        "product"
                )).toList();
    }

    @Bean
    CommandLineRunner initDatabase(OrderRepository repository) {

        return args -> {
            log.info("Preloading " + repository.saveAll(generateDatabase(this.numOfOrders)));
        };
    }
}