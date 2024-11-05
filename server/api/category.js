export default defineEventHandler(() => {
    const categoryArr = [
        {
            id: 1,
            name: "食",
            rgb: [6, 214, 160],
            icon: "FoodBar.png"
        },
        {
            id: 2,
            name: "衣",
            rgb: [164, 172, 134],
            icon: "Clothes.png"
        },
        {
            id: 3,
            name: "住",
            rgb: [88, 47, 14],
            icon: "Home.png"
        },
        {
            id: 4,
            name: "行",
            rgb: [255, 209, 102],
            icon: "Hatchback.png"
        },
        {
            id: 5,
            name: "育",
            rgb: [17, 138, 178],
            icon: "Learning.png"
        },
        {
            id: 6,
            name: "樂",
            rgb: [239, 71, 111],
            icon: "XboxController.png"
        }
    ];
    return {
        categoryArr
    };
});
