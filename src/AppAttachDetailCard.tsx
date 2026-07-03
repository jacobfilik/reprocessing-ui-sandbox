import { useQuery } from "@tanstack/react-query";
import { getProcAttach } from "./queryfunctions";
import { Stack, Typography } from "@mui/material";

export default function AppAttachDetailCard(props: { appid: number }) {
  const query = useQuery({
    queryKey: ["processing-programs", "attachments", props.appid],
    queryFn: () => getProcAttach(props.appid),
  });

  console.log(query.data?.items);

  return (
    <Stack>
      <Typography>Processing Program: {props.appid}</Typography>
      {query.data && query.data.items ? (
        query.data.items.map((en, i) => {
          return <Typography key={i}>{en.fileName}</Typography>;
        })
      ) : (
        <Typography>No Attachments</Typography>
      )}
    </Stack>
  );
}
