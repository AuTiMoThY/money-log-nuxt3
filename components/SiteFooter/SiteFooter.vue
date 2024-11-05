<script setup>
import { usePanelStore } from "~/stores/usePanelStore";

const imgPath = useRuntimeConfig().public.imgPath;
const panelStore = usePanelStore();
const { isAddPanel } = storeToRefs(panelStore);

// console.log(isAddPanel);

const handleAddClick = () => {
    isAddPanel.value = true;
};

onMounted(() => {
    console.log(isAddPanel.value);
});
</script>
<template>
    <footer class="site-footer">
        <div class="container">
            <au-btn class="add-btn" @click="handleAddClick">
                <template #bg>
                    <au-img :default-src="`${imgPath}icons/plus.png`"></au-img>
                </template>
            </au-btn>
            <div class="site-footer-inner">
                <au-btn class="chart-btn">
                    <template #bg>
                        <au-img :default-src="`${imgPath}icons/pie-chart.png`"></au-img>
                    </template>
                </au-btn>
                <au-btn class="settings-btn">
                    <template #bg>
                        <au-img :default-src="`${imgPath}icons/settings.png`"></au-img>
                    </template>
                </au-btn>
            </div>
        </div>
    </footer>
</template>
