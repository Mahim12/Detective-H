export const getSafeArea = (scaleManager) => {
    const { width, height } = scaleManager.gameSize;
    const style = window.getComputedStyle(document.documentElement);

    return {
        width,
        height,
        top: parseInt(style.getPropertyValue('--sat')) || 20,
        bottom: parseInt(style.getPropertyValue('--sab')) || 20,
        left: parseInt(style.getPropertyValue('--sal')) || 20,
        right: parseInt(style.getPropertyValue('--sar')) || 20,
        centerX: width / 2,
        centerY: height / 2
    };
};