import { Accordion } from '@microsoft/fast-foundation';
import { AccordionItem } from '@microsoft/fast-foundation';
import { AccordionItemOptions } from '@microsoft/fast-foundation';
import { Anchor as Anchor_2 } from '@microsoft/fast-foundation';
import { AnchoredRegion } from '@microsoft/fast-foundation';
import { Badge as Badge_2 } from '@microsoft/fast-foundation';
import { BaseProgress } from '@microsoft/fast-foundation';
import { Behavior } from '@microsoft/fast-element';
import { Breadcrumb } from '@microsoft/fast-foundation';
import { BreadcrumbItem } from '@microsoft/fast-foundation';
import { BreadcrumbItemOptions } from '@microsoft/fast-foundation';
import { Button as Button_2 } from '@microsoft/fast-foundation';
import { CalendarOptions } from '@microsoft/fast-foundation';
import { Card as Card_2 } from '@microsoft/fast-foundation';
import { CheckboxOptions } from '@microsoft/fast-foundation';
import { Combobox as Combobox_2 } from '@microsoft/fast-foundation';
import { ComboboxOptions } from '@microsoft/fast-foundation';
import { Constructable } from '@microsoft/fast-element';
import type { Container } from '@microsoft/fast-foundation';
import { CSSDesignToken } from '@microsoft/fast-foundation';
import { CSSDirective } from '@microsoft/fast-element';
import { DataGrid } from '@microsoft/fast-foundation';
import { DataGridCell } from '@microsoft/fast-foundation';
import { DataGridRow } from '@microsoft/fast-foundation';
import { DesignSystem } from '@microsoft/fast-foundation';
import { DesignToken } from '@microsoft/fast-foundation';
import { Dialog } from '@microsoft/fast-foundation';
import { Direction } from '@microsoft/fast-web-utilities';
import { Divider } from '@microsoft/fast-foundation';
import { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { ElementStyles } from '@microsoft/fast-element';
import { FASTElement } from '@microsoft/fast-element';
import { Flipper } from '@microsoft/fast-foundation';
import { FlipperOptions } from '@microsoft/fast-foundation';
import { FoundationElement } from '@microsoft/fast-foundation';
import { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { HorizontalScroll as HorizontalScroll_2 } from '@microsoft/fast-foundation';
import { HorizontalScrollOptions } from '@microsoft/fast-foundation';
import { Listbox as Listbox_2 } from '@microsoft/fast-foundation';
import { ListboxOption } from '@microsoft/fast-foundation';
import { Menu as Menu_2 } from '@microsoft/fast-foundation';
import { MenuItem } from '@microsoft/fast-foundation';
import { MenuItemOptions } from '@microsoft/fast-foundation';
import { NumberField as NumberField_2 } from '@microsoft/fast-foundation';
import { NumberFieldOptions } from '@microsoft/fast-foundation';
import { OverrideFoundationElementDefinition } from '@microsoft/fast-foundation';
import { ProgressOptions } from '@microsoft/fast-foundation';
import { ProgressRingOptions } from '@microsoft/fast-foundation';
import { Radio } from '@microsoft/fast-foundation';
import { RadioGroup } from '@microsoft/fast-foundation';
import { RadioOptions } from '@microsoft/fast-foundation';
import { Search as Search_2 } from '@microsoft/fast-foundation';
import { SearchOptions } from '@microsoft/fast-foundation';
import { Select as Select_2 } from '@microsoft/fast-foundation';
import { SelectOptions } from '@microsoft/fast-foundation';
import { Skeleton } from '@microsoft/fast-foundation';
import { Slider } from '@microsoft/fast-foundation';
import { SliderLabel } from '@microsoft/fast-foundation';
import { SliderOptions } from '@microsoft/fast-foundation';
import { Switch } from '@microsoft/fast-foundation';
import { SwitchOptions } from '@microsoft/fast-foundation';
import { Tab } from '@microsoft/fast-foundation';
import { TabPanel } from '@microsoft/fast-foundation';
import { Tabs } from '@microsoft/fast-foundation';
import { TextArea as TextArea_2 } from '@microsoft/fast-foundation';
import { TextField as TextField_2 } from '@microsoft/fast-foundation';
import { Toolbar as Toolbar_2 } from '@microsoft/fast-foundation';
import { Tooltip as Tooltip_2 } from '@microsoft/fast-foundation';
import { TreeItem } from '@microsoft/fast-foundation';
import { TreeItemOptions } from '@microsoft/fast-foundation';
import { TreeView } from '@microsoft/fast-foundation';
import { ViewTemplate } from '@microsoft/fast-element';

/** @public */
export declare const accentBaseColor: CSSDesignToken<Swatch>;

/**
 * @internal
 */
export declare const AccentButtonStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition, interactivitySelector: string, nonInteractivitySelector?: string) => ElementStyles;

/** @public */
export declare const accentFillActive: CSSDesignToken<Swatch>;

/** @public */
export declare const accentFillActiveDelta: DesignToken<number>;

/** @public */
export declare const accentFillFocus: CSSDesignToken<Swatch>;

/** @public */
export declare const accentFillFocusDelta: DesignToken<number>;

/** @public */
export declare const accentFillHover: CSSDesignToken<Swatch>;

/** @public */
export declare const accentFillHoverDelta: DesignToken<number>;

/** @public */
export declare const accentFillRecipe: DesignToken<InteractiveColorRecipe>;

/** @public */
export declare const accentFillRest: CSSDesignToken<Swatch>;

/** @public */
export declare const accentFillRestDelta: DesignToken<number>;

/** @public */
export declare const accentForegroundActive: CSSDesignToken<Swatch>;

/** @public */
export declare const accentForegroundActiveDelta: DesignToken<number>;

/** @public @deprecated Use foregroundOnAccentRest */
export declare const accentForegroundCut: CSSDesignToken<Swatch>;

/** @public @deprecated Use foregroundOnAccentRestLarge */
export declare const accentForegroundCutLarge: CSSDesignToken<Swatch>;

/** @public */
export declare const accentForegroundFocus: CSSDesignToken<Swatch>;

/** @public */
export declare const accentForegroundFocusDelta: DesignToken<number>;

/** @public */
export declare const accentForegroundHover: CSSDesignToken<Swatch>;

/** @public */
export declare const accentForegroundHoverDelta: DesignToken<number>;

/** @public */
export declare const accentForegroundRecipe: DesignToken<InteractiveColorRecipe>;

/** @public */
export declare const accentForegroundRest: CSSDesignToken<Swatch>;

/** @public */
export declare const accentForegroundRestDelta: DesignToken<number>;

/** @public */
export declare const accentPalette: DesignToken<Palette<Swatch>>;

/** @public */
export declare const accentStrokeControlActive: CSSDesignToken<Swatch>;

/** @public */
export declare const accentStrokeControlFocus: CSSDesignToken<Swatch>;

/** @public */
export declare const accentStrokeControlHover: CSSDesignToken<Swatch>;

/** @public */
export declare const accentStrokeControlRecipe: DesignToken<InteractiveColorRecipe>;

/** @public */
export declare const accentStrokeControlRest: CSSDesignToken<Swatch>;

export { Accordion }

export { AccordionItem }

/**
 * Styles for AccordionItem
 * @public
 */
export declare const accordionItemStyles: (context: ElementDefinitionContext, definition: AccordionItemOptions) => ElementStyles;

/**
 * Styles for Accordion
 * @public
 */
export declare const accordionStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/**
 * All Fluent UI Web Components
 * @public
 */
export declare const allComponents: {
    fluentAccordion: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Accordion>;
    fluentAccordionItem: (overrideDefinition?: OverrideFoundationElementDefinition<AccordionItemOptions> | undefined) => FoundationElementRegistry<AccordionItemOptions, Constructable<FoundationElement>>;
    fluentAnchor: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, Anchor>;
    fluentAnchoredRegion: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof AnchoredRegion>;
    fluentBadge: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, Badge>;
    fluentBreadcrumb: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Breadcrumb>;
    fluentBreadcrumbItem: (overrideDefinition?: OverrideFoundationElementDefinition<BreadcrumbItemOptions> | undefined) => FoundationElementRegistry<BreadcrumbItemOptions, Constructable<FoundationElement>>;
    fluentButton: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, Button>;
    fluentCalendar: (overrideDefinition?: OverrideFoundationElementDefinition<CalendarOptions> | undefined) => FoundationElementRegistry<CalendarOptions, Constructable<FoundationElement>>;
    fluentCard: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, Card>;
    fluentCheckbox: (overrideDefinition?: OverrideFoundationElementDefinition<CheckboxOptions> | undefined) => FoundationElementRegistry<CheckboxOptions, Constructable<FoundationElement>>;
    fluentCombobox: (overrideDefinition?: OverrideFoundationElementDefinition<ComboboxOptions> | undefined) => FoundationElementRegistry<ComboboxOptions, Constructable<FoundationElement>>;
    fluentDataGrid: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof DataGrid>;
    fluentDataGridCell: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, DataGridCell>;
    fluentDataGridRow: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, DataGridRow>;
    fluentDesignSystemProvider: (overrideDefinition?: OverrideFoundationElementDefinition<    {
    baseName: string;
    template: ViewTemplate<any, any>;
    styles: ElementStyles;
    }> | undefined) => FoundationElementRegistry<    {
    baseName: string;
    template: ViewTemplate<any, any>;
    styles: ElementStyles;
    }, DesignSystemProvider>;
    fluentDialog: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Dialog>;
    fluentDivider: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Divider>;
    fluentFlipper: (overrideDefinition?: OverrideFoundationElementDefinition<FlipperOptions> | undefined) => FoundationElementRegistry<FlipperOptions, Constructable<FoundationElement>>;
    fluentHorizontalScroll: (overrideDefinition?: OverrideFoundationElementDefinition<HorizontalScrollOptions> | undefined) => FoundationElementRegistry<HorizontalScrollOptions, Constructable<FoundationElement>>;
    fluentListbox: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, Listbox>;
    fluentOption: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof ListboxOption>;
    fluentMenu: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, Menu>;
    fluentMenuItem: (overrideDefinition?: OverrideFoundationElementDefinition<MenuItemOptions> | undefined) => FoundationElementRegistry<MenuItemOptions, Constructable<FoundationElement>>;
    fluentNumberField: (overrideDefinition?: OverrideFoundationElementDefinition<NumberFieldOptions> | undefined) => FoundationElementRegistry<NumberFieldOptions, Constructable<FoundationElement>>;
    fluentProgress: (overrideDefinition?: OverrideFoundationElementDefinition<ProgressOptions> | undefined) => FoundationElementRegistry<ProgressOptions, Constructable<FoundationElement>>;
    fluentProgressRing: (overrideDefinition?: OverrideFoundationElementDefinition<ProgressRingOptions> | undefined) => FoundationElementRegistry<ProgressRingOptions, Constructable<FoundationElement>>;
    fluentRadio: (overrideDefinition?: OverrideFoundationElementDefinition<RadioOptions> | undefined) => FoundationElementRegistry<RadioOptions, Constructable<FoundationElement>>;
    fluentRadioGroup: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof RadioGroup>;
    fluentSearch: (overrideDefinition?: OverrideFoundationElementDefinition<SearchOptions> | undefined) => FoundationElementRegistry<SearchOptions, Constructable<FoundationElement>>;
    fluentSelect: (overrideDefinition?: OverrideFoundationElementDefinition<SelectOptions> | undefined) => FoundationElementRegistry<SelectOptions, Constructable<FoundationElement>>;
    fluentSkeleton: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Skeleton>;
    fluentSlider: (overrideDefinition?: OverrideFoundationElementDefinition<SliderOptions> | undefined) => FoundationElementRegistry<SliderOptions, Constructable<FoundationElement>>;
    fluentSliderLabel: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof SliderLabel>;
    fluentSwitch: (overrideDefinition?: OverrideFoundationElementDefinition<SwitchOptions> | undefined) => FoundationElementRegistry<SwitchOptions, Constructable<FoundationElement>>;
    fluentTabs: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Tabs>;
    fluentTab: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, Tab>;
    fluentTabPanel: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, TabPanel>;
    fluentTextArea: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, TextArea>;
    fluentTextField: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, TextField>;
    fluentToolbar: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, Toolbar>;
    fluentTooltip: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, Tooltip>;
    fluentTreeView: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof TreeView>;
    fluentTreeItem: (overrideDefinition?: OverrideFoundationElementDefinition<TreeItemOptions> | undefined) => FoundationElementRegistry<TreeItemOptions, Constructable<FoundationElement>>;
    register(container?: Container, ...rest: any[]): void;
};

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
export declare const ambientShadow = "0 0 2px rgba(0, 0, 0, 0.14)";

/**
 * The Fluent version of Anchor
 * @internal
 */
export declare class Anchor extends Anchor_2 {
    /**
     * The appearance the anchor should have.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    appearance?: AnchorAppearance;
    appearanceChanged(oldValue: AnchorAppearance, newValue: AnchorAppearance): void;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * Applies 'icon-only' class when there is only an SVG in the default slot
     *
     * @internal
     */
    defaultSlottedContentChanged(): void;
}

/**
 * Types of anchor appearance.
 * @public
 */
export declare type AnchorAppearance = ButtonAppearance | 'hypertext';

export { AnchoredRegion }

/**
 * Styles for AnchoredRegion
 * @public
 */
export declare const anchoredRegionStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/**
 * Styles for Anchor
 * @public
 */
export declare const anchorStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/**
 * The Fluent Badge class
 * @internal
 */
export declare class Badge extends Badge_2 {
    appearance: BadgeAppearance;
    private appearanceChanged;
}

/**
 * Badge appearance options.
 * @public
 */
export declare type BadgeAppearance = 'accent' | 'lightweight' | 'neutral' | string;

/**
 * Styles for Badge
 * @public
 */
export declare const badgeStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/**
 * The base styles for button controls, without `appearance` visual differences.
 *
 * @internal
 */
export declare const baseButtonStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition, interactivitySelector: string, nonInteractivitySelector?: string) => ElementStyles;

