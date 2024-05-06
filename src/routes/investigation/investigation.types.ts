interface InvestigationDTO {
  id: string;
  title: string;
  description: string;
  submissionDate: Date;
  releaseDate: Date;
  license: string;
  doi: string;
  website: string;
  funding: string;
}

export type { InvestigationDTO };
