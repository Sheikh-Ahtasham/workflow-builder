import { useRoutes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import { ReactFlowProvider } from "@xyflow/react";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <ReactFlowProvider>
          <Dashboard />
        </ReactFlowProvider>
      ),
    },
  ]);
  return <>{routes}</>;
}
