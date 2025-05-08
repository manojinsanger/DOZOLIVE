// import React from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import { goBack } from '@/utils/navigationService';

// type CustomHeaderProps = {
//   title: string;
//   onPressHandle?: () => void;
//   rightHeader?: React.ReactNode;
//   textColor?: string;
// };

// const CustomHeader = ({
//   title,
//   onPressHandle,
//   rightHeader = '',
//   textColor = 'black',
// }: CustomHeaderProps) => (
//   <View style={styles.header}>
//     {/* Left Back Button */}
//     <View style={styles.sideContainer}>
//       <TouchableOpacity
//         onPress={goBack}
//         hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//         activeOpacity={0.6}>
//         <Feather name="arrow-left" size={24} color={textColor} />
//       </TouchableOpacity>
//     </View>

//     {/* Center Title */}
//     <View style={styles.titleContainer}>
//       <Text style={[styles.headerTitle, { color: textColor }]} numberOfLines={1} ellipsizeMode='tail'>
//         {title}
//       </Text>
//     </View>

//     {/* Right Side Container */}
//     <View style={styles.rightContainer}>
//     <TouchableOpacity
//           onPress={onPressHandle}
//           activeOpacity={0.6}
//           style={styles.rightTouchable}
//           hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
//           <Text style={[styles.rightHeaderText, { color: textColor }]} numberOfLines={1} ellipsizeMode='tail'>
//             {rightHeader || ''}
//           </Text>
//         </TouchableOpacity>
//     </View>
//   </View>
// );

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     height: 56, 
//   },
//   sideContainer: {
//     flex: 1,
//     alignItems: 'flex-start',
//   },
//   titleContainer: {
//     flex: 1, // Each section gets equal width (1/3)
//     alignItems: 'center', // Center alignment for title
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '500',
//   },
//   rightContainer: {
//     flex: 1,
//     alignItems: 'flex-end', 
//     justifyContent: 'center',
//   },
//   rightTouchable: {
//     width: '100%', 
//   },
//   rightHeaderText: {
//     fontSize: 16,
//     fontWeight: '500',
//     textAlign: 'right',
//   },
// });

// export default CustomHeader;
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { goBack } from '@/utils/navigationService';

type CustomHeaderProps = {
  title: string;
  onPressHandle?: () => void;
  rightHeader?: React.ReactNode;
  textColor?: string;
};

const CustomHeader = ({
  title,
  onPressHandle,
  rightHeader = '',
  textColor = 'black',
}: CustomHeaderProps) => (
  <View style={styles.header}>
    
    {/* Left Back Button */}
    <TouchableOpacity
      onPress={goBack}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      activeOpacity={0.6}
      style={styles.sideContainer}>
      <Feather name="arrow-left" size={24} color={textColor} />
    </TouchableOpacity>

    {/* Center Title */}
    <View style={styles.titleWrapper}>
      <Text style={[styles.headerTitle, { color: textColor }]} numberOfLines={1}>
        {title}
      </Text>
    </View>

    {/* Right Content */}
    <TouchableOpacity
      onPress={onPressHandle}
      activeOpacity={0.6}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={styles.sideContainer}>
      {typeof rightHeader === 'string' ? (
        <Text style={[styles.rightHeaderText, { color: textColor }]}>
          {rightHeader}
        </Text>
      ) : (
        rightHeader
      )}
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    position: 'relative',
  },
  sideContainer: { 
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none', // allow touches to pass through
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  rightHeaderText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'right',
  },
});

export default CustomHeader;
