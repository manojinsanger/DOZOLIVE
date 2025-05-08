declare module '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';


interface InterestChipProps {
    label: string;
    isSelected: boolean;
    onSelect: () => void;
}


interface LiveSession {
    _id: string;
    title: string;
    description: string;
    tags: string[];
    channelName: string;
    userId: string;
    image: string;
    chatRoomId: string;
    viewers: number;
    createdAt: string;
}

interface LiveSessionData {
    title: string;
    description: string;
    tags: string[];
    image?: File;
}

interface LiveCardsListProps {
    lives: LiveSession[];
    loading: boolean;
    refreshing:boolean;
    onRefresh: () => Promise<void>;
}

type RenderGenderFieldProps = {
    setShowGenderPicker: React.Dispatch<React.SetStateAction<boolean>>;
    showGenderPicker: boolean;
    gender: string;
    genderOptions: string[];
    setGender: React.Dispatch<React.SetStateAction<string>>;
};

type RenderBioFieldProps = {
    setTempBio: React.Dispatch<React.SetStateAction<string>>;
    setShowBioModal: React.Dispatch<React.SetStateAction<boolean>>;
    bio: string;
};


type EducationEntry = {
    education: string;
    educationYear: string;
};


interface EducationModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (educationData: { education: string; educationYear: string }, editIndex: number | null) => void;
    selectedEducation?: { education: string; educationYear: string } | null;
    editIndex: number | null;
}

interface CareerModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (
        careerData: { position: string; company: string; fromYear: string; toYear: string },
        editIndex: number | null
    ) => void;
    selectedCareer?: { position: string; company: string; fromYear: string; toYear: string } | null;
    editIndex: number | null;
}

interface Career {
    position: string;
    company: string;
    fromYear: string;
    toYear: string;
}

interface IUser {
    _id: string;
    uid: string;
    email?: string | null;
    phone: string;
    phoneVerified: boolean;
    profileImage?: string;
    coverImage?: string;
    bio?: string;
    homeCountry?: string;
    language?: string;
    gender?: 'Male' | 'Female' | 'Other';
    dateOfBirth?: Date;
    age?: number;
    followers?: string[];
    following?: string[];
    role?: 'user' | 'admin';
    interests?: string[];
    isOnline?: boolean;
    lastSeen?: Date | null;
    accountStatus?: 'active' | 'inactive' | 'banned';
    skills?: string[];
    referralCode?: string;
    referralCount?: number;
    educationList?: Record<string, any>[];
    careerList?: Record<string, any>[];
    createdAt?: Date;
    updatedAt?: Date;
    liveId?: number | null;
    homeTown?: string;
    name: string;
  }
  
  interface IReceiver {
    _id: string;
    name: string;
    avatar: string;
  }