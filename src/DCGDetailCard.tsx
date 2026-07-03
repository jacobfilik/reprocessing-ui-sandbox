import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { getDCPage } from "./queryfunctions";
import { useQuery } from "@tanstack/react-query";
import DCDetailCard from "./DCDetailCard";

export function DCGDetailCard(props: {
  dcgid: string;
  setDcid: (id: number) => void;
}) {
  const query = useQuery({
    queryKey: ["data-groups", "data-collections", props.dcgid, 10],
    queryFn: () => getDCPage(props.dcgid, 0, 10),
  });
  return (
    <Stack sx={{ overflow: "auto" }}>
      <Stack>
        <Card>
          <CardContent>
            <Typography>
              {query.data &&
                query.data.items &&
                query.data.items.length > 0 &&
                query.data.items[0].fileTemplate}
            </Typography>
            <Button
              onClick={() => {
                if (
                  query.data &&
                  query.data.items &&
                  query.data.items.length > 0
                ) {
                  props.setDcid(query.data.items[0].dataCollectionId);
                }
              }}
            >
              Open Viewer
            </Button>
            <Stack spacing={"2px"} sx={{ overflow: "auto" }}>
              {query.data &&
                query.data.items &&
                query.data.items.map((dc, i) => {
                  return (
                    <Stack>
                      <Typography>
                        {dc.dataCollectionId}{" "}
                        {dc.imageContainerSubPath
                          ? dc.imageContainerSubPath
                          : "No detector path"}
                      </Typography>
                      <DCDetailCard
                        key={i}
                        dcid={dc.dataCollectionId}
                      ></DCDetailCard>
                    </Stack>
                  );
                })}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
}
