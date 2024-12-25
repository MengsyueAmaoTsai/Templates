import { FASTElement } from "../index.js";
export declare class TestObservable extends FASTElement {
    private _greetMessage;
    private _name;
    private _exit;
    firstName: string;
    lastName: string;
    connectedCallback(): void;
    get greetMessage(): string;
    set greetMessage(value: string);
    get name(): string;
    set name(value: string);
    get exit(): boolean;
    set exit(value: boolean);
}
declare const itemRenderer: () => HTMLElement;
export default itemRenderer;
export { tests } from "@tensile-perf/web-components";
