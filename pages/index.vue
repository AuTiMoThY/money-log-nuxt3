<script setup>
import { usePanelStore } from "~/stores/usePanelStore";
import { useCurrencyStore } from "~/stores/useCurrencyStore";

// Fetch data with error handling
const { data: categoryData, error } = await useFetch("/api/category");
const categoryArr = categoryData.value?.categoryArr || [];

const panelStore = usePanelStore();
const { isAddPanel, selectedItem } = storeToRefs(panelStore);

const currencyStore = useCurrencyStore();
const { currency } = storeToRefs(currencyStore);

// Create reactive expense data
const expenseData = reactive({
    date: "2024-01-01",
    currency: currency.value,
    detailList: [
        { name: "項目", amount: 50 },
        { name: "項目", amount: 50 },
        { name: "項目", amount: 50 },
        { name: "項目", amount: 50 },
        { name: "項目", amount: 50 },
        { name: "項目", amount: 50 }
    ],
    // Calculate total directly in the reactive object
    get total() {
        return this.detailList.reduce((acc, curr) => acc + curr.amount, 0);
    }
});

// Improve fastBtnList structure and initialization
const fastBtnList = ref(
    [
        { name: "項目1", category_id: 1 },
        { name: "項目2", category_id: 2 },
        { name: "項目3", category_id: 3 },
        { name: "項目4", category_id: 1 }
    ].map((item) => ({
        ...item,
        rgb: categoryArr.find((i) => i.id === item.category_id)?.rgb || "#000000",
        icon: categoryArr.find((i) => i.id === item.category_id)?.icon || ""
    }))
);

// Improve click handler with type checking
const handleFastClick = (item) => {
    if (!item) return;

    isAddPanel.value = true;
    selectedItem.value = item;
};

// Add error handling for the API call
watchEffect(() => {
    if (error.value) {
        console.error("Failed to fetch categories:", error.value);
        // You might want to add error handling UI here
    }
});

onMounted(() => {
    console.log("fastBtnList", fastBtnList.value);
});

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
