export default function WorkflowStats({ nodes, edges, draggedNodeType }) {
  return (
    <div className="mt-4 text-sm text-gray-400 space-y-1">
      <div>Nodes: {nodes.length}</div>
      <div>Connections: {edges.length}</div>
      <div className="text-xs opacity-75">
        Auto-saved: {new Date().toLocaleTimeString()}
      </div>
      {draggedNodeType && (
        <div className="text-blue-400 animate-pulse">
          Dragging: {draggedNodeType}
        </div>
      )}
    </div>
  );
}
