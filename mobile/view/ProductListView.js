import React from 'react';
import {View, Text, Button} from 'react-native';
import useProductListViewModel from '../viewModel/ProductListViewModel';

const ProductListView = () => {
    const {products, handleDeleteProduct, handleEditProduct} = useProductListViewModel();

    return (
        <View>
            <Text>Product List</Text>
            {products.map((product) => (
                <View key={product.id}>
                    <Text>{product.title}</Text>
                    <Text>{product.description}</Text>
                    <Text>{product.price}</Text>
                    <Button
                        title="Delete"
                        onPress={() => handleDeleteProduct(product.id)}
                    />
                    <Button
                        title="Edit"
                        onPress={() => handleEditProduct(product.id)}
                    />
                </View>
            ))}
        </View>
    );
};

export default ProductListView;
