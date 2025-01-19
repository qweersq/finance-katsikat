import { create } from 'zustand';

const useSidebarToggle = create((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
}));

export default useSidebarToggle; 