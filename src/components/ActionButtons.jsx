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
        className="w-full p-2 bg-purple-600 hover:bg-purple-700 transition-colors text-sm rounded-full"
      >
        Auto Arrange
      </button>
      <button
        onClick={onExport}
        className="w-full p-2 bg-green-600 hover:bg-green-700 transition-colors rounded-full"
      >
        Export JSON
      </button>
      <button
        onClick={onImport}
        className="w-full p-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-full"
      >
        Import JSON
      </button>
      <button
        onClick={onClear}
        className="w-full p-2 bg-red-600 hover:bg-red-700 transition-colors rounded-full"
      >
        Clear Canvas
      </button>
      <input ref={fileInputRef} type="file" accept=".json" className="hidden" />
    </div>
  );
}
