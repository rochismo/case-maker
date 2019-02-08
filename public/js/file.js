import {
    Service
} from './service/service.js';


const service = new Service();
const elements = Array.from(document.querySelector("form").children);
elements.forEach(child => {
    child.addEventListener("input", ev => {
        if (ev.target.value == "") {
            service.emit("remove", {
                id: `#${child.id}`
            });
        } else {
            service.emit("edit", {
                placeholder: "Someone's editing this . . .",
                id: `#${child.id}`
            });
        }
    });
})
window.notify = function () {
    service.emit("post");
}