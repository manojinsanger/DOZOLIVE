import ZegoEffects, {
  ZegoEffectsSkinColorType,
  ZegoEffectsBlusherType,
  ZegoEffectsColoredcontactsType,
  ZegoEffectsEyelashesType,
  ZegoEffectsEyelinerType,
  ZegoEffectsEyeshadowType,
  ZegoEffectsFilterType,
  ZegoEffectsLipstickType,
  ZegoEffectsMakeupType,
  ZegoEffectsMosaicType,
  ZegoEffectsScaleMode,
} from "@zegocloud/zego-effects-reactnative";
import KeyCenter from "./KeyCenter";
import { BeautyItem, BeautyType } from "./EffectsConfig";
import * as RNFS from "react-native-fs";
import { Platform } from "react-native";

// https://aieffects-api.zego.im?Action=DescribeEffectsLicense&AppId=${ZegoConfig.instance.appID}&AuthInfo=${AuthInfo}
// docs: https://doc-zh.zego.im/article/11987
const GET_LICENSE_CGI =
  "https://aieffects-api.zego.im?Action=DescribeEffectsLicense";

/**
 * Copies files or directories from the assets directory to the target path
 * @param {string} assetsRelativePath Relative path from the assets directory
 * @param {string} destinationPath Target path
 */
async function copyAssetsRecursively(
  assetsRelativePath: string,
  destinationPath: string
) {
  // Read all files and subdirectories in the assets directory
  const files = await RNFS.readDirAssets(assetsRelativePath);
  const result = await RNFS.mkdir(destinationPath);
  console.log(
    `[copyResources] Created directory ${destinationPath}: ${result}, copying files: ${files.length}`
  );
  for (const file of files) {
    console.log(`[copyResources] Handling file: ${file}`);
    const filePath = `${assetsRelativePath}/${file.name}`;
    const destFilePath = `${destinationPath}/${file.name}`;
    console.log(`[copyResources] Copying ${filePath} to ${destFilePath}`);
    if (file.isDirectory()) {
      // If it's a directory, create the directory and copy recursively
      await RNFS.mkdir(destFilePath);
      await copyAssetsRecursively(filePath, destFilePath);
    } else {
      await RNFS.copyFileAssets(filePath, destFilePath);
    }
  }
}

export default class EffectsHelper {
  static effects: ZegoEffects | null = null;

  static async copyResources() {
    const src = "Backgrounds.bundle";
    const dest = RNFS.ExternalCachesDirectoryPath + "/" + src;
    console.log(`[copyResources] Starting copy from ${src} to ${dest}`);
    copyAssetsRecursively(src, dest)
      .then(() => console.log("All files copied successfully"))
      .catch((err) => console.error("File copying failed", err));
  }

  static getResourcePath() {
    if (Platform.OS == "android") {
      return RNFS.ExternalCachesDirectoryPath;
    } else {
      return RNFS.MainBundlePath;
    }
  }

  // static async getLicense(): Promise<string | null> {
  //   // Fetch license from ZEGO server
  //   // docs: https://doc-zh.zego.im/article/11987
  //   const authInfo = await ZegoEffects.getAuthInfo(KeyCenter.appSign);
  //   try {
  //     const response = await fetch(
  //       `${GET_LICENSE_CGI}&AppId=${KeyCenter.appID}&AuthInfo=${authInfo}`
  //     );
  //     const data = await response.json();
  //     console.log(
  //       "EffectsInitPage Get license, code:",
  //       data.Code,
  //       ", message:",
  //       data.Message
  //     );
  //     if (data.Code === 0) {
  //       return data.Data.License;
  //     }
  //     return null;
  //   } catch (error) {
  //     console.error("Error:", error);
  //     throw error;
  //   }
  // }

