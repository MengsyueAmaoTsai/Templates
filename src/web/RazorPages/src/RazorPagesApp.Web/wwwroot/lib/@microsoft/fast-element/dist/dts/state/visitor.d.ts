export interface ObjectVisitor<TVisitorData> {
    visitObject(object: any, data: TVisitorData): void;
    visitArray(array: any[], data: TVisitorData): void;
    visitProperty(object: any, key: PropertyKey, value: any, data: TVisitorData): void;
}
export declare function visitObject<TVisitorData>(object: any, deep: boolean, visitor: ObjectVisitor<TVisitorData>, data: TVisitorData, traversed: WeakSet<any> | Set<any>): void;
