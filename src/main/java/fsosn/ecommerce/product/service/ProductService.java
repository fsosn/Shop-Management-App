package fsosn.ecommerce.product.service;

import fsosn.ecommerce.product.exception.ProductNotFoundException;
import fsosn.ecommerce.product.model.Product;
import fsosn.ecommerce.product.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Page<Product> getProducts(int page, int size) {
        PageRequest pr = PageRequest.of(page, size);
        return productRepository.findAll(pr);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Transactional
    public Product updateProduct(Long id, Product updatedProduct) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setTitle(updatedProduct.getTitle());
                    product.setDescription(updatedProduct.getDescription());
                    product.setPrice(updatedProduct.getPrice());
                    return productRepository.save(product);
                })
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    public void deleteProduct(Long id) {
        productRepository.findById(id).ifPresentOrElse(
                productRepository::delete, () -> {
                    throw new ProductNotFoundException(id);
                }
        );
    }
}
