// import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// import debounce from 'lodash.debounce';
// import ZegoEffects, { ZegoEffectsBlusherType, ZegoEffectsColoredcontactsType, ZegoEffectsEyelashesType, ZegoEffectsEyelinerType, ZegoEffectsFilterType, ZegoEffectsLipstickType, ZegoEffectsMakeupType } from '@zegocloud/zego-effects-reactnative';
// import ZegoExpressEngine, { ZegoPublishChannel } from 'zego-express-engine-reactnative';

// export let effects: ZegoEffects | null = null;

// // Define interface types for each effect category
// interface BeautificationEffects {
//   skinToneEnhancement: number;
//   skinSmothing: number;
//   imageSharpening: number;
//   cheekBlusher: number;
//   removeNasolabialFolds: number;
//   removeDarkCircles: number;
//   removeAcneAndFreckles: number;
//   clarityEffects: number;
//   longChin: number;
// }

// interface ReshapeEffects {
//   faceSlim: number;
//   eyeEnlarge: number;
//   jawRefine: number;
//   bigEyes: number;
//   faceLifting: number;
//   smallMouth: number;
//   eyeBrightening: number;
//   noseSlimming: number;
//   teethWhitening: number;
//   longChin: number;
//   foreheadShortening: number;
//   mandibleSlimming: number;
//   cheekboneSlimming: number;
//   faceShortening: number;
//   noseLengthening: number;
// }

// interface FilterEffects {
//   filterType: string | ZegoEffectsFilterType;
//   filterIntensity: number;
// }

// interface EffectState {
//   beautification: BeautificationEffects;
//   reshape: ReshapeEffects;
//   filters: FilterEffects;
// }

// // Define context type
// interface ZegoEffectsContextType {
//   effectsState: EffectState;
//   updateBeautificationEffect: (key: keyof BeautificationEffects, value: number) => void;
//   updateReshapeEffect: (key: keyof ReshapeEffects, value: number) => void;
//   updateFilterEffect: (key: keyof FilterEffects, value: number | string) => void;
//   initializeEffects: (license: string) => Promise<void>;
//   clearBeautification: () => void;
//   clearReshape: () => void;
//   clearFilters: () => void;
//   resetAllEffects: () => void;
// }

// // Default values for each effect category
// const DEFAULT_BEAUTIFICATION: BeautificationEffects = {
//   skinToneEnhancement: 50,
//   skinSmothing: 50,
//   imageSharpening: 50,
//   cheekBlusher: 50,
//   removeNasolabialFolds: 50,
//   removeDarkCircles: 50,
//   removeAcneAndFreckles: 50,
//   clarityEffects: 50,
//   longChin: 50,
// };

// const DEFAULT_RESHAPE: ReshapeEffects = {
//   faceSlim: 0,
//   eyeEnlarge: 0,
//   jawRefine: 0,
//   bigEyes: 0,
//   faceLifting: 0,
//   smallMouth: 0,
//   eyeBrightening: 0,
//   noseSlimming: 0,
//   teethWhitening: 0,
//   longChin: 0,
//   foreheadShortening: 0,
//   mandibleSlimming: 0,
//   cheekboneSlimming: 0,
//   faceShortening: 0,
//   noseLengthening: 0,
// };

// const DEFAULT_FILTERS: FilterEffects = {
//   filterType: 'clear',
//   filterIntensity: 0,
// };

// const ZegoEffectsContext = createContext<ZegoEffectsContextType | undefined>(undefined);

// export const ZegoEffectsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [effectsState, setEffectsState] = useState<EffectState>({
//     beautification: DEFAULT_BEAUTIFICATION,
//     reshape: DEFAULT_RESHAPE,
//     filters: DEFAULT_FILTERS,
//   });

//   // Helper function to apply effects to Zego SDK
//   const applyZegoEffects = useCallback((eff: ZegoEffects, state: EffectState) => {
//     try {
//       const { beautification, reshape, filters } = state;

//       // Apply beautification effects
//       applyBeautificationEffects(eff, beautification);
      
//       // Apply reshape effects
//       applyReshapeEffects(eff, reshape);
      
//       // Apply filter effects
//       applyFilterEffects(eff, filters);
//     } catch (err) {
//       console.error('applyZegoEffects error:', err);
//     }
//   }, []);

//   // Separate functions for applying each category of effects
//   const applyBeautificationEffects = (eff: ZegoEffects, beautification: BeautificationEffects) => {
//     eff.enableWhiten(true);
//     eff.setWhitenParam({ intensity: beautification.skinToneEnhancement });

//     eff.enableSmooth(true);
//     eff.setSmoothParam({ intensity: beautification.skinSmothing });

//     eff.enableSharpen(true);
//     eff.setSharpenParam({ intensity: beautification.imageSharpening });

//     eff.enableRosy(true);
//     eff.setRosyParam({ intensity: beautification.cheekBlusher });

