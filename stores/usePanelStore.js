// import { defineStore } from "pinia";

export const usePanelStore = defineStore("panel", () => {
    // State
    const isAddPanel = ref(false);
    const selectedItem = ref({
        date: "",
        name: "",
        category_id: 0
    });
    // Actions
    // function setSelectedItem(name) {
    //     // Add new action
    //     selectedItem.value = name;
    // }

    watch(isAddPanel, (newValue) => {
        if (!newValue) {
            selectedItem.value = {
                date: "",
                name: "",
                category_id: 0
            };
        }
    });
    // Return all state and actions
    return {
        isAddPanel,
        selectedItem
        // setSelectedItem
    };
});
