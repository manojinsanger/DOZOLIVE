// // BeautyPanel.tsx
// import React, { useState } from "react";
// import { View, StyleSheet } from "react-native";
// import { Picker } from "@react-native-picker/picker"; // ✅ updated import
// import Slider from "@react-native-community/slider";
// import EffectsConfig, { BeautyItem } from "../../zegodata/EffectsConfig";

// const BeautyPanel: React.FC<{
//   onSelected: (groupItem: BeautyItem, beautyItem: BeautyItem) => void;
//   onSliderEnd: (
//     groupItem: BeautyItem,
//     beautyItem: BeautyItem,
//     currentIntensity: number
//   ) => void;
// }> = ({ onSelected, onSliderEnd }) => {
//   const [firstLevel, setFirstLevel] = useState<number | null>(null);
//   const [secondLevel, setSecondLevel] = useState<number | null>(null);
//   const [thirdLevel, setThirdLevel] = useState<number | null>(null);
//   const [sliderValue, setSliderValue] = useState(0);

//   const [selectedFirstItem, setSelectedFirstItem] = useState<BeautyItem>();
//   const [selectedSecondItem, setSelectedSecondItem] = useState<BeautyItem>();
//   const [selectedThirdItem, setSelectedThirdItem] = useState<BeautyItem>();

//   return (
//     <View style={styles.container}>
//       <View style={styles.sliderContainer}>
//         <Slider
//           style={styles.slider}
//           minimumValue={selectedSecondItem?.range?.[0] ?? 0}
//           maximumValue={selectedSecondItem?.range?.[1] ?? 100}
//           step={25}
//           value={sliderValue}
//           onValueChange={(value) => {
//             setSliderValue(value);
//             if (selectedSecondItem) selectedSecondItem.intensity = value;
//             if (selectedThirdItem) selectedThirdItem.intensity = value;
//           }}
//           onSlidingComplete={() => {
//             if (selectedSecondItem && selectedThirdItem) {
//               onSliderEnd(selectedSecondItem, selectedThirdItem, sliderValue);
//             } else if (selectedFirstItem && selectedSecondItem) {
//               onSliderEnd(selectedFirstItem, selectedSecondItem, sliderValue);
//             }
//           }}
//         />
//       </View>

//       {/* First Level Picker */}
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={firstLevel}
//           style={styles.picker}
//           onValueChange={(itemIndex) => {
//             setFirstLevel(itemIndex);
//             const item = EffectsConfig[itemIndex];
//             setSelectedFirstItem(item);
//             setSecondLevel(null);
//             setThirdLevel(null);
//             setSelectedSecondItem(undefined);
//             setSelectedThirdItem(undefined);
//           }}
//         >
//           <Picker.Item label="Please select" value={null} />
//           {EffectsConfig.map((item, index) => (
//             <Picker.Item key={item.name} label={item.name} value={index} />
//           ))}
//         </Picker>

//         {/* Second Level Picker */}
//         <Picker
//           selectedValue={secondLevel}
//           style={styles.picker}
//           enabled={firstLevel !== null}
//           onValueChange={(itemIndex) => {
//             setSecondLevel(itemIndex);
//             const item = selectedFirstItem?.items?.[itemIndex];
//             setSelectedSecondItem(item);
//             setSelectedThirdItem(undefined);
//             setThirdLevel(null);
//             setSliderValue(item?.intensity ?? 0);
//             if (selectedFirstItem && item) {
//               onSelected(selectedFirstItem, item);
//             }
//           }}
//         >
//           <Picker.Item label="Please select" value={null} />
//           {selectedFirstItem?.items?.map((item, index) => (
//             <Picker.Item key={item.type} label={item.name} value={index} />
//           ))}
//         </Picker>
//       </View>

//       {/* Third Level Picker */}
//       <View style={styles.pickerContainer}>
//         {selectedSecondItem?.items && (
//           <Picker
//             selectedValue={thirdLevel}
//             style={styles.picker}
//             enabled={secondLevel !== null}
//             onValueChange={(itemIndex) => {
//               setThirdLevel(itemIndex);
//               const item = selectedSecondItem.items?.[itemIndex];
//               setSelectedThirdItem(item);
//               setSliderValue(
//                 item?.intensity ?? selectedSecondItem.intensity ?? 0
//               );
//               if (selectedSecondItem && item) {
//                 onSelected(selectedSecondItem, item);
//               }
//             }}
//           >
//             <Picker.Item label="Please select" value={null} />
//             {selectedSecondItem.items.map((item, index) => (
//               <Picker.Item key={item.type} label={item.name} value={index} />
//             ))}
//           </Picker>
//         )}
//       </View>
//     </View>
//   );
// };

