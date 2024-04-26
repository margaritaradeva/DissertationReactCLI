import {useEffect, useState} from 'react';
import { useGlobally } from '../../core';

export default function Leveling({ addedSeconds }) {

  const {userLevel, 
        getUserLevel, 
        updateUserLevel, 
        totalBrushingSeconds, 
        getTotalBrushingSeconds, 
        currentLevelXP, 
        setCurrentLevelXP, 
        currentLevelMaxXp, 
        setMaxLevelXP, 
        userDetails, 
        getDetails} = useGlobally();
  const [checkShouldLevelUp, setCheckShouldLeveUp] = useState(false);


  useEffect(() => { 
    getUserLevel();
    getTotalBrushingSeconds();
    getDetails();
    setCheckShouldLeveUp(true);
    console.log(addedSeconds)
  }, []);

  useEffect(() => {
    if (userDetails  && userDetails.current_level_xp !== undefined) {
        if (checkShouldLevelUp) {
            const newXP = userDetails.current_level_xp + addedSeconds
            console.log('udetails',userDetails.current_level_xp, newXP)

            if (newXP === userDetails.current_level_max_xp) {
                console.log('XP equal to max XP')
                updateUserLevel()
                updateCurrentLevelMaxXP()
                setCurrentLevelXP({ newCurrentLevelXP: 0})
            } else if (newXP > userDetails.current_level_max_xp) {
                    console.log('overflowingXP')
                    updateUserLevel()
                updateCurrentLevelMaxXP()
                const newCurrentXP = newXP - userDetails.current_level_max_xp
                setCurrentLevelXP({ newCurrentLevelXP: newCurrentXP})
                
            } else {
                console.log('newXP', newXP)
                setCurrentLevelXP({ newCurrentLevelXP: newXP });

            }
    }
}
  }, [checkShouldLevelUp, userDetails])
  

  async function updateCurrentLevelMaxXP () {
    const increase_factor = 1.2
    const new_level = Math.ceil(increase_factor * userDetails.current_level_max_xp)
    console.log(new_level)
    setMaxLevelXP({newMaxLevelXP: new_level})
    
  }
//   console.log(userLevel, totalBrushingSeconds);
  
}
