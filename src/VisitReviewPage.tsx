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
        {/* <Stack sx={{ flex: 1, margin: "5px" }}>
                  {dcgid ? (
                    <DCGDetailCard
                      dcgid={dcgid}
                      setDcid={setDcid}
                    ></DCGDetailCard>
                  ) : (
                    <Card>
                      <CardContent>
                        <Typography>
                          "No Data Collection Groups selected"
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                </Stack>
              </Stack>
              <Stack sx={{ flex: 1, margin: "5px" }}>
                <Typography>
                  {" "}
                  {dcid ? "DCid: " + dcid : "No datacollection"}
                </Typography>
                {dcid && <H5WebViewer dcid={dcid}></H5WebViewer>}
              </Stack> */}
      </Stack>
    </Stack>
  );
}
