package fsosn.ecommerce.product.controller;

import fsosn.ecommerce.product.exception.ProductNotFoundException;
import fsosn.ecommerce.product.model.Product;
import fsosn.ecommerce.product.service.ProductService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequestMapping("${view.products.basepath}")
public class ProductViewController {

    private final ProductService productService;

    public ProductViewController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public String showHomePage() {
        return "homepage";
    }

    @GetMapping("${view.products.create}")
    public String showCreateProductForm() {
        return "create";
    }

    @GetMapping("${view.products.list}")
    public String listProducts(@RequestParam(value = "message", required = false) String message,
                               Model model) {
        List<Product> products = productService.getAllProducts();
        model.addAttribute("products", products);
        model.addAttribute("message", message);
        return "list";
    }

    @GetMapping("${view.products.edit}")
    public String showEditPage(Model model, RedirectAttributes attributes, @RequestParam Long id) {
        String page;
        try {
            Product product = productService.getProductById(id);
            model.addAttribute("product", product);
            page = "edit";
        } catch (ProductNotFoundException e) {
            attributes.addAttribute("message", e.getMessage());
            page = "redirect:list";
        }
        return page;
    }

    @PostMapping("${view.products.create}")
    public String saveInvoice(@ModelAttribute Product product, Model model) {
        Long id = productService.createProduct(product).getId();
        String message = "Product with ID " + id + " has been successfully saved.";
        model.addAttribute("message", message);
        return "create";
    }


    @PostMapping("${view.products.update}")
    public String updateInvoice(@RequestParam Long id, @ModelAttribute Product product) {
        productService.updateProduct(id, product);
        return "redirect:list";
    }

    @GetMapping("${view.products.delete}")
    public String deleteInvoice(@RequestParam Long id) {
        productService.deleteProduct(id);

        return "redirect:list";
    }
}
