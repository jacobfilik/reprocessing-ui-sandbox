import {
  Button,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  ThemeProvider,
  Typography,
  useTheme,
  type SelectChangeEvent,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProposalSelect from "./ProposalSelect";
import type { Proposal } from "./models";
import { useState } from "react";
import { DCGList } from "./DCGList";

const queryClient = new QueryClient();

function App() {
  const theme = useTheme();

  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [visit, setVisit] = useState(1);

  const handleChange = (event: SelectChangeEvent) => {
    setVisit(Number.parseInt(event.target.value));
  };

  const maxVisit = proposal ? proposal.sessions : 1;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Stack sx={{ height: "100vh", width: "100vw" }} spacing={1}>
          <Typography variant="h4">
            {proposal
              ? proposal.proposalCode + proposal.proposalNumber
              : "No Proposal"}
          </Typography>
          <Typography variant="h4">{proposal ? proposal.title : ""}</Typography>
          <ProposalSelect
            setProposal={(p) => {
              setProposal(p);
              setVisit(1);
            }}
          ></ProposalSelect>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Visit</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={visit}
              label="visit"
              onChange={handleChange}
            >
              {[...Array(maxVisit).keys()].map((i) => {
                return (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <DCGList
            code={proposal ? proposal.proposalCode : null}
            visit={visit}
          />
        </Stack>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