//     eff.enableWrinklesRemoving(true);
//     eff.setWrinklesRemovingParam({ intensity: beautification.removeNasolabialFolds });

//     eff.enableDarkCirclesRemoving(true);
//     eff.setDarkCirclesRemovingParam({ intensity: beautification.removeDarkCircles });

//     eff.enableAcneRemoving(true);
//     eff.setAcneRemovingParam({ intensity: beautification.removeAcneAndFreckles });

//     eff.enableClarity(true);
//     eff.setClarityParam({ intensity: beautification.clarityEffects });

//     eff.enableLongChin(true);
//     eff.setLongChinParam({ intensity: beautification.longChin });
//   };

//   const applyReshapeEffects = (eff: ZegoEffects, reshape: ReshapeEffects) => {
//     eff.enableBigEyes(true);
//     eff.setBigEyesParam({ intensity: reshape.bigEyes });

//     eff.enableFaceLifting(true);
//     eff.setFaceLiftingParam({ intensity: reshape.faceLifting });

//     eff.enableSmallMouth(true);
//     eff.setSmallMouthParam({ intensity: reshape.smallMouth });

//     eff.enableEyesBrightening(true);
//     eff.setEyesBrighteningParam({ intensity: reshape.eyeBrightening });

//     eff.enableNoseNarrowing(true);
//     eff.setNoseNarrowingParam({ intensity: reshape.noseSlimming });

//     eff.enableTeethWhitening(true);
//     eff.setTeethWhiteningParam({ intensity: reshape.teethWhitening });

//     eff.enableLongChin(true);
//     eff.setLongChinParam({ intensity: reshape.longChin });

//     eff.enableForeheadShortening(true);
//     eff.setForeheadShorteningParam({ intensity: reshape.foreheadShortening });

//     eff.enableMandibleSlimming(true);
//     eff.setMandibleSlimmingParam({ intensity: reshape.mandibleSlimming });

//     eff.enableCheekboneSlimming(true);
//     eff.setCheekboneSlimmingParam({ intensity: reshape.cheekboneSlimming });

//     eff.enableFaceShortening(true);
//     eff.setFaceShorteningParam({ intensity: reshape.faceShortening });

//     eff.enableNoseLengthening(true);
//     eff.setNoseLengtheningParam({ intensity: reshape.noseLengthening });
//   };

//   const applyFilterEffects = (eff: ZegoEffects, filters: FilterEffects) => {
//     if (filters.filterType !== 'clear') {
//       eff.setFilterParam({
//         intensity: filters.filterIntensity,
//         type: filters.filterType as ZegoEffectsFilterType,
//       });
//     } else {
//       eff.setFilterParam({
//         intensity: 0,
//         type: ZegoEffectsFilterType.Autumn,
//       });
//     }
//   };

//   const applyMakeupBluserdir = (eff: ZegoEffects, filters: MakeUpBlushEffect) => {
//     if (filters.filterType !== 'clear') {
//       eff.setBlusherParam({
//         intensity: filters.filterIntensity,
//         type: ZegoEffectsBlusherType.ApricotPink,
//       });
//     } else {
//       eff.setBlusherParam({
//         intensity: 0,
//         type: ZegoEffectsBlusherType.ApricotPink,
//       });
//     }
//   };
//   const applyMakeupColoredContact = (eff: ZegoEffects, filters: MakeUpColoredContactEffect) => {
//     if (filters.filterType !== 'clear') {
//       eff.setColoredcontactsParam({
//         intensity: filters.filterIntensity,
//         type: ZegoEffectsColoredcontactsType.ChocolateBrown,
//       });
//     } else {
//       eff.setColoredcontactsParam({
//         intensity: 0,
//         type: ZegoEffectsColoredcontactsType.ChocolateBrown,
//       });
//     }
//   };
//   const applyMakeUpEyelashes = (eff: ZegoEffects, filters: MakeUpEyelashesEffect) => {
//     if (filters.filterType !== 'clear') {
//       eff.setEyelashesParam({
//         intensity: filters.filterIntensity,
//         type: ZegoEffectsEyelashesType.Curl,
//       });
//     } else {
//       eff.setEyelashesParam({
//         intensity: 0,
//         type: ZegoEffectsEyelashesType.Curl,
//       });
//     }
//   };
//   const applyMakeUpEyeliner = (eff: ZegoEffects, filters: MakeUpEyelinerEffect) => {
//     if (filters.filterType !== 'clear') {
//       eff.setEyelinerParam({
//         intensity: filters.filterIntensity,
//         type: ZegoEffectsEyelinerType.CatEye,
//       });
//     } else {
//       eff.setEyelinerParam({
//         intensity: 0,
//         type: ZegoEffectsEyelinerType.CatEye,
//       });
//     }
//   };
//   const applyMakeUpLipstick = (eff: ZegoEffects, filters: MakeUpLipsticEffect) => {
//     if (filters.filterType !== 'clear') {
//       eff.setLipstickParam({
//         intensity: filters.filterIntensity,
//         type: ZegoEffectsLipstickType.CameoPink,
//       });
//     } else {
//       eff.setLipstickParam({
//         intensity: 0,
//         type: ZegoEffectsLipstickType.CameoPink,
//       });
//     }
//   };
//   const applyMakeUpMakeUp = (eff: ZegoEffects, filters: MakeUpMakeUpEffect) => {
//     if (filters.filterType !== 'clear') {
//       eff.setMakeupParam({
//         intensity: filters.filterIntensity,
//         type: ZegoEffectsMakeupType.CutieCool,
//       });
//     } else {
//       eff.setMakeupParam({
//         intensity: 0,
//         type: ZegoEffectsMakeupType.CutieCool,
//       });
//     }
//   };



