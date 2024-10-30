<script setup>
import { useAuthStore } from "~/stores/useAuthStore";
const webTitle = "Money Log";
const config = useRuntimeConfig();
const jsPath = config.public.jsPath;

const router = useRouter();
const authStore = useAuthStore();

// definePageMeta({
//     middleware: ["auth"]
// });

useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - ${webTitle}` : webTitle;
    },
    meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1, user-scalable=no" },
        {
            charset: "utf-8"
        }
    ]
    // script: [
    //     {
    //         src: `${jsPath}TwTemp/core.js`,
    //         async: true,
    //         tagPosition: "bodyClose"
    //     }
    // ]
});

onMounted(async () => {
    // Check authentication when app starts
    const currentPath = window.location.pathname;

    if (!authStore.checkAuth() && currentPath !== "/login") {
        navigateTo("/login");
    } else if (authStore.isAuthenticated && currentPath === "/login") {
        navigateTo("/");
    }
});
</script>
<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
