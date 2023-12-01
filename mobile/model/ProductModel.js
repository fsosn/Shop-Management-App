import Config from 'react-native-config'
import axios from "axios";

class ProductModel {

    async createProduct(productData) {
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_HOST +
                process.env.EXPO_PUBLIC_API_PRODUCTS_BASEPATH +
                process.env.EXPO_PUBLIC_API_PRODUCTS_CREATE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.error('Error creating product. Server response:', await response.text());
            }
        } catch (error) {
            console.error('Error caught while creating product:', error);
        }
    }

    async getProductById(productId) {
        try {
            const response = await fetch(
                process.env.EXPO_PUBLIC_HOST +
                process.env.EXPO_PUBLIC_API_PRODUCTS_BASEPATH +
                process.env.EXPO_PUBLIC_API_PRODUCTS_GET +
                '/' +
                productId, {credentials: 'include',}
            );
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        } catch (error) {
            console.error('Error caught while fetching product by ID:', error);
        }
    }

    async getAllProducts() {
        console.log(process.env.EXPO_PUBLIC_HOST +
            process.env.EXPO_PUBLIC_API_PRODUCTS_BASEPATH +
            process.env.EXPO_PUBLIC_API_PRODUCTS_GET_ALL)
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_HOST +
                process.env.EXPO_PUBLIC_API_PRODUCTS_BASEPATH +
                process.env.EXPO_PUBLIC_API_PRODUCTS_GET_ALL, {
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                return (data._embedded.productList);
            }
        } catch (error) {
            console.log('Error caught while fetching products: ', error);
            return [];
        }
    }

    async updateProduct(productId, updatedProductData) {
        try {
            const response = await fetch(
                process.env.EXPO_PUBLIC_HOST +
                process.env.EXPO_PUBLIC_API_PRODUCTS_BASEPATH +
                process.env.EXPO_PUBLIC_API_PRODUCTS_UPDATE +
                '?id=' + productId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(updatedProductData),
                });

            if (response.ok) {
                console.log(`Product with ID ${productId} updated successfully.`);
            } else {
                console.error('Error updating product. Server response:', await response.text());
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }

    async deleteProduct(productId) {
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_HOST +
                process.env.EXPO_PUBLIC_API_PRODUCTS_BASEPATH +
                process.env.EXPO_PUBLIC_API_PRODUCTS_DELETE +
                '?id=' + productId, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                console.log(`Product with ID ${productId} deleted successfully.`);
            } else {
                console.error('Error deleting product. Server response:', await response.text());
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }
}

export default new ProductModel();