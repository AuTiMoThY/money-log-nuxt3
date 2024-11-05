export const useCurrencyStore = defineStore("currency", () => {
    const currency = ref("NT$");

    return {
        currency
    };
});
