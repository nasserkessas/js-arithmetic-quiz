function popup(content, buttons) {

    let btn = "";

    for (let button of buttons) {
        btn += `<button onclick="${button.action}()" class="${button.class}">${button.text}</button>`
    }

    modal = document.createElement("section")
    modal.innerHTML = `
    <section class="alertbox" id="alertbox">
        <div id="alerttext" class="alerttext">${content}</div>
        ${btn}
    </section>`;
    document.body.appendChild(modal);
}