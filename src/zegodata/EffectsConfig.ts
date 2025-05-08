
import {
  ZegoEffectsBlusherType,
  ZegoEffectsSkinColorType,
  ZegoEffectsColoredcontactsType,
  ZegoEffectsEyelashesType,
  ZegoEffectsEyelinerType,
  ZegoEffectsEyeshadowType,
  ZegoEffectsFilterType,
  ZegoEffectsLipstickType,
  ZegoEffectsMakeupType,
  ZegoEffectsMosaicType,
} from "@zegocloud/zego-effects-reactnative";

// Beauty configuration item
export interface BeautyItem {
  type: BeautyType;
  name: string;
  items?: BeautyItem[];
  params?: string | number;
  intensity?: number;
  range?: [number, number];
}

// Beauty effect type enumeration
export enum BeautyType {
  // Basic Beauty Group
  Type_Group = 0,
  // Skin Whitening
  Face_Whitening = 1,
  // Rosy Cheeks
  Rosy = 2,
  // Skin Smoothing
  Beauty_Face = 3,
  // Sharpening
  Sharpen = 4,
  // Teeth Whitening
  Teeth_Whitening = 5,
  // Eye Brightening
  Eye_Bright = 6,
  // Nasolabial Fold Removal
  Naso_Fold_Erase = 7,
  // Dark Circle Removal
  Dark_Circle_Erase = 8,
  // Face Shaping Group
  Face_Lifting = 9,
  // Small Mouth
  Facial_Small_Mouth = 10,
  // Chin Slimming
  Facial_Long_Chin = 11,
  // Big Eyes
  Big_Eyes = 12,
  // Nose Slimming
  Facial_Thin_Nose = 13,
  // Forehead Adjustment
  Facial_Stretch_ForeHead = 14,
  // Jaw Slimming
  Facial_Thin_Jaw = 15,
  // Cheekbone Slimming
  Facial_Thin_Cheek = 16,
  // Small Face
  Facial_Small_Face = 17,
  // Long Nose
  Facial_Long_Nose = 18,
  // Style Filters
  Colorful_Style = 19,
  // Virtual Background Group
  Group_VirtualBackground = 20,
  // Background Replacement
  Background = 21,
  // AI Segmentation
  AI_Segment = 22,
  // Green Screen Segmentation
  ChromaKey = 23,
  // Background Mosaic
  Background_Mosaic = 24,
  // Triangle Mosaic
  Mosaic_Triangle = 25,
  // Square Mosaic
  Mosaic_Square = 26,
  // Hexagon Mosaic
  Mosaic_Hexagon = 27,
  // Background Blur
  Background_Blur = 28,
  // Grassland Background
  Background_Grassland = 29,
  // Sunset Background
  Background_Sunset = 30,
  // Maple Leaf Background
  Background_Mapleleaf = 31,
  // Sky Background
  Background_Sky = 32,
  // Bear Background
  Background_Bear = 33,
  // Water House Background
  Background_WaterHouse = 34,
  // Forest Background
  Background_Forest = 35,
  // Animal Kingdom Background
  Background_AnimalKingdom = 36,
  // Dusk Background
  Background_Dusk = 37,
  // Natural Creamy Filter
  Filter_Natural_Creamy = 38,
  // Natural Bright Filter
  Filter_Natural_Brighten = 39,
  // Natural Fresh Filter
  Filter_Natural_Fresh = 40,
  // Natural Autumn Filter
  Filter_Natural_Autumn = 41,
  // Gray Monet Filter
  Filter_Gray_Monet = 42,
  // Gray Night Filter
  Filter_Gray_Night = 43,
  // Gray Film-like Filter
  Filter_Gray_FilmLike = 44,
  // Dream Sunset Filter
  Filter_Dream_Sunset = 45,
  // Dream Glaze Filter
  Filter_Dream_Cozily = 46,
  // Dream Nebula Filter
  Filter_Dream_Sweet = 47,
  // Makeup
  Beautiful_Makeup = 48,
  // Lipstick
  Makeup_Lipstick = 49,
  // Bean Paste Pink Lipstick
  Lipstick_BeanPastePink = 50,
  // Coral Lipstick
  Lipstick_Coral = 51,
  // Velvet Red Lipstick
  Lipstick_VelvetRed = 52,
  // Sweet Orange Lipstick
  Lipstick_SweetOrange = 53,
  // Rust Red Lipstick
  Lipstick_RustRed = 54,
  // Blusher
  Makeup_Blusher = 55,
  // Peach Blusher
  Blusher_Peach = 56,
  // Milky Orange Blusher
  Blusher_MilkOrange = 57,
  // Sweet Orange Blusher
  Blusher_SweetOrange = 58,
  // Slightly Drunk Blusher
  Blusher_SlightlyDrunk = 59,
  // Apricot Pink Blusher
  Blusher_ApricotPink = 60,
  // Colored Contacts
  Makeup_Eyeball = 61,
  // Water Light Black Contacts
  Eyeball_WaterLightBlack = 62,
  // Starry Blue Contacts
  Eyeball_StarryBlue = 63,
  // Mystery Brown-Green Contacts
  Eyeball_MysteryBrownGreen = 64,
  // Polar Lights Brown Contacts
  Eyeball_PolarLightsBrown = 65,
  // Chocolate Brown Contacts
  Eyeball_ChocolateBrown = 66,
  // Eyeshadow
  Makeup_Eyeshadow = 67,
  // Mist Pink Eyeshadow
  Eyeshadow_MistPink = 68,
  // Mocha Brown Eyeshadow
  Eyeshadow_MochaBrown = 69,
  // Tea Brown Eyeshadow
  Eyeshadow_TeaBrown = 70,
  // Shimmer Pink Eyeshadow
  Eyeshadow_ShimmerPink = 71,
  // Vitality Orange Eyeshadow
  Eyeshadow_VitalityOrange = 72,
  // Eyeliner
  Makeup_Eyeliner = 73,
  // Playful Eyeliner
  Eyeliner_Pretty = 74,
  // Elegant Eyeliner
  Eyeliner_Temperament = 75,
  // Subtle Eyeliner
  Eyeliner_Scheming = 76,
  // Wildcat Eyeliner
  Eyeliner_Wildcat = 77,
  // Natural Eyeliner
  Eyeliner_Natural = 78,
  // Eyelashes
  Makeup_Eyelash = 79,
  // Curly Eyelashes
  Eyelash_Curl = 80,
  // Thick Eyelashes
  Eyelash_Bushy = 81,
  // Soft Eyelashes
  Eyelash_Tender = 82,
  // Slender Eyelashes
  Eyelash_Slender = 83,
  // Natural Eyelashes
  Eyelash_Natural = 84,
  // Full Makeup
  Makeup_Total = 85,
  // Innocent Eyes Makeup
  Total_VulnerableAndInnocentEyes = 86,
  // Pure and Sexy Makeup
  Total_PureAndSexy = 87,
  // Cute and Cool Makeup
  Total_CutieAndCool = 88,
  // Milky Eyes Makeup
  Total_MilkyEyes = 89,
  // Flawless Makeup
  Total_Flawless = 90,
  // Acne and Blemish Removal
  Beauty_RemoveAce = 91,
  // Skin Tone
  Skin_Color = 92,
  // Pink White Skin Tone
  Skin_Color_Fenbai = 93,
  // Tan Skin Tone
  Skin_Color_Meihei = 94,
  // Cool White Skin Tone
  Skin_Color_Lengbai = 95,
  // Warm White Skin Tone
  Skin_Color_Nuanbai = 96,
  // Wheat Skin Tone
  Skin_Color_Xiaomai = 97,
  // Clarity
  Beauty_Clarity = 98,
}

