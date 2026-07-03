import { Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getProcParam } from "./queryfunctions";

export default function JPDetailCard(props: { pjid: number }) {
  const query = useQuery({
    queryKey: ["processing-jobs", "parameters", props.pjid],
    queryFn: () => getProcParam(props.pjid),
  });

  return (
    <Stack direction="row">
      <Stack>
        {query.data && query.data.items ? (
          Object.entries(query.data.items).map((en, i) => {
            return (
              <Typography key={i}>
                {en[0]} : {en[1]}
              </Typography>
            );
          })
        ) : (
          <Typography>No Parameters</Typography>
        )}
      </Stack>
    </Stack>
  );
}
