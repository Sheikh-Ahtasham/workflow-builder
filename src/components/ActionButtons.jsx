export default function ActionButtons({
  onAutoArrange,
  onExport,
  onImport,
  onClear,
  fileInputRef,
}) {
  return (
    <div className="space-y-2 mt-auto">
      <button
        onClick={onAutoArrange}
        className="w-full p-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors text-sm"
      >
        📐 Auto Arrange
      </button>
      <button
        onClick={onExport}
        className="w-full p-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
      >
        Export JSON
      </button>
      <button
        onClick={onImport}
        className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
      >
        Import JSON
      </button>
      <button
        onClick={onClear}
        className="w-full p-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
      >
        Clear Canvas
      </button>
      <input ref={fileInputRef} type="file" accept=".json" className="hidden" />
    </div>
  );
}
