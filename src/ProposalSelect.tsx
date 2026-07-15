import { Autocomplete, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getProposalPage } from "./queryfunctions";
import { useEffect, useState } from "react";
import type { Paginated, Proposal } from "./models";

function DebounceAutoComplete(props: {
  data: Paginated<Proposal> | undefined;
  setProposal: (p: Proposal | null) => void;
  setSearchFilter: (filter: string) => void;
}) {
  const [search, setSearch] = useState("");

  const setFilter = props.setSearchFilter;

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setFilter(search);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [search, setFilter]);

  return (
    <Autocomplete
      options={props.data ? props.data.items : []}
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
      console.log("Effect query");
      query.refetch();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search, query.refetch, query]);

  return (
    <DebounceAutoComplete
      data={query.data}
      setProposal={props.setProposal}
      setSearchFilter={(f: string) => {
        setSearch(f);
      }}
    ></DebounceAutoComplete>
  );
}
