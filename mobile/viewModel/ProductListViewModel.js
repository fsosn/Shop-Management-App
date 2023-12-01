import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import ProductModel from '../model/ProductModel';

const useProductListViewModel = () => {
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();

    const fetchProducts = async () => {
        try {
            const productList = await ProductModel.getAllProducts();
            setProducts(productList);
        } catch (error) {
            console.error('Error while fetching products:', error);
        }
    };

    useEffect(() => {
        void fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        try {
            await ProductModel.deleteProduct(productId);
            await fetchProducts();
        } catch (error) {
            console.error('Error while deleting product:', error);
        }
    };

    const handleEditProduct = (productId) => {
        navigation.navigate('ProductEdit', {productId});
    };

    return {products, handleDeleteProduct, handleEditProduct};
};

export default useProductListViewModel;
