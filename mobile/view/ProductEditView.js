import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import useProductEditViewModel from '../viewModel/ProductEditViewModel';

const ProductEdit = () => {
    const {product, setProduct, handleUpdateProduct} = useProductEditViewModel();

    return (
        <View>
            <Text>Title:</Text>
            <TextInput
                value={product.title}
                onChangeText={(text) => setProduct({...product, title: text})}
            />

            <Text>Description:</Text>
            <TextInput
                value={product.description}
                onChangeText={(text) => setProduct({...product, description: text})}
            />

            <Text>Price:</Text>
            <TextInput
                value={product.price.toString()}
                onChangeText={(text) => setProduct({...product, price: parseFloat(text) || 0})}
                keyboardType="numeric"
            />

            <Button title="Update Product" onPress={handleUpdateProduct}/>
        </View>
    );
};

export default ProductEdit;
