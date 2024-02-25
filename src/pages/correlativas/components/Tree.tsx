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
import CustomNode from "@/components/CustomNode";
import "reactflow/dist/base.css";
import { initNodes } from "../nodos";
import { initEdges } from "../edges";

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const CorrelativasTree = () => {
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
      fitView
      className="bg-teal-50 min-h-[calc(100vh-64px)]"
    >
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
};

export default CorrelativasTree;