/** @public */
export declare const baseHeightMultiplier: CSSDesignToken<number>;

/** @public */
export declare const baseHorizontalSpacingMultiplier: CSSDesignToken<number>;

/**
 * The base styles for input controls, without `appearance` visual differences.
 *
 * @internal
 */
export declare const baseInputStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition, logicalControlSelector: string) => ElementStyles;

/** @public */
export declare const baseLayerLuminance: CSSDesignToken<number>;

/** @public */
export declare const bodyFont: CSSDesignToken<string>;

export { Breadcrumb }

export { BreadcrumbItem }

/**
 * Styles for BreadcrumbItem
 * @public
 */
export declare const breadcrumbItemStyles: (context: ElementDefinitionContext, definition: BreadcrumbItemOptions) => ElementStyles;

/**
 * Styles for Breadcrumb
 * @public
 */
export declare const breadcrumbStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/**
 * The Fluent button class
 * @internal
 */
export declare class Button extends Button_2 {
    /**
     * The appearance the button should have.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    appearance: ButtonAppearance;
    appearanceChanged(oldValue: ButtonAppearance, newValue: ButtonAppearance): void;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * Applies 'icon-only' class when there is only an SVG in the default slot
     *
     * @internal
     */
    defaultSlottedContentChanged(): void;
}

/**
 * Types of button appearance.
 * @public
 */
export declare type ButtonAppearance = 'accent' | 'lightweight' | 'neutral' | 'outline' | 'stealth';

/**
 * Styles for Button
 * @public
 */
export declare const buttonStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/**
 * @public
 */
export declare class Card extends Card_2 {
    /**
     * Fill color for the card component. Sets context for the design system.
     *
     * Updates the neutral palette and sets the card to the source color. For tinting use neutral-palette-source instead.
     * @public
     * @remarks
     * HTML Attribute: card-fill-color
     */
    cardFillColor: string;
    private cardFillColorChanged;
    /**
     * Neutral palette source color for the card component. Sets context for the design system.
     *
     * This allows for tinting the card while maintaining the light or dark context. For a fixed color use card-fill-color instead.
     * @public
     * @remarks
     * HTML Attribute: neutral-palette-source
     */
    neutralPaletteSource: string;
    private neutralPaletteSourceChanged;
    /**
     * @internal
     */
    handleChange(source: any, propertyName: string): void;
    connectedCallback(): void;
}

/**
 * Styles for Card
 * @public
 */
export declare const cardStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/**
 * Styles for Checkbox
 * @public
 */
export declare const checkboxStyles: (context: ElementDefinitionContext, definition: CheckboxOptions) => ElementStyles;

/** @public */
export declare interface ColorRecipe {
    evaluate(element: HTMLElement, reference?: Swatch): Swatch;
}

/**
 * The Fluent combobox class
 * @internal
 */
export declare class Combobox extends Combobox_2 {
    /**
     * The appearance of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    appearance: ComboboxAppearance;
    /**
     * @internal
     */
    appearanceChanged(oldValue: ComboboxAppearance, newValue: ComboboxAppearance): void;
    /**
     * @internal
     */
    connectedCallback(): void;
}

/**
 * Combobox appearances
 * @public
 */
export declare type ComboboxAppearance = 'filled' | 'outline';

/**
 * Styles for combobox
 * @public
 */
export declare const comboboxStyles: (context: ElementDefinitionContext, definition: ComboboxOptions) => ElementStyles;

/** @public */
export declare const controlCornerRadius: CSSDesignToken<number>;

/** @public @deprecated Use controlCornerRadius */
export declare const cornerRadius: CSSDesignToken<number>;

/**
 * Creates a PaletteRGB from input R, G, B color values.
 * @param r - Red value represented as a number between 0 and 1.
 * @param g - Green value represented as a number between 0 and 1.
 * @param b - Blue value represented as a number between 0 and 1.
 */
declare function create(r: number, g: number, b: number): PaletteRGB;

/**
 * Creates a PaletteRGB from a source SwatchRGB object.
 * @deprecated - Use PaletteRGB.from()
 */
declare function create(source: SwatchRGB): PaletteRGB;

export { DataGrid }

export { DataGridCell }

/**
 * Styles for DataGrid cell
 * @public
 */
export declare const dataGridCellStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

export { DataGridRow }

/**
 * Styles for DataGrid row
 * @public
 */
export declare const dataGridRowStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/**
 * Styles for DataGrid
 * @public
 */
export declare const dataGridStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/** @public */
export declare const density: CSSDesignToken<number>;

/**
 * The Fluent DesignSystemProvider Element.
 * @public
 */
