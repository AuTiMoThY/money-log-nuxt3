<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});
</script>
<template>
    <div class="expense_item-wrapper">
        <div class="expense_item-inner">
            <div class="expense_item-hd">
                <div class="date">{{ props.data.date }}</div>
                <div class="amount">
                    <span class="amount-currency">{{ props.data.currency }}</span>
                    <span class="amount-value">{{ props.data.total }}</span>
                </div>
            </div>
            <div class="expense_item-bd">
                <ul class="expense_detail-list">
                    <li
                        class="expense_detail-item"
                        v-for="(item, index) in props.data.detailList"
                        :key="index">
                        <div class="expense_detail-name">{{ item.name }}</div>
                        <div class="expense_detail-amount">
                            <span class="expense_detail-amount-currency">
                                {{ props.data.currency }}
                            </span>
                            <span class="expense_detail-amount-value">{{ item.amount }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
// 元件style由 main.scss 載入
</style>
