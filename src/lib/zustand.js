import { create } from 'zustand';

// Define your store
const useStore = create((set) => ({
    auth: false,
    setAuth: (item) => set(() => ({ auth: item })),
    user: null,
    setUser: (item) => set(() => ({ user: item })),
    token: null,
    setToken: (item) => set(() => ({ token: item })),
}));

export default useStore;