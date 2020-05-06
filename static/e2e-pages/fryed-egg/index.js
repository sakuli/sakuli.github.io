 //Referenced this article for guidance: https://javascript.info/mouse-drag-and-drop
var skillet = document.getElementById('skillet');
var egg = document.getElementById('egg');
skillet.style.width = '80%';
egg.style.width = '20%';

egg.onmousedown = function (ev) {
    // ^ When mousedown on the egg...
    let shiftX = ev.clientX - egg.getBoundingClientRect().left;
    let shiftY = ev.clientY - egg.getBoundingClientRect().top;
    //^Setting variables that will also consider where on the object the user is clicking reltibve to the page.
    egg.style.position = 'absolute';
    egg.style.zIndex = 1000;
    // ^ The egg is prepared to be moved absolutely on the page and above (most forward on the screen) everything else.`
    document.body.append(egg);
    moveAt(ev.pageX, ev.pageY);
    // ^ Move the egg where ever the event, mousedown in this case, is happening

    function moveAt(pageX, pageY) {
        // egg.style.left = pageX - egg.offsetWidth / 2 + 'px';
        // egg.style.top = pageY - egg.offsetHeight / 2 + 'px';
        // ^ We would use this code if we aren't worried about where on the object the user is clicking
        egg.style.left = pageX - shiftX + 'px';
        egg.style.top = pageY - shiftY + 'px';
    }

    let currentDropzone = null;
    //^ Setting this to define as the dropezone

    function onMouseMove(ev) {
        //^ This is nested within the onmousedown event, so it'll only fire when the mose is down
        moveAt(ev.pageX, ev.pageY);

        egg.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        egg.hidden = false;
        if (!elemBelow) return;

        // potential droppables are labeled with the class "droppable" (can be other logic)
        let dropzoneBelow = elemBelow.closest('.dropzone');

        if (currentDropzone != dropzoneBelow) {
            if (currentDropzone) {
                leaveDropzone(currentDropzone);
            }
            currentDropzone = dropzoneBelow;
            if (currentDropzone) {
                // the logic to process "flying in" of the droppable
                enterDropzone(currentDropzone);
            }
        }
    }
    document.addEventListener('mousemove', onMouseMove);
    egg.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        egg.onmouseup = null;
        if (skillet.classList.contains('happyskillet')) {
            skillet.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/259510/skillet-and-egg.svg';
            skillet.classList.remove('happyskillet');
            egg.style.display = 'none';
            document.body.style.background = '#e7c1f2';
        };

    }
};

function enterDropzone(elem) {
    elem.classList.add('happyskillet');
}

function leaveDropzone(elem) {
    elem.classList.remove('happyskillet');
}

// Prevents default behavior of dragging a clone/ghost and allows use to drag to original
egg.ondragstart = function () {
    return false;
}
