// import { ZegoExpressEngine, ZegoPublishChannel } from 'zego-express-engine-react-native';
import ZegoEffects from '@zegocloud/zego-effects-reactnative';
import ZegoExpressEngine, { ZegoPublishChannel } from 'zego-express-engine-reactnative';

interface FaceBeautiFication {
  skinToneEnhancement: number;
  skinSmoothing: number;
  imageSharpening: number;
  cheekBlusher: number;
  removeNasolabialFolds: number;
  removeDarkCIrcles: number;
  removeAcneAndFreckles: number;
  clarityEffects: number;
}

let effects: ZegoEffects | null = null;

export const initializeZegoEffects = async (license: string, FaceBeautiFication: FaceBeautiFication): Promise<void> => {
  try {
    const engine = ZegoExpressEngine.instance();
    await engine.enableCustomVideoProcessing(true, {}, ZegoPublishChannel.Main);

    effects = new ZegoEffects(license);
    console.log(`Effects version=${await ZegoEffects.getVersion()}`);

    effects.on('error', (errorCode: any, desc: any) => {
      console.error(`ZegoEffects error: ${errorCode}, ${desc}`);
    });

    effects.enableImageProcessing(true);
    applyZegoEffects(FaceBeautiFication);
    console.log('ZegoEffects initialized successfully');
  } catch (error) {
    console.error('Error initializing ZegoEffects:', error);
    throw error;
  }
};

export const applyZegoEffects = (FaceBeautiFication: FaceBeautiFication): void => {

  if (!effects) return;
  try {
    // Enable skin tone enhancement
    effects.enableWhiten(true);
    // Set enhancement intensity, range [0, 100], default is 50
    effects.setWhitenParam({ intensity: FaceBeautiFication.skinToneEnhancement });

    // Enable skin smoothing
    effects.enableSmooth(true);
    // Set smoothing intensity, range [0, 100], default is 50
    effects.setSmoothParam({ intensity: FaceBeautiFication.skinSmoothing });

    // Enable image sharpening
    effects.enableSharpen(true);
    // Set sharpening intensity, range [0, 100], default is 50
    effects.setSharpenParam({ intensity: FaceBeautiFication.imageSharpening });

    // Enable cheek blusher
    effects.enableRosy(true);
    // Set blusher intensity, range [0, 100], default is 50
    effects.setRosyParam({ intensity: FaceBeautiFication.cheekBlusher });

    // Enable nasolabial fold removal feature
    effects.enableWrinklesRemoving(true);
    // Set the degree of nasolabial fold removal, range [0, 100], default is 50
    effects.setWrinklesRemovingParam({ intensity: FaceBeautiFication.removeNasolabialFolds });

    // Enable dark circles removal feature
    effects.enableDarkCirclesRemoving(true);
    // Set the degree of dark circles removal, range [0, 100], default is 50
    effects.setDarkCirclesRemovingParam({ intensity: FaceBeautiFication.removeDarkCIrcles });

    // Enable acne and freckles removal feature
    effects.enableAcneRemoving(true);
    // Set the degree of acne and freckles removal, range [0, 100], default is 0
    effects.setAcneRemovingParam({ intensity: FaceBeautiFication.removeAcneAndFreckles });


    // Enable clarity feature
    effects.enableClarity(true);
    // Set the degree of clarity, range [0, 100], default is 0
    effects.setClarityParam({ intensity: FaceBeautiFication.clarityEffects });


    // Enable chin slimming feature
    effects.enableLongChin(true);

    // Set the degree of chin slimming, range [0, 100], default is 50

    effects.setLongChinParam({ intensity: 600 });

    console.log('Applied effects:', FaceBeautiFication);
  } catch (error) {
    console.error('Error applying effects:', error);
  }
};

export const destroyZegoEffects = (): void => {
  if (effects) {
    // effects.enableImageProcessing(false);
    // effects.enableSmooth(false);
    // effects.enableFaceLifting(false);
    // effects.enableWhitening(false);
    effects = null;
  }
};