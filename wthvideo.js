// Copyright 2016 Website Talking Heads
// JavaScript Document
//Delay creation until page is loaded
if (window.addEventListener) {
    window.addEventListener("load", wthplayer, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", wthplayer);
} else {
    window.onload = wthplayer;
}

function wthplayer() {
    "use strict";
    //Variables for Player
    var responsive = "no", //You must place <div id="wthvideo"></div> inside the div you want the video to be in.
        width = "320", //video width
        height = "320", //video height
        position = "fixed", //fixed or absolute positioning
        left = "auto", //if centering on page change this to 50%
        right = "0",
        divTop = "auto",
        bottom = "0",
        centeroffset = "auto", //if centering on page negative numbers are left and positive numbers are right
        color = "rgba(84,155,255,0.6)", //the color of the player bar.
        volume = "0.8",
        delay = 0, //delay start of video
        controlbar = "mouse", //options for showing the controlbar, yes, no, and mouse
        exitbtn = "yes", //show or not show exitbtn
        autostart = "no", //autostart options yes, no, mute, oncethenpic, oncethenmute, onceonlythenpic, onceonlythenmute, and loop
        exitoncomplete = "no", //option for player to close after video completes. "yes" or "no"
        oncepersession = "no", //option for number of times video plays "yes", "no", or "onceonly"
        vidLink = "", //make the Talking Heads Player a link. Either leave this set to "no" or you can put a complete URL inside the quotes.
        openIn = "_blank",
        path = "wthvideo", //path to where the files are located
        actorpic = "wixapp", //transparent gif
        canvasVideo = "wixapp_matte", //Just name,not extension
        h264 = "wixapp", //Just name,not extension h264
        // end Main Player Vars
        imagePath = path + "/",
        gb = imagePath + actorpic,
        gifBackground = "url('" + gb + ".gif')",
        buttonPath = imagePath + "buttons" + "/",
        hVideo = path + "/" + canvasVideo + ".mp4",
        leftEnd = left.charAt(left.length - 1),
        overflow = "hidden",
        iOS = !1,
        isDevice = !1,
        isMobileDevice = (navigator.userAgent.match(/iPhone/i)),
        platform = navigator.platform,
        ua = navigator.userAgent.toLowerCase(),
        isAndroid = ua.indexOf("android") > -1,
        playerBarWidth = 132,
        btnWidth = 32,
        playerBarHeight = btnWidth + 2,
        playerBarMarginBase = ((playerBarHeight + 6) * (-1)) + "px",
        playerBarMargin = (width - playerBarWidth) / 2,
        hasSeenLS, hasSeenSS = !1,
        theParent, actorGif, iPhoneVideo, thplayer, spokespersonImage, thb, thv, PlayerBar, newP, playerClose, restartBtn, muteBtn, createTH, dv, playingS, outputCanvas, theCanvas, thc = null,
        vendors = ["-moz-", "-webkit-", "-o-", "-ms-", "-khtml-", ""],
        i10, toLoop, toMute = !1,
        toPlay = true,
        hasSeen = "hasSeen" + canvasVideo;
    btnWidth = btnWidth + "px";
    delay = delay * 1000;
    actorGif = imagePath + actorpic + ".gif";
    buttonPath = imagePath + "buttons" + "/";
    leftEnd = left.charAt(left.length - 1);
    switch (leftEnd) {
        case "%":
            break;
        case "o":
            break;
        default:
            left += "px";
    }
    if (divTop !== "auto") {
        divTop += "px";
    }
    if (right !== "auto") {
        right += "px";
    }
    if (centeroffset !== "auto") {
        centeroffset += "px";
    }
    if (bottom !== "auto") {
        bottom += "px";
    }
    ua.includes("iphone os 10") ? i10 = true : ("iPad" !== platform && "iPhone" !== platform && "iPod" !== platform || (iOS = true), (iOS || isAndroid || null !== isMobileDevice) && (isDevice = true));
    if (!isDevice) {
        hVideo = path + "/" + canvasVideo + ".mp4";
    } else {
        hVideo = path + "/" + h264 + ".mp4";
    }
    hasSeenSS = sessionStorage.getItem(hasSeen);
    hasSeenLS = localStorage.getItem(hasSeen);
    if (hasSeenLS === null) {
        if (autostart !== "no" || autostart === "mute") {
            toPlay = true;
            autostart = "yes";
        }
    } else {
        oncepersessionSwitch();
        autostartSwitch();
    }
    if (hasSeenSS !== null) {
        switch (autostart) {
            case "oncethenmute":
            case "mute":
            case "loop":
                toLoop = true;
                toMute = true;
                autostart = "mute";
                break;
            case "oncethenpic":
            case "onceonlythenpic":
                autostart = "no";
                break;
        }
    }
    sessionStorage.setItem(hasSeen, !0);
    localStorage.setItem(hasSeen, !0);
    if (toPlay === true) {
        setTimeout(function () {
            createDiv();
        }, delay);
    } else {
        return;
    }

    function autostartSwitch() {
        switch (autostart) {
            case "onceonlythenmute":
                autostart = "mute";
                break;
            case "onceonlythenpic":
                autostart = "no";
                break;
            default:
                break;
        }
    }

    function oncepersessionSwitch() {
        switch (oncepersession) {
            case "yes":
                if (hasSeenSS === "true") {
                    toPlay = !1;
                } else {
                    toPlay = true;
                }
                break;
            case "onceonly":
                if (hasSeenLS === "true") {
                    toPlay = !1;
                } else {
                    toPlay = true;
                }
                break;
            default:
                toPlay = true;
                break;
        }
    }

    function createDiv() {
        if (responsive === "yes") {
            createTH = document.getElementById("wthvideo");
            createTH.style.position = "relative";
            createTH.style.left = "50%";
            createTH.style.marginLeft = (width / 2) * -1 + "px";
            createTH.style.top = "auto";
            createTH.style.bottom = 0;
        } else {
            createTH = document.createElement("div");
            createTH.id = "wthvideo";
            createTH.style.position = position;
            createTH.style.marginLeft = centeroffset;
            createTH.style.left = left;
            createTH.style.right = right;
            createTH.style.marginLeft = centeroffset;
            createTH.style.top = divTop;
            createTH.style.bottom = bottom;
            var wthbody = document.body || document.getElementsByTagName("body")[0];
            wthbody.insertBefore(createTH, wthbody.childNodes[0]);
        }
        thv = document.getElementById("wthvideo");
        createTH.style.height = height + "px";
        createTH.style.width = width + "px";
        createTH.style.zIndex = 9999;
        createTH.style.cursor = "pointer";
        createTH.style.overflow = overflow;
        isDevice = true;
        if (isDevice) {
            var settings = {
                "autostart": autostart,
                "session_play": oncepersession,
                "exit_on_complete": exitoncomplete,
                "delay": delay,
                "volume": volume,
                "bar_color": rgb2hex(color),
                "bar_opacity": rgba2opacity(color),
                "click_color": rgb2hex(color),
                "click_opacity": rgba2opacity(color),
                "playerBar": controlbar,
                "btn_size": btnWidth,
                "exit_btn": exitbtn,
                "video": h264,
                "width": width
            };
            console.log(settings);
            new Player({
                playerId: "wthvideo",
                frameWidth: width,
                json: settings
            });
        } else {
            createVideo();
            createControls();
            createCanvas();
            HTML5Autostart();
        }
    }

    function createVideo() {
        var v = document.createElement("VIDEO");
        v.id = "talkinghead";
        v.setAttribute("playsinline", "playsinline");
        v.src = hVideo;
        v.zIndex = 1;
        v.poster = actorGif;
        v.style.display = "none";
        v.volume = volume;
        v.style.width = width + "px";
        if (toLoop) {
            v.loop = true;
        }
        if (toMute) {
            v.muted = true;
            if (autostart !== "loop") {
                startBtnCreate();
            }
        }
        v.style.height = height + "px";
        thv.appendChild(v);
        thplayer = document.getElementById("talkinghead");
        var p = document.createElement("p");
        p.innerHTML = "Your Browser does not support the <video> tag";
        v.appendChild(p);
    }

    function createCanvas() {
        thb = document.createElement("CANVAS");
        thb.id = "bufferCanvas";
        thb.width = width;
        thb.height = height * 2;
        thb.style.display = "none";
        thb.style.position = "absolute";
        thv.appendChild(thb);
        thc = document.createElement("CANVAS");
        thc.style.position = "absolute";
        thc.style.top = "0";
        thc.style.left = "0";
        thc.id = "talkingCanvas";
        thc.width = width;
        thc.height = height * 2;
        thv.appendChild(thc);
    }

    function createControls() {
        var newD = document.createElement("div");
        newD.id = "playholder";
        newD.style.position = "relative";
        newD.style.width = width + "px";
        newD.style.height = height + "px";
        thv.appendChild(newD);
        if (exitbtn === "yes") {
            var newI = document.createElement("img");
            newI.id = "htmlClose";
            newI.style.marginLeft = (width - 20) + "px";
            newI.style.width = "16px";
            newI.style.display = "block";
            newI.style.position = "relative";
            newI.src = buttonPath + "exit.png";
            dv = document.getElementById("playholder");
            var windowClose = newI;
            dv.appendChild(windowClose);
        }
        newP = document.createElement("div");
        newP.id = "PlayerBar";
        newP.style.height = playerBarHeight + "px";
        newP.style.width = playerBarWidth + "px";
        newP.style.borderRadius = "8px";
        newP.style.paddingLeft = "3px";
        newP.style.paddingTop = "1px";
        newP.style.marginTop = "0px";
        newP.style.left = playerBarMargin + "px";
        newP.style.bottom = "0px";
        newP.style.position = "relative";
        newP.style.zIndex = 10020;
        newP.style.background = color;
        newP.style.border = "2px solid " + rgb2hex(color);
        PlayerBar = newP;
        thv.appendChild(PlayerBar);
        createTH = document.createElement("img");
        createTH.style.maxWidth = btnWidth;
        createTH.id = "PlayPauseBtn";
        createTH.style.float = "left";
        createTH.src = buttonPath + "play.png";
        createTH.style.position = "relative";
        createTH.style.zIndex = "inherit";
        dv = document.getElementById("PlayerBar");
        newP.style.position = "PlayPauseBtn";
        var PlayButton = createTH;
        dv.appendChild(PlayButton);
        createTH = document.createElement("img");
        createTH.style.width = btnWidth;
        createTH.id = "muteBtn";
        if (document.getElementById("talkinghead").muted) {
            createTH.src = buttonPath + "mute.png";
        } else {
            createTH.src = buttonPath + "volume.png";
        }
        createTH.style.float = "left";
        dv = document.getElementById("PlayerBar");
        muteBtn = createTH;
        dv.appendChild(muteBtn);
        createTH = document.createElement("img");
        createTH.style.width = btnWidth;
        createTH.id = "restartBtn";
        createTH.style.float = "left";
        createTH.src = buttonPath + "restart.png";
        createTH.style.position = "relative";
        createTH.style.float = "left";
        createTH.style.zIndex = 10050;
        dv = document.getElementById("PlayerBar");
        restartBtn = createTH;
        dv.appendChild(restartBtn);
        createTH = document.createElement("img");
        createTH.style.width = btnWidth;
        createTH.id = "playerClose";
        createTH.style.position = "relative";
        createTH.style.zIndex = 99050;
        createTH.style.float = "left";
        createTH.src = buttonPath + "exit.png";
        dv = document.getElementById("PlayerBar");
        playerClose = createTH;
        dv.appendChild(playerClose);
        addListeners();
        if ("ontouchstart" in window || controlbar === "yes") {
            document.getElementById("PlayerBar").style.marginTop = playerBarMarginBase;
        } else {
            setCss3Style(document.getElementById("PlayerBar"), "transition", "all 1s");
        }
    }

    function startPlaying() {
        theCanvas = document.getElementById("talkingCanvas");
        outputCanvas = document.getElementById("bufferCanvas");
        try {
            thplayer.play();
            document.getElementById("PlayPauseBtn").src = buttonPath + "pause.png";
        } catch (err) {}
        if (theCanvas && theCanvas.getContext) {
            var ctx = theCanvas.getContext("2d");
            if (ctx) {
                playingS = setInterval(function () {
                    showVideo();
                }, 16);
            }
        }
    }

    function showVideo() {
        try {
            var theCanvas = document.getElementById("talkingCanvas"),
                ctx = theCanvas.getContext("2d"),
                srcVid = thplayer,
                buffer = outputCanvas.getContext("2d");
            buffer.drawImage(srcVid, 0, 0);
            var image = buffer.getImageData(0, 0, width, height),
                imageData = image.data,
                alphaData = buffer.getImageData(0, height, width, height).data;
            for (var i = 3, len = imageData.length; i < len; i = i + 4) {
                imageData[i] = alphaData[i - 1];
            }
            ctx.putImageData(image, 0, 0, 0, 0, width, height);
        } catch (err) {}
    }

    function HTML5Autostart() {
        if (autostart === "yes" || toLoop === true) {
            thplayer.oncanplay = function () {
                if (thplayer.paused === true) {
                    autostart = "cant auto play";
                    addBackground();
                }
            };
        }
        if (autostart === "yes" || toLoop === true) {
            thplayer.autoplay = true;
            document.getElementById("PlayPauseBtn").src = buttonPath + "pause.png";
            document.getElementById("PlayerBar").style.opacity = "1";
            startPlaying();
        } else {
            addBackground();
        }
        if (exitoncomplete === "yes") {
            thplayer.addEventListener("ended", closePlayer, !1);
        }
    }

    function addListeners() {
        theParent = document.querySelector("#wthvideo");
        theParent.addEventListener("click", doSomething, !1);
        theParent.addEventListener("mouseover", overVideo, !1);
        theParent.addEventListener("mouseout", outVideo, !1);

        function outVideo(e) {
            if (e.target !== e.currentTarget) {
                switch (e.target.id) {
                    case "talkingCanvas":
                        document.getElementById("PlayerBar").style.marginTop = "0px";
                        break;
                    case "PlayPauseBtn":
                    case "muteBtn":
                    case "restartBtn":
                    case "playerClose":
                    case "htmlClose":
                    case "imgLnk":
                        e.target.style.opacity = 1;
                        break;
                }
            }
            e.stopPropagation();
        }

        function overVideo(e) {
            if (e.target !== e.currentTarget) {
                switch (e.target.id) {

                    case "talkingCanvas":
                        document.getElementById("PlayerBar").style.marginTop = playerBarMarginBase;
                        break;
                    case "PlayPauseBtn":
                    case "muteBtn":
                    case "restartBtn":
                    case "playerClose":
                    case "htmlClose":
                    case "imgLnk":
                        e.target.style.opacity = 0.5;
                        document.getElementById("PlayerBar").style.marginTop = playerBarMarginBase;
                        break;
                }
            }
            e.stopPropagation();
        }

        function doSomething(e) {
            if (e.target !== e.currentTarget) {
                if (toMute) {
                    removeMuted();
                }
                switch (e.target.id) {
                    case "PlayPauseBtn":
                        if (spokespersonImage) {
                            if (spokespersonImage.style.display === "none") {
                                playToggle();
                            }
                        } else {
                            playToggle();
                        }
                        break;
                    case "muteBtn":
                        muteToggle();
                        break;
                    case "restartBtn":
                        restartClick();
                        break;
                    case "playerClose":
                    case "htmlClose":
                        closePlayer();
                        break;
                    case "click-to-play":
                    case "spokespersonImage":
                        playClick();
                        break;
                    case "talkingCanvas":
                    case "talkinghead":
                        if (vidLink !== "") {
                            openLink();
                        } else {
                            try {
                                document.getElementById("click-to-play").parentNode.removeChild(document.getElementById("click-to-play"));
                            } catch (err) {}
                            playToggle();
                        }
                        break;
                    case "imgLnk":
                    case "Spokesperson":
                    case "videoBtn":
                        iPhonePlay();
                        break;
                    case "talkinghead":
                        if (platform === "iPhone") {
                            iPhonePlay();
                        } else {
                            openLink();
                        }
                        break;
                }
            }
            e.stopPropagation();
        }
        try {
            thplayer.addEventListener("ended", videoEnded, !1);
        } catch (err) {}
        try {
            iPhoneVideo.addEventListener("ended", iPhoneEnded, !1);
        } catch (err) {}
    }

    function setCss3Style(el, prop, val) {
        for (var i = 0, l = vendors.length; i < l; i++) {
            el.style[toCamelCase(vendors[i] + prop)] = val;
        }
    }

    function toCamelCase(str) {
        return str.toLowerCase().replace(/(\-[a-z])/g, function ($1) {
            return $1.toUpperCase().replace("-", "");
        });
    }

    function videoEnded() {
        document.getElementById("PlayPauseBtn").src = buttonPath + "play.png";
        if (exitoncomplete === "yes") {
            closePlayer();
        } else {
            addBackground();
        }
    }

    function playClick() {
        try {
            spokespersonImage.style.display = "none";
        } catch (err) {}
        try {
            document.getElementById("click-to-play").parentNode.removeChild(document.getElementById("click-to-play"));
        } catch (err) {}
        startPlaying();
    }

    function playToggle() {
        if (thplayer.paused) {
            thplayer.play();
            document.getElementById("PlayPauseBtn").src = buttonPath + "pause.png";
            document.getElementById("PlayerBar").style.opacity = "1";
        } else {
            document.getElementById("PlayPauseBtn").src = buttonPath + "play.png";
            thplayer.pause();
        }
    }

    function muteToggle() {
        if (thplayer.muted) {
            thplayer.muted = !1;
            document.getElementById("muteBtn").src = buttonPath + "volume.png";
        } else {
            document.getElementById("muteBtn").src = buttonPath + "mute.png";
            thplayer.muted = true;
        }
    }

    function restartClick() {
        thplayer.currentTime = 0;
        document.getElementById("PlayPauseBtn").src = buttonPath + "pause.png";
        playClick();
        thplayer.play();
    }

    function closePlayer() {
        thplayer.pause();
        clearInterval(playingS);
        try {
            thv.parentNode.removeChild(document.getElementById("wthvideo"));
        } catch (err) {}
        return;
    }

    function addBackground() {
        spokespersonImage = document.createElement("DIV");
        spokespersonImage.id = "spokespersonImage";
        spokespersonImage.style.backgroundImage = gifBackground;
        spokespersonImage.style.backgroundRepeat = "no-repeat";
        spokespersonImage.style.position = "absolute";
        spokespersonImage.style.cursor = "pointer";
        spokespersonImage.style.height = height + "px";
        spokespersonImage.style.width = width + "px";
        spokespersonImage.style.zIndex = 100;
        thv.insertBefore(spokespersonImage, thv.firstChild);
        spokespersonImage = document.getElementById("spokespersonImage");
        startBtnCreate();
    }

    function startBtnCreate() {
        var startBtn = document.createElement("DIV");
        startBtn.id = "click-to-play";
        startBtn.alt = "Click to Play";
        startBtn.style.cursor = "pointer";
        startBtn.style.position = "absolute";
        startBtn.style.top = "46%";
        startBtn.style.left = (width - 160) / 2 + "px";
        startBtn.style.textAlign = "center";
        startBtn.style.fontSize = "24px";
        startBtn.style.fontWeight = "600";
        startBtn.innerHTML = "Click to Play";
        startBtn.style.padding = "12px";
        startBtn.style.background = color;
        startBtn.style.borderRadius = "12px";
        startBtn.style.border = "2px solid " + rgb2hex(color);
        if (toMute) {
            thv.appendChild(startBtn);
        } else {
            spokespersonImage.appendChild(startBtn);
        }
    }

    function openLink() {
        document.getElementById("PlayPauseBtn").src = buttonPath + "play.png";
        thplayer.pause();
        window.open(vidLink, openIn);
    }

    function removeMuted() {
        document.getElementById("muteBtn").src = buttonPath + "volume.png";
        toMute = !1;
        toLoop = !1;
        thplayer.muted = !1;
        thplayer.loop = !1;
        setTimeout(function () {
            restartClick();
        }, 150);
    }

    function rgb2hex(orig) {
        var rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+)/i);
        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : orig;
    }

    function rgba2opacity(op) {
        return op.slice(16, 19);
    }
}
/*
 @license PreloadJS
 Visit http://createjs.com/ for documentation, updates and examples.

 Copyright (c) 2011-2015 gskinner.com, inc.

 Distributed under the terms of the MIT license.
 http://www.opensource.org/licenses/mit-license.html

 This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs = this.createjs || {};
(function () {
    "use strict";
    var c = createjs.PreloadJS = createjs.PreloadJS || {};
    c.version = "0.6.2";
    c.buildDate = "Thu, 26 Nov 2015 20:44:31 GMT"
})();
this.createjs = this.createjs || {};
createjs.extend = function (c, b) {
    function a() {
        "use strict";
        this.constructor = c
    }
    return a.prototype = b.prototype, c.prototype = new a
};
this.createjs = this.createjs || {};
createjs.promote = function (c, b) {
    var a = c.prototype,
        d = Object.getPrototypeOf && Object.getPrototypeOf(a) || a.__proto__;
    if (d) {
        a[(b += "_") + "constructor"] = d.constructor;
        for (var e in d) a.hasOwnProperty(e) && "function" == typeof d[e] && (a[b + e] = d[e])
    }
    return c
};
this.createjs = this.createjs || {};
(function () {
    createjs.proxy = function (c, b) {
        var a = Array.prototype.slice.call(arguments, 2);
        return function () {
            return c.apply(b, Array.prototype.slice.call(arguments, 0).concat(a))
        }
    }
})();
this.createjs = this.createjs || {};
createjs.indexOf = function (c, b) {
    for (var a = 0, d = c.length; d > a; a++)
        if (b === c[a]) return a;
    return -1
};
this.createjs = this.createjs || {};
(function () {
    function c(a, d, b) {
        this.type = a;
        this.currentTarget = this.target = null;
        this.eventPhase = 0;
        this.bubbles = !!d;
        this.cancelable = !!b;
        this.timeStamp = (new Date).getTime();
        this.removed = this.immediatePropagationStopped = this.propagationStopped = this.defaultPrevented = !1
    }
    var b = c.prototype;
    b.preventDefault = function () {
        this.defaultPrevented = this.cancelable && !0
    };
    b.stopPropagation = function () {
        this.propagationStopped = true
    };
    b.stopImmediatePropagation = function () {
        this.immediatePropagationStopped = this.propagationStopped = true
    };
    b.remove = function () {
        this.removed = true
    };
    b.clone = function () {
        return new c(this.type, this.bubbles, this.cancelable)
    };
    b.set = function (a) {
        for (var d in a) this[d] = a[d];
        return this
    };
    b.toString = function () {
        return "[Event (type=" + this.type + ")]"
    };
    createjs.Event = c
})();
this.createjs = this.createjs || {};
(function () {
    function c(b, a, d) {
        this.Event_constructor("error");
        this.title = b;
        this.message = a;
        this.data = d
    }
    createjs.extend(c, createjs.Event).clone = function () {
        return new createjs.ErrorEvent(this.title, this.message, this.data)
    };
    createjs.ErrorEvent = createjs.promote(c, "Event")
})();
this.createjs = this.createjs || {};
(function () {
    function c() {
        this._captureListeners = this._listeners = null
    }
    var b = c.prototype;
    c.initialize = function (a) {
        a.addEventListener = b.addEventListener;
        a.on = b.on;
        a.removeEventListener = a.off = b.removeEventListener;
        a.removeAllEventListeners = b.removeAllEventListeners;
        a.hasEventListener = b.hasEventListener;
        a.dispatchEvent = b.dispatchEvent;
        a._dispatchEvent = b._dispatchEvent;
        a.willTrigger = b.willTrigger
    };
    b.addEventListener = function (a, d, b) {
        var c;
        c = b ? this._captureListeners = this._captureListeners || {} : this._listeners =
            this._listeners || {};
        var e = c[a];
        return e && this.removeEventListener(a, d, b), e = c[a], e ? e.push(d) : c[a] = [d], d
    };
    b.on = function (a, d, b, c, f, g) {
        return d.handleEvent && (b = b || d, d = d.handleEvent), b = b || this, this.addEventListener(a, function (a) {
            d.call(b, a, f);
            c && a.remove()
        }, g)
    };
    b.removeEventListener = function (a, d, b) {
        if (b = b ? this._captureListeners : this._listeners) {
            var c = b[a];
            if (c)
                for (var e = 0, g = c.length; g > e; e++)
                    if (c[e] == d) {
                        1 == g ? delete b[a] : c.splice(e, 1);
                        break
                    }
        }
    };
    b.off = b.removeEventListener;
    b.removeAllEventListeners = function (a) {
        a ?
            (this._listeners && delete this._listeners[a], this._captureListeners && delete this._captureListeners[a]) : this._listeners = this._captureListeners = null
    };
    b.dispatchEvent = function (a, d, b) {
        if ("string" == typeof a) {
            var c = this._listeners;
            if (!(d || c && c[a])) return !0;
            a = new createjs.Event(a, d, b)
        } else a.target && a.clone && (a = a.clone());
        try {
            a.target = this
        } catch (f) {}
        if (a.bubbles && this.parent) {
            b = this;
            for (d = [b]; b.parent;) d.push(b = b.parent);
            c = d.length;
            for (b = c - 1; 0 <= b && !a.propagationStopped; b--) d[b]._dispatchEvent(a, 1 + (0 == b));
            for (b = 1; c > b && !a.propagationStopped; b++) d[b]._dispatchEvent(a, 3)
        } else this._dispatchEvent(a, 2);
        return !a.defaultPrevented
    };
    b.hasEventListener = function (a) {
        var d = this._listeners,
            b = this._captureListeners;
        return !!(d && d[a] || b && b[a])
    };
    b.willTrigger = function (a) {
        for (var d = this; d;) {
            if (d.hasEventListener(a)) return !0;
            d = d.parent
        }
        return !1
    };
    b.toString = function () {
        return "[EventDispatcher]"
    };
    b._dispatchEvent = function (a, d) {
        var b, c = 1 == d ? this._captureListeners : this._listeners;
        if (a && c && (c = c[a.type]) && (b = c.length)) {
            try {
                a.currentTarget =
                    this
            } catch (k) {}
            try {
                a.eventPhase = d
            } catch (k) {}
            a.removed = !1;
            for (var c = c.slice(), f = 0; b > f && !a.immediatePropagationStopped; f++) {
                var g = c[f];
                g.handleEvent ? g.handleEvent(a) : g(a);
                a.removed && (this.off(a.type, g, 1 == d), a.removed = !1)
            }
        }
    };
    createjs.EventDispatcher = c
})();
this.createjs = this.createjs || {};
(function () {
    function c(b, a) {
        this.Event_constructor("progress");
        this.loaded = b;
        this.total = null == a ? 1 : a;
        this.progress = 0 == a ? 0 : this.loaded / this.total
    }
    createjs.extend(c, createjs.Event).clone = function () {
        return new createjs.ProgressEvent(this.loaded, this.total)
    };
    createjs.ProgressEvent = createjs.promote(c, "Event")
})(window);
(function () {
    function c(d, b) {
        function h(a) {
            if (h[a] !== u) return h[a];
            var d;
            if ("bug-string-char-index" == a) d = !1;
            else if ("json" == a) d = h("json-stringify") && h("json-parse");
            else {
                var c;
                if ("json-stringify" == a) {
                    d = b.stringify;
                    var e = "function" == typeof d && v;
                    if (e) {
                        (c = function () {
                            return 1
                        }).toJSON = c;
                        try {
                            e = "0" === d(0) && "0" === d(new f) && '""' == d(new g) && d(q) === u && d(u) === u && d() === u && "1" === d(c) && "[1]" == d([c]) && "[null]" == d([u]) && "null" == d(null) && "[null,null,null]" == d([u, q, null]) && '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}' ==
                                d({
                                    a: [c, !0, !1, null, "\x00\b\n\f\r\t"]
                                }) && "1" === d(null, c) && "[\n 1,\n 2\n]" == d([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == d(new m(-864E13)) && '"+275760-09-13T00:00:00.000Z"' == d(new m(864E13)) && '"-000001-01-01T00:00:00.000Z"' == d(new m(-621987552E5)) && '"1969-12-31T23:59:59.999Z"' == d(new m(-1))
                        } catch (y) {
                            e = !1
                        }
                    }
                    d = e
                }
                if ("json-parse" == a) {
                    d = b.parse;
                    if ("function" == typeof d) try {
                        if (0 === d("0") && !d(!1)) {
                            c = d('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}');
                            var p = 5 == c.a.length && 1 === c.a[0];
                            if (p) {
                                try {
                                    p = !d('"\t"')
                                } catch (y) {}
                                if (p) try {
                                    p =
                                        1 !== d("01")
                                } catch (y) {}
                                if (p) try {
                                    p = 1 !== d("1.")
                                } catch (y) {}
                            }
                        }
                    } catch (y) {
                        p = !1
                    }
                    d = p
                }
            }
            return h[a] = !!d
        }
        d || (d = e.Object());
        b || (b = e.Object());
        var f = d.Number || e.Number,
            g = d.String || e.String,
            k = d.Object || e.Object,
            m = d.Date || e.Date,
            C = d.SyntaxError || e.SyntaxError,
            H = d.TypeError || e.TypeError,
            O = d.Math || e.Math,
            F = d.JSON || e.JSON;
        "object" == typeof F && F && (b.stringify = F.stringify, b.parse = F.parse);
        var r, B, u, k = k.prototype,
            q = k.toString,
            v = new m(-0xc782b5b800cec);
        try {
            v = -109252 == v.getUTCFullYear() && 0 === v.getUTCMonth() && 1 === v.getUTCDate() &&
                10 == v.getUTCHours() && 37 == v.getUTCMinutes() && 6 == v.getUTCSeconds() && 708 == v.getUTCMilliseconds()
        } catch (t) {}
        if (!h("json")) {
            var D = h("bug-string-char-index");
            if (!v) var w = O.floor,
                P = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                E = function (a, d) {
                    return P[d] + 365 * (a - 1970) + w((a - 1969 + (d = +(1 < d))) / 4) - w((a - 1901 + d) / 100) + w((a - 1601 + d) / 400)
                };
            if ((r = k.hasOwnProperty) || (r = function (a) {
                    var d, b = {};
                    return (b.__proto__ = null, b.__proto__ = {
                        toString: 1
                    }, b).toString != q ? r = function (a) {
                        var d = this.__proto__;
                        a = a in (this.__proto__ = null, this);
                        return this.__proto__ = d, a
                    } : (d = b.constructor, r = function (a) {
                        var b = (this.constructor || d).prototype;
                        return a in this && !(a in b && this[a] === b[a])
                    }), b = null, r.call(this, a)
                }), B = function (d, b) {
                    var c, e, h, f = 0;
                    (c = function () {
                        this.valueOf = 0
                    }).prototype.valueOf = 0;
                    e = new c;
                    for (h in e) r.call(e, h) && f++;
                    return c = e = null, f ? B = 2 == f ? function (a, d) {
                        var b, c = {},
                            e = "[object Function]" == q.call(a);
                        for (b in a) e && "prototype" == b || r.call(c, b) || !(c[b] = 1) || !r.call(a, b) || d(b)
                    } : function (a, d) {
                        var b, c, e = "[object Function]" == q.call(a);
                        for (b in a) e &&
                            "prototype" == b || !r.call(a, b) || (c = "constructor" === b) || d(b);
                        (c || r.call(a, b = "constructor")) && d(b)
                    } : (e = "valueOf toString toLocaleString propertyIsEnumerable isPrototypeOf hasOwnProperty constructor".split(" "), B = function (d, b) {
                        var c, h;
                        h = "[object Function]" == q.call(d);
                        var f = !h && "function" != typeof d.constructor && a[typeof d.hasOwnProperty] && d.hasOwnProperty || r;
                        for (c in d) h && "prototype" == c || !f.call(d, c) || b(c);
                        for (h = e.length; c = e[--h]; f.call(d, c) && b(c));
                    }), B(d, b)
                }, !h("json-stringify")) {
                var Q = {
                        92: "\\\\",
                        34: '\\"',
                        8: "\\b",
                        12: "\\f",
                        10: "\\n",
                        13: "\\r",
                        9: "\\t"
                    },
                    x = function (a, d) {
                        return ("000000" + (d || 0)).slice(-a)
                    },
                    L = function (a) {
                        for (var d = '"', b = 0, c = a.length, e = !D || 10 < c, h = e && (D ? a.split("") : a); c > b; b++) {
                            var f = a.charCodeAt(b);
                            switch (f) {
                                case 8:
                                case 9:
                                case 10:
                                case 12:
                                case 13:
                                case 34:
                                case 92:
                                    d += Q[f];
                                    break;
                                default:
                                    d = 32 > f ? d + ("\\u00" + x(2, f.toString(16))) : d + (e ? h[b] : a.charAt(b))
                            }
                        }
                        return d + '"'
                    },
                    J = function (a, d, b, c, e, h, f) {
                        var g, p, k, l, t, A, y, I, m, n;
                        try {
                            g = d[a]
                        } catch (T) {}
                        if ("object" == typeof g && g)
                            if (p = q.call(g), "[object Date]" != p || r.call(g,
                                    "toJSON")) "function" == typeof g.toJSON && ("[object Number]" != p && "[object String]" != p && "[object Array]" != p || r.call(g, "toJSON")) && (g = g.toJSON(a));
                            else if (g > -1 / 0 && 1 / 0 > g) {
                            if (E) {
                                t = w(g / 864E5);
                                for (k = w(t / 365.2425) + 1970 - 1; E(k + 1, 0) <= t; k++);
                                for (l = w((t - E(k, 0)) / 30.42); E(k, l + 1) <= t; l++);
                                t = 1 + t - E(k, l);
                                A = (g % 864E5 + 864E5) % 864E5;
                                y = w(A / 36E5) % 24;
                                I = w(A / 6E4) % 60;
                                m = w(A / 1E3) % 60;
                                A %= 1E3
                            } else k = g.getUTCFullYear(), l = g.getUTCMonth(), t = g.getUTCDate(), y = g.getUTCHours(), I = g.getUTCMinutes(), m = g.getUTCSeconds(), A = g.getUTCMilliseconds();
                            g = (0 >= k || 1E4 <= k ? (0 > k ? "-" : "+") + x(6, 0 > k ? -k : k) : x(4, k)) + "-" + x(2, l + 1) + "-" + x(2, t) + "T" + x(2, y) + ":" + x(2, I) + ":" + x(2, m) + "." + x(3, A) + "Z"
                        } else g = null;
                        if (b && (g = b.call(d, a, g)), null === g) return "null";
                        if (p = q.call(g), "[object Boolean]" == p) return "" + g;
                        if ("[object Number]" == p) return g > -1 / 0 && 1 / 0 > g ? "" + g : "null";
                        if ("[object String]" == p) return L("" + g);
                        if ("object" == typeof g) {
                            for (a = f.length; a--;)
                                if (f[a] === g) throw H();
                            if (f.push(g), n = [], d = h, h += e, "[object Array]" == p) {
                                k = 0;
                                for (a = g.length; a > k; k++) p = J(k, g, b, c, e, h, f), n.push(p === u ? "null" :
                                    p);
                                p = n.length ? e ? "[\n" + h + n.join(",\n" + h) + "\n" + d + "]" : "[" + n.join(",") + "]" : "[]"
                            } else B(c || g, function (a) {
                                var d = J(a, g, b, c, e, h, f);
                                d !== u && n.push(L(a) + ":" + (e ? " " : "") + d)
                            }), p = n.length ? e ? "{\n" + h + n.join(",\n" + h) + "\n" + d + "}" : "{" + n.join(",") + "}" : "{}";
                            return f.pop(), p
                        }
                    };
                b.stringify = function (d, b, c) {
                    var e, h, f, g;
                    if (a[typeof b] && b)
                        if ("[object Function]" == (g = q.call(b))) h = b;
                        else if ("[object Array]" == g) {
                        f = {};
                        for (var k, l = 0, t = b.length; t > l; k = b[l++], g = q.call(k), ("[object String]" == g || "[object Number]" == g) && (f[k] = 1));
                    }
                    if (c)
                        if ("[object Number]" ==
                            (g = q.call(c))) {
                            if (0 < (c -= c % 1))
                                for (e = "", 10 < c && (c = 10); e.length < c; e += " ");
                        } else "[object String]" == g && (e = 10 >= c.length ? c : c.slice(0, 10));
                    return J("", (k = {}, k[""] = d, k), h, f, e, "", [])
                }
            }
            if (!h("json-parse")) {
                var l, G, R = g.fromCharCode,
                    S = {
                        92: "\\",
                        34: '"',
                        47: "/",
                        98: "\b",
                        116: "\t",
                        110: "\n",
                        102: "\f",
                        114: "\r"
                    },
                    n = function () {
                        throw l = G = null, C();
                    },
                    z = function () {
                        for (var a, d, b, c, e, h = G, f = h.length; f > l;) switch (e = h.charCodeAt(l)) {
                            case 9:
                            case 10:
                            case 13:
                            case 32:
                                l++;
                                break;
                            case 123:
                            case 125:
                            case 91:
                            case 93:
                            case 58:
                            case 44:
                                return a = D ?
                                    h.charAt(l) : h[l], l++, a;
                            case 34:
                                a = "@";
                                for (l++; f > l;)
                                    if (e = h.charCodeAt(l), 32 > e) n();
                                    else if (92 == e) switch (e = h.charCodeAt(++l)) {
                                    case 92:
                                    case 34:
                                    case 47:
                                    case 98:
                                    case 116:
                                    case 110:
                                    case 102:
                                    case 114:
                                        a += S[e];
                                        l++;
                                        break;
                                    case 117:
                                        d = ++l;
                                        for (b = l + 4; b > l; l++) e = h.charCodeAt(l), 48 <= e && 57 >= e || 97 <= e && 102 >= e || 65 <= e && 70 >= e || n();
                                        a += R("0x" + h.slice(d, l));
                                        break;
                                    default:
                                        n()
                                } else {
                                    if (34 == e) break;
                                    e = h.charCodeAt(l);
                                    for (d = l; 32 <= e && 92 != e && 34 != e;) e = h.charCodeAt(++l);
                                    a += h.slice(d, l)
                                }
                                if (34 == h.charCodeAt(l)) return l++, a;
                                n();
                            default:
                                if (d =
                                    l, 45 == e && (c = true, e = h.charCodeAt(++l)), 48 <= e && 57 >= e) {
                                    for (48 == e && (e = h.charCodeAt(l + 1), 48 <= e && 57 >= e) && n(); f > l && (e = h.charCodeAt(l), 48 <= e && 57 >= e); l++);
                                    if (46 == h.charCodeAt(l)) {
                                        for (b = ++l; f > b && (e = h.charCodeAt(b), 48 <= e && 57 >= e); b++);
                                        b == l && n();
                                        l = b
                                    }
                                    if (e = h.charCodeAt(l), 101 == e || 69 == e) {
                                        e = h.charCodeAt(++l);
                                        43 != e && 45 != e || l++;
                                        for (b = l; f > b && (e = h.charCodeAt(b), 48 <= e && 57 >= e); b++);
                                        b == l && n();
                                        l = b
                                    }
                                    return +h.slice(d, l)
                                }
                                if (c && n(), "true" == h.slice(l, l + 4)) return l += 4, !0;
                                if ("false" == h.slice(l, l + 5)) return l += 5, !1;
                                if ("null" == h.slice(l,
                                        l + 4)) return l += 4, null;
                                n()
                        }
                        return "$"
                    },
                    K = function (a) {
                        var d, b;
                        if ("$" == a && n(), "string" == typeof a) {
                            if ("@" == (D ? a.charAt(0) : a[0])) return a.slice(1);
                            if ("[" == a) {
                                for (d = []; a = z(), "]" != a; b || (b = true)) b && ("," == a ? (a = z(), "]" == a && n()) : n()), "," == a && n(), d.push(K(a));
                                return d
                            }
                            if ("{" == a) {
                                for (d = {}; a = z(), "}" != a; b || (b = true)) b && ("," == a ? (a = z(), "}" == a && n()) : n()), "," != a && "string" == typeof a && "@" == (D ? a.charAt(0) : a[0]) && ":" == z() || n(), d[a.slice(1)] = K(z());
                                return d
                            }
                            n()
                        }
                        return a
                    },
                    N = function (a, d, b) {
                        b = M(a, d, b);
                        b === u ? delete a[d] : a[d] = b
                    },
                    M = function (a, d, b) {
                        var c, e = a[d];
                        if ("object" == typeof e && e)
                            if ("[object Array]" == q.call(e))
                                for (c = e.length; c--;) N(e, c, b);
                            else B(e, function (a) {
                                N(e, a, b)
                            });
                        return b.call(a, d, e)
                    };
                b.parse = function (a, d) {
                    var b, c;
                    return l = 0, G = "" + a, b = K(z()), "$" != z() && n(), l = G = null, d && "[object Function]" == q.call(d) ? M((c = {}, c[""] = b, c), "", d) : b
                }
            }
        }
        return b.runInContext = c, b
    }
    var b = "function" == typeof define && define.amd,
        a = {
            "function": !0,
            object: !0
        },
        d = a[typeof exports] && exports && !exports.nodeType && exports,
        e = a[typeof window] && window || this,
        h = d && a[typeof module] && module && !module.nodeType && "object" == typeof global && global;
    if (!h || h.global !== h && h.window !== h && h.self !== h || (e = h), d && !b) c(e, d);
    else {
        var f = e.JSON,
            g = e.JSON3,
            k = !1,
            m = c(e, e.JSON3 = {
                noConflict: function () {
                    return k || (k = true, e.JSON = f, e.JSON3 = g, f = g = null), m
                }
            });
        e.JSON = {
            parse: m.parse,
            stringify: m.stringify
        }
    }
    b && define(function () {
        return m
    })
}).call(this);
(function () {
    var c = {
        appendToHead: function (b) {
            c.getHead().appendChild(b)
        },
        getHead: function () {
            return document.head || document.getElementsByTagName("head")[0]
        },
        getBody: function () {
            return document.body || document.getElementsByTagName("body")[0]
        }
    };
    createjs.DomUtils = c
})();
(function () {
    createjs.DataUtils = {
        parseXML: function (c, b) {
            var a = null;
            try {
                window.DOMParser && (a = (new DOMParser).parseFromString(c, b))
            } catch (d) {}
            if (!a) try {
                a = new ActiveXObject("Microsoft.XMLDOM"), a.async = !1, a.loadXML(c)
            } catch (d) {
                a = null
            }
            return a
        },
        parseJSON: function (c) {
            if (null == c) return null;
            try {
                return JSON.parse(c)
            } catch (b) {
                throw b;
            }
        }
    }
})();
this.createjs = this.createjs || {};
(function () {
    function c() {
        this.id = this.type = this.src = null;
        this.maintainOrder = !1;
        this.data = this.callback = null;
        this.method = createjs.LoadItem.GET;
        this.headers = this.values = null;
        this.withCredentials = !1;
        this.crossOrigin = this.mimeType = null;
        this.loadTimeout = a.LOAD_TIMEOUT_DEFAULT
    }
    var b = c.prototype = {},
        a = c;
    a.LOAD_TIMEOUT_DEFAULT = 8E3;
    a.create = function (d) {
        if ("string" == typeof d) {
            var b = new c;
            return b.src = d, b
        }
        if (d instanceof a) return d;
        if (d instanceof Object && d.src) return null == d.loadTimeout && (d.loadTimeout = a.LOAD_TIMEOUT_DEFAULT),
            d;
        throw Error("Type not recognized.");
    };
    b.set = function (a) {
        for (var d in a) this[d] = a[d];
        return this
    };
    createjs.LoadItem = a
})();
(function () {
    var c = {
        ABSOLUTE_PATT: /^(?:\w+:)?\/{2}/i,
        RELATIVE_PATT: /^[.\/]*?\//i,
        EXTENSION_PATT: /\/?[^\/]+\.(\w{1,5})$/i,
        parseURI: function (b) {
            var a = {
                absolute: !1,
                relative: !1
            };
            if (null == b) return a;
            var d = b.indexOf("?"); - 1 < d && (b = b.substr(0, d));
            var e;
            return c.ABSOLUTE_PATT.test(b) ? a.absolute = true : c.RELATIVE_PATT.test(b) && (a.relative = true), (e = b.match(c.EXTENSION_PATT)) && (a.extension = e[1].toLowerCase()), a
        },
        formatQueryString: function (b, a) {
            if (null == b) throw Error("You must specify data.");
            var d = [],
                c;
            for (c in b) d.push(c +
                "=" + escape(b[c]));
            return a && (d = d.concat(a)), d.join("&")
        },
        buildPath: function (b, a) {
            if (null == a) return b;
            var d = [],
                c = b.indexOf("?");
            if (-1 != c) var h = b.slice(c + 1),
                d = d.concat(h.split("&"));
            return -1 != c ? b.slice(0, c) + "?" + this.formatQueryString(a, d) : b + "?" + this.formatQueryString(a, d)
        },
        isCrossDomain: function (b) {
            var a = document.createElement("a");
            a.href = b.src;
            b = document.createElement("a");
            b.href = location.href;
            return "" != a.hostname && (a.port != b.port || a.protocol != b.protocol || a.hostname != b.hostname)
        },
        isLocal: function (b) {
            var a =
                document.createElement("a");
            return a.href = b.src, "" == a.hostname && "file:" == a.protocol
        },
        isBinary: function (b) {
            switch (b) {
                case createjs.AbstractLoader.IMAGE:
                case createjs.AbstractLoader.BINARY:
                    return !0;
                default:
                    return !1
            }
        },
        isImageTag: function (b) {
            return b instanceof HTMLImageElement
        },
        isAudioTag: function (b) {
            return window.HTMLAudioElement ? b instanceof HTMLAudioElement : !1
        },
        isVideoTag: function (b) {
            return window.HTMLVideoElement ? b instanceof HTMLVideoElement : !1
        },
        isText: function (b) {
            switch (b) {
                case createjs.AbstractLoader.TEXT:
                case createjs.AbstractLoader.JSON:
                case createjs.AbstractLoader.MANIFEST:
                case createjs.AbstractLoader.XML:
                case createjs.AbstractLoader.CSS:
                case createjs.AbstractLoader.SVG:
                case createjs.AbstractLoader.JAVASCRIPT:
                case createjs.AbstractLoader.SPRITESHEET:
                    return !0;
                default:
                    return !1
            }
        },
        getTypeByExtension: function (b) {
            if (null == b) return createjs.AbstractLoader.TEXT;
            switch (b.toLowerCase()) {
                case "jpeg":
                case "jpg":
                case "gif":
                case "png":
                case "webp":
                case "bmp":
                    return createjs.AbstractLoader.IMAGE;
                case "ogg":
                case "mp3":
                case "webm":
                    return createjs.AbstractLoader.SOUND;
                case "mp4":
                case "webm":
                case "ts":
                    return createjs.AbstractLoader.VIDEO;
                case "json":
                    return createjs.AbstractLoader.JSON;
                case "xml":
                    return createjs.AbstractLoader.XML;
                case "css":
                    return createjs.AbstractLoader.CSS;
                case "js":
                    return createjs.AbstractLoader.JAVASCRIPT;
                case "svg":
                    return createjs.AbstractLoader.SVG;
                default:
                    return createjs.AbstractLoader.TEXT
            }
        }
    };
    createjs.RequestUtils = c
})();
this.createjs = this.createjs || {};
(function () {
    function c(a, d, b) {
        this.EventDispatcher_constructor();
        this.canceled = this.loaded = !1;
        this.progress = 0;
        this.type = b;
        this.resultFormatter = null;
        this._item = a ? createjs.LoadItem.create(a) : null;
        this._preferXHR = d;
        this._tag = this._tagSrcAttribute = this._loadedItems = this._rawResult = this._result = null
    }
    var b = createjs.extend(c, createjs.EventDispatcher);
    c.POST = "POST";
    c.GET = "GET";
    c.BINARY = "binary";
    c.CSS = "css";
    c.IMAGE = "image";
    c.JAVASCRIPT = "javascript";
    c.JSON = "json";
    c.JSONP = "jsonp";
    c.MANIFEST = "manifest";
    c.SOUND =
        "sound";
    c.VIDEO = "video";
    c.SPRITESHEET = "spritesheet";
    c.SVG = "svg";
    c.TEXT = "text";
    c.XML = "xml";
    b.getItem = function () {
        return this._item
    };
    b.getResult = function (a) {
        return a ? this._rawResult : this._result
    };
    b.getTag = function () {
        return this._tag
    };
    b.setTag = function (a) {
        this._tag = a
    };
    b.load = function () {
        this._createRequest();
        this._request.on("complete", this, this);
        this._request.on("progress", this, this);
        this._request.on("loadStart", this, this);
        this._request.on("abort", this, this);
        this._request.on("timeout", this, this);
        this._request.on("error",
            this, this);
        var a = new createjs.Event("initialize");
        a.loader = this._request;
        this.dispatchEvent(a);
        this._request.load()
    };
    b.cancel = function () {
        this.canceled = true;
        this.destroy()
    };
    b.destroy = function () {
        this._request && (this._request.removeAllEventListeners(), this._request.destroy());
        this._loadItems = this._result = this._rawResult = this._item = this._request = null;
        this.removeAllEventListeners()
    };
    b.getLoadedItems = function () {
        return this._loadedItems
    };
    b._createRequest = function () {
        this._request = this._preferXHR ? new createjs.XHRRequest(this._item) :
            new createjs.TagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute)
    };
    b._createTag = function () {
        return null
    };
    b._sendLoadStart = function () {
        this._isCanceled() || this.dispatchEvent("loadstart")
    };
    b._sendProgress = function (a) {
        if (!this._isCanceled()) {
            var d = null;
            "number" == typeof a ? (this.progress = a, d = new createjs.ProgressEvent(this.progress)) : (d = a, this.progress = a.loaded / a.total, d.progress = this.progress, (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0));
            this.hasEventListener("progress") &&
                this.dispatchEvent(d)
        }
    };
    b._sendComplete = function () {
        if (!this._isCanceled()) {
            this.loaded = true;
            var a = new createjs.Event("complete");
            a.rawResult = this._rawResult;
            null != this._result && (a.result = this._result);
            this.dispatchEvent(a)
        }
    };
    b._sendError = function (a) {
        !this._isCanceled() && this.hasEventListener("error") && (null == a && (a = new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")), this.dispatchEvent(a))
    };
    b._isCanceled = function () {
        return null == window.createjs || this.canceled ? !0 : !1
    };
    b.resultFormatter = null;
    b.handleEvent = function (a) {
        switch (a.type) {
            case "complete":
                this._rawResult =
                    a.target._response;
                a = this.resultFormatter && this.resultFormatter(this);
                a instanceof Function ? a.call(this, createjs.proxy(this._resultFormatSuccess, this), createjs.proxy(this._resultFormatFailed, this)) : (this._result = a || this._rawResult, this._sendComplete());
                break;
            case "progress":
                this._sendProgress(a);
                break;
            case "error":
                this._sendError(a);
                break;
            case "loadstart":
                this._sendLoadStart();
                break;
            case "abort":
            case "timeout":
                this._isCanceled() || this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_" + a.type.toUpperCase() +
                    "_ERROR"))
        }
    };
    b._resultFormatSuccess = function (a) {
        this._result = a;
        this._sendComplete()
    };
    b._resultFormatFailed = function (a) {
        this._sendError(a)
    };
    b.buildPath = function (a, d) {
        return createjs.RequestUtils.buildPath(a, d)
    };
    b.toString = function () {
        return "[PreloadJS AbstractLoader]"
    };
    createjs.AbstractLoader = createjs.promote(c, "EventDispatcher")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a, d, b) {
        this.AbstractLoader_constructor(a, d, b);
        this.resultFormatter = this._formatResult;
        this._tagSrcAttribute = "src";
        this.on("initialize", this._updateXHR, this)
    }
    var b = createjs.extend(c, createjs.AbstractLoader);
    b.load = function () {
        this._tag || (this._tag = this._createTag(this._item.src));
        this._tag.preload = "auto";
        this._tag.load();
        this.AbstractLoader_load()
    };
    b._createTag = function () {};
    b._createRequest = function () {
        this._request = this._preferXHR ? new createjs.XHRRequest(this._item) : new createjs.MediaTagRequest(this._item,
            this._tag || this._createTag(), this._tagSrcAttribute)
    };
    b._updateXHR = function (a) {
        a.loader.setResponseType && a.loader.setResponseType("blob")
    };
    b._formatResult = function (a) {
        if (this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler), this._tag.onstalled = null, this._preferXHR) {
            var d = window.URL || window.webkitURL,
                b = a.getResult(!0);
            a.getTag().src = d.createObjectURL(b)
        }
        return a.getTag()
    };
    createjs.AbstractMediaLoader = createjs.promote(c, "AbstractLoader")
})();
this.createjs = this.createjs || {};
(function () {
    var c = function (a) {
            this._item = a
        },
        b = createjs.extend(c, createjs.EventDispatcher);
    b.load = function () {};
    b.destroy = function () {};
    b.cancel = function () {};
    createjs.AbstractRequest = createjs.promote(c, "EventDispatcher")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a, d, b) {
        this.AbstractRequest_constructor(a);
        this._tag = d;
        this._tagSrcAttribute = b;
        this._loadedHandler = createjs.proxy(this._handleTagComplete, this);
        this._addedToDOM = !1;
        this._startTagVisibility = null
    }
    var b = createjs.extend(c, createjs.AbstractRequest);
    b.load = function () {
        this._tag.onload = createjs.proxy(this._handleTagComplete, this);
        this._tag.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this);
        this._tag.onerror = createjs.proxy(this._handleError, this);
        var a = new createjs.Event("initialize");
        a.loader = this._tag;
        this.dispatchEvent(a);
        this._hideTag();
        this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout);
        this._tag[this._tagSrcAttribute] = this._item.src;
        null == this._tag.parentNode && (window.document.body.appendChild(this._tag), this._addedToDOM = true)
    };
    b.destroy = function () {
        this._clean();
        this._tag = null;
        this.AbstractRequest_destroy()
    };
    b._handleReadyStateChange = function () {
        clearTimeout(this._loadTimeout);
        var a = this._tag;
        "loaded" != a.readyState && "complete" != a.readyState ||
            this._handleTagComplete()
    };
    b._handleError = function () {
        this._clean();
        this.dispatchEvent("error")
    };
    b._handleTagComplete = function () {
        this._rawResult = this._tag;
        this._result = this.resultFormatter && this.resultFormatter(this) || this._rawResult;
        this._clean();
        this._showTag();
        this.dispatchEvent("complete")
    };
    b._handleTimeout = function () {
        this._clean();
        this.dispatchEvent(new createjs.Event("timeout"))
    };
    b._clean = function () {
        this._tag.onload = null;
        this._tag.onreadystatechange = null;
        this._tag.onerror = null;
        this._addedToDOM &&
            null != this._tag.parentNode && this._tag.parentNode.removeChild(this._tag);
        clearTimeout(this._loadTimeout)
    };
    b._hideTag = function () {
        this._startTagVisibility = this._tag.style.visibility;
        this._tag.style.visibility = "hidden"
    };
    b._showTag = function () {
        this._tag.style.visibility = this._startTagVisibility
    };
    b._handleStalled = function () {};
    createjs.TagRequest = createjs.promote(c, "AbstractRequest")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a, d, b) {
        this.AbstractRequest_constructor(a);
        this._tag = d;
        this._tagSrcAttribute = b;
        this._loadedHandler = createjs.proxy(this._handleTagComplete, this)
    }
    var b = createjs.extend(c, createjs.TagRequest);
    b.load = function () {
        var a = createjs.proxy(this._handleStalled, this);
        this._stalledCallback = a;
        var d = createjs.proxy(this._handleProgress, this);
        this._handleProgress = d;
        this._tag.addEventListener("stalled", a);
        this._tag.addEventListener("progress", d);
        this._tag.addEventListener && this._tag.addEventListener("canplaythrough",
            this._loadedHandler, !1);
        this.TagRequest_load()
    };
    b._handleReadyStateChange = function () {
        clearTimeout(this._loadTimeout);
        var a = this._tag;
        "loaded" != a.readyState && "complete" != a.readyState || this._handleTagComplete()
    };
    b._handleStalled = function () {};
    b._handleProgress = function (a) {
        !a || 0 < a.loaded && 0 == a.total || (a = new createjs.ProgressEvent(a.loaded, a.total), this.dispatchEvent(a))
    };
    b._clean = function () {
        this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler);
        this._tag.removeEventListener("stalled",
            this._stalledCallback);
        this._tag.removeEventListener("progress", this._progressCallback);
        this.TagRequest__clean()
    };
    createjs.MediaTagRequest = createjs.promote(c, "TagRequest")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a) {
        this.AbstractRequest_constructor(a);
        this._loadTimeout = this._request = null;
        this._xhrLevel = 1;
        this._rawResponse = this._response = null;
        this._canceled = !1;
        this._handleLoadStartProxy = createjs.proxy(this._handleLoadStart, this);
        this._handleProgressProxy = createjs.proxy(this._handleProgress, this);
        this._handleAbortProxy = createjs.proxy(this._handleAbort, this);
        this._handleErrorProxy = createjs.proxy(this._handleError, this);
        this._handleTimeoutProxy = createjs.proxy(this._handleTimeout, this);
        this._handleLoadProxy =
            createjs.proxy(this._handleLoad, this);
        this._handleReadyStateChangeProxy = createjs.proxy(this._handleReadyStateChange, this);
        !this._createXHR(a)
    }
    var b = createjs.extend(c, createjs.AbstractRequest);
    c.ACTIVEX_VERSIONS = "Msxml2.XMLHTTP.6.0 Msxml2.XMLHTTP.5.0 Msxml2.XMLHTTP.4.0 MSXML2.XMLHTTP.3.0 MSXML2.XMLHTTP Microsoft.XMLHTTP".split(" ");
    b.getResult = function (a) {
        return a && this._rawResponse ? this._rawResponse : this._response
    };
    b.cancel = function () {
        this.canceled = true;
        this._clean();
        this._request.abort()
    };
    b.load = function () {
        if (null ==
            this._request) return void this._handleError();
        null != this._request.addEventListener ? (this._request.addEventListener("loadstart", this._handleLoadStartProxy, !1), this._request.addEventListener("progress", this._handleProgressProxy, !1), this._request.addEventListener("abort", this._handleAbortProxy, !1), this._request.addEventListener("error", this._handleErrorProxy, !1), this._request.addEventListener("timeout", this._handleTimeoutProxy, !1), this._request.addEventListener("load", this._handleLoadProxy, !1), this._request.addEventListener("readystatechange",
            this._handleReadyStateChangeProxy, !1)) : (this._request.onloadstart = this._handleLoadStartProxy, this._request.onprogress = this._handleProgressProxy, this._request.onabort = this._handleAbortProxy, this._request.onerror = this._handleErrorProxy, this._request.ontimeout = this._handleTimeoutProxy, this._request.onload = this._handleLoadProxy, this._request.onreadystatechange = this._handleReadyStateChangeProxy);
        1 == this._xhrLevel && (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout));
        try {
            this._item.values && this._item.method != createjs.AbstractLoader.GET ? this._item.method == createjs.AbstractLoader.POST && this._request.send(createjs.RequestUtils.formatQueryString(this._item.values)) : this._request.send()
        } catch (a) {
            this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND", null, a))
        }
    };
    b.setResponseType = function (a) {
        "blob" === a && (a = window.URL ? "blob" : "arraybuffer", this._responseType = a);
        this._request.responseType = a
    };
    b.getAllResponseHeaders = function () {
        return this._request.getAllResponseHeaders instanceof
        Function ? this._request.getAllResponseHeaders() : null
    };
    b.getResponseHeader = function (a) {
        return this._request.getResponseHeader instanceof Function ? this._request.getResponseHeader(a) : null
    };
    b._handleProgress = function (a) {
        !a || 0 < a.loaded && 0 == a.total || (a = new createjs.ProgressEvent(a.loaded, a.total), this.dispatchEvent(a))
    };
    b._handleLoadStart = function () {
        clearTimeout(this._loadTimeout);
        this.dispatchEvent("loadstart")
    };
    b._handleAbort = function (a) {
        this._clean();
        this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED",
            null, a))
    };
    b._handleError = function (a) {
        this._clean();
        this.dispatchEvent(new createjs.ErrorEvent(a.message))
    };
    b._handleReadyStateChange = function () {
        4 == this._request.readyState && this._handleLoad()
    };
    b._handleLoad = function () {
        if (!this.loaded) {
            this.loaded = true;
            var a = this._checkError();
            if (a) return void this._handleError(a);
            if (this._response = this._getResponse(), "arraybuffer" === this._responseType) try {
                this._response = new Blob([this._response])
            } catch (d) {
                if (window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder ||
                    window.MozBlobBuilder || window.MSBlobBuilder, "TypeError" === d.name && window.BlobBuilder) a = new BlobBuilder, a.append(this._response), this._response = a.getBlob()
            }
            this._clean();
            this.dispatchEvent(new createjs.Event("complete"))
        }
    };
    b._handleTimeout = function (a) {
        this._clean();
        this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT", null, a))
    };
    b._checkError = function () {
        var a = parseInt(this._request.status);
        switch (a) {
            case 404:
            case 0:
                return Error(a)
        }
        return null
    };
    b._getResponse = function () {
        if (null != this._response) return this._response;
        if (null != this._request.response) return this._request.response;
        try {
            if (null != this._request.responseText) return this._request.responseText
        } catch (a) {}
        try {
            if (null != this._request.responseXML) return this._request.responseXML
        } catch (a) {}
        return null
    };
    b._createXHR = function (a) {
        var d = createjs.RequestUtils.isCrossDomain(a),
            b = {},
            c = null;
        if (window.XMLHttpRequest) c = new XMLHttpRequest, d && void 0 === c.withCredentials && window.XDomainRequest && (c = new XDomainRequest);
        else {
            for (var f = 0, g = s.ACTIVEX_VERSIONS.length; g > f; f++) {
                var k =
                    s.ACTIVEX_VERSIONS[f];
                try {
                    c = new ActiveXObject(k);
                    break
                } catch (C) {}
            }
            if (null == c) return !1
        }
        null == a.mimeType && createjs.RequestUtils.isText(a.type) && (a.mimeType = "text/plain; charset=utf-8");
        a.mimeType && c.overrideMimeType && c.overrideMimeType(a.mimeType);
        this._xhrLevel = "string" == typeof c.responseType ? 2 : 1;
        f = null;
        if (f = a.method == createjs.AbstractLoader.GET ? createjs.RequestUtils.buildPath(a.src, a.values) : a.src, c.open(a.method || createjs.AbstractLoader.GET, f, !0), d && c instanceof XMLHttpRequest && 1 == this._xhrLevel &&
            (b.Origin = location.origin), a.values && a.method == createjs.AbstractLoader.POST && (b["Content-Type"] = "application/x-www-form-urlencoded"), d || b["X-Requested-With"] || (b["X-Requested-With"] = "XMLHttpRequest"), a.headers)
            for (var m in a.headers) b[m] = a.headers[m];
        for (m in b) c.setRequestHeader(m, b[m]);
        return c instanceof XMLHttpRequest && void 0 !== a.withCredentials && (c.withCredentials = a.withCredentials), this._request = c, !0
    };
    b._clean = function () {
        clearTimeout(this._loadTimeout);
        null != this._request.removeEventListener ?
            (this._request.removeEventListener("loadstart", this._handleLoadStartProxy), this._request.removeEventListener("progress", this._handleProgressProxy), this._request.removeEventListener("abort", this._handleAbortProxy), this._request.removeEventListener("error", this._handleErrorProxy), this._request.removeEventListener("timeout", this._handleTimeoutProxy), this._request.removeEventListener("load", this._handleLoadProxy), this._request.removeEventListener("readystatechange", this._handleReadyStateChangeProxy)) :
            (this._request.onloadstart = null, this._request.onprogress = null, this._request.onabort = null, this._request.onerror = null, this._request.ontimeout = null, this._request.onload = null, this._request.onreadystatechange = null)
    };
    b.toString = function () {
        return "[PreloadJS XHRRequest]"
    };
    createjs.XHRRequest = createjs.promote(c, "AbstractRequest")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a, d, b) {
        this.AbstractLoader_constructor();
        this._plugins = [];
        this._typeCallbacks = {};
        this._extensionCallbacks = {};
        this.next = null;
        this.maintainScriptOrder = true;
        this.stopOnError = !1;
        this._maxConnections = 1;
        this._availableLoaders = [createjs.ImageLoader, createjs.JavaScriptLoader, createjs.CSSLoader, createjs.JSONLoader, createjs.JSONPLoader, createjs.SoundLoader, createjs.ManifestLoader, createjs.SpriteSheetLoader, createjs.XMLLoader, createjs.SVGLoader, createjs.BinaryLoader, createjs.VideoLoader,
            createjs.TextLoader
        ];
        this._defaultLoaderLength = this._availableLoaders.length;
        this.init(a, d, b)
    }
    var b = createjs.extend(c, createjs.AbstractLoader);
    b.init = function (a, d, b) {
        this._preferXHR = this.preferXHR = this.useXHR = true;
        this.setPreferXHR(a);
        this._paused = !1;
        this._basePath = d;
        this._crossOrigin = b;
        this._loadStartWasDispatched = !1;
        this._currentlyLoadingScript = null;
        this._currentLoads = [];
        this._loadQueue = [];
        this._loadQueueBackup = [];
        this._loadItemsById = {};
        this._loadItemsBySrc = {};
        this._loadedResults = {};
        this._loadedRawResults = {};
        this._numItemsLoaded = this._numItems = 0;
        this._scriptOrder = [];
        this._loadedScripts = [];
        this._lastProgress = 0 / 0
    };
    c.loadTimeout = 8E3;
    c.LOAD_TIMEOUT = 0;
    c.BINARY = createjs.AbstractLoader.BINARY;
    c.CSS = createjs.AbstractLoader.CSS;
    c.IMAGE = createjs.AbstractLoader.IMAGE;
    c.JAVASCRIPT = createjs.AbstractLoader.JAVASCRIPT;
    c.JSON = createjs.AbstractLoader.JSON;
    c.JSONP = createjs.AbstractLoader.JSONP;
    c.MANIFEST = createjs.AbstractLoader.MANIFEST;
    c.SOUND = createjs.AbstractLoader.SOUND;
    c.VIDEO = createjs.AbstractLoader.VIDEO;
    c.SVG =
        createjs.AbstractLoader.SVG;
    c.TEXT = createjs.AbstractLoader.TEXT;
    c.XML = createjs.AbstractLoader.XML;
    c.POST = createjs.AbstractLoader.POST;
    c.GET = createjs.AbstractLoader.GET;
    b.registerLoader = function (a) {
        if (!a || !a.canLoadItem) throw Error("loader is of an incorrect type.");
        if (-1 != this._availableLoaders.indexOf(a)) throw Error("loader already exists.");
        this._availableLoaders.unshift(a)
    };
    b.unregisterLoader = function (a) {
        a = this._availableLoaders.indexOf(a); - 1 != a && a < this._defaultLoaderLength - 1 && this._availableLoaders.splice(a,
            1)
    };
    b.setUseXHR = function (a) {
        return this.setPreferXHR(a)
    };
    b.setPreferXHR = function (a) {
        return this.preferXHR = 0 != a && null != window.XMLHttpRequest, this.preferXHR
    };
    b.removeAll = function () {
        this.remove()
    };
    b.remove = function (a) {
        var d = null;
        if (a && !Array.isArray(a)) d = [a];
        else if (a) d = a;
        else if (0 < arguments.length) return;
        var b = !1;
        if (d) {
            for (; d.length;) {
                for (var c = d.pop(), f = this.getResult(c), g = this._loadQueue.length - 1; 0 <= g; g--)
                    if (k = this._loadQueue[g].getItem(), k.id == c || k.src == c) {
                        this._loadQueue.splice(g, 1)[0].cancel();
                        break
                    }
                for (g = this._loadQueueBackup.length - 1; 0 <= g; g--)
                    if (k = this._loadQueueBackup[g].getItem(), k.id == c || k.src == c) {
                        this._loadQueueBackup.splice(g, 1)[0].cancel();
                        break
                    }
                if (f) this._disposeItem(this.getItem(c));
                else
                    for (var g = this._currentLoads.length - 1; 0 <= g; g--) {
                        var k = this._currentLoads[g].getItem();
                        if (k.id == c || k.src == c) {
                            this._currentLoads.splice(g, 1)[0].cancel();
                            b = true;
                            break
                        }
                    }
            }
            b && this._loadNext()
        } else {
            this.close();
            for (c in this._loadItemsById) this._disposeItem(this._loadItemsById[c]);
            this.init(this.preferXHR,
                this._basePath)
        }
    };
    b.reset = function () {
        this.close();
        for (var a in this._loadItemsById) this._disposeItem(this._loadItemsById[a]);
        a = [];
        for (var d = 0, b = this._loadQueueBackup.length; b > d; d++) a.push(this._loadQueueBackup[d].getItem());
        this.loadManifest(a, !1)
    };
    b.installPlugin = function (a) {
        if (null != a && null != a.getPreloadHandlers) {
            this._plugins.push(a);
            var d = a.getPreloadHandlers();
            if (d.scope = a, null != d.types) {
                a = 0;
                for (var b = d.types.length; b > a; a++) this._typeCallbacks[d.types[a]] = d
            }
            if (null != d.extensions)
                for (a = 0, b = d.extensions.length; b >
                    a; a++) this._extensionCallbacks[d.extensions[a]] = d
        }
    };
    b.setMaxConnections = function (a) {
        this._maxConnections = a;
        !this._paused && 0 < this._loadQueue.length && this._loadNext()
    };
    b.loadFile = function (a, d, b) {
        if (null == a) return a = new createjs.ErrorEvent("PRELOAD_NO_FILE"), void this._sendError(a);
        this._addItem(a, null, b);
        this.setPaused(!1 !== d ? !1 : !0)
    };
    b.loadManifest = function (a, d, b) {
        var e = null,
            f = null;
        if (Array.isArray(a)) {
            if (0 == a.length) return e = new createjs.ErrorEvent("PRELOAD_MANIFEST_EMPTY"), void this._sendError(e);
            e = a
        } else if ("string" == typeof a) e = [{
            src: a,
            type: c.MANIFEST
        }];
        else {
            if ("object" != typeof a) return e = new createjs.ErrorEvent("PRELOAD_MANIFEST_NULL"), void this._sendError(e);
            void 0 !== a.src ? (null == a.type ? a.type = c.MANIFEST : a.type != c.MANIFEST && (e = new createjs.ErrorEvent("PRELOAD_MANIFEST_TYPE"), this._sendError(e)), e = [a]) : void 0 !== a.manifest && (e = a.manifest, f = a.path)
        }
        a = 0;
        for (var g = e.length; g > a; a++) this._addItem(e[a], f, b);
        this.setPaused(!1 !== d ? !1 : !0)
    };
    b.load = function () {
        this.setPaused(!1)
    };
    b.getItem = function (a) {
        return this._loadItemsById[a] ||
            this._loadItemsBySrc[a]
    };
    b.getResult = function (a, d) {
        var b = this._loadItemsById[a] || this._loadItemsBySrc[a];
        if (null == b) return null;
        b = b.id;
        return d && this._loadedRawResults[b] ? this._loadedRawResults[b] : this._loadedResults[b]
    };
    b.getItems = function (a) {
        var d = [],
            b;
        for (b in this._loadItemsById) {
            var c = this._loadItemsById[b],
                f = this.getResult(b);
            !0 === a && null == f || d.push({
                item: c,
                result: f,
                rawResult: this.getResult(b, !0)
            })
        }
        return d
    };
    b.setPaused = function (a) {
        (this._paused = a) || this._loadNext()
    };
    b.close = function () {
        for (; this._currentLoads.length;) this._currentLoads.pop().cancel();
        this._scriptOrder.length = 0;
        this._loadedScripts.length = 0;
        this.loadStartWasDispatched = !1;
        this._itemCount = 0;
        this._lastProgress = 0 / 0
    };
    b._addItem = function (a, d, b) {
        a = this._createLoadItem(a, d, b);
        null != a && (d = this._createLoader(a), null != d && ("plugins" in d && (d.plugins = this._plugins), a._loader = d, this._loadQueue.push(d), this._loadQueueBackup.push(d), this._numItems++, this._updateProgress(), (this.maintainScriptOrder && a.type == createjs.LoadQueue.JAVASCRIPT || !0 === a.maintainOrder) && (this._scriptOrder.push(a), this._loadedScripts.push(null))))
    };
    b._createLoadItem = function (a, d, b) {
        a = createjs.LoadItem.create(a);
        if (null == a) return null;
        var c = "";
        b = b || this._basePath;
        if (a.src instanceof Object) {
            if (!a.type) return null;
            if (d) {
                var c = d,
                    e = createjs.RequestUtils.parseURI(d);
                null == b || e.absolute || e.relative || (c = b + c)
            } else null != b && (c = b)
        } else {
            e = createjs.RequestUtils.parseURI(a.src);
            e.extension && (a.ext = e.extension);
            null == a.type && (a.type = createjs.RequestUtils.getTypeByExtension(a.ext));
            var g = a.src;
            e.absolute || e.relative || (d ? (c = d, e = createjs.RequestUtils.parseURI(d),
                g = d + g, null == b || e.absolute || e.relative || (c = b + c)) : null != b && (c = b));
            a.src = c + a.src
        }
        a.path = c;
        void 0 !== a.id && null !== a.id && "" !== a.id || (a.id = g);
        if (d = this._typeCallbacks[a.type] || this._extensionCallbacks[a.ext]) {
            d = d.callback.call(d.scope, a, this);
            if (!1 === d) return null;
            !0 === d || null != d && (a._loader = d);
            e = createjs.RequestUtils.parseURI(a.src);
            null != e.extension && (a.ext = e.extension)
        }
        return this._loadItemsById[a.id] = a, this._loadItemsBySrc[a.src] = a, null == a.crossOrigin && (a.crossOrigin = this._crossOrigin), a
    };
    b._createLoader =
        function (a) {
            if (null != a._loader) return a._loader;
            for (var d = this.preferXHR, b = 0; b < this._availableLoaders.length; b++) {
                var c = this._availableLoaders[b];
                if (c && c.canLoadItem(a)) return new c(a, d)
            }
            return null
        };
    b._loadNext = function () {
        if (!this._paused) {
            this._loadStartWasDispatched || (this._sendLoadStart(), this._loadStartWasDispatched = true);
            this._numItems == this._numItemsLoaded ? (this.loaded = true, this._sendComplete(), this.next && this.next.load && this.next.load()) : this.loaded = !1;
            for (var a = 0; a < this._loadQueue.length && !(this._currentLoads.length >=
                    this._maxConnections); a++) {
                var d = this._loadQueue[a];
                this._canStartLoad(d) && (this._loadQueue.splice(a, 1), a--, this._loadItem(d))
            }
        }
    };
    b._loadItem = function (a) {
        a.on("fileload", this._handleFileLoad, this);
        a.on("progress", this._handleProgress, this);
        a.on("complete", this._handleFileComplete, this);
        a.on("error", this._handleError, this);
        a.on("fileerror", this._handleFileError, this);
        this._currentLoads.push(a);
        this._sendFileStart(a.getItem());
        a.load()
    };
    b._handleFileLoad = function (a) {
        a.target = null;
        this.dispatchEvent(a)
    };
    b._handleFileError = function (a) {
        a = new createjs.ErrorEvent("FILE_LOAD_ERROR", null, a.item);
        this._sendError(a)
    };
    b._handleError = function (a) {
        a = a.target;
        this._numItemsLoaded++;
        this._finishOrderedItem(a, !0);
        this._updateProgress();
        var d = new createjs.ErrorEvent("FILE_LOAD_ERROR", null, a.getItem());
        this._sendError(d);
        this.stopOnError ? this.setPaused(!0) : (this._removeLoadItem(a), this._cleanLoadItem(a), this._loadNext())
    };
    b._handleFileComplete = function (a) {
        a = a.target;
        var d = a.getItem(),
            b = a.getResult();
        this._loadedResults[d.id] =
            b;
        var c = a.getResult(!0);
        null != c && c !== b && (this._loadedRawResults[d.id] = c);
        this._saveLoadedItems(a);
        this._removeLoadItem(a);
        this._finishOrderedItem(a) || this._processFinishedLoad(d, a);
        this._cleanLoadItem(a)
    };
    b._saveLoadedItems = function (a) {
        a = a.getLoadedItems();
        if (null !== a)
            for (var d = 0; d < a.length; d++) {
                var b = a[d].item;
                this._loadItemsBySrc[b.src] = b;
                this._loadItemsById[b.id] = b;
                this._loadedResults[b.id] = a[d].result;
                this._loadedRawResults[b.id] = a[d].rawResult
            }
    };
    b._finishOrderedItem = function (a, d) {
        var b = a.getItem();
        if (this.maintainScriptOrder && b.type == createjs.LoadQueue.JAVASCRIPT || b.maintainOrder) {
            a instanceof createjs.JavaScriptLoader && (this._currentlyLoadingScript = !1);
            var c = createjs.indexOf(this._scriptOrder, b);
            return -1 == c ? !1 : (this._loadedScripts[c] = true === d ? !0 : b, this._checkScriptLoadOrder(), !0)
        }
        return !1
    };
    b._checkScriptLoadOrder = function () {
        for (var a = this._loadedScripts.length, d = 0; a > d; d++) {
            var b = this._loadedScripts[d];
            if (null === b) break;
            if (!0 !== b) {
                var c = this._loadedResults[b.id];
                b.type == createjs.LoadQueue.JAVASCRIPT &&
                    createjs.DomUtils.appendToHead(c);
                this._processFinishedLoad(b, b._loader);
                this._loadedScripts[d] = true
            }
        }
    };
    b._processFinishedLoad = function (a, d) {
        if (this._numItemsLoaded++, !this.maintainScriptOrder && a.type == createjs.LoadQueue.JAVASCRIPT) {
            var b = d.getTag();
            createjs.DomUtils.appendToHead(b)
        }
        this._updateProgress();
        this._sendFileComplete(a, d);
        this._loadNext()
    };
    b._canStartLoad = function (a) {
        if (!this.maintainScriptOrder || a.preferXHR) return !0;
        a = a.getItem();
        if (a.type != createjs.LoadQueue.JAVASCRIPT) return !0;
        if (this._currentlyLoadingScript) return !1;
        a = this._scriptOrder.indexOf(a);
        for (var d = 0; a > d;) {
            if (null == this._loadedScripts[d]) return !1;
            d++
        }
        return this._currentlyLoadingScript = true, !0
    };
    b._removeLoadItem = function (a) {
        for (var d = this._currentLoads.length, b = 0; d > b; b++)
            if (this._currentLoads[b] == a) {
                this._currentLoads.splice(b, 1);
                break
            }
    };
    b._cleanLoadItem = function (a) {
        (a = a.getItem()) && delete a._loader
    };
    b._handleProgress = function (a) {
        a = a.target;
        this._sendFileProgress(a.getItem(), a.progress);
        this._updateProgress()
    };
    b._updateProgress = function () {
        var a = this._numItemsLoaded /
            this._numItems,
            d = this._numItems - this._numItemsLoaded;
        if (0 < d) {
            for (var b = 0, c = 0, f = this._currentLoads.length; f > c; c++) b += this._currentLoads[c].progress;
            a += b / d * (d / this._numItems)
        }
        this._lastProgress != a && (this._sendProgress(a), this._lastProgress = a)
    };
    b._disposeItem = function (a) {
        delete this._loadedResults[a.id];
        delete this._loadedRawResults[a.id];
        delete this._loadItemsById[a.id];
        delete this._loadItemsBySrc[a.src]
    };
    b._sendFileProgress = function (a, d) {
        if (!this._isCanceled() && !this._paused && this.hasEventListener("fileprogress")) {
            var b =
                new createjs.Event("fileprogress");
            b.progress = d;
            b.loaded = d;
            b.total = 1;
            b.item = a;
            this.dispatchEvent(b)
        }
    };
    b._sendFileComplete = function (a, d) {
        if (!this._isCanceled() && !this._paused) {
            var b = new createjs.Event("fileload");
            b.loader = d;
            b.item = a;
            b.result = this._loadedResults[a.id];
            b.rawResult = this._loadedRawResults[a.id];
            a.completeHandler && a.completeHandler(b);
            this.hasEventListener("fileload") && this.dispatchEvent(b)
        }
    };
    b._sendFileStart = function (a) {
        var d = new createjs.Event("filestart");
        d.item = a;
        this.hasEventListener("filestart") &&
            this.dispatchEvent(d)
    };
    b.toString = function () {
        return "[PreloadJS LoadQueue]"
    };
    createjs.LoadQueue = createjs.promote(c, "AbstractLoader")
})();
this.createjs = this.createjs || {};
(function () {
    function c(b) {
        this.AbstractLoader_constructor(b, !0, createjs.AbstractLoader.TEXT)
    }(createjs.extend(c, createjs.AbstractLoader), c).canLoadItem = function (b) {
        return b.type == createjs.AbstractLoader.TEXT
    };
    createjs.TextLoader = createjs.promote(c, "AbstractLoader")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a) {
        this.AbstractLoader_constructor(a, !0, createjs.AbstractLoader.BINARY);
        this.on("initialize", this._updateXHR, this)
    }
    var b = createjs.extend(c, createjs.AbstractLoader);
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.BINARY
    };
    b._updateXHR = function (a) {
        a.loader.setResponseType("arraybuffer")
    };
    createjs.BinaryLoader = createjs.promote(c, "AbstractLoader")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a, d) {
        this.AbstractLoader_constructor(a, d, createjs.AbstractLoader.CSS);
        this.resultFormatter = this._formatResult;
        this._tagSrcAttribute = "href";
        this._tag = document.createElement(d ? "style" : "link");
        this._tag.rel = "stylesheet";
        this._tag.type = "text/css"
    }
    var b = createjs.extend(c, createjs.AbstractLoader);
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.CSS
    };
    b._formatResult = function (a) {
        if (this._preferXHR) {
            var d = a.getTag();
            d.styleSheet ? d.styleSheet.cssText = a.getResult(!0) : (a =
                document.createTextNode(a.getResult(!0)), d.appendChild(a))
        } else d = this._tag;
        return createjs.DomUtils.appendToHead(d), d
    };
    createjs.CSSLoader = createjs.promote(c, "AbstractLoader")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a, d) {
        this.AbstractLoader_constructor(a, d, createjs.AbstractLoader.IMAGE);
        this.resultFormatter = this._formatResult;
        this._tagSrcAttribute = "src";
        createjs.RequestUtils.isImageTag(a) ? this._tag = a : createjs.RequestUtils.isImageTag(a.src) ? this._tag = a.src : createjs.RequestUtils.isImageTag(a.tag) && (this._tag = a.tag);
        null != this._tag ? this._preferXHR = !1 : this._tag = document.createElement("img");
        this.on("initialize", this._updateXHR, this)
    }
    var b = createjs.extend(c, createjs.AbstractLoader);
    c.canLoadItem =
        function (a) {
            return a.type == createjs.AbstractLoader.IMAGE
        };
    b.load = function () {
        if ("" != this._tag.src && this._tag.complete) return void this._sendComplete();
        var a = this._item.crossOrigin;
        1 == a && (a = "Anonymous");
        null == a || createjs.RequestUtils.isLocal(this._item.src) || (this._tag.crossOrigin = a);
        this.AbstractLoader_load()
    };
    b._updateXHR = function (a) {
        a.loader.mimeType = "text/plain; charset=x-user-defined-binary";
        a.loader.setResponseType && a.loader.setResponseType("blob")
    };
    b._formatResult = function () {
        return this._formatImage
    };
    b._formatImage = function (a, d) {
        var b = this._tag,
            c = window.URL || window.webkitURL;
        this._preferXHR && (c ? (c = c.createObjectURL(this.getResult(!0)), b.src = c, b.addEventListener("load", this._cleanUpURL, !1), b.addEventListener("error", this._cleanUpURL, !1)) : b.src = this._item.src);
        b.complete ? a(b) : (b.onload = createjs.proxy(function () {
            a(this._tag)
        }, this), b.onerror = createjs.proxy(function () {
            d(_this._tag)
        }, this))
    };
    b._cleanUpURL = function (a) {
        (window.URL || window.webkitURL).revokeObjectURL(a.target.src)
    };
    createjs.ImageLoader =
        createjs.promote(c, "AbstractLoader")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a, d) {
        this.AbstractLoader_constructor(a, d, createjs.AbstractLoader.JAVASCRIPT);
        this.resultFormatter = this._formatResult;
        this._tagSrcAttribute = "src";
        this.setTag(document.createElement("script"))
    }
    var b = createjs.extend(c, createjs.AbstractLoader);
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.JAVASCRIPT
    };
    b._formatResult = function (a) {
        var d = a.getTag();
        return this._preferXHR && (d.text = a.getResult(!0)), d
    };
    createjs.JavaScriptLoader = createjs.promote(c, "AbstractLoader")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a) {
        this.AbstractLoader_constructor(a, !0, createjs.AbstractLoader.JSON);
        this.resultFormatter = this._formatResult
    }
    var b = createjs.extend(c, createjs.AbstractLoader);
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.JSON
    };
    b._formatResult = function (a) {
        var d = null;
        try {
            d = createjs.DataUtils.parseJSON(a.getResult(!0))
        } catch (e) {
            return a = new createjs.ErrorEvent("JSON_FORMAT", null, e), this._sendError(a), e
        }
        return d
    };
    createjs.JSONLoader = createjs.promote(c, "AbstractLoader")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a) {
        this.AbstractLoader_constructor(a, !1, createjs.AbstractLoader.JSONP);
        this.setTag(document.createElement("script"));
        this.getTag().type = "text/javascript"
    }
    var b = createjs.extend(c, createjs.AbstractLoader);
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.JSONP
    };
    b.cancel = function () {
        this.AbstractLoader_cancel();
        this._dispose()
    };
    b.load = function () {
        if (null == this._item.callback) throw Error("callback is required for loading JSONP requests.");
        if (null != window[this._item.callback]) throw Error("JSONP callback '" +
            this._item.callback + "' already exists on window. You need to specify a different callback or re-name the current one.");
        window[this._item.callback] = createjs.proxy(this._handleLoad, this);
        window.document.body.appendChild(this._tag);
        this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout);
        this._tag.src = this._item.src
    };
    b._handleLoad = function (a) {
        this._result = this._rawResult = a;
        this._sendComplete();
        this._dispose()
    };
    b._handleTimeout = function () {
        this._dispose();
        this.dispatchEvent(new createjs.ErrorEvent("timeout"))
    };
    b._dispose = function () {
        window.document.body.removeChild(this._tag);
        delete window[this._item.callback];
        clearTimeout(this._loadTimeout)
    };
    createjs.JSONPLoader = createjs.promote(c, "AbstractLoader")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a) {
        this.AbstractLoader_constructor(a, null, createjs.AbstractLoader.MANIFEST);
        this._manifestQueue = this.plugins = null
    }
    var b = createjs.extend(c, createjs.AbstractLoader);
    c.MANIFEST_PROGRESS = .25;
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.MANIFEST
    };
    b.load = function () {
        this.AbstractLoader_load()
    };
    b._createRequest = function () {
        this._request = null != this._item.callback ? new createjs.JSONPLoader(this._item) : new createjs.JSONLoader(this._item)
    };
    b.handleEvent = function (a) {
        switch (a.type) {
            case "complete":
                return this._rawResult =
                    a.target.getResult(!0), this._result = a.target.getResult(), this._sendProgress(c.MANIFEST_PROGRESS), void this._loadManifest(this._result);
            case "progress":
                return a.loaded *= c.MANIFEST_PROGRESS, this.progress = a.loaded / a.total, (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0), void this._sendProgress(a)
        }
        this.AbstractLoader_handleEvent(a)
    };
    b.destroy = function () {
        this.AbstractLoader_destroy();
        this._manifestQueue.close()
    };
    b._loadManifest = function (a) {
        if (a && a.manifest) {
            var d = this._manifestQueue = new createjs.LoadQueue;
            d.on("fileload", this._handleManifestFileLoad, this);
            d.on("progress", this._handleManifestProgress, this);
            d.on("complete", this._handleManifestComplete, this, !0);
            d.on("error", this._handleManifestError, this, !0);
            for (var b = 0, c = this.plugins.length; c > b; b++) d.installPlugin(this.plugins[b]);
            d.loadManifest(a)
        } else this._sendComplete()
    };
    b._handleManifestFileLoad = function (a) {
        a.target = null;
        this.dispatchEvent(a)
    };
    b._handleManifestComplete = function () {
        this._loadedItems = this._manifestQueue.getItems(!0);
        this._sendComplete()
    };
    b._handleManifestProgress = function (a) {
        this.progress = a.progress * (1 - c.MANIFEST_PROGRESS) + c.MANIFEST_PROGRESS;
        this._sendProgress(this.progress)
    };
    b._handleManifestError = function (a) {
        var d = new createjs.Event("fileerror");
        d.item = a.data;
        this.dispatchEvent(d)
    };
    createjs.ManifestLoader = createjs.promote(c, "AbstractLoader")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a, d) {
        this.AbstractMediaLoader_constructor(a, d, createjs.AbstractLoader.SOUND);
        createjs.RequestUtils.isAudioTag(a) ? this._tag = a : createjs.RequestUtils.isAudioTag(a.src) ? this._tag = a : createjs.RequestUtils.isAudioTag(a.tag) && (this._tag = createjs.RequestUtils.isAudioTag(a) ? a : a.src);
        null != this._tag && (this._preferXHR = !1)
    }
    var b = createjs.extend(c, createjs.AbstractMediaLoader);
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.SOUND
    };
    b._createTag = function (a) {
        var d = document.createElement("audio");
        return d.autoplay = !1, d.preload = "none", d.src = a, d
    };
    createjs.SoundLoader = createjs.promote(c, "AbstractMediaLoader")
})();
this.createjs = this.createjs || {};
(function () {
    function c(b, a) {
        this.AbstractMediaLoader_constructor(b, a, createjs.AbstractLoader.VIDEO);
        createjs.RequestUtils.isVideoTag(b) || createjs.RequestUtils.isVideoTag(b.src) ? (this.setTag(createjs.RequestUtils.isVideoTag(b) ? b : b.src), this._preferXHR = !1) : this.setTag(this._createTag())
    }
    createjs.extend(c, createjs.AbstractMediaLoader)._createTag = function () {
        return document.createElement("video")
    };
    c.canLoadItem = function (b) {
        return b.type == createjs.AbstractLoader.VIDEO
    };
    createjs.VideoLoader = createjs.promote(c,
        "AbstractMediaLoader")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a, d) {
        this.AbstractLoader_constructor(a, d, createjs.AbstractLoader.SPRITESHEET);
        this._manifestQueue = null
    }
    var b = createjs.extend(c, createjs.AbstractLoader);
    c.SPRITESHEET_PROGRESS = .25;
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.SPRITESHEET
    };
    b.destroy = function () {
        this.AbstractLoader_destroy;
        this._manifestQueue.close()
    };
    b._createRequest = function () {
        this._request = null != this._item.callback ? new createjs.JSONPLoader(this._item) : new createjs.JSONLoader(this._item)
    };
    b.handleEvent =
        function (a) {
            switch (a.type) {
                case "complete":
                    return this._rawResult = a.target.getResult(!0), this._result = a.target.getResult(), this._sendProgress(c.SPRITESHEET_PROGRESS), void this._loadManifest(this._result);
                case "progress":
                    return a.loaded *= c.SPRITESHEET_PROGRESS, this.progress = a.loaded / a.total, (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0), void this._sendProgress(a)
            }
            this.AbstractLoader_handleEvent(a)
        };
    b._loadManifest = function (a) {
        if (a && a.images) {
            var d = this._manifestQueue = new createjs.LoadQueue(this._preferXHR,
                this._item.path, this._item.crossOrigin);
            d.on("complete", this._handleManifestComplete, this, !0);
            d.on("fileload", this._handleManifestFileLoad, this);
            d.on("progress", this._handleManifestProgress, this);
            d.on("error", this._handleManifestError, this, !0);
            d.loadManifest(a.images)
        }
    };
    b._handleManifestFileLoad = function (a) {
        var d = a.result;
        if (null != d) {
            var b = this.getResult().images;
            a = b.indexOf(a.item.src);
            b[a] = d
        }
    };
    b._handleManifestComplete = function () {
        this._result = new createjs.SpriteSheet(this._result);
        this._loadedItems =
            this._manifestQueue.getItems(!0);
        this._sendComplete()
    };
    b._handleManifestProgress = function (a) {
        this.progress = a.progress * (1 - c.SPRITESHEET_PROGRESS) + c.SPRITESHEET_PROGRESS;
        this._sendProgress(this.progress)
    };
    b._handleManifestError = function (a) {
        var d = new createjs.Event("fileerror");
        d.item = a.data;
        this.dispatchEvent(d)
    };
    createjs.SpriteSheetLoader = createjs.promote(c, "AbstractLoader")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a, d) {
        this.AbstractLoader_constructor(a, d, createjs.AbstractLoader.SVG);
        this.resultFormatter = this._formatResult;
        this._tagSrcAttribute = "data";
        d ? this.setTag(document.createElement("svg")) : (this.setTag(document.createElement("object")), this.getTag().type = "image/svg+xml")
    }
    var b = createjs.extend(c, createjs.AbstractLoader);
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.SVG
    };
    b._formatResult = function (a) {
        var d = createjs.DataUtils.parseXML(a.getResult(!0), "text/xml");
        a =
            a.getTag();
        return !this._preferXHR && document.body.contains(a) && document.body.removeChild(a), null != d.documentElement ? (a.appendChild(d.documentElement), a.style.visibility = "visible", a) : d
    };
    createjs.SVGLoader = createjs.promote(c, "AbstractLoader")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a) {
        this.AbstractLoader_constructor(a, !0, createjs.AbstractLoader.XML);
        this.resultFormatter = this._formatResult
    }
    var b = createjs.extend(c, createjs.AbstractLoader);
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.XML
    };
    b._formatResult = function (a) {
        return createjs.DataUtils.parseXML(a.getResult(!0), "text/xml")
    };
    createjs.XMLLoader = createjs.promote(c, "AbstractLoader")
})();
/*
 @license SoundJS
 Visit http://createjs.com/ for documentation, updates and examples.

 Copyright (c) 2011-2015 gskinner.com, inc.

 Distributed under the terms of the MIT license.
 http://www.opensource.org/licenses/mit-license.html

 This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs = this.createjs || {};
(function () {
    var c = createjs.SoundJS = createjs.SoundJS || {};
    c.version = "0.6.2";
    c.buildDate = "Thu, 26 Nov 2015 20:44:31 GMT"
})();
this.createjs = this.createjs || {};
createjs.extend = function (c, b) {
    function a() {
        this.constructor = c
    }
    return a.prototype = b.prototype, c.prototype = new a
};
this.createjs = this.createjs || {};
createjs.promote = function (c, b) {
    var a = c.prototype,
        d = Object.getPrototypeOf && Object.getPrototypeOf(a) || a.__proto__;
    if (d) {
        a[(b += "_") + "constructor"] = d.constructor;
        for (var e in d) a.hasOwnProperty(e) && "function" == typeof d[e] && (a[b + e] = d[e])
    }
    return c
};
this.createjs = this.createjs || {};
createjs.indexOf = function (c, b) {
    for (var a = 0, d = c.length; d > a; a++)
        if (b === c[a]) return a;
    return -1
};
this.createjs = this.createjs || {};
(function () {
    createjs.proxy = function (c, b) {
        var a = Array.prototype.slice.call(arguments, 2);
        return function () {
            return c.apply(b, Array.prototype.slice.call(arguments, 0).concat(a))
        }
    }
})();
this.createjs = this.createjs || {};
(function () {
    function c() {
        throw "BrowserDetect cannot be instantiated";
    }
    var b = c.agent = window.navigator.userAgent;
    c.isWindowPhone = -1 < b.indexOf("IEMobile") || -1 < b.indexOf("Windows Phone");
    c.isFirefox = -1 < b.indexOf("Firefox");
    c.isOpera = null != window.opera;
    c.isChrome = -1 < b.indexOf("Chrome");
    c.isIOS = (-1 < b.indexOf("iPod") || -1 < b.indexOf("iPhone") || -1 < b.indexOf("iPad")) && !c.isWindowPhone;
    c.isAndroid = -1 < b.indexOf("Android") && !c.isWindowPhone;
    c.isBlackberry = -1 < b.indexOf("Blackberry");
    createjs.BrowserDetect = c
})();
this.createjs = this.createjs || {};
(function () {
    function c() {
        this._captureListeners = this._listeners = null
    }
    var b = c.prototype;
    c.initialize = function (a) {
        a.addEventListener = b.addEventListener;
        a.on = b.on;
        a.removeEventListener = a.off = b.removeEventListener;
        a.removeAllEventListeners = b.removeAllEventListeners;
        a.hasEventListener = b.hasEventListener;
        a.dispatchEvent = b.dispatchEvent;
        a._dispatchEvent = b._dispatchEvent;
        a.willTrigger = b.willTrigger
    };
    b.addEventListener = function (a, d, b) {
        var c;
        c = b ? this._captureListeners = this._captureListeners || {} : this._listeners =
            this._listeners || {};
        var e = c[a];
        return e && this.removeEventListener(a, d, b), e = c[a], e ? e.push(d) : c[a] = [d], d
    };
    b.on = function (a, d, b, c, f, g) {
        return d.handleEvent && (b = b || d, d = d.handleEvent), b = b || this, this.addEventListener(a, function (a) {
            d.call(b, a, f);
            c && a.remove()
        }, g)
    };
    b.removeEventListener = function (a, d, b) {
        if (b = b ? this._captureListeners : this._listeners) {
            var c = b[a];
            if (c)
                for (var e = 0, g = c.length; g > e; e++)
                    if (c[e] == d) {
                        1 == g ? delete b[a] : c.splice(e, 1);
                        break
                    }
        }
    };
    b.off = b.removeEventListener;
    b.removeAllEventListeners = function (a) {
        a ?
            (this._listeners && delete this._listeners[a], this._captureListeners && delete this._captureListeners[a]) : this._listeners = this._captureListeners = null
    };
    b.dispatchEvent = function (a, d, b) {
        if ("string" == typeof a) {
            var c = this._listeners;
            if (!(d || c && c[a])) return !0;
            a = new createjs.Event(a, d, b)
        } else a.target && a.clone && (a = a.clone());
        try {
            a.target = this
        } catch (f) {}
        if (a.bubbles && this.parent) {
            b = this;
            for (d = [b]; b.parent;) d.push(b = b.parent);
            c = d.length;
            for (b = c - 1; 0 <= b && !a.propagationStopped; b--) d[b]._dispatchEvent(a, 1 + (0 == b));
            for (b = 1; c > b && !a.propagationStopped; b++) d[b]._dispatchEvent(a, 3)
        } else this._dispatchEvent(a, 2);
        return !a.defaultPrevented
    };
    b.hasEventListener = function (a) {
        var d = this._listeners,
            b = this._captureListeners;
        return !!(d && d[a] || b && b[a])
    };
    b.willTrigger = function (a) {
        for (var d = this; d;) {
            if (d.hasEventListener(a)) return !0;
            d = d.parent
        }
        return !1
    };
    b.toString = function () {
        return "[EventDispatcher]"
    };
    b._dispatchEvent = function (a, d) {
        var b, c = 1 == d ? this._captureListeners : this._listeners;
        if (a && c && (c = c[a.type]) && (b = c.length)) {
            try {
                a.currentTarget =
                    this
            } catch (k) {}
            try {
                a.eventPhase = d
            } catch (k) {}
            a.removed = !1;
            for (var c = c.slice(), f = 0; b > f && !a.immediatePropagationStopped; f++) {
                var g = c[f];
                g.handleEvent ? g.handleEvent(a) : g(a);
                a.removed && (this.off(a.type, g, 1 == d), a.removed = !1)
            }
        }
    };
    createjs.EventDispatcher = c
})();
this.createjs = this.createjs || {};
(function () {
    function c(a, d, b) {
        this.type = a;
        this.currentTarget = this.target = null;
        this.eventPhase = 0;
        this.bubbles = !!d;
        this.cancelable = !!b;
        this.timeStamp = (new Date).getTime();
        this.removed = this.immediatePropagationStopped = this.propagationStopped = this.defaultPrevented = !1
    }
    var b = c.prototype;
    b.preventDefault = function () {
        this.defaultPrevented = this.cancelable && !0
    };
    b.stopPropagation = function () {
        this.propagationStopped = true
    };
    b.stopImmediatePropagation = function () {
        this.immediatePropagationStopped = this.propagationStopped = true
    };
    b.remove = function () {
        this.removed = true
    };
    b.clone = function () {
        return new c(this.type, this.bubbles, this.cancelable)
    };
    b.set = function (a) {
        for (var d in a) this[d] = a[d];
        return this
    };
    b.toString = function () {
        return "[Event (type=" + this.type + ")]"
    };
    createjs.Event = c
})();
this.createjs = this.createjs || {};
(function () {
    function c(b, a, d) {
        this.Event_constructor("error");
        this.title = b;
        this.message = a;
        this.data = d
    }
    createjs.extend(c, createjs.Event).clone = function () {
        return new createjs.ErrorEvent(this.title, this.message, this.data)
    };
    createjs.ErrorEvent = createjs.promote(c, "Event")
})();
this.createjs = this.createjs || {};
(function () {
    function c(b, a) {
        this.Event_constructor("progress");
        this.loaded = b;
        this.total = null == a ? 1 : a;
        this.progress = 0 == a ? 0 : this.loaded / this.total
    }
    createjs.extend(c, createjs.Event).clone = function () {
        return new createjs.ProgressEvent(this.loaded, this.total)
    };
    createjs.ProgressEvent = createjs.promote(c, "Event")
})(window);
this.createjs = this.createjs || {};
(function () {
    function c() {
        this.id = this.type = this.src = null;
        this.maintainOrder = !1;
        this.data = this.callback = null;
        this.method = createjs.LoadItem.GET;
        this.headers = this.values = null;
        this.withCredentials = !1;
        this.crossOrigin = this.mimeType = null;
        this.loadTimeout = a.LOAD_TIMEOUT_DEFAULT
    }
    var b = c.prototype = {},
        a = c;
    a.LOAD_TIMEOUT_DEFAULT = 8E3;
    a.create = function (d) {
        if ("string" == typeof d) {
            var b = new c;
            return b.src = d, b
        }
        if (d instanceof a) return d;
        if (d instanceof Object && d.src) return null == d.loadTimeout && (d.loadTimeout = a.LOAD_TIMEOUT_DEFAULT),
            d;
        throw Error("Type not recognized.");
    };
    b.set = function (a) {
        for (var d in a) this[d] = a[d];
        return this
    };
    createjs.LoadItem = a
})();
(function () {
    var c = {
        ABSOLUTE_PATT: /^(?:\w+:)?\/{2}/i,
        RELATIVE_PATT: /^[.\/]*?\//i,
        EXTENSION_PATT: /\/?[^\/]+\.(\w{1,5})$/i,
        parseURI: function (b) {
            var a = {
                absolute: !1,
                relative: !1
            };
            if (null == b) return a;
            var d = b.indexOf("?"); - 1 < d && (b = b.substr(0, d));
            var e;
            return c.ABSOLUTE_PATT.test(b) ? a.absolute = true : c.RELATIVE_PATT.test(b) && (a.relative = true), (e = b.match(c.EXTENSION_PATT)) && (a.extension = e[1].toLowerCase()), a
        },
        formatQueryString: function (b, a) {
            if (null == b) throw Error("You must specify data.");
            var d = [],
                c;
            for (c in b) d.push(c +
                "=" + escape(b[c]));
            return a && (d = d.concat(a)), d.join("&")
        },
        buildPath: function (b, a) {
            if (null == a) return b;
            var d = [],
                c = b.indexOf("?");
            if (-1 != c) var h = b.slice(c + 1),
                d = d.concat(h.split("&"));
            return -1 != c ? b.slice(0, c) + "?" + this.formatQueryString(a, d) : b + "?" + this.formatQueryString(a, d)
        },
        isCrossDomain: function (b) {
            var a = document.createElement("a");
            a.href = b.src;
            b = document.createElement("a");
            b.href = location.href;
            return "" != a.hostname && (a.port != b.port || a.protocol != b.protocol || a.hostname != b.hostname)
        },
        isLocal: function (b) {
            var a =
                document.createElement("a");
            return a.href = b.src, "" == a.hostname && "file:" == a.protocol
        },
        isBinary: function (b) {
            switch (b) {
                case createjs.AbstractLoader.IMAGE:
                case createjs.AbstractLoader.BINARY:
                    return !0;
                default:
                    return !1
            }
        },
        isImageTag: function (b) {
            return b instanceof HTMLImageElement
        },
        isAudioTag: function (b) {
            return window.HTMLAudioElement ? b instanceof HTMLAudioElement : !1
        },
        isVideoTag: function (b) {
            return window.HTMLVideoElement ? b instanceof HTMLVideoElement : !1
        },
        isText: function (b) {
            switch (b) {
                case createjs.AbstractLoader.TEXT:
                case createjs.AbstractLoader.JSON:
                case createjs.AbstractLoader.MANIFEST:
                case createjs.AbstractLoader.XML:
                case createjs.AbstractLoader.CSS:
                case createjs.AbstractLoader.SVG:
                case createjs.AbstractLoader.JAVASCRIPT:
                case createjs.AbstractLoader.SPRITESHEET:
                    return !0;
                default:
                    return !1
            }
        },
        getTypeByExtension: function (b) {
            if (null == b) return createjs.AbstractLoader.TEXT;
            switch (b.toLowerCase()) {
                case "jpeg":
                case "jpg":
                case "gif":
                case "png":
                case "webp":
                case "bmp":
                    return createjs.AbstractLoader.IMAGE;
                case "ogg":
                case "mp3":
                case "webm":
                    return createjs.AbstractLoader.SOUND;
                case "mp4":
                case "webm":
                case "ts":
                    return createjs.AbstractLoader.VIDEO;
                case "json":
                    return createjs.AbstractLoader.JSON;
                case "xml":
                    return createjs.AbstractLoader.XML;
                case "css":
                    return createjs.AbstractLoader.CSS;
                case "js":
                    return createjs.AbstractLoader.JAVASCRIPT;
                case "svg":
                    return createjs.AbstractLoader.SVG;
                default:
                    return createjs.AbstractLoader.TEXT
            }
        }
    };
    createjs.RequestUtils = c
})();
this.createjs = this.createjs || {};
(function () {
    function c(a, d, b) {
        this.EventDispatcher_constructor();
        this.canceled = this.loaded = !1;
        this.progress = 0;
        this.type = b;
        this.resultFormatter = null;
        this._item = a ? createjs.LoadItem.create(a) : null;
        this._preferXHR = d;
        this._tag = this._tagSrcAttribute = this._loadedItems = this._rawResult = this._result = null
    }
    var b = createjs.extend(c, createjs.EventDispatcher);
    c.POST = "POST";
    c.GET = "GET";
    c.BINARY = "binary";
    c.CSS = "css";
    c.IMAGE = "image";
    c.JAVASCRIPT = "javascript";
    c.JSON = "json";
    c.JSONP = "jsonp";
    c.MANIFEST = "manifest";
    c.SOUND =
        "sound";
    c.VIDEO = "video";
    c.SPRITESHEET = "spritesheet";
    c.SVG = "svg";
    c.TEXT = "text";
    c.XML = "xml";
    b.getItem = function () {
        return this._item
    };
    b.getResult = function (a) {
        return a ? this._rawResult : this._result
    };
    b.getTag = function () {
        return this._tag
    };
    b.setTag = function (a) {
        this._tag = a
    };
    b.load = function () {
        this._createRequest();
        this._request.on("complete", this, this);
        this._request.on("progress", this, this);
        this._request.on("loadStart", this, this);
        this._request.on("abort", this, this);
        this._request.on("timeout", this, this);
        this._request.on("error",
            this, this);
        var a = new createjs.Event("initialize");
        a.loader = this._request;
        this.dispatchEvent(a);
        this._request.load()
    };
    b.cancel = function () {
        this.canceled = true;
        this.destroy()
    };
    b.destroy = function () {
        this._request && (this._request.removeAllEventListeners(), this._request.destroy());
        this._loadItems = this._result = this._rawResult = this._item = this._request = null;
        this.removeAllEventListeners()
    };
    b.getLoadedItems = function () {
        return this._loadedItems
    };
    b._createRequest = function () {
        this._request = this._preferXHR ? new createjs.XHRRequest(this._item) :
            new createjs.TagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute)
    };
    b._createTag = function () {
        return null
    };
    b._sendLoadStart = function () {
        this._isCanceled() || this.dispatchEvent("loadstart")
    };
    b._sendProgress = function (a) {
        if (!this._isCanceled()) {
            var d = null;
            "number" == typeof a ? (this.progress = a, d = new createjs.ProgressEvent(this.progress)) : (d = a, this.progress = a.loaded / a.total, d.progress = this.progress, (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0));
            this.hasEventListener("progress") &&
                this.dispatchEvent(d)
        }
    };
    b._sendComplete = function () {
        if (!this._isCanceled()) {
            this.loaded = true;
            var a = new createjs.Event("complete");
            a.rawResult = this._rawResult;
            null != this._result && (a.result = this._result);
            this.dispatchEvent(a)
        }
    };
    b._sendError = function (a) {
        !this._isCanceled() && this.hasEventListener("error") && (null == a && (a = new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")), this.dispatchEvent(a))
    };
    b._isCanceled = function () {
        return null == window.createjs || this.canceled ? !0 : !1
    };
    b.resultFormatter = null;
    b.handleEvent = function (a) {
        switch (a.type) {
            case "complete":
                this._rawResult =
                    a.target._response;
                a = this.resultFormatter && this.resultFormatter(this);
                a instanceof Function ? a.call(this, createjs.proxy(this._resultFormatSuccess, this), createjs.proxy(this._resultFormatFailed, this)) : (this._result = a || this._rawResult, this._sendComplete());
                break;
            case "progress":
                this._sendProgress(a);
                break;
            case "error":
                this._sendError(a);
                break;
            case "loadstart":
                this._sendLoadStart();
                break;
            case "abort":
            case "timeout":
                this._isCanceled() || this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_" + a.type.toUpperCase() +
                    "_ERROR"))
        }
    };
    b._resultFormatSuccess = function (a) {
        this._result = a;
        this._sendComplete()
    };
    b._resultFormatFailed = function (a) {
        this._sendError(a)
    };
    b.buildPath = function (a, d) {
        return createjs.RequestUtils.buildPath(a, d)
    };
    b.toString = function () {
        return "[PreloadJS AbstractLoader]"
    };
    createjs.AbstractLoader = createjs.promote(c, "EventDispatcher")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a, d, b) {
        this.AbstractLoader_constructor(a, d, b);
        this.resultFormatter = this._formatResult;
        this._tagSrcAttribute = "src";
        this.on("initialize", this._updateXHR, this)
    }
    var b = createjs.extend(c, createjs.AbstractLoader);
    b.load = function () {
        this._tag || (this._tag = this._createTag(this._item.src));
        this._tag.preload = "auto";
        this._tag.load();
        this.AbstractLoader_load()
    };
    b._createTag = function () {};
    b._createRequest = function () {
        this._request = this._preferXHR ? new createjs.XHRRequest(this._item) : new createjs.MediaTagRequest(this._item,
            this._tag || this._createTag(), this._tagSrcAttribute)
    };
    b._updateXHR = function (a) {
        a.loader.setResponseType && a.loader.setResponseType("blob")
    };
    b._formatResult = function (a) {
        if (this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler), this._tag.onstalled = null, this._preferXHR) {
            var d = window.URL || window.webkitURL,
                b = a.getResult(!0);
            a.getTag().src = d.createObjectURL(b)
        }
        return a.getTag()
    };
    createjs.AbstractMediaLoader = createjs.promote(c, "AbstractLoader")
})();
this.createjs = this.createjs || {};
(function () {
    var c = function (a) {
            this._item = a
        },
        b = createjs.extend(c, createjs.EventDispatcher);
    b.load = function () {};
    b.destroy = function () {};
    b.cancel = function () {};
    createjs.AbstractRequest = createjs.promote(c, "EventDispatcher")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a, d, b) {
        this.AbstractRequest_constructor(a);
        this._tag = d;
        this._tagSrcAttribute = b;
        this._loadedHandler = createjs.proxy(this._handleTagComplete, this);
        this._addedToDOM = !1;
        this._startTagVisibility = null
    }
    var b = createjs.extend(c, createjs.AbstractRequest);
    b.load = function () {
        this._tag.onload = createjs.proxy(this._handleTagComplete, this);
        this._tag.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this);
        this._tag.onerror = createjs.proxy(this._handleError, this);
        var a = new createjs.Event("initialize");
        a.loader = this._tag;
        this.dispatchEvent(a);
        this._hideTag();
        this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout);
        this._tag[this._tagSrcAttribute] = this._item.src;
        null == this._tag.parentNode && (window.document.body.appendChild(this._tag), this._addedToDOM = true)
    };
    b.destroy = function () {
        this._clean();
        this._tag = null;
        this.AbstractRequest_destroy()
    };
    b._handleReadyStateChange = function () {
        clearTimeout(this._loadTimeout);
        var a = this._tag;
        "loaded" != a.readyState && "complete" != a.readyState ||
            this._handleTagComplete()
    };
    b._handleError = function () {
        this._clean();
        this.dispatchEvent("error")
    };
    b._handleTagComplete = function () {
        this._rawResult = this._tag;
        this._result = this.resultFormatter && this.resultFormatter(this) || this._rawResult;
        this._clean();
        this._showTag();
        this.dispatchEvent("complete")
    };
    b._handleTimeout = function () {
        this._clean();
        this.dispatchEvent(new createjs.Event("timeout"))
    };
    b._clean = function () {
        this._tag.onload = null;
        this._tag.onreadystatechange = null;
        this._tag.onerror = null;
        this._addedToDOM &&
            null != this._tag.parentNode && this._tag.parentNode.removeChild(this._tag);
        clearTimeout(this._loadTimeout)
    };
    b._hideTag = function () {
        this._startTagVisibility = this._tag.style.visibility;
        this._tag.style.visibility = "hidden"
    };
    b._showTag = function () {
        this._tag.style.visibility = this._startTagVisibility
    };
    b._handleStalled = function () {};
    createjs.TagRequest = createjs.promote(c, "AbstractRequest")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a, d, b) {
        this.AbstractRequest_constructor(a);
        this._tag = d;
        this._tagSrcAttribute = b;
        this._loadedHandler = createjs.proxy(this._handleTagComplete, this)
    }
    var b = createjs.extend(c, createjs.TagRequest);
    b.load = function () {
        var a = createjs.proxy(this._handleStalled, this);
        this._stalledCallback = a;
        var d = createjs.proxy(this._handleProgress, this);
        this._handleProgress = d;
        this._tag.addEventListener("stalled", a);
        this._tag.addEventListener("progress", d);
        this._tag.addEventListener && this._tag.addEventListener("canplaythrough",
            this._loadedHandler, !1);
        this.TagRequest_load()
    };
    b._handleReadyStateChange = function () {
        clearTimeout(this._loadTimeout);
        var a = this._tag;
        "loaded" != a.readyState && "complete" != a.readyState || this._handleTagComplete()
    };
    b._handleStalled = function () {};
    b._handleProgress = function (a) {
        !a || 0 < a.loaded && 0 == a.total || (a = new createjs.ProgressEvent(a.loaded, a.total), this.dispatchEvent(a))
    };
    b._clean = function () {
        this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler);
        this._tag.removeEventListener("stalled",
            this._stalledCallback);
        this._tag.removeEventListener("progress", this._progressCallback);
        this.TagRequest__clean()
    };
    createjs.MediaTagRequest = createjs.promote(c, "TagRequest")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a) {
        this.AbstractRequest_constructor(a);
        this._loadTimeout = this._request = null;
        this._xhrLevel = 1;
        this._rawResponse = this._response = null;
        this._canceled = !1;
        this._handleLoadStartProxy = createjs.proxy(this._handleLoadStart, this);
        this._handleProgressProxy = createjs.proxy(this._handleProgress, this);
        this._handleAbortProxy = createjs.proxy(this._handleAbort, this);
        this._handleErrorProxy = createjs.proxy(this._handleError, this);
        this._handleTimeoutProxy = createjs.proxy(this._handleTimeout, this);
        this._handleLoadProxy =
            createjs.proxy(this._handleLoad, this);
        this._handleReadyStateChangeProxy = createjs.proxy(this._handleReadyStateChange, this);
        !this._createXHR(a)
    }
    var b = createjs.extend(c, createjs.AbstractRequest);
    c.ACTIVEX_VERSIONS = "Msxml2.XMLHTTP.6.0 Msxml2.XMLHTTP.5.0 Msxml2.XMLHTTP.4.0 MSXML2.XMLHTTP.3.0 MSXML2.XMLHTTP Microsoft.XMLHTTP".split(" ");
    b.getResult = function (a) {
        return a && this._rawResponse ? this._rawResponse : this._response
    };
    b.cancel = function () {
        this.canceled = true;
        this._clean();
        this._request.abort()
    };
    b.load = function () {
        if (null ==
            this._request) return void this._handleError();
        null != this._request.addEventListener ? (this._request.addEventListener("loadstart", this._handleLoadStartProxy, !1), this._request.addEventListener("progress", this._handleProgressProxy, !1), this._request.addEventListener("abort", this._handleAbortProxy, !1), this._request.addEventListener("error", this._handleErrorProxy, !1), this._request.addEventListener("timeout", this._handleTimeoutProxy, !1), this._request.addEventListener("load", this._handleLoadProxy, !1), this._request.addEventListener("readystatechange",
            this._handleReadyStateChangeProxy, !1)) : (this._request.onloadstart = this._handleLoadStartProxy, this._request.onprogress = this._handleProgressProxy, this._request.onabort = this._handleAbortProxy, this._request.onerror = this._handleErrorProxy, this._request.ontimeout = this._handleTimeoutProxy, this._request.onload = this._handleLoadProxy, this._request.onreadystatechange = this._handleReadyStateChangeProxy);
        1 == this._xhrLevel && (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout));


        try {
            this._item.values && this._item.method != createjs.AbstractLoader.GET ? this._item.method == createjs.AbstractLoader.POST && this._request.send(createjs.RequestUtils.formatQueryString(this._item.values)) : this._request.send()
        } catch (a) {
            this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND", null, a))
        }
    };
    b.setResponseType = function (a) {
        "blob" === a && (a = window.URL ? "blob" : "arraybuffer", this._responseType = a);
        this._request.responseType = a
    };
    b.getAllResponseHeaders = function () {
        return this._request.getAllResponseHeaders instanceof
        Function ? this._request.getAllResponseHeaders() : null
    };
    b.getResponseHeader = function (a) {
        return this._request.getResponseHeader instanceof Function ? this._request.getResponseHeader(a) : null
    };
    b._handleProgress = function (a) {
        !a || 0 < a.loaded && 0 == a.total || (a = new createjs.ProgressEvent(a.loaded, a.total), this.dispatchEvent(a))
    };
    b._handleLoadStart = function () {
        clearTimeout(this._loadTimeout);
        this.dispatchEvent("loadstart")
    };
    b._handleAbort = function (a) {
        this._clean();
        this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED",
            null, a))
    };
    b._handleError = function (a) {
        this._clean();
        this.dispatchEvent(new createjs.ErrorEvent(a.message))
    };
    b._handleReadyStateChange = function () {
        4 == this._request.readyState && this._handleLoad()
    };
    b._handleLoad = function () {
        if (!this.loaded) {
            this.loaded = true;
            var a = this._checkError();
            if (a) return void this._handleError(a);
            if (this._response = this._getResponse(), "arraybuffer" === this._responseType) try {
                this._response = new Blob([this._response])
            } catch (d) {
                if (window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder ||
                    window.MozBlobBuilder || window.MSBlobBuilder, "TypeError" === d.name && window.BlobBuilder) a = new BlobBuilder, a.append(this._response), this._response = a.getBlob()
            }
            this._clean();
            this.dispatchEvent(new createjs.Event("complete"))
        }
    };
    b._handleTimeout = function (a) {
        this._clean();
        this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT", null, a))
    };
    b._checkError = function () {
        var a = parseInt(this._request.status);
        switch (a) {
            case 404:
            case 0:
                return Error(a)
        }
        return null
    };
    b._getResponse = function () {
        if (null != this._response) return this._response;
        if (null != this._request.response) return this._request.response;
        try {
            if (null != this._request.responseText) return this._request.responseText
        } catch (a) {}
        try {
            if (null != this._request.responseXML) return this._request.responseXML
        } catch (a) {}
        return null
    };
    b._createXHR = function (a) {
        var d = createjs.RequestUtils.isCrossDomain(a),
            b = {},
            c = null;
        if (window.XMLHttpRequest) c = new XMLHttpRequest, d && void 0 === c.withCredentials && window.XDomainRequest && (c = new XDomainRequest);
        else {
            for (var f = 0, g = s.ACTIVEX_VERSIONS.length; g > f; f++) {
                var k =
                    s.ACTIVEX_VERSIONS[f];
                try {
                    c = new ActiveXObject(k);
                    break
                } catch (C) {}
            }
            if (null == c) return !1
        }
        null == a.mimeType && createjs.RequestUtils.isText(a.type) && (a.mimeType = "text/plain; charset=utf-8");
        a.mimeType && c.overrideMimeType && c.overrideMimeType(a.mimeType);
        this._xhrLevel = "string" == typeof c.responseType ? 2 : 1;
        f = null;
        if (f = a.method == createjs.AbstractLoader.GET ? createjs.RequestUtils.buildPath(a.src, a.values) : a.src, c.open(a.method || createjs.AbstractLoader.GET, f, !0), d && c instanceof XMLHttpRequest && 1 == this._xhrLevel &&
            (b.Origin = location.origin), a.values && a.method == createjs.AbstractLoader.POST && (b["Content-Type"] = "application/x-www-form-urlencoded"), d || b["X-Requested-With"] || (b["X-Requested-With"] = "XMLHttpRequest"), a.headers)
            for (var m in a.headers) b[m] = a.headers[m];
        for (m in b) c.setRequestHeader(m, b[m]);
        return c instanceof XMLHttpRequest && void 0 !== a.withCredentials && (c.withCredentials = a.withCredentials), this._request = c, !0
    };
    b._clean = function () {
        clearTimeout(this._loadTimeout);
        null != this._request.removeEventListener ?
            (this._request.removeEventListener("loadstart", this._handleLoadStartProxy), this._request.removeEventListener("progress", this._handleProgressProxy), this._request.removeEventListener("abort", this._handleAbortProxy), this._request.removeEventListener("error", this._handleErrorProxy), this._request.removeEventListener("timeout", this._handleTimeoutProxy), this._request.removeEventListener("load", this._handleLoadProxy), this._request.removeEventListener("readystatechange", this._handleReadyStateChangeProxy)) :
            (this._request.onloadstart = null, this._request.onprogress = null, this._request.onabort = null, this._request.onerror = null, this._request.ontimeout = null, this._request.onload = null, this._request.onreadystatechange = null)
    };
    b.toString = function () {
        return "[PreloadJS XHRRequest]"
    };
    createjs.XHRRequest = createjs.promote(c, "AbstractRequest")
})();
this.createjs = this.createjs || {};
(function () {
    function c(a, d) {
        this.AbstractMediaLoader_constructor(a, d, createjs.AbstractLoader.SOUND);
        createjs.RequestUtils.isAudioTag(a) ? this._tag = a : createjs.RequestUtils.isAudioTag(a.src) ? this._tag = a : createjs.RequestUtils.isAudioTag(a.tag) && (this._tag = createjs.RequestUtils.isAudioTag(a) ? a : a.src);
        null != this._tag && (this._preferXHR = !1)
    }
    var b = createjs.extend(c, createjs.AbstractMediaLoader);
    c.canLoadItem = function (a) {
        return a.type == createjs.AbstractLoader.SOUND
    };
    b._createTag = function (a) {
        var d = document.createElement("audio");
        return d.autoplay = !1, d.preload = "none", d.src = a, d
    };
    createjs.SoundLoader = createjs.promote(c, "AbstractMediaLoader")
})();
this.createjs = this.createjs || {};
(function () {
    var c = function () {
            this.duration = this.startTime = this.pan = this.volume = this.loop = this.offset = this.delay = this.interrupt = null
        },
        b = c.prototype = {};
    c.create = function (a) {
        if (a instanceof c || a instanceof Object) {
            var d = new createjs.PlayPropsConfig;
            return d.set(a), d
        }
        throw Error("Type not recognized.");
    };
    b.set = function (a) {
        for (var d in a) this[d] = a[d];
        return this
    };
    b.toString = function () {
        return "[PlayPropsConfig]"
    };
    createjs.PlayPropsConfig = c
})();
this.createjs = this.createjs || {};
(function () {
    function c() {
        throw "Sound cannot be instantiated";
    }

    function b(a, b) {
        this.init(a, b)
    }
    c.INTERRUPT_ANY = "any";
    c.INTERRUPT_EARLY = "early";
    c.INTERRUPT_LATE = "late";
    c.INTERRUPT_NONE = "none";
    c.PLAY_INITED = "playInited";
    c.PLAY_SUCCEEDED = "playSucceeded";
    c.PLAY_INTERRUPTED = "playInterrupted";
    c.PLAY_FINISHED = "playFinished";
    c.PLAY_FAILED = "playFailed";
    c.SUPPORTED_EXTENSIONS = "mp3 ogg opus mpeg wav m4a mp4 aiff wma mid".split(" ");
    c.EXTENSION_MAP = {
        m4a: "mp4"
    };
    c.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([\/.]*?(?:[^?]+)?\/)?((?:[^\/?]+)\.(\w+))(?:\?(\S+)?)?$/;
    c.defaultInterruptBehavior = c.INTERRUPT_NONE;
    c.alternateExtensions = [];
    c.activePlugin = null;
    c._masterVolume = 1;
    Object.defineProperty(c, "volume", {
        get: function () {
            return this._masterVolume
        },
        set: function (a) {
            if (null == Number(a)) return !1;
            if (a = Math.max(0, Math.min(1, a)), c._masterVolume = a, !this.activePlugin || !this.activePlugin.setVolume || !this.activePlugin.setVolume(a))
                for (var d = this._instances, b = 0, f = d.length; f > b; b++) d[b].setMasterVolume(a)
        }
    });
    c._masterMute = !1;
    Object.defineProperty(c, "muted", {
        get: function () {
            return this._masterMute
        },
        set: function (a) {
            if (null == a) return !1;
            if (this._masterMute = a, !this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(a))
                for (var b = this._instances, d = 0, c = b.length; c > d; d++) b[d].setMasterMute(a);
            return !0
        }
    });
    Object.defineProperty(c, "capabilities", {
        get: function () {
            return null == c.activePlugin ? null : c.activePlugin._capabilities
        },
        set: function () {
            return !1
        }
    });
    c._pluginsRegistered = !1;
    c._lastID = 0;
    c._instances = [];
    c._idHash = {};
    c._preloadHash = {};
    c._defaultPlayPropsHash = {};
    c.addEventListener = null;
    c.removeEventListener =
        null;
    c.removeAllEventListeners = null;
    c.dispatchEvent = null;
    c.hasEventListener = null;
    c._listeners = null;
    createjs.EventDispatcher.initialize(c);
    c.getPreloadHandlers = function () {
        return {
            callback: createjs.proxy(c.initLoad, c),
            types: ["sound"],
            extensions: c.SUPPORTED_EXTENSIONS
        }
    };
    c._handleLoadComplete = function (a) {
        var b = a.target.getItem().src;
        if (c._preloadHash[b])
            for (var d = 0, f = c._preloadHash[b].length; f > d; d++) {
                var g = c._preloadHash[b][d];
                if (c._preloadHash[b][d] = true, c.hasEventListener("fileload")) a = new createjs.Event("fileload"),
                    a.src = g.src, a.id = g.id, a.data = g.data, a.sprite = g.sprite, c.dispatchEvent(a)
            }
    };
    c._handleLoadError = function (a) {
        var b = a.target.getItem().src;
        if (c._preloadHash[b])
            for (var d = 0, f = c._preloadHash[b].length; f > d; d++) {
                var g = c._preloadHash[b][d];
                if (c._preloadHash[b][d] = !1, c.hasEventListener("fileerror")) a = new createjs.Event("fileerror"), a.src = g.src, a.id = g.id, a.data = g.data, a.sprite = g.sprite, c.dispatchEvent(a)
            }
    };
    c._registerPlugin = function (a) {
        return a.isSupported() ? (c.activePlugin = new a, !0) : !1
    };
    c.registerPlugins = function (a) {
        c._pluginsRegistered = true;
        for (var b = 0, d = a.length; d > b; b++)
            if (c._registerPlugin(a[b])) return !0;
        return !1
    };
    c.initializeDefaultPlugins = function () {
        return null != c.activePlugin ? !0 : c._pluginsRegistered ? !1 : c.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]) ? !0 : !1
    };
    c.isReady = function () {
        return null != c.activePlugin
    };
    c.getCapabilities = function () {
        return null == c.activePlugin ? null : c.activePlugin._capabilities
    };
    c.getCapability = function (a) {
        return null == c.activePlugin ? null : c.activePlugin._capabilities[a]
    };
    c.initLoad = function (a) {
        return c._registerSound(a)
    };
    c._registerSound = function (a) {
        if (!c.initializeDefaultPlugins()) return !1;
        var d;
        if (a.src instanceof Object ? (d = c._parseSrc(a.src), d.src = a.path + d.src) : d = c._parsePath(a.src), null == d) return !1;
        a.src = d.src;
        a.type = "sound";
        d = a.data;
        var h = null;
        if (null != d && (isNaN(d.channels) ? isNaN(d) || (h = parseInt(d)) : h = parseInt(d.channels), d.audioSprite))
            for (var f, g = d.audioSprite.length; g--;) f = d.audioSprite[g], c._idHash[f.id] = {
                src: a.src,
                startTime: parseInt(f.startTime),
                duration: parseInt(f.duration)
            }, f.defaultPlayProps && (c._defaultPlayPropsHash[f.id] =
                createjs.PlayPropsConfig.create(f.defaultPlayProps));
        null != a.id && (c._idHash[a.id] = {
            src: a.src
        });
        f = c.activePlugin.register(a);
        return b.create(a.src, h), null != d && isNaN(d) ? a.data.channels = h || b.maxPerChannel() : a.data = h || b.maxPerChannel(), f.type && (a.type = f.type), a.defaultPlayProps && (c._defaultPlayPropsHash[a.src] = createjs.PlayPropsConfig.create(a.defaultPlayProps)), f
    };
    c.registerSound = function (a, b, h, f, g) {
        h = {
            src: a,
            id: b,
            data: h,
            defaultPlayProps: g
        };
        a instanceof Object && a.src && (f = b, h = a);
        h = createjs.LoadItem.create(h);
        h.path = f;
        null == f || h.src instanceof Object || (h.src = f + a);
        a = c._registerSound(h);
        if (!a) return !1;
        if (c._preloadHash[h.src] || (c._preloadHash[h.src] = []), c._preloadHash[h.src].push(h), 1 == c._preloadHash[h.src].length) a.on("complete", createjs.proxy(this._handleLoadComplete, this)), a.on("error", createjs.proxy(this._handleLoadError, this)), c.activePlugin.preload(a);
        else if (1 == c._preloadHash[h.src][0]) return !0;
        return h
    };
    c.registerSounds = function (a, b) {
        var d = [];
        a.path && (b ? b += a.path : b = a.path, a = a.manifest);
        for (var c =
                0, e = a.length; e > c; c++) d[c] = createjs.Sound.registerSound(a[c].src, a[c].id, a[c].data, b, a[c].defaultPlayProps);
        return d
    };
    c.removeSound = function (a, e) {
        if (null == c.activePlugin) return !1;
        a instanceof Object && a.src && (a = a.src);
        var d;
        if (a instanceof Object ? d = c._parseSrc(a) : (a = c._getSrcById(a).src, d = c._parsePath(a)), null == d) return !1;
        a = d.src;
        null != e && (a = e + a);
        for (var f in c._idHash) c._idHash[f].src == a && delete c._idHash[f];
        return b.removeSrc(a), delete c._preloadHash[a], c.activePlugin.removeSound(a), !0
    };
    c.removeSounds =
        function (a, b) {
            var d = [];
            a.path && (b ? b += a.path : b = a.path, a = a.manifest);
            for (var c = 0, e = a.length; e > c; c++) d[c] = createjs.Sound.removeSound(a[c].src, b);
            return d
        };
    c.removeAllSounds = function () {
        c._idHash = {};
        c._preloadHash = {};
        b.removeAll();
        c.activePlugin && c.activePlugin.removeAllSounds()
    };
    c.loadComplete = function (a) {
        if (!c.isReady()) return !1;
        var b = c._parsePath(a);
        return a = b ? c._getSrcById(b.src).src : c._getSrcById(a).src, void 0 == c._preloadHash[a] ? !1 : 1 == c._preloadHash[a][0]
    };
    c._parsePath = function (a) {
        "string" != typeof a &&
            (a = a.toString());
        var b = a.match(c.FILE_PATTERN);
        if (null == b) return !1;
        for (var d = b[4], f = b[5], g = c.capabilities, k = 0; !g[f];)
            if (f = c.alternateExtensions[k++], k > c.alternateExtensions.length) return null;
        a = a.replace("." + b[5], "." + f);
        return {
            name: d,
            src: a,
            extension: f
        }
    };
    c._parseSrc = function (a) {
        var b = {
                name: void 0,
                src: void 0,
                extension: void 0
            },
            d = c.capabilities,
            f;
        for (f in a)
            if (a.hasOwnProperty(f) && d[f]) {
                b.src = a[f];
                b.extension = f;
                break
            }
        if (!b.src) return !1;
        a = b.src.lastIndexOf("/");
        return b.name = -1 != a ? b.src.slice(a + 1) : b.src,
            b
    };
    c.play = function (a, b, h, f, g, k, m, C, H) {
        b = createjs.PlayPropsConfig.create(b instanceof Object || b instanceof createjs.PlayPropsConfig ? b : {
            interrupt: b,
            delay: h,
            offset: f,
            loop: g,
            volume: k,
            pan: m,
            startTime: C,
            duration: H
        });
        a = c.createInstance(a, b.startTime, b.duration);
        return c._playInstance(a, b) || a._playFailed(), a
    };
    c.createInstance = function (a, e, h) {
        if (!c.initializeDefaultPlugins()) return new createjs.DefaultSoundInstance(a, e, h);
        var d = c._defaultPlayPropsHash[a];
        a = c._getSrcById(a);
        var g = c._parsePath(a.src),
            k = null;
        return null != g && null != g.src ? (b.create(g.src), null == e && (e = a.startTime), k = c.activePlugin.create(g.src, e, h || a.duration), d = d || c._defaultPlayPropsHash[g.src], d && k.applyPlayProps(d)) : k = new createjs.DefaultSoundInstance(a, e, h), k.uniqueId = c._lastID++, k
    };
    c.stop = function () {
        for (var a = this._instances, b = a.length; b--;) a[b].stop()
    };
    c.setVolume = function (a) {
        if (null == Number(a)) return !1;
        if (a = Math.max(0, Math.min(1, a)), c._masterVolume = a, !this.activePlugin || !this.activePlugin.setVolume || !this.activePlugin.setVolume(a))
            for (var b =
                    this._instances, d = 0, f = b.length; f > d; d++) b[d].setMasterVolume(a)
    };
    c.getVolume = function () {
        return this._masterVolume
    };
    c.setMute = function (a) {
        if (null == a) return !1;
        if (this._masterMute = a, !this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(a))
            for (var b = this._instances, d = 0, c = b.length; c > d; d++) b[d].setMasterMute(a);
        return !0
    };
    c.getMute = function () {
        return this._masterMute
    };
    c.setDefaultPlayProps = function (a, b) {
        a = c._getSrcById(a);
        c._defaultPlayPropsHash[c._parsePath(a.src).src] = createjs.PlayPropsConfig.create(b)
    };
    c.getDefaultPlayProps = function (a) {
        return a = c._getSrcById(a), c._defaultPlayPropsHash[c._parsePath(a.src).src]
    };
    c._playInstance = function (a, b) {
        var d = c._defaultPlayPropsHash[a.src] || {};
        if (null == b.interrupt && (b.interrupt = d.interrupt || c.defaultInterruptBehavior), null == b.delay && (b.delay = d.delay || 0), null == b.offset && (b.offset = a.getPosition()), null == b.loop && (b.loop = a.loop), null == b.volume && (b.volume = a.volume), null == b.pan && (b.pan = a.pan), 0 == b.delay) {
            if (!c._beginPlaying(a, b)) return !1
        } else d = setTimeout(function () {
            c._beginPlaying(a,
                b)
        }, b.delay), a.delayTimeoutId = d;
        return this._instances.push(a), !0
    };
    c._beginPlaying = function (a, c) {
        if (!b.add(a, c.interrupt)) return !1;
        if (!a._beginPlaying(c)) {
            var d = createjs.indexOf(this._instances, a);
            return -1 < d && this._instances.splice(d, 1), !1
        }
        return !0
    };
    c._getSrcById = function (a) {
        return c._idHash[a] || {
            src: a
        }
    };
    c._playFinished = function (a) {
        b.remove(a);
        a = createjs.indexOf(this._instances, a); - 1 < a && this._instances.splice(a, 1)
    };
    createjs.Sound = c;
    b.channels = {};
    b.create = function (a, c) {
        return null == b.get(a) ? (b.channels[a] =
            new b(a, c), !0) : !1
    };
    b.removeSrc = function (a) {
        var d = b.get(a);
        return null == d ? !1 : (d._removeAll(), delete b.channels[a], !0)
    };
    b.removeAll = function () {
        for (var a in b.channels) b.channels[a]._removeAll();
        b.channels = {}
    };
    b.add = function (a, c) {
        var d = b.get(a.src);
        return null == d ? !1 : d._add(a, c)
    };
    b.remove = function (a) {
        var d = b.get(a.src);
        return null == d ? !1 : (d._remove(a), !0)
    };
    b.maxPerChannel = function () {
        return a.maxDefault
    };
    b.get = function (a) {
        return b.channels[a]
    };
    var a = b.prototype;
    a.constructor = b;
    a.src = null;
    a.max = null;
    a.maxDefault =
        100;
    a.length = 0;
    a.init = function (a, b) {
        this.src = a;
        this.max = b || this.maxDefault; - 1 == this.max && (this.max = this.maxDefault);
        this._instances = []
    };
    a._get = function (a) {
        return this._instances[a]
    };
    a._add = function (a, b) {
        return this._getSlot(b, a) ? (this._instances.push(a), this.length++, !0) : !1
    };
    a._remove = function (a) {
        a = createjs.indexOf(this._instances, a);
        return -1 == a ? !1 : (this._instances.splice(a, 1), this.length--, !0)
    };
    a._removeAll = function () {
        for (var a = this.length - 1; 0 <= a; a--) this._instances[a].stop()
    };
    a._getSlot = function (a) {
        var b,
            d;
        if (a != c.INTERRUPT_NONE && (d = this._get(0), null == d)) return !0;
        for (var f = 0, g = this.max; g > f; f++) {
            if (b = this._get(f), null == b) return !0;
            if (b.playState == c.PLAY_FINISHED || b.playState == c.PLAY_INTERRUPTED || b.playState == c.PLAY_FAILED) {
                d = b;
                break
            }
            a != c.INTERRUPT_NONE && (a == c.INTERRUPT_EARLY && b.getPosition() < d.getPosition() || a == c.INTERRUPT_LATE && b.getPosition() > d.getPosition()) && (d = b)
        }
        return null != d ? (d._interrupt(), this._remove(d), !0) : !1
    };
    a.toString = function () {
        return "[Sound SoundChannel]"
    }
})();
this.createjs = this.createjs || {};
(function () {
    var c = function (a, b, c, h) {
            this.EventDispatcher_constructor();
            this.src = a;
            this.uniqueId = -1;
            this.delayTimeoutId = this.playState = null;
            this._volume = 1;
            Object.defineProperty(this, "volume", {
                get: this.getVolume,
                set: this.setVolume
            });
            this._pan = 0;
            Object.defineProperty(this, "pan", {
                get: this.getPan,
                set: this.setPan
            });
            this._startTime = Math.max(0, b || 0);
            Object.defineProperty(this, "startTime", {
                get: this.getStartTime,
                set: this.setStartTime
            });
            this._duration = Math.max(0, c || 0);
            Object.defineProperty(this, "duration", {
                get: this.getDuration,
                set: this.setDuration
            });
            this._playbackResource = null;
            Object.defineProperty(this, "playbackResource", {
                get: this.getPlaybackResource,
                set: this.setPlaybackResource
            });
            !1 !== h && !0 !== h && this.setPlaybackResource(h);
            this._position = 0;
            Object.defineProperty(this, "position", {
                get: this.getPosition,
                set: this.setPosition
            });
            this._loop = 0;
            Object.defineProperty(this, "loop", {
                get: this.getLoop,
                set: this.setLoop
            });
            this._muted = !1;
            Object.defineProperty(this, "muted", {
                get: this.getMuted,
                set: this.setMuted
            });
            this._paused = !1;
            Object.defineProperty(this,
                "paused", {
                    get: this.getPaused,
                    set: this.setPaused
                })
        },
        b = createjs.extend(c, createjs.EventDispatcher);
    b.play = function (a, b, c, h, f, g) {
        var d;
        return d = createjs.PlayPropsConfig.create(a instanceof Object || a instanceof createjs.PlayPropsConfig ? a : {
            interrupt: a,
            delay: b,
            offset: c,
            loop: h,
            volume: f,
            pan: g
        }), this.playState == createjs.Sound.PLAY_SUCCEEDED ? (this.applyPlayProps(d), void(this._paused && this.setPaused(!1))) : (this._cleanUp(), createjs.Sound._playInstance(this, d), this)
    };
    b.stop = function () {
        return this._position = 0,
            this._paused = !1, this._handleStop(), this._cleanUp(), this.playState = createjs.Sound.PLAY_FINISHED, this
    };
    b.destroy = function () {
        this._cleanUp();
        this.playbackResource = this.src = null;
        this.removeAllEventListeners()
    };
    b.applyPlayProps = function (a) {
        return null != a.offset && this.setPosition(a.offset), null != a.loop && this.setLoop(a.loop), null != a.volume && this.setVolume(a.volume), null != a.pan && this.setPan(a.pan), null != a.startTime && (this.setStartTime(a.startTime), this.setDuration(a.duration)), this
    };
    b.toString = function () {
        return "[AbstractSoundInstance]"
    };
    b.getPaused = function () {
        return this._paused
    };
    b.setPaused = function (a) {
        return !0 !== a && !1 !== a || this._paused == a || 1 == a && this.playState != createjs.Sound.PLAY_SUCCEEDED ? void 0 : (this._paused = a, a ? this._pause() : this._resume(), clearTimeout(this.delayTimeoutId), this)
    };
    b.setVolume = function (a) {
        return a == this._volume ? this : (this._volume = Math.max(0, Math.min(1, a)), this._muted || this._updateVolume(), this)
    };
    b.getVolume = function () {
        return this._volume
    };
    b.setMuted = function (a) {
        return !0 === a || !1 === a ? (this._muted = a, this._updateVolume(),
            this) : void 0
    };
    b.getMuted = function () {
        return this._muted
    };
    b.setPan = function (a) {
        return a == this._pan ? this : (this._pan = Math.max(-1, Math.min(1, a)), this._updatePan(), this)
    };
    b.getPan = function () {
        return this._pan
    };
    b.getPosition = function () {
        return this._paused || this.playState != createjs.Sound.PLAY_SUCCEEDED || (this._position = this._calculateCurrentPosition()), this._position
    };
    b.setPosition = function (a) {
        return this._position = Math.max(0, a), this.playState == createjs.Sound.PLAY_SUCCEEDED && this._updatePosition(), this
    };
    b.getStartTime =
        function () {
            return this._startTime
        };
    b.setStartTime = function (a) {
        return a == this._startTime ? this : (this._startTime = Math.max(0, a || 0), this._updateStartTime(), this)
    };
    b.getDuration = function () {
        return this._duration
    };
    b.setDuration = function (a) {
        return a == this._duration ? this : (this._duration = Math.max(0, a || 0), this._updateDuration(), this)
    };
    b.setPlaybackResource = function (a) {
        return this._playbackResource = a, 0 == this._duration && this._setDurationFromSource(), this
    };
    b.getPlaybackResource = function () {
        return this._playbackResource
    };
    b.getLoop = function () {
        return this._loop
    };
    b.setLoop = function (a) {
        null != this._playbackResource && (0 != this._loop && 0 == a ? this._removeLooping(a) : 0 == this._loop && 0 != a && this._addLooping(a));
        this._loop = a
    };
    b._sendEvent = function (a) {
        a = new createjs.Event(a);
        this.dispatchEvent(a)
    };
    b._cleanUp = function () {
        clearTimeout(this.delayTimeoutId);
        this._handleCleanUp();
        this._paused = !1;
        createjs.Sound._playFinished(this)
    };
    b._interrupt = function () {
        this._cleanUp();
        this.playState = createjs.Sound.PLAY_INTERRUPTED;
        this._sendEvent("interrupted")
    };
    b._beginPlaying = function (a) {
        return this.setPosition(a.offset), this.setLoop(a.loop), this.setVolume(a.volume), this.setPan(a.pan), null != a.startTime && (this.setStartTime(a.startTime), this.setDuration(a.duration)), null != this._playbackResource && this._position < this._duration ? (this._paused = !1, this._handleSoundReady(), this.playState = createjs.Sound.PLAY_SUCCEEDED, this._sendEvent("succeeded"), !0) : (this._playFailed(), !1)
    };
    b._playFailed = function () {
        this._cleanUp();
        this.playState = createjs.Sound.PLAY_FAILED;
        this._sendEvent("failed")
    };
    b._handleSoundComplete = function () {
        return this._position = 0, 0 != this._loop ? (this._loop--, this._handleLoop(), void this._sendEvent("loop")) : (this._cleanUp(), this.playState = createjs.Sound.PLAY_FINISHED, void this._sendEvent("complete"))
    };
    b._handleSoundReady = function () {};
    b._updateVolume = function () {};
    b._updatePan = function () {};
    b._updateStartTime = function () {};
    b._updateDuration = function () {};
    b._setDurationFromSource = function () {};
    b._calculateCurrentPosition = function () {};
    b._updatePosition = function () {};
    b._removeLooping =
        function () {};
    b._addLooping = function () {};
    b._pause = function () {};
    b._resume = function () {};
    b._handleStop = function () {};
    b._handleCleanUp = function () {};
    b._handleLoop = function () {};
    createjs.AbstractSoundInstance = createjs.promote(c, "EventDispatcher");
    createjs.DefaultSoundInstance = createjs.AbstractSoundInstance
})();
this.createjs = this.createjs || {};
(function () {
    var c = function () {
            this._capabilities = null;
            this._loaders = {};
            this._audioSources = {};
            this._soundInstances = {};
            this._volume = 1;
            this._loaderClass;
            this._soundInstanceClass
        },
        b = c.prototype;
    c._capabilities = null;
    c.isSupported = function () {
        return !0
    };
    b.register = function (a) {
        var b = this._loaders[a.src];
        return b && !b.canceled ? this._loaders[a.src] : (this._audioSources[a.src] = true, this._soundInstances[a.src] = [], b = new this._loaderClass(a), b.on("complete", this._handlePreloadComplete, this), this._loaders[a.src] = b, b)
    };
    b.preload = function (a) {
        a.on("error", this._handlePreloadError, this);
        a.load()
    };
    b.isPreloadStarted = function (a) {
        return null != this._audioSources[a]
    };
    b.isPreloadComplete = function (a) {
        return !(null == this._audioSources[a] || 1 == this._audioSources[a])
    };
    b.removeSound = function (a) {
        if (this._soundInstances[a]) {
            for (var b = this._soundInstances[a].length; b--;) this._soundInstances[a][b].destroy();
            delete this._soundInstances[a];
            delete this._audioSources[a];
            this._loaders[a] && this._loaders[a].destroy();
            delete this._loaders[a]
        }
    };
    b.removeAllSounds = function () {
        for (var a in this._audioSources) this.removeSound(a)
    };
    b.create = function (a, b, c) {
        this.isPreloadStarted(a) || this.preload(this.register(a));
        b = new this._soundInstanceClass(a, b, c, this._audioSources[a]);
        return this._soundInstances[a].push(b), b
    };
    b.setVolume = function (a) {
        return this._volume = a, this._updateVolume(), !0
    };
    b.getVolume = function () {
        return this._volume
    };
    b.setMute = function () {
        return this._updateVolume(), !0
    };
    b.toString = function () {
        return "[AbstractPlugin]"
    };
    b._handlePreloadComplete =
        function (a) {
            var b = a.target.getItem().src;
            this._audioSources[b] = a.result;
            a = 0;
            for (var c = this._soundInstances[b].length; c > a; a++) this._soundInstances[b][a].setPlaybackResource(this._audioSources[b])
        };
    b._handlePreloadError = function () {};
    b._updateVolume = function () {};
    createjs.AbstractPlugin = c
})();
this.createjs = this.createjs || {};
(function () {
    function c(a) {
        this.AbstractLoader_constructor(a, !0, createjs.AbstractLoader.SOUND)
    }
    var b = createjs.extend(c, createjs.AbstractLoader);
    c.context = null;
    b.toString = function () {
        return "[WebAudioLoader]"
    };
    b._createRequest = function () {
        this._request = new createjs.XHRRequest(this._item, !1);
        this._request.setResponseType("arraybuffer")
    };
    b._sendComplete = function () {
        c.context.decodeAudioData(this._rawResult, createjs.proxy(this._handleAudioDecoded, this), createjs.proxy(this._sendError, this))
    };
    b._handleAudioDecoded =
        function (a) {
            this._result = a;
            this.AbstractLoader__sendComplete()
        };
    createjs.WebAudioLoader = createjs.promote(c, "AbstractLoader")
})();
this.createjs = this.createjs || {};
(function () {
    function c(b, c, h, f) {
        this.AbstractSoundInstance_constructor(b, c, h, f);
        this.gainNode = a.context.createGain();
        this.panNode = a.context.createPanner();
        this.panNode.panningModel = a._panningModel;
        this.panNode.connect(this.gainNode);
        this._updatePan();
        this._sourceNodeNext = this._soundCompleteTimeout = this.sourceNode = null;
        this._playbackStartTime = 0;
        this._endedHandler = createjs.proxy(this._handleSoundComplete, this)
    }
    var b = createjs.extend(c, createjs.AbstractSoundInstance),
        a = c;
    a.context = null;
    a._scratchBuffer =
        null;
    a.destinationNode = null;
    a._panningModel = "equalpower";
    b.destroy = function () {
        this.AbstractSoundInstance_destroy();
        this.panNode.disconnect(0);
        this.panNode = null;
        this.gainNode.disconnect(0);
        this.gainNode = null
    };
    b.toString = function () {
        return "[WebAudioSoundInstance]"
    };
    b._updatePan = function () {
        this.panNode.setPosition(this._pan, 0, -.5)
    };
    b._removeLooping = function () {
        this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext)
    };
    b._addLooping = function () {
        this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._sourceNodeNext =
            this._createAndPlayAudioNode(this._playbackStartTime, 0))
    };
    b._setDurationFromSource = function () {
        this._duration = 1E3 * this.playbackResource.duration
    };
    b._handleCleanUp = function () {
        this.sourceNode && this.playState == createjs.Sound.PLAY_SUCCEEDED && (this.sourceNode = this._cleanUpAudioNode(this.sourceNode), this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext));
        0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(0);
        clearTimeout(this._soundCompleteTimeout);
        this._playbackStartTime = 0
    };
    b._cleanUpAudioNode =
        function (b) {
            if (b) {
                b.stop(0);
                b.disconnect(0);
                try {
                    b.buffer = a._scratchBuffer
                } catch (e) {}
                b = null
            }
            return b
        };
    b._handleSoundReady = function () {
        this.gainNode.connect(a.destinationNode);
        var b = .001 * this._duration,
            c = .001 * this._position;
        c > b && (c = b);
        this.sourceNode = this._createAndPlayAudioNode(a.context.currentTime - b, c);
        this._playbackStartTime = this.sourceNode.startTime - c;
        this._soundCompleteTimeout = setTimeout(this._endedHandler, 1E3 * (b - c));
        0 != this._loop && (this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime,
            0))
    };
    b._createAndPlayAudioNode = function (b, c) {
        var d = a.context.createBufferSource();
        d.buffer = this.playbackResource;
        d.connect(this.panNode);
        var e = .001 * this._duration;
        return d.startTime = b + e, d.start(d.startTime, c + .001 * this._startTime, e - c), d
    };
    b._pause = function () {
        this._position = 1E3 * (a.context.currentTime - this._playbackStartTime);
        this.sourceNode = this._cleanUpAudioNode(this.sourceNode);
        this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext);
        0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(0);
        clearTimeout(this._soundCompleteTimeout)
    };
    b._resume = function () {
        this._handleSoundReady()
    };
    b._updateVolume = function () {
        var a = this._muted ? 0 : this._volume;
        a != this.gainNode.gain.value && (this.gainNode.gain.value = a)
    };
    b._calculateCurrentPosition = function () {
        return 1E3 * (a.context.currentTime - this._playbackStartTime)
    };
    b._updatePosition = function () {
        this.sourceNode = this._cleanUpAudioNode(this.sourceNode);
        this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext);
        clearTimeout(this._soundCompleteTimeout);
        this._paused ||
            this._handleSoundReady()
    };
    b._handleLoop = function () {
        this._cleanUpAudioNode(this.sourceNode);
        this.sourceNode = this._sourceNodeNext;
        this._playbackStartTime = this.sourceNode.startTime;
        this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0);
        this._soundCompleteTimeout = setTimeout(this._endedHandler, this._duration)
    };
    b._updateDuration = function () {
        this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._pause(), this._resume())
    };
    createjs.WebAudioSoundInstance = createjs.promote(c, "AbstractSoundInstance")
})();
this.createjs = this.createjs || {};
(function () {
    function c() {
        this.AbstractPlugin_constructor();
        this._panningModel = a._panningModel;
        this.context = a.context;
        this.dynamicsCompressorNode = this.context.createDynamicsCompressor();
        this.dynamicsCompressorNode.connect(this.context.destination);
        this.gainNode = this.context.createGain();
        this.gainNode.connect(this.dynamicsCompressorNode);
        createjs.WebAudioSoundInstance.destinationNode = this.gainNode;
        this._capabilities = a._capabilities;
        this._loaderClass = createjs.WebAudioLoader;
        this._soundInstanceClass =
            createjs.WebAudioSoundInstance;
        this._addPropsToClasses()
    }
    var b = createjs.extend(c, createjs.AbstractPlugin),
        a = c;
    a._capabilities = null;
    a._panningModel = "equalpower";
    a.context = null;
    a._scratchBuffer = null;
    a._unlocked = !1;
    a.isSupported = function () {
        var b = createjs.BrowserDetect.isIOS || createjs.BrowserDetect.isAndroid || createjs.BrowserDetect.isBlackberry;
        return "file:" != location.protocol || b || this._isFileXHRSupported() ? (a._generateCapabilities(), null == a.context ? !1 : !0) : !1
    };
    a.playEmptySound = function () {
        if (null != a.context) {
            var b =

                a.context.createBufferSource();
            b.buffer = a._scratchBuffer;
            b.connect(a.context.destination);
            b.start(0, 0, 0)
        }
    };
    a._isFileXHRSupported = function () {
        var a = true,
            b = new XMLHttpRequest;
        try {
            b.open("GET", "WebAudioPluginTest.fail", !1)
        } catch (h) {
            return a = !1
        }
        b.onerror = function () {
            a = !1
        };
        b.onload = function () {
            a = 404 == this.status || 200 == this.status || 0 == this.status && "" != this.response
        };
        try {
            b.send()
        } catch (h) {
            a = !1
        }
        return a
    };
    a._generateCapabilities = function () {
        if (null == a._capabilities) {
            var b = document.createElement("audio");
            if (null ==
                b.canPlayType) return null;
            if (null == a.context)
                if (window.AudioContext) a.context = new AudioContext;
                else {
                    if (!window.webkitAudioContext) return null;
                    a.context = new webkitAudioContext
                }
            null == a._scratchBuffer && (a._scratchBuffer = a.context.createBuffer(1, 1, 22050));
            a._compatibilitySetUp();
            "ontouchstart" in window && "running" != a.context.state && (a._unlock(), document.addEventListener("mousedown", a._unlock, !0), document.addEventListener("touchend", a._unlock, !0));
            a._capabilities = {
                panning: !0,
                volume: !0,
                tracks: -1
            };
            for (var c =
                    createjs.Sound.SUPPORTED_EXTENSIONS, h = createjs.Sound.EXTENSION_MAP, f = 0, g = c.length; g > f; f++) {
                var k = c[f],
                    m = h[k] || k;
                a._capabilities[k] = "no" != b.canPlayType("audio/" + k) && "" != b.canPlayType("audio/" + k) || "no" != b.canPlayType("audio/" + m) && "" != b.canPlayType("audio/" + m)
            }
            2 > a.context.destination.numberOfChannels && (a._capabilities.panning = !1)
        }
    };
    a._compatibilitySetUp = function () {
        if (a._panningModel = "equalpower", !a.context.createGain) {
            a.context.createGain = a.context.createGainNode;
            var b = a.context.createBufferSource();
            b.__proto__.start = b.__proto__.noteGrainOn;
            b.__proto__.stop = b.__proto__.noteOff;
            a._panningModel = 0
        }
    };
    a._unlock = function () {
        a._unlocked || (a.playEmptySound(), "running" == a.context.state && (document.removeEventListener("mousedown", a._unlock, !0), document.removeEventListener("touchend", a._unlock, !0), a._unlocked = true))
    };
    b.toString = function () {
        return "[WebAudioPlugin]"
    };
    b._addPropsToClasses = function () {
        var b = this._soundInstanceClass;
        b.context = this.context;
        b._scratchBuffer = a._scratchBuffer;
        b.destinationNode = this.gainNode;
        b._panningModel = this._panningModel;
        this._loaderClass.context = this.context
    };
    b._updateVolume = function () {
        var a = createjs.Sound._masterMute ? 0 : this._volume;
        a != this.gainNode.gain.value && (this.gainNode.gain.value = a)
    };
    createjs.WebAudioPlugin = createjs.promote(c, "AbstractPlugin")
})();
this.createjs = this.createjs || {};
(function () {
    function c() {
        throw "HTMLAudioTagPool cannot be instantiated";
    }

    function b() {
        this._tags = []
    }
    c._tags = {};
    c._tagPool = new b;
    c._tagUsed = {};
    c.get = function (a) {
        var b = c._tags[a];
        return null == b ? (b = c._tags[a] = c._tagPool.get(), b.src = a) : c._tagUsed[a] ? (b = c._tagPool.get(), b.src = a) : c._tagUsed[a] = true, b
    };
    c.set = function (a, b) {
        b == c._tags[a] ? c._tagUsed[a] = !1 : c._tagPool.set(b)
    };
    c.remove = function (a) {
        var b = c._tags[a];
        return null == b ? !1 : (c._tagPool.set(b), delete c._tags[a], delete c._tagUsed[a], !0)
    };
    c.getDuration = function (a) {
        a =
            c._tags[a];
        return null != a && a.duration ? 1E3 * a.duration : 0
    };
    createjs.HTMLAudioTagPool = c;
    var a = b.prototype;
    a.constructor = b;
    a.get = function () {
        var a;
        return a = 0 == this._tags.length ? this._createTag() : this._tags.pop(), null == a.parentNode && document.body.appendChild(a), a
    };
    a.set = function (a) {
        -1 == createjs.indexOf(this._tags, a) && (this._tags.src = null, this._tags.push(a))
    };
    a.toString = function () {
        return "[TagPool]"
    };
    a._createTag = function () {
        var a = document.createElement("audio");
        return a.autoplay = !1, a.preload = "none", a
    }
})();
this.createjs = this.createjs || {};
(function () {
    function c(a, b, c, h) {
        this.AbstractSoundInstance_constructor(a, b, c, h);
        this._delayTimeoutId = this._audioSpriteStopTime = null;
        this._endedHandler = createjs.proxy(this._handleSoundComplete, this);
        this._readyHandler = createjs.proxy(this._handleTagReady, this);
        this._stalledHandler = createjs.proxy(this._playFailed, this);
        this._audioSpriteEndHandler = createjs.proxy(this._handleAudioSpriteLoop, this);
        this._loopHandler = createjs.proxy(this._handleSoundComplete, this);
        c ? this._audioSpriteStopTime = .001 * (b + c) : this._duration =
            createjs.HTMLAudioTagPool.getDuration(this.src)
    }
    var b = createjs.extend(c, createjs.AbstractSoundInstance);
    b.setMasterVolume = function () {
        this._updateVolume()
    };
    b.setMasterMute = function () {
        this._updateVolume()
    };
    b.toString = function () {
        return "[HTMLAudioSoundInstance]"
    };
    b._removeLooping = function () {
        null != this._playbackResource && (this._playbackResource.loop = !1, this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1))
    };
    b._addLooping = function () {
        null == this._playbackResource ||
            this._audioSpriteStopTime || (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1), this._playbackResource.loop = true)
    };
    b._handleCleanUp = function () {
        var a = this._playbackResource;
        if (null != a) {
            a.pause();
            a.loop = !1;
            a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1);
            a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1);
            a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1);
            a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1);
            a.removeEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1);
            try {
                a.currentTime = this._startTime
            } catch (d) {}
            createjs.HTMLAudioTagPool.set(this.src, a);
            this._playbackResource = null
        }
    };
    b._beginPlaying = function (a) {
        return this._playbackResource = createjs.HTMLAudioTagPool.get(this.src), this.AbstractSoundInstance__beginPlaying(a)
    };
    b._handleSoundReady = function () {
        if (4 !== this._playbackResource.readyState) {
            var a =
                this._playbackResource;
            return a.addEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1), a.addEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1), a.preload = "auto", void a.load()
        }
        this._updateVolume();
        this._playbackResource.currentTime = .001 * (this._startTime + this._position);
        this._audioSpriteStopTime ? this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1) : (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED,
            this._endedHandler, !1), 0 != this._loop && (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1), this._playbackResource.loop = true));
        this._playbackResource.play()
    };
    b._handleTagReady = function () {
        this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1);
        this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1);
        this._handleSoundReady()
    };
    b._pause = function () {
        this._playbackResource.pause()
    };
    b._resume = function () {
        this._playbackResource.play()
    };
    b._updateVolume = function () {
        if (null != this._playbackResource) {
            var a = this._muted || createjs.Sound._masterMute ? 0 : this._volume * createjs.Sound._masterVolume;
            a != this._playbackResource.volume && (this._playbackResource.volume = a)
        }
    };
    b._calculateCurrentPosition = function () {
        return 1E3 * this._playbackResource.currentTime - this._startTime
    };
    b._updatePosition = function () {
        this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1);
        this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, !1);
        try {
            this._playbackResource.currentTime = .001 * (this._position + this._startTime)
        } catch (a) {
            this._handleSetPositionSeek(null)
        }
    };
    b._handleSetPositionSeek = function () {
        null != this._playbackResource && (this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, !1), this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1))
    };
    b._handleAudioSpriteLoop = function () {
        this._playbackResource.currentTime <= this._audioSpriteStopTime || (this._playbackResource.pause(), 0 == this._loop ? this._handleSoundComplete(null) : (this._position = 0, this._loop--, this._playbackResource.currentTime = .001 * this._startTime, this._paused || this._playbackResource.play(), this._sendEvent("loop")))
    };
    b._handleLoop = function () {
        0 == this._loop && (this._playbackResource.loop = !1, this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1))
    };
    b._updateStartTime = function () {
        this._audioSpriteStopTime = .001 * (this._startTime + this._duration);
        this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1), this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1))
    };
    b._updateDuration = function () {
        this._audioSpriteStopTime = .001 * (this._startTime + this._duration);
        this.playState == createjs.Sound.PLAY_SUCCEEDED &&
            (this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1), this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1))
    };
    b._setDurationFromSource = function () {
        this._duration = createjs.HTMLAudioTagPool.getDuration(this.src);
        this._playbackResource = null
    };
    createjs.HTMLAudioSoundInstance = createjs.promote(c, "AbstractSoundInstance")
})();
this.createjs = this.createjs || {};
(function () {
    function c() {
        this.AbstractPlugin_constructor();
        this.defaultNumChannels = 2;
        this._capabilities = a._capabilities;
        this._loaderClass = createjs.SoundLoader;
        this._soundInstanceClass = createjs.HTMLAudioSoundInstance
    }
    var b = createjs.extend(c, createjs.AbstractPlugin),
        a = c;
    a.MAX_INSTANCES = 30;
    a._AUDIO_READY = "canplaythrough";
    a._AUDIO_ENDED = "ended";
    a._AUDIO_SEEKED = "seeked";
    a._AUDIO_STALLED = "stalled";
    a._TIME_UPDATE = "timeupdate";
    a._capabilities = null;
    a.isSupported = function () {
        return a._generateCapabilities(),
            null != a._capabilities
    };
    a._generateCapabilities = function () {
        if (null == a._capabilities) {
            var b = document.createElement("audio");
            if (null == b.canPlayType) return null;
            a._capabilities = {
                panning: !1,
                volume: !0,
                tracks: -1
            };
            for (var c = createjs.Sound.SUPPORTED_EXTENSIONS, h = createjs.Sound.EXTENSION_MAP, f = 0, g = c.length; g > f; f++) {
                var k = c[f],
                    m = h[k] || k;
                a._capabilities[k] = "no" != b.canPlayType("audio/" + k) && "" != b.canPlayType("audio/" + k) || "no" != b.canPlayType("audio/" + m) && "" != b.canPlayType("audio/" + m)
            }
        }
    };
    b.register = function (a) {
        var b =
            createjs.HTMLAudioTagPool.get(a.src);
        a = this.AbstractPlugin_register(a);
        return a.setTag(b), a
    };
    b.removeSound = function (a) {
        this.AbstractPlugin_removeSound(a);
        createjs.HTMLAudioTagPool.remove(a)
    };
    b.create = function (a, b, c) {
        a = this.AbstractPlugin_create(a, b, c);
        return a.setPlaybackResource(null), a
    };
    b.toString = function () {
        return "[HTMLAudioPlugin]"
    };
    b.setVolume = b.getVolume = b.setMute = null;
    createjs.HTMLAudioPlugin = createjs.promote(c, "AbstractPlugin")
})();

function Player(c) {
    this.json = c.json;
    this.player = {};
    this.player.id = c.playerId;
    this.player.framerate = void 0 !== c.framerate ? c.framerate : 8;
    this.player.playing = !1;
    this.player.muted = !1;
    this.player.started = !1;
    this.player.stoped = true;
    this.player.firstRun = true;
    this.player.filesAlreadyLoaded = !1;
    this.player.exitOnComplete = !1;
    this.player.delay = 1E3 * this.json.delay;
    this.player.playMuted = !1;
    this.player.thumbnail = {};
    this.player.thumbnail.src = this.PATH + this.json.video + this.THUMBNAIL_FORMAT;
    this.player.audio = {};
    this.player.audio.src =
        this.PATH + this.json.video + this.AUDIO_FORMAT;
    this.player.audio.delay = void 0 !== c.audioDelay ? c.audioDelay : 0;
    this.player.audio.volume = 1;
    this.player.spriteSheet = {};
    this.player.spriteSheet.src = this.PATH + this.json.video + this.SPRITE_FORMAT;
    this.player.spriteSheet.frames = void 0 !== c.frames ? c.frames : 224;
    this.player.spriteSheet.width = void 0 !== c.frameWidth ? c.frameWidth : 320;
    this.player.spriteSheet.height = void 0 !== c.frameHeight ? c.frameHeight : 320;
    this.el = {};
    this.el.player = document.getElementById(this.player.id);
    this.animation = {};
    this.animation.keyframeId = "play-" + this.player.id;
    this.animation.className = "animation-" + this.player.id;
    try {
        setTimeout(function () {
            this.init(c.json)
        }.bind(this), this.player.delay)
    } catch (b) {
        console.log(b), this.el.player.style.display = "none"
    }
}
Player.prototype.PATH = "wthvideo/";
Player.prototype.BUTTONS_PATH = "wthvideo/buttons/";
Player.prototype.THUMBNAIL_FORMAT = ".gif";
Player.prototype.AUDIO_FORMAT = ".wav";
Player.prototype.SPRITE_FORMAT = ".png";
Player.prototype.init = function (c) {
    this.initHtml(c);
    this.el.player.style.width = this.player.spriteSheet.width + "px";
    this.el.player.style.height = this.player.spriteSheet.height + "px";
    this.el.preloadControls.style.display = "block"
};
Player.prototype.initHtml = function (c) {
    this.el.player.style.position = "relative";
    this.el.btnCloseMini = function () {
        var a = document.createElement("img");
        a.src = this.BUTTONS_PATH + "exit.png";
        a.style.position = "absolute";
        a.style.display = "block";
        a.id = "exitMain";
        a.style.width = "16px";
        a.style.height = "16px";
        a.style.zIndex = "9999";
        a.style.top = 0;
        a.style.right = 0;
        return a
    }.call(this);
    this.el.player.appendChild(this.el.btnCloseMini);
    this.el.btnCloseMini.addEventListener("click", this.closeBtnClick.bind(this));
    this.el.thumbnail = function () {
        var a = document.createElement("div");
        a.id = this.player.id + "-thumbnail";
        a.style.backgroundImage = "url('" + this.player.thumbnail.src + "')";
        a.style.width = this.player.spriteSheet.width + "px";
        a.style.height = this.player.spriteSheet.height + "px";
        return a
    }.call(this);
    this.el.player.appendChild(this.el.thumbnail);
    this.el.preloadControls = function () {
        var a = document.createElement("div");
        a.style.position = "absolute";
        a.style.top = a.style.left = 0;
        a.style.width = "100%";
        a.style.height = "100%";
        a.id = "PreloadControl";
        return a
    }();
    this.el.player.appendChild(this.el.preloadControls);
    this.el.preloadBtn = function () {
        var a = document.createElement("div");
        a.id = "click - to-play";
        a.alt = "Click to Play";
        a.style.cursor = "pointer";
        a.style.position = "absolute";
        a.style.top = "46%";
        a.style.textAlign = "center";
        a.style.fontSize = "24px";
        a.style.fontWeight = "600";
        a.innerHTML = "Click to Play";
        a.style.padding = "12px";
        a.style.borderRadius = "12px";
        a.style.borderWidth = "2px";
        a.style.borderStyle = "solid";
        a.style.borderColor = c.click_color;
        a.style.left = (this.json.width - 160) / 2 + "px";
        a.style.margin = "auto";
        return a
    }.call(this);
    this.el.preloadControls.appendChild(this.el.preloadBtn);
    this.el.preloadBtn.addEventListener("click", this.preloadBtnClick.bind(this));
    var b = function () {
        var a = document.createElement("div");
        a.id = this.player.id + "progress";
        a.style.display = "none";
        a.style.position = "absolute";
        a.style.top = "50%";
        a.style.left = a.style.right = 0;
        a.style.margin = "0 auto";
        a.style.width = "50%";
        a.style.height = "25px";
        a.style.backgroundColor = "#555";
        a.style.borderRadius = "10px";
        a.id = this.player.id + "progress";
        var b = document.createElement("div");
        b.style.display = "block";
        b.style.height = "100%";
        b.style.width = "0%";
        b.style.borderRadius = "10px";
        a.appendChild(b);
        return {
            progress: a,
            progressValue: b
        }
    }.call(this);
    this.el.progress = b.progress;
    this.el.progressValue = b.progressValue;
    this.el.preloadControls.appendChild(this.el.progress);
    this.el.playerControls = function () {
        var a = document.createElement("div");
        a.id = "PlayerBar";
        a.style.display = "none";
        a.style.left = a.style.right = "0";
        a.style.margin = "auto";
        return a
    }();
    this.el.player.appendChild(this.el.playerControls);
    this.el.btnPlayPause = function () {
        var a = document.createElement("img");
        a.src = this.BUTTONS_PATH + "play.png";
        a.classList.add("playerBtns");
        return a
    }.call(this);
    this.el.playerControls.appendChild(this.el.btnPlayPause);
    this.el.btnPlayPause.addEventListener("click", this.playPauseBtnClick.bind(this));
    this.el.btnMuteUnmute = function () {
        var a = document.createElement("img");
        a.src = this.BUTTONS_PATH + "volume.png";
        a.classList.add("playerBtns");
        return a
    }.call(this);
    this.el.playerControls.appendChild(this.el.btnMuteUnmute);
    this.el.btnMuteUnmute.addEventListener("click", this.muteUnmuteBtnClick.bind(this));
    this.el.btnReplay = function () {
        var a = document.createElement("img");
        a.src = this.BUTTONS_PATH + "restart.png";
        a.classList.add("playerBtns");
        return a
    }.call(this);
    this.el.playerControls.appendChild(this.el.btnReplay);
    this.el.btnReplay.addEventListener("click", this.repeatBtnClick.bind(this));
    this.el.btnClose = function () {
        var a = document.createElement("img");
        a.src = this.BUTTONS_PATH + "exit.png";
        a.classList.add("playerBtns");
        return a
    }.call(this);
    this.el.playerControls.appendChild(this.el.btnClose);
    this.el.btnClose.addEventListener("click", this.closeBtnClick.bind(this));
    this.el.btnLogo = function () {
        var a = document.createElement("img");
        a.src = this.BUTTONS_PATH + "logo.png";
        a.classList.add("playerBtns");
        return a
    }.call(this);
    this.el.playerControls.appendChild(this.el.btnLogo);
    this.el.btnLogo.addEventListener("click", this.logoBtnClick.bind(this));
    for (var b = this.el.player.getElementsByClassName("playerBtns"), a = 0; a < b.length; a++) b[a].addEventListener("mouseover", function () {
        this.style.opacity = .8
    }), b[a].addEventListener("mouseout", function () {
        this.style.opacity = 1
    });
    this.setOptionsFromJson(c)
};
Player.prototype.setOptionsFromJson = function (c) {
    function b(a) {
        a = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (a, b, c, f) {
            return b + b + c + c + f + f
        });
        return (a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a)) ? parseInt(a[1], 16) + "," + parseInt(a[2], 16) + "," + parseInt(a[3], 16) : null
    }
    this.el.preloadBtn.style.backgroundColor = "rgba(" + b(c.click_color) + ", " + c.click_opacity + ")";
    this.el.preloadBtn.style.borderColor = c.click_color;
    this.el.progressValue.style.backgroundColor = c.bar_color;
    this.el.playerControls.style.borderColor =
        c.bar_color;
    this.el.playerControls.style.backgroundColor = "rgba(" + b(c.bar_color) + ", " + c.bar_opacity + ")";
    this.el.btnPlayPause.width = this.el.btnPlayPause.height = c.btn_size;
    this.el.btnReplay.width = this.el.btnReplay.height = c.btn_size;
    this.el.btnMuteUnmute.width = this.el.btnMuteUnmute.height = c.btn_size;
    this.el.btnClose.width = this.el.btnClose.height = c.btn_size;
    this.el.btnLogo.width = this.el.btnLogo.height = c.btn_size;
    this.el.playerControls.style.width = 5 * (parseInt(c.btn_size) + 4) + "px";
    this.player.exitOnComplete =
        c.exit_on_complete;
    this.player.audio.volume = c.volume;
    this.sessionMode = c.session_play;
    this.autoplay = c.autostart;
    this.hasSeen = "hasSeen" + c.video;
    this.sessionStorage = sessionStorage.getItem(this.hasSeen);
    this.localStorage = localStorage.getItem(this.hasSeen);
    switch (this.sessionMode) {
        case "Play Every Time":
            "Muted" === this.autoplay ? (this.player.playMuted = true, this.el.preloadBtn.click()) : "Yes" === this.autoplay && this.el.preloadBtn.click();
            break;
        case "Once Per Session":
            if (null !== this.sessionStorage && this.sessionStorage) throw Error("Once Per Session");
            "Muted" === this.autoplay ? (this.player.playMuted = true, this.el.preloadBtn.click()) : "Yes" === this.autoplay && this.el.preloadBtn.click();
            break;
        case "Once Only":
            if (null !== this.localStorage) throw Error("Once Only");
            "Muted" === this.autoplay ? (this.player.playMuted = true, this.el.preloadBtn.click()) : "Yes" === this.autoplay && this.el.preloadBtn.click()
    }
    sessionStorage.setItem(this.hasSeen, !0);
    localStorage.setItem(this.hasSeen, !0)
};
Player.prototype.preloadBtnClick = function () {
    this.player.filesAlreadyLoaded ? (this.player.playMuted = !1, this.unmute(), this.repeat(), this.el.player.style.animationIterationCount = "", this.el.preloadControls.style.display = "none", this.el.playerControls.style.display = "block") : this.preload()
};
Player.prototype.playPauseBtnClick = function () {
    this.player.started ? this.player.playing ? this.pause() : this.play() : this.start()
};
Player.prototype.muteUnmuteBtnClick = function () {
    this.player.muted ? this.unmute() : this.mute()
};
Player.prototype.repeatBtnClick = function () {
    this.repeat()
};
Player.prototype.closeBtnClick = function () {
    this.close()
};
Player.prototype.logoBtnClick = function () {
    window.location.href = "http://www.talkingheads.video/wix"
};
Player.prototype.initKeyframesCss = function () {
    var c = this.player.spriteSheet.width * this.player.spriteSheet.frames,
        c = "@-webkit-keyframes " + this.animation.keyframeId + "{            100% { background-position: -" + c + "px }        }        @-moz-keyframes " + this.animation.keyframeId + "{            100% { background-position: -" + c + "px }        }        @-o-keyframes " + this.animation.keyframeId + "{            100% { background-position: -" + c + "px }        }        @keyframes " + this.animation.keyframeId + "{            100% { background-position: -" +
        c + "px }        }",
        b = document.head || document.getElementsByTagName("head")[0],
        a = document.createElement("style");
    a.type = "text/css";
    a.styleSheet ? a.styleSheet.cssText = c : a.appendChild(document.createTextNode(c));
    b.appendChild(a)
};
Player.prototype.initAnimationsCss = function () {
    var c = this.player.spriteSheet.frames / this.player.framerate,
        c = "." + this.animation.className + "{                 -webkit-animation: " + this.animation.keyframeId + " " + c + "s steps(" + this.player.spriteSheet.frames + ");                    -moz-animation: " + this.animation.keyframeId + " " + c + "s steps(" + this.player.spriteSheet.frames + ");                     -ms-animation: " + this.animation.keyframeId + " " + c + "s steps(" + this.player.spriteSheet.frames + ");                      -o-animation: " +
        this.animation.keyframeId + " " + c + "s steps(" + this.player.spriteSheet.frames + ");                         animation: " + this.animation.keyframeId + " " + c + "s steps(" + this.player.spriteSheet.frames + ");}",
        b = document.head || document.getElementsByTagName("head")[0],
        a = document.createElement("style");
    a.type = "text/css";
    a.styleSheet ? a.styleSheet.cssText = c : a.appendChild(document.createTextNode(c));
    b.appendChild(a)
};
Player.prototype.startAnimation = function () {
    this.el.player.style.background = 'url("' + this.player.spriteSheet.instance.src + '")';
    this.el.player.classList.add(this.animation.className);
    this.el.player.addEventListener("animationend", this.stop.bind(this))
};
Player.prototype.stopAnimation = function () {
    this.el.player.style.background = "";
    this.el.player.classList.remove(this.animation.className)
};
Player.prototype.playAnimation = function () {
    this.el.player.style.animationPlayState = "running"
};
Player.prototype.pauseAnimation = function () {
    this.el.player.style.animationPlayState = "paused"
};
Player.prototype.start = function () {
    var c = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : !1;
    this.player.started = true;
    this.player.playing = true;
    this.player.stoped = !1;
    this.el.thumbnail.style.display = "none";
    c ? (this.el.playerControls.style.display = "none", this.el.progress.style.display = "none", this.el.preloadBtn.style.display = "block", this.el.preloadControls.style.display = "block", this.el.player.style.animationIterationCount = "infinite") : this.playAudio();
    this.startAnimation();
    this.updateBtnPlayStyle()
};
Player.prototype.play = function () {
    this.player.started = true;
    this.player.playing = true;
    this.player.stoped = !1;
    this.updateBtnPlayStyle();
    this.playAnimation();
    this.resumeAudio()
};
Player.prototype.pause = function () {
    this.player.started = true;
    this.player.playing = !1;
    this.player.stoped = !1;
    this.updateBtnPlayStyle();
    this.pauseAnimation();
    this.pauseAudio()
};
Player.prototype.repeat = function () {
    this.el.player.style.animationPlayState = "";
    this.stopAnimation();
    this.player.audio.instance.stop();
    void 0;
    setTimeout(function () {
        this.start()
    }.bind(this), 100);
    this.updateBtnPlayStyle()
};
Player.prototype.stop = function () {
    this.player.started = !1;
    this.player.playing = !1;
    this.player.stoped = true;
    this.el.thumbnail.style.display = "block";
    this.el.player.style.animationPlayState = "";
    this.stopAnimation();
    this.player.audio.instance.stop();
    this.updateBtnPlayStyle();
    this.player.exitOnComplete && this.close()
};
Player.prototype.close = function () {
    this.player.stoped || this.stopAudio();
    this.el.player.outerHTML = "";
    delete this.el.player
};
Player.prototype.updateBtnPlayStyle = function (c) {
    this.el.btnPlayPause.src = this.player.playing ? this.BUTTONS_PATH + "pause.png" : this.BUTTONS_PATH + "play.png"
};
Player.prototype.updateBtnMuteUnmuteStyle = function (c) {
    this.el.btnMuteUnmute.src = this.player.muted ? this.BUTTONS_PATH + "mute.png" : this.BUTTONS_PATH + "volume.png"
};
Player.prototype.playAudio = function () {
    this.player.audio.instance.play({
        delay: this.player.audio.delay
    })
};
Player.prototype.resumeAudio = function () {
    this.player.audio.instance.paused = !1
};
Player.prototype.pauseAudio = function () {
    this.player.audio.instance.paused = true
};
Player.prototype.stopAudio = function () {
    this.player.audio.instance.stop()
};
Player.prototype.mute = function () {
    this.player.audio.instance.muted = true;
    this.player.muted = true;
    this.updateBtnMuteUnmuteStyle()
};
Player.prototype.unmute = function () {
    this.player.audio.instance.muted = !1;
    this.player.muted = !1;
    this.updateBtnMuteUnmuteStyle()
};
Player.prototype.preload = function () {
    this.el.preloadBtn.style.display = "none";
    this.el.progress.style.display = "block";
    this.progress = 0;
    this.preload = new createjs.LoadQueue(!0);
    this.preload.installPlugin(createjs.Sound);
    this.preload.on("fileerror", this.onPreloadError, this);
    this.preload.on("error", this.onPreloadError, this);
    this.preload.on("progress", this.onPreloadProgress, this);
    this.preload.on("fileload", this.onFileLoad, this);
    this.isSriteSheetLoaded = !1;
    this.preload.loadFile({
        id: "spriteSheet",
        src: this.player.spriteSheet.src
    }, !1);
    this.isAudioLoaded = !1;
    this.preload.loadFile({
        id: "audio",
        src: this.player.audio.src
    }, !1);
    this.preload.load()
};
Player.prototype.onFileLoad = function (c) {
    c = c.item;
    "audio" == c.id && (this.isAudioLoaded = true);
    "spriteSheet" == c.id && (this.el.player.style.willChange = "background, background-position", this.isSriteSheetLoaded = true);
    if (this.isSriteSheetLoaded && this.isAudioLoaded) this.onPreloadComplete()
};
Player.prototype.onPreloadError = function () {
    this.preload.reset()
};
Player.prototype.onPreloadProgress = function (c) {
    this.progress != c.loaded && (this.progress = c.loaded, this.el.progressValue.style.width = Math.round(100 * this.progress) + "%")
};
Player.prototype.onPreloadComplete = function () {
    this.player.audio.instance = createjs.Sound.createInstance("audio");
    this.player.audio.instance.volume = this.player.audio.volume;
    var c = window.URL.createObjectURL(this.preload.getResult("spriteSheet", !0)),
        b = new Image;
    b.src = c;
    b.onload = function () {
        this.player.spriteSheet.instance = b;
        this.player.spriteSheet.frames = this.player.spriteSheet.instance.width / this.player.spriteSheet.width;
        this.initKeyframesCss();
        this.initAnimationsCss();
        this.el.preloadControls.style.display =
            "none";
        this.el.playerControls.style.display = "block";
        this.start(this.player.playMuted);
        this.player.filesAlreadyLoaded = true
    }.bind(this)
};
