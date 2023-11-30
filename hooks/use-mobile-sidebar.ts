import { create } from "zustand";

type MobileSidebarState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useMobileSidebar = create<MobileSidebarState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useMobileSidebar;
