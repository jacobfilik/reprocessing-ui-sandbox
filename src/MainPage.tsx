import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { Box, Button, Stack } from "@mui/material";
import ProposalChoose from "./ProposalChoose";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const user = useContext(UserContext);
  const [code, setCode] = useState<string | null>(null);
  const [visit, setVisit] = useState(1);
  const navigate = useNavigate();

  if (!user) {
    return <Box>Log in.</Box>;
  }

  return (
    <Stack>
      <ProposalChoose
        setCode={setCode}
        setVisit={setVisit}
        visit={visit}
      ></ProposalChoose>
      <Button
        onClick={() => {
          if (code != null) {
            navigate("/visits/" + code + "-" + visit);
          }
        }}
      >
        GO!
      </Button>
    </Stack>
  );
}
