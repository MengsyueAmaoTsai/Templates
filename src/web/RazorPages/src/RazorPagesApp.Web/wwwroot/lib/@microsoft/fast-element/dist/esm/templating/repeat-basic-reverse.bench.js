var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { attr, FASTElement, html, nullableNumberConverter, repeat } from "../index.js";
class TestRepeat extends FASTElement {
    constructor() {
        super(...arguments);
        this.count = 0;
        this.items = new Array(this.count).fill("foo");
    }
    connectedCallback() {
        super.connectedCallback();
        this.items.reverse();
    }
}
__decorate([
    attr({
        mode: "fromView",
        converter: nullableNumberConverter,
    }),
    __metadata("design:type", Number)
], TestRepeat.prototype, "count", void 0);
TestRepeat.define({
    name: "test-repeat",
    template: html `
        ${repeat(x => x.items, html `
                <span>${x => x}</span>
            `)}
    `,
});
const itemRenderer = () => {
    const testRepeat = document.createElement("test-repeat");
    testRepeat.setAttribute("count", "100");
    return testRepeat;
};
export default itemRenderer;
export { tests } from "@tensile-perf/web-components";
