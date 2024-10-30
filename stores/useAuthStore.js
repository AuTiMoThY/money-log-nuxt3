export const useAuthStore = defineStore("auth", () => {
    // state
    const isAuthenticated = ref(false);
    const token = ref(null);

    // actions
    const login = async (userId, password) => {
        // In real application, this should call an API
        if (userId === "qq" && password === "aa") {
            const newToken = "dummy_token_" + Math.random(); // Simulate token
            token.value = newToken;
            console.log("token", token.value);
            isAuthenticated.value = true;
            localStorage.setItem("auth_token", newToken);
            return true;
        }
        return false;
    };

    const logout = () => {
        token.value = null;
        isAuthenticated.value = false;
        localStorage.removeItem("auth_token");
    };

    const checkAuth = () => {
        const savedToken = localStorage.getItem("auth_token");
        if (savedToken) {
            token.value = savedToken;
            isAuthenticated.value = true;
            return true;
        }
        return false;
    };

    return {
        // state
        isAuthenticated,
        token,
        // actions
        login,
        logout,
        checkAuth
    };
});
