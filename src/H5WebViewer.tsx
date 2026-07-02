import {
  App,
  createAxiosFetcher,
  H5GroveProvider,
  //   MockProvider,
} from "@h5web/app";
// import { useLocation } from "react-router-dom";

import "@h5web/app/styles.css";
// import "./h5web.css";

// const URL = import.meta.env.VITE_H5GROVE_URL;
// const FILEPATH = import.meta.env.VITE_H5GROVE_FALLBACK_FILEPATH;

import type { FeedbackContext } from "@h5web/app";
import { getFeedbackMailto } from "@h5web/app";

import axios from "axios";

function getFeedbackURL(context: FeedbackContext): string {
  const email = "no-one@nowhere.com";
  return getFeedbackMailto(context, email);
}

export default function H5WebViewer(props: { dcid: number }) {
  // assertEnvVar(URL, 'VITE_H5GROVE_URL');
  //assertEnvVar(FILEPATH, 'VITE_H5GROVE_FALLBACK_FILEPATH');

  // const filepath = "/data/lizard.nxs"
  // const URL = "http://localhost:5173/api"

  const URL = location.protocol + "//" + location.host + "/groveapi";
  //   const query = new URLSearchParams(useLocation().search);
  //   const dcid = query.get("dcid");
  //   const appaid = query.get("appaid");

  console.log(URL);
  const api = axios.create({
    params: { dcid: props.dcid },
  });

  return (
    <H5GroveProvider
      url={URL}
      filepath={"from_dcid"}
      fetcher={createAxiosFetcher(api)}
      //   axiosConfig={{ params: { dcid: dcid, appaid: appaid } }}
    >
      <App sidebarOpen={true} getFeedbackURL={getFeedbackURL} />
    </H5GroveProvider>
  );
}
