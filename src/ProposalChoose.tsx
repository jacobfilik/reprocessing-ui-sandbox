import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import type { Proposal } from "./models";
import { useState } from "react";
import ProposalSelect from "./ProposalSelect";

export default function ProposalChoose(props: {
  setCode: (code: string | null) => void;
  visit: number;
  setVisit: (visit: number) => void;
}) {
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const maxVisit = proposal ? proposal.sessions : 1;
  const handleChange = (event: SelectChangeEvent) => {
    props.setVisit(Number.parseInt(event.target.value));
  };

  return (
    <Stack spacing={"10px"} sx={{ margin: "5px" }}>
      <Typography variant="h4">Select Visit</Typography>
      <ProposalSelect
        setProposal={(p) => {
          setProposal(p);
          props.setVisit(1);
          if (p != null) {
            props.setCode(p.proposalCode + p.proposalNumber);
          }
        }}
      ></ProposalSelect>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Visit</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.visit}
          label="visit"
          // @ts-expect-error: Type error
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
    </Stack>
  );
}