export declare class DesignSystemProvider extends FoundationElement {
    constructor();
    connectedCallback(): void;
    /**
     * Used to instruct the FluentDesignSystemProvider
     * that it should not set the CSS
     * background-color and color properties
     *
     * @remarks
     * HTML boolean attribute: no-paint
     */
    noPaint: boolean;
    private noPaintChanged;
    /**
     * Define design system property attributes
     * @remarks
     * HTML attribute: fill-color
     *
     * CSS custom property: --fill-color
     */
    fillColor: Swatch;
    /**
     * A convenience to recreate the accentPalette
     * @remarks
     * HTML attribute: accent-base-color
     */
    accentBaseColor: Swatch;
    /**
     * A convenience to recreate the neutralPalette
     * @remarks
     * HTML attribute: neutral-base-color
     */
    neutralBaseColor: Swatch;
    /**
     *
     * The density offset, used with designUnit to calculate height and spacing.
     *
     * @remarks
     * HTML attribute: density
     *
     * CSS custom property: --density
     */
    density: number;
    /**
     * The grid-unit that UI dimensions are derived from in pixels.
     *
     * @remarks
     * HTML attribute: design-unit
     *
     * CSS custom property: --design-unit
     */
    designUnit: number;
    /**
     * The primary document direction.
     *
     * @remarks
     * HTML attribute: direction
     *
     * CSS custom property: N/A
     */
    direction: Direction;
    /**
     * The number of designUnits used for component height at the base density.
     *
     * @remarks
     * HTML attribute: base-height-multiplier
     *
     * CSS custom property: --base-height-multiplier
     */
    baseHeightMultiplier: number;
    /**
     * The number of designUnits used for horizontal spacing at the base density.
     *
     * @remarks
     * HTML attribute: base-horizontal-spacing-multiplier
     *
     * CSS custom property: --base-horizontal-spacing-multiplier
     */
    baseHorizontalSpacingMultiplier: number;
    /**
     * The corner radius applied to controls.
     *
     * @remarks
     * HTML attribute: control-corner-radius
     *
     * CSS custom property: --control-corner-radius
     */
    controlCornerRadius: number;
    /**
     * The corner radius applied to layers.
     *
     * @remarks
     * HTML attribute: layer-corner-radius
     *
     * CSS custom property: --layer-corner-radius
     */
    layerCornerRadius: number;
    /**
     * The width of the standard stroke applied to stroke components in pixels.
     *
     * @remarks
     * HTML attribute: stroke-width
     *
     * CSS custom property: --stroke-width
     */
    strokeWidth: number;
    /**
     * The width of the standard focus stroke in pixels.
     *
     * @remarks
     * HTML attribute: focus-stroke-width
     *
     * CSS custom property: --focus-stroke-width
     */
    focusStrokeWidth: number;
    /**
     * The opacity of a disabled control.
     *
     * @remarks
     * HTML attribute: disabled-opacity
     *
     * CSS custom property: --disabled-opacity
     */
    disabledOpacity: number;
    /**
     * The font-size two steps below the base font-size
     *
     * @remarks
     * HTML attribute: type-ramp-minus-2-font-size
     *
     * CSS custom property: --type-ramp-minus-2-font-size
     */
    typeRampMinus2FontSize: string;
    /**
     * The line-height two steps below the base line-height
     *
     * @remarks
     * HTML attribute: type-ramp-minus-2-line-height
     *
     * CSS custom property: --type-ramp-minus-2-line-height
     */
    typeRampMinus2LineHeight: string;
    /**
     * The font-size one step below the base font-size
     *
     * @remarks
     * HTML attribute: type-ramp-minus-1-font-size
     *
     * CSS custom property: --type-ramp-minus-1-font-size
     */
    typeRampMinus1FontSize: string;
    /**
     * The line-height one step below the base line-height
     *
     * @remarks
     * HTML attribute: type-ramp-minus-1-line-height
     *
     * CSS custom property: --type-ramp-minus-1-line-height
     */
    typeRampMinus1LineHeight: string;
    /**
     * The base font-size of the relative type-ramp scale
     *
     * @remarks
     * HTML attribute: type-ramp-base-font-size
     *
     * CSS custom property: --type-ramp-base-font-size
     */
    typeRampBaseFontSize: string;
    /**
     * The base line-height of the relative type-ramp scale
     *
     * @remarks
     * HTML attribute: type-ramp-base-line-height
     *
     * CSS custom property: --type-ramp-base-line-height
     */
    typeRampBaseLineHeight: string;
    /**
     * The font-size one step above the base font-size
     *
     * @remarks
     * HTML attribute: type-ramp-plus-1-font-size
     *
     * CSS custom property: --type-ramp-plus-1-font-size
     */
    typeRampPlus1FontSize: string;
    /**
     * The line-height one step above the base line-height
     *
     * @remarks
     * HTML attribute: type-ramp-plus-1-line-height
     *
     * CSS custom property: --type-ramp-plus-1-line-height
     */
    typeRampPlus1LineHeight: string;
    /**
     * The font-size two steps above the base font-size
     *
     * @remarks
     * HTML attribute: type-ramp-plus-2-font-size
     *
     * CSS custom property: --type-ramp-plus-2-font-size
     */
    typeRampPlus2FontSize: string;
    /**
     * The line-height two steps above the base line-height
     *
     * @remarks
     * HTML attribute: type-ramp-plus-2-line-height
     *
     * CSS custom property: --type-ramp-plus-2-line-height
     */
    typeRampPlus2LineHeight: string;
    /**
     * The font-size three steps above the base font-size
     *
     * @remarks
     * HTML attribute: type-ramp-plus-3-font-size
     *
     * CSS custom property: --type-ramp-plus-3-font-size
     */
    typeRampPlus3FontSize: string;
    /**
     * The line-height three steps above the base line-height
     *
     * @remarks
     * HTML attribute: type-ramp-plus-3-line-height
     *
     * CSS custom property: --type-ramp-plus-3-line-height
     */
    typeRampPlus3LineHeight: string;
    /**
     * The font-size four steps above the base font-size
     *
     * @remarks
     * HTML attribute: type-ramp-plus-4-font-size
     *
     * CSS custom property: --type-ramp-plus-4-font-size
     */
    typeRampPlus4FontSize: string;
    /**
     * The line-height four steps above the base line-height
     *
     * @remarks
     * HTML attribute: type-ramp-plus-4-line-height
     *
     * CSS custom property: --type-ramp-plus-4-line-height
     */
    typeRampPlus4LineHeight: string;
    /**
     * The font-size five steps above the base font-size
     *
     * @remarks
     * HTML attribute: type-ramp-plus-5-font-size
     *
     * CSS custom property: --type-ramp-plus-5-font-size
     */
    typeRampPlus5FontSize: string;
    /**
     * The line-height five steps above the base line-height
     *
     * @remarks
     * HTML attribute: type-ramp-plus-5-line-height
     *
     * CSS custom property: --type-ramp-plus-5-line-height
     */
    typeRampPlus5LineHeight: string;
    /**
     * The font-size six steps above the base font-size
     *
     * @remarks
     * HTML attribute: type-ramp-plus-6-font-size
     *
     * CSS custom property: --type-ramp-plus-6-font-size
     */
    typeRampPlus6FontSize: string;
    /**
     * The line-height six steps above the base line-height
     *
     * @remarks
     * HTML attribute: type-ramp-plus-6-line-height
     *
     * CSS custom property: --type-ramp-plus-6-line-height
     */
    typeRampPlus6LineHeight: string;
    /**
     * The distance from the resolved accent fill color for the rest state of the accent-fill recipe.
     *
     * @remarks
     * HTML attribute: accent-fill-rest-delta
     *
     * CSS custom property: N/A
     */
    accentFillRestDelta: number;
    /**
     * The distance from the resolved accent fill color for the hover state of the accent-fill recipe.
     *
     * @remarks
     * HTML attribute: accent-fill-hover-delta
     *
     * CSS custom property: N/A
     */
    accentFillHoverDelta: number;
    /**
     * The distance from the resolved accent fill color for the active state of the accent-fill recipe.
     *
     * @remarks
     * HTML attribute: accent-fill-active-delta
     *
     * CSS custom property: N/A
     */
    accentFillActiveDelta: number;
    /**
     * The distance from the resolved accent fill color for the focus state of the accent-fill recipe.
     *
     * @remarks
     * HTML attribute: accent-fill-focus-delta
     *
     * CSS custom property: N/A
     */
    accentFillFocusDelta: number;
    /**
     * The distance from the resolved accent foreground color for the rest state of the accent-foreground recipe.
     *
     * @remarks
     * HTML attribute: accent-foreground-rest-delta
     *
     * CSS custom property: N/A
     */
    accentForegroundRestDelta: number;
    /**
     * The distance from the resolved accent foreground color for the hover state of the accent-foreground recipe.
     *
     * @remarks
     * HTML attribute: accent-foreground-hover-delta
     *
     * CSS custom property: N/A
     */
    accentForegroundHoverDelta: number;
    /**
     * The distance from the resolved accent foreground color for the active state of the accent-foreground recipe.
     *
     * @remarks
     * HTML attribute: accent-foreground-active-delta
     *
     * CSS custom property: N/A
     */
    accentForegroundActiveDelta: number;
    /**
     * The distance from the resolved accent foreground color for the focus state of the accent-foreground recipe.
     *
     * @remarks
     * HTML attribute: accent-foreground-focus-delta
     *
     * CSS custom property: N/A
     */
    accentForegroundFocusDelta: number;
    /**
     * The distance from the resolved neutral fill color for the rest state of the neutral-fill recipe.
     *
     * @remarks
     * HTML attribute: neutral-fill-rest-delta
     *
     * CSS custom property: N/A
     */
    neutralFillRestDelta: number;
    /**
     * The distance from the resolved neutral fill color for the hover state of the neutral-fill recipe.
     *
     * @remarks
     * HTML attribute: neutral-fill-hover-delta
     *
     * CSS custom property: N/A
     */
    neutralFillHoverDelta: number;
    /**
     * The distance from the resolved neutral fill color for the active state of the neutral-fill recipe.
     *
     * @remarks
     * HTML attribute: neutral-fill-active-delta
     *
     * CSS custom property: N/A
     */
    neutralFillActiveDelta: number;
    /**
     * The distance from the resolved neutral fill color for the focus state of the neutral-fill recipe.
     *
     * @remarks
     * HTML attribute: neutral-fill-focus-delta
     *
     * CSS custom property: N/A
     */
    neutralFillFocusDelta: number;
    /**
     * The distance from the resolved neutral fill input color for the rest state of the neutral-fill-input recipe.
     *
     * @remarks
     * HTML attribute: neutral-fill-input-rest-delta
     *
     * CSS custom property: N/A
     */
    neutralFillInputRestDelta: number;
    /**
     * The distance from the resolved neutral fill input color for the hover state of the neutral-fill-input recipe.
     *
     * @remarks
     * HTML attribute: neutral-fill-input-hover-delta
     *
     * CSS custom property: N/A
     */
    neutralFillInputHoverDelta: number;
    /**
     * The distance from the resolved neutral fill input color for the active state of the neutral-fill-input recipe.
     *
     * @remarks
     * HTML attribute: neutral-fill-input-active-delta
     *
     * CSS custom property: N/A
     */
    neutralFillInputActiveDelta: number;
    /**
     * The distance from the resolved neutral fill input color for the focus state of the neutral-fill-input recipe.
     *
     * @remarks
     * HTML attribute: neutral-fill-input-focus-delta
     *
     * CSS custom property: N/A
     */
    neutralFillInputFocusDelta: number;
    /**
     * The distance from the resolved neutral fill input color for the rest state of the neutral-fill-layer recipe.
     *
     * @remarks
     * HTML attribute: neutral-fill-layer-rest-delta
     *
     * CSS custom property: N/A
     */
    neutralFillLayerRestDelta: number;
    /**
     * The distance from the resolved neutral fill stealth color for the rest state of the neutral-fill-stealth recipe.
     *
     * @remarks
     * HTML attribute: neutral-fill-stealth-rest-delta
     *
     * CSS custom property: N/A
     */
    neutralFillStealthRestDelta: number;
    /**
     * The distance from the resolved neutral fill stealth color for the hover state of the neutral-fill-stealth recipe.
     *
     * @remarks
     * HTML attribute: neutral-fill-stealth-hover-delta
     *
     * CSS custom property: N/A
     */
    neutralFillStealthHoverDelta: number;
    /**
     * The distance from the resolved neutral fill stealth color for the active state of the neutral-fill-stealth recipe.
     *
     * @remarks
     * HTML attribute: neutral-fill-stealth-active-delta
     *
     * CSS custom property: N/A
     */
    neutralFillStealthActiveDelta: number;
    /**
     * The distance from the resolved neutral fill stealth color for the focus state of the neutral-fill-stealth recipe.
     *
     * @remarks
     * HTML attribute: neutral-fill-stealth-focus-delta
     *
     * CSS custom property: N/A
     */
    neutralFillStealthFocusDelta: number;
    /**
     * The distance from the resolved neutral fill strong color for the hover state of the neutral-fill-strong recipe.
     *
     * @remarks
     * HTML attribute: neutral-fill-strong-hover-delta
     *
     * CSS custom property: N/A
     */
    neutralFillStrongHoverDelta: number;
    /**
     * The distance from the resolved neutral fill strong color for the active state of the neutral-fill-strong recipe.
     *
     * @remarks
     * HTML attribute: neutral-fill-strong-active-delta
     *
     * CSS custom property: N/A
     */
    neutralFillStrongActiveDelta: number;
    /**
     * The distance from the resolved neutral fill strong color for the focus state of the neutral-fill-strong recipe.
     *
     * @remarks
     * HTML attribute: neutral-fill-strong-focus-delta
     *
     * CSS custom property: N/A
     */
    neutralFillStrongFocusDelta: number;
    /**
     * The {@link https://www.w3.org/WAI/GL/wiki/Relative_luminance#:~:text=WCAG%20definition%20of%20relative%20luminance,and%201%20for%20lightest%20white|relative luminance} of the base layer of the application.
     *
     * @remarks
     * When set to a number between 0 and 1
     *
     * HTML attribute: base-layer-luminance
     *
     * CSS custom property: N/A
     */
    baseLayerLuminance: number;
    /**
     * The distance from the resolved divider color for the rest state of the neutral-stroke-divider recipe.
     *
     * @remarks
     * HTML attribute: neutral-stroke-divider-rest-delta
     *
     * CSS custom property: N/A
     */
    neutralStrokeDividerRestDelta: number;
    /**
     * The distance from the resolved neutral stroke color for the rest state of the neutral-stroke recipe.
     *
     * @remarks
     * HTML attribute: neutral-stroke-rest-delta
     *
     * CSS custom property: N/A
     */
    neutralStrokeRestDelta: number;
    /**
     * The distance from the resolved neutral stroke color for the hover state of the neutral-stroke recipe.
     *
     * @remarks
     * HTML attribute: neutral-stroke-hover-delta
     *
     * CSS custom property: N/A
     */
    neutralStrokeHoverDelta: number;
    /**
     * The distance from the resolved neutral stroke color for the active state of the neutral-stroke recipe.
     *
     * @remarks
     * HTML attribute: neutral-stroke-active-delta
     *
     * CSS custom property: N/A
     */
    neutralStrokeActiveDelta: number;
    /**
     * The distance from the resolved neutral stroke color for the focus state of the neutral-stroke recipe.
     *
     * @remarks
     * HTML attribute: neutral-stroke-focus-delta
     *
     * CSS custom property: N/A
     */
    neutralStrokeFocusDelta: number;
}

