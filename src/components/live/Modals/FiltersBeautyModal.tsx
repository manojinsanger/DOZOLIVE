// import {
//     View,
//     Modal,
//     ScrollView,
//     TouchableOpacity,
//     Dimensions,
//     TouchableWithoutFeedback,
//     StyleSheet,
// } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import customColors from '@/constants/styles';
// import { scaleFont } from '@/constants/scaling';
// import ThemedText from '@/components/ThemedText';
// import { useZegoEffects } from '@/context/ZegoEffectsProvider';
// import Slider from '@react-native-community/slider';
// import { ZegoEffectsFilterType } from '@zegocloud/zego-effects-reactnative';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// // Define types
// type EffectGroup = 'beautification' | 'reshape' | 'filters';
// type BeautificationEffect =
//     'skinToneEnhancement' |
//     'skinSmothing' |
//     'imageSharpening' |
//     'cheekBlusher' |
//     'removeNasolabialFolds' |
//     'removeDarkCircles' |
//     'removeAcneAndFreckles' |
//     'clarityEffects' |
//     'longChin';

// type ReshapeEffect =
//     'faceSlim' |
//     'eyeEnlarge' |
//     'jawRefine' |
//     'bigEyes' |
//     'faceLifting' |
//     'smallMouth' |
//     'eyeBrightening' |
//     'noseSlimming' |
//     'teethWhitening' |
//     'longChin' |
//     'foreheadShortening' |
//     'mandibleSlimming' |
//     'cheekboneSlimming' |
//     'faceShortening' |
//     'noseLengthening';

// type FilterEffect = 'filterType' | 'filterIntensity';

// // Options for main tabs
// const filterOptions = [
//     { id: 'beautification', name: 'Face Beautification' },
//     { id: 'reshape', name: 'Face Shape Retouch' },
//     { id: 'filters', name: 'Filters' },
// ] as const;

// // Beauty effect options
// const beautificationOptions = [
//     { name: 'Clear', icon: 'closecircleo', effect: 'clear' },
//     { name: 'Tone', icon: 'smileo', effect: 'skinToneEnhancement' },
//     { name: 'Smooth', icon: 'staro', effect: 'skinSmothing' },
//     { name: 'Sharpen', icon: 'bulb1', effect: 'imageSharpening' },
//     { name: 'Blush', icon: 'bulb1', effect: 'cheekBlusher' },
//     { name: 'Folds', icon: 'bulb1', effect: 'removeNasolabialFolds' },
//     { name: 'Circles', icon: 'bulb1', effect: 'removeDarkCircles' },
//     { name: 'Acne', icon: 'bulb1', effect: 'removeAcneAndFreckles' },
//     { name: 'Clarity', icon: 'bulb1', effect: 'clarityEffects' },
//     { name: 'Long Chin', icon: 'bulb1', effect: 'longChin' },
// ];

// // Reshape effect options
// const reshapeOptions = [
//     { name: 'Clear', icon: 'closecircleo', effect: 'clear' },
//     { name: 'Face Slim', icon: 'skin', effect: 'faceSlim' },
//     { name: 'Eye Enlarge', icon: 'skin', effect: 'eyeEnlarge' },
//     { name: 'Jaw Refine', icon: 'skin', effect: 'jawRefine' },
//     { name: 'Big Eyes', icon: 'skin', effect: 'bigEyes' },
//     { name: 'Face Lifting', icon: 'skin', effect: 'faceLifting' },
//     { name: 'Small Mouth', icon: 'skin', effect: 'smallMouth' },
//     { name: 'Eye Brightening', icon: 'skin', effect: 'eyeBrightening' },
//     { name: 'Nose Slimming', icon: 'skin', effect: 'noseSlimming' },
//     { name: 'Teeth Whitening', icon: 'skin', effect: 'teethWhitening' },
//     { name: 'Long Chin', icon: 'skin', effect: 'longChin' },
//     { name: 'Forehead Shortening', icon: 'skin', effect: 'foreheadShortening' },
//     { name: 'Mandible Slimming', icon: 'skin', effect: 'mandibleSlimming' },
//     { name: 'Cheekbone Slimming', icon: 'skin', effect: 'cheekboneSlimming' },
//     { name: 'Face Shortening', icon: 'skin', effect: 'faceShortening' },
//     { name: 'Nose Lengthening', icon: 'skin', effect: 'noseLengthening' },
// ];

// // Filter type options
// const filterTypes = [
//     { name: 'Clear', value: 'clear', icon: 'closecircleo' },
//     { name: 'Autumn', value: ZegoEffectsFilterType.Autumn, icon: 'filter' },
//     { name: 'Brighten', value: ZegoEffectsFilterType.Brighten, icon: 'filter' },
//     { name: 'Cool', value: ZegoEffectsFilterType.Cool, icon: 'filter' },
//     { name: 'Cozily', value: ZegoEffectsFilterType.Cozily, icon: 'filter' },
//     { name: 'Creamy', value: ZegoEffectsFilterType.Creamy, icon: 'filter' },
//     { name: 'Film-Like', value: ZegoEffectsFilterType.FilmLike, icon: 'filter' },
//     { name: 'Fresh', value: ZegoEffectsFilterType.Fresh, icon: 'filter' },
//     { name: 'Night', value: ZegoEffectsFilterType.Night, icon: 'filter' },
//     { name: 'Sunset', value: ZegoEffectsFilterType.Sunset, icon: 'filter' },
//     { name: 'Sweet', value: ZegoEffectsFilterType.Sweet, icon: 'filter' },
// ];



//  const FiltersBeautyModal = ({
//     visible,
//     onClose,
// }: {
//     visible: boolean;
//     onClose: () => void;
// }) => {
//     // State for selected tabs and options
//     const [selectedGroup, setSelectedGroup] = useState<EffectGroup>('beautification');
//     const [selectedOption, setSelectedOption] = useState<string | null>(null);
//     const [sliderValue, setSliderValue] = useState<number>(50);

//     // Get state and functions from context
//     const {
//         effectsState,
//         updateBeautificationEffect,
//         updateReshapeEffect,
//         updateFilterEffect,
//         clearBeautification,
//         clearReshape,
//         clearFilters
//     } = useZegoEffects();

//     // Update selected option based on group changes
//     useEffect(() => {
//         if (selectedGroup === 'filters') {
//             const currentFilter = filterTypes.find(f => f.value === effectsState.filters.filterType);
//             setSelectedOption(currentFilter?.name || 'Clear');
//             setSliderValue(effectsState.filters.filterIntensity);
//         } else {
//             setSelectedOption(null);
//         }
//     }, [selectedGroup, effectsState.filters]);

//     // Get current options based on selected group
//     const getCurrentOptions = () => {
//         switch (selectedGroup) {
//             case 'beautification':
//                 return beautificationOptions;
//             case 'reshape':
//                 return reshapeOptions;
//             case 'filters':
//                 return filterTypes;
//             default:
//                 return [];
//         }
//     };

//     // Get slider value for the currently selected effect
//     const getSliderValueForEffect = (group: EffectGroup, effectName: string | null) => {
//         if (!effectName || effectName === 'Clear') return 0;

//         if (group === 'filters') {
//             return effectsState.filters.filterIntensity;
//         }

//         const options = group === 'beautification' ? beautificationOptions : reshapeOptions;
//         const option = options.find(opt => opt.name === effectName);

//         if (!option || option.effect === 'clear') return 0;

