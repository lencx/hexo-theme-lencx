function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

addLoadEvent(function() {
    // console.log('tagCloud plugin rock and roll!');
    try {
        TagCanvas.textFont = "Shrikhand", 'cursive', 'Trebuchet MS, Helvetica';
        TagCanvas.textHeight = 25;
        TagCanvas.outlineMethod = 'block';
        TagCanvas.maxSpeed = 0.05;
        TagCanvas.minBrightness = 0.2;
        TagCanvas.depth = 0.92;
        TagCanvas.pulsateTo = 0.6;
        TagCanvas.initial = [0.1, -0.1];
        TagCanvas.decel = 0.98;
        TagCanvas.reverse = true;
        TagCanvas.shadow = '#000';
        TagCanvas.shadowBlur = 4;
        TagCanvas.weight = false;
        TagCanvas.imageScale = null;
        TagCanvas.fadeIn = 1200;
        TagCanvas.clickToFront = 600;
        TagCanvas.Start('resCanvas');
        TagCanvas.tc['resCanvas'].Wheel(false);
    } catch (e) {
        // console.log(e);
        // document.getElementById('tagCloudCanvas').style.display = 'none';
    }
});