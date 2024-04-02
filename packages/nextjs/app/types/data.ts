import { Address } from "viem";

export interface RetroPGF3Results extends ImpactVectors, Metadata {
  Project_ID: string;
  "Result: # Ballots": number;
  "Result: Median OP": number;
  "Result: Quorum Reached": boolean;
  "Result: Received OP": string;
  "Funding: Governance Fund": number;
  "Funding: Other": number;
  "Funding: Partner Fund": number;
  "Funding: RPGF1": number;
  "Funding: RPGF2": number;
  "Funding: Revenue": number;
  "Keywords: Base": number;
  "Keywords: Farcaster": number;
  "Keywords: Zora": number;
  "Link: Contract on Base": number;
  "Link: Contract on OP Mainnet": number;
  "Link: Dune": number;
  "Link: Flipside": number;
  "Link: GitHub": number;
  "Link: GitHub (duneanalytics)": number;
  "Link: GitHub (ethereum)": number;
  "Link: GitHub (ethereum-optimism)": number;
  "Link: NPM Package": number;
  "Link: Optimism Gov": number;
  "Link: Substack": number;
  "Link: Twitter": number;
  "GTP: VC Funding Amount"?: number;
  "GTP: Has Token"?: boolean;
  "GTP: Has VC Funding": number;
  "OSO: Has Profile": boolean;
}

export interface ImpactVectors {
  "OSO: # GitHub Repos"?: number;
  "OSO: Date First Commit": string;
  "OSO: Total Stars"?: number;
  "OSO: Total Forks"?: number;
  "OSO: Total Contributors"?: number;
  "OSO: Contributors Last 6 Months"?: number;
  "OSO: Avg Monthly Active Devs Last 6 Months": number;
  "OSO: # OP Contracts"?: number;
  "OSO: Date First Txn": string;
  "OSO: Total Onchain Users"?: number;
  "OSO: Onchain Users Last 6 Months"?: number;
  "OSO: Total Txns"?: number;
  "OSO: Total Txn Fees (ETH)": number;
  "OSO: Txn Fees Last 6 Months (ETH)": number;
  "OSO: # NPM Packages"?: number;
  "OSO: Date First Download": string;
  "OSO: Total Downloads"?: number;
  "OSO: Downloads Last 6 Months"?: number;
}

export interface Metadata {
  project_name: string;
  project_image: string;
}

export interface DataSet {
  score: number;
  opAllocation: number;
  data: { [key in keyof ImpactVectors]: { normalized: number; actual: string | number | undefined } };
  metadata: Metadata;
}

type VectorSourceName = "OSO";

export interface Vector {
  name: keyof ImpactVectors;
  description: string;
  sourceName: VectorSourceName;
  parent: string;
  fieldName: string;
}

export interface SelectedVector {
  name: keyof ImpactVectors;
  weight: number;
}

export interface VectorList {
  creator: Address;
  title: string;
  description: string;
  vectors: SelectedVector[];
}
