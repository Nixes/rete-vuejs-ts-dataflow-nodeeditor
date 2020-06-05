import Rete from "rete";
import Vue, {VueConstructor} from "vue";
import VueNumControlComponent from "@/components/NodeEditor/rete-components/NumberControl/VueNumberInputControl.vue";
import ReteNumberInputControl from "@/components/NodeEditor/rete-components/NumberControl/ReteNumberInputControl";
import numSocket from "@/components/NodeEditor/rete-components/NumSocketType";


class ReteNumberOutputNode extends Rete.Component {

    constructor(){
        super("Number");
    }

    builder(node) {
        var out1 = new Rete.Output('num', "Number", numSocket);

        return node.addControl(new ReteNumberInputControl(this.editor, 'num')).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.data.num;
    }
}


export default ReteNumberOutputNode;