//   // Initialize Zego Effects SDK
//   const initializeEffects = useCallback(
//     async (license: string) => {
//       try {
//         const engine = ZegoExpressEngine.instance();
//         await engine.enableCustomVideoProcessing(true, {}, ZegoPublishChannel.Main);

//         const eff = new ZegoEffects(license);
//         eff.enableImageProcessing(true);
//         applyZegoEffects(eff, effectsState);

//         eff.on('error', (code, desc) => {
//           console.error(`ZegoEffects error: ${code}, ${desc}`);
//         });

//         effects = eff;
//         console.log('ZegoEffects initialized');
//       } catch (err) {
//         console.error('Error initializing ZegoEffects:', err);
//       }
//     },
//     [applyZegoEffects, effectsState]
//   );

//   // Update handlers for each category
//   const updateBeautificationEffect = useCallback(
//     debounce((key: keyof BeautificationEffects, value: number) => {
//       setEffectsState((prev) => {
//         const newValue = Math.max(0, Math.min(100, value));
//         const updated = {
//           ...prev,
//           beautification: {
//             ...prev.beautification,
//             [key]: newValue,
//           },
//         };

//         if (effects) {
//           applyZegoEffects(effects, updated);
//         }

//         return updated;
//       });
//     }, 300),
//     []
//   );

//   const updateReshapeEffect = useCallback(
//     debounce((key: keyof ReshapeEffects, value: number) => {
//       setEffectsState((prev) => {
//         const newValue = Math.max(0, Math.min(100, value));
//         const updated = {
//           ...prev,
//           reshape: {
//             ...prev.reshape,
//             [key]: newValue,
//           },
//         };

//         if (effects) {
//           applyZegoEffects(effects, updated);
//         }

//         return updated;
//       });
//     }, 300),
//     []
//   );

//   const updateFilterEffect = useCallback(
//     debounce((key: keyof FilterEffects, value: number | string) => {
//       setEffectsState((prev) => {
//         const updated = {
//           ...prev,
//           filters: {
//             ...prev.filters,
//             [key]: typeof value === 'number' ? Math.max(0, Math.min(100, value)) : value,
//           },
//         };

//         if (effects) {
//           applyZegoEffects(effects, updated);
//         }

//         return updated;
//       });
//     }, 300),
//     []
//   );

//   // Reset functions for each category
//   const clearBeautification = useCallback(() => {
//     setEffectsState((prev) => {
//       const updated = {
//         ...prev,
//         beautification: DEFAULT_BEAUTIFICATION,
//       };
      
//       if (effects) {
//         applyZegoEffects(effects, updated);
//       }
      
//       return updated;
//     });
//   }, []);

//   const clearReshape = useCallback(() => {
//     setEffectsState((prev) => {
//       const updated = {
//         ...prev,
//         reshape: DEFAULT_RESHAPE,
//       };
      
//       if (effects) {
//         applyZegoEffects(effects, updated);
//       }
      
//       return updated;
//     });
//   }, []);

//   const clearFilters = useCallback(() => {
//     setEffectsState((prev) => {
//       const updated = {
//         ...prev,
//         filters: DEFAULT_FILTERS,
//       };
      
//       if (effects) {
//         applyZegoEffects(effects, updated);
//       }
      
//       return updated;
//     });
//   }, []);

//   const resetAllEffects = useCallback(() => {
//     const defaultState: EffectState = {
//       beautification: DEFAULT_BEAUTIFICATION,
//       reshape: DEFAULT_RESHAPE,
//       filters: DEFAULT_FILTERS,
//     };

//     setEffectsState(defaultState);
    
//     if (effects) {
//       applyZegoEffects(effects, defaultState);
//     }
//   }, [applyZegoEffects]);

//   return (
//     <ZegoEffectsContext.Provider
//       value={{
//         effectsState,
//         updateBeautificationEffect,
//         updateReshapeEffect,
//         updateFilterEffect,
//         initializeEffects,
//         clearBeautification,
//         clearReshape,
//         clearFilters,
//         resetAllEffects,
//       }}
//     >
//       {children}
//     </ZegoEffectsContext.Provider>
//   );
// };

