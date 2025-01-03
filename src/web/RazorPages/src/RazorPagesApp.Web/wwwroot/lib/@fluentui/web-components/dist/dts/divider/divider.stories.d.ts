declare const _default: {
    title: string;
    component: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").FoundationElementDefinition> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").FoundationElementDefinition, typeof import("@microsoft/fast-foundation").Divider>;
    argTypes: {
        orientation: {
            description: string;
            control: {
                type: string;
            };
            options: string[];
            default: string;
        };
        role: {
            description: string;
            control: {
                type: string;
            };
            options: string[];
            default: string;
        };
    };
};
export default _default;
export declare const Divider: any;
