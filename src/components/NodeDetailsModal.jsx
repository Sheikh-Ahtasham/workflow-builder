export default function NodeDetailsModal({
  show,
  node,
  onClose,
  onUpdateNode,
}) {
  if (!show || !node) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Node Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Node ID:
            </label>
            <p className="text-sm text-gray-600">{node.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Type:</label>
            <p className="text-sm text-gray-600">{node.data.type}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Label:</label>
            <input
              type="text"
              value={node.data.label}
              onChange={(e) => onUpdateNode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Position:
            </label>
            <p className="text-sm text-gray-600">
              X: {Math.round(node.position.x)}, Y: {Math.round(node.position.y)}
            </p>
          </div>
        </div>
        <div className="flex space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
