import React, { useState, useEffect } from 'react';
import MyAgency from '../profileScreens/MyAgency';
import AgencyCongratulationsScreen from './AgencyCongratulationsScreen';
import { useUser } from '@/context/UserProvider';

const MyAgencyWrapper = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  const { userAllDetails } = useUser()

  useEffect(() => {
    setUserRole(userAllDetails.roles[0])
  }, []);


  if (userRole === "HOST") {
    return <AgencyCongratulationsScreen />;
  }

  return <MyAgency />;
};

export default MyAgencyWrapper;