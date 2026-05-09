

export const isLoggedIn = () => {
    return   localStorage.getItem("isLoggedIn") !== null; // Check if token exists in localStorage
    // return true; // Return true if token exists, false otherwise
}