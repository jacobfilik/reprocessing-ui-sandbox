import {
  Card,
  CardContent,
  CssBaseline,
  Stack,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useCallback, useState } from "react";
import { DCGList } from "./DCGList";
import { DCGDetailCard } from "./DCGDetailCard";
import ProposalChoose from "./ProposalChoose";
import H5WebViewer from "./H5WebViewer";

const queryClient = new QueryClient();

function App() {
  const theme = useTheme();

  const [code, setCode] = useState<string | null>(null);
  const [visit, setVisit] = useState(1);
  const [dcgid, setDcgid] = useState<null | number>(null);
  const [dcid, setDcid] = useState<null | number>(null);

  const cachedSetDcgid = useCallback((id: number | null) => setDcgid(id), []);

  //Need to memo to stop extra requests
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Stack sx={{ height: "100vh", width: "100vw" }} spacing={1}>
          <ProposalChoose
            setCode={setCode}
            setVisit={setVisit}
            visit={visit}
          ></ProposalChoose>
          <Stack direction="row">
            <Stack sx={{ flex: 1 }}>
              <DCGList
                code={code ? code : null}
                visit={visit}
                setDcgid={cachedSetDcgid}
              />
            </Stack>
            <Stack sx={{ flex: 1, margin: "5px" }}>
              {dcgid ? (
                <DCGDetailCard dcgid={dcgid} setDcid={setDcid}></DCGDetailCard>
              ) : (
                <Card>
                  <CardContent>
                    <Typography>
                      "No Data Collection Groups selected"
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Stack>
            <Stack sx={{ flex: 1, margin: "5px" }}>
              <Typography>
                {" "}
                {dcid ? "DCid: " + dcid : "No datacollection"}
              </Typography>
              {dcid && <H5WebViewer dcid={dcid}></H5WebViewer>}
            </Stack>
          </Stack>
        </Stack>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
