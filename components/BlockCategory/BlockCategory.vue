<script setup>
const imgPath = useRuntimeConfig().public.imgPath;
const list = [
    { name: "食", icon: "FoodBar.png" },
    { name: "衣", icon: "Clothes.png" },
    { name: "住", icon: "Home.png" },
    { name: "行", icon: "Hatchback.png" },
    { name: "育", icon: "Learning.png" },
    { name: "樂", icon: "XboxController.png" }
    // { name: "醫", icon: "Medical.png" },
    // { name: "其", icon: "Other.png" }
];
</script>
<template>
    <div class="block-category">
        <ul class="block-category-list">
            <li class="block-category-item" v-for="item in list" :key="item.name">
                <au-btn :txt="item.name">
                    <template #icon-top>
                        <au-img :default-src="`${imgPath}icons/${item.icon}`"></au-img>
                    </template>
                </au-btn>
            </li>
        </ul>
    </div>
</template>