/** @public */
export declare const designUnit: CSSDesignToken<number>;

export { Dialog }

/**
 * Styles for Dialog
 * @public
 */
export declare const dialogStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/** @public */
export declare const direction: CSSDesignToken<Direction>;

/**
 * @internal
 * @deprecated Use elevationShadow design token
 */
export declare const directionalShadow = "0 calc(var(--elevation) * 0.5px) calc((var(--elevation) * 1px)) rgba(0, 0, 0, 0.2)";

/**
 * Behavior to conditionally apply LTR and RTL stylesheets. To determine which to apply,
 * the behavior will use the nearest DesignSystemProvider's 'direction' design system value.
 *
 * @public
 * @example
 * ```ts
 * import { css } from "@microsoft/fast-element";
 * import { DirectionalStyleSheetBehavior } from "@microsoft/fast-foundation";
 *
 * css`
 *  // ...
 * `.withBehaviors(new DirectionalStyleSheetBehavior(
 *   css`:host { content: "ltr"}`),
 *   css`:host { content: "rtl"}`),
 * )
 * ```
 */
export declare class DirectionalStyleSheetBehavior implements Behavior {
    private ltr;
    private rtl;
    private cache;
    constructor(ltr: ElementStyles | null, rtl: ElementStyles | null);
    /**
     * @internal
     */
    bind(source: FASTElement & HTMLElement): void;
    /**
     * @internal
     */
    unbind(source: FASTElement & HTMLElement): void;
    private attach;
}

/** @public */
export declare const disabledOpacity: CSSDesignToken<number>;

export { Divider }

/**
 * Styles for Divider
 * @public
 */
export declare const dividerStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/** @public @deprecated Use layerCornerRadius */
export declare const elevatedCornerRadius: CSSDesignToken<number>;

/**
 * Applies the box-shadow CSS rule set to the elevation formula.
 * Control this formula with the --elevation CSS Custom Property
 * by setting --elevation to a number.
 *
 * @public
 * @deprecated Use elevationShadow design token
 */
export declare const elevation: string;

/** @public */
export declare interface ElevationRecipe {
    evaluate(element: HTMLElement, size: number, reference?: Swatch): string;
}

/** @public */
export declare const elevationShadowCardActive: CSSDesignToken<string>;

/** @public */
export declare const elevationShadowCardActiveSize: CSSDesignToken<number>;

/** @public */
export declare const elevationShadowCardFocus: CSSDesignToken<string>;

/** @public */
export declare const elevationShadowCardFocusSize: CSSDesignToken<number>;

/** @public */
export declare const elevationShadowCardHover: CSSDesignToken<string>;

/** @public */
export declare const elevationShadowCardHoverSize: CSSDesignToken<number>;

/** @public */
export declare const elevationShadowCardRest: CSSDesignToken<string>;

/** @public */
export declare const elevationShadowCardRestSize: CSSDesignToken<number>;

/** @public */
export declare const elevationShadowDialog: CSSDesignToken<string>;

/** @public */
export declare const elevationShadowDialogSize: CSSDesignToken<number>;

/** @public */
export declare const elevationShadowFlyout: CSSDesignToken<string>;

/** @public */
export declare const elevationShadowFlyoutSize: CSSDesignToken<number>;

/**
 * @public
 */
export declare const elevationShadowRecipe: DesignToken<ElevationRecipe>;

/** @public */
export declare const elevationShadowTooltip: CSSDesignToken<string>;

/** @public */
export declare const elevationShadowTooltipSize: CSSDesignToken<number>;

/** @public */
export declare const fillColor: CSSDesignToken<Swatch>;

export { Flipper }

/**
 * Styles for Flipper
 * @public
 */
export declare const flipperStyles: (context: ElementDefinitionContext, definition: FlipperOptions) => ElementStyles;

/**
 * The Fluent Accordion Element. Implements {@link @microsoft/fast-foundation#Accordion},
 * {@link @microsoft/fast-foundation#accordionTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-accordion\>
 */
export declare const fluentAccordion: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Accordion>;

/**
 * The Fluent Accordion Item Element. Implements {@link @microsoft/fast-foundation#AccordionItem},
 * {@link @microsoft/fast-foundation#accordionItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-accordion-item\>
 */
export declare const fluentAccordionItem: (overrideDefinition?: OverrideFoundationElementDefinition<AccordionItemOptions> | undefined) => FoundationElementRegistry<AccordionItemOptions, Constructable<FoundationElement>>;

/**
 * The Fluent Anchor Element. Implements {@link @microsoft/fast-foundation#Anchor},
 * {@link @microsoft/fast-foundation#anchorTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-anchor\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
export declare const fluentAnchor: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Anchor>;

/**
 * The Fluent AnchoredRegion Element. Implements {@link @microsoft/fast-foundation#AnchoredRegion},
 * {@link @microsoft/fast-foundation#anchoredRegionTemplate}
 *
 *
 * @beta
 * @remarks
 * HTML Element: \<fluent-anchored-region\>
 */
export declare const fluentAnchoredRegion: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof AnchoredRegion>;

/**
 * The Fluent Badge Element. Implements {@link @microsoft/fast-foundation#Badge},
 * {@link @microsoft/fast-foundation#badgeTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-badge\>
 */
export declare const fluentBadge: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Badge>;

/**
 * The Fluent Breadcrumb Element. Implements {@link @microsoft/fast-foundation#Breadcrumb},
 * {@link @microsoft/fast-foundation#breadcrumbTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-breadcrumb\>
 */
export declare const fluentBreadcrumb: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Breadcrumb>;

/**
 * The Fluent BreadcrumbItem Element. Implements {@link @microsoft/fast-foundation#BreadcrumbItem},
 * {@link @microsoft/fast-foundation#breadcrumbItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-breadcrumb-item\>
 */
export declare const fluentBreadcrumbItem: (overrideDefinition?: OverrideFoundationElementDefinition<BreadcrumbItemOptions> | undefined) => FoundationElementRegistry<BreadcrumbItemOptions, Constructable<FoundationElement>>;

/**
 * The Fluent Button Element. Implements {@link @microsoft/fast-foundation#Button},
 * {@link @microsoft/fast-foundation#buttonTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-button\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
export declare const fluentButton: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Button>;

/**
 * The Fluent Calendar Element. Implements {@link @microsoft/fast-foundation#Calendar},
 * {@link @microsoft/fast-foundation#calendarTemplate}
 *
 * @public
 * @remarks
 * HTML Element \<fluent-calendar\>
 */
export declare const fluentCalendar: (overrideDefinition?: OverrideFoundationElementDefinition<CalendarOptions> | undefined) => FoundationElementRegistry<CalendarOptions, Constructable<FoundationElement>>;

