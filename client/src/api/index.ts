import { useAxios } from '~/hooks/axios';

export interface Candidate {
  id: string;
  name: string;
  imageUrl: string;
  votes?: number;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export interface Vote {
  id: string;
  email: string;
  candidate: any;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export interface NewVoteAttrs {
  email: string;
  candidate: string;
}

interface GetCandidatesResponse {
  hasVoted: boolean;
  candidates?: Candidate[];
  voteDoc?: Vote;
}

export const getCandidates = (email: string) =>
  useAxios().get<GetCandidatesResponse>(`/candidates?email=${email}`);

export const getSummary = (pwd: string) => useAxios().get<Candidate[]>(`/summary/${pwd}`);

export const saveVote = (attrs: NewVoteAttrs) => useAxios().post<Vote>('/save-vote', attrs);
