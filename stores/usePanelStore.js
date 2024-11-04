// import { defineStore } from "pinia";

export const usePanelStore = defineStore("panel", () => {
    // State
    const isAddPanel = ref(false);
    const selectedItem = ref(null); // Add new state for selected item name

    // Actions
    // function setSelectedItem(name) {
    //     // Add new action
    //     selectedItem.value = name;
    // }

    // Return all state and actions
    return {
        isAddPanel,
        selectedItem
        // setSelectedItem
    };
});
