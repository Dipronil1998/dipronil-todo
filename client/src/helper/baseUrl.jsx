// let baseUrl= "https://dipronil-expense-app.onrender.com/api/v1";
let baseUrl;
const { hostname } = window.location;
if (hostname === 'localhost' || hostname === '127.0.0.1') {
    baseUrl = "http://localhost:3002/api/v1";
} else {
    baseUrl = "https://dipronil-expense-app.onrender.com/api/v1";
}

export default baseUrl
