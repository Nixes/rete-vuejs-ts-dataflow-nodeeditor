// @ts-ignore
import VueRenderPlugin from "rete-vue-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import Rete from "rete";
import NumberOutputNode from "@/components/NodeEditor/rete-components/NumberOutputNode/NumberOutputNode";
import {AdditionNode} from "@/components/NodeEditor/rete-components/AdditionNode/AdditionNode";

let nodeEditor = async function(container) {
  var components = [
    new NumberOutputNode(),
    new AdditionNode()
  ];

  var editor = new Rete.NodeEditor("demo@0.1.0", container);
  editor.use(ConnectionPlugin);
  editor.use(VueRenderPlugin);
  editor.use(ContextMenuPlugin);
  editor.use(AreaPlugin);

  var engine = new Rete.Engine("demo@0.1.0");

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
