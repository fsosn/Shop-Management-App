import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import useHomepageViewModel from '../viewModel/HomePageViewModel';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

const HomePageView = () => {
    const {navigateToProductList} = useHomepageViewModel();

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Welcome to the Homepage</Text>
            <Button title="View Products" onPress={navigateToProductList}/>
        </View>
    );
};

export default HomePageView;
