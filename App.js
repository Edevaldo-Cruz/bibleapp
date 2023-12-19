import React, { useEffect } from "react";
import AppRoutes from "./src/routes/AppRoutes";

import { createTableUser } from "./src/services/SQLite/user";
import { createTableLatestReadings } from "./src/services/SQLite/latestReadings";

export default function App() {
  useEffect(() => {
    createTableUser();
    createTableLatestReadings();
  }, []);

  return <AppRoutes />;
}
