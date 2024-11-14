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
</script>
<template>
    <div class="block-category-single">
        <au-btn
            :txt="categoryItem.name || ''"
            :style="{
                // '--bd-color': getRgbColor(categoryItem.rgb),
                '--txt-hover-color': 'var(--gray-3)',
                '--bg-hover-color': '#fff',
                '--bd-hover-color': getRgbColor(getDarkerRgb(categoryItem.rgb)),
                '--hover-shadow': getHoverShadow(categoryItem.rgb)
            }">
            <template #icon-top>
                <au-img :default-src="`${imgPath}icons/${categoryItem.icon}`"></au-img>
            </template>
        </au-btn>
    </div>
</template>
