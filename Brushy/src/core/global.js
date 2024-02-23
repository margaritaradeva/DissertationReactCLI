import { create } from "zustand";
import secure from "./secure";
import api from "./api";


const useGlobally = create((set) => ({

    // Initialisation

    initialised: false,
    init: async () => {
        const credentials = await secure.get('credentials')
        if (credentials) {
            try {
                const response = await api({
                    method: 'POST',
                    url: '/application/signin/',
                    data: {
                    username: credentials.username,
                    password: credentials.password
                    }
            
                })
                if (response.status !== 200) {
                    throw 'Authentication error'
                }
                const user = response.data.user;
                set((state) => ({
                    initialised:true,
                    authenticated: true,
                    user: user
                }))
                return
            }catch (error) {
                console.log('useGlobally.init:',error);
            }
           
            }
        set(state => ({
            initialised:true,
        }))
    },
    // Authentiation section
    authenticated: false,
    user: {},

    login: (credentials, user) => {
        secure.set('credentials', credentials)
        set((state) => ({
            authenticated: true,
            user: user
        }))

    },
    logout: () => {
        secure.wipe()
        set((state) => ({
            authenticated: false,
            user: {}
        }))
    }

}))

export default useGlobally;