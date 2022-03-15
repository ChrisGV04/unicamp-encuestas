import { acceptHMRUpdate, defineStore } from 'pinia';
import { Candidate, getCandidates, getSummary, saveVote, Vote } from '~/api';
import _shuffle from 'lodash.shuffle';

export const useCandidatesStore = defineStore('candidates', {
  state: () => ({
    currentEmail: '',
    allCandidates: [] as Candidate[],
    myVote: undefined as Vote | undefined,
  }),

  getters: {
    sortedCandidates: (state) => state.allCandidates.sort((a, b) => b.votes! - a.votes!),
  },

  actions: {
    async fetchCandidates() {
      if (!this.currentEmail)
        this.currentEmail = localStorage.getItem('currentEmail') || localStorage.getItem('lock') || '';

      try {
        const { data } = await getCandidates(this.currentEmail);

        if (data.voteDoc) {
          this.myVote = JSON.parse(JSON.stringify(data.voteDoc));
          return true;
        }

        if (data.candidates) {
          this.allCandidates = _shuffle(data.candidates);
          return true;
        }

        return false;
      } catch (error) {
        console.error('Failed to fetch the candidates');
        return false;
      }
    },

    async registerVote(candidateId: string) {
      if (!candidateId || !this.currentEmail) return false;

      try {
        const { data } = await saveVote({ email: this.currentEmail, candidate: candidateId });
        this.myVote = JSON.parse(JSON.stringify(data));
        localStorage.setItem('lock', this.currentEmail);
        return true;
      } catch (error) {
        console.error('Failed to save vote');
        return false;
      }
    },

    async fetchSummary(pwd: string) {
      try {
        const { data } = await getSummary(pwd);
        this.allCandidates = [...data];
        return true;
      } catch (error) {
        console.error('Failed to fetch the summary');
        return false;
      }
    },
  },
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useCandidatesStore, import.meta.hot));
