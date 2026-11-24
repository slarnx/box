import {
    makeExit,
    setUsidParam
} from "./shared-VQTFJ3L2.js";
import {
    isIframePreviewBridgeActive,
    parseConfig
} from "./shared-TVKQMNYQ.js";
import "./shared-NC4XK5MX.js";
import {
    storageGet,
    storageSet
} from "./shared-7FYSZJMR.js";
var CURRENT_QUESTION_KEY = "step";

function removeUrlParameter(paramKey) {
    const url = window.location.href;
    const r = new URL(url);
    r.searchParams.delete(paramKey);
    const newUrl = r.href;
    window.history.replaceState(window.history.state, "", newUrl);
}
var getCurrentStepFromURL = (key = CURRENT_QUESTION_KEY, shouldDeleteKey = true) => {
    const url = new URL(window.location.href);
    const step = url.searchParams.get(key);
    if (shouldDeleteKey) removeUrlParameter(key);
    return step;
};
var tabUnderClick = async (config, newTabParamValue, key = CURRENT_QUESTION_KEY) => {
    if (isIframePreviewBridgeActive() && !config.tabUnderClick) return;
    const newTab = new URL(window.location.href);
    newTab.searchParams.set(key, newTabParamValue.toString());
    setUsidParam(newTab);
    await makeExit({
            ...config,
            tabUnderClick: {
                ...config.tabUnderClick,
                newTab: {
                    url: newTab.toString()
                }
            }
        },
        "tabUnderClick"
    );
    if (isIframePreviewBridgeActive()) {
        window.history.replaceState(window.history.state, "", newTab.toString());
    }
};
document.addEventListener("DOMContentLoaded", function() {
    const config = parseConfig();
    const firstScreen = document.getElementById("firstScreen");
    const finalScreen = document.getElementById("finalScreen");
    const chestSection = document.getElementById("chestSection");
    const claimBtn = document.getElementById("claimBtn");

    function showFinalScreen() {
        firstScreen == null ? void 0 : firstScreen.classList.remove("active");
        finalScreen == null ? void 0 : finalScreen.classList.add("active");
    }
    const savedStep = storageGet("session", "luck-chest-step");
    if (savedStep === "finalScreen" || getCurrentStepFromURL(CURRENT_QUESTION_KEY, false) === "1") {
        showFinalScreen();
    }
    chestSection == null ? void 0 : chestSection.addEventListener("click", function() {
        var _a;
        storageSet("session", "luck-chest-step", "finalScreen");
        showFinalScreen();
        if ((_a = config.tabUnderClick) == null ? void 0 : _a.currentTab) tabUnderClick(config, "1");
    });
    claimBtn == null ? void 0 : claimBtn.addEventListener("click", function() {
        makeExit(config, "mainExit");
    });
});