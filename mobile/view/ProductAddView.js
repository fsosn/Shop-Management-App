import React from 'react';
import { View, TextInput, Button } from 'react-native';
import useProductAddViewModel from '../viewModel/ProductAddViewModel';

const ProductAdd = () => {
    const {
        newProduct,
        handleTitleChange,
        handleDescriptionChange,
        handlePriceChange,
        handleAddProduct,
    } = useProductAddViewModel();

    return (
        <View>
            <TextInput
                placeholder="Title"
                value={newProduct.title}
                onChangeText={handleTitleChange}
            />
            <TextInput
                placeholder="Description"
                value={newProduct.description}
                onChangeText={handleDescriptionChange}
            />
            <TextInput
                placeholder="Price"
                value={newProduct.price.toString()}
                onChangeText={handlePriceChange}
                keyboardType="numeric"
            />
            <Button title="Add Product" onPress={handleAddProduct} />
        </View>
    );
};

export default ProductAdd;
