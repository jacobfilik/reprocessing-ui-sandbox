import {
  Card,
  CardContent,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getDCGPage } from "./queryfunctions";
import type { DataCollectionGroup } from "./models";
import { useState } from "react";

function DCGCard(props: { dcg: DataCollectionGroup }) {
  return (
    <Card>
      <CardContent>
        <Typography>{props.dcg.startTime}</Typography>
        <Typography>
          {props.dcg.scanParameters ? props.dcg.scanParameters : ""}
        </Typography>
      </CardContent>
    </Card>
  );
}

function DCGListInner(props: {
  code: string;
  visit: number;
  page: number;
  setTotal: (total: number) => void;
}) {
  const query = useQuery({
    queryKey: [
      "proposals",
      "sessions",
      "data-groups",
      props.code,
      props.visit,
      props.page,
      25,
    ],
    queryFn: () => getDCGPage(props.code, props.visit, 0, 25),
  });

  if (query.data) {
    props.setTotal(query.data.total);
  }

  return (
    <Stack>
      {query.data ? (
        query.data.items.map((dcg) => {
          return <DCGCard key={dcg.dataCollectionGroupId} dcg={dcg} />;
        })
      ) : (
        <Typography>No Data</Typography>
      )}
    </Stack>
  );
}

export function DCGList(props: { code: string | null; visit: number }) {
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (props.code == null) {
    return <Stack>No Visit Selected</Stack>;
  }
  return (
    <Stack>
      <DCGListInner
        code={props.code}
        visit={props.visit}
        page={page}
        setTotal={setTotal}
      />
      <Pagination count={Math.ceil(total / 25)} onChange={handleChange} />
    </Stack>
  );
}
