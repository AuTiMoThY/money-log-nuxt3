<script setup>
const config = useRuntimeConfig();
const imgPath = config.public.imgPath;
const { getRgbColor, getHoverShadow, getDarkerRgb } = useRgbColor();

const emits = defineEmits(["click"]);

defineProps({
    list: {
        type: Array,
        default: () => []
    }
});

const today = new Date().toISOString().split("T")[0];
const fastData = ref({
    date: today,
    name: "",
    category_id: ""
});

const handleClick = (item) => {
    fastData.value.name = item.name;
    fastData.value.category_id = item.category_id;
    emits("click", fastData.value);
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
                        '--bd-hover-color': getRgbColor(getDarkerRgb(item.rgb)),
                        '--hover-shadow': getHoverShadow(item.rgb)
                    }"
                    @click="handleClick(item)"
                    :data-name="item.name"
                    :data-category="item.category_id">
                    <template #icon-prepend>
                        <au-img :default-src="`${imgPath}icons/${item.icon}`"></au-img>
                    </template>
                </au-btn>
            </li>
        </ul>
    </au-panel>
</template>