//         if (group === 'beautification') {
//             return effectsState.beautification[option.effect as BeautificationEffect];
//         } else {
//             return effectsState.reshape[option.effect as ReshapeEffect];
//         }
//     };

//     // Handle option selection
//     const handleOptionSelect = (group: EffectGroup, optionName: string) => {
//         setSelectedOption(optionName);

//         if (optionName === 'Clear') {
//             // Handle clear action
//             if (group === 'beautification') {
//                 clearBeautification();
//             } else if (group === 'reshape') {
//                 clearReshape();
//             } else if (group === 'filters') {
//                 clearFilters();
//             }
//             return;
//         }

//         // Handle specific effects
//         if (group === 'filters') {
//             const selectedFilter = filterTypes.find(f => f.name === optionName);
//             if (selectedFilter) {
//                 updateFilterEffect('filterType', selectedFilter.value);
//                 setSliderValue(effectsState.filters.filterIntensity);
//             }
//         } else {
//             const options = group === 'beautification' ? beautificationOptions : reshapeOptions;
//             const selectedOpt = options.find(opt => opt.name === optionName);

//             if (selectedOpt && selectedOpt.effect !== 'clear') {
//                 const value = group === 'beautification'
//                     ? effectsState.beautification[selectedOpt.effect as BeautificationEffect]
//                     : effectsState.reshape[selectedOpt.effect as ReshapeEffect];

//                 setSliderValue(value);
//             }
//         }
//     };

//     // Handle slider change
//     const handleSliderChange = (value: number) => {
//         setSliderValue(value);

//         if (!selectedOption || selectedOption === 'Clear') return;

//         if (selectedGroup === 'filters') {
//             updateFilterEffect('filterIntensity', value);
//             return;
//         }

//         const options = selectedGroup === 'beautification' ? beautificationOptions : reshapeOptions;
//         const selectedOpt = options.find(opt => opt.name === selectedOption);

//         if (selectedOpt && selectedOpt.effect !== 'clear') {
//             if (selectedGroup === 'beautification') {
//                 updateBeautificationEffect(selectedOpt.effect as BeautificationEffect, value);
//             } else {
//                 updateReshapeEffect(selectedOpt.effect as ReshapeEffect, value);
//             }
//         }
//     };

//     // Check if we should show slider
//     const shouldShowSlider = () => {
//         if (!selectedOption || selectedOption === 'Clear') return false;

//         if (selectedGroup === 'filters') {
//             return effectsState.filters.filterType !== 'clear';
//         }

//         return true;
//     };

//     return (
//         <View style={styles.container}>
//             <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
//                 <TouchableWithoutFeedback onPress={onClose}>
//                     <View style={styles.modalContainer}>
//                         <TouchableWithoutFeedback>
//                             <View style={styles.modalContent}>
//                                 {/* Slider for adjusting effect intensity */}
//                                 {shouldShowSlider() && (
//                                     <View style={styles.sliderContainer}>
//                                         <ThemedText style={styles.sliderLabel}>
//                                             {selectedGroup === 'filters' ? 'Filter Intensity' : selectedOption}
//                                         </ThemedText>
//                                         <View style={styles.sliderWrapper}>
//                                             <Slider
//                                                 style={styles.slider}
//                                                 minimumValue={0}
//                                                 maximumValue={100}
//                                                 value={sliderValue}
//                                                 onValueChange={handleSliderChange}
//                                                 minimumTrackTintColor={customColors.accent}
//                                                 maximumTrackTintColor="#555"
//                                                 thumbTintColor={customColors.accent}
//                                                 accessibilityLabel={`Adjust ${selectedOption}`}
//                                             />
//                                             <View style={styles.thumbValueContainer}>
//                                                 <ThemedText style={styles.thumbValueText}>
//                                                     {Math.round(sliderValue)}
//                                                 </ThemedText>
//                                             </View>
//                                         </View>
//                                     </View>
//                                 )}

//                                 {/* Main Effect Category Tabs */}
//                                 <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabs}>
//                                     {filterOptions.map((option) => {
//                                         const isSelected = selectedGroup === option.id;
//                                         return (
//                                             <TouchableOpacity
//                                                 key={option.id}
//                                                 onPress={() => {
//                                                     setSelectedGroup(option.id);
//                                                     setSelectedOption(null);
//                                                 }}
//                                                 style={[styles.filterTab, isSelected && styles.filterTabSelected]}
//                                                 accessibilityLabel={`Select ${option.name}`}
//                                             >
//                                                 <ThemedText
//                                                     style={[
//                                                         styles.filterTabText,
//                                                         isSelected ? styles.filterTabTextSelected : styles.filterTabTextUnselected,
//                                                     ]}
//                                                 >
//                                                     {option.name}
//                                                 </ThemedText>
//                                             </TouchableOpacity>
//                                         );
//                                     })}
//                                 </ScrollView>

//                                 {/* Effect Options */}
//                                 <ScrollView
//                                     horizontal
//                                     showsHorizontalScrollIndicator={false}
//                                     contentContainerStyle={styles.subOptions}
//                                 >
//                                     {getCurrentOptions().map((option, index) => {
//                                         const isSelected = selectedOption === option.name;
//                                         return (
//                                             <TouchableOpacity
//                                                 key={index}
//                                                 onPress={() => handleOptionSelect(selectedGroup, option.name)}
//                                                 style={styles.subOption}
//                                                 accessibilityLabel={`Select ${option.name}`}
//                                             >
//                                                 <View
//                                                     style={[
//                                                         styles.subOptionIconContainer,
//                                                         isSelected && styles.subOptionIconContainerSelected,
//                                                     ]}
//                                                 >
//                                                     <AntDesign name={option.icon} size={20} color={customColors.gray300} />
//                                                 </View>
//                                                 <ThemedText style={styles.subOptionText}>{option.name}</ThemedText>
//                                             </TouchableOpacity>
//                                         );
//                                     })}
//                                 </ScrollView>
//                             </View>
//                         </TouchableWithoutFeedback>
//                     </View>
//                 </TouchableWithoutFeedback>
//             </Modal>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     sliderContainer: {
//         width: '100%',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         zIndex: 1000,
//         alignSelf: 'flex-end',
//     },
//     sliderLabel: {
//         color: customColors.white,
//         fontSize: scaleFont(12),
//         marginBottom: 10,
//         textAlign: 'center',
//     },
//     sliderWrapper: {
//         position: 'relative',
//     },
//     slider: {
//         width: '100%',
//         height: 40,
//         marginHorizontal: 20,
//     },
//     thumbValueContainer: {
//         position: 'absolute',
//         top: -30,
//         backgroundColor: customColors.accent,
//         paddingVertical: 2,
//         paddingHorizontal: 6,
//         borderRadius: 4,
//         transform: [{ translateX: -15 }],
//     },
//     thumbValueText: {
//         color: customColors.white,
//         fontSize: scaleFont(10),
//         fontWeight: 'bold',
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         backgroundColor: 'transparent',
//     },
//     modalContent: {
//         backgroundColor: 'rgba(0, 0, 0, 0.9)',
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         paddingHorizontal: 20,
//         paddingTop: 20,
//     },
//     filterTabs: {
//         marginBottom: 20,
//     },
//     filterTab: {
//         alignItems: 'center',
//         marginRight: 20,
//         padding: 10,
//     },
//     filterTabSelected: {
//         borderBottomWidth: 2,
//         borderBottomColor: customColors.gray300,
//     },
//     filterTabText: {
//         fontSize: scaleFont(12),
//     },
//     filterTabTextSelected: {
//         color: customColors.gray300,
//     },
//     filterTabTextUnselected: {
//         color: customColors.gray500,
//     },
//     subOptions: {
//         paddingBottom: 20,
//     },
//     subOption: {
//         alignItems: 'center',
//         marginRight: 10,
//         padding: 10,
//         borderRadius: 10,
//     },
//     subOptionIconContainer: {
//         borderColor: customColors.white,
//         borderWidth: 1.5,
//         borderRadius: 200,
//         width: 35,
//         height: 35,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     subOptionIconContainerSelected: {
//         borderColor: customColors.accent,
//     },
//     subOptionText: {
//         fontSize: scaleFont(11),
//         color: customColors.gray300,
//     },
// });

