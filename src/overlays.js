/**
 * A collection of methods to work with overlays.
 * 
 * @property {function(element: HTMLElement, options: object): HTMLDivElement} createFor (see the code inside for documentation)
 * @property {object} createFor.defaultOptions (see the code inside for documentation)
 * @property {function(element: HTMLElement): number} removeAllFor (see the code inside for documentation)
 */
const overlays = (() => {

    /* global document, window */

    const overlays = {};

    const overlayMap = new WeakMap();

    function registerOverlay(element, overlay) {
        if (!overlayMap.has(element)) {
            overlayMap.set(element, new Set([overlay]));
        } else {
            overlayMap.get(element).add(overlay);
        }
    }

    /**
     * Create an overlay div covering the given element and returns it, so you can add styles or
     * do something else. Automatically detects the given element's z-index and copies it, to ensure
     * that the overlay gets above the element.
     * 
     * @param {HTMLElement | string} element The element, or a query selector for it.
     * @param {object} [options] An object with options. See `overlays.createFor.defaultOptions` to learn more.
     * 
     * @return {HTMLDivElement} The created overlay
     */
    overlays.createFor = function(element, options) {
        options = Object.assign({}, options || {}, overlays.createFor.defaultOptions);
        if (typeof element === "string") element = document.querySelector(element);
        const rect = element.getBoundingClientRect();
        const overlay = document.createElement("div");
        overlay.style.width = (rect.right - rect.left) + "px";
        overlay.style.height = (rect.bottom - rect.top) + "px";
        overlay.style.position = "absolute";
        overlay.style.top = rect.top + "px";
        overlay.style.left = rect.left + "px";
        overlay.style.zIndex = window.getComputedStyle(element).zIndex;
        overlay.className = options.classNames;
        document.documentElement.appendChild(overlay);
        registerOverlay(element, overlay);
        return overlay;
    };

    /**
     * The default options to be used by `overlays.createFor`.
     * 
     * @type {object}
     * 
     * @property {string | Array<string>} classNames CSS classes to apply on the element. This can be an array of class names or a string of space-separated class names.
     */
    overlays.createFor.defaultOptions = {
        classNames: "overlay"
    };

    /**
     * Remove all overlays present in the given element.
     * 
     * @param {HTMLElement | string} element The element, or a query selector for it.
     * 
     * @return {number} The amount of removed overlays
     */
    overlays.removeAllFor = function(element) {
        if (typeof element === "string") element = document.querySelector(element);
        if (!overlayMap.has(element)) return 0;
        const amount = overlayMap.get(element).size;
        for (const overlay of overlayMap.get(element)) {
            overlay.remove();
        }
        return amount;
    };

    return overlays;

})();

/* test */ module.exports = {
    snippet: overlays,
    snippetName: "overlays",
    snippetTest: t => {
        t.pass();
    }
};