// export const useZegoEffects = () => {
//   const context = useContext(ZegoEffectsContext);
//   if (!context) {
//     throw new Error('useZegoEffects must be used within a ZegoEffectsProvider');
//   }
//   return context;
// };

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import debounce from 'lodash.debounce';
import ZegoEffects, {
  ZegoEffectsBlusherType,
  ZegoEffectsColoredcontactsType,
  ZegoEffectsEyelashesType,
  ZegoEffectsEyelinerType,
  ZegoEffectsLipstickType,
  ZegoEffectsMakeupType,
  ZegoEffectsFilterType,
} from '@zegocloud/zego-effects-reactnative';
import ZegoExpressEngine, { ZegoPublishChannel } from 'zego-express-engine-reactnative';

export let effects: ZegoEffects | null = null;

// Define interfaces for each effect category
interface BeautificationEffects {
  skinToneEnhancement: number;
  skinSmothing: number;
  imageSharpening: number;
  cheekBlusher: number;
  removeNasolabialFolds: number;
  removeDarkCircles: number;
  removeAcneAndFreckles: number;
  clarityEffects: number;
  longChin: number;
}

interface ReshapeEffects {
  eyeBrightening: number;
  faceSlim: number;
  eyeEnlarge: number;
  jawRefine: number;
  bigEyes: number;
  faceLifting: number;
  smallMouth: number;
 shootBrightening: number;
  noseSlimming: number;
  teethWhitening: number;
  longChin: number;
  foreheadShortening: number;
  mandibleSlimming: number;
  cheekboneSlimming: number;
  faceShortening: number;
  noseLengthening: number;
}

interface FilterEffects {
  filterType: string | ZegoEffectsFilterType;
  filterIntensity: number;
}

interface BlusherEffect {
  filterType: string | ZegoEffectsBlusherType;
  filterIntensity: number;
}

interface ColoredContactsEffect {
  filterType: string | ZegoEffectsColoredcontactsType;
  filterIntensity: number;
}

interface EyelashesEffect {
  filterType: string | ZegoEffectsEyelashesType;
  filterIntensity: number;
}

interface EyelinerEffect {
  filterType: string | ZegoEffectsEyelinerType;
  filterIntensity: number;
}

interface LipstickEffect {
  filterType: string | ZegoEffectsLipstickType;
  filterIntensity: number;
}

interface MakeupEffect {
  filterType: string | ZegoEffectsMakeupType;
  filterIntensity: number;
}

interface EffectState {
  beautification: BeautificationEffects;
  reshape: ReshapeEffects;
  filters: FilterEffects;
  blusher: BlusherEffect;
  coloredContacts: ColoredContactsEffect;
  eyelashes: EyelashesEffect;
  eyeliner: EyelinerEffect;
  lipstick: LipstickEffect;
  makeup: MakeupEffect;
}

// Define context type
interface ZegoEffectsContextType {
  effectsState: EffectState;
  updateBeautificationEffect: (key: keyof BeautificationEffects, value: number) => void;
  updateReshapeEffect: (key: keyof ReshapeEffects, value: number) => void;
  updateFilterEffect: (key: keyof FilterEffects, value: number | string) => void;
  updateBlusherEffect: (key: keyof BlusherEffect, value: number | string) => void;
  updateColoredContactsEffect: (key: keyof ColoredContactsEffect, value: number | string) => void;
  updateEyelashesEffect: (key: keyof EyelashesEffect, value: number | string) => void;
  updateEyelinerEffect: (key: keyof EyelinerEffect, value: number | string) => void;
  updateLipstickEffect: (key: keyof LipstickEffect, value: number | string) => void;
  updateMakeupEffect: (key: keyof MakeupEffect, value: number | string) => void;
  initializeEffects: (license: string) => Promise<void>;
  clearBeautification: () => void;
  clearReshape: () => void;
  clearFilters: () => void;
  clearBlusher: () => void;
  clearColoredContacts: () => void;
  clearEyelashes: () => void;
  clearEyeliner: () => void;
  clearLipstick: () => void;
  clearMakeup: () => void;
  resetAllEffects: () => void;
}

// Default values for each effect category
const DEFAULT_BEAUTIFICATION: BeautificationEffects = {
  skinToneEnhancement: 50,
  skinSmothing: 50,
  imageSharpening: 50,
  cheekBlusher: 50,
  removeNasolabialFolds: 50,
  removeDarkCircles: 50,
  removeAcneAndFreckles: 50,
  clarityEffects: 50,
  longChin: 50,
};

