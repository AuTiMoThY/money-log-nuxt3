<script setup>
const config = useRuntimeConfig();
const imgPath = config.public.imgPath;

const emits = defineEmits(["click"]);

defineProps({
    list: {
        type: Array,
        default: () => []
    }
});

const getRgbColor = (rgb) => `rgb(${rgb.join(",")})`;
const getHoverShadow = (rgb) => `0px 4px 10px rgba(${rgb.join(",")}, 0.3)`;

const handleClick = (name) => {
    emits("click", name);
};
</script>
<template>
    <au-panel class="panel-fast">
        <div class="title">快速記</div>
        <ul class="fast_btn-list">
            <li class="fast_btn-item" v-for="item in list" :key="item.name">
                <au-btn
                    :txt="item.name"
                    :style="{
                        '--bd-color': getRgbColor(item.rgb),
                        '--hover-shadow': getHoverShadow(item.rgb)
                    }"
                    @click="handleClick(item.name)">
                    <template #icon-prepend>
                        <au-img :default-src="`${imgPath}icons/${item.icon}`"></au-img>
                    </template>
                </au-btn>
            </li>
        </ul>
    </au-panel>
</template>
