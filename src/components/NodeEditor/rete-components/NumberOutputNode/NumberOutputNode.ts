import Rete from "rete";
import Vue, {VueConstructor} from "vue";
import VueNumControlComponent from "@/components/NodeEditor/rete-components/NumberOutputNode/VueNumberOutputNode.vue";
import NumControl from "@/components/NodeEditor/rete-components/NumControl";
import numSocket from "@/components/NodeEditor/rete-components/NumSocketType";


class NumberOutputNode extends Rete.Component {

    constructor(){
        super("Number");
    }

    builder(node) {
        var out1 = new Rete.Output('num', "Number", numSocket);

        return node.addControl(new NumControl(this.editor, 'num')).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.data.num;
    }
}


export default NumberOutputNode;