const config: BeautyItem[] = [
  {
    type: BeautyType.Type_Group,
    name: "Basic Beauty",
    items: [
      {
        type: BeautyType.Beauty_Face,
        name: "Skin Smoothing",
        intensity: 50,
      },
      {
        type: BeautyType.Beauty_RemoveAce,
        name: "Natural Skin",
        intensity: 50,
      },
      {
        type: BeautyType.Beauty_Clarity,
        name: "Clarity",
        intensity: 20,
      },
      {
        type: BeautyType.Skin_Color,
        name: "Skin Tone",
        intensity: 50,
        items: [
          {
            type: BeautyType.Skin_Color_Fenbai,
            name: "Pink White",
            params: ZegoEffectsSkinColorType.Fenbai,
          },
          {
            type: BeautyType.Skin_Color_Meihei,
            name: "Tan",
            params: ZegoEffectsSkinColorType.Meihei,
          },
          {
            type: BeautyType.Skin_Color_Lengbai,
            name: "Cool White",
            params: ZegoEffectsSkinColorType.Lengbai,
          },
          {
            type: BeautyType.Skin_Color_Nuanbai,
            name: "Warm White",
            params: ZegoEffectsSkinColorType.Nuanbai,
          },
          {
            type: BeautyType.Skin_Color_Xiaomai,
            name: "Wheat",
            params: ZegoEffectsSkinColorType.Xiaomai,
          },
        ],
      },
      {
        type: BeautyType.Face_Whitening,
        name: "Skin Whitening",
        intensity: 50,
      },
      {
        type: BeautyType.Rosy,
        name: "Rosy Cheeks",
        intensity: 100,
      },
      {
        type: BeautyType.Sharpen,
        name: "Sharpening",
        intensity: 50,
      },
      {
        type: BeautyType.Teeth_Whitening,
        name: "Teeth Whitening",
        intensity: 50,
      },
      {
        type: BeautyType.Eye_Bright,
        intensity: 50,
        name: "Eye Brightening",
      },
      {
        type: BeautyType.Naso_Fold_Erase,
        intensity: 50,
        name: "Nasolabial Fold Removal",
      },
      {
        type: BeautyType.Dark_Circle_Erase,
        intensity: 50,
        name: "Dark Circle Removal",
      },
    ],
  },
  {
    type: BeautyType.Type_Group,
    name: "Face Shaping",
    items: [
      {
        type: BeautyType.Face_Lifting,
        name: "Face Slimming",
        intensity:50,
      },
      {
        type: BeautyType.Facial_Small_Mouth,
        name: "Small Mouth",
        intensity: 50,
        range: [-100, 100],
      },
      {
        type: BeautyType.Facial_Long_Chin,
        name: "Chin Slimming",
        intensity: 50,
        range: [-100, 100],
      },
      {
        type: BeautyType.Big_Eyes,
        name: "Big Eyes",
        intensity: 50,
      },
      {
        type: BeautyType.Facial_Thin_Nose,
        name: "Nose Slimming",
        intensity: 50,
      },
      {
        type: BeautyType.Facial_Stretch_ForeHead,
        name: "Forehead Adjustment",
        intensity: 50,
        range: [-100, 100],
      },
      {
        type: BeautyType.Facial_Thin_Jaw,
        name: "Jaw Slimming",
        intensity: 50,
      },
      {
        type: BeautyType.Facial_Thin_Cheek,
        name: "Cheekbone Slimming",
        intensity: 50,
      },
      {
        type: BeautyType.Facial_Small_Face,
        name: "Small Face",
        intensity: 50,
      },
      {
        type: BeautyType.Facial_Long_Nose,
        name: "Long Nose",
        intensity: 50,
        range: [-100, 100],
      },
    ],
  },
  {
    type: BeautyType.Beautiful_Makeup,
    name: "Makeup",
    items: [
      {
        type: BeautyType.Makeup_Lipstick,
        name: "Lipstick",
        intensity: 50,
        items: [
          {
            type: BeautyType.Lipstick_BeanPastePink,
            name: "Bean Paste Pink",
            params: ZegoEffectsLipstickType.CameoPink,
          },
          {
            type: BeautyType.Lipstick_Coral,
            name: "Coral",
            params: ZegoEffectsLipstickType.Coral,
          },
          {
            type: BeautyType.Lipstick_VelvetRed,
            name: "Velvet Red",
            params: ZegoEffectsLipstickType.RedVelvet,
          },
          {
            type: BeautyType.Lipstick_SweetOrange,
            name: "Sweet Orange",
            params: ZegoEffectsLipstickType.SweetOrange,
          },
          {
            type: BeautyType.Lipstick_RustRed,
            name: "Rust Red",
            params: ZegoEffectsLipstickType.RustRed,
          },
        ],
      },
      {
        type: BeautyType.Makeup_Blusher,
        name: "Blusher",
        intensity: 50,
        items: [
          {
            type: BeautyType.Blusher_Peach,
            name: "Peach",
            params: ZegoEffectsBlusherType.Peach,
          },
          {
            type: BeautyType.Blusher_MilkOrange,
            name: "Milky Orange",
            params: ZegoEffectsBlusherType.MilkyOrange,
          },
          {
            type: BeautyType.Blusher_SweetOrange,
            name: "Sweet Orange",
            params: ZegoEffectsBlusherType.SweetOrange,
          },
          {
            type: BeautyType.Blusher_SlightlyDrunk,
            name: "Slightly Drunk",
            params: ZegoEffectsBlusherType.SlightlyDrunk,
          },
          {
            type: BeautyType.Blusher_ApricotPink,
            name: "Apricot Pink",
            params: ZegoEffectsBlusherType.ApricotPink,
          },
        ],
      },
      {
        type: BeautyType.Makeup_Eyeball,
        name: "Colored Contacts",
        intensity: 50,
        items: [
          {
            type: BeautyType.Eyeball_WaterLightBlack,
            name: "Water Light Black",
            params: ZegoEffectsColoredcontactsType.DarknightBlack,
          },
          {
            type: BeautyType.Eyeball_StarryBlue,
            name: "Starry Blue",
            params: ZegoEffectsColoredcontactsType.StarryBlue,
          },
          {
            type: BeautyType.Eyeball_MysteryBrownGreen,
            name: "Mystery Brown-Green",
            params: ZegoEffectsColoredcontactsType.MysteryBrownGreen,
          },
          {
            type: BeautyType.Eyeball_PolarLightsBrown,
            name: "Polar Lights Brown",
            params: ZegoEffectsColoredcontactsType.PolarLightsBrown,
          },
          {
            type: BeautyType.Eyeball_ChocolateBrown,
            name: "Chocolate Brown",
            params: ZegoEffectsColoredcontactsType.ChocolateBrown,
          },
        ],
      },
      {
        type: BeautyType.Makeup_Eyeshadow,
        name: "Eyeshadow",
        intensity: 50,
        items: [
          {
            type: BeautyType.Eyeshadow_MistPink,
            name: "Mist Pink",
            params: ZegoEffectsEyeshadowType.PinkMist,
          },
          {
            type: BeautyType.Eyeshadow_MochaBrown,
            name: "Mocha Brown",
            params: ZegoEffectsEyeshadowType.MochaBrown,
          },
          {
            type: BeautyType.Eyeshadow_TeaBrown,
            name: "Tea Brown",
            params: ZegoEffectsEyeshadowType.TeaBrown,
          },
          {
            type: BeautyType.Eyeshadow_ShimmerPink,
            name: "Shimmer Pink",
            params: ZegoEffectsEyeshadowType.ShimmerPink,
          },
          {
            type: BeautyType.Eyeshadow_VitalityOrange,
            name: "Vitality Orange",
            params: ZegoEffectsEyeshadowType.BrightOrange,
          },
        ],
      },
      {
        type: BeautyType.Makeup_Eyeliner,
        name: "Eyeliner",
        intensity: 50,
        items: [
          {
            type: BeautyType.Eyeliner_Pretty,
            name: "Playful",
            params: ZegoEffectsEyelinerType.Naughty,
          },
          {
            type: BeautyType.Eyeliner_Temperament,
            name: "Elegant",
            params: ZegoEffectsEyelinerType.Dignified,
          },
          {
            type: BeautyType.Eyeliner_Scheming,
            name: "Subtle",
            params: ZegoEffectsEyelinerType.Innocent,
          },
          {
            type: BeautyType.Eyeliner_Wildcat,
            name: "Wildcat",
            params: ZegoEffectsEyelinerType.CatEye,
          },
          {
            type: BeautyType.Eyeliner_Natural,
            name: "Natural",
            params: ZegoEffectsEyelinerType.Natural,
          },
        ],
      },
      {
        type: BeautyType.Makeup_Eyelash,
        name: "Eyelashes",
        intensity: 50,
        items: [
          {
            type: BeautyType.Eyelash_Curl,
            name: "Curly",
            params: ZegoEffectsEyelashesType.Curl,
          },
          {
            type: BeautyType.Eyelash_Bushy,
            name: "Thick",
            params: ZegoEffectsEyelashesType.Thick,
          },
          {
            type: BeautyType.Eyelash_Tender,
            name: "Soft",
            params: ZegoEffectsEyelashesType.Tender,
          },
          {
            type: BeautyType.Eyelash_Slender,
            name: "Slender",
            params: ZegoEffectsEyelashesType.Everlong,
          },
          {
            type: BeautyType.Eyelash_Natural,
            name: "Natural",
            params: ZegoEffectsEyelashesType.Natural,
          },
        ],
      },
      {
        type: BeautyType.Makeup_Total,
        name: "Full Makeup",
        intensity: 50,
        items: [
          {
            type: BeautyType.Total_VulnerableAndInnocentEyes,
            name: "Innocent Eyes Makeup",
            params: ZegoEffectsMakeupType.VulnerableInnocentEyes,
          },
          {
            type: BeautyType.Total_PureAndSexy,
            name: "Pure and Sexy Makeup",
            params: ZegoEffectsMakeupType.PureSexy,
          },
          {
            type: BeautyType.Total_CutieAndCool,
            name: "Cute and Cool Makeup",
            params: ZegoEffectsMakeupType.CutieCool,
          },
          {
            type: BeautyType.Total_MilkyEyes,
            name: "Milky Eyes Makeup",
            params: ZegoEffectsMakeupType.MilkyEyes,
          },
          {
            type: BeautyType.Total_Flawless,
            name: "Flawless Makeup",
            params: ZegoEffectsMakeupType.Flawless,
          },
        ],
      },
    ],
  },
  {
    type: BeautyType.Colorful_Style,
    name: "Style Filters",
    items: [
      {
        type: BeautyType.Filter_Natural_Creamy,
        name: "Natural Creamy",
        intensity:50,
        params: ZegoEffectsFilterType.Creamy,
      },
      {
        type: BeautyType.Filter_Natural_Brighten,
        name: "Natural Bright",
        intensity: 50,
        params: ZegoEffectsFilterType.Brighten,
      },
      {
        type: BeautyType.Filter_Natural_Fresh,
        name: "Natural Fresh",
        intensity:50,
        params: ZegoEffectsFilterType.Fresh,
      },
      {
        type: BeautyType.Filter_Natural_Autumn,
        name: "Natural Autumn",
        intensity: 50,
        params: ZegoEffectsFilterType.Autumn,
      },
      {
        type: BeautyType.Filter_Gray_Monet,
        name: "Gray Monet",
        intensity: 50,
        params: ZegoEffectsFilterType.Cool,
      },
      {
        type: BeautyType.Filter_Gray_Night,
        name: "Gray Night",
        intensity: 50,
        params: ZegoEffectsFilterType.Night,
      },
      {
        type: BeautyType.Filter_Gray_FilmLike,
        name: "Gray Film-like",
        intensity: 50,
        params: ZegoEffectsFilterType.FilmLike,
      },
      {
        type: BeautyType.Filter_Dream_Sunset,
        name: "Dream Sunset",
        intensity: 50,
        params: ZegoEffectsFilterType.Sunset,
      },
      {
        type: BeautyType.Filter_Dream_Cozily,
        name: "Dream Glaze",
        intensity: 50,
        params: ZegoEffectsFilterType.Cozily,
      },
      {
        type: BeautyType.Filter_Dream_Sweet,
        name: "Dream Nebula",
        intensity: 50,
        params: ZegoEffectsFilterType.Sweet,
      },
    ],
  },
  // {
  //   type: BeautyType.Type_Group,
  //   name: "Virtual Background",
  //   items: [
  //     {
  //       type: BeautyType.ChromaKey,
  //       name: "Green Screen Segmentation",
  //     },
  //     {
  //       type: BeautyType.Background,
  //       name: "Background Replacement",
  //       intensity: 50,
  //       items: [
  //         {
  //           type: BeautyType.Background_Sunset,
  //           name: "Sunset",
  //           params: "Backgrounds.bundle/sunset.jpg",
  //         },
  //         {
  //           type: BeautyType.Background_WaterHouse,
  //           name: "Water House",
  //           params: "Backgrounds.bundle/bg.jpg",
  //         },
  //       ],
  //     },
  //     {
  //       type: BeautyType.Background_Mosaic,
  //       name: "Background Mosaic",
  //       intensity: 100,
  //       items: [
  //         {
  //           type: BeautyType.Mosaic_Triangle,
  //           name: "Triangle",
  //           params: ZegoEffectsMosaicType.Triangle,
  //         },
  //         {
  //           type: BeautyType.Mosaic_Square,
  //           name: "Square",
  //           params: ZegoEffectsMosaicType.Square,
  //         },
  //         {
  //           type: BeautyType.Mosaic_Hexagon,
  //           name: "Hexagon",
  //           params: ZegoEffectsMosaicType.Hexagon,
  //         },
  //       ],
  //     },
  //     {
  //       type: BeautyType.Background_Blur,
  //       name: "Background Blur",
  //       intensity: 100,
  //     },
  //   ],
  // },
];

export default config;