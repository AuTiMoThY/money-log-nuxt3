<script setup>
import { useAuthStore } from "~/stores/useAuthStore";
const config = useRuntimeConfig();
const imgPath = config.public.imgPath;

const authStore = useAuthStore();

const handleLogout = () => {
    authStore.logout();
    navigateTo("/login");
};
</script>
<template>
    <header class="site-header">
        <div class="container">
            <div class="site-header-inner">
                <au-btn class="au_btn-simple" style="--w: 30; --h: 30">
                    <template #bg>
                        <au-img :default-src="`${imgPath}icons/User.png`"></au-img>
                    </template>
                </au-btn>
                <au-btn class="au_btn-simple" style="--w: 30; --h: 30" @click="handleLogout">
                    <template #bg>
                        <au-img :default-src="`${imgPath}icons/Logout.png`"></au-img>
                    </template>
                </au-btn>
            </div>
        </div>
    </header>
</template>