// export default FiltersBeautyModal;

// import {
//     View,
//     Modal,
//     ScrollView,
//     TouchableOpacity,
//     Dimensions,
//     TouchableWithoutFeedback,
//     StyleSheet,
//   } from 'react-native';
//   import React, { useState, useEffect } from 'react';
//   import AntDesign from 'react-native-vector-icons/AntDesign';
//   import customColors from '@/constants/styles';
//   import { scaleFont } from '@/constants/scaling';
//   import ThemedText from '@/components/ThemedText';
//   import { useZegoEffects } from '@/context/ZegoEffectsProvider';
//   import Slider from '@react-native-community/slider';
//   import {
//     ZegoEffectsFilterType,
//     ZegoEffectsBlusherType,
//     ZegoEffectsColoredcontactsType,
//     ZegoEffectsEyelashesType,
//     ZegoEffectsEyelinerType,
//     ZegoEffectsLipstickType,
//     ZegoEffectsMakeupType,
//   } from '@zegocloud/zego-effects-reactnative';

//   const { width: SCREEN_WIDTH } = Dimensions.get('window');

//   // Define types
//   type EffectGroup = 'beautification' | 'reshape' | 'filters' | 'makeup';
//   type BeautificationEffect =
//     | 'skinToneEnhancement'
//     | 'skinSmothing'
//     | 'imageSharpening'
//     | 'cheekBlusher'
//     | 'removeNasolabialFolds'
//     | 'removeDarkCircles'
//     | 'removeAcneAndFreckles'
//     | 'clarityEffects'
//     | 'longChin';

//   type ReshapeEffect =
//     | 'faceSlim'
//     | 'eyeEnlarge'
//     | 'jawRefine'
//     | 'bigEyes'
//     | 'faceLifting'
//     | 'smallMouth'
//     | 'eyeBrightening'
//     | 'noseSlimming'
//     | 'teethWhitening'
//     | 'longChin'
//     | 'foreheadShortening'
//     | 'mandibleSlimming'
//     | 'cheekboneSlimming'
//     | 'faceShortening'
//     | 'noseLengthening';

//   type FilterEffect = 'filterType' | 'filterIntensity';
//   type MakeupEffectType =
//     | 'blusher'
//     | 'coloredContacts'
//     | 'eyelashes'
//     | 'eyeliner'
//     | 'lipstick'
//     | 'makeup';

//   // Options for main tabs
//   const filterOptions = [
//     { id: 'beautification', name: 'Face Beautification' },
//     { id: 'reshape', name: 'Face Shape Retouch' },
//     { id: 'filters', name: 'Filters' },
//     { id: 'makeup', name: 'Makeup' },
//   ] as const;

//   // Beauty effect options
//   const beautificationOptions = [
//     { name: 'Clear', icon: 'closecircleo', effect: 'clear' },
//     { name: 'Tone', icon: 'smileo', effect: 'skinToneEnhancement' },
//     { name: 'Smooth', icon: 'staro', effect: 'skinSmothing' },
//     { name: 'Sharpen', icon: 'bulb1', effect: 'imageSharpening' },
//     { name: 'Blush', icon: 'bulb1', effect: 'cheekBlusher' },
//     { name: 'Folds', icon: 'bulb1', effect: 'removeNasolabialFolds' },
//     { name: 'Circles', icon: 'bulb1', effect: 'removeDarkCircles' },
//     { name: 'Acne', icon: 'bulb1', effect: 'removeAcneAndFreckles' },
//     { name: 'Clarity', icon: 'bulb1', effect: 'clarityEffects' },
//     { name: 'Long Chin', icon: 'bulb1', effect: 'longChin' },
//   ];

//   // Reshape effect options
//   const reshapeOptions = [
//     { name: 'Clear', icon: 'closecircleo', effect: 'clear' },
//     { name: 'Face Slim', icon: 'skin', effect: 'faceSlim' },
//     { name: 'Eye Enlarge', icon: 'skin', effect: 'eyeEnlarge' },
//     { name: 'Jaw Refine', icon: 'skin', effect: 'jawRefine' },
//     { name: 'Big Eyes', icon: 'skin', effect: 'bigEyes' },
//     { name: 'Face Lifting', icon: 'skin', effect: 'faceLifting' },
//     { name: 'Small Mouth', icon: 'skin', effect: 'smallMouth' },
//     { name: 'Eye Brightening', icon: 'skin', effect: 'eyeBrightening' },
//     { name: 'Nose Slimming', icon: 'skin', effect: 'noseSlimming' },
//     { name: 'Teeth Whitening', icon: 'skin', effect: 'teethWhitening' },
//     { name: 'Long Chin', icon: 'skin', effect: 'longChin' },
//     { name: 'Forehead Shortening', icon: 'skin', effect: 'foreheadShortening' },
//     { name: 'Mandible Slimming', icon: 'skin', effect: 'mandibleSlimming' },
//     { name: 'Cheekbone Slimming', icon: 'skin', effect: 'cheekboneSlimming' },
//     { name: 'Face Shortening', icon: 'skin', effect: 'faceShortening' },
//     { name: 'Nose Lengthening', icon: 'skin', effect: 'noseLengthening' },
//   ];

//   // Filter type options
//   const filterTypes = [
//     { name: 'Clear', value: 'clear', icon: 'closecircleo' },
//     { name: 'Autumn', value: ZegoEffectsFilterType.Autumn, icon: 'filter' },
//     { name: 'Brighten', value: ZegoEffectsFilterType.Brighten, icon: 'filter' },
//     { name: 'Cool', value: ZegoEffectsFilterType.Cool, icon: 'filter' },
//     { name: 'Cozily', value: ZegoEffectsFilterType.Cozily, icon: 'filter' },
//     { name: 'Creamy', value: ZegoEffectsFilterType.Creamy, icon: 'filter' },
//     { name: 'Film-Like', value: ZegoEffectsFilterType.FilmLike, icon: 'filter' },
//     { name: 'Fresh', value: ZegoEffectsFilterType.Fresh, icon: 'filter' },
//     { name: 'Night', value: ZegoEffectsFilterType.Night, icon: 'filter' },
//     { name: 'Sunset', value: ZegoEffectsFilterType.Sunset, icon: 'filter' },
//     { name: 'Sweet', value: ZegoEffectsFilterType.Sweet, icon: 'filter' },
//   ];

//   // Makeup effect options (without icons)
//   const makeupOptions = [
//     { name: 'Clear', effect: 'clear' },
//     { name: 'Blusher', effect: 'blusher' },
//     { name: 'Colored Contacts', effect: 'coloredContacts' },
//     { name: 'Eyelashes', effect: 'eyelashes' },
//     { name: 'Eyeliner', effect: 'eyeliner' },
//     { name: 'Lipstick', effect: 'lipstick' },
//     { name: 'Makeup', effect: 'makeup' },
//   ];

