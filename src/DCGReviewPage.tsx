import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { DCGDetailCard } from "./DCGDetailCard";

export default function DCGReviewPage() {
  const { visit_id, dcg_id } = useParams();
  const navigate = useNavigate();

  if (!visit_id) {
    return <Box>Nope</Box>;
  }

  if (!dcg_id) {
    return <Box>Nope</Box>;
  }

  return (
    <DCGDetailCard
      dcgid={dcg_id}
      setDcid={(dcid: number | null) => {
        if (dcid != null) {
          navigate(
            "/visits/" + visit_id + "/dcg/" + dcg_id + "/dcviewer/" + dcid,
          );
        }
      }}
    ></DCGDetailCard>
  );
}
