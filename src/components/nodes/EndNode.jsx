import { Handle, Position } from "@xyflow/react";

export default function EndNode({ data, selected }) {
  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md border-2 ${
        selected ? "border-red-500 shadow-lg" : "border-red-300"
      }`}
      style={{
        background: "#ef4444",
        color: "white",
        minWidth: "120px",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-red-600 border-2 border-white"
        style={{ left: -6 }}
      />
      <div className="flex flex-col items-center">
        <div className="text-xs font-semibold opacity-75">END</div>
        <div className="font-bold">{data.label}</div>
      </div>
    </div>
  );
}
