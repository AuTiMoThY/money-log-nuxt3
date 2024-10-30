export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    // If user is not authenticated and not going to login page
    if (!authStore.isAuthenticated && to.path !== "/login") {
        return navigateTo("/login");
    }

    // If user is authenticated and going to login page
    if (authStore.isAuthenticated && to.path === "/login") {
        return navigateTo("/");
    }
});