//   // Sub-options for each makeup effect
//   const blusherTypes = [
//     { name: 'Clear', value: 'clear', icon: 'closecircleo' },
//     { name: 'Apricot Pink', value: ZegoEffectsBlusherType.ApricotPink, icon: 'heart' },
//     { name: 'Peach', value: ZegoEffectsBlusherType.Peach, icon: 'heart' },
//     // Add more blusher types as supported by the SDK
//   ];

//   const coloredContactsTypes = [
//     { name: 'Clear', value: 'clear', icon: 'closecircleo' },
//     { name: 'Chocolate Brown', value: ZegoEffectsColoredcontactsType.ChocolateBrown, icon: 'eye' },
//     { name: 'Gray', value: ZegoEffectsColoredcontactsType.DarknightBlack, icon: 'eye' },
//     // Add more colored contacts types as supported by the SDK
//   ];

//   const eyelashesTypes = [
//     { name: 'Clear', value: 'clear', icon: 'closecircleo' },
//     { name: 'Curl', value: ZegoEffectsEyelashesType.Curl, icon: 'eyeo' },
//     { name: 'Long', value: ZegoEffectsEyelashesType.Everlong, icon: 'eyeo' },
//     // Add more eyelashes types as supported by the SDK
//   ];

//   const eyelinerTypes = [
//     { name: 'Clear', value: 'clear', icon: 'closecircleo' },
//     { name: 'Cat Eye', value: ZegoEffectsEyelinerType.CatEye, icon: 'eye' },
//     { name: 'Natural', value: ZegoEffectsEyelinerType.Natural, icon: 'eye' },
//     // Add more eyeliner types as supported by the SDK
//   ];

//   const lipstickTypes = [
//     { name: 'Clear', value: 'clear', icon: 'closecircleo' },
//     { name: 'Cameo Pink', value: ZegoEffectsLipstickType.CameoPink, icon: 'smileo' },
//     { name: 'Red', value: ZegoEffectsLipstickType.RustRed, icon: 'smileo' },
//     // Add more lipstick types as supported by the SDK
//   ];

//   const makeupTypes = [
//     { name: 'Clear', value: 'clear', icon: 'closecircleo' },
//     { name: 'Cutie Cool', value: ZegoEffectsMakeupType.CutieCool, icon: 'staro' },
//     { name: 'Natural', value: ZegoEffectsMakeupType.Flawless, icon: 'staro' },
//     // Add more makeup types as supported by the SDK
//   ];

//   const FiltersBeautyModal = ({
//     visible,
//     onClose,
//   }: {
//     visible: boolean;
//     onClose: () => void;
//   }) => {
//     // State for selected tabs and options
//     const [selectedGroup, setSelectedGroup] = useState<EffectGroup>('beautification');
//     const [selectedOption, setSelectedOption] = useState<string | null>(null);
//     const [selectedSubOption, setSelectedSubOption] = useState<string | null>(null);
//     const [sliderValue, setSliderValue] = useState<number>(0);

//     // Get state and functions from context
//     const {
//       effectsState,
//       updateBeautificationEffect,
//       updateReshapeEffect,
//       updateFilterEffect,
//       updateBlusherEffect,
//       updateColoredContactsEffect,
//       updateEyelashesEffect,
//       updateEyelinerEffect,
//       updateLipstickEffect,
//       updateMakeupEffect,
//       clearBeautification,
//       clearReshape,
//       clearFilters,
//       clearBlusher,
//       clearColoredContacts,
//       clearEyelashes,
//       clearEyeliner,
//       clearLipstick,
//       clearMakeup,
//     } = useZegoEffects();

//     // Update selected option based on group changes
//     useEffect(() => {
//       if (selectedGroup === 'filters') {
//         const currentFilter = filterTypes.find((f) => f.value === effectsState.filters.filterType);
//         setSelectedOption(currentFilter?.name || 'Clear');
//         setSelectedSubOption(null);
//         setSliderValue(effectsState.filters.filterIntensity);
//       } else if (selectedGroup === 'makeup') {
//         setSelectedOption(null);
//         setSelectedSubOption(null);
//         setSliderValue(0);
//       } else {
//         setSelectedOption(null);
//         setSelectedSubOption(null);
//         setSliderValue(0);
//       }
//     }, [selectedGroup, effectsState.filters]);

//     // Get current options based on selected group
//     const getCurrentOptions = () => {
//       switch (selectedGroup) {
//         case 'beautification':
//           return beautificationOptions;
//         case 'reshape':
//           return reshapeOptions;
//         case 'filters':
//           return filterTypes;
//         case 'makeup':
//           return makeupOptions;
//         default:
//           return [];
//       }
//     };

//     // Get sub-options for makeup effects
//     const getMakeupSubOptions = (effect: string | null) => {
//       switch (effect) {
//         case 'blusher':
//           return blusherTypes;
//         case 'coloredContacts':
//           return coloredContactsTypes;
//         case 'eyelashes':
//           return eyelashesTypes;
//         case 'eyeliner':
//           return eyelinerTypes;
//         case 'lipstick':
//           return lipstickTypes;
//         case 'makeup':
//           return makeupTypes;
//         default:
//           return [];
//       }
//     };

//     // Get slider value for the currently selected effect
//     const getSliderValueForEffect = (group: EffectGroup, effectName: string | null) => {
//       if (!effectName || effectName === 'Clear') return 0;

//       if (group === 'filters') {
//         return effectsState.filters.filterIntensity;
//       }

//       if (group === 'makeup') {
//         const makeupEffect = makeupOptions.find((opt) => opt.name === effectName)?.effect;
//         switch (makeupEffect) {
//           case 'blusher':
//             return effectsState.blusher.filterIntensity;
//           case 'coloredContacts':
//             return effectsState.coloredContacts.filterIntensity;
//           case 'eyelashes':
//             return effectsState.eyelashes.filterIntensity;
//           case 'eyeliner':
//             return effectsState.eyeliner.filterIntensity;
//           case 'lipstick':
//             return effectsState.lipstick.filterIntensity;
//           case 'makeup':
//             return effectsState.makeup.filterIntensity;
//           default:
//             return 0;
//         }
//       }

//       const options = group === 'beautification' ? beautificationOptions : reshapeOptions;
//       const option = options.find((opt) => opt.name === effectName);

//       if (!option || option.effect === 'clear') return 0;

//       if (group === 'beautification') {
//         return effectsState.beautification[option.effect as BeautificationEffect];
//       } else {
//         return effectsState.reshape[option.effect as ReshapeEffect];
//       }
//     };

//     // Handle option selection
//     const handleOptionSelect = (group: EffectGroup, optionName: string) => {
//       setSelectedOption(optionName);
//       setSelectedSubOption(null);

//       if (optionName === 'Clear' && group === 'makeup') {
//         clearBlusher();
//         clearColoredContacts();
//         clearEyelashes();
//         clearEyeliner();
//         clearLipstick();
//         clearMakeup();
//         setSliderValue(0);
//         return;
//       }

//       if (optionName === 'Clear') {
//         if (group === 'beautification') {
//           clearBeautification();
//         } else if (group === 'reshape') {
//           clearReshape();
//         } else if (group === 'filters') {
//           clearFilters();
//         }
//         setSliderValue(0);
//         return;
//       }

