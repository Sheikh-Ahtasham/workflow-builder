import { ReactFlow, MiniMap, Controls, Background } from "@xyflow/react";

export default function WorkflowCanvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onDrop,
  onDragOver,
  nodeTypes,
  reactFlowWrapper,
}) {
  return (
    <div className="flex-1" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
        connectionLineStyle={{ stroke: "#4f46e5", strokeWidth: 2 }}
        defaultEdgeOptions={{
          animated: true,
          style: { stroke: "#4f46e5", strokeWidth: 2 },
        }}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
