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

    },

    userLevel: 'Loading',

    getUserLevel: async () => {
        try{
            const credentials = await secure.get('credentials');
            const response = await api.post('/application/authenticated/' , {
                email: credentials.email,
            });
            set({ userLevel: response.data.current_level});
        } catch (error) {
            console.log('error getting user level');
            set({userLevel: 'Loading'})
        }
    },

    updateUserLevel: async () => {
        try{
            const credentials = await secure.get('credentials');
            const response = await api.post('/application/levelUp/', {
                email: credentials.email,
                update_level_by: 1
            });
            set({ userLevel: response.data.current_level})
        } catch (error) {
            console.log('Error updating user level');
            set({ userLevel: 'Loading'});
        }
    },

    totalBrushingSeconds: 0,

    getTotalBrushingSeconds: async () => {
        try{
            const credentials = await secure.get('credentials');
            const response = await api.post('/application/authenticated/', {
                email: credentials.email
            })
            set({ totalBrushingSeconds: response.data.total_brush_time})
        } catch (error) {
            console.log('Error retrieving total brushing seconds');
            set({ totalBrushingSeconds: 'Loading'})
        }
    },

    // updateTotalBrushingSeconds: async () => {

    // },
    currentLevelXP: 0,
    currentLevelMaxXp: 0,

    setCurrentLevelXP: async ({newCurrentLevelXP}) => {
        console.log('try here: ', newCurrentLevelXP)
        try{
            const credentials = await secure.get('credentials');
            const response = await api.post('/application/updateUserXP/', {
                email: credentials.email,
                current_level_xp: newCurrentLevelXP

            });
            set({ currentLevelXP: response.data.current_level_xp})
        } catch (error) {
            console.log('Error setting up current level xp')
            set({currentLevelXP: 'Loading'})
        }
    },

    setMaxLevelXP: async ({newMaxLevelXP}) => {
        try{
            const credentials = await secure.get('credentials');
            const response = await api.post('/application/updateCurrentLevelMaxXP/', {
                email: credentials.email,
                current_level_max_xp: newMaxLevelXP
            });
            set({ currentLevelMaxXp: response.data.current_level_max_xp})
        } catch (error) {
            console.log('Error setting up new level max xp');
            set({ currentLevelMaxXp: 'Loading'});
        }
    },

    userDetails: {},

    getDetails: async () => {
        try{
            const credentials = await secure.get('credentials');
            const response = await api.post('/application/authenticated/', {
                email: credentials.email
            });
            set({userDetails: response.data})
        } catch (error) {
            console.log('Error getting user details');
        }
    },

    dogFullBody: require('../assets/mini_shop/level1.png'),

    setDogFullBodyImage: (newImage) => set({ dogFullBody: newImage}),

    setImageID: async ({newID}) => {
        try{
            const credentials = await secure.get('credentials');
            const response = await api.post('/application/miniShop/', {
                email: credentials.email,
                image_id: newID
            });
        } catch (error) {
            console.log('Error setting image ID');
        }
    },

   
}))

export default useGlobally;