const DEFAULT_RESHAPE: ReshapeEffects = {
  faceSlim: 0,
  eyeEnlarge: 0,
  jawRefine: 0,
  bigEyes: 0,
  faceLifting: 0,
  smallMouth: 0,
  eyeBrightening: 0,
  noseSlimming: 0,
  teethWhitening: 0,
  longChin: 0,
  foreheadShortening: 0,
  mandibleSlimming: 0,
  cheekboneSlimming: 0,
  faceShortening: 0,
  noseLengthening: 0,
  shootBrightening: 0
};

const DEFAULT_FILTERS: FilterEffects = {
  filterType: 'clear',
  filterIntensity: 0,
};

const DEFAULT_BLUSHER: BlusherEffect = {
  filterType: 'clear',
  filterIntensity: 0,
};

const DEFAULT_COLORED_CONTACTS: ColoredContactsEffect = {
  filterType: 'clear',
  filterIntensity: 0,
};

const DEFAULT_EYELASHES: EyelashesEffect = {
  filterType: 'clear',
  filterIntensity: 0,
};

const DEFAULT_EYELINER: EyelinerEffect = {
  filterType: 'clear',
  filterIntensity: 0,
};

const DEFAULT_LIPSTICK: LipstickEffect = {
  filterType: 'clear',
  filterIntensity: 0,
};

const DEFAULT_MAKEUP: MakeupEffect = {
  filterType: 'clear',
  filterIntensity: 0,
};

const ZegoEffectsContext = createContext<ZegoEffectsContextType | undefined>(undefined);