//       if (group === 'filters') {
//         const selectedFilter = filterTypes.find((f) => f.name === optionName);
//         if (selectedFilter) {
//           updateFilterEffect('filterType', selectedFilter.value);
//           setSliderValue(effectsState.filters.filterIntensity);
//         }
//       } else if (group === 'makeup') {
//         const selectedEffect = makeupOptions.find((opt) => opt.name === optionName)?.effect;
//         if (selectedEffect) {
//           const subOptions = getMakeupSubOptions(selectedEffect);
//           const defaultSubOption = subOptions.find((opt) => opt.name !== 'Clear');
//           if (defaultSubOption) {
//             setSelectedSubOption(defaultSubOption.name);
//             switch (selectedEffect) {
//               case 'blusher':
//                 updateBlusherEffect('filterType', defaultSubOption.value);
//                 setSliderValue(effectsState.blusher.filterIntensity);
//                 break;
//               case 'coloredContacts':
//                 updateColoredContactsEffect('filterType', defaultSubOption.value);
//                 setSliderValue(effectsState.coloredContacts.filterIntensity);
//                 break;
//               case 'eyelashes':
//                 updateEyelashesEffect('filterType', defaultSubOption.value);
//                 setSliderValue(effectsState.eyelashes.filterIntensity);
//                 break;
//               case 'eyeliner':
//                 updateEyelinerEffect('filterType', defaultSubOption.value);
//                 setSliderValue(effectsState.eyeliner.filterIntensity);
//                 break;
//               case 'lipstick':
//                 updateLipstickEffect('filterType', defaultSubOption.value);
//                 setSliderValue(effectsState.lipstick.filterIntensity);
//                 break;
//               case 'makeup':
//                 updateMakeupEffect('filterType', defaultSubOption.value);
//                 setSliderValue(effectsState.makeup.filterIntensity);
//                 break;
//             }
//           }
//         }
//       } else {
//         const options = group === 'beautification' ? beautificationOptions : reshapeOptions;
//         const selectedOpt = options.find((opt) => opt.name === optionName);

//         if (selectedOpt && selectedOpt.effect !== 'clear') {
//           const value =
//             group === 'beautification'
//               ? effectsState.beautification[selectedOpt.effect as BeautificationEffect]
//               : effectsState.reshape[selectedOpt.effect as ReshapeEffect];
//           setSliderValue(value);
//         }
//       }
//     };

//     // Handle sub-option selection for makeup effects
//     const handleSubOptionSelect = (effect: string, subOptionName: string) => {
//       setSelectedSubOption(subOptionName);

//       const subOptions = getMakeupSubOptions(effect);
//       const selectedSubOption = subOptions.find((opt) => opt.name === subOptionName);

//       if (selectedSubOption) {
//         switch (effect) {
//           case 'blusher':
//             updateBlusherEffect('filterType', selectedSubOption.value);
//             setSliderValue(effectsState.blusher.filterIntensity);
//             break;
//           case 'coloredContacts':
//             updateColoredContactsEffect('filterType', selectedSubOption.value);
//             setSliderValue(effectsState.coloredContacts.filterIntensity);
//             break;
//           case 'eyelashes':
//             updateEyelashesEffect('filterType', selectedSubOption.value);
//             setSliderValue(effectsState.eyelashes.filterIntensity);
//             break;
//           case 'eyeliner':
//             updateEyelinerEffect('filterType', selectedSubOption.value);
//             setSliderValue(effectsState.eyeliner.filterIntensity);
//             break;
//           case 'lipstick':
//             updateLipstickEffect('filterType', selectedSubOption.value);
//             setSliderValue(effectsState.lipstick.filterIntensity);
//             break;
//           case 'makeup':
//             updateMakeupEffect('filterType', selectedSubOption.value);
//             setSliderValue(effectsState.makeup.filterIntensity);
//             break;
//         }
//       }
//     };

//     // Handle slider change
//     const handleSliderChange = (value: number) => {
//       setSliderValue(value);

//       if (!selectedOption || selectedOption === 'Clear') return;

//       if (selectedGroup === 'filters') {
//         updateFilterEffect('filterIntensity', value);
//         return;
//       }

//       if (selectedGroup === 'makeup') {
//         const selectedEffect = makeupOptions.find((opt) => opt.name === selectedOption)?.effect;
//         switch (selectedEffect) {
//           case 'blusher':
//             updateBlusherEffect('filterIntensity', value);
//             break;
//           case 'coloredContacts':
//             updateColoredContactsEffect('filterIntensity', value);
//             break;
//           case 'eyelashes':
//             updateEyelashesEffect('filterIntensity', value);
//             break;
//           case 'eyeliner':
//             updateEyelinerEffect('filterIntensity', value);
//             break;
//           case 'lipstick':
//             updateLipstickEffect('filterIntensity', value);
//             break;
//           case 'makeup':
//             updateMakeupEffect('filterIntensity', value);
//             break;
//         }
//         return;
//       }

//       const options = selectedGroup === 'beautification' ? beautificationOptions : reshapeOptions;
//       const selectedOpt = options.find((opt) => opt.name === selectedOption);

//       if (selectedOpt && selectedOpt.effect !== 'clear') {
//         if (selectedGroup === 'beautification') {
//           updateBeautificationEffect(selectedOpt.effect as BeautificationEffect, value);
//         } else {
//           updateReshapeEffect(selectedOpt.effect as ReshapeEffect, value);
//         }
//       }
//     };

//     // Check if we should show slider
//     const shouldShowSlider = () => {
//       if (!selectedOption || selectedOption === 'Clear') return false;

//       if (selectedGroup === 'filters') {
//         return effectsState.filters.filterType !== 'clear';
//       }

//       if (selectedGroup === 'makeup') {
//         const selectedEffect = makeupOptions.find((opt) => opt.name === selectedOption)?.effect;
//         switch (selectedEffect) {
//           case 'blusher':
//             return effectsState.blusher.filterType !== 'clear';
//           case 'coloredContacts':
//             return effectsState.coloredContacts.filterType !== 'clear';
//           case 'eyelashes':
//             return effectsState.eyelashes.filterType !== 'clear';
//           case 'eyeliner':
//             return effectsState.eyeliner.filterType !== 'clear';
//           case 'lipstick':
//             return effectsState.lipstick.filterType !== 'clear';
//           case 'makeup':
//             return effectsState.makeup.filterType !== 'clear';
//           default:
//             return false;
//         }
//       }

//       return true;
//     };

//     return (
//       <View style={styles.container}>
//         <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
//           <TouchableWithoutFeedback onPress={onClose}>
//             <View style={styles.modalContainer}>
//               <TouchableWithoutFeedback>
//                 <View style={styles.modalContent}>
//                   {/* Slider for adjusting effect intensity */}
//                   {shouldShowSlider() && (
//                     <View style={styles.sliderContainer}>
//                       <ThemedText style={styles.sliderLabel}>
//                         {selectedGroup === 'filters' || selectedGroup === 'makeup'
//                           ? 'Intensity'
//                           : selectedOption}
//                       </ThemedText>
//                       <View style={styles.sliderWrapper}>
//                         <Slider
//                           style={styles.slider}
//                           minimumValue={0}
//                           maximumValue={100}
//                           value={sliderValue}
//                           onValueChange={handleSliderChange}
//                           minimumTrackTintColor={customColors.accent}
//                           maximumTrackTintColor="#555"
//                           thumbTintColor={customColors.accent}
//                           accessibilityLabel={`Adjust ${selectedOption}`}
//                         />
//                         <View style={styles.thumbValueContainer}>
//                           <ThemedText style={styles.thumbValueText}>{Math.round(sliderValue)}</ThemedText>
//                         </View>
//                       </View>
//                     </View>
//                   )}