/**
 * The Fluent Card Element. Implements {@link @microsoft/fast-foundation#Card},
 * {@link @microsoft/fast-foundation#CardTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-card\>
 */
export declare const fluentCard: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Card>;

/**
 * The Fluent Checkbox Element. Implements {@link @microsoft/fast-foundation#Checkbox},
 * {@link @microsoft/fast-foundation#checkboxTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-checkbox\>
 */
export declare const fluentCheckbox: (overrideDefinition?: OverrideFoundationElementDefinition<CheckboxOptions> | undefined) => FoundationElementRegistry<CheckboxOptions, Constructable<FoundationElement>>;

/**
 * The Fluent Combobox Custom Element. Implements {@link @microsoft/fast-foundation#Combobox},
 * {@link @microsoft/fast-foundation#comboboxTemplate}
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-combobox\>
 *
 */
export declare const fluentCombobox: (overrideDefinition?: OverrideFoundationElementDefinition<ComboboxOptions> | undefined) => FoundationElementRegistry<ComboboxOptions, Constructable<FoundationElement>>;

/**
 * The Fluent Data Grid Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-data-grid\>
 */
export declare const fluentDataGrid: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof DataGrid>;

/**
 * The Fluent Data Grid Cell Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-data-grid-cell\>
 */
export declare const fluentDataGridCell: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof DataGridCell>;

/**
 * The Fluent Data Grid Row Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-data-grid-row\>
 */
export declare const fluentDataGridRow: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof DataGridRow>;

/**
 * The Fluent Design System Provider Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-design-system-provider\>
 */
export declare const fluentDesignSystemProvider: (overrideDefinition?: OverrideFoundationElementDefinition<    {
baseName: string;
template: ViewTemplate<any, any>;
styles: ElementStyles;
}> | undefined) => FoundationElementRegistry<    {
baseName: string;
template: ViewTemplate<any, any>;
styles: ElementStyles;
}, typeof DesignSystemProvider>;

/**
 * The Fluent Dialog Element. Implements {@link @microsoft/fast-foundation#Dialog},
 * {@link @microsoft/fast-foundation#dialogTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-dialog\>
 */
export declare const fluentDialog: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Dialog>;

/**
 * The Fluent Divider Element. Implements {@link @microsoft/fast-foundation#Divider},
 * {@link @microsoft/fast-foundation#dividerTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-divider\>
 */
export declare const fluentDivider: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Divider>;

/**
 * The Fluent Flipper Element. Implements {@link @microsoft/fast-foundation#Flipper},
 * {@link @microsoft/fast-foundation#flipperTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-flipper\>
 */
export declare const fluentFlipper: (overrideDefinition?: OverrideFoundationElementDefinition<FlipperOptions> | undefined) => FoundationElementRegistry<FlipperOptions, Constructable<FoundationElement>>;

/**
 * The Fluent HorizontalScroll Element. Implements {@link @microsoft/fast-foundation#HorizontalScroll},
 * {@link @microsoft/fast-foundation#horizontalScrollTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-horizontal-scroll\>
 */
export declare const fluentHorizontalScroll: (overrideDefinition?: OverrideFoundationElementDefinition<HorizontalScrollOptions> | undefined) => FoundationElementRegistry<HorizontalScrollOptions, Constructable<FoundationElement>>;

/**
 * The Fluent listbox Custom Element. Implements, {@link @microsoft/fast-foundation#Listbox}
 * {@link @microsoft/fast-foundation#listboxTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-listbox\>
 *
 */
export declare const fluentListbox: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Listbox>;

/**
 * The Fluent Menu Element. Implements {@link @microsoft/fast-foundation#Menu},
 * {@link @microsoft/fast-foundation#menuTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-menu\>
 */
export declare const fluentMenu: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Menu>;

/**
 * The Fluent Menu Item Element. Implements {@link @microsoft/fast-foundation#MenuItem},
 * {@link @microsoft/fast-foundation#menuItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-menu-item\>
 */
export declare const fluentMenuItem: (overrideDefinition?: OverrideFoundationElementDefinition<MenuItemOptions> | undefined) => FoundationElementRegistry<MenuItemOptions, Constructable<FoundationElement>>;

/**
 * The Fluent Number Field Custom Element. Implements {@link @microsoft/fast-foundation#NumberField},
 * {@link @microsoft/fast-foundation#numberFieldTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-number-field\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
export declare const fluentNumberField: (overrideDefinition?: OverrideFoundationElementDefinition<NumberFieldOptions> | undefined) => FoundationElementRegistry<NumberFieldOptions, Constructable<FoundationElement>>;

/**
 * The Fluent option Custom Element. Implements {@link @microsoft/fast-foundation#ListboxOption}
 * {@link @microsoft/fast-foundation#listboxOptionTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-option\>
 *
 */
export declare const fluentOption: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof ListboxOption>;

/**
 * The Fluent Progress Element. Implements {@link @microsoft/fast-foundation#BaseProgress},
 * {@link @microsoft/fast-foundation#progressTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-progress\>
 */
export declare const fluentProgress: (overrideDefinition?: OverrideFoundationElementDefinition<ProgressOptions> | undefined) => FoundationElementRegistry<ProgressOptions, Constructable<FoundationElement>>;

/**
 * The Fluent Progress Ring Element. Implements {@link @microsoft/fast-foundation#BaseProgress},
 * {@link @microsoft/fast-foundation#progressRingTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-progress-ring\>
 */
export declare const fluentProgressRing: (overrideDefinition?: OverrideFoundationElementDefinition<ProgressRingOptions> | undefined) => FoundationElementRegistry<ProgressRingOptions, Constructable<FoundationElement>>;

/**
 * The Fluent Radio Element. Implements {@link @microsoft/fast-foundation#Radio},
 * {@link @microsoft/fast-foundation#radioTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-radio\>
 */
export declare const fluentRadio: (overrideDefinition?: OverrideFoundationElementDefinition<RadioOptions> | undefined) => FoundationElementRegistry<RadioOptions, Constructable<FoundationElement>>;

/**
 * The Fluent Radio Group Element. Implements {@link @microsoft/fast-foundation#RadioGroup},
 * {@link @microsoft/fast-foundation#radioGroupTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-radio-group\>
 */
export declare const fluentRadioGroup: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof RadioGroup>;

/**
 * The Fluent Search Custom Element. Implements {@link @microsoft/fast-foundation#Search},
 * {@link @microsoft/fast-foundation#searchTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-search\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
export declare const fluentSearch: (overrideDefinition?: OverrideFoundationElementDefinition<SearchOptions> | undefined) => FoundationElementRegistry<SearchOptions, Constructable<FoundationElement>>;

/**
 * The Fluent select Custom Element. Implements, {@link @microsoft/fast-foundation#Select}
 * {@link @microsoft/fast-foundation#selectTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-select\>
 *
 */
export declare const fluentSelect: (overrideDefinition?: OverrideFoundationElementDefinition<SelectOptions> | undefined) => FoundationElementRegistry<SelectOptions, Constructable<FoundationElement>>;

/**
 * The Fluent Skeleton Element. Implements {@link @microsoft/fast-foundation#Skeleton},
 * {@link @microsoft/fast-foundation#skeletonTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-skeleton\>
 */
export declare const fluentSkeleton: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Skeleton>;

/**
 * The Fluent Slider Custom Element. Implements {@link @microsoft/fast-foundation#(Slider:class)},
 * {@link @microsoft/fast-foundation#sliderTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-slider\>
 */
export declare const fluentSlider: (overrideDefinition?: OverrideFoundationElementDefinition<SliderOptions> | undefined) => FoundationElementRegistry<SliderOptions, Constructable<FoundationElement>>;

/**
 * The Fluent Slider Label Custom Element. Implements {@link @microsoft/fast-foundation#SliderLabel},
 * {@link @microsoft/fast-foundation#sliderLabelTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-slider-label\>
 */
export declare const fluentSliderLabel: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof SliderLabel>;

/**
 * The Fluent Switch Custom Element. Implements {@link @microsoft/fast-foundation#Switch},
 * {@link @microsoft/fast-foundation#SwitchTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-switch\>
 */
export declare const fluentSwitch: (overrideDefinition?: OverrideFoundationElementDefinition<SwitchOptions> | undefined) => FoundationElementRegistry<SwitchOptions, Constructable<FoundationElement>>;

/**
 * The Fluent Tab Custom Element. Implements {@link @microsoft/fast-foundation#Tab},
 * {@link @microsoft/fast-foundation#tabTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tab\>
 */
export declare const fluentTab: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Tab>;

/**
 * The Fluent Tab Panel Custom Element. Implements {@link @microsoft/fast-foundation#TabPanel},
 * {@link @microsoft/fast-foundation#tabPanelTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tab-panel\>
 */
export declare const fluentTabPanel: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof TabPanel>;

/**
 * The Fluent Tabs Custom Element. Implements {@link @microsoft/fast-foundation#Tabs},
 * {@link @microsoft/fast-foundation#tabsTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tabs\>
 */
export declare const fluentTabs: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Tabs>;

/**
 * The Fluent Text Area Custom Element. Implements {@link @microsoft/fast-foundation#TextArea},
 * {@link @microsoft/fast-foundation#textAreaTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-text-area\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
export declare const fluentTextArea: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof TextArea>;

/**
 * The Fluent Text Field Custom Element. Implements {@link @microsoft/fast-foundation#TextField},
 * {@link @microsoft/fast-foundation#textFieldTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-text-field\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
export declare const fluentTextField: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof TextField>;

/**
 * The Fluent Toolbar Custom Element. Implements {@link @microsoft/fast-foundation#Toolbar},
 * {@link @microsoft/fast-foundation#toolbarTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-toolbar\>
 */
export declare const fluentToolbar: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Toolbar>;

/**
 * The Fluent Tooltip Custom Element. Implements {@link @microsoft/fast-foundation#Tooltip},
 * {@link @microsoft/fast-foundation#tooltipTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tooltip\>
 */
export declare const fluentTooltip: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof Tooltip>;

/**
 * The Fluent tree item Custom Element. Implements, {@link @microsoft/fast-foundation#TreeItem}
 * {@link @microsoft/fast-foundation#treeItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tree-item\>
 *
 */
