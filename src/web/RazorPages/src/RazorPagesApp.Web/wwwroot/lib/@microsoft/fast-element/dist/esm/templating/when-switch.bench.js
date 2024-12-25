var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { attr, FASTElement, html, nullableNumberConverter, when } from "../index.js";
const emotionalTemplates = {
    depressed: html `
        <div>
            <span>I'm so depressed :O</span>
        </div>
    `,
    sad: html `
        <div>
            <span>I'm so sad :(</span>
        </div>
    `,
    happy: html `
        <div>
            <span>I'm so happy :)</span>
        </div>
    `,
    ecstatic: html `
        <div>
            <span>I'm so ecstatic :D</span>
        </div>
    `,
    indifferent: html `
        <div>
            <span>I'm indifferent :|</span>
        </div>
    `,
};
class TestWhen extends FASTElement {
    constructor() {
        super(...arguments);
        this.value = 0;
    }
}
__decorate([
    attr({
        mode: "fromView",
        converter: nullableNumberConverter,
    }),
    __metadata("design:type", Number)
], TestWhen.prototype, "value", void 0);
TestWhen.define({
    name: "test-when",
    template: html `
        <button @click="${x => x.update(true)}">Click Me</button>
        ${when(x => x.value <= 1, emotionalTemplates.depressed)}
        ${when(x => x.value === 2 || x.value === 3, emotionalTemplates.sad)}
        ${when(x => x.value === 4 || x.value === 5, emotionalTemplates.indifferent)}
        ${when(x => x.value >= 6 && x.value < 9, emotionalTemplates.happy)}
        ${when(x => x.value === 9 || x.value === 10, emotionalTemplates.ecstatic)}
    `,
});
const itemRenderer = () => {
    const testWhen = document.createElement("test-when");
    testWhen.click();
    return testWhen;
};
export default itemRenderer;
export { tests } from "@tensile-perf/web-components";
