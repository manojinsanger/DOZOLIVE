// import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
// import { PlatformPressable } from '@react-navigation/elements';
// import * as Haptics from 'expo-haptics';

// export function HapticTab(props: BottomTabBarButtonProps) {
//   return (
//     <PlatformPressable
//       {...props}
//       onPressIn={(ev) => {
//         if (process.env.EXPO_OS === 'ios') {
//           // Add a soft haptic feedback when pressing down on the tabs.
//           Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//         }
//         props.onPressIn?.(ev);
//       }}
//     />
//   );
// }

import { View, Text } from 'react-native'
import React from 'react'

const HapticTab = () => {
  return (
    <View>
      <Text>HapticTab</Text>
    </View>
  )
}

export default HapticTab