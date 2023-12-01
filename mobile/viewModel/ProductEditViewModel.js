import {useState, useEffect} from 'react';
import ProductModel from '../model/ProductModel';
import {useNavigation, useRoute} from '@react-navigation/native';

const useProductEditViewModel = () => {
    const [product, setProduct] = useState({
        id: null,
        title: '',
        description: '',
        price: 0,
    });

    const navigation = useNavigation();
    const route = useRoute();
    const productId = route.params?.productId;

    const fetchProduct = async () => {
        try {
            const fetchedProduct = await ProductModel.getProductById(productId);
            setProduct(fetchedProduct);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    useEffect(() => {
        if (productId) {
            void fetchProduct();
        }
    }, [productId]);

    const handleUpdateProduct = async () => {
        try {
            await ProductModel.updateProduct(productId, product);
            navigation.goBack();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return {product, setProduct, handleUpdateProduct};
};

export default useProductEditViewModel;
