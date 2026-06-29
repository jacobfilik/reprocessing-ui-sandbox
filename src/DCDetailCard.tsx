import { Card, CardContent, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getProcJob } from "./queryfunctions";
import JPDetailCard from "./JPDetailCard";

export default function DCDetailCard(props: { dcid: number }) {
  const query = useQuery({
    queryKey: ["data-collections", "processing-jobs", props.dcid, 10],
    queryFn: () => getProcJob(props.dcid, 0, 10),
  });
  return (
    <Card>
      <CardContent>
        {query.data && query.data.items && (
          <Stack>
            {query.data.items.map((pj) => {
              return (
                <Card>
                  <CardContent>
                    <Typography>{pj.recipe}</Typography>
                    <Typography>
                      {pj.autoProcProgram[0].processingPrograms}
                    </Typography>

                    <JPDetailCard pjid={pj.processingJobId}></JPDetailCard>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
