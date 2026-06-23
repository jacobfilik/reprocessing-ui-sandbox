import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getProposalPage } from "./queryfunctions";
import { useEffect, useState } from "react";
import type { Proposal } from "./models";

export default function ProposalSelect(props: {
  setProposal: (p: Proposal | null) => void;
}) {
  const [search, setSearch] = useState("");
  const query = useQuery({
    queryKey: ["proposals", 0, 25, search],
    queryFn: () => getProposalPage(0, 25, search),
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      query.refetch();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search, query.refetch, query]);

  return (
    <Autocomplete
      options={query.data ? query.data.items : []}
      getOptionLabel={(o) => {
        return o.proposalCode + +o.proposalNumber + ": " + o.title;
      }}
      onInput={(e) => {
        // @ts-expect-error: Type error
        setSearch(e.target.value);
      }}
      onChange={(_e, v) => {
        props.setProposal(v);
      }}
      renderInput={(params) => <TextField {...params} label="Proposals" />}
    ></Autocomplete>
  );
}
