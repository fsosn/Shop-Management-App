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

@Configuration
class LoadDatabase {

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(OrderRepository repository) {

        return args -> {
            log.info("Preloading " + repository.save(new Order(Status.CANCELLED, 1L, LocalDate.parse("2019-08-16"), "aaa")));
        };
    }
}