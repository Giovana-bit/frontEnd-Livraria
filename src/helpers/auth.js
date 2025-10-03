import { jwtDecode } from "jwt-decode";

function getUser() {
    const token = sessionStorage.getItem("tokenJWT"); // pega token do sessionStorage
    if (!token) return null; // retorna null se não houver token

    try {
        const deCoded = jwtDecode(token); // decodifica o token
        return deCoded; // retorna os dados do usuário
    } catch (error) {
        console.error("Token inválido", error);
        return null;
    }
}
function isAuthenticated() {
    return !!getUser(); // retorna true se o usuário estiver autenticado
}

export {isAuthenticated,getUser};