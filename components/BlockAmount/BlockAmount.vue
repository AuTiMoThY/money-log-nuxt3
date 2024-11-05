<script setup>
import { useCurrencyStore } from "~/stores/useCurrencyStore";

const currencyStore = useCurrencyStore();
const { currency } = storeToRefs(currencyStore);

const amount = ref("0");
const displayValue = ref("0");

// Expose methods and refs to parent
defineExpose({
    amount,
    updateAmount: (value) => {
        displayValue.value = value;
        amount.value = value;
    }
});
</script>

<template>
    <div class="block-amount">
        <span class="amount-currency">{{ currency }}</span>
        <span class="amount-value">{{ displayValue }}</span>
    </div>
</template>