//                   {/* Main Effect Category Tabs */}
//                   <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabs}>
//                     {filterOptions.map((option) => {
//                       const isSelected = selectedGroup === option.id;
//                       return (
//                         <TouchableOpacity
//                           key={option.id}
//                           onPress={() => {
//                             setSelectedGroup(option.id);
//                             setSelectedOption(null);
//                             setSelectedSubOption(null);
//                           }}
//                           style={[styles.filterTab, isSelected && styles.filterTabSelected]}
//                           accessibilityLabel={`Select ${option.name}`}
//                         >
//                           <ThemedText
//                             style={[
//                               styles.filterTabText,
//                               isSelected ? styles.filterTabTextSelected : styles.filterTabTextUnselected,
//                             ]}
//                           >
//                             {option.name}
//                           </ThemedText>
//                         </TouchableOpacity>
//                       );
//                     })}
//                   </ScrollView>

//                   {/* Effect Options */}
//                   <ScrollView
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     contentContainerStyle={styles.subOptions}
//                   >
//                     {getCurrentOptions().map((option, index) => {
//                       const isSelected = selectedOption === option.name;
//                       return (
//                         <TouchableOpacity
//                           key={index}
//                           onPress={() => handleOptionSelect(selectedGroup, option.name)}
//                           style={styles.subOption}
//                           accessibilityLabel={`Select ${option.name}`}
//                         >
//                           {selectedGroup === 'makeup' ? (
//                             <View
//                               style={[
//                                 styles.subOptionTextContainer,
//                                 isSelected && styles.subOptionTextContainerSelected,
//                               ]}
//                             >
//                               <ThemedText
//                                 style={[
//                                   styles.subOptionText,
//                                   isSelected && styles.subOptionTextSelected,
//                                 ]}
//                               >
//                                 {option.name}
//                               </ThemedText>
//                             </View>
//                           ) : (
//                             <>
//                               <View
//                                 style={[
//                                   styles.subOptionIconContainer,
//                                   isSelected && styles.subOptionIconContainerSelected,
//                                 ]}
//                               >
//                                 <AntDesign
//                                   name={'icon' in option ? option.icon : 'questioncircleo'}
//                                   size={20}
//                                   color={customColors.gray300}
//                                 />
//                               </View>
//                               <ThemedText style={styles.subOptionText}>{option.name}</ThemedText>
//                             </>
//                           )}
//                         </TouchableOpacity>
//                       );
//                     })}
//                   </ScrollView>

//                   {/* Sub-options for Makeup Effects */}
//                   {selectedGroup === 'makeup' && selectedOption && selectedOption !== 'Clear' && (
//                     <ScrollView
//                       horizontal
//                       showsHorizontalScrollIndicator={false}
//                       contentContainerStyle={styles.subOptions}
//                     >
//                       {getMakeupSubOptions(
//                         makeupOptions.find((opt) => opt.name === selectedOption)?.effect
//                       ).map((subOption, index) => {
//                         const isSelected = selectedSubOption === subOption.name;
//                         return (
//                           <TouchableOpacity
//                             key={index}
//                             onPress={() =>
//                               handleSubOptionSelect(
//                                 makeupOptions.find((opt) => opt.name === selectedOption)!.effect,
//                                 subOption.name
//                               )
//                             }
//                             style={styles.subOption}
//                             accessibilityLabel={`Select ${subOption.name}`}
//                           >
//                             <View
//                               style={[
//                                 styles.subOptionIconContainer,
//                                 isSelected && styles.subOptionIconContainerSelected,
//                               ]}
//                             >
//                               <AntDesign
//                                 name={subOption.icon}
//                                 size={20}
//                                 color={customColors.gray300}
//                               />
//                             </View>
//                             <ThemedText style={styles.subOptionText}>{subOption.name}</ThemedText>
//                           </TouchableOpacity>
//                         );
//                       })}
//                     </ScrollView>
//                   )}
//                 </View>
//               </TouchableWithoutFeedback>
//             </View>
//           </TouchableWithoutFeedback>
//         </Modal>
//       </View>
//     );
//   };

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//     },
//     sliderContainer: {
//       width: '100%',
//       paddingVertical: 10,
//       paddingHorizontal: 20,
//       zIndex: 1000,
//       alignSelf: 'flex-end',
//     },
//     sliderLabel: {
//       color: customColors.white,
//       fontSize: scaleFont(12),
//       marginBottom: 10,
//       textAlign: 'center',
//     },
//     sliderWrapper: {
//       position: 'relative',
//     },
//     slider: {
//       width: '100%',
//       height: 40,
//       marginHorizontal: 20,
//     },
//     thumbValueContainer: {
//       position: 'absolute',
//       top: -30,
//       backgroundColor: customColors.accent,
//       paddingVertical: 2,
//       paddingHorizontal: 6,
//       borderRadius: 4,
//       transform: [{ translateX: -15 }],
//     },
//     thumbValueText: {
//       color: customColors.white,
//       fontSize: scaleFont(10),
//       fontWeight: 'bold',
//     },
//     modalContainer: {
//       flex: 1,
//       justifyContent: 'flex-end',
//       backgroundColor: 'transparent',
//     },
//     modalContent: {
//       backgroundColor: 'rgba(0, 0, 0, 0.9)',
//       borderTopLeftRadius: 20,
//       borderTopRightRadius: 20,
//       paddingHorizontal: 20,
//       paddingTop: 20,
//     },
//     filterTabs: {
//       marginBottom: 20,
//     },
//     filterTab: {
//       alignItems: 'center',
//       marginRight: 20,
//       padding: 10,
//     },
//     filterTabSelected: {
//       borderBottomWidth: 2,
//       borderBottomColor: customColors.gray300,
//     },
//     filterTabText: {
//       fontSize: scaleFont(12),
//     },
//     filterTabTextSelected: {
//       color: customColors.gray300,
//     },
//     filterTabTextUnselected: {
//       color: customColors.gray500,
//     },
//     subOptions: {
//       paddingBottom: 20,
//     },
//     subOption: {
//       alignItems: 'center',
//       marginRight: 10,
//       padding: 10,
//       borderRadius: 10,
//     },
//     subOptionIconContainer: {
//       borderColor: customColors.white,
//       borderWidth: 1.5,
//       borderRadius: 200,
//       width: 35,
//       height: 35,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     subOptionIconContainerSelected: {
//       borderColor: customColors.accent,
//     },
//     subOptionTextContainer: {
//       borderColor: customColors.white,
//       borderWidth: 1.5,
//       borderRadius: 8,
//       paddingVertical: 5,
//       paddingHorizontal: 10,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     subOptionTextContainerSelected: {
//       borderColor: customColors.red400, // Different color for makeup options
//       backgroundColor: customColors.red400,
//     },
//     subOptionText: {
//       fontSize: scaleFont(11),
//       color: customColors.gray300,
//     },
//     subOptionTextSelected: {
//       color: customColors.gray900, // Contrast color for selected makeup text
//       fontWeight: 'bold',
//     },
//   });

//   export default FiltersBeautyModal;

// import { View, StyleSheet } from 'react-native'
// import React from 'react'
// import BeautyPanel from '@/components/zego/BeautryPanel'
// import EffectsHelper from '@/zegodata/EffectsHelper'

