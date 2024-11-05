<script setup>
const imgPath = useRuntimeConfig().public.imgPath;
const { getRgbColor, getHoverShadow, getDarkerRgb } = useRgbColor();

// Fetch data with error handling
const { data: categoryData, error } = await useFetch("/api/category");
const categoryArr = categoryData.value?.categoryArr || [];

const props = defineProps({
    activeId: {
        type: Number,
        required: true
    }
});

// const list = [
//     { name: "食", icon: "FoodBar.png" },
//     { name: "衣", icon: "Clothes.png" },
//     { name: "住", icon: "Home.png" },
//     { name: "行", icon: "Hatchback.png" },
//     { name: "育", icon: "Learning.png" },
//     { name: "樂", icon: "XboxController.png" }
//     // { name: "醫", icon: "Medical.png" },
//     // { name: "其", icon: "Other.png" }
// ];
</script>
<template>
    <div class="block-category">
        <ul class="block-category-list">
            <li
                class="block-category-item"
                :class="{ active: props.activeId === item.id }"
                v-for="item in categoryArr"
                :key="item.name">
                <au-btn
                    :txt="item.name"
                    :style="{
                        // '--bd-color': getRgbColor(item.rgb),
                        '--bd-hover-color': getRgbColor(getDarkerRgb(item.rgb)),
                        '--hover-shadow': getHoverShadow(item.rgb)
                    }">
                    <template #icon-top>
                        <au-img :default-src="`${imgPath}icons/${item.icon}`"></au-img>
                    </template>
                </au-btn>
            </li>
        </ul>
    </div>
</template>
