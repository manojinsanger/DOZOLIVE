import { Alert } from "react-native";
import { fetchToken } from "@/controllers/fetchToken"
import { axiosInstance } from "./apiUrl";

export const updateProfile = async (data: any) => {
    try {
        const token = await fetchToken();
        if (!token) {
            console.log("No token available");
            return;
        }

        const formData = new FormData();

        console.log(formData,'formate data before')

        Object.keys(data).forEach((key) => {
            if (
                data[key] !== null &&
                data[key] !== undefined &&
                data[key] !== "" &&
                !["image", "coverImage", "interests", "skills", "educationList", "careerList"].includes(key)
            ) {
                formData.append(key, data[key]);
            }
        });

        if (data.image) {
            formData.append("image", {
                uri: data.image,
                name: "profile.jpg",
                type: "image/jpeg",
            } as any);
        }

        if (data.coverImage) {
            formData.append("coverImage", {
                uri: data.coverImage,
                name: "cover.jpg",
                type: "image/jpeg",
            } as any);
        }

        const appendJsonArray = (key: string, value: any) => {
            if (Array.isArray(value) && value.length > 0) {
                value.forEach((item) => formData.append(key, typeof item === "object" ? JSON.stringify(item) : item));
            }
        };


        appendJsonArray("interests", data.interests);
        appendJsonArray("skills", data.skills);

        const appendStructuredArray = (key: string, array: any[]) => {
            if (Array.isArray(array) && array.length > 0) {
                array.forEach((item, index) => {
                    Object.keys(item).forEach((field) => {
                        if (field !== '_id') {
                            formData.append(`${key}[${index}][${field}]`, item[field]);
                        }
                    });
                });
            }
        };

        // Store educationList & careerList in required format
        appendStructuredArray("educationList", data.educationList || []);
        appendStructuredArray("careerList", data.careerList || []);

        // console.log("Updating API with new data...", formData);

        console.log(formData,'formData')

        const response = await axiosInstance.put("/user", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error updating profile:", error.response?.data || error.message);
        throw error;
    }
};



export const updateLanguage = async (data: object) => {
    try {
        const token = await fetchToken();
        if (!token) {
            console.log("No token available");
            return;
        }

        const response = await axiosInstance.put("/user/language", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error updating language:", error.response?.data || error.message);
        throw error;
    }
};




export const getUserById = async (id: number) => {
    try {
        const token = await fetchToken();
        const response = await axiosInstance.get(`/profile/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        // console.error("Error fetching user profile:", error.response?.data || error.message);
        Alert.alert(error.response?.data?.message?.message || "An error occurred.");
        throw error;
    }
};


// export const updateProfile = async (data: any) => {
//     try {
//         const token = await fetchToken();
//         if (!token) {
//             console.log("No token available");
//             return;
//         }

//         const formData = new FormData();

//         Object.keys(data).forEach((key) => {
//             if (key !== "image" && key !== "coverImage") {
//                 formData.append(key, data[key]);
//             }
//         });

//         if (data.image) {
//             formData.append("image", {
//                 uri: data.image,
//                 name: "upload.jpg",
//                 type: "image/jpeg",
//             } as any);
//         }

//         if (data.coverImage) {
//             formData.append("coverImage", {
//                 uri: data.coverImage,
//                 name: "upload.jpg",
//                 type: "image/jpeg",
//             } as any);
//         }

//         const response = await axiosInstance.put("/user", formData, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "multipart/form-data",
//             },
//         });

//         return response.data;
//     } catch (error: any) {
//         console.error("Error updating profile:", error.response?.data || error.message);
//         throw error;
//     }
// };


