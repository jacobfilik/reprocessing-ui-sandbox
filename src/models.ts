//r = await fetch("expeye/api/proposals?page=0&limit=25");
export interface Proposal {
  bltimeStamp: string | null;
  personId: number;
  proposalCode: string;
  proposalId: number;
  proposalNumber: string;
  proposalType: unknown;
  sessions: number;
  state: string | null;
  title: string;
}

export interface Paginated<T> {
  items: T[];
  limit: number;
  page: number;
  total: number;
}

//r = await fetch("expeye/api/sessions?page=0&limit=25");
export interface Session {
  archived: number;
  beamCalendarId: number;
  beamLineName: string;
  beamLineOperator: string[];
  beamLineSetupId: unknown;
  bltimeStamp: string;
  collectionGroups: unknown;
  comments: unknown;
  endDate: string;
  lastUpdate: string;
  nbShifts: unknown;
  parentProposal: string;
  proposalId: number;
  purgedProcessedData: boolean;
  scheduled: number;
  sessionId: number;
  startDate: string;
  usedFlag: unknown;
  visitNumber: number;
}

//r = await fetch("expeye/api/proposals/sp41258/sessions/2/data-groups?page=0&limit=25")
export interface DataCollectionGroup {
  actualContainerBarcode: unknown;
  actualSampleBarcode: unknown;
  actualSampleSlotInContainer: unknown;
  actualSampleSlotInSC: unknown;
  collections: unknown;
  comments: unknown;
  crystalClass: unknown;
  dataCollectionGroupId: number;
  detectorMode: unknown;
  endTime: string | null;
  experimentType: unknown;
  experimentTypeId: unknown;
  experimentTypeName: unknown;
  sampleId: unknown;
  scanParameters: string | null;
  sessionId: number;
  startTime: string | null;
  xtalSnapshotFullPath: unknown;
}

//r = await fetch("expeye/api/data-groups/18756674/data-collections?page=0&limit=25")
export interface DataCollection {
  axisEnd: unknown;
  axisRange: unknown;
  axisStart: unknown;
  beamSizeAtSampleX: unknown;
  beamSizeAtSampleY: unknown;
  binning: unknown;
  blSubSampleId: unknown;
  c2aperture: unknown;
  centeringMethod: unknown;
  chiStart: unknown;
  comments: string | null;
  datFullPath: string | null;
  dataCollectionGroupId: number;
  dataCollectionId: number;
  dataCollectionNumber: number;
  dataCollectionPlanId: unknown;
  detector2Theta: unknown;
  detectorDistance: unknown;
  detectorId: unknown;
  detectorMode: unknown;
  endTime: string | null;
  experimenttype: unknown;
  exposureTime: unknown;
  fileTemplate: string | null;
  flux: unknown;
  flux_end: unknown;
  imageContainerSubPath: string | null;
  imageDirectory: string | null;
  imagePrefix: unknown;
  imageSizeX: unknown;
  imageSizeY: unknown;
  imageSuffix: unknown;
  kappaStart: unknown;
  magnification: unknown;
  maxDefocus: unknown;
  minDefocus: unknown;
  minResolution: unknown;
  numberOfImages: unknown;
  numberOfPasses: unknown;
  omegaStart: unknown;
  overlap: unknown;
  particleDiameter: unknown;
  phasePlate: unknown;
  phiStart: unknown;
  pixelSizeOnImage: unknown;
  printableForReport: unknown;
  resolution: unknown;
  rotationAxis: unknown;
  runStatus: string | null;
  sampleId: unknown;
  slitGapHorizontal: unknown;
  slitGapVertical: unknown;
  startImageNumber: unknown;
  startTime: string | null;
  synchrotronMode: unknown;
  totalAbsorbedDose: unknown;
  totalExposedDose: unknown;
  transmission: unknown;
  undulatorGap1: unknown;
  undulatorGap2: unknown;
  undulatorGap3: unknown;
  voltage: unknown;
  wavelength: unknown;
  xBeam: unknown;
  xtalSnapshotFullPath1: string | null;
  xtalSnapshotFullPath2: string | null;
  xtalSnapshotFullPath3: string | null;
  xtalSnapshotFullPath4: string | null;
  yBeam: unknown;
}

export interface AutoProcProgram {
  autoProc: unknown;
  autoProcProgramId: number;
  processingCommandLine: string | null;
  processingEndTime: string | null;
  processingEnvironment: string | null;
  processingMessage: string | null;
  processingPrograms: string | null;
  processingStartTime: string | null;
  processingStatus: number;
  recordTimeStamp: string | null;
}

export interface ProcessingJob {
  autoProcProgram: AutoProcProgram[];
  automatic: number;
  comments: string | null;
  displayName: string | null;
  processingJobId: number;
  recipe: string | null;
  recordTimestamp: string | null;
  status: string | null;
}

export interface ProcessingParameters {
  items: object;
}

// r = await fetch("expeye/api/processing-programs/119448533/attachments");
export interface ProcessingAttachments {
  fileType: string;
  fileName: string;
  filePath: string;
}

export interface User {
  preferred_username: string;
  given_name: string;
  family_name: string;
}