export declare const fluentTreeItem: (overrideDefinition?: OverrideFoundationElementDefinition<TreeItemOptions> | undefined) => FoundationElementRegistry<TreeItemOptions, Constructable<FoundationElement>>;

/**
 * The Fluent tree view Custom Element. Implements, {@link @microsoft/fast-foundation#TreeView}
 * {@link @microsoft/fast-foundation#treeViewTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-tree-view\>
 *
 */
export declare const fluentTreeView: (overrideDefinition?: OverrideFoundationElementDefinition<FoundationElementDefinition> | undefined) => FoundationElementRegistry<FoundationElementDefinition, typeof TreeView>;

/** @public @deprecated Use focusStrokeWidth */
export declare const focusOutlineWidth: CSSDesignToken<number>;

/** @public */
export declare const focusStrokeInner: CSSDesignToken<Swatch>;

/** @public */
export declare const focusStrokeInnerRecipe: DesignToken<ColorRecipe>;

/** @public */
export declare const focusStrokeOuter: CSSDesignToken<Swatch>;

/** @public */
export declare const focusStrokeOuterRecipe: DesignToken<ColorRecipe>;

/** @public */
export declare const focusStrokeWidth: CSSDesignToken<number>;

/**
 * Partial CSS for the focus treatment for most typical sized components like Button, Menu Item, etc.
 *
 * @public
 */
export declare const focusTreatmentBase: CSSDirective;

/**
 * Partial CSS for the focus treatment for tighter components with spacing constraints, like Checkbox
 * and Radio, or plain text like Hypertext appearance Anchor or Breadcrumb Item.
 *
 * @public
 */
export declare const focusTreatmentTight: CSSDirective;

/** @public */
export declare const fontWeight: CSSDesignToken<number>;

/** @public */
export declare const foregroundOnAccentActive: CSSDesignToken<Swatch>;

/** @public @deprecated Not used */
export declare const foregroundOnAccentActiveLarge: CSSDesignToken<Swatch>;

/** @public */
export declare const foregroundOnAccentFocus: CSSDesignToken<Swatch>;

/** @public @deprecated Not used */
export declare const foregroundOnAccentFocusLarge: CSSDesignToken<Swatch>;

/** @public */
export declare const foregroundOnAccentHover: CSSDesignToken<Swatch>;

/** @public @deprecated Not used */
export declare const foregroundOnAccentHoverLarge: CSSDesignToken<Swatch>;

/** @public @deprecated Not used */
export declare const foregroundOnAccentLargeRecipe: DesignToken<InteractiveColorRecipe>;

/** @public */
export declare const foregroundOnAccentRecipe: DesignToken<InteractiveColorRecipe>;

/** @public */
export declare const foregroundOnAccentRest: CSSDesignToken<Swatch>;

/** @public @deprecated Not used */
export declare const foregroundOnAccentRestLarge: CSSDesignToken<Swatch>;

/**
 * Creates a PaletteRGB from a source color object.
 * @param source - The source color
 */
declare function from(source: SwatchRGB, options?: Partial<PaletteRGBOptions>): PaletteRGB;

/**
 * A formula to retrieve the control height.
 * Use this as the value of any CSS property that
 * accepts a pixel size.
 * @public
 */
export declare const heightNumber: CSSDirective;

/**
 * @internal
 */
export declare class HorizontalScroll extends HorizontalScroll_2 {
    /**
     * @public
     */
    connectedCallback(): void;
}

/**
 * Styles for horizontal scroll
 * @public
 */
export declare const horizontalScrollStyles: (context: ElementDefinitionContext, definition: HorizontalScrollOptions) => ElementStyles;

/**
 * @internal
 */
export declare const HypertextStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition, interactivitySelector: string, nonInteractivitySelector?: string) => ElementStyles;

/**
 * The visual styles for inputs with `appearance='filled'`.
 *
 * @internal
 */
export declare const inputFilledStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition, logicalControlSelector: string, interactivitySelector?: string) => ElementStyles;

/**
 * @internal
 */
export declare const inputForcedColorStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition, logicalControlSelector: string, interactivitySelector?: string) => ElementStyles;

/**
 * The visual styles for inputs with `appearance='outline'`.
 *
 * @internal
 */
export declare const inputOutlineStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition, logicalControlSelector: string, interactivitySelector?: string) => ElementStyles;

/**
 * The styles for active and focus interactions for input controls.
 *
 * @internal
 */
export declare const inputStateStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition, logicalControlSelector: string) => ElementStyles;

/** @public */
export declare interface InteractiveColorRecipe {
    evaluate(element: HTMLElement, reference?: Swatch): InteractiveSwatchSet;
}

/** @public */
export declare interface InteractiveSwatchSet {
    /**
     * The swatch to apply to the rest state
     */
    rest: Swatch;
    /**
     * The swatch to apply to the hover state
     */
    hover: Swatch;
    /**
     * The swatch to apply to the active state
     */
    active: Swatch;
    /**
     * The swatch to apply to the focus state
     */
    focus: Swatch;
}

/**
 * Determines if a color should be considered Dark Mode
 * @param color - The color to check to mode of
 * @returns boolean
 *
 * @internal
 */
export declare function isDark(color: Swatch): boolean;

/** @public */
export declare const layerCornerRadius: CSSDesignToken<number>;

/**
 * @internal
 */
export declare const LightweightButtonStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition, interactivitySelector: string, nonInteractivitySelector?: string) => ElementStyles;

export declare class Listbox extends Listbox_2 {
}

/**
 * Styles for Listbox
 * @public
 */
export declare const listboxStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/**
 * The Fluent menu class
 * @public
 */
export declare class Menu extends Menu_2 {
    /**
     * @internal
     */
    connectedCallback(): void;
}

export { MenuItem }

/**
 * Styles for MenuItem
 * @public
 */
export declare const menuItemStyles: (context: ElementDefinitionContext, definition: MenuItemOptions) => ElementStyles;

/**
 * Styles for Menu
 * @public
 */
export declare const menuStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/** @public */
export declare const neutralBaseColor: CSSDesignToken<Swatch>;

/**
 * @internal
 */
export declare const NeutralButtonStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition, interactivitySelector: string, nonInteractivitySelector?: string) => ElementStyles;

/** @public @deprecated Use neutralFillInverseActive */
export declare const neutralContrastFillActive: CSSDesignToken<Swatch>;

/** @public @deprecated Use neutralFillInverseActiveDelta */
export declare const neutralContrastFillActiveDelta: CSSDesignToken<number>;

/** @public @deprecated Use neutralFillInverseFocus */
export declare const neutralContrastFillFocus: CSSDesignToken<Swatch>;

/** @public @deprecated Use neutralFillInverseFocusDelta */
export declare const neutralContrastFillFocusDelta: CSSDesignToken<number>;

/** @public @deprecated Use neutralFillInverseHover */
export declare const neutralContrastFillHover: CSSDesignToken<Swatch>;

/** @public @deprecated Use neutralFillInverseHoverDelta */
export declare const neutralContrastFillHoverDelta: CSSDesignToken<number>;

/** @public @deprecated Use neutralFillInverseRest */
export declare const neutralContrastFillRest: CSSDesignToken<Swatch>;

/** @public @deprecated Use neutralFillInverseRestDelta */
export declare const neutralContrastFillRestDelta: CSSDesignToken<number>;

/** @public @deprecated Use neutralStrokeDividerRest */
export declare const neutralDivider: CSSDesignToken<Swatch>;

/** @public @deprecated Use neutralStrokeDividerRestDelta */
export declare const neutralDividerRestDelta: DesignToken<number>;

/** @public */
export declare const neutralFillActive: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillActiveDelta: DesignToken<number>;

/** @public @deprecated Use neutralFillLayerRest */
export declare const neutralFillCard: CSSDesignToken<Swatch>;

/** @public @deprecated Use neutralFillLayerRestDelta */
export declare const neutralFillCardDelta: DesignToken<number>;

/** @public */
export declare const neutralFillFocus: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillFocusDelta: DesignToken<number>;

/** @public */
export declare const neutralFillHover: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillHoverDelta: DesignToken<number>;

/** @public */
export declare const neutralFillInputActive: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillInputActiveDelta: DesignToken<number>;

/** @public */
export declare const neutralFillInputAltActive: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillInputAltActiveDelta: DesignToken<number>;

/** @public */
export declare const neutralFillInputAltFocus: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillInputAltFocusDelta: DesignToken<number>;

/** @public */
export declare const neutralFillInputAltHover: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillInputAltHoverDelta: DesignToken<number>;

/** @public */
export declare const neutralFillInputAltRecipe: DesignToken<InteractiveColorRecipe>;

/** @public */
export declare const neutralFillInputAltRest: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillInputAltRestDelta: DesignToken<number>;

/** @public */
export declare const neutralFillInputFocus: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillInputFocusDelta: DesignToken<number>;

/** @public */
export declare const neutralFillInputHover: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillInputHoverDelta: DesignToken<number>;

/** @public */
export declare const neutralFillInputRecipe: DesignToken<InteractiveColorRecipe>;

/** @public */
export declare const neutralFillInputRest: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillInputRestDelta: DesignToken<number>;

/** @public @deprecated Not used */
export declare const neutralFillInverseActive: CSSDesignToken<Swatch>;

/** @public @deprecated Not used */
export declare const neutralFillInverseActiveDelta: CSSDesignToken<number>;

/** @public @deprecated Not used */
export declare const neutralFillInverseFocus: CSSDesignToken<Swatch>;

/** @public @deprecated Not used */
export declare const neutralFillInverseFocusDelta: CSSDesignToken<number>;

/** @public @deprecated Not used */
export declare const neutralFillInverseHover: CSSDesignToken<Swatch>;

/** @public @deprecated Not used */
export declare const neutralFillInverseHoverDelta: CSSDesignToken<number>;

/** @public @deprecated Not used */
export declare const neutralFillInverseRecipe: DesignToken<InteractiveColorRecipe>;

/** @public @deprecated Not used */
export declare const neutralFillInverseRest: CSSDesignToken<Swatch>;

/** @public @deprecated Not used */
export declare const neutralFillInverseRestDelta: CSSDesignToken<number>;

