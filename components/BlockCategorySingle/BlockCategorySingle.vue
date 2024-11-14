<script setup>
const imgPath = useRuntimeConfig().public.imgPath;
const { getRgbColor, getHoverShadow, getDarkerRgb } = useRgbColor();

const panelStore = usePanelStore();
const { selectedItem } = storeToRefs(panelStore);

console.log(selectedItem.value);

const { data: categoryData, error } = await useFetch("/api/category");
const categoryArr = categoryData.value?.categoryArr || [];
console.log(categoryArr);

const emit = defineEmits(["update:categoryId"]);
const categoryItem = ref(
    selectedItem.value.category_id === 0
        ? categoryArr.find((item) => item.id === 1)
        : categoryArr.find((item) => item.id === selectedItem.value.category_id)
);

console.log(categoryItem.value);

watch(selectedItem, (newValue) => {
    console.log("selectedItem newValue:", newValue);
    categoryItem.value = categoryArr.find((item) => item.id === newValue.category_id);
});

onMounted(() => {
    // console.log(props.categoryId);/
    // console.log(item.value);
});

const safeCategory = computed(() => {
    return categoryItem.value || { name: "", rgb: "255,255,255", icon: "default.png" };
});

// const rootEl = ref(null);

// const getPosition = () => {
//     if (!rootEl.value) return null;
//     const rect = rootEl.value.getBoundingClientRect();
//     return {
//         x: rect.left,
//         y: rect.top,
//         width: rect.width,
//         height: rect.height,
//         right: rect.right,
//         bottom: rect.bottom
//     };
// };

// // Make sure to expose both value and getPosition
// defineExpose({
//     getPosition, // expose the method directly
//     value: categoryItem
// });
</script>
<template>
    <div class="block-category-single" ref="rootEl">
        <au-btn
            :txt="safeCategory.name"
            :style="{
                '--txt-hover-color': 'var(--gray-3)',
                '--bg-hover-color': '#fff',
                '--bd-hover-color': getRgbColor(getDarkerRgb(safeCategory.rgb)),
                '--hover-shadow': getHoverShadow(safeCategory.rgb)
            }">
            <template #icon-top>
                <au-img :default-src="`${imgPath}icons/${safeCategory.icon}`"></au-img>
            </template>
        </au-btn>
    </div>
</template>
