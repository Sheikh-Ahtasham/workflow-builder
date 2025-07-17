export default function JsonModal({ show, content, onClose, onDownload }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Workflow JSON</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-64 mb-4">
          {content}
        </pre>
        <div className="flex space-x-2">
          <button
            onClick={onDownload}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Download
          </button>
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
