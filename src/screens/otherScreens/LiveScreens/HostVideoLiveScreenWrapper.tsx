import { View, Text } from 'react-native'
import React from 'react'
import HostVideoLiveScreen from './HostVideoLiveScreen'
import { ZegoProvider } from '@/context/ZegoCloudProvider'
import { ZegoEffectsProvider } from '@/context/ZegoEffectsProvider'

const HostVideoLiveScreenWrapper = () => {
  return (
    <ZegoEffectsProvider>
      <HostVideoLiveScreen/>
    </ZegoEffectsProvider>
  )
}

export default HostVideoLiveScreenWrapper