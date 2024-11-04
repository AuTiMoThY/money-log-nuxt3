<script setup>
import { usePanelStore } from "~/stores/usePanelStore";

const panelStore = usePanelStore();
const { isAddPanel, selectedItem } = storeToRefs(panelStore);

const expenseData = {
    date: "2024-01-01",
    // total: 100,
    currency: "NT$",
    detailList: [
        {
            name: "項目",
            amount: 50
        },
        {
            name: "項目",
            amount: 50
        },
        {
            name: "項目",
            amount: 50
        },
        {
            name: "項目",
            amount: 50
        },
        {
            name: "項目",
            amount: 50
        },
        {
            name: "項目",
            amount: 50
        }
    ]
};

const total = computed(() => {
    return expenseData.detailList.reduce((acc, curr) => acc + curr.amount, 0);
});

expenseData.total = total;

const fastBtnList = [
    {
        name: "項目1",
        rgb: [108, 167, 57],
        icon: "FoodBar.png"
    },
    {
        name: "項目2",
        rgb: [138, 68, 149],
        icon: "Clothes.png"
    },
    {
        name: "項目3",
        rgb: [218, 185, 95],
        icon: "Home.png"
    },
    {
        name: "項目4",
        rgb: [108, 167, 57],
        icon: "FoodBar.png"
    }
];

const handleFastClick = (name) => {
    console.log(name);
    isAddPanel.value = true;
    selectedItem.value = name;
};
onMounted(async () => {});

onUnmounted(() => {});
</script>
<template>
    <main class="page_main page-home">
        <div class="container">
            <div class="recent_expense">
                <ul class="recent_expense-list">
                    <li class="recent_expense-item">
                        <expense-item :data="expenseData"></expense-item>
                    </li>
                </ul>
            </div>
        </div>
        <div class="fast_wrap">
            <panel-fast :list="fastBtnList" @click="handleFastClick"></panel-fast>
        </div>
    </main>
</template>
