// @ts-ignore
import VueRenderPlugin from "rete-vue-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
// @ts-ignore
import AreaPlugin from "rete-area-plugin";
// @ts-ignore
import ContextMenuPlugin from "rete-context-menu-plugin";
import Rete from "rete";
import ReteNumberOutputNode from "@/components/NodeEditor/rete-components/NumberOutputNode/ReteNumberOutputNode";
import {ReteAdditionNode} from "@/components/NodeEditor/rete-components/AdditionNode/ReteAdditionNode";

let nodeEditor = async function(container: any|HTMLElement) {
  const components = [
    new ReteNumberOutputNode(),
    new ReteAdditionNode()
  ];

  const editor = new Rete.NodeEditor("demo@0.1.0", container);
  editor.use(ConnectionPlugin);
  editor.use(VueRenderPlugin);
  editor.use(ContextMenuPlugin);
  editor.use(AreaPlugin);

  const engine = new Rete.Engine("demo@0.1.0");

  components.map(c => {
    editor.register(c);
    engine.register(c);
  });

  let nodes = [
      await components[0].createNode(),
      await components[1].createNode({num:2})
  ];



  for (const node of nodes) {
    node.position = [80, 200];
    editor.addNode(node)
  }

  editor.on(
    ["process","nodecreated","noderemoved","connectioncreated","connectionremoved"],
    async () => {
      await engine.abort();
      await engine.process(editor.toJSON());
    }
  );

  editor.view.resize();
  AreaPlugin.zoomAt(editor);

  setTimeout(() => editor.trigger("process"), 1000);

  return editor;
}

export default nodeEditor;
