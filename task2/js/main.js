const btnInfo = document.querySelector('.btn_screen-info');

btnInfo.addEventListener('click', () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    alert(`
    Ширина: ${screenWidth}px
    Высота: ${screenHeight}px`)
})