import { Handle, Position } from "@xyflow/react";

export default function CustomNode({ data, selected }) {
  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md border-2 ${
        selected ? "border-blue-500 shadow-lg" : "border-gray-300"
      }`}
      style={{
        background: data.background || "#fff",
        color: data.color || "#000",
        minWidth: "120px",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-gray-400 border-2 border-white"
        style={{ left: -6 }}
      />
      <div className="flex flex-col items-center">
        <div className="text-xs font-semibold opacity-75">{data.type}</div>
        <div className="font-bold">{data.label}</div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-gray-400 border-2 border-white"
        style={{ right: -6 }}
      />
    </div>
  );
}
