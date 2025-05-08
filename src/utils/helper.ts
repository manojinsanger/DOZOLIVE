import { Alert, Clipboard, ImageSourcePropType } from 'react-native';

// Function to format large numbers with commas
export const formatNumber = (num: number | string): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export function getWealthLevelBadget(level: number): any {
  if (level <= 19) {
    return require('../assets/images/wealthlevel/ic_user_level_1to19.png');
  } else if (level <= 39) {
    return require('../assets/images/wealthlevel/ic_user_level_20to39.png');
  } else if (level <= 59) {
    return require('../assets/images/wealthlevel/ic_user_level_40to59.png');
  } else if (level <= 79) {
    return require('../assets/images/wealthlevel/ic_user_level_60to79.png');
  } else if (level <= 99) {
    return require('../assets/images/wealthlevel/ic_user_level_80to99.png');
  } else if (level <= 119) {
    return require('../assets/images/wealthlevel/ic_user_level_100to119.png');
  } else if (level <= 139) {
    return require('../assets/images/wealthlevel/ic_user_level_120to139.png');
  } else if (level <= 159) {
    return require('../assets/images/wealthlevel/ic_user_level_140to159.png');
  } else if (level <= 179) {
    return require('../assets/images/wealthlevel/ic_user_level_160to179.png');
  } else if (level <= 199) {
    return require('../assets/images/wealthlevel/ic_user_level_180to199.png');
  } else if (level <= 219) {
    return require('../assets/images/wealthlevel/ic_user_level_200to219.png');
  } else if (level <= 239) {
    return require('../assets/images/wealthlevel/ic_user_level_220to239.png');
  } else if (level <= 259) {
    return require('../assets/images/wealthlevel/ic_user_level_240to259.png');
  } else if (level <= 279) {
    return require('../assets/images/wealthlevel/ic_user_level_260to279.png');
  } else {
    return require('../assets/images/wealthlevel/ic_user_level_280to300.png');
  }
}

export function getLivestreamLevelBadget(level: number): any {
  if (level <= 1) {
    return require('../assets/images/livestreamlevel/lv0.png');
  } else if (level <= 9) {
    return require('../assets/images/livestreamlevel/lv1.png');
  } else if (level <= 19) {
    return require('../assets/images/livestreamlevel/lv10.png');
  } else if (level <= 29) {
    return require('../assets/images/livestreamlevel/lv20.png');
  } else if (level <= 39) {
    return require('../assets/images/livestreamlevel/lv30.png');
  } else if (level <= 49) {
    return require('../assets/images/livestreamlevel/lv40.png');
  } else if (level <= 59) {
    return require('../assets/images/livestreamlevel/lv50.png');
  } else if (level <= 69) {
    return require('../assets/images/livestreamlevel/lv60.png');
  } else if (level <= 79) {
    return require('../assets/images/livestreamlevel/lv70.png');
  } else if (level <= 89) {
    return require('../assets/images/livestreamlevel/lv80.png');
  } else if (level <= 99) {
    return require('../assets/images/livestreamlevel/lv90.png');
  } else {
    return require('../assets/images/livestreamlevel/lv100.png');
  }
}

export function getLivestreamLevelBg(level: number): any {
  if (level <= 1) {
    return require('../assets/images/livestreamlevel/lv0_bg.png');
  } else if (level <= 9) {
    return require('../assets/images/livestreamlevel/lv1_bg.png');
  } else if (level <= 19) {
    return require('../assets/images/livestreamlevel/lv10_bg.png');
  } else if (level <= 29) {
    return require('../assets/images/livestreamlevel/lv20_bg.png');
  } else if (level <= 39) {
    return require('../assets/images/livestreamlevel/lv30_bg.png');
  } else if (level <= 49) {
    return require('../assets/images/livestreamlevel/lv40_bg.png');
  } else if (level <= 59) {
    return require('../assets/images/livestreamlevel/lv50_bg.png');
  } else if (level <= 69) {
    return require('../assets/images/livestreamlevel/lv60_bg.png');
  } else if (level <= 79) {
    return require('../assets/images/livestreamlevel/lv70_bg.png');
  } else if (level <= 89) {
    return require('../assets/images/livestreamlevel/lv80_bg.png');
  } else if (level <= 99) {
    return require('../assets/images/livestreamlevel/lv90_bg.png');
  } else {
    return require('../assets/images/livestreamlevel/lv100_bg.png');
  }
}

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const copyToClipboard = (text: string | number, showAlert = true, label?: string) => {
  if (!text) return null
  Clipboard.setString(text.toString());
  if (showAlert) {
    Alert.alert('Copied to Clipboard', label ? `${label}: ${text}` : text.toString());
  }
};

function trimText({ text, maxLength }: { text: string, maxLength: number }) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength);
}

export const formatRole = (role: string) => {
  if (!role) return '';
  return role
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
