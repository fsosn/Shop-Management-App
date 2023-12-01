import {useState} from 'react';
import ProductModel from '../model/ProductModel';
import {useNavigation} from '@react-navigation/native';

const useProductAddViewModel = () => {
    const [newProduct, setNewProduct] = useState({
        title: '',
        description: '',
        price: 0,
    });

    const navigation = useNavigation();

    const handleTitleChange = (title) => {
        setNewProduct((prevProduct) => ({...prevProduct, title}));
    };

    const handleDescriptionChange = (description) => {
        setNewProduct((prevProduct) => ({...prevProduct, description}));
    };

    const handlePriceChange = (price) => {
        setNewProduct((prevProduct) => ({...prevProduct, price}));
    };

    const handleAddProduct = async () => {
        try {
            await ProductModel.createProduct(newProduct);

            setNewProduct({
                title: '',
                description: '',
                price: 0,
            });

            navigation.navigate('ProductList');
        } catch (error) {
            console.error('Error while adding product:', error);
        }
    };

    return {
        newProduct,
        handleTitleChange,
        handleDescriptionChange,
        handlePriceChange,
        handleAddProduct,
    };
};

export default useProductAddViewModel;
