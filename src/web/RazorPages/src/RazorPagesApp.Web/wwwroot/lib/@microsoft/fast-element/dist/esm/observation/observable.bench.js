var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { attr, FASTElement, Observable } from "../index.js";
import { _random, adjectives, nouns } from "../__test__/utilities.js";
export class TestObservable extends FASTElement {
    constructor() {
        super(...arguments);
        this._greetMessage = "";
        this._name = "";
        this._exit = false;
    }
    connectedCallback() {
        super.connectedCallback();
        const first = this.firstName[0].toUpperCase() + this.firstName.slice(1);
        const last = this.lastName[0].toUpperCase() + this.lastName.slice(1);
        this.name = `${first} ${last}`;
        this.greetMessage = `Welcome to FAST, ${this.name} !!`;
    }
    get greetMessage() {
        Observable.track(this, "greetMessage");
        return this._greetMessage;
    }
    set greetMessage(value) {
        this._greetMessage = value;
        Observable.notify(this, "greetMessage");
    }
    get name() {
        Observable.track(this, "name");
        return this._name;
    }
    set name(value) {
        this._name = value;
        Observable.notify(this, "name");
    }
    get exit() {
        Observable.track(this, "exit");
        return this._exit;
    }
    set exit(value) {
        this._exit = value;
        Observable.notify(this, "exit");
    }
}
__decorate([
    attr,
    __metadata("design:type", String)
], TestObservable.prototype, "firstName", void 0);
__decorate([
    attr,
    __metadata("design:type", String)
], TestObservable.prototype, "lastName", void 0);
TestObservable.define({
    name: "test-observable",
});
const itemRenderer = () => {
    const testObservable = document.createElement("test-observable");
    testObservable.setAttribute("firstname", adjectives[_random(adjectives.length)]);
    testObservable.setAttribute("lastname", nouns[_random(nouns.length)]);
    const notifier = Observable.getNotifier(testObservable);
    const handler = {
        handleChange(source, propertyName) {
            if (propertyName === "greetMessage")
                source._exit = true;
        },
    };
    notifier.subscribe(handler, "greetMessage");
    testObservable.greetMessage = `Goodbye ${testObservable.name}, see you next time!`;
    notifier.unsubscribe(handler, "greetMessage");
    return testObservable;
};
export default itemRenderer;
export { tests } from "@tensile-perf/web-components";
