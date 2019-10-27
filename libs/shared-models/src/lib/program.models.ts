export interface Program {
  id: string;
  data(): { name: string; transferRatiosByPartner: { [id: string]: number } };
}
