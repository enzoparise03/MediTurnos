import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null, 

    iniciarSesion: (datosUsuario) => set({ user: datosUsuario }),

    cerrarSesion: () => set({ user: null })
}));

export default useAuthStore;