export interface Program {
  id: string;
  name: string;
  transferRatiosByPartner: { [id: string]: number };
}
