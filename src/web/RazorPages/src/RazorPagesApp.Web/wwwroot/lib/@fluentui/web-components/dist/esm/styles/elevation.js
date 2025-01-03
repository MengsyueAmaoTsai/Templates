import { DesignToken } from '@microsoft/fast-foundation';
/**
 * Define shadow algorithms.
 *
 * TODO: The --background-luminance will need to be derived from JavaScript. For now
 * this is hard-coded to a 1, the relative luminance of pure white.
 * https://github.com/microsoft/fast/issues/2778
 * opacity was `calc(.11 * (2 - var(--background-luminance, 1)))`
 *
 * @internal
 * @deprecated Use elevationShadow design token
 */
export const ambientShadow = '0 0 2px rgba(0, 0, 0, 0.14)';
/**
 * @internal
 * @deprecated Use elevationShadow design token
 */
export const directionalShadow = '0 calc(var(--elevation) * 0.5px) calc((var(--elevation) * 1px)) rgba(0, 0, 0, 0.2)';
/**
 * Applies the box-shadow CSS rule set to the elevation formula.
 * Control this formula with the --elevation CSS Custom Property
 * by setting --elevation to a number.
 *
 * @public
 * @deprecated Use elevationShadow design token
 */
export const elevation = `box-shadow: ${ambientShadow}, ${directionalShadow};`;
/**
 * @public
 */
export const elevationShadowRecipe = DesignToken.create({
    name: 'elevation-shadow',
    cssCustomPropertyName: null,
}).withDefault({
    evaluate: (element, size, reference) => {
        let ambientOpacity = 0.12;
        let directionalOpacity = 0.14;
        if (size > 16) {
            ambientOpacity = 0.2;
            directionalOpacity = 0.24;
        }
        const ambient = `0 0 2px rgba(0, 0, 0, ${ambientOpacity})`;
        const directional = `0 calc(${size} * 0.5px) calc((${size} * 1px)) rgba(0, 0, 0, ${directionalOpacity})`;
        return `${ambient}, ${directional}`;
    },
});
/** @public */
export const elevationShadowCardRestSize = DesignToken.create('elevation-shadow-card-rest-size').withDefault(4);
/** @public */
export const elevationShadowCardHoverSize = DesignToken.create('elevation-shadow-card-hover-size').withDefault(8);
/** @public */
export const elevationShadowCardActiveSize = DesignToken.create('elevation-shadow-card-active-size').withDefault(0);
/** @public */
export const elevationShadowCardFocusSize = DesignToken.create('elevation-shadow-card-focus-size').withDefault(8);
/** @public */
export const elevationShadowCardRest = DesignToken.create('elevation-shadow-card-rest').withDefault((element) => elevationShadowRecipe.getValueFor(element).evaluate(element, elevationShadowCardRestSize.getValueFor(element)));
/** @public */
export const elevationShadowCardHover = DesignToken.create('elevation-shadow-card-hover').withDefault((element) => elevationShadowRecipe.getValueFor(element).evaluate(element, elevationShadowCardHoverSize.getValueFor(element)));
/** @public */
export const elevationShadowCardActive = DesignToken.create('elevation-shadow-card-active').withDefault((element) => elevationShadowRecipe.getValueFor(element).evaluate(element, elevationShadowCardActiveSize.getValueFor(element)));
/** @public */
export const elevationShadowCardFocus = DesignToken.create('elevation-shadow-card-focus').withDefault((element) => elevationShadowRecipe.getValueFor(element).evaluate(element, elevationShadowCardFocusSize.getValueFor(element)));
/** @public */
export const elevationShadowTooltipSize = DesignToken.create('elevation-shadow-tooltip-size').withDefault(16);
/** @public */
export const elevationShadowTooltip = DesignToken.create('elevation-shadow-tooltip').withDefault((element) => elevationShadowRecipe.getValueFor(element).evaluate(element, elevationShadowTooltipSize.getValueFor(element)));
/** @public */
export const elevationShadowFlyoutSize = DesignToken.create('elevation-shadow-flyout-size').withDefault(32);
/** @public */
export const elevationShadowFlyout = DesignToken.create('elevation-shadow-flyout').withDefault((element) => elevationShadowRecipe.getValueFor(element).evaluate(element, elevationShadowFlyoutSize.getValueFor(element)));
/** @public */
export const elevationShadowDialogSize = DesignToken.create('elevation-shadow-dialog-size').withDefault(128);
/** @public */
export const elevationShadowDialog = DesignToken.create('elevation-shadow-dialog').withDefault((element) => elevationShadowRecipe.getValueFor(element).evaluate(element, elevationShadowDialogSize.getValueFor(element)));
