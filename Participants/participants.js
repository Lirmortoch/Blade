function setTopForStyles() {
    document.querySelectorAll('.participant-item__style').forEach(item => {
        item.style.top = `${(item.clientWidth + 2) / 2}px`;
    });
}

setTopForStyles();