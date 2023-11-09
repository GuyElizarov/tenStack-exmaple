import { httpService } from './httpService';

async function getUsers() {
    return await httpService.get('/users', null, true);
}

async function getById(userId) {
    return await httpService.get(`users/${userId}`);
}

async function remove(userId) {
    return await httpService.delete(`/users/${userId}`);
}

async function save(user) {
    if (user.id) {
        return await httpService.put(`/users/${user.id}`, user);
    } else {
        return await httpService.post('/users', user);
    }
}

async function login(credentials) {
    const {token} = await httpService.post('/auth/login', credentials, true);
    sessionStorage.setItem('token', token);
    
}

function logout() {
    sessionStorage.removeItem('token');
}

function getEmptyUser() {
    return {
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        dob: new Date().toISOString()
    };
}

export const userService = {
    getUsers,
    getById,
    remove,
    save,
    login, 
    logout,
    getEmptyUser,
};
