export const saveToken = (token) => {
    // Save the token as a JSON string in local storage
    localStorage.setItem('token', JSON.stringify(token));
};

export const getToken = () => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    return token ? JSON.parse(token) : null; // Parse it as JSON, return null if not found
};

export const removeToken = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
};