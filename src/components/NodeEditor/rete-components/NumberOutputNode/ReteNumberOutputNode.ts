import Rete, {Node} from "rete";
import Vue, {VueConstructor} from "vue";
import VueNumControlComponent from "@/components/NodeEditor/rete-components/NumberControl/VueNumberInputControl.vue";
import ReteNumberInputControl from "@/components/NodeEditor/rete-components/NumberControl/ReteNumberInputControl";
import numSocket from "@/components/NodeEditor/rete-components/NumSocketType";
import {NodeData, WorkerInputs, WorkerOutputs} from "rete/types/core/data";


class ReteNumberOutputNode extends Rete.Component {

    constructor(){
        super("Number");
    }

    async builder(node: Node): Promise<void> {
        const out1 = new Rete.Output('num', "Number", numSocket);

        node.addControl(new ReteNumberInputControl(this.editor, 'num')).addOutput(out1);
    }

    worker(node:NodeData, inputs:WorkerInputs, outputs:WorkerOutputs): void {
        outputs['num'] = node.data.num;
    }
}


export default ReteNumberOutputNode;
