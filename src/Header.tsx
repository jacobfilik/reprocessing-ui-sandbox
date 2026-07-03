import { Typography } from "@mui/material";

import { useContext } from "react";

import {
  ColourSchemeButton,
  Navbar,
  User,
} from "@diamondlightsource/sci-react-ui";
import { UserContext } from "./UserContext";

export default function Header() {
  const user = useContext(UserContext);

  const handleLogin = () => window.location.assign("/oauth2/sign_in");

  const handleLogout = () => window.location.assign("/oauth2/sign_out");

  return (
    <Navbar
      logo={"theme"}
      rightSlot={
        <>
          <User
            onLogin={handleLogin}
            onLogout={handleLogout}
            user={
              user == undefined
                ? null
                : {
                    fedid: user.preferred_username,
                    name: user.given_name + " " + user.family_name,
                  }
            }
          />
          <ColourSchemeButton />
        </>
      }
    >
      <Typography variant="h4" sx={{ padding: "10px 5px 2px 5px" }}>
        Ummm, what even is this?
      </Typography>
    </Navbar>
  );
}
