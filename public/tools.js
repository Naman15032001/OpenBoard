// <i class="fa-duotone fa-xmark"></i>
let optionsCont = document.querySelector('.options-cont');

//pencil-tool-cont

//eraser-tool-cont

let toolsCont = document.querySelector('.tools-cont');
let pencilToolsCont = document.querySelector('.pencil-tool-cont');
let eraserToolsCont = document.querySelector('.eraser-tool-cont');

let pencil = document.querySelector('.pencil');
let eraser = document.querySelector('.eraser');

let optionsFlag = true;

let pencilFlag = false;
let eraserFlag = false;


let sticky = document.querySelector(".sticky");

let upload = document.querySelector('.upload');


//true show 

// false hide tools

optionsCont.addEventListener("click", (e) => {
    optionsFlag = !optionsFlag
    if (optionsFlag) {
        openTools();
    } else {
        closeTools()
    }
})

function openTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-times");
    iconElem.classList.add("fa-bars");
    toolsCont.style.display = 'flex';
    //scale-tools
}

function closeTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times");
    toolsCont.style.display = 'none';
    pencilToolsCont.style.display = 'none';
    eraserToolsCont.style.display = 'none';
}

pencil.addEventListener("click", (e) => {
    pencilFlag = !pencilFlag;

    if (pencilFlag) {
        pencilToolsCont.style.display = 'block';
    } else {
        pencilToolsCont.style.display = 'none';
    }
})

eraser.addEventListener("click", (e) => {
    eraserFlag = !eraserFlag;

    if (eraserFlag) {
        eraserToolsCont.style.display = 'flex';
    } else {
        eraserToolsCont.style.display = 'none';
    }
})

upload.addEventListener("click", (e) => {
    // open file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyTemplateHTML = `<img src="${url}">`;
        createSticky(stickyTemplateHTML)

    })


})

function createSticky(stickyTemplateHTML) {

    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = `<div class="header-cont">
                                    <div class="minimize"></div>
                                    <div class="remove"></div>
                                </div>
                                <div class="note-cont">
                                   ${stickyTemplateHTML}
                                </div>`;
    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector('.minimize');
    let remove = stickyCont.querySelector('.remove');

    noteActions(minimize, remove, stickyCont);

    stickyCont.onmousedown = function (e) {
        dragAndDrop(stickyCont, e)
    }

    stickyCont.ondragstart = function () {
        return false;
    }

}

sticky.addEventListener("click", (e) => {

    let stickyTemplateHTML = `<textarea spellcheck="false"></textarea>`;
    createSticky(stickyTemplateHTML)

});

function noteActions(minimize, remove, stickyCont) {

    remove.addEventListener("click", (e) => {
        stickyCont.remove();
    })

    minimize.addEventListener("click", (e) => {
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if (display === 'none') noteCont.style.display = 'block';
        else noteCont.style.display = 'none'
    })

}

function dragAndDrop(element, event) {

    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };



};