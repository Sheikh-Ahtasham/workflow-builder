import { Handle, Position } from "@xyflow/react";

export default function StartNode({ data, selected }) {
  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md border-2 ${
        selected ? "border-green-500 shadow-lg" : "border-green-300"
      }`}
      style={{
        background: "#10b981",
        color: "white",
        minWidth: "120px",
      }}
    >
      <div className="flex flex-col items-center">
        <div className="text-xs font-semibold opacity-75">START</div>
        <div className="font-bold">{data.label}</div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-green-600 border-2 border-white"
        style={{ right: -6 }}
      />
    </div>
  );
}
