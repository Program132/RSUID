function createTextLabel(type = "TextLabel") {
    const canvas = document.getElementById("canvas");

    const element = document.createElement('div');
    element.classList.add('text-label');
    element.textContent = type;

    element.style.width = '150px';
    element.style.height = '50px';
    element.style.top = '50px';
    element.style.left = '50px';

    enableDrag(element, canvas);

    canvas.appendChild(element);
}

function enableDrag(element, container) {
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    let clickTimeout = null;
    const dragDelay = 100;
    const containerRect = container.getBoundingClientRect();

    element.addEventListener('mousedown', (e) => {
        clickTimeout = setTimeout(() => {
            isDragging = true;

            const elementRect = element.getBoundingClientRect();
            offsetX = e.clientX - elementRect.left;
            offsetY = e.clientY - elementRect.top;

            document.body.style.cursor = 'grabbing';
        }, dragDelay);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            let newX = e.clientX - containerRect.left - offsetX;
            let newY = e.clientY - containerRect.top - offsetY;

            newX = Math.max(0, Math.min(newX, container.offsetWidth - element.offsetWidth));
            newY = Math.max(0, Math.min(newY, container.offsetHeight - element.offsetHeight));

            element.style.left = `${newX}px`;
            element.style.top = `${newY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        if (clickTimeout) {
            clearTimeout(clickTimeout);
        }

        if (!isDragging) {
            triggerProperties();
        }

        isDragging = false;
        document.body.style.cursor = 'default';
    });
}

function triggerProperties() {
    console.log("Properties function triggered.");
}