  static async initEffects() {
    if (Platform.OS == "android") {
      // Copy resources to SD card
      this.copyResources();
    }

    // const license = await this.getLicense();
    // if (!license) {
    //   console.error("Failed to obtain effects license");
    //   return;
    // }

    this.effects = new ZegoEffects(KeyCenter.licence);

    // Listen for error events
    this.effects.on("error", (errorCode, desc) => {
      console.error("Effects error: " + errorCode + ", desc: " + desc);
    });

    // Enable Effects image handler for Express
    await this.effects.enableImageProcessing(true);

    this.effects.enableWhiten(true);
    this.effects.setWhitenParam({ intensity: 50});

    this.effects.enableSmooth(true);
    this.effects.setSmoothParam({ intensity: 50});

    this.effects.enableSharpen(true);
    this.effects.setSharpenParam({ intensity:50 });

    this.effects.enableRosy(true);
    this.effects.setRosyParam({ intensity: 50 });

    this.effects.enableWrinklesRemoving(true);
    this.effects.setWrinklesRemovingParam({ intensity: 50});

    this.effects.enableDarkCirclesRemoving(true);
    this.effects.setDarkCirclesRemovingParam({ intensity:50 });

    this.effects.enableAcneRemoving(true);
    this.effects.setAcneRemovingParam({ intensity:50});
  }

  static async destroyEffects() {
    if (this.effects) {
      await this.effects.destroy();
    }
  }

