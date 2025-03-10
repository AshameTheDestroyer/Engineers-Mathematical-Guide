interface HTMLElement {

    /** Searches for all elements that can be focused throughout a keyboard, and returns them. */
    getFocusableElements(): Array<HTMLElement>;
}

HTMLElement.prototype.getFocusableElements = function (): Array<HTMLElement> {
    return Array.from((this as HTMLElement).querySelectorAll(
        "*:is(a[href], button, input, textarea, select, details, *[tabindex])" +
        ":not([tabindex=\"-1\"]):not([disabled]):not([aria-hidden])")
    );
}