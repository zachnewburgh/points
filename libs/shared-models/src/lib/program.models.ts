export interface Program {
  id: string;
  name: string;
  transferRatiosByPartner: ProgramPartnerRatios;
}

export interface ProgramPartnerRatios {
  [id: string]: number;
}
