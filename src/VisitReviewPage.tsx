import { Box, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { DCGList } from "./DCGList";

export default function VisitReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    return <Box>Nope</Box>;
  }

  const info = id.split("-");

  return (
    <Stack direction="row" sx={{ overflow: "hidden" }}>
      <Stack sx={{ flex: 1 }} direction={"row"}>
        <Stack sx={{ flex: 1 }}>
          <DCGList
            code={info[0]}
            visit={info[1]}
            setDcgid={(dcgid: number | null) => {
              if (dcgid != null) {
                navigate("/visits/" + id + "/dcg/" + dcgid);
              }
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
