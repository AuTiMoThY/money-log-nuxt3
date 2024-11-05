// RGB color utility composable
export const useRgbColor = () => {
    // Convert RGB array to CSS rgb() string
    const getRgbColor = (rgb) => `rgb(${rgb.join(",")})`;

    // Generate box shadow with RGB color
    const getHoverShadow = (rgb) => `0px 4px 10px rgba(${rgb.join(",")}, 0.3)`;

    // Make RGB color 30% darker
    const getDarkerRgb = (rgb) => {
        return rgb.map((value) => Math.max(0, Math.floor(value * 0.7)));
    };

    return {
        getRgbColor,
        getHoverShadow,
        getDarkerRgb
    };
};
