// src/store/kycStore.js
import { create } from 'zustand';

export const useKycStore = create((set) => ({
  currentStep: 0,
  personalInfo: {},
  documents: {},
  investmentProfile: {},
  kycStatus: 'pending', // pending, in_progress, approved, rejected
  
  setStep: (step) => set({ currentStep: step }),
  updatePersonalInfo: (data) => set((state) => ({ 
    personalInfo: { ...state.personalInfo, ...data } 
  })),
  updateDocuments: (data) => set((state) => ({ 
    documents: { ...state.documents, ...data } 
  })),
  updateInvestmentProfile: (data) => set((state) => ({ 
    investmentProfile: { ...state.investmentProfile, ...data } 
  })),
  setKycStatus: (status) => set({ kycStatus: status }),
  
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
  
  reset: () => set({
    currentStep: 0,
    personalInfo: {},
    documents: {},
    investmentProfile: {},
    kycStatus: 'pending'
  }),
}));