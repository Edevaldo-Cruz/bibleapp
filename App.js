import React, { useEffect, useState } from "react";
import AppRoutes from "./src/routes/AppRoutes";

import { createTableUser } from "./src/services/SQLite/user";
import { createTableLatestReadings } from "./src/services/SQLite/latestReadings";
import Load from "./src/components/Load";
import { createTableFavoriteVerse } from "./src/services/SQLite/favoriteVerse";

export default function App() {
  const [tablesCreated, setTablesCreated] = useState(false);

  useEffect(() => {
    async function setupTables() {
      try {
        createTableUser();
        createTableLatestReadings();
        createTableFavoriteVerse();
        setTablesCreated(true);
      } catch (error) {
        console.error("Erro ao criar tabelas:", error);
      }
    }

    setupTables();
  }, []);

  if (!tablesCreated) {
    return <Load />;
  }

  return <AppRoutes />;
}
