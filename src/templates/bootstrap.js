import iconMenu from "../images/icon-menu.svg";
import iconScreenshot from "../images/icon-screenshot.svg";
import iconRestart from "../images/icon-restart.svg";

export default `<canvas></canvas>
<div id="tt"></div>
<div id="s" style="display:none;"></div>
<div class="chrome">
    <div id="p"></div>
    <div id="buttons">
        <a data-action="menu"><img src="${iconMenu}" data-action="menu"></a>
        <a data-action="ss"><img src="${iconScreenshot}" data-action="ss"></a>
        <a data-action="restart"><img src="${iconRestart}" data-action="restart"></a>
    </div>
</div>
<div id="menu"></div>
<div id="tl"></div>
`;