// const FiltersBeautyModal = () => {
//   return (
//     <View style={styles.container}>
//       <BeautyPanel
//         onSelected={(groupItem, beautyItem) => {
//           console.log('onSelected triggered:', groupItem, beautyItem);
//           EffectsHelper.updateEffects(
//             groupItem,
//             beautyItem,
//             beautyItem.intensity ?? groupItem.intensity ?? 0
//           );
//         }}
//         onSliderEnd={(groupItem, beautyItem, currentIntensity) => {
//           console.log('onSliderEnd triggered:', groupItem, beautyItem, currentIntensity);
//           EffectsHelper.updateEffects(
//             groupItem,
//             beautyItem,
//             currentIntensity
//           );
//         }}
//       />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     position: 'relative',
//   }
// });

// export default FiltersBeautyModal
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  Platform,
  Modal,
  Pressable
} from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/MaterialIcons";
import EffectsConfig, { BeautyItem } from "@/zegodata/EffectsConfig";
import customColors from "@/constants/styles";
import LinnerGradientCard from "@/components/common/gradientCards/LinnearGradientCard";
import Reanimated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import EffectsHelper from '@/zegodata/EffectsHelper';

const { width } = Dimensions.get("window");
const ReanimatedView = Reanimated.View;

interface PanelState {
  activeTab: number;
  selectedEffect: BeautyItem | null;
  selectedSubEffect: BeautyItem | null;
  selectedThirdEffect: BeautyItem | null;
  sliderValue: number;
}

type Props = {
  visible: boolean;
  onClose: () => void;
};