  static async updateEffects(
    groupItem: BeautyItem,
    beautyItem: BeautyItem,
    currentIntensity: number
  ) {
    console.info(
      "updateEffects: groupItem=" +
        groupItem.type +
        ", beautyItem=" +
        JSON.stringify(beautyItem) +
        " currentIntensity: " +
        currentIntensity
    );

    // Call corresponding effects APIs based on BeautyItem type
    // currentIntensity == 0 means disable, call effects.enableXXX(false)
    // currentIntensity != 0 means enable, call effects.enableXXX(true) and effects.setXXXParam({intensity: currentIntensity})
    if (groupItem.type == BeautyType.Type_Group) {
      switch (beautyItem.type) {
        case BeautyType.Face_Lifting:
          if (currentIntensity == 0) {
            this.effects?.enableFaceLifting(false);
          } else {
            this.effects?.enableFaceLifting(true);
            this.effects?.setFaceLiftingParam({ intensity: currentIntensity });
          }
          break;
        case BeautyType.Face_Whitening:
          if (currentIntensity == 0) {
            this.effects?.enableWhiten(false);
          } else {
            this.effects?.enableWhiten(true);
            this.effects?.setWhitenParam({ intensity: currentIntensity });
          }
          break;
        case BeautyType.Rosy:
          if (currentIntensity == 0) {
            this.effects?.enableRosy(false);
          } else {
            this.effects?.enableRosy(true);
            this.effects?.setRosyParam({ intensity: currentIntensity });
          }
          break;
        case BeautyType.Beauty_RemoveAce:
          if (currentIntensity == 0) {
            this.effects?.enableAcneRemoving(false);
          } else {
            this.effects?.enableAcneRemoving(true);
            this.effects?.setAcneRemovingParam({ intensity: currentIntensity });
          }
          break;
        case BeautyType.Beauty_Clarity:
          if (currentIntensity == 0) {
            this.effects?.enableClarity(false);
          } else {
            this.effects?.enableClarity(true);
            this.effects?.setClarityParam({ intensity: currentIntensity });
          }
          break;
        case BeautyType.Beauty_Face:
          if (currentIntensity == 0) {
            this.effects?.enableSmooth(false);
          } else {
            this.effects?.enableSmooth(true);
            this.effects?.setSmoothParam({ intensity: currentIntensity });
          }
          break;
        case BeautyType.Sharpen:
          if (currentIntensity == 0) {
            this.effects?.enableSharpen(false);
          } else {
            this.effects?.enableSharpen(true);
            this.effects?.setSharpenParam({ intensity: currentIntensity });
          }
          break;
        case BeautyType.Teeth_Whitening:
          if (currentIntensity == 0) {
            this.effects?.enableTeethWhitening(false);
          } else {
            this.effects?.enableTeethWhitening(true);
            this.effects?.setTeethWhiteningParam({
              intensity: currentIntensity,
            });
          }
          break;
        case BeautyType.Eye_Bright:
          if (currentIntensity == 0) {
            this.effects?.enableEyesBrightening(false);
          } else {
            this.effects?.enableEyesBrightening(true);
            this.effects?.setEyesBrighteningParam({
              intensity: currentIntensity,
            });
          }
          break;
        case BeautyType.Naso_Fold_Erase:
          if (currentIntensity == 0) {
            this.effects?.enableWrinklesRemoving(false);
          } else {
            this.effects?.enableWrinklesRemoving(true);
            this.effects?.setWrinklesRemovingParam({
              intensity: currentIntensity,
            });
          }
          break;
        case BeautyType.Dark_Circle_Erase:
          if (currentIntensity == 0) {
            this.effects?.enableDarkCirclesRemoving(false);
          } else {
            this.effects?.enableDarkCirclesRemoving(true);
            this.effects?.setDarkCirclesRemovingParam({
              intensity: currentIntensity,
            });
          }
          break;
        case BeautyType.Facial_Small_Mouth:
          if (currentIntensity == 0) {
            this.effects?.enableSmallMouth(false);
          } else {
            this.effects?.enableSmallMouth(true);
            this.effects?.setSmallMouthParam({ intensity: currentIntensity });
          }
          break;
        case BeautyType.Facial_Long_Chin:
          if (currentIntensity == 0) {
            this.effects?.enableLongChin(false);
          } else {
            this.effects?.enableLongChin(true);
            this.effects?.setLongChinParam({ intensity: currentIntensity });
          }
          break;
        case BeautyType.Big_Eyes:
          if (currentIntensity == 0) {
            this.effects?.enableBigEyes(false);
          } else {
            this.effects?.enableBigEyes(true);
            this.effects?.setBigEyesParam({ intensity: currentIntensity });
          }
          break;
        case BeautyType.Facial_Thin_Nose:
          if (currentIntensity == 0) {
            this.effects?.enableNoseNarrowing(false);
          } else {
            this.effects?.enableNoseNarrowing(true);
            this.effects?.setNoseNarrowingParam({
              intensity: currentIntensity,
            });
          }
          break;
        case BeautyType.Facial_Stretch_ForeHead:
          if (currentIntensity == 0) {
            this.effects?.enableForeheadShortening(false);
          } else {
            this.effects?.enableForeheadShortening(true);
            this.effects?.setForeheadShorteningParam({
              intensity: currentIntensity,
            });
          }
          break;
        case BeautyType.Facial_Thin_Jaw:
          if (currentIntensity == 0) {
            this.effects?.enableMandibleSlimming(false);
          } else {
            this.effects?.enableMandibleSlimming(true);
            this.effects?.setMandibleSlimmingParam({
              intensity: currentIntensity,
            });
          }
          break;
        case BeautyType.Facial_Thin_Cheek:
          if (currentIntensity == 0) {
            this.effects?.enableCheekboneSlimming(false);
          } else {
            this.effects?.enableCheekboneSlimming(true);
            this.effects?.setCheekboneSlimmingParam({
              intensity: currentIntensity,
            });
          }
          break;
        case BeautyType.Facial_Small_Face:
          if (currentIntensity == 0) {
            this.effects?.enableFaceShortening(false);
          } else {
            this.effects?.enableFaceShortening(true);
            this.effects?.setFaceShorteningParam({
              intensity: currentIntensity,
            });
          }
          break;
        case BeautyType.Facial_Long_Nose:
          if (currentIntensity == 0) {
            this.effects?.enableNoseLengthening(false);
          } else {
            this.effects?.enableNoseLengthening(true);
            this.effects?.setNoseLengtheningParam({
              intensity: currentIntensity,
            });
          }
          break;

        //********************** Background-related */
        case BeautyType.AI_Segment:
          if (currentIntensity == 0) {
            this.effects?.enablePortraitSegmentation(false);
          } else {
            this.effects?.enablePortraitSegmentation(true);
          }
          break;
        case BeautyType.ChromaKey:
          if (currentIntensity == 0) {
            this.effects?.enableChromaKey(false);
          } else {
            this.effects?.enableChromaKey(true);
          }
          break;
        case BeautyType.Background_Blur:
          if (currentIntensity == 0) {
            this.effects?.enablePortraitSegmentationBackgroundBlur(false);
            this.effects?.enableChromaKeyBackgroundBlur(false);
          } else {
            this.effects?.enablePortraitSegmentationBackgroundBlur(true);
            this.effects?.setPortraitSegmentationBackgroundBlurParam({
              intensity: currentIntensity,
            });
            this.effects?.enableChromaKeyBackgroundBlur(true);
            this.effects?.setChromaKeyBackgroundBlurParam({
              intensity: currentIntensity,
            });
          }
          break;
        case BeautyType.Background_Mosaic:
          if (currentIntensity == 0) {
            this.effects?.enablePortraitSegmentationBackgroundMosaic(false);
            this.effects?.enableChromaKeyBackgroundMosaic(false);
          } else {
            this.effects?.enablePortraitSegmentationBackgroundMosaic(true);
            this.effects?.enableChromaKeyBackgroundMosaic(true);
          }
          break;
        case BeautyType.Background:
          if (currentIntensity == 0) {
            this.effects?.enablePortraitSegmentationBackground(false);
            this.effects?.enableChromaKeyBackground(false);
          } else {
            this.effects?.enablePortraitSegmentationBackground(true);
            this.effects?.enableChromaKeyBackground(true);
          }
          break;
      }
    } else if (groupItem.type == BeautyType.Colorful_Style) {
      if (currentIntensity == 0) {
        this.effects?.enableFilter(false);
      } else {
        this.effects?.enableFilter(true);
        this.effects?.setFilterParam({
          intensity: currentIntensity,
          type: beautyItem.params as ZegoEffectsFilterType,
        });
      }
    } else if (groupItem.type == BeautyType.Background_Mosaic) {
      // Mosaic
      this.effects?.setPortraitSegmentationBackgroundMosaicParam({
        intensity: currentIntensity,
        type: beautyItem.params as ZegoEffectsMosaicType,
      });
      this.effects?.setChromaKeyBackgroundMosaicParam({
        intensity: currentIntensity,
        type: beautyItem.params as ZegoEffectsMosaicType,
      });
    } else if (groupItem.type == BeautyType.Background) {
      // Background image
      var path = (this.getResourcePath() + "/" + beautyItem.params) as string;

      console.log("Setting background: " + path);
      this.effects?.setChromaKeyBackgroundPath(
        path,
        ZegoEffectsScaleMode.AspectFill
      );
      this.effects?.setPortraitSegmentationBackgroundPath(
        path,
        ZegoEffectsScaleMode.AspectFill
      );
    } else if (groupItem.type == BeautyType.Skin_Color) {
      console.log("Setting Skin Tone: ");
      if (currentIntensity == 0) {
        this.effects?.enableSkinColor(false);
      } else {
        this.effects?.enableSkinColor(true);
        this.effects?.setSkinColorParam({
          intensity: currentIntensity,
          type: beautyItem.params as ZegoEffectsSkinColorType,
        });
      }
    } else if (groupItem.type == BeautyType.Beautiful_Makeup) {
      // ************************ Makeup-related */
      // switch (beautyItem.type) {
      //     case BeautyType.Makeup_Lipstick:
      //         if (currentIntensity == 0) {
      //             this.effects?.enableLipstick(false);
      //         } else {
      //             this.effects?.enableLipstick(true);
      //         }
      //         break;
      //     case BeautyType.Makeup_Blusher:
      //         if (currentIntensity == 0) {
      //             this.effects?.enableBlusher(false);
      //         } else {
      //             this.effects?.enableBlusher(true);
      //         }
      //         break;
      //     case BeautyType.Makeup_Eyeball:
      //         if (currentIntensity == 0) {
      //             this.effects?.enableColoredcontacts(false);
      //         } else {
      //             this.effects?.enableColoredcontacts(true);
      //         }
      //         break;
      //     case BeautyType.Makeup_Eyeshadow:
      //         if (currentIntensity == 0) {
      //             this.effects?.enableEyeshadow(false);
      //         } else {
      //             this.effects?.enableEyeshadow(true);
      //         }
      //         break;
      //     case BeautyType.Makeup_Eyeliner:
      //         if (currentIntensity == 0) {
      //             this.effects?.enableEyeliner(false);
      //         } else {
      //             this.effects?.enableEyeliner(true);
      //         }
      //         break;
      //     case BeautyType.Makeup_Eyelash:
      //         if (currentIntensity == 0) {
      //             this.effects?.enableEyelashes(false);
      //         } else {
      //             this.effects?.enableEyelashes(true);
      //         }
      //         break;
      // }
      // ************************ Individual makeup settings */
    } else if (groupItem.type == BeautyType.Makeup_Lipstick) {
      if (currentIntensity == 0) {
        this.effects?.enableLipstick(false);
      } else {
        this.effects?.enableLipstick(true);
        this.effects?.setLipstickParam({
          intensity: currentIntensity,
          type: beautyItem.params as ZegoEffectsLipstickType,
        });
      }
    } else if (groupItem.type == BeautyType.Makeup_Blusher) {
      if (currentIntensity == 0) {
        this.effects?.enableBlusher(false);
      } else {
        this.effects?.enableBlusher(true);
        this.effects?.setBlusherParam({
          intensity: currentIntensity,
          type: beautyItem.params as ZegoEffectsBlusherType,
        });
      }
    } else if (groupItem.type == BeautyType.Makeup_Eyeball) {
      if (currentIntensity == 0) {
        this.effects?.enableColoredcontacts(false);
      } else {
        this.effects?.enableColoredcontacts(true);
        this.effects?.setColoredcontactsParam({
          intensity: currentIntensity,
          type: beautyItem.params as ZegoEffectsColoredcontactsType,
        });
      }
    } else if (groupItem.type == BeautyType.Makeup_Eyeshadow) {
      if (currentIntensity == 0) {
        this.effects?.enableEyeshadow(false);
      } else {
        this.effects?.enableEyeshadow(true);
        this.effects?.setEyeshadowParam({
          intensity: currentIntensity,
          type: beautyItem.params as ZegoEffectsEyeshadowType,
        });
      }
    } else if (groupItem.type == BeautyType.Makeup_Eyeliner) {
      if (currentIntensity == 0) {
        this.effects?.enableEyeliner(false);
      } else {
        this.effects?.enableEyeliner(true);
        this.effects?.setEyelinerParam({
          intensity: currentIntensity,
          type: beautyItem.params as ZegoEffectsEyelinerType,
        });
      }
    } else if (groupItem.type == BeautyType.Makeup_Eyelash) {
      if (currentIntensity == 0) {
        this.effects?.enableEyelashes(false);
      } else {
        this.effects?.enableEyelashes(true);
        this.effects?.setEyelashesParam({
          intensity: currentIntensity,
          type: beautyItem.params as ZegoEffectsEyelashesType,
        });
      }
    } else if (groupItem.type == BeautyType.Makeup_Total) {
      if (currentIntensity == 0) {
        this.effects?.enableMakeup(false);
      } else {
        this.effects?.enableMakeup(true);
        this.effects?.setMakeupParam({
          intensity: currentIntensity,
          type: beautyItem.params as ZegoEffectsMakeupType,
        });
      }
    } else {
      console.error("Type not implemented:", groupItem.type);
    }
  }
}