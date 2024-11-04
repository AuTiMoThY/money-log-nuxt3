<script setup>
import { usePanelStore } from "~/stores/usePanelStore";
import { storeToRefs } from "pinia";

const panelStore = usePanelStore();
// Use storeToRefs to maintain reactivity
const { isAddPanel } = storeToRefs(panelStore);

onMounted(() => {
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".add_wrap, .fast_btn-item")) {
            isAddPanel.value = false;
        }
    });
});
</script>
<template>
    <div class="body_wrapper">
        <site-header></site-header>
        <NuxtPage />
        <site-footer></site-footer>
        <div class="add_wrap" :class="{ active: isAddPanel }">
            <panel-add></panel-add>
        </div>
    </div>
</template>
<style lang="scss">
// layout style由 main.scss 載入
</style>
