import { http, HttpResponse } from "msw";
import type {
  AutoProcProgram,
  DataCollection,
  DataCollectionGroup,
  Paginated,
  ProcessingAttachments,
  ProcessingJob,
  ProcessingParameters,
  Proposal,
} from "../models";

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
  http.get(api + "data-groups/:dcg/data-collections", async ({ params }) => {
    const { dcg } = params;

    console.log(dcg);

    const dc1: DataCollection = {
      axisEnd: null,
      axisRange: null,
      axisStart: null,
      beamSizeAtSampleX: null,
      beamSizeAtSampleY: null,
      binning: null,
      blSubSampleId: null,
      c2aperture: null,
      centeringMethod: null,
      chiStart: null,
      comments: null,
      dataCollectionGroupId: 1,
      dataCollectionId: 1,
      dataCollectionNumber: 1,
      dataCollectionPlanId: null,
      datFullPath: null,
      detector2Theta: null,
      detectorDistance: null,
      detectorId: null,
      detectorMode: null,
      endTime: null,
      experimenttype: null,
      exposureTime: null,
      fileTemplate: "ixx-12345.nxs",
      flux: null,
      flux_end: null,
      imageContainerSubPath: null,
      imageDirectory: "/data/directory/",
      imagePrefix: null,
      imageSizeX: null,
      imageSizeY: null,
      imageSuffix: null,
      kappaStart: null,
      magnification: null,
      maxDefocus: null,
      minDefocus: null,
      minResolution: null,
      numberOfImages: null,
      numberOfPasses: null,
      omegaStart: null,
      overlap: null,
      particleDiameter: null,
      phasePlate: null,
      phiStart: null,
      pixelSizeOnImage: null,
      printableForReport: null,
      resolution: null,
      rotationAxis: null,
      runStatus: null,
      sampleId: null,
      slitGapHorizontal: null,
      slitGapVertical: null,
      startImageNumber: null,
      startTime: null,
      synchrotronMode: null,
      totalAbsorbedDose: null,
      totalExposedDose: null,
      transmission: null,
      undulatorGap1: null,
      undulatorGap2: null,
      undulatorGap3: null,
      voltage: null,
      wavelength: null,
      xBeam: null,
      xtalSnapshotFullPath1: null,
      xtalSnapshotFullPath2: null,
      xtalSnapshotFullPath3: null,
      xtalSnapshotFullPath4: null,
      yBeam: null,
    };

    const dc2 = { ...dc1, fileTemplate: "ixx-1235/nxs", dataCollectionId: 2 };

    const page: Paginated<DataCollection> = {
      items: [dc1, dc2],
      limit: 25,
      total: 2,
      page: 1,
    };

    return HttpResponse.json(page);
  }),
  http.get(api + "data-collections/:dc/processing-jobs", async ({ params }) => {
    const { dc } = params;
    console.log(dc);

    const a1: AutoProcProgram = {
      autoProc: null,
      autoProcProgramId: 1,
      processingCommandLine: null,
      processingEndTime: null,
      processingEnvironment: null,
      processingMessage: null,
      processingPrograms: "proc-prog",
      processingStartTime: null,
      processingStatus: 1,
      recordTimeStamp: null,
    };

    const p1: ProcessingJob = {
      automatic: 1,
      autoProcProgram: [a1],
      comments: "Comment",
      displayName: "Display Name",
      processingJobId: 1,
      recipe: "recipe",
      recordTimestamp: "2026-05-12T08:18:29",
      status: "Success",
    };

    const p2 = { ...p1 };

    const page: Paginated<ProcessingJob> = {
      items: [p1, p2],
      limit: 25,
      total: 2,
      page: 1,
    };

    return HttpResponse.json(page);
  }),

  http.get(api + "processing-jobs/:pj/parameters", async ({ params }) => {
    const { pj } = params;
    console.log(pj);

    const ob: object = { key1: "value1", key2: "value2" };

    const pp: ProcessingParameters = { items: ob };

    return HttpResponse.json(pp);
  }),

  http.get(
    api + "processing-programs/:ppid/attachments",
    async ({ params }) => {
      const { ppid } = params;
      console.log(ppid);

      const p: ProcessingAttachments = {
        fileName: "test.nxs",
        filePath: "/testpath/",
        fileType: "Result",
      };

      const page: Paginated<ProcessingAttachments> = {
        items: [p, p],
        limit: 25,
        total: 2,
        page: 1,
      };

      return HttpResponse.json(page);
    },
  ),
];
