import { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  NodeTypes,
  OnConnect,
} from "reactflow";
import { CustomNode } from "@/components/sections/custom-node";
import "reactflow/dist/base.css";
import { initNodes } from "@/lib/subjects/nodes";
import { initEdges } from "@/lib/subjects/edges";

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const SubjectsTree = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, _, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      // fitView
      className="bg-teal-50 min-h-[calc(100vh-150px)]"
      defaultViewport={{ x: 200, y: 100, zoom: 0.5 }}
    >
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
};

export default SubjectsTree;
