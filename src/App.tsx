import { Breadcrumbs, CssBaseline, Stack } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { UserProvider } from "./UserContext";
import {
  ThemeProvider,
  DiamondDSTheme,
} from "@diamondlightsource/sci-react-ui";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import VisitReviewPage from "./VisitReviewPage";
import DCGReviewPage from "./DCGReviewPage";
import DCViewerPage from "./DCViewerPage";
import APViewerPage from "./APViewerPage";

const queryClient = new QueryClient();

function App() {
  //Need to memo to stop extra requests
  return (
    <ThemeProvider theme={DiamondDSTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Stack sx={{ height: "100vh", width: "100vw" }} spacing={1}>
            <Header />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/visits/:id" element={<VisitReviewPage />} />
              <Route
                path="/visits/:visit_id/dcg/:dcg_id"
                element={<DCGReviewPage />}
              />
              <Route
                path="/visits/:visit_id/dcg/:dcg_id/dcviewer/:dc_id"
                element={<DCViewerPage />}
              />
              <Route
                path="/visits/:visit_id/dcg/:dcg_id/apviewer/:appa_id/:filename"
                element={<APViewerPage />}
              />
            </Routes>
          </Stack>
        </UserProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
