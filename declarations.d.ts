declare module '*.svg' {
  import * as React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

// declarations.d.ts or types.d.ts
declare module 'react-native-vector-icons/Ionicons';
declare module 'react-native-vector-icons/MaterialIcons';
declare module 'react-native-vector-icons/MaterialCommunityIcons'
declare module 'react-native-vector-icons/Feather'
declare module 'react-native-vector-icons/FontAwesome'
declare module 'react-native-vector-icons/EvilIcons'
declare module 'react-native-vector-icons/Entypo'
declare module 'react-native-vector-icons/AntDesign'
declare module 'react-native-vector-icons/FontAwesome5'
declare module 'react-native-keep-awake';
declare module 'lodash.debounce';


declare module 'react-native-image-picker';