/** @public */
export declare const neutralFillLayerActive: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillLayerActiveDelta: DesignToken<number>;

/** @public */
export declare const neutralFillLayerAltRecipe: DesignToken<InteractiveColorRecipe>;

/** @public */
export declare const neutralFillLayerAltRest: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillLayerAltRestDelta: DesignToken<number>;

/** @public */
export declare const neutralFillLayerHover: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillLayerHoverDelta: DesignToken<number>;

/** @public */
export declare const neutralFillLayerRecipe: DesignToken<InteractiveColorRecipe>;

/** @public */
export declare const neutralFillLayerRest: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillLayerRestDelta: DesignToken<number>;

/** @public */
export declare const neutralFillRecipe: DesignToken<InteractiveColorRecipe>;

/** @public */
export declare const neutralFillRest: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillRestDelta: DesignToken<number>;

/** @public */
export declare const neutralFillSecondaryActive: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillSecondaryActiveDelta: DesignToken<number>;

/** @public */
export declare const neutralFillSecondaryFocus: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillSecondaryFocusDelta: DesignToken<number>;

/** @public */
export declare const neutralFillSecondaryHover: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillSecondaryHoverDelta: DesignToken<number>;

/** @public */
export declare const neutralFillSecondaryRecipe: DesignToken<InteractiveColorRecipe>;

/** @public */
export declare const neutralFillSecondaryRest: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillSecondaryRestDelta: DesignToken<number>;

/** @public */
export declare const neutralFillStealthActive: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillStealthActiveDelta: DesignToken<number>;

/** @public */
export declare const neutralFillStealthFocus: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillStealthFocusDelta: DesignToken<number>;

/** @public */
export declare const neutralFillStealthHover: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillStealthHoverDelta: DesignToken<number>;

/** @public */
export declare const neutralFillStealthRecipe: DesignToken<InteractiveColorRecipe>;

/** @public */
export declare const neutralFillStealthRest: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillStealthRestDelta: DesignToken<number>;

/** @public */
export declare const neutralFillStrongActive: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillStrongActiveDelta: DesignToken<number>;

/** @public */
export declare const neutralFillStrongFocus: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillStrongFocusDelta: DesignToken<number>;

/** @public */
export declare const neutralFillStrongHover: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillStrongHoverDelta: DesignToken<number>;

/** @public */
export declare const neutralFillStrongRecipe: DesignToken<InteractiveColorRecipe>;

/** @public */
export declare const neutralFillStrongRest: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralFillStrongRestDelta: DesignToken<number>;

/** @public @deprecated Use neutralFillStrongActive */
export declare const neutralFillToggleActive: CSSDesignToken<Swatch>;

/** @public @deprecated Use neutralFillStrongActiveDelta */
export declare const neutralFillToggleActiveDelta: DesignToken<number>;

/** @public @deprecated Use neutralFillStrongFocus */
export declare const neutralFillToggleFocus: CSSDesignToken<Swatch>;

/** @public @deprecated Use neutralFillStrongFocusDelta */
export declare const neutralFillToggleFocusDelta: DesignToken<number>;

/** @public @deprecated Use neutralFillStrongHover */
export declare const neutralFillToggleHover: CSSDesignToken<Swatch>;

/** @public @deprecated Use neutralFillStrongHoverDelta */
export declare const neutralFillToggleHoverDelta: DesignToken<number>;

/** @public @deprecated Use neutralFillStrongRest */
export declare const neutralFillToggleRest: CSSDesignToken<Swatch>;

/** @public @deprecated Use neutralFillStrongRestDelta */
export declare const neutralFillToggleRestDelta: DesignToken<number>;

/** @public @deprecated Use focusStrokeOuter */
export declare const neutralFocus: CSSDesignToken<Swatch>;

/** @public @deprecated Use focusStrokeInner */
export declare const neutralFocusInnerAccent: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralForegroundActive: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralForegroundFocus: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralForegroundHint: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralForegroundHintRecipe: DesignToken<ColorRecipe>;

/** @public */
export declare const neutralForegroundHover: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralForegroundRecipe: DesignToken<InteractiveColorRecipe>;

/** @public */
export declare const neutralForegroundRest: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralLayer1: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralLayer1Recipe: DesignToken<ColorRecipe>;

/** @public */
export declare const neutralLayer2: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralLayer2Recipe: DesignToken<ColorRecipe>;

/** @public */
export declare const neutralLayer3: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralLayer3Recipe: DesignToken<ColorRecipe>;

/** @public */
export declare const neutralLayer4: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralLayer4Recipe: DesignToken<ColorRecipe>;

/** @public */
export declare const neutralLayerCardContainer: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralLayerCardContainerRecipe: DesignToken<ColorRecipe>;

/** @public */
export declare const neutralLayerFloating: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralLayerFloatingRecipe: DesignToken<ColorRecipe>;

/** @public @deprecated Use neutralLayer1 */
export declare const neutralLayerL1: CSSDesignToken<Swatch>;

/** @public @deprecated Use neutralLayer2 */
export declare const neutralLayerL2: CSSDesignToken<Swatch>;

/** @public @deprecated Use neutralLayer3 */
export declare const neutralLayerL3: CSSDesignToken<Swatch>;

/** @public @deprecated Use neutralLayer4 */
export declare const neutralLayerL4: CSSDesignToken<Swatch>;

/** @public @deprecated Use neutralStrokeActive */
export declare const neutralOutlineActive: CSSDesignToken<Swatch>;

/** @public @deprecated Use neutralStrokeFocus */
export declare const neutralOutlineFocus: CSSDesignToken<Swatch>;

/** @public @deprecated Use neutralStrokeHover */
export declare const neutralOutlineHover: CSSDesignToken<Swatch>;

/** @public @deprecated Use neutralStrokeRest */
export declare const neutralOutlineRest: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralPalette: DesignToken<Palette<Swatch>>;

/** @public */
export declare const neutralStrokeActive: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralStrokeActiveDelta: DesignToken<number>;

/** @public */
export declare const neutralStrokeControlActive: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralStrokeControlActiveDelta: DesignToken<number>;

/** @public */
export declare const neutralStrokeControlFocus: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralStrokeControlFocusDelta: DesignToken<number>;

/** @public */
export declare const neutralStrokeControlHover: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralStrokeControlHoverDelta: DesignToken<number>;

/** @public */
export declare const neutralStrokeControlRecipe: DesignToken<InteractiveColorRecipe>;

/** @public */
export declare const neutralStrokeControlRest: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralStrokeControlRestDelta: DesignToken<number>;

/** @public */
export declare const neutralStrokeDividerRecipe: DesignToken<ColorRecipe>;

/** @public */
export declare const neutralStrokeDividerRest: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralStrokeDividerRestDelta: DesignToken<number>;

/** @public */
export declare const neutralStrokeFocus: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralStrokeFocusDelta: DesignToken<number>;

/** @public */
export declare const neutralStrokeHover: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralStrokeHoverDelta: DesignToken<number>;

/** @public */
export declare const neutralStrokeInputActive: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralStrokeInputFocus: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralStrokeInputHover: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralStrokeInputRecipe: DesignToken<InteractiveColorRecipe>;

/** @public */
export declare const neutralStrokeInputRest: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralStrokeLayerActive: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralStrokeLayerActiveDelta: DesignToken<number>;

/** @public */
export declare const neutralStrokeLayerHover: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralStrokeLayerHoverDelta: DesignToken<number>;

/** @public */
export declare const neutralStrokeLayerRecipe: DesignToken<InteractiveColorRecipe>;

/** @public */
export declare const neutralStrokeLayerRest: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralStrokeLayerRestDelta: DesignToken<number>;

/** @public */
export declare const neutralStrokeRecipe: DesignToken<InteractiveColorRecipe>;

/** @public */
export declare const neutralStrokeRest: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralStrokeRestDelta: DesignToken<number>;

/** @public */
export declare const neutralStrokeStrongActive: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralStrokeStrongActiveDelta: DesignToken<number>;

/** @public */
export declare const neutralStrokeStrongFocus: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralStrokeStrongFocusDelta: DesignToken<number>;

/** @public */
export declare const neutralStrokeStrongHover: CSSDesignToken<Swatch>;

/** @public */
export declare const neutralStrokeStrongHoverDelta: DesignToken<number>;

/** @public */
export declare const neutralStrokeStrongRecipe: DesignToken<InteractiveColorRecipe>;

/** @public */
export declare const neutralStrokeStrongRest: CSSDesignToken<Swatch>;

/**
 * The Fluent number field class
 * @internal
 */
export declare class NumberField extends NumberField_2 {
    /**
     * The appearance of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    appearance: NumberFieldAppearance;
    /**
     * @internal
     */
    connectedCallback(): void;
}

/**
 * Number field appearances
 * @public
 */
export declare type NumberFieldAppearance = 'filled' | 'outline';

/**
 * Styles for NumberField
 * @public
 */
export declare const numberFieldStyles: (context: ElementDefinitionContext, definition: NumberFieldOptions) => ElementStyles;

/**
 * Styles for Option
 * @public
 */
export declare const OptionStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/**
 * @internal
 */
export declare const OutlineButtonStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition, interactivitySelector: string, nonInteractivitySelector?: string) => ElementStyles;

/** @public @deprecated Use strokeWidth */
export declare const outlineWidth: CSSDesignToken<number>;

/**
 * A collection of {@link Swatch} instances
 * @public
 */
export declare interface Palette<T extends Swatch = Swatch> {
    readonly source: T;
    readonly swatches: ReadonlyArray<T>;
    /**
     * Returns a swatch from the palette that most closely matches
     * the contrast ratio provided to a provided reference.
     */
    colorContrast(reference: Swatch, contrast: number, initialIndex?: number, direction?: 1 | -1): T;
    /**
     * Returns the index of the palette that most closely matches
     * the relativeLuminance of the provided swatch
     */
    closestIndexOf(reference: RelativeLuminance): number;
    /**
     * Gets a swatch by index. Index is clamped to the limits
     * of the palette so a Swatch will always be returned.
     */
    get(index: number): T;
}

/** @public */
export declare type PaletteRGB = Palette<SwatchRGB>;

