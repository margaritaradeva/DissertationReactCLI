import { create } from "zustand";
import secure from "./secure";
import api from "./api";
import EncryptedStorage from "react-native-encrypted-storage";


const useGlobally = create((set, get) => ({

    // Initialisation
    authenticated:false,
    initialised: false,
    init: async () => {
        const accessToken = await EncryptedStorage.getItem('accessToken')
        if (accessToken) {
            try {
                await get().refreshToken()
                
                } catch (error) {
                    console.log('refresh token failed')
                    await get().logout()
                    
                }
               
           
            } else {
                console.log('No refresh token available')
            }
            set({initialised:true})
    },
    // Authentiation section
    authenticated: false,
    user: {},

    login: async (credentials) => {
        try{
        const response = await api.post('/application/signin/', credentials)
        await EncryptedStorage.setItem('accessToken', response.data.access)
        await EncryptedStorage.setItem('refreshToken', response.data.refresh)
        
        set({
            authenticated: true,
            user: response.data.user
        });
        secure.set('credentials',response.data.user)
       
     } catch (error) {
        console.log('Error logging in')
        throw error // FIX THIS
    }
    },
    logout: async () => {
    await EncryptedStorage.removeItem('accessToken');
    await EncryptedStorage.removeItem('refreshToken');
    secure.wipe()
        set({
            authenticated: false,
            user: {}
        })
    },

    refreshToken: async () => {
        try {
            console.log('refresh here')
            const refreshToken = await EncryptedStorage.getItem('refreshToken');
            const response = await api.post('/application/token/refresh/', {refresh: refreshToken})
            console.log(response.status)
            const {access, refresh} = response.data
            console.log(access, refresh)
            if (access) {
                await EncryptedStorage.setItem('accessToken',access)
                set({authenticated:true})
            }
        } catch (error) {
            console.log('error refreshing token',error)
            await get().logout()
        }

    }

}))

export default useGlobally;