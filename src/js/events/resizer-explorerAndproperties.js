document.addEventListener("DOMContentLoaded", () => {
    const properties = document.getElementById("properties");
    const explorer = document.getElementById("explorer");
    const resizerRight = document.getElementById("resizer-right");
    const resizerLeft = document.getElementById("resizer-left");
    const minWidth = 20; // Taille minimale
    const maxWidth = 300; // Taille maximale

    let isResizingRight = false;
    let isResizingLeft = false;

    // Redimensionner à droite
    resizerRight.addEventListener("mousedown", (e) => {
        isResizingRight = true;
        document.addEventListener("mousemove", resizeRight);
        document.addEventListener("mouseup", stopResize);
    });

    // Redimensionner à gauche
    resizerLeft.addEventListener("mousedown", (e) => {
        isResizingLeft = true;
        document.addEventListener("mousemove", resizeLeft);
        document.addEventListener("mouseup", stopResize);
    });

    function resizeRight(e) {
        if (isResizingRight) {
            const newWidth = e.clientX - properties.getBoundingClientRect().left;
            if (newWidth > minWidth && newWidth < maxWidth) {
                properties.style.flex = `0 0 ${newWidth}px`;
            }
        }
    }

    function resizeLeft(e) {
        if (isResizingLeft) {
            const newWidth = explorer.getBoundingClientRect().right - e.clientX;
            if (newWidth > minWidth && newWidth < maxWidth) {
                explorer.style.flex = `0 0 ${newWidth}px`;
            }
        }
    }

    function stopResize() {
        isResizingRight = false;
        isResizingLeft = false;
        document.removeEventListener("mousemove", resizeRight);
        document.removeEventListener("mousemove", resizeLeft);
        document.removeEventListener("mouseup", stopResize);
    }
});
