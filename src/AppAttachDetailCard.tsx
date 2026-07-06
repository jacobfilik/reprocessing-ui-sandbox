import { useQuery } from "@tanstack/react-query";
import { getProcAttach } from "./queryfunctions";
import { Button, Stack, Typography } from "@mui/material";

export default function AppAttachDetailCard(props: {
  appid: number;
  setAppAInfo: (appaid: number, fileName: string) => void;
}) {
  const query = useQuery({
    queryKey: ["processing-programs", "attachments", props.appid],
    queryFn: () => getProcAttach(props.appid),
  });

  return (
    <Stack>
      <Typography>Processing Program: {props.appid}</Typography>
      {query.data && query.data.items ? (
        query.data.items.map((en, i) => {
          return (
            <Stack direction="row">
              <Typography key={i}>{en.fileName}</Typography>
              {(en.fileName.endsWith(".nxs") ||
                en.fileName.endsWith(".h5") ||
                en.fileName.endsWith(".hdf5")) && (
                <Button
                  onClick={() => {
                    props.setAppAInfo(
                      en.autoProcProgramAttachmentId,
                      en.fileName,
                    );
                  }}
                >
                  Click
                </Button>
              )}
            </Stack>
          );
        })
      ) : (
        <Typography>No Attachments</Typography>
      )}
    </Stack>
  );
}
