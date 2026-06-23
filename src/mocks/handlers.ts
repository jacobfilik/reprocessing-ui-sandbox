import { http, HttpResponse } from "msw";
import type { DataCollectionGroup, Paginated, Proposal } from "../models";

const api = "/expeye/api/";

export const handlers = [
  http.get(api + "proposals", async ({ request }) => {
    const url = new URL(request.url);
    const s = url.searchParams.get("search");
    console.log(s);

    const p1: Proposal = {
      bltimeStamp: "2026-05-12T08:18:29",
      personId: 1,
      proposalCode: "sp",
      proposalId: 1,
      proposalNumber: "1235",
      proposalType: null,
      title: "test title",
      sessions: 2,
      state: null,
    };

    const p2 = { ...p1, proposalCode: "mx", proposalNumber: "1236" };

    const page: Paginated<Proposal> = {
      items: [p1, p2],
      limit: 25,
      total: 2,
      page: 1,
    };

    return HttpResponse.json(page);
  }),
  http.get(
    api + "proposals/:code/sessions/:visit/data-groups",
    async ({ params }) => {
      const { code, visit } = params;

      console.log(code + "-" + visit);

      const dcg1: DataCollectionGroup = {
        actualContainerBarcode: null,
        actualSampleBarcode: null,
        actualSampleSlotInContainer: null,
        actualSampleSlotInSC: null,
        collections: null,
        comments: null,
        crystalClass: null,
        dataCollectionGroupId: 1,
        detectorMode: null,
        endTime: "2026-05-07T14:44:31",
        experimentType: null,
        experimentTypeId: null,
        experimentTypeName: null,
        sampleId: null,
        scanParameters: "{'test' : 'value'}",
        sessionId: 1,
        startTime: "2026-05-07T14:44:31",
        xtalSnapshotFullPath: null,
      };

      const dcg2 = {
        ...dcg1,
        dataCollectionGroupId: 2,
        sessionId: 2,
        endTime: null,
        scanParameters: null,
      };

      const page: Paginated<DataCollectionGroup> = {
        items: [dcg1, dcg2],
        limit: 25,
        total: 2,
        page: 1,
      };

      return HttpResponse.json(page);
    },
  ),
];
