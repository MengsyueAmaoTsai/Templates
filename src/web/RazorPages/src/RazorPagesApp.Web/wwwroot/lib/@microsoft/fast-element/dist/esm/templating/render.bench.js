var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { attr, css, FASTElement, html, oneTime, repeat } from "../index.js";
import { data } from "../__test__/utilities.js";
const xItemTemplate = html `
    <div @click="${x => x.onClick}" class="item">${x => x.value}</div>
`;
const styles = css `
    .item {
        display: flex;
    }
`;
class XItem extends FASTElement {
    onClick(e) {
        console.log(e.type);
    }
}
__decorate([
    attr,
    __metadata("design:type", Object)
], XItem.prototype, "value", void 0);
XItem.define({
    name: "x-item",
    template: xItemTemplate,
    styles,
});
const xAppTemplate = html `
    <div id="test-container">
        ${repeat(x => x.items, html `
                <x-item :value="${oneTime((x) => x.label)}"></x-item>
            `)}
    </div>
`;
class XApp extends FASTElement {
    constructor() {
        super(...arguments);
        this.items = data;
    }
}
XApp.define({
    name: "x-app",
    template: xAppTemplate,
});
const itemRenderer = () => {
    const testRender = document.createElement("x-app");
    return testRender;
};
export default itemRenderer;
export { tests } from "@tensile-perf/web-components";