const FiltersBeautyModal = ({ visible, onClose }: Props) => {
  const [panelState, setPanelState] = useState<PanelState>({
    activeTab: 0,
    selectedEffect: null,
    selectedSubEffect: null,
    selectedThirdEffect: null,
    sliderValue: 0,
  });

  const [expanded, setExpanded] = useState(true);

  const subEffectWidth = useSharedValue(width * 0.9); // Initial width expanded by default

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(subEffectWidth.value, { duration: 300 }),
    };
  });

  const toggleSubEffectWidth = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    subEffectWidth.value = expanded ? width * 0.9 : width * 0.1;
  }, [expanded])

  const updatePanelState = useCallback((updates: Partial<PanelState>) => {
    setPanelState((prev) => ({ ...prev, ...updates }));
  }, []);

  const { activeTab, selectedEffect, selectedSubEffect, selectedThirdEffect, sliderValue } = panelState;

  // Animations for panel
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const slideAnim = useMemo(() => new Animated.Value(300), []);

  // Underline animation for tabs
  const underlineAnim = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(fadeAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  useEffect(() => {
    // Animate underline when activeTab changes
    Animated.spring(underlineAnim, {
      toValue: activeTab,
      useNativeDriver: false, // translateX doesn't support useNativeDriver in some cases
    }).start();
  }, [activeTab, underlineAnim]);

  const effectsAnim = useMemo(() => new Animated.Value(1), []);
  const lastActiveTab = React.useRef(activeTab);

  useEffect(() => {
    if (lastActiveTab.current !== activeTab) {
      Animated.timing(effectsAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(effectsAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      });
      lastActiveTab.current = activeTab;
    }
  }, [activeTab, effectsAnim]);

  const getIconForEffect = useCallback((type: string) => {
    return "tune";
  }, []);

  const renderTab = useCallback(
    (item: BeautyItem, index: number) => {
      const isActive = activeTab === index;
      const underlineWidth = underlineAnim.interpolate({
        inputRange: EffectsConfig.map((_, i) => i),
        outputRange: EffectsConfig.map((_, i) => (i === index ? 20 : 0)),
      });

      return (
        <TouchableOpacity
          key={item.name}
          style={[styles.tab, isActive && styles.activeTab]}
          onPress={() =>
            updatePanelState({
              activeTab: index,
              selectedEffect: null,
              selectedSubEffect: null,
              selectedThirdEffect: null,
              sliderValue: 0,
            })
          }
          accessibilityLabel={item.name}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, isActive && styles.activeTabText]}>
            {item.name}
          </Text>
          <Animated.View
            style={[
              styles.activeTabIndicator,
              isActive && { width: underlineWidth },
            ]}
          />
        </TouchableOpacity>
      );
    },
    [activeTab, updatePanelState, underlineAnim]
  );

  const EffectItem = React.memo(
    ({ item, index, isSelected, onPress, getIconForEffect }: any) => (
      <TouchableOpacity
        key={item.type}
        style={[styles.effectItem]}
        onPress={onPress}
        accessibilityLabel={item.name}
        activeOpacity={0.7}
      >
        <View
          style={{
            borderColor: isSelected ? customColors.accent : customColors.white,
            borderRadius: 100,
            borderWidth: 2,
            width: 35,
            height: 35,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            name={getIconForEffect(item.type)}
            size={25}
            color={isSelected ? "#fff" : customColors.gray300}
          />
        </View>
        <Text style={[styles.effectText, isSelected && styles.selectedEffectText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    )
  );

  const SubEffectItem = React.memo(
    ({ item, index, isSelected, onPress, getIconForEffect }: any) => (
      <TouchableOpacity
        key={item.type}
        style={[styles.effectItem]}
        onPress={onPress}
        accessibilityLabel={item.name}
        activeOpacity={0.7}
      >
        <View
          style={{
            borderColor: isSelected ? customColors.accent : customColors.white,
            borderRadius: 100,
            borderWidth: 2,
            width: 30,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            name={getIconForEffect(item.type)}
            size={20}
            color={isSelected ? "#fff" : customColors.gray300}
          />
        </View>
        <Text style={[styles.effectText, isSelected && styles.selectedEffectText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    )
  );

  const ThirdEffectItem = React.memo(
    ({ item, index, isSelected, onPress, getIconForEffect }: any) => (
      <TouchableOpacity
        key={item.type}
        style={[styles.thirdEffectItem, isSelected && styles.selectedThirdEffectItem]}
        onPress={onPress}
        accessibilityLabel={item.name}
        activeOpacity={0.7}
      >
        <Icon
          name={getIconForEffect(item.type)}
          size={16}
          color={isSelected ? "#fff" : "#444"}
        />
        <Text style={[styles.thirdEffectText, isSelected && styles.selectedThirdEffectText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    )
  );

  const renderEffectItem = useCallback(
    (item: BeautyItem, index: number) => {
      const isSelected = selectedEffect?.type === item.type;
      return (
        <EffectItem
          item={item}
          index={index}
          isSelected={isSelected}
          onPress={() => {
            updatePanelState({
              selectedEffect: item,
              selectedSubEffect: null,
              selectedThirdEffect: null,
              sliderValue: item.intensity ?? 0,
            });
            if (EffectsConfig[activeTab]) {
              EffectsHelper.updateEffects(
                EffectsConfig[activeTab],
                item,
                item.intensity ?? 0
              );
            }
            setExpanded(true);
          }}
          getIconForEffect={getIconForEffect}
        />
      );
    },
    [activeTab, selectedEffect, getIconForEffect, updatePanelState]
  );

  const renderSubEffectItem = useCallback(
    (item: BeautyItem, index: number) => {
      const isSelected = selectedSubEffect?.type === item.type;
      return (
        <SubEffectItem
          item={item}
          index={index}
          isSelected={isSelected}
          onPress={() => {
            updatePanelState({
              selectedSubEffect: item,
              selectedThirdEffect: null,
              sliderValue: item.intensity ?? selectedEffect?.intensity ?? 0,
            });
            if (selectedEffect) {
              EffectsHelper.updateEffects(
                selectedEffect,
                item,
                item.intensity ?? selectedEffect?.intensity ?? 0
              );
            }
          }}
          getIconForEffect={getIconForEffect}
        />
      );
    },
    [selectedEffect, selectedSubEffect, getIconForEffect, updatePanelState]
  );

  const renderThirdEffectItem = useCallback(
    (item: BeautyItem, index: number) => {
      const isSelected = selectedThirdEffect?.type === item.type;
      return (
        <ThirdEffectItem
          item={item}
          index={index}
          isSelected={isSelected}
          onPress={() => {
            updatePanelState({
              selectedThirdEffect: item,
              sliderValue:
                item.intensity ??
                selectedSubEffect?.intensity ??
                selectedEffect?.intensity ??
                0,
            });
            if (selectedSubEffect) {
              EffectsHelper.updateEffects(
                selectedSubEffect, 
                item, 
                item.intensity ?? selectedSubEffect?.intensity ?? 0
              );
            }
          }}
          getIconForEffect={getIconForEffect}
        />
      );
    },
    [selectedSubEffect, selectedThirdEffect, getIconForEffect, updatePanelState]
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Use a backdrop View but don't block touches inside modal */}
      <View style={styles.backdrop}>
        {/* Pressable used for backdrop press */}
        <Pressable style={styles.backdropTouchable} onPress={onClose} />
        
        {/* Main Modal Content */}
        <View style={styles.container}>
          <View style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            {(selectedEffect || selectedSubEffect || selectedThirdEffect) && (
              <View style={styles.sliderContainer}>
                <View style={styles.sliderLabelContainer}>
                  <Text style={styles.sliderValue}>{Math.round(sliderValue)}%</Text>
                </View>
                <Slider
                  style={styles.slider}
                  minimumValue={selectedEffect?.range?.[0] ?? 0}
                  maximumValue={selectedEffect?.range?.[1] ?? 100}
                  step={1}
                  value={sliderValue}
                  minimumTrackTintColor="#5271ff"
                  maximumTrackTintColor="#e0e0e0"
                  thumbTintColor="#5271ff"
                  onValueChange={(value) => {
                    updatePanelState({ sliderValue: value });
                    if (selectedEffect) selectedEffect.intensity = value;
                    if (selectedSubEffect) selectedSubEffect.intensity = value;
                    if (selectedThirdEffect) selectedThirdEffect.intensity = value;
                  }}
                  onSlidingComplete={() => {
                    if (EffectsConfig[activeTab] && selectedEffect) {
                      if (selectedThirdEffect && selectedSubEffect) {
                        EffectsHelper.updateEffects(selectedSubEffect, selectedThirdEffect, sliderValue);
                      } else if (selectedSubEffect) {
                        EffectsHelper.updateEffects(selectedEffect, selectedSubEffect, sliderValue);
                      } else {
                        EffectsHelper.updateEffects(EffectsConfig[activeTab], selectedEffect, sliderValue);
                      }
                    }
                  }}
                  accessibilityLabel="Intensity Slider"
                />
              </View>
            )}
            <Animated.View style={[styles.beautyContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              <View style={styles.contentWrapper}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.tabContainer}
                  contentContainerStyle={styles.tabContentContainer}
                >
                  {EffectsConfig.map(renderTab)}
                </ScrollView>
                <Animated.View style={{ opacity: effectsAnim }}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.effectsContainer}
                    contentContainerStyle={styles.effectsContentContainer}
                  >
                    {EffectsConfig[activeTab]?.items?.map(renderEffectItem)}
                  </ScrollView>
                </Animated.View>
                
                {selectedEffect?.items && (
                  <ReanimatedView style={[styles.subEffectsOverlay, animatedStyle]}>
                    <LinnerGradientCard customStyles={[]}>
                      <View style={styles.subEffectsWrapper}>
                        <TouchableOpacity style={styles.toggleButton} onPress={toggleSubEffectWidth}>
                          <Icon 
                            name={expanded ? "chevron-right" : "chevron-left"} 
                            size={30} 
                            color="#fff" 
                          />
                        </TouchableOpacity>
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          style={styles.subEffectsContainer}
                          contentContainerStyle={styles.subEffectsContentContainer}
                        >
                          {selectedEffect.items.map(renderSubEffectItem)}
                        </ScrollView>
                      </View>
                    </LinnerGradientCard>
                  </ReanimatedView>
                )}
              </View>
            </Animated.View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdropTouchable: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  container: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 12,
  },
  closeText: {
    fontSize: 16,
    color: '#007AFF',
  },
  safeArea: {
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  beautyContainer: {
    height: 130,
    backgroundColor: "rgba(5,5,5,0.9)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  contentWrapper: {
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
  },
  tabContainer: {
    maxHeight: 30,
  },
  tabContentContainer: {
    paddingHorizontal: 10,
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 15,
    backgroundColor: "#f0f2f5",
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: customColors.primary,
  },
  activeTabIndicator: {
    position: "absolute",
    bottom: -4,
    height: 2,
    backgroundColor: "#5271ff",
    borderRadius: 1,
  },
  tabText: {
    color: "#444",
    fontSize: 12,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#fff",
  },
  effectsContainer: {
    maxHeight: 80,
  },
  effectsContentContainer: {
    paddingLeft: 10,
    paddingRight: 30, // Added extra padding on the right side
    marginTop: 14
  },
  effectItem: {
    flexDirection: "column",
    alignItems: "center",
    padding: 4,
    marginRight: 10,
    borderRadius: 10,
    minWidth: 80,
    maxWidth: 100,
    gap: 2,
  },
  effectText: {
    fontSize: 10,
    color: customColors.gray300,
    textAlign: "center",
    fontWeight: "700",
  },
  selectedEffectText: {
    color: "#fff",
  },
  subEffectsOverlay: {
    position: "absolute",
    bottom: 6,
    right: 0,
    backgroundColor: "transparent",
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    overflow: "hidden",
  },
  toggleButton: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  subEffectsWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
  },
  subEffectsContainer: {
    flex: 1,
  },
  subEffectsContentContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  subEffectItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginRight: 6,
    borderRadius: 15,
    backgroundColor: "#f0f2f5",
  },
  selectedSubEffectItem: {
    backgroundColor: "#7e8eff",
  },
  subEffectText: {
    color: "#444",
    fontSize: 8,
  },
  selectedSubEffectText: {
    color: "#fff",
  },
  thirdEffectsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  thirdEffectsTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  thirdEffectsScroll: {
    maxHeight: 40,
  },
  thirdEffectsContentContainer: {
    paddingHorizontal: 5,
    alignItems: "center",
  },
  thirdEffectItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 15,
    backgroundColor: "#e0e0e0",
  },
  selectedThirdEffectItem: {
    backgroundColor: "#a4b0ff",
  },
  thirdEffectText: {
    color: "#444",
    fontSize: 12,
  },
  selectedThirdEffectText: {
    color: "#fff",
  },
  sliderContainer: {
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 10,
    marginBottom: 1,
    alignSelf: "center",
    width: "95%",
  },
  sliderLabelContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  sliderLabel: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  sliderValue: {
    fontSize: 14,
    color: "#5271ff",
    fontWeight: "600",
  },
  slider: {
    width: "100%",
    height: 20,
  },
});

export default FiltersBeautyModal;
