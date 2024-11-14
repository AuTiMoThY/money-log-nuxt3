<script setup>
import DateField from "~/components/FrmField/DateField.vue";
import InputField from "~/components/FrmField/InputField.vue";

const imgPath = useRuntimeConfig().public.imgPath;

const panelStore = usePanelStore();
const { selectedItem } = storeToRefs(panelStore);
// console.log(selectedItem.value);

const today = new Date().toISOString().split("T")[0];
const date = ref(selectedItem.value.date || today);
const name = ref(selectedItem.value.name || "");
const category_id = ref(selectedItem.value.category_id);
// const blockCategorySingle = ref(null);

// Add calculator buttons array
const calculatorButtons = [
    ["C", "Del", "OK"],
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "×"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"]
];

// Add refs for calculator
const currentValue = ref("0");
const previousValue = ref(null);
const operation = ref(null);
const newNumberFlag = ref(true);

// Add ref for BlockAmount component
const amountBlock = ref(null);

// Add computed property to check if OK button should be disabled
const isOkDisabled = computed(() => {
    // Disable if:
    // 1. Amount is 0
    // 2. There's an ongoing calculation (operation is set and waiting for second number)
    // 3. Amount is invalid
    return (
        parseFloat(currentValue.value) === 0 ||
        operation.value !== null ||
        !isValidAmount(currentValue.value)
    );
});

// Helper function to validate amount
const isValidAmount = (value) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= 0 && Number.isFinite(num);
};

// Update calculator logic
const handleCalcButton = (value) => {
    if (value === "OK") {
        if (!isOkDisabled.value) {
            handleSubmit();
        }
        return;
    }
    // Handle numbers and decimal point
    if (!isNaN(value) || value === ".") {
        if (newNumberFlag.value) {
            currentValue.value = value === "." ? "0." : value;
            newNumberFlag.value = false;
        } else {
            // Prevent multiple decimal points
            if (value === "." && currentValue.value.includes(".")) return;
            currentValue.value += value;
        }
        amountBlock.value?.updateAmount(currentValue.value);
    }
    // Handle operators
    else if (["+", "-", "×", "÷"].includes(value)) {
        newNumberFlag.value = true;
        if (previousValue.value === null) {
            previousValue.value = parseFloat(currentValue.value);
        } else {
            calculateResult();
        }
        operation.value = value;
    }
    // Handle equals
    else if (value === "=") {
        calculateResult();
        operation.value = null;
    }
    // Handle clear
    else if (value === "C") {
        clearCalculator();
    }
    // Handle delete
    else if (value === "Del") {
        if (currentValue.value.length > 1) {
            currentValue.value = currentValue.value.slice(0, -1);
        } else {
            currentValue.value = "0";
        }
        amountBlock.value?.updateAmount(currentValue.value);
    }
};

const calculateResult = () => {
    if (previousValue.value === null || operation.value === null) return;

    const prev = parseFloat(previousValue.value);
    const current = parseFloat(currentValue.value);
    let result;

    switch (operation.value) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "×":
            result = prev * current;
            break;
        case "÷":
            result = prev / current;
            break;
    }

    // Round to 2 decimal places
    result = Math.round(result * 100) / 100;

    currentValue.value = result.toString();
    previousValue.value = null;
    newNumberFlag.value = true;

    amountBlock.value?.updateAmount(currentValue.value);
};

const clearCalculator = () => {
    currentValue.value = "0";
    previousValue.value = null;
    operation.value = null;
    newNumberFlag.value = true;

    // Make sure to update the BlockAmount display
    amountBlock.value?.updateAmount("0");
};

const handleSubmit = () => {
    // Get the current value from calculator instead of directly from amountBlock
    const submitAmount = parseFloat(currentValue.value);

    const formData = {
        date: date.value,
        name: name.value || "",
        category_id: category_id.value,
        amount: submitAmount
    };

    console.log(formData);

    // Close the panel after submission
    panelStore.isAddPanel = false;

    // Reset calculator and amount display
    clearCalculator();
    name.value = ""; // Reset name field
    date.value = today; // Reset date to today
};

watch(selectedItem, (newValue) => {
    console.log("selectedItem newValue:", newValue);
    date.value = newValue.date;
    name.value = newValue.name;
    category_id.value = newValue.category_id;
});

// Add watch for panel visibility to reset calculator when panel closes
watch(
    () => panelStore.isAddPanel,
    (newValue) => {
        if (!newValue) {
            clearCalculator();
        }
    }
);

// const getBlockCategoryPosition = () => {
//     return blockCategorySingle.value?.getPosition();
// };

// // Example usage:
// const handleSomeEvent = () => {
//     const position = getBlockCategoryPosition();
//     console.log("Category button position:", position);
//     // position will contain: { x, y, width, height, right, bottom }
// };

// onMounted(() => {
//     nextTick(() => {
//         // const position = getBlockCategoryPosition();
//         // console.log("Category button position:", position);
//     });
// });
</script>
<template>
    <au-panel class="panel-add">
        <au-btn class="add-close" @click="panelStore.isAddPanel = false">
            <template #icon-top>
                <au-img :default-src="`${imgPath}icons/close.png`" />
            </template>
        </au-btn>
        <div class="frm-wrap add-frm">
            <div class="frm-row">
                <date-field v-model="date"></date-field>
            </div>
            <div class="frm-row">
                <input-field v-model="name" :placeholder="'名稱'"></input-field>
            </div>
            <!-- <div class="frm-row">
                <block-category :active-id="category_id"></block-category>
            </div> -->
            <div class="frm-row frm-row-inline">
                <block-category-single></block-category-single>
                <!-- <block-category-single ref="blockCategorySingle"></block-category-single> -->
                <block-amount ref="amountBlock"></block-amount>
            </div>
            <div class="frm-row">
                <div class="calculator-btn-wrap">
                    <div
                        v-for="(row, rowIndex) in calculatorButtons"
                        :key="rowIndex"
                        class="calculator-btn-row">
                        <au-btn
                            v-for="btn in row"
                            :key="btn"
                            class="calculator-btn"
                            :class="{
                                'col-2': btn === 'OK',
                                disabled: btn === 'OK' && isOkDisabled
                            }"
                            :style="{
                                '--txt-color': btn === 'OK' ? '#fff' : 'var(--light-color)',
                                '--bd-color': 'transparent',
                                '--bg-color':
                                    btn === 'OK'
                                        ? isOkDisabled
                                            ? 'var(--disabled-color)'
                                            : 'var(--primary-color-hover)'
                                        : 'transparent'
                            }"
                            :disabled="btn === 'OK' && isOkDisabled"
                            :txt="btn"
                            @click="handleCalcButton(btn)">
                        </au-btn>
                    </div>
                </div>
            </div>
        </div>
        <div class="popup-category">
            <block-category :active-id="category_id"></block-category>
        </div>
    </au-panel>
</template>

<style scoped>
.calculator-btn.disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Add this to your CSS variables if not already defined */
:root {
    --disabled-color: #cccccc;
}
</style>
