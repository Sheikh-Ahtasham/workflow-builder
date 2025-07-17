export default function NodePalette({ onAddNode, onDragStart }) {
  const triggerNodes = ["Webhook"];
  const actionNodes = ["Email", "Database", "API", "Filter"];
  const endNodes = ["Success", "Error"];

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold mb-3 text-gray-300">Triggers</h3>
      <div className="space-y-2 mb-4">
        {triggerNodes.map((nodeType) => (
          <div
            key={nodeType}
            draggable
            onDragStart={(e) => onDragStart(e, nodeType)}
            onClick={() => onAddNode(nodeType)}
            className="w-full p-2 text-left bg-green-700 hover:bg-green-600 rounded transition-colors cursor-grab active:cursor-grabbing"
          >
            {nodeType}
          </div>
        ))}
      </div>

      <h3 className="text-sm font-semibold mb-3 text-gray-300">Actions</h3>
      <div className="space-y-2 mb-4">
        {actionNodes.map((nodeType) => (
          <div
            key={nodeType}
            draggable
            onDragStart={(e) => onDragStart(e, nodeType)}
            onClick={() => onAddNode(nodeType)}
            className="w-full p-2 text-left bg-gray-700 hover:bg-gray-600 rounded transition-colors cursor-grab active:cursor-grabbing"
          >
            {nodeType}
          </div>
        ))}
      </div>

      <h3 className="text-sm font-semibold mb-3 text-gray-300">End Points</h3>
      <div className="space-y-2">
        {endNodes.map((nodeType) => (
          <div
            key={nodeType}
            draggable
            onDragStart={(e) => onDragStart(e, nodeType)}
            onClick={() => onAddNode(nodeType)}
            className="w-full p-2 text-left bg-red-700 hover:bg-red-600 rounded transition-colors cursor-grab active:cursor-grabbing"
          >
            {nodeType}
          </div>
        ))}
      </div>
    </div>
  );
}
