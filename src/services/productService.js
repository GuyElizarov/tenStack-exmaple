import { httpService } from './httpService';

async function getProducts() {
    return await httpService.get('/products', null, true);
}

async function getById(productId) {
    return await httpService.get(`products/${productId}`);
}

async function remove(productId) {
    return await httpService.delete(`/products/${productId}`);
}

async function save(product) {
    if (product.id) {
        return await httpService.put(`/products/${product.id}`, product);
    } else {
        return await httpService.post('/products', product);
    }
}

async function login(credentials) {
    return await httpService.post('/auth/login', credentials, true);
}

function getEmptyProduct() {
    return {
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        dob: new Date().toISOString()
    };
}

export const productService = {
    getProducts,
    getById,
    remove,
    save,
    login, // Add the login function here
    getEmptyProduct,
};
