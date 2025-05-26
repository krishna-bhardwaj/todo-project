export const getToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
}

export const setToken = (rememberMe,token) => {
    if(rememberMe) localStorage.setItem('token',token);
    else sessionStorage.setItem('token',token);
    return;
}

export const deleteToken = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    return;
}