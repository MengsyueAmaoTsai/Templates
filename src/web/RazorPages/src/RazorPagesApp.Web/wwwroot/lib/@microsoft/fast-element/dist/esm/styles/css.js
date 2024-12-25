import { isFunction, isString } from "../interfaces.js";
import { Binding } from "../binding/binding.js";
import { oneWay } from "../binding/one-way.js";
import { CSSDirective } from "./css-directive.js";
import { ElementStyles } from "./element-styles.js";
import { CSSBindingDirective } from "./css-binding-directive.js";
const marker = `${Math.random().toString(36).substring(2, 8)}`;
let varId = 0;
const nextCSSVariable = () => `--v${marker}${++varId}`;
function collectStyles(strings, values) {
    const styles = [];
    let cssString = "";
    const behaviors = [];
    const add = (behavior) => {
        behaviors.push(behavior);
    };
    for (let i = 0, ii = strings.length - 1; i < ii; ++i) {
        cssString += strings[i];
        let value = values[i];
        if (isFunction(value)) {
            value = new CSSBindingDirective(oneWay(value), nextCSSVariable()).createCSS(add);
        }
        else if (value instanceof Binding) {
            value = new CSSBindingDirective(value, nextCSSVariable()).createCSS(add);
        }
        else if (CSSDirective.getForInstance(value) !== void 0) {
            value = value.createCSS(add);
        }
        if (value instanceof ElementStyles || value instanceof CSSStyleSheet) {
            if (cssString.trim() !== "") {
                styles.push(cssString);
                cssString = "";
            }
            styles.push(value);
        }
        else {
            cssString += value;
        }
    }
    cssString += strings[strings.length - 1];
    if (cssString.trim() !== "") {
        styles.push(cssString);
    }
    return {
        styles,
        behaviors,
    };
}
/**
 * Transforms a template literal string into styles.
 * @param strings - The string fragments that are interpolated with the values.
 * @param values - The values that are interpolated with the string fragments.
 * @remarks
 * The css helper supports interpolation of strings and ElementStyle instances.
 * @public
 */
export const css = ((strings, ...values) => {
    const { styles, behaviors } = collectStyles(strings, values);
    const elementStyles = new ElementStyles(styles);
    return behaviors.length ? elementStyles.withBehaviors(...behaviors) : elementStyles;
});
class CSSPartial {
    constructor(styles, behaviors) {
        this.behaviors = behaviors;
        this.css = "";
        const stylesheets = styles.reduce((accumulated, current) => {
            if (isString(current)) {
                this.css += current;
            }
            else {
                accumulated.push(current);
            }
            return accumulated;
        }, []);
        if (stylesheets.length) {
            this.styles = new ElementStyles(stylesheets);
        }
    }
    createCSS(add) {
        this.behaviors.forEach(add);
        if (this.styles) {
            add(this);
        }
        return this.css;
    }
    addedCallback(controller) {
        controller.addStyles(this.styles);
    }
    removedCallback(controller) {
        controller.removeStyles(this.styles);
    }
}
CSSDirective.define(CSSPartial);
css.partial = (strings, ...values) => {
    const { styles, behaviors } = collectStyles(strings, values);
    return new CSSPartial(styles, behaviors);
};