// export default BeautyPanel;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingLeft: 5,
//     paddingRight: 5,
//     flexDirection: "column",
//   },
//   pickerContainer: {
//     flex: 1,
//     width: "100%",
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   picker: {
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#336699",
//     borderRadius: 5,
//     color: "#333999",
//     flex: 1,
//     margin: 3,
//   },
//   sliderContainer: {
//     flex: 1,
//     width: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   slider: {
//     flex: 1,
//     height: 40,
//     color: "#333999",
//     backgroundColor: "#eee",
//     margin: 3,
//   },
// });
// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Animated,
//   Dimensions,
// } from "react-native";
// import Slider from "@react-native-community/slider";
// import LinearGradient from "react-native-linear-gradient";
// import EffectsConfig, { BeautyItem } from "../../zegodata/EffectsConfig";
// import Icon from "react-native-vector-icons/MaterialIcons";

// const { width } = Dimensions.get("window");

// const BeautyPanel: React.FC<{
//   onSelected: (groupItem: BeautyItem, beautyItem: BeautyItem) => void;
//   onSliderEnd: (
//     groupItem: BeautyItem,
//     beautyItem: BeautyItem,
//     currentIntensity: number
//   ) => void;
// }> = ({ onSelected, onSliderEnd }) => {
//   const [activeTab, setActiveTab] = useState(0);
//   const [selectedEffect, setSelectedEffect] = useState<BeautyItem | null>(null);
//   const [selectedSubEffect, setSelectedSubEffect] = useState<BeautyItem | null>(null);
//   const [selectedThirdEffect, setSelectedThirdEffect] = useState<BeautyItem | null>(null);
//   const [sliderValue, setSliderValue] = useState(0);
//   const fadeAnim = new Animated.Value(0);

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const renderTab = useCallback(
//     (item: BeautyItem, index: number) => {
//       const isActive = activeTab === index;
//       return (
//         <TouchableOpacity
//           key={item.name}
//           style={[styles.tab, isActive && styles.activeTab]}
//           onPress={() => {
//             setActiveTab(index);
//             setSelectedEffect(null);
//             setSelectedSubEffect(null);
//             setSelectedThirdEffect(null);
//             setSliderValue(0);
//           }}
//           accessibilityLabel={item.name}
//         >
//           <Text style={[styles.tabText, isActive && styles.activeTabText]}>
//             {item.name}
//           </Text>
//         </TouchableOpacity>
//       );
//     },
//     [activeTab]
//   );

//   const renderEffectItem = useCallback(
//     (item: BeautyItem, index: number) => {
//       const isSelected = selectedEffect?.type === item.type;
//       return (
//         <TouchableOpacity
//           key={item.type}
//           style={[styles.effectItem, isSelected && styles.selectedEffectItem]}
//           onPress={() => {
//             setSelectedEffect(item);
//             setSelectedSubEffect(null);
//             setSelectedThirdEffect(null);
//             setSliderValue(item.intensity ?? 0);
//             if (EffectsConfig[activeTab]) {
//               onSelected(EffectsConfig[activeTab], item);
//             }
//           }}
//           accessibilityLabel={item.name}
//         >
//           <Icon
//             name={getIconForEffect(item.type)}
//             size={28}
//             color={isSelected ? "#fff" : "#666"}
//           />
//           <Text style={[styles.effectText, isSelected && styles.selectedEffectText]}>
//             {item.name}
//           </Text>
//         </TouchableOpacity>
//       );
//     },
//     [activeTab, selectedEffect, onSelected]
//   );

//   const renderSubEffectItem = useCallback(
//     (item: BeautyItem, index: number) => {
//       const isSelected = selectedSubEffect?.type === item.type;
//       return (
//         <TouchableOpacity
//           key={item.type}
//           style={[styles.subEffectItem, isSelected && styles.selectedSubEffectItem]}
//           onPress={() => {
//             setSelectedSubEffect(item);
//             setSelectedThirdEffect(null);
//             setSliderValue(item.intensity ?? selectedEffect?.intensity ?? 0);
//             if (selectedEffect) {
//               onSelected(selectedEffect, item);
//             }
//           }}
//           accessibilityLabel={item.name}
//         >
//           <Text style={[styles.subEffectText, isSelected && styles.selectedSubEffectText]}>
//             {item.name}
//           </Text>
//         </TouchableOpacity>
//       );
//     },
//     [selectedEffect, selectedSubEffect, onSelected]
//   );

//   const renderThirdEffectItem = useCallback(
//     (item: BeautyItem, index: number) => {
//       const isSelected = selectedThirdEffect?.type === item.type;
//       return (
//         <TouchableOpacity
//           key={item.type}
//           style={[styles.thirdEffectItem, isSelected && styles.selectedThirdEffectItem]}
//           onPress={() => {
//             setSelectedThirdEffect(item);
//             setSliderValue(item.intensity ?? selectedSubEffect?.intensity ?? selectedEffect?.intensity ?? 0);
//             if (selectedSubEffect) {
//               onSelected(selectedSubEffect, item);
//             }
//           }}
//           accessibilityLabel={item.name}
//         >
//           <Text style={[styles.thirdEffectText, isSelected && styles.selectedThirdEffectText]}>
//             {item.name}
//           </Text>
//         </TouchableOpacity>
//       );
//     },
//     [selectedSubEffect, selectedThirdEffect, onSelected]
//   );

//   const getIconForEffect = (type: string) => {
//     switch (type) {
//       case "Beauty_Face": return "face";
//       case "Beauty_RemoveAce": return "healing";
//       case "Beauty_Clarity": return "lens";
//       case "Skin_Color": return "colorize";
//       case "Face_Whitening": return "brightness-5";
//       case "Rosy": return "brush";
//       case "Sharpen": return "sharpness";
//       case "Teeth_Whitening": return "health-and-safety";
//       case "Eye_Bright": return "visibility";
//       case "Naso_Fold_Erase": return "auto-fix";
//       case "Dark_Circle_Erase": return "face-retouching-off";
//       case "Face_Lifting": return "portrait";
//       case "Facial_Small_Mouth": return "face-2";
//       case "Facial_Long_Chin": return "face-3";
//       case "Big_Eyes": return "visibility";
//       case "Facial_Thin_Nose": return "face-4";
//       case "Facial_Stretch_ForeHead": return "face-5";
//       case "Facial_Thin_Jaw": return "face-6";
//       case "Facial_Thin_Cheek": return "face-retouching-natural";
//       case "Facial_Small_Face": return "face-retouching-off";
//       case "Facial_Long_Nose": return "face-3";
//       case "Makeup_Lipstick": return "brush";
//       case "Makeup_Blusher": return "palette";
//       case "Makeup_Eyeball": return "circle";
//       case "Makeup_Eyeshadow": return "color-lens";
//       case "Makeup_Eyeliner": return "edit";
//       case "Makeup_Eyelash": return "filter-vintage";
//       case "Makeup_Total": return "style";
//       case "Colorful_Style": return "filter";
//       case "ChromaKey": return "videocam";
//       case "Background": return "image";
//       case "Background_Mosaic": return "grid-on";
//       case "Background_Blur": return "blur-on";
//       default: return "tune";
//     }
//   };

//   return (
//     <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
//       <LinearGradient
//         colors={["#ffffff", "#f0f2f5"]}
//         style={styles.gradientBackground}
//       >
//         {/* Tabs */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.tabContainer}
//         >
//           {EffectsConfig.map((item, index) => renderTab(item, index))}
//         </ScrollView>

//         {/* Effects List (Horizontal) */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.effectsContainer}
//         >
//           {EffectsConfig[activeTab]?.items?.map((item, index) =>
//             renderEffectItem(item, index)
//           )}
//         </ScrollView>

//         {/* Sub-effects (Horizontal) */}
//         {selectedEffect?.items && (
//           <View style={styles.subEffectsWrapper}>
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               style={styles.subEffectsContainer}
//             >
//               {selectedEffect.items.map((item, index) =>
//                 renderSubEffectItem(item, index)
//               )}
//             </ScrollView>

//             {/* Third-level effects (Horizontal, Absolute) */}
//             {selectedSubEffect?.items && (
//               <View style={styles.thirdEffectsContainer}>
//                 <TouchableOpacity
//                   style={styles.closeButton}
//                   onPress={() => setSelectedThirdEffect(null)}
//                   accessibilityLabel="Close third-level options"
//                 >
//                   <Icon name="close" size={20} color="#fff" />
//                 </TouchableOpacity>
//                 <ScrollView
//                   horizontal
//                   showsHorizontalScrollIndicator={false}
//                   style={styles.thirdEffectsScroll}
//                 >
//                   {selectedSubEffect.items.map((item, index) =>
//                     renderThirdEffectItem(item, index)
//                   )}
//                 </ScrollView>
//               </View>
//             )}
//           </View>
//         )}

//         {/* Slider */}
//         {(selectedEffect || selectedSubEffect || selectedThirdEffect) && (
//           <View style={styles.sliderContainer}>
//             <Text style={styles.sliderLabel}>
//               Intensity: {Math.round(sliderValue)}%
//             </Text>
//             <Slider
//               style={styles.slider}
//               minimumValue={selectedEffect?.range?.[0] ?? 0}
//               maximumValue={selectedEffect?.range?.[1] ?? 100}
//               step={1}
//               value={sliderValue}
//               minimumTrackTintColor="#6200ee"
//               maximumTrackTintColor="#ccc"
//               thumbTintColor="#6200ee"
//               onValueChange={(value) => {
//                 setSliderValue(value);
//                 if (selectedEffect) {
//                   selectedEffect.intensity = value;
//                 }
//                 if (selectedSubEffect) {
//                   selectedSubEffect.intensity = value;
//                 }
//                 if (selectedThirdEffect) {
//                   selectedThirdEffect.intensity = value;
//                 }
//               }}
//               onSlidingComplete={() => {
//                 if (EffectsConfig[activeTab] && selectedEffect) {
//                   if (selectedThirdEffect && selectedSubEffect) {
//                     onSliderEnd(selectedSubEffect, selectedThirdEffect, sliderValue);
//                   } else if (selectedSubEffect) {
//                     onSliderEnd(selectedEffect, selectedSubEffect, sliderValue);
//                   } else {
//                     onSliderEnd(EffectsConfig[activeTab], selectedEffect, sliderValue);
//                   }
//                 }
//               }}
//               accessibilityLabel="Intensity Slider"
//             />
//           </View>
//         )}
//       </LinearGradient>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   gradientBackground: {
//     flex: 1,
//     padding: 10,
//   },
//   tabContainer: {
//     maxHeight: 50,
//     marginBottom: 10,
//   },
//   tab: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     marginRight: 10,
//     borderRadius: 20,
//     backgroundColor: "#f0f0f0",
//   },
//   activeTab: {
//     backgroundColor: "#6200ee",
//   },
//   tabText: {
//     color: "#333",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   activeTabText: {
//     color: "#fff",
//   },
//   effectsContainer: {
//     maxHeight: 100,
//     marginVertical: 10,
//   },
//   effectItem: {
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 10,
//     marginRight: 10,
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     minWidth: 80,
//     maxWidth: 120,
//   },
//   selectedEffectItem: {
//     backgroundColor: "#6200ee",
//   },
//   effectText: {
//     marginTop: 8,
//     fontSize: 14,
//     color: "#333",
//     textAlign: "center",
//   },
//   selectedEffectText: {
//     color: "#fff",
//   },
//   subEffectsWrapper: {
//     position: "relative",
//   },
//   subEffectsContainer: {
//     maxHeight: 50,
//     marginVertical: 10,
//   },
//   subEffectItem: {
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     marginRight: 10,
//     borderRadius: 15,
//     backgroundColor: "#f0f0f0",
//   },
//   selectedSubEffectItem: {
//     backgroundColor: "#bb86fc",
//   },
//   subEffectText: {
//     color: "#333",
//     fontSize: 14,
//   },
//   selectedSubEffectText: {
//     color: "#fff",
//   },
//   thirdEffectsContainer: {
//     position: "absolute",
//     top: -60, // Position above subEffectsContainer
//     left: 0,
//     right: 0,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(255, 255, 255, 0.95)",
//     borderRadius: 15,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   thirdEffectsScroll: {
//     maxHeight: 50,
//   },
//   thirdEffectItem: {
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     marginRight: 10,
//     borderRadius: 15,
//     backgroundColor: "#e0e0e0",
//   },
//   selectedThirdEffectItem: {
//     backgroundColor: "#03dac6",
//   },
//   thirdEffectText: {
//     color: "#333",
//     fontSize: 14,
//   },
//   selectedThirdEffectText: {
//     color: "#fff",
//   },
//   closeButton: {
//     padding: 5,
//     marginRight: 10,
//     backgroundColor: "#ff1744",
//     borderRadius: 12,
//   },
//   sliderContainer: {
//     padding: 15,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     elevation: 2,
//     marginTop: 10,
//   },
//   sliderLabel: {
//     fontSize: 14,
//     color: "#333",
//     marginBottom: 10,
//     fontWeight: "600",
//   },
//   slider: {
//     width: width - 50,
//     height: 40,
//   },
// });

// export default React.memo(BeautyPanel);





// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Animated,
//   Dimensions,
//   StatusBar,
//   Platform,
// } from "react-native";
// import Slider from "@react-native-community/slider";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import EffectsConfig, { BeautyItem } from "../../zegodata/EffectsConfig";
// import customColors from "@/constants/styles";

// const { width } = Dimensions.get("window");

// interface PanelState {
//   activeTab: number;
//   selectedEffect: BeautyItem | null;
//   selectedSubEffect: BeautyItem | null;
//   selectedThirdEffect: BeautyItem | null;
//   sliderValue: number;
// }

// const BeautyPanel: React.FC<{
//   onSelected: (groupItem: BeautyItem, beautyItem: BeautyItem) => void;
//   onSliderEnd: (
//     groupItem: BeautyItem,
//     beautyItem: BeautyItem,
//     currentIntensity: number
//   ) => void;
// }> = ({ onSelected, onSliderEnd }) => {
//   const [panelState, setPanelState] = useState<PanelState>({
//     activeTab: 0,
//     selectedEffect: null,
//     selectedSubEffect: null,
//     selectedThirdEffect: null,
//     sliderValue: 0,
//   });

//   const updatePanelState = useCallback((updates: Partial<PanelState>) => {
//     setPanelState((prev) => ({ ...prev, ...updates }));
//   }, []);

//   const { activeTab, selectedEffect, selectedSubEffect, selectedThirdEffect, sliderValue } = panelState;

//   // Animations
//   const fadeAnim = useMemo(() => new Animated.Value(0), []);
//   const slideAnim = useMemo(() => new Animated.Value(300), []);

//   useEffect(() => {
//     Animated.parallel([
//       Animated.spring(fadeAnim, {
//         toValue: 1,
//         useNativeDriver: true,
//       }),
//       Animated.spring(slideAnim, {
//         toValue: 0,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [fadeAnim, slideAnim]);

//   const effectsAnim = useMemo(() => new Animated.Value(1), []);
//   const lastActiveTab = React.useRef(activeTab);

//   useEffect(() => {
//     if (lastActiveTab.current !== activeTab) {
//       Animated.timing(effectsAnim, {
//         toValue: 0,
//         duration: 100,
//         useNativeDriver: true,
//       }).start(() => {
//         Animated.timing(effectsAnim, {
//           toValue: 1,
//           duration: 150,
//           useNativeDriver: true,
//         }).start();
//       });
//       lastActiveTab.current = activeTab;
//     }
//   }, [activeTab, effectsAnim]);

//   const getIconForEffect = useCallback((type: string) => {
//     return "tune"; // Simplified for example
//   }, []);

//   const renderTab = useCallback(
//     (item: BeautyItem, index: number) => {
//       const isActive = activeTab === index;
//       return (
//         <TouchableOpacity
//           key={item.name}
//           style={[styles.tab, isActive && styles.activeTab]}
//           onPress={() =>
//             updatePanelState({
//               activeTab: index,
//               selectedEffect: null,
//               selectedSubEffect: null,
//               selectedThirdEffect: null,
//               sliderValue: 0,
//             })
//           }
//           accessibilityLabel={item.name}
//           activeOpacity={0.7}
//         >
//           <Text style={[styles.tabText, isActive && styles.activeTabText]}>
//             {item.name}
//           </Text>
//           {isActive && <View style={styles.activeTabIndicator} />}
//         </TouchableOpacity>
//       );
//     },
//     [activeTab, updatePanelState]
//   );

//   const EffectItem = React.memo(
//     ({ item, index, isSelected, onPress, getIconForEffect }: any) => (
//       <TouchableOpacity
//         key={item.type}
//         style={[styles.effectItem]}
//         onPress={onPress}
//         accessibilityLabel={item.name}
//         activeOpacity={0.7}
//       >
//         <View
//           style={{
//             borderColor: isSelected ? customColors.accent : customColors.white,
//             borderRadius: 100,
//             borderWidth: 2,
//             width: 35,
//             height: 35,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Icon
//             name={getIconForEffect(item.type)}
//             size={25}
//             color={isSelected ? "#fff" : customColors.gray300}
//           />
//         </View>
//         <Text style={[styles.effectText, isSelected && styles.selectedEffectText]}>
//           {item.name}
//         </Text>
//       </TouchableOpacity>
//     )
//   );

//   const SubEffectItem = React.memo(
//     ({ item, index, isSelected, onPress, getIconForEffect }: any) => (
//       <TouchableOpacity
//         key={item.type}
//         style={[styles.subEffectItem, isSelected && styles.selectedSubEffectItem]}
//         onPress={onPress}
//         accessibilityLabel={item.name}
//         activeOpacity={0.7}
//       >
//         <Icon
//           name={getIconForEffect(item.type)}
//           size={16}
//           color={isSelected ? "#fff" : "#444"}
//         />
//         <Text style={[styles.subEffectText, isSelected && styles.selectedSubEffectText]}>
//           {item.name}
//         </Text>
//       </TouchableOpacity>
//     )
//   );

//   const ThirdEffectItem = React.memo(
//     ({ item, index, isSelected, onPress, getIconForEffect }: any) => (
//       <TouchableOpacity
//         key={item.type}
//         style={[styles.thirdEffectItem, isSelected && styles.selectedThirdEffectItem]}
//         onPress={onPress}
//         accessibilityLabel={item.name}
//         activeOpacity={0.7}
//       >
//         <Icon
//           name={getIconForEffect(item.type)}
//           size={16}
//           color={isSelected ? "#fff" : "#444"}
//         />
//         <Text style={[styles.thirdEffectText, isSelected && styles.selectedThirdEffectText]}>
//           {item.name}
//         </Text>
//       </TouchableOpacity>
//     )
//   );

//   const renderEffectItem = useCallback(
//     (item: BeautyItem, index: number) => {
//       const isSelected = selectedEffect?.type === item.type;
//       return (
//         <EffectItem
//           item={item}
//           index={index}
//           isSelected={isSelected}
//           onPress={() => {
//             updatePanelState({
//               selectedEffect: item,
//               selectedSubEffect: null,
//               selectedThirdEffect: null,
//               sliderValue: item.intensity ?? 0,
//             });
//             if (EffectsConfig[activeTab]) {
//               onSelected(EffectsConfig[activeTab], item);
//             }
//           }}
//           getIconForEffect={getIconForEffect}
//         />
//       );
//     },
//     [activeTab, selectedEffect, onSelected, getIconForEffect, updatePanelState]
//   );

//   const renderSubEffectItem = useCallback(
//     (item: BeautyItem, index: number) => {
//       const isSelected = selectedSubEffect?.type === item.type;
//       return (
//         <SubEffectItem
//           item={item}
//           index={index}
//           isSelected={isSelected}
//           onPress={() => {
//             updatePanelState({
//               selectedSubEffect: item,
//               selectedThirdEffect: null,
//               sliderValue: item.intensity ?? selectedEffect?.intensity ?? 0,
//             });
//             if (selectedEffect) {
//               onSelected(selectedEffect, item);
//             }
//           }}
//           getIconForEffect={getIconForEffect}
//         />
//       );
//     },
//     [selectedEffect, selectedSubEffect, onSelected, getIconForEffect, updatePanelState]
//   );

//   const renderThirdEffectItem = useCallback(
//     (item: BeautyItem, index: number) => {
//       const isSelected = selectedThirdEffect?.type === item.type;
//       return (
//         <ThirdEffectItem
//           item={item}
//           index={index}
//           isSelected={isSelected}
//           onPress={() => {
//             updatePanelState({
//               selectedThirdEffect: item,
//               sliderValue:
//                 item.intensity ??
//                 selectedSubEffect?.intensity ??
//                 selectedEffect?.intensity ??
//                 0,
//             });
//             if (selectedSubEffect) {
//               onSelected(selectedSubEffect, item);
//             }
//           }}
//           getIconForEffect={getIconForEffect}
//         />
//       );
//     },
//     [selectedSubEffect, selectedThirdEffect, onSelected, getIconForEffect, updatePanelState]
//   );

//   return (
//     <View style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
//       {(selectedEffect || selectedSubEffect || selectedThirdEffect) && (
//         <View style={styles.sliderContainer}>
//           <View style={styles.sliderLabelContainer}>
//             <Text style={styles.sliderLabel}>Intensity</Text>
//             <Text style={styles.sliderValue}>{Math.round(sliderValue)}%</Text>
//           </View>
//           <Slider
//             style={styles.slider}
//             minimumValue={selectedEffect?.range?.[0] ?? 0}
//             maximumValue={selectedEffect?.range?.[1] ?? 100}
//             step={1}
//             value={sliderValue}
//             minimumTrackTintColor="#5271ff"
//             maximumTrackTintColor="#e0e0e0"
//             thumbTintColor="#5271ff"
//             onValueChange={(value) => {
//               updatePanelState({ sliderValue: value });
//               if (selectedEffect) selectedEffect.intensity = value;
//               if (selectedSubEffect) selectedSubEffect.intensity = value;
//               if (selectedThirdEffect) selectedThirdEffect.intensity = value;
//             }}
//             onSlidingComplete={() => {
//               if (EffectsConfig[activeTab] && selectedEffect) {
//                 if (selectedThirdEffect && selectedSubEffect) {
//                   onSliderEnd(selectedSubEffect, selectedThirdEffect, sliderValue);
//                 } else if (selectedSubEffect) {
//                   onSliderEnd(selectedEffect, selectedSubEffect, sliderValue);
//                 } else {
//                   onSliderEnd(EffectsConfig[activeTab], selectedEffect, sliderValue);
//                 }
//               }
//             }}
//             accessibilityLabel="Intensity Slider"
//           />
//         </View>
//       )}
//       <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
//         <View style={styles.contentWrapper}>
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={styles.tabContainer}
//             contentContainerStyle={styles.tabContentContainer}
//           >
//             {EffectsConfig.map(renderTab)}
//           </ScrollView>
//           <Animated.View style={{ opacity: effectsAnim }}>
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               style={styles.effectsContainer}
//               contentContainerStyle={styles.effectsContentContainer}
//             >
//               {EffectsConfig[activeTab]?.items?.map(renderEffectItem)}
//             </ScrollView>
//           </Animated.View>
//           {selectedEffect?.items && (
//             <View style={styles.subEffectsOverlay}>
//               <View style={styles.subEffectsWrapper}>
//                 <ScrollView
//                   horizontal
//                   showsHorizontalScrollIndicator={false}
//                   style={styles.subEffectsContainer}
//                   contentContainerStyle={styles.subEffectsContentContainer}
//                 >
//                   {selectedEffect.items.map(renderSubEffectItem)}
//                 </ScrollView>
//                 {selectedSubEffect?.items && (
//                   <View>
//                     <View style={styles.thirdEffectsHeader}>
//                       <Text style={styles.thirdEffectsTitle}>Options</Text>
//                       <TouchableOpacity
//                         style={styles.closeButton}
//                         onPress={() => updatePanelState({ selectedThirdEffect: null })}
//                         accessibilityLabel="Close third-level options"
//                       >
//                         <Icon name="close" size={20} color="#fff" />
//                       </TouchableOpacity>
//                     </View>
//                     <ScrollView
//                       horizontal
//                       showsHorizontalScrollIndicator={false}
//                       style={styles.thirdEffectsScroll}
//                       contentContainerStyle={styles.thirdEffectsContentContainer}
//                     >
//                       {selectedSubEffect.items.map(renderThirdEffectItem)}
//                     </ScrollView>
//                   </View>
//                 )}
//               </View>
//             </View>
//           )}
//         </View>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "transparent",
//     justifyContent: "flex-end",
//   },
//   container: {
//     height: 130,
//     backgroundColor: "rgba(5,5,5,0.9)",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     overflow: "hidden",
//   },
//   contentWrapper: {
//     paddingTop: 10,
//     paddingBottom: Platform.OS === "ios" ? 20 : 10,
//   },
//   tabContainer: {
//     maxHeight: 30,
//   },
//   tabContentContainer: {
//     paddingHorizontal: 10,
//   },
//   tab: {
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//     marginRight: 10,
//     borderRadius: 15,
//     backgroundColor: "#f0f2f5",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   activeTab: {
//     backgroundColor: "#5271ff",
//   },
//   activeTabIndicator: {
//     position: "absolute",
//     bottom: -4,
//     width: 6,
//     height: 2,
//     backgroundColor: "#5271ff",
//     borderRadius: 1,
//   },
//   tabText: {
//     color: "#444",
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   activeTabText: {
//     color: "#fff",
//   },
//   effectsContainer: {
//     maxHeight: 80,
//   },
//   effectsContentContainer: {
//     paddingHorizontal: 10,
//   },
//   effectItem: {
//     flexDirection: "column",
//     alignItems: "center",
//     padding: 10,
//     marginRight: 10,
//     borderRadius: 10,
//     minWidth: 80,
//     maxWidth: 100,
//     gap: 2,
//   },
//   effectText: {
//     fontSize: 10,
//     color: customColors.gray300,
//     textAlign: "center",
//     fontWeight: "700",
//   },
//   selectedEffectText: {
//     color: "#fff",
//   },
//   subEffectsOverlay: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: width * 0.7,
//     backgroundColor: "rgba(5,5,5,0.9)",
//     borderTopLeftRadius: 20,
//     borderBottomLeftRadius: 20,
//     overflow: "hidden",
//   },
//   subEffectsWrapper: {},
//   subEffectsContainer: {
//     maxHeight: 40,
//     marginVertical: 5,
//   },
//   subEffectsContentContainer: {
//     paddingHorizontal: 10,
//   },
//   subEffectItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     marginRight: 8,
//     borderRadius: 15,
//     backgroundColor: "#f0f2f5",
//   },
//   selectedSubEffectItem: {
//     backgroundColor: "#7e8eff",
//   },
//   subEffectText: {
//     color: "#444",
//     fontSize: 12,
//   },
//   selectedSubEffectText: {
//     color: "#fff",
//   },
//   thirdEffectsHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 5,
//     paddingHorizontal: 5,
//   },
//   thirdEffectsTitle: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#fff",
//   },
//   thirdEffectsScroll: {
//     maxHeight: 40,
//   },
//   thirdEffectsContentContainer: {
//     paddingHorizontal: 5,
//     alignItems: "center",
//   },
//   thirdEffectItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     marginRight: 8,
//     borderRadius: 15,
//     backgroundColor: "#e0e0e0",
//   },
//   selectedThirdEffectItem: {
//     backgroundColor: "#a4b0ff",
//   },
//   thirdEffectText: {
//     color: "#444",
//     fontSize: 12,
//   },
//   selectedThirdEffectText: {
//     color: "#fff",
//   },
//   closeButton: {
//     padding: 6,
//     backgroundColor: "#ff3b5c",
//     borderRadius: 12,
//   },
//   sliderContainer: {
//     padding: 12,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     marginHorizontal: 10,
//     marginBottom: 10,
//     alignSelf: "center",
//     width: "95%",
//   },
//   sliderLabelContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   sliderLabel: {
//     fontSize: 14,
//     color: "#333",
//     fontWeight: "600",
//   },
//   sliderValue: {
//     fontSize: 14,
//     color: "#5271ff",
//     fontWeight: "600",
//   },
//   slider: {
//     width: "100%",
//     height: 30,
//   },
// });

// export default React.memo(BeautyPanel);


///this is working fine perfectly 

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Animated,
//   Dimensions,
//   StatusBar,
//   Platform,
// } from "react-native";
// import Slider from "@react-native-community/slider";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import EffectsConfig, { BeautyItem } from "../../zegodata/EffectsConfig";
// import customColors from "@/constants/styles";
// import LinnerGradientCard from "../common/gradientCards/LinnearGradientCard";
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
// const { width } = Dimensions.get("window");

// interface PanelState {
//   activeTab: number;
//   selectedEffect: BeautyItem | null;
//   selectedSubEffect: BeautyItem | null;
//   selectedThirdEffect: BeautyItem | null;
//   sliderValue: number;
// }

// const BeautyPanel: React.FC<{
//   onSelected: (groupItem: BeautyItem, beautyItem: BeautyItem) => void;
//   onSliderEnd: (
//     groupItem: BeautyItem,
//     beautyItem: BeautyItem,
//     currentIntensity: number
//   ) => void;
// }> = ({ onSelected, onSliderEnd }) => {
//   const [panelState, setPanelState] = useState<PanelState>({
//     activeTab: 0,
//     selectedEffect: null,
//     selectedSubEffect: null,
//     selectedThirdEffect: null,
//     sliderValue: 0,
//   });
//   const [expanded, setExpanded] = useState(false);
//   const subEffectWidth = useSharedValue(width * 0.2); // Initial height

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       width: withTiming(subEffectWidth.value, { duration: 300 }),
//     };
//   });

//   console.log(animatedStyle)

//   const toggleSubEffectWidth = () => {
//     setExpanded(!expanded);
//     subEffectWidth.value = expanded ? width * 0.1 : width * 0.8; // Toggle between 100 and 200
//   };

//   const updatePanelState = useCallback((updates: Partial<PanelState>) => {
//     setPanelState((prev) => ({ ...prev, ...updates }));
//   }, []);

//   const { activeTab, selectedEffect, selectedSubEffect, selectedThirdEffect, sliderValue } = panelState;

//   // Animations for panel
//   const fadeAnim = useMemo(() => new Animated.Value(0), []);
//   const slideAnim = useMemo(() => new Animated.Value(300), []);

//   // Underline animation for tabs
//   const underlineAnim = useMemo(() => new Animated.Value(0), []);

//   useEffect(() => {
//     Animated.parallel([
//       Animated.spring(fadeAnim, {
//         toValue: 1,
//         useNativeDriver: true,
//       }),
//       Animated.spring(slideAnim, {
//         toValue: 0,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [fadeAnim, slideAnim]);

//   useEffect(() => {
//     // Animate underline when activeTab changes
//     Animated.spring(underlineAnim, {
//       toValue: activeTab,
//       useNativeDriver: false, // translateX doesn't support useNativeDriver in some cases
//     }).start();
//   }, [activeTab, underlineAnim]);

//   const effectsAnim = useMemo(() => new Animated.Value(1), []);
//   const lastActiveTab = React.useRef(activeTab);

//   useEffect(() => {
//     if (lastActiveTab.current !== activeTab) {
//       Animated.timing(effectsAnim, {
//         toValue: 0,
//         duration: 100,
//         useNativeDriver: true,
//       }).start(() => {
//         Animated.timing(effectsAnim, {
//           toValue: 1,
//           duration: 150,
//           useNativeDriver: true,
//         }).start();
//       });
//       lastActiveTab.current = activeTab;
//     }
//   }, [activeTab, effectsAnim]);

//   const getIconForEffect = useCallback((type: string) => {
//     return "tune";
//   }, []);

//   const renderTab = useCallback(
//     (item: BeautyItem, index: number) => {
//       const isActive = activeTab === index;
//       const underlineWidth = underlineAnim.interpolate({
//         inputRange: EffectsConfig.map((_, i) => i),
//         outputRange: EffectsConfig.map((_, i) => (i === index ? 20 : 0)),
//       });

//       return (
//         <TouchableOpacity
//           key={item.name}
//           style={[styles.tab, isActive && styles.activeTab]}
//           onPress={() =>
//             updatePanelState({
//               activeTab: index,
//               selectedEffect: null,
//               selectedSubEffect: null,
//               selectedThirdEffect: null,
//               sliderValue: 0,
//             })
//           }
//           accessibilityLabel={item.name}
//           activeOpacity={0.7}
//         >
//           <Text style={[styles.tabText, isActive && styles.activeTabText]}>
//             {item.name}
//           </Text>
//           <Animated.View
//             style={[
//               styles.activeTabIndicator,
//               isActive && { width: underlineWidth },
//             ]}
//           />
//         </TouchableOpacity>
//       );
//     },
//     [activeTab, updatePanelState, underlineAnim]
//   );

//   const EffectItem = React.memo(
//     ({ item, index, isSelected, onPress, getIconForEffect }: any) => (
//       <TouchableOpacity
//         key={item.type}
//         style={[styles.effectItem]}
//         onPress={onPress}
//         accessibilityLabel={item.name}
//         activeOpacity={0.7}
//       >
//         <View
//           style={{
//             borderColor: isSelected ? customColors.accent : customColors.white,
//             borderRadius: 100,
//             borderWidth: 2,
//             width: 35,
//             height: 35,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Icon
//             name={getIconForEffect(item.type)}
//             size={25}
//             color={isSelected ? "#fff" : customColors.gray300}
//           />
//         </View>
//         <Text style={[styles.effectText, isSelected && styles.selectedEffectText]}>
//           {item.name}
//         </Text>
//       </TouchableOpacity>
//     )
//   );

//   const SubEffectItem = React.memo(
//     ({ item, index, isSelected, onPress, getIconForEffect }: any) => (
//       <TouchableOpacity
//         key={item.type}
//         style={[styles.effectItem]}
//         onPress={onPress}
//         accessibilityLabel={item.name}
//         activeOpacity={0.7}
//       >
//         <View
//           style={{
//             borderColor: isSelected ? customColors.accent : customColors.white,
//             borderRadius: 100,
//             borderWidth: 2,
//             width: 30,
//             height: 30,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Icon
//             name={getIconForEffect(item.type)}
//             size={20}
//             color={isSelected ? "#fff" : customColors.gray300}
//           />
//         </View>
//         <Text style={[styles.effectText, isSelected && styles.selectedEffectText]}>
//           {item.name}
//         </Text>
//       </TouchableOpacity>
//     )
//   );

//   const ThirdEffectItem = React.memo(
//     ({ item, index, isSelected, onPress, getIconForEffect }: any) => (
//       <TouchableOpacity
//         key={item.type}
//         style={[styles.thirdEffectItem, isSelected && styles.selectedThirdEffectItem]}
//         onPress={onPress}
//         accessibilityLabel={item.name}
//         activeOpacity={0.7}
//       >
//         <Icon
//           name={getIconForEffect(item.type)}
//           size={16}
//           color={isSelected ? "#fff" : "#444"}
//         />
//         <Text style={[styles.thirdEffectText, isSelected && styles.selectedThirdEffectText]}>
//           {item.name}
//         </Text>
//       </TouchableOpacity>
//     )
//   );

//   const renderEffectItem = useCallback(
//     (item: BeautyItem, index: number) => {
//       const isSelected = selectedEffect?.type === item.type;
//       return (
//         <EffectItem
//           item={item}
//           index={index}
//           isSelected={isSelected}
//           onPress={() => {
//             updatePanelState({
//               selectedEffect: item,
//               selectedSubEffect: null,
//               selectedThirdEffect: null,
//               sliderValue: item.intensity ?? 0,
//             });
//             if (EffectsConfig[activeTab]) {
//               onSelected(EffectsConfig[activeTab], item);
//             }
//           }}
//           getIconForEffect={getIconForEffect}
//         />
//       );
//     },
//     [activeTab, selectedEffect, onSelected, getIconForEffect, updatePanelState]
//   );

//   const renderSubEffectItem = useCallback(
//     (item: BeautyItem, index: number) => {
//       const isSelected = selectedSubEffect?.type === item.type;
//       return (
//         <SubEffectItem
//           item={item}
//           index={index}
//           isSelected={isSelected}
//           onPress={() => {
//             updatePanelState({
//               selectedSubEffect: item,
//               selectedThirdEffect: null,
//               sliderValue: item.intensity ?? selectedEffect?.intensity ?? 0,
//             });
//             if (selectedEffect) {
//               onSelected(selectedEffect, item);
//             }
//           }}
//           getIconForEffect={getIconForEffect}
//         />
//       );
//     },
//     [selectedEffect, selectedSubEffect, onSelected, getIconForEffect, updatePanelState]
//   );

//   const renderThirdEffectItem = useCallback(
//     (item: BeautyItem, index: number) => {
//       const isSelected = selectedThirdEffect?.type === item.type;
//       return (
//         <ThirdEffectItem
//           item={item}
//           index={index}
//           isSelected={isSelected}
//           onPress={() => {
//             updatePanelState({
//               selectedThirdEffect: item,
//               sliderValue:
//                 item.intensity ??
//                 selectedSubEffect?.intensity ??
//                 selectedEffect?.intensity ??
//                 0,
//             });
//             if (selectedSubEffect) {
//               onSelected(selectedSubEffect, item);
//             }
//           }}
//           getIconForEffect={getIconForEffect}
//         />
//       );
//     },
//     [selectedSubEffect, selectedThirdEffect, onSelected, getIconForEffect, updatePanelState]
//   );

//   return (
//     <View style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
//       {(selectedEffect || selectedSubEffect || selectedThirdEffect) && (
//         <View style={styles.sliderContainer}>
//           <View style={styles.sliderLabelContainer}>
//             <Text style={styles.sliderLabel}>Intensity</Text>
//             <Text style={styles.sliderValue}>{Math.round(sliderValue)}%</Text>
//           </View>
//           <Slider
//             style={styles.slider}
//             minimumValue={selectedEffect?.range?.[0] ?? 0}
//             maximumValue={selectedEffect?.range?.[1] ?? 100}
//             step={1}
//             value={sliderValue}
//             minimumTrackTintColor="#5271ff"
//             maximumTrackTintColor="#e0e0e0"
//             thumbTintColor="#5271ff"
//             onValueChange={(value) => {
//               updatePanelState({ sliderValue: value });
//               if (selectedEffect) selectedEffect.intensity = value;
//               if (selectedSubEffect) selectedSubEffect.intensity = value;
//               if (selectedThirdEffect) selectedThirdEffect.intensity = value;
//             }}
//             onSlidingComplete={() => {
//               if (EffectsConfig[activeTab] && selectedEffect) {
//                 if (selectedThirdEffect && selectedSubEffect) {
//                   onSliderEnd(selectedSubEffect, selectedThirdEffect, sliderValue);
//                 } else if (selectedSubEffect) {
//                   onSliderEnd(selectedEffect, selectedSubEffect, sliderValue);
//                 } else {
//                   onSliderEnd(EffectsConfig[activeTab], selectedEffect, sliderValue);
//                 }
//               }
//             }}
//             accessibilityLabel="Intensity Slider"
//           />
//         </View>
//       )}
//       <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
//         <View style={styles.contentWrapper}>
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={styles.tabContainer}
//             contentContainerStyle={styles.tabContentContainer}
//           >
//             {EffectsConfig.map(renderTab)}
//           </ScrollView>
//           <Animated.View style={{ opacity: effectsAnim }}>
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               style={styles.effectsContainer}
//               contentContainerStyle={styles.effectsContentContainer}
//             >
//               {EffectsConfig[activeTab]?.items?.map(renderEffectItem)}
//             </ScrollView>
//           </Animated.View>
//           {selectedEffect?.items && (
//             <Animated.View style={[styles.subEffectsOverlay,animatedStyle]}>
//             <LinnerGradientCard customStyles={[]}>
//               <View style={styles.subEffectsWrapper}>
//                 <TouchableOpacity style={{}} onPress={toggleSubEffectWidth}>
//                   <Icon name="chevron-right" size={30} color="#fff" />
//                 </TouchableOpacity>
//                 <ScrollView
//                   horizontal
//                   showsHorizontalScrollIndicator={false}
//                   style={styles.subEffectsContainer}
//                   contentContainerStyle={styles.subEffectsContentContainer}
//                 >

//                   {selectedEffect.items.map(renderSubEffectItem)}
//                 </ScrollView>
//                 {selectedSubEffect?.items && (
//                   <View>
//                     <View style={styles.thirdEffectsHeader}>
//                       <Text style={styles.thirdEffectsTitle}>Options</Text>
//                       <TouchableOpacity
//                         style={styles.closeButton}
//                         onPress={() => updatePanelState({ selectedThirdEffect: null })}
//                         accessibilityLabel="Close third-level options"
//                       >
//                         <Icon name="close" size={20} color="#fff" />
//                       </TouchableOpacity>
//                     </View>
//                     <ScrollView
//                       horizontal
//                       showsHorizontalScrollIndicator={false}
//                       style={styles.thirdEffectsScroll}
//                       contentContainerStyle={styles.thirdEffectsContentContainer}
//                     >
//                       {selectedSubEffect.items.map(renderThirdEffectItem)}
//                     </ScrollView>
//                   </View>
//                 )}
//               </View>
//             </LinnerGradientCard>
//             </Animated.View>
//           )}
//         </View>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "transparent",
//     justifyContent: "flex-end",
//   },
//   container: {
//     height: 130,
//     backgroundColor: "rgba(5,5,5,0.9)",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     overflow: "hidden",
//   },
//   contentWrapper: {
//     paddingTop: 10,
//     paddingBottom: Platform.OS === "ios" ? 20 : 10,
//   },
//   tabContainer: {
//     maxHeight: 30,
//   },
//   tabContentContainer: {
//     paddingHorizontal: 10,
//   },
//   tab: {
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//     marginRight: 10,
//     borderRadius: 15,
//     backgroundColor: "#f0f2f5",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   activeTab: {
//     backgroundColor: "#5271ff",
//   },
//   activeTabIndicator: {
//     position: "absolute",
//     bottom: -4,
//     height: 2,
//     backgroundColor: "#5271ff",
//     borderRadius: 1,
//   },
//   tabText: {
//     color: "#444",
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   activeTabText: {
//     color: "#fff",
//   },
//   effectsContainer: {
//     maxHeight: 80,
//   },
//   effectsContentContainer: {
//     paddingHorizontal: 10,
//     marginTop: 14
//   },
//   effectItem: {
//     flexDirection: "column",
//     alignItems: "center",
//     padding: 4,
//     marginRight: 10,
//     borderRadius: 10,
//     minWidth: 80,
//     maxWidth: 100,
//     gap: 2,
//   },
//   effectText: {
//     fontSize: 10,
//     color: customColors.gray300,
//     textAlign: "center",
//     fontWeight: "700",
//   },
//   selectedEffectText: {
//     color: "#fff",
//   },
//   subEffectsOverlay: {
//     position: "absolute",
//     bottom: 6,
//     right: 0,
//     width:width*0.8,
//     // backgroundColor: "rgba(0, 0, 0,0.5)",
//     borderTopLeftRadius: 100,
//     borderBottomLeftRadius: 100,
//     overflow: "hidden",
//     paddingLeft: 10
//   },
//   subEffectsWrapper: {
//     alignItems: 'center',
//     flexDirection: 'row'
//   },
//   subEffectsContainer: {
//     // maxHeight: 100,
//     // marginVertical: 5,
//   },
//   subEffectsContentContainer: {
//     paddingHorizontal: 0,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   subEffectItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 2,
//     paddingHorizontal: 5,
//     marginRight: 6,
//     borderRadius: 15,
//     backgroundColor: "#f0f2f5",
//   },
//   selectedSubEffectItem: {
//     backgroundColor: "#7e8eff",
//   },
//   subEffectText: {
//     color: "#444",
//     fontSize: 8,
//   },
//   selectedSubEffectText: {
//     color: "#fff",
//   },
//   thirdEffectsHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 5,
//     paddingHorizontal: 5,
//   },
//   thirdEffectsTitle: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#fff",
//   },
//   thirdEffectsScroll: {
//     maxHeight: 40,
//   },
//   thirdEffectsContentContainer: {
//     paddingHorizontal: 5,
//     alignItems: "center",
//   },
//   thirdEffectItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     marginRight: 8,
//     borderRadius: 15,
//     backgroundColor: "#e0e0e0",
//   },
//   selectedThirdEffectItem: {
//     backgroundColor: "#a4b0ff",
//   },
//   thirdEffectText: {
//     color: "#444",
//     fontSize: 12,
//   },
//   selectedThirdEffectText: {
//     color: "#fff",
//   },
//   closeButton: {
//     padding: 6,
//     backgroundColor: "#ff3b5c",
//     borderRadius: 12,
//   },
//   sliderContainer: {
//     padding: 12,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     marginHorizontal: 10,
//     marginBottom: 10,
//     alignSelf: "center",
//     width: "95%",
//   },
//   sliderLabelContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   sliderLabel: {
//     fontSize: 14,
//     color: "#333",
//     fontWeight: "600",
//   },
//   sliderValue: {
//     fontSize: 14,
//     color: "#5271ff",
//     fontWeight: "600",
//   },
//   slider: {
//     width: "100%",
//     height: 30,
//   },
// });

// export default React.memo(BeautyPanel);

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
} from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/MaterialIcons";
import EffectsConfig, { BeautyItem } from "../../zegodata/EffectsConfig";
import customColors from "@/constants/styles";
import LinnerGradientCard from "../common/gradientCards/LinnearGradientCard";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Reanimated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const ReanimatedView = Reanimated.View;

interface PanelState {
  activeTab: number;
  selectedEffect: BeautyItem | null;
  selectedSubEffect: BeautyItem | null;
  selectedThirdEffect: BeautyItem | null;
  sliderValue: number;
}

const BeautyPanel: React.FC<{
  onSelected: (groupItem: BeautyItem, beautyItem: BeautyItem) => void;
  onSliderEnd: (
    groupItem: BeautyItem,
    beautyItem: BeautyItem,
    currentIntensity: number
  ) => void;
}> = ({ onSelected, onSliderEnd }) => {
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

  useEffect(()=>{
    subEffectWidth.value = expanded ? width * 0.9 : width * 0.1;
  },[expanded])

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
              onSelected(EffectsConfig[activeTab], item);
            }
            setExpanded(true)
          }}
          getIconForEffect={getIconForEffect}
        />
      );
    },
    [activeTab, selectedEffect, onSelected, getIconForEffect, updatePanelState]
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
              onSelected(selectedEffect, item);
            }
          }}
          getIconForEffect={getIconForEffect}
        />
      );
    },
    [selectedEffect, selectedSubEffect, onSelected, getIconForEffect, updatePanelState]
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
              onSelected(selectedSubEffect, item);
            }
          }}
          getIconForEffect={getIconForEffect}
        />
      );
    },
    [selectedSubEffect, selectedThirdEffect, onSelected, getIconForEffect, updatePanelState]
  );

  return (
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
                  onSliderEnd(selectedSubEffect, selectedThirdEffect, sliderValue);
                } else if (selectedSubEffect) {
                  onSliderEnd(selectedEffect, selectedSubEffect, sliderValue);
                } else {
                  onSliderEnd(EffectsConfig[activeTab], selectedEffect, sliderValue);
                }
              }
            }}
            accessibilityLabel="Intensity Slider"
          />
        </View>
      )}
      <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
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
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  container: {
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
  closeButton: {
    padding: 6,
    backgroundColor: "#ff3b5c",
    borderRadius: 12,
  },
  sliderContainer: {
    padding: 12,
    // backgroundColor: "#fff",
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

export default React.memo(BeautyPanel);