/** @public */
export declare const PaletteRGB: Readonly<{
    create: typeof create;
    from: typeof from;
}>;

/**
 * Options to tailor the generation of the color palette.
 * @public
 */
declare interface PaletteRGBOptions {
    /**
     * The minimum amount of contrast between steps in the palette. Default 1.03.
     * Recommended increments by hundredths.
     */
    stepContrast: number;
    /**
     * Multiplier for increasing step contrast as the swatches darken. Default 0.03.
     * Recommended increments by hundredths.
     */
    stepContrastRamp: number;
    /**
     * Whether to keep the exact source color in the target palette. Default false.
     * Only recommended when the exact color is required and used in stateful interaction recipes like hover.
     * Note that custom recipes can still access the source color even if it's not in the ramp,
     * but turning this on will potentially increase the contrast between steps toward the ends of the palette.
     */
    preserveSource: boolean;
}

/**
 * Progress base class
 * @public
 */
export declare class Progress extends BaseProgress {
}

/**
 * Progress Ring base class
 * @public
 */
export declare class ProgressRing extends BaseProgress {
}

/**
 * Styles for ProgressRing
 * @public
 */
export declare const progressRingStyles: (context: ElementDefinitionContext, definition: ProgressRingOptions) => ElementStyles;

/**
 * Styles for Progress
 * @public
 */
export declare const progressStyles: (context: ElementDefinitionContext, definition: ProgressOptions) => ElementStyles;

/**
 * Provides a design system for the specified element either by returning one that was
 * already created for that element or creating one.
 * @param element - The element to root the design system at. By default, this is the body.
 * @returns A Fluent Design System
 * @public
 */
export declare function provideFluentDesignSystem(element?: HTMLElement): DesignSystem;

export { Radio }

export { RadioGroup }

/**
 * Styles for RadioGroup
 * @public
 */
export declare const radioGroupStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/**
 * Styles for Radio
 * @public
 */
export declare const RadioStyles: (context: ElementDefinitionContext, definition: RadioOptions) => ElementStyles;

/** @public @deprecated Use ColorRecipe instead */
export declare interface Recipe<T> {
    evaluate(element: HTMLElement, reference?: Swatch): T;
}

/**
 * @public
 */
declare interface RelativeLuminance {
    /**
     * A number between 0 and 1, calculated by {@link https://www.w3.org/WAI/GL/wiki/Relative_luminance}
     */
    readonly relativeLuminance: number;
}

/**
 * The Fluent search class
 * @internal
 */
export declare class Search extends Search_2 {
    /**
     * The appearance of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    appearance: SearchAppearance;
}

/**
 * Search appearances
 * @public
 */
export declare type SearchAppearance = 'filled' | 'outline';

/**
 * Styles for Search
 * @public
 */
export declare const searchStyles: (context: ElementDefinitionContext, definition: SearchOptions) => ElementStyles;

/**
 * @public
 */
export declare const searchTemplate: (context: ElementDefinitionContext, definition: SearchOptions) => ViewTemplate<Search_2>;

/**
 * The Fluent select class
 * @internal
 */
export declare class Select extends Select_2 {
    /**
     * The appearance of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    appearance: SelectAppearance;
    /**
     * @internal
     */
    appearanceChanged(oldValue: SelectAppearance, newValue: SelectAppearance): void;
    /**
     * @internal
     */
    connectedCallback(): void;
}

/**
 * Select appearances
 * @public
 */
export declare type SelectAppearance = 'filled' | 'outline' | 'stealth';

/**
 * Styles for Select
 * @public
 */
export declare const selectStyles: (context: ElementDefinitionContext, definition: SelectOptions) => ElementStyles;

export { Skeleton }

/**
 * Styles for Skeleton
 * @public
 */
export declare const skeletonStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

export { Slider }

export { SliderLabel }

/**
 * Styles for SliderLabel
 * @public
 */
export declare const sliderLabelStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/**
 * Styles for Slider
 * @public
 */
export declare const sliderStyles: (context: ElementDefinitionContext, definition: SliderOptions) => ElementStyles;

/**
 * Recommended values for light and dark mode for {@link @fluentui/web-components#baseLayerLuminance}.
 *
 * @public
 */
export declare enum StandardLuminance {
    LightMode = 0.98,
    DarkMode = 0.15
}

/**
 * @internal
 */
export declare const StealthButtonStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition, interactivitySelector: string, nonInteractivitySelector?: string) => ElementStyles;

/** @public */
export declare const strokeWidth: CSSDesignToken<number>;

/**
 * Represents a color in a {@link Palette}
 * @public
 */
export declare interface Swatch extends RelativeLuminance {
    toColorString(): string;
    contrast(target: RelativeLuminance): number;
}

/** @public */
export declare interface SwatchRGB extends Swatch {
    r: number;
    g: number;
    b: number;
}

/** @public */
export declare const SwatchRGB: Readonly<{
    create(r: number, g: number, b: number): SwatchRGB;
    from(obj: {
        r: number;
        g: number;
        b: number;
    }): SwatchRGB;
}>;

export { Switch }

/**
 * Styles for Switch
 * @public
 */
export declare const switchStyles: (context: ElementDefinitionContext, definition: SwitchOptions) => ElementStyles;

export { Tab }

export { TabPanel }

/**
 * Styles for TabPanel
 * @public
 */
export declare const tabPanelStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

export { Tabs }

/**
 * Styles for Tabs
 * @public
 */
export declare const tabsStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/**
 * Styles for Tab
 * @public
 */
export declare const tabStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/**
 * The Fluent TextArea class
 * @internal
 */
export declare class TextArea extends TextArea_2 {
    /**
     * The appearance of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    appearance: TextAreaAppearance;
    /**
     * @internal
     */
    appearanceChanged(oldValue: TextAreaAppearance, newValue: TextAreaAppearance): void;
    /**
     * @internal
     */
    connectedCallback(): void;
}

/**
 * Text area appearances
 * @public
 */
export declare type TextAreaAppearance = 'filled' | 'outline';

/**
 * Styles for TextArea
 * @public
 */
export declare const textAreaStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/**
 * The Fluent text field class
 * @internal
 */
export declare class TextField extends TextField_2 {
    /**
     * The appearance of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    appearance: TextFieldAppearance;
    /**
     * @internal
     */
    appearanceChanged(oldValue: TextFieldAppearance, newValue: TextFieldAppearance): void;
    /**
     * @internal
     */
    connectedCallback(): void;
}

/**
 * Text field appearances
 * @public
 */
export declare type TextFieldAppearance = 'filled' | 'outline';

/**
 * Styles for TextField
 * @public
 */
export declare const textFieldStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/**
 * The Fluent toolbar class
 * @internal
 */
export declare class Toolbar extends Toolbar_2 {
}

/**
 * The Fluent tooltip class
 * @internal
 */
export declare class Tooltip extends Tooltip_2 {
    /**
     * @internal
     */
    connectedCallback(): void;
}

export { TreeItem }

/**
 * Styles for TreeItem
 * @public
 */
export declare const treeItemStyles: (context: ElementDefinitionContext, definition: TreeItemOptions) => ElementStyles;

export { TreeView }

/**
 * Styles for TreeView
 * @public
 */
export declare const treeViewStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles;

/** @public */
export declare const typeRampBase: CSSDirective;

/** @public */
export declare const typeRampBaseFontSize: CSSDesignToken<string>;

/** @public */
export declare const typeRampBaseFontVariations: CSSDesignToken<string>;

/** @public */
export declare const typeRampBaseLineHeight: CSSDesignToken<string>;

/** @public */
export declare const typeRampMinus1: CSSDirective;

/** @public */
export declare const typeRampMinus1FontSize: CSSDesignToken<string>;

/** @public */
export declare const typeRampMinus1FontVariations: CSSDesignToken<string>;

/** @public */
export declare const typeRampMinus1LineHeight: CSSDesignToken<string>;

/** @public */
export declare const typeRampMinus2: CSSDirective;

/** @public */
export declare const typeRampMinus2FontSize: CSSDesignToken<string>;

/** @public */
export declare const typeRampMinus2FontVariations: CSSDesignToken<string>;

/** @public */
export declare const typeRampMinus2LineHeight: CSSDesignToken<string>;

/** @public */
export declare const typeRampPlus1: CSSDirective;

/** @public */
export declare const typeRampPlus1FontSize: CSSDesignToken<string>;

/** @public */
export declare const typeRampPlus1FontVariations: CSSDesignToken<string>;

/** @public */
export declare const typeRampPlus1LineHeight: CSSDesignToken<string>;

/** @public */
export declare const typeRampPlus2: CSSDirective;

/** @public */
export declare const typeRampPlus2FontSize: CSSDesignToken<string>;

/** @public */
export declare const typeRampPlus2FontVariations: CSSDesignToken<string>;

/** @public */
export declare const typeRampPlus2LineHeight: CSSDesignToken<string>;

/** @public */
export declare const typeRampPlus3: CSSDirective;

/** @public */
export declare const typeRampPlus3FontSize: CSSDesignToken<string>;

/** @public */
export declare const typeRampPlus3FontVariations: CSSDesignToken<string>;

/** @public */
export declare const typeRampPlus3LineHeight: CSSDesignToken<string>;

/** @public */
export declare const typeRampPlus4: CSSDirective;

/** @public */
export declare const typeRampPlus4FontSize: CSSDesignToken<string>;

/** @public */
export declare const typeRampPlus4FontVariations: CSSDesignToken<string>;

/** @public */
export declare const typeRampPlus4LineHeight: CSSDesignToken<string>;

/** @public */
export declare const typeRampPlus5: CSSDirective;

/** @public */
export declare const typeRampPlus5FontSize: CSSDesignToken<string>;

/** @public */
export declare const typeRampPlus5FontVariations: CSSDesignToken<string>;

/** @public */
export declare const typeRampPlus5LineHeight: CSSDesignToken<string>;

/** @public */
export declare const typeRampPlus6: CSSDirective;

/** @public */
export declare const typeRampPlus6FontSize: CSSDesignToken<string>;

/** @public */
export declare const typeRampPlus6FontVariations: CSSDesignToken<string>;

/** @public */
export declare const typeRampPlus6LineHeight: CSSDesignToken<string>;

export { }
