function shouldTraverse(value, traversed) {
    return (value !== null &&
        value !== void 0 &&
        typeof value === "object" &&
        !traversed.has(value));
}
export function visitObject(object, deep, visitor, data, traversed) {
    if (!shouldTraverse(object, traversed)) {
        return;
    }
    traversed.add(object);
    if (Array.isArray(object)) {
        visitor.visitArray(object, data);
        for (const item of object) {
            visitObject(item, deep, visitor, data, traversed);
        }
    }
    else {
        visitor.visitObject(object, data);
        for (const key in object) {
            const value = object[key];
            visitor.visitProperty(object, key, value, data);
            if (deep) {
                visitObject(value, deep, visitor, data, traversed);
            }
        }
    }
}
