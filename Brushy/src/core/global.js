import { create } from "zustand";


const useGlobally = create((set) => ({
    // Authentiation section
    authenticated: false,
    user: {},

    login: (user) => {
        set((state) => ({
            authenticated: true,
            user: user
        }))

    },
    logout: (user) => {
        set((state) => ({
            authenticated: false,
            user: {}
        }))
    }

}))

export default useGlobally;