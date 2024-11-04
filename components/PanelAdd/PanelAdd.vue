<script setup>
import DateField from "~/components/FrmField/DateField.vue";
import InputField from "~/components/FrmField/InputField.vue";

const panelStore = usePanelStore();
const { selectedItem } = storeToRefs(panelStore);
console.log(selectedItem.value);

const today = new Date().toISOString().split("T")[0];
const date = ref(today);
const name = ref("");

watch(selectedItem, (newValue) => {
    name.value = newValue || ""; // If newValue is null/undefined, set empty string
});
</script>
<template>
    <au-panel class="panel-add">
        <div class="frm-wrap add-frm">
            <div class="frm-row">
                <date-field v-model="date"></date-field>
            </div>
            <div class="frm-row">
                <input-field v-model="name" :placeholder="'名稱'"></input-field>
            </div>
            <div class="frm-row">
                <block-category></block-category>
            </div>
        </div>
    </au-panel>
</template>
