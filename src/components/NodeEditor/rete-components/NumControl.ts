import Rete from "rete";
import {VueConstructor} from "vue";
import VueNumControlComponent from "@/components/NodeEditor/rete-components/NumberOutputNode/VueNumberOutputNode.vue";


export default class NumControl extends Rete.Control {
    private props: { readonly: any; ikey: any; emitter: any };
    private component: VueConstructor;
    private vueContext: any;

    constructor(emitter, key, readonly = undefined) {
        super(key);
        this.component = VueNumControlComponent;
        // readonly is not specified anywhere the docs, and it does not seem to be read
        this.props = { emitter, ikey: key, readonly };
    }

    setValue(val) {
        this.vueContext.value = val;
    }
}
