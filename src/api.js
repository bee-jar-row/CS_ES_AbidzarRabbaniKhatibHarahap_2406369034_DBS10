const API_BASE = 'https://cs10-dbs-backend-production.up.railway.app';

async function request(method, path, body = null, auth = false) {
    const headers = { 'Content-Type': 'application/json' };
    if (auth) {
        const token = localStorage.getItem('gv_token');
        if (token) headers['Authorization'] = `Bearer ${token}`;
    }

    const opts = { method, headers };
    if (body) opts.body = JSON.stringify(body);

    const res = await fetch(`${API_BASE}${path}`, opts);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || `Request failed (${res.status})`);
    }
    return data;
}

export const login = (email, password) =>
    request('POST', '/auth/login', { email, password });

export const register = (name, username, email, password) =>
    request('POST', '/user/register', { name, username, email, password });

export const getAllItems = () => request('GET', '/items');
export const getItemById = (id) => request('GET', `/items/${id}`);
export const createItem = (name, price, stock) =>
    request('POST', '/items', { name, price, stock }, true);

export const createTransaction = (user_id, item_id, quantity, description) =>
    request('POST', '/transaction/create', { user_id, item_id, quantity, description }, true);

export const getTransactionById = (id) =>
    request('GET', `/transaction/${id}`, null, true);

export const payTransaction = (id) =>
    request('POST', `/transaction/pay/${id}`, null, true);

export const deleteTransaction = (id) =>
    request('DELETE', `/transaction/${id}`, null, true);

export const updateProfile = (id, data) =>
    request('PUT', '/user/update', { id, ...data }, true);

export const getTransactionHistory = () =>
    request('GET', '/user/history', null, true);

export const getTotalSpent = () =>
    request('GET', '/user/total-spent', null, true);

export const getTopUsers = (limit = 10) =>
    request('GET', `/reports/top-users?limit=${limit}`);

export const getItemsSold = () => request('GET', '/reports/items-sold');

export const getMonthlySales = (year) =>
    request('GET', `/reports/monthly-sales?year=${year}`);
