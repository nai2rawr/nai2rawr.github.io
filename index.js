const kittyCursor = document.querySelector('.kiity-cursor');

const positionElement = (e) => {
    const mouseY = e.clientY;
    const mouseX = e.clientX;

    kittyCursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
}

window.addEventListener('mousemove', positionElement)