export const signOut = () => {
    // Remove the token from local storage
    localStorage.removeItem('token'); 

    // Redirect to login or home page
    window.location.href = '/login'; // Change the URL as needed
};
