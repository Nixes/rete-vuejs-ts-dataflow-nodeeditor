import Rete, {Node} from "rete";
import ReteNumberInputControl from "@/components/NodeEditor/rete-components/NumberControl/ReteNumberInputControl";
import numSocket from "@/components/NodeEditor/rete-components/NumSocketType";
import {NodeData, WorkerInputs, WorkerOutputs} from "rete/types/core/data";



export class ReteAdditionNode extends Rete.Component {
    constructor(){
        super("Add");
    }

    async builder(node: Node): Promise<void> {
        const inp1 = new Rete.Input('num-in-1', "Number", numSocket);
        const inp2 = new Rete.Input('num-in-2', "Number2", numSocket);
        const out = new Rete.Output('num-out', "Number", numSocket);

        inp1.addControl(new ReteNumberInputControl(this.editor, 'num-in-1'))
        inp2.addControl(new ReteNumberInputControl(this.editor, 'num-in-2'))

        node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new ReteNumberInputControl(this.editor, 'preview', true))
            .addOutput(out);
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs:WorkerOutputs) {
        const n1: number = (inputs['num-in-1'].length ? inputs['num-in-1'][0]:node.data.num1) as number;
        const n2: number = (inputs['num-in-2'].length ? inputs['num-in-2'][0]:node.data.num2) as number;
        const sum: number = n1 + n2;

        // @ts-ignore
        this.editor.nodes.find(n => n.id == node.id).controls.get('preview').setValue(sum);
        outputs['num-out'] = sum;
    }
}
