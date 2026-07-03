import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import H5WebViewer from "./H5WebViewer";

export default function DCViewerPage() {
  const { visit_id, dcg_id, dc_id } = useParams();

  if (!visit_id) {
    return <Box>Nope</Box>;
  }

  if (!dcg_id) {
    return <Box>Nope</Box>;
  }

  if (!dc_id) {
    return <Box>Nope</Box>;
  }

  return <H5WebViewer dcid={dc_id}></H5WebViewer>;
}
