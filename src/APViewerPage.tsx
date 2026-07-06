import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import H5WebViewerAP from "./H5WebViewerAP";

export default function APViewerPage() {
  const { visit_id, dcg_id, appa_id, filename } = useParams();

  if (!visit_id) {
    return <Box>Nope</Box>;
  }

  if (!dcg_id) {
    return <Box>Nope</Box>;
  }

  if (!appa_id) {
    return <Box>Nope</Box>;
  }

  if (!filename) {
    return <Box>Nope</Box>;
  }

  return <H5WebViewerAP appaid={appa_id} filename={filename}></H5WebViewerAP>;
}
