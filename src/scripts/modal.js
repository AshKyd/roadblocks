var d = document;
var w = window;
/**
 * Show/hide the tooltip over the top of the game.
 */
import playSound from "./sfx";
function getElementHeight(ele) {
    return parseInt(w.getComputedStyle(ele, null).getPropertyValue("height"));
}

const getTooltip = () => document.querySelector("#tt");
const getScrim = () => document.querySelector("#s");

const Modal = {
    visible: false,
    show: function (message, title, tile, copyfit, cb, btn) {
        const tooltip = getTooltip();
        const scrim = getScrim();
        title = title ? "<h1>" + title + "</h1>" : "";
        tile = tile ? '<img class="rubberBand" src="' + tile + '">' : "";
        tooltip.innerHTML =
            '<div id="tt-inner"><a class="close">' +
            (btn || "OK") +
            "</a> " +
            title +
            message +
            tile +
            "</div>";
        tooltip.style.display = "block";
        scrim.style.display = "block";
        Modal.visible = true;
        setTimeout(function () {
            tooltip.className = "active";
            scrim.className = "active";

            // Copyfit the text to fit the dialog, regardless of screen size.
            var height = getElementHeight(tooltip);
            var inner = document.querySelector("#tt-inner");
            var img = document.querySelector("#tt-inner img");

            if (copyfit) {
                inner.className = "";
                for (var i = 35; i > 10; i--) {
                    inner.style.fontSize = i + "px";
                    if (getElementHeight(inner) < height - 100) {
                        break;
                    }
                }
            } else {
                inner.className = "scroll";
            }

            function close(e) {
                e.preventDefault();
                playSound("select");
                Modal.hide(cb);
            }
            document.querySelector(".close").onclick = close;
            scrim.onclick = close;
            tooltip.ontouchstart = tooltip.onclick;
            setTimeout(function () {
                playSound("dialog");
            }, 10);
        }, 1);
    },
    hide: function (cb) {
        const tooltip = getTooltip();
        const scrim = getScrim();
        tooltip.className = "";
        scrim.className = "";
        Modal.visible = false;
        setTimeout(function () {
            tooltip.style.display = "none";
            scrim.style.display = "none";
            if (cb) {
                cb();
            }
        }, 150);
    },
};

export default Modal;
