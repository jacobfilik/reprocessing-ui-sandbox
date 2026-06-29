import axios, { type AxiosResponse } from "axios";
import type {
  DataCollection,
  DataCollectionGroup,
  Paginated,
  ProcessingJob,
  ProcessingParameters,
  Proposal,
  Session,
} from "./models";

const api = "/expeye/api/";
const proposals = "proposals";

export const getProposalPage = async (
  page: number,
  limit: number,
  search: string,
) => {
  const url =
    api + proposals + "?page=" + page + "&limit=" + limit + "&search=" + search;

  const { data } = await axios.get<
    Paginated<Proposal>,
    AxiosResponse<Paginated<Proposal>>
  >(url);
  return data;
};

export const getSessionPage = async (
  code: string,
  page: number,
  limit: number,
) => {
  const url =
    api +
    proposals +
    "/" +
    code +
    "/sessions" +
    "?page=" +
    page +
    "&limit=" +
    limit;

  const { data } = await axios.get<
    Paginated<Session>,
    AxiosResponse<Paginated<Session>>
  >(url);
  return data;
};

// fetch("expeye/api/proposals/sp41258/sessions/2/data-groups?page=0&limit=25");

export const getDCGPage = async (
  code: string,
  session: number,
  page: number,
  limit: number,
) => {
  const url =
    api +
    proposals +
    "/" +
    code +
    "/sessions/" +
    session +
    "/data-groups" +
    "?page=" +
    page +
    "&limit=" +
    limit;

  const { data } = await axios.get<
    Paginated<DataCollectionGroup>,
    AxiosResponse<Paginated<DataCollectionGroup>>
  >(url);
  return data;
};

export const getDCPage = async (dcgid: number, page: number, limit: number) => {
  const url =
    api +
    "data-groups" +
    "/" +
    dcgid +
    "/data-collections" +
    "?page=" +
    page +
    "&limit=" +
    limit;

  const { data } = await axios.get<
    Paginated<DataCollection>,
    AxiosResponse<Paginated<DataCollection>>
  >(url);
  return data;
};

export const getProcJob = async (dcid: number, page: number, limit: number) => {
  const url =
    api +
    "data-collections" +
    "/" +
    dcid +
    "/processing-jobs" +
    "?page=" +
    page +
    "&limit=" +
    limit;

  const { data } = await axios.get<
    Paginated<ProcessingJob>,
    AxiosResponse<Paginated<ProcessingJob>>
  >(url);
  return data;
};

export const getProcParam = async (pjid: number) => {
  const url = api + "processing-jobs" + "/" + pjid + "/parameters";

  const { data } = await axios.get<
    ProcessingParameters,
    AxiosResponse<ProcessingParameters>
  >(url);
  return data;
};
