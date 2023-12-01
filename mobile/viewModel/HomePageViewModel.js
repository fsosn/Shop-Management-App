import {useNavigation} from '@react-navigation/native';

const useHomepageViewModel = () => {
    const navigation = useNavigation();

    const navigateToProductList = () => {
        navigation.navigate('ProductList');
    };

    return {
        navigateToProductList,
    };
};

export default useHomepageViewModel;
