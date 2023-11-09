import { storageService } from './async-storage.service'


const STORAGE_KEY = 'cart'
const initialCart = []

async function getCart() {
    return await storageService.query(STORAGE_KEY, initialCart)
}

async function getById(cartId) {
    return await storageService.get(STORAGE_KEY, cartId)

}

async function remove(cartId) {
    return await storageService.remove(STORAGE_KEY, cartId)

}

async function save(cart) {
    var savedCart
    if (cart.id) {
        savedCart = await storageService.put(STORAGE_KEY, cart)

    } else {
        savedCart = await storageService.post(STORAGE_KEY, cart)

    }
    return savedCart
}




export const cartService = {
    getCart,
    getById,
    remove,
    save,

}

