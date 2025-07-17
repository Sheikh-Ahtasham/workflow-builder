import ActionButtons from "./ActionButtons";
import NodePalette from "./NodePalette";
import WorkflowStats from "./WorkflowStats";

export default function Sidebar({
  onAddNode,
  onDragStart,
  draggedNodeType,
  onAutoArrange,
  onExport,
  onImport,
  onClear,
  fileInputRef,
  nodes,
  edges,
}) {
  return (
    <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Workflow Builder</h2>
      <NodePalette
        onAddNode={onAddNode}
        onDragStart={onDragStart}
        draggedNodeType={draggedNodeType}
      />
      <ActionButtons
        onAutoArrange={onAutoArrange}
        onExport={onExport}
        onImport={onImport}
        onClear={onClear}
        fileInputRef={fileInputRef}
      />
      <WorkflowStats
        nodes={nodes}
        edges={edges}
        draggedNodeType={draggedNodeType}
      />
    </div>
  );
}
