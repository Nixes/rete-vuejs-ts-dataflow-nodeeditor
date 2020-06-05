import Rete from "rete";
import ReteNumberInputControl from "@/components/NodeEditor/rete-components/NumberControl/ReteNumberInputControl";
import numSocket from "@/components/NodeEditor/rete-components/NumSocketType";



export class ReteAdditionNode extends Rete.Component {
    constructor(){
        super("Add");
    }

    builder(node) {
        var inp1 = new Rete.Input('num-in-1',"Number", numSocket);
        var inp2 = new Rete.Input('num-in-2', "Number2", numSocket);
        var out = new Rete.Output('num-out', "Number", numSocket);

        inp1.addControl(new ReteNumberInputControl(this.editor, 'num-in-1'))
        inp2.addControl(new ReteNumberInputControl(this.editor, 'num-in-2'))

        return node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new ReteNumberInputControl(this.editor, 'preview', true))
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        var n1 = inputs['num'].length?inputs['num'][0]:node.data.num1;
        var n2 = inputs['num2'].length?inputs['num2'][0]:node.data.num2;
        var sum = n1 + n2;

        // @ts-ignore not sure why this does not work, pulled it from an example
        this.editor.nodes.find(n => n.id == node.id).controls.get('preview').setValue(sum);
        outputs['num'] = sum;
    }
}