export const ZegoEffectsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [effectsState, setEffectsState] = useState<EffectState>({
    beautification: DEFAULT_BEAUTIFICATION,
    reshape: DEFAULT_RESHAPE,
    filters: DEFAULT_FILTERS,
    blusher: DEFAULT_BLUSHER,
    coloredContacts: DEFAULT_COLORED_CONTACTS,
    eyelashes: DEFAULT_EYELASHES,
    eyeliner: DEFAULT_EYELINER,
    lipstick: DEFAULT_LIPSTICK,
    makeup: DEFAULT_MAKEUP,
  });

  // Helper function to apply effects to Zego SDK
  const applyZegoEffects = useCallback((eff: ZegoEffects, state: EffectState) => {
    try {
      const { beautification, reshape, filters, blusher, coloredContacts, eyelashes, eyeliner, lipstick, makeup } = state;

      // Apply beautification effects
      applyBeautificationEffects(eff, beautification);

      // Apply reshape effects
      applyReshapeEffects(eff, reshape);

      // Apply filter effects
      applyFilterEffects(eff, filters);

      // Apply makeup effects
      // applyBlusherEffect(eff, blusher);
      // applyColoredContactsEffect(eff, coloredContacts);
      // applyEyelashesEffect(eff, eyelashes);
      // applyEyelinerEffect(eff, eyeliner);
      // applyLipstickEffect(eff, lipstick);
      // applyMakeupEffect(eff, makeup);

      try {
        applyBlusherEffect(eff, blusher);
      } catch (blusherErr) {
        console.error('Blusher effect error:', blusherErr);
      }
      try {
        applyColoredContactsEffect(eff, coloredContacts);
      } catch (contactsErr) {
        console.error('Colored Contacts effect error:', contactsErr);
      }
      try {
        applyEyelashesEffect(eff, eyelashes);
      } catch (eyelashesErr) {
        console.error('Eyelashes effect error:', eyelashesErr);
      }
      try {
        applyEyelinerEffect(eff, eyeliner);
      } catch (eyelinerErr) {
        console.error('Eyeliner effect error:', eyelinerErr);
      }
      try {
        applyLipstickEffect(eff, lipstick);
      } catch (lipstickErr) {
        console.error('Lipstick effect error:', lipstickErr);
      }
      try {
        applyMakeupEffect(eff, makeup);
      } catch (makeupErr) {
        console.error('Makeup effect error:', makeupErr);
      }

    } catch (err) {
      console.error('applyZegoEffects error:', err);
    }
  }, []);

  // Separate functions for applying each category of effects
  const applyBeautificationEffects = (eff: ZegoEffects, beautification: BeautificationEffects) => {
    eff.enableWhiten(true);
    eff.setWhitenParam({ intensity: beautification.skinToneEnhancement });

    eff.enableSmooth(true);
    eff.setSmoothParam({ intensity: beautification.skinSmothing });

    eff.enableSharpen(true);
    eff.setSharpenParam({ intensity: beautification.imageSharpening });

    eff.enableRosy(true);
    eff.setRosyParam({ intensity: beautification.cheekBlusher });

    eff.enableWrinklesRemoving(true);
    eff.setWrinklesRemovingParam({ intensity: beautification.removeNasolabialFolds });

    eff.enableDarkCirclesRemoving(true);
    eff.setDarkCirclesRemovingParam({ intensity: beautification.removeDarkCircles });

    eff.enableAcneRemoving(true);
    eff.setAcneRemovingParam({ intensity: beautification.removeAcneAndFreckles });

    eff.enableClarity(true);
    eff.setClarityParam({ intensity: beautification.clarityEffects });

    eff.enableLongChin(true);
    eff.setLongChinParam({ intensity: beautification.longChin });
    // eff.setLipStick("/xxx/xxx/lipstickdir/lipstickdir_bean_paste_pink.bundle");
    // console.warn("setLipStick method is not available on ZegoEffects. Please verify the library documentation.");

    // eff.setLipstickParam({
    //   intensity: 100,
    //   type: ZegoEffectsLipstickType.CameoPink
    // });
  };

  const applyReshapeEffects = (eff: ZegoEffects, reshape: ReshapeEffects) => {
    eff.enableBigEyes(true);
    eff.setBigEyesParam({ intensity: reshape.bigEyes });

    eff.enableFaceLifting(true);
    eff.setFaceLiftingParam({ intensity: reshape.faceLifting });

    eff.enableSmallMouth(true);
    eff.setSmallMouthParam({ intensity: reshape.smallMouth });

    eff.enableEyesBrightening(true);
    eff.setEyesBrighteningParam({ intensity: reshape.eyeBrightening });

    eff.enableNoseNarrowing(true);
    eff.setNoseNarrowingParam({ intensity: reshape.noseSlimming });

    eff.enableTeethWhitening(true);
    eff.setTeethWhiteningParam({ intensity: reshape.teethWhitening });

    eff.enableLongChin(true);
    eff.setLongChinParam({ intensity: reshape.longChin });

    eff.enableForeheadShortening(true);
    eff.setForeheadShorteningParam({ intensity: reshape.foreheadShortening });

    eff.enableMandibleSlimming(true);
    eff.setMandibleSlimmingParam({ intensity: reshape.mandibleSlimming });

    eff.enableCheekboneSlimming(true);
    eff.setCheekboneSlimmingParam({ intensity: reshape.cheekboneSlimming });

    eff.enableFaceShortening(true);
    eff.setFaceShorteningParam({ intensity: reshape.faceShortening });

    eff.enableNoseLengthening(true);
    eff.setNoseLengtheningParam({ intensity: reshape.noseLengthening });
  };

  const applyFilterEffects = (eff: ZegoEffects, filters: FilterEffects) => {
    if (filters.filterType !== 'clear') {
      eff.setFilterParam({
        intensity: filters.filterIntensity,
        type: filters.filterType as ZegoEffectsFilterType,
      });
    } else {
      eff.setFilterParam({
        intensity: 0,
        type: ZegoEffectsFilterType.Autumn,
      });
    }
  };

  const applyBlusherEffect = (eff: ZegoEffects, blusher: BlusherEffect) => {
    if (blusher.filterType !== 'clear') {
      eff.setBlusherParam({
        intensity: blusher.filterIntensity,
        type: blusher.filterType as ZegoEffectsBlusherType,
      });
    } else {
      eff.setBlusherParam({
        intensity: 0,
        type: ZegoEffectsBlusherType.ApricotPink,
      });
    }
  };

  const applyColoredContactsEffect = (eff: ZegoEffects, coloredContacts: ColoredContactsEffect) => {
    if (coloredContacts.filterType !== 'clear') {
      eff.setColoredcontactsParam({
        intensity: coloredContacts.filterIntensity,
        type: coloredContacts.filterType as ZegoEffectsColoredcontactsType,
      });
    } else {
      eff.setColoredcontactsParam({
        intensity: 0,
        type: ZegoEffectsColoredcontactsType.ChocolateBrown,
      });
    }
  };

  const applyEyelashesEffect = (eff: ZegoEffects, eyelashes: EyelashesEffect) => {
    if (eyelashes.filterType !== 'clear') {
      eff.setEyelashesParam({
        intensity: eyelashes.filterIntensity,
        type: eyelashes.filterType as ZegoEffectsEyelashesType,
      });
    } else {
      eff.setEyelashesParam({
        intensity: 0,
        type: ZegoEffectsEyelashesType.Curl,
      });
    }
  };

  const applyEyelinerEffect = (eff: ZegoEffects, eyeliner: EyelinerEffect) => {
    if (eyeliner.filterType !== 'clear') {
      eff.setEyelinerParam({
        intensity: eyeliner.filterIntensity,
        type: eyeliner.filterType as ZegoEffectsEyelinerType,
      });
    } else {
      eff.setEyelinerParam({
        intensity: 0,
        type: ZegoEffectsEyelinerType.CatEye,
      });
    }
  };

  const applyLipstickEffect = (eff: ZegoEffects, lipstick: LipstickEffect) => {
    if (lipstick.filterType !== 'clear') {
      eff.setLipstickParam({
        intensity: lipstick.filterIntensity,
        type: lipstick.filterType as ZegoEffectsLipstickType,
      });
    } else {
      eff.setLipstickParam({
        intensity: 0,
        type: ZegoEffectsLipstickType.CameoPink,
      });
    }
  };

  const applyMakeupEffect = (eff: ZegoEffects, makeup: MakeupEffect) => {
    if (makeup.filterType !== 'clear') {
      eff.setMakeupParam({
        intensity: makeup.filterIntensity,
        type: makeup.filterType as ZegoEffectsMakeupType,
      });
    } else {
      eff.setMakeupParam({
        intensity: 0,
        type: ZegoEffectsMakeupType.CutieCool,
      });
    }
  };

  // Initialize Zego Effects SDK
  const initializeEffects = useCallback(
    async (license: string) => {
      console.log(license)
      try {
        const engine = ZegoExpressEngine.instance();
        await engine.enableCustomVideoProcessing(true, {}, ZegoPublishChannel.Main);

        const eff = new ZegoEffects(license);
        eff.enableImageProcessing(true);
        applyZegoEffects(eff, effectsState);

        eff.on('error', (code, desc) => {
          console.error(`ZegoEffects error: ${code}, ${desc}`);
        });

        effects = eff;
        console.log('ZegoEffects initialized');
      } catch (err) {
        console.error('Error initializing ZegoEffects:', err);
      }
    },
    [applyZegoEffects, effectsState]
  );

  // Update handlers for each category
  const updateBeautificationEffect = useCallback(
    debounce((key: keyof BeautificationEffects, value: number) => {
      setEffectsState((prev) => {
        const newValue = Math.max(0, Math.min(100, value));
        const updated = {
          ...prev,
          beautification: {
            ...prev.beautification,
            [key]: newValue,
          },
        };

        if (effects) {
          applyZegoEffects(effects, updated);
        }

        return updated;
      });
    }, 300),
    []
  );

  const updateReshapeEffect = useCallback(
    debounce((key: keyof ReshapeEffects, value: number) => {
      setEffectsState((prev) => {
        const newValue = Math.max(0, Math.min(100, value));
        const updated = {
          ...prev,
          reshape: {
            ...prev.reshape,
            [key]: newValue,
          },
        };

        if (effects) {
          applyZegoEffects(effects, updated);
        }

        return updated;
      });
    }, 300),
    []
  );

  const updateFilterEffect = useCallback(
    debounce((key: keyof FilterEffects, value: number | string) => {
      setEffectsState((prev) => {
        const updated = {
          ...prev,
          filters: {
            ...prev.filters,
            [key]: typeof value === 'number' ? Math.max(0, Math.min(100, value)) : value,
          },
        };

        if (effects) {
          applyZegoEffects(effects, updated);
        }

        return updated;
      });
    }, 300),
    []
  );

  const updateBlusherEffect = useCallback(
    debounce((key: keyof BlusherEffect, value: number | string) => {
      setEffectsState((prev) => {
        const updated = {
          ...prev,
          blusher: {
            ...prev.blusher,
            [key]: typeof value === 'number' ? Math.max(0, Math.min(100, value)) : value,
          },
        };

        if (effects) {
          applyZegoEffects(effects, updated);
        }

        return updated;
      });
    }, 300),
    []
  );

  const updateColoredContactsEffect = useCallback(
    debounce((key: keyof ColoredContactsEffect, value: number | string) => {
      setEffectsState((prev) => {
        const updated = {
          ...prev,
          coloredContacts: {
            ...prev.coloredContacts,
            [key]: typeof value === 'number' ? Math.max(0, Math.min(100, value)) : value,
          },
        };

        if (effects) {
          applyZegoEffects(effects, updated);
        }

        return updated;
      });
    }, 300),
    []
  );

  const updateEyelashesEffect = useCallback(
    debounce((key: keyof EyelashesEffect, value: number | string) => {
      setEffectsState((prev) => {
        const updated = {
          ...prev,
          eyelashes: {
            ...prev.eyelashes,
            [key]: typeof value === 'number' ? Math.max(0, Math.min(100, value)) : value,
          },
        };

        if (effects) {
          applyZegoEffects(effects, updated);
        }

        return updated;
      });
    }, 300),
    []
  );

  const updateEyelinerEffect = useCallback(
    debounce((key: keyof EyelinerEffect, value: number | string) => {
      setEffectsState((prev) => {
        const updated = {
          ...prev,
          eyeliner: {
            ...prev.eyeliner,
            [key]: typeof value === 'number' ? Math.max(0, Math.min(100, value)) : value,
          },
        };

        if (effects) {
          applyZegoEffects(effects, updated);
        }

        return updated;
      });
    }, 300),
    []
  );

  const updateLipstickEffect = useCallback(
    debounce((key: keyof LipstickEffect, value: number | string) => {
      setEffectsState((prev) => {
        const updated = {
          ...prev,
          lipstick: {
            ...prev.lipstick,
            [key]: typeof value === 'number' ? Math.max(0, Math.min(100, value)) : value,
          },
        };

        if (effects) {
          applyZegoEffects(effects, updated);
        }

        return updated;
      });
    }, 300),
    []
  );

  const updateMakeupEffect = useCallback(
    debounce((key: keyof MakeupEffect, value: number | string) => {
      setEffectsState((prev) => {
        const updated = {
          ...prev,
          makeup: {
            ...prev.makeup,
            [key]: typeof value === 'number' ? Math.max(0, Math.min(100, value)) : value,
          },
        };

        if (effects) {
          applyZegoEffects(effects, updated);
        }

        return updated;
      });
    }, 300),
    []
  );

  // Reset functions for each category
  const clearBeautification = useCallback(() => {
    setEffectsState((prev) => {
      const updated = {
        ...prev,
        beautification: DEFAULT_BEAUTIFICATION,
      };

      if (effects) {
        applyZegoEffects(effects, updated);
      }

      return updated;
    });
  }, []);

  const clearReshape = useCallback(() => {
    setEffectsState((prev) => {
      const updated = {
        ...prev,
        reshape: DEFAULT_RESHAPE,
      };

      if (effects) {
        applyZegoEffects(effects, updated);
      }

      return updated;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setEffectsState((prev) => {
      const updated = {
        ...prev,
        filters: DEFAULT_FILTERS,
      };

      if (effects) {
        applyZegoEffects(effects, updated);
      }

      return updated;
    });
  }, []);

  const clearBlusher = useCallback(() => {
    setEffectsState((prev) => {
      const updated = {
        ...prev,
        blusher: DEFAULT_BLUSHER,
      };

      if (effects) {
        applyZegoEffects(effects, updated);
      }

      return updated;
    });
  }, []);

  const clearColoredContacts = useCallback(() => {
    setEffectsState((prev) => {
      const updated = {
        ...prev,
        coloredContacts: DEFAULT_COLORED_CONTACTS,
      };

      if (effects) {
        applyZegoEffects(effects, updated);
      }

      return updated;
    });
  }, []);

  const clearEyelashes = useCallback(() => {
    setEffectsState((prev) => {
      const updated = {
        ...prev,
        eyelashes: DEFAULT_EYELASHES,
      };

      if (effects) {
        applyZegoEffects(effects, updated);
      }

      return updated;
    });
  }, []);

  const clearEyeliner = useCallback(() => {
    setEffectsState((prev) => {
      const updated = {
        ...prev,
        eyeliner: DEFAULT_EYELINER,
      };

      if (effects) {
        applyZegoEffects(effects, updated);
      }

      return updated;
    });
  }, []);

  const clearLipstick = useCallback(() => {
    setEffectsState((prev) => {
      const updated = {
        ...prev,
        lipstick: DEFAULT_LIPSTICK,
      };

      if (effects) {
        applyZegoEffects(effects, updated);
      }

      return updated;
    });
  }, []);

  const clearMakeup = useCallback(() => {
    setEffectsState((prev) => {
      const updated = {
        ...prev,
        makeup: DEFAULT_MAKEUP,
      };

      if (effects) {
        applyZegoEffects(effects, updated);
      }

      return updated;
    });
  }, []);

  const resetAllEffects = useCallback(() => {
    const defaultState: EffectState = {
      beautification: DEFAULT_BEAUTIFICATION,
      reshape: DEFAULT_RESHAPE,
      filters: DEFAULT_FILTERS,
      blusher: DEFAULT_BLUSHER,
      coloredContacts: DEFAULT_COLORED_CONTACTS,
      eyelashes: DEFAULT_EYELASHES,
      eyeliner: DEFAULT_EYELINER,
      lipstick: DEFAULT_LIPSTICK,
      makeup: DEFAULT_MAKEUP,
    };

    setEffectsState(defaultState);

    if (effects) {
      applyZegoEffects(effects, defaultState);
    }
  }, [applyZegoEffects]);

  return (
    <ZegoEffectsContext.Provider
      value={{
        effectsState,
        updateBeautificationEffect,
        updateReshapeEffect,
        updateFilterEffect,
        updateBlusherEffect,
        updateColoredContactsEffect,
        updateEyelashesEffect,
        updateEyelinerEffect,
        updateLipstickEffect,
        updateMakeupEffect,
        initializeEffects,
        clearBeautification,
        clearReshape,
        clearFilters,
        clearBlusher,
        clearColoredContacts,
        clearEyelashes,
        clearEyeliner,
        clearLipstick,
        clearMakeup,
        resetAllEffects,
      }}
    >
      {children}
    </ZegoEffectsContext.Provider>
  );
};

export const useZegoEffects = () => {
  const context = useContext(ZegoEffectsContext);
  if (!context) {
    throw new Error('useZegoEffects must be used within a ZegoEffectsProvider');
  }
  return context;
};
