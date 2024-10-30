<script setup>
const expenseData = {
    date: "2024-01-01",
    amount: 100,
    currency: "NT$",
    detailList: [
        {
            name: "早餐",
            amount: 50
        }
    ]
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
    </main>
</template>
