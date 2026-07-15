import {
  Card,
  CardActionArea,
  CardContent,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getDCGPage, getDCPage } from "./queryfunctions";
import type { DataCollectionGroup } from "./models";
import { useEffect, useState } from "react";

function DCGCard(props: {
  dcg: DataCollectionGroup;
  setDcgid: (dcgid: number | null) => void;
}) {
  const query = useQuery({
    queryKey: [
      "data-groups",
      "data-collections",
      props.dcg.dataCollectionGroupId,
      1,
    ],
    queryFn: () => getDCPage(props.dcg.dataCollectionGroupId.toString(), 0, 1),
  });

  return (
    <Card>
      <CardActionArea
        onClick={() => {
          console.log(props.dcg.dataCollectionGroupId);
          props.setDcgid(props.dcg.dataCollectionGroupId);
        }}
      >
        <CardContent>
          <Typography>{props.dcg.startTime}</Typography>
          <Typography>
            {props.dcg.scanParameters ? props.dcg.scanParameters : ""}
          </Typography>
          <Typography>
            {query.data &&
              query.data.items &&
              query.data.items.length > 0 &&
              query.data.items[0].fileTemplate}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function DebouncedFilter(props: { setFilter: (f: string) => void }) {
  const [localFilter, setLocalFilter] = useState("");

  const setFilter = props.setFilter;

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setFilter(localFilter);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [localFilter, setFilter]);

  return (
    <TextField
      value={localFilter}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalFilter(event.target.value);
      }}
    ></TextField>
  );
}

function DCGListInner(props: {
  code: string;
  visit: string;
  page: number;
  setPage: (page: number) => void;
  setDcgid: (dcgid: number | null) => void;
}) {
  const [filter, setFilter] = useState("");
  const query = useQuery({
    queryKey: [
      "proposals",
      "sessions",
      "data-groups",
      props.code,
      props.visit,
      props.page,
      filter,
      25,
    ],
    queryFn: () => getDCGPage(props.code, props.visit, props.page, filter, 25),
  });

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    props.setPage(value * -1);
  };

  return (
    <Stack spacing={"5px"} sx={{ padding: "5px" }}>
      <DebouncedFilter setFilter={setFilter}></DebouncedFilter>
      {query.data ? (
        query.data.items.reverse().map((dcg) => {
          return (
            <DCGCard
              key={dcg.dataCollectionGroupId}
              dcg={dcg}
              setDcgid={props.setDcgid}
            />
          );
        })
      ) : (
        <Typography>No Data</Typography>
      )}

      {query.data && (
        <Pagination
          count={Math.ceil(query.data.total / 25)}
          onChange={handleChange}
        />
      )}
    </Stack>
  );
}

export function DCGList(props: {
  code: string | null;
  visit: string;
  setDcgid: (dcgid: number | null) => void;
}) {
  const [page, setPage] = useState(-1);

  if (props.code == null) {
    return <Stack>No Visit Selected</Stack>;
  }

  console.log(page);
  return (
    <Stack spacing={"5px"} sx={{ overflow: "auto" }}>
      <DCGListInner
        code={props.code}
        visit={props.visit}
        page={page}
        setPage={setPage}
        setDcgid={props.setDcgid}
      />
    </Stack>
  );
}
