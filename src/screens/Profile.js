// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   Image,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';

// const Profile = ({ navigation }) => {
//   const [profileImage, setProfileImage] = useState(null);

//   const requestCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const permissions = [
//           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//           PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//         ];

//         const results = await Promise.all(
//           permissions.map(permission => 
//             PermissionsAndroid.request(permission, {
//               title: "App Gallery Permission",
//               message: "App needs access to your gallery",
//               buttonNeutral: "Ask Me Later",
//               buttonNegative: "Cancel",
//               buttonPositive: "OK"
//             })
//           )
//         );

//         return results.some(result => result === PermissionsAndroid.RESULTS.GRANTED);
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     }
//     return true;
//   };

//   const selectImage = async () => {
//     try {
//       const hasPermission = await requestCameraPermission();
//       if (!hasPermission) {
//         console.log('Permission denied');
//         return;
//       }

//       const options = {
//         mediaType: 'photo',
//         quality: 1,
//         includeBase64: false,
//         selectionLimit: 1,
//       };

//       const result = await launchImageLibrary(options);
//       console.log('Image picker result:', result);

//       if (!result.didCancel && result.assets && result.assets.length > 0) {
//         const selectedImage = result.assets[0];
//         console.log('Selected image:', selectedImage);
//         setProfileImage({ uri: selectedImage.uri });
//       }
//     } catch (error) {
//       console.log('Error selecting image:', error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Image
//           source={require('../assets/robot-logo.png')}
//           style={styles.logo}
//           resizeMode="contain"
//         />
//         <Text style={styles.headerTitle}>Profile</Text>
//         <TouchableOpacity style={styles.menuButton}>
//           <Image 
//             source={require('../assets/menu.png')}
//             style={styles.menuIcon}
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.content}>
//         <View style={styles.titleContainer}>
//           <Text style={styles.title}>Profile</Text>
//         </View>

//         <View style={styles.profileContainer}>
//           <View style={styles.avatarContainer}>
//             {profileImage ? (
//               <Image 
//                 source={profileImage}
//                 style={styles.avatar}
//                 resizeMode="cover"
//               />
//             ) : (
//               <View style={styles.defaultAvatar} />
//             )}
//             <Text style={styles.username}>User_Name</Text>
//             <TouchableOpacity style={styles.uploadButton} onPress={selectImage}>
//               <Image 
//                 source={require('../assets/upload.png')}
//                 style={styles.uploadIcon}
//                 resizeMode="contain"
//               />
//               <Text style={styles.uploadText}>Upload profile photo</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.infoContainer}>
//             <View style={styles.infoRow}>
//               <Text style={styles.label}>Name:</Text>
//               <Text style={styles.value}>John Doe</Text>
//             </View>
            
//             <View style={styles.infoRow}>
//               <Text style={styles.label}>Email:</Text>
//               <Text style={styles.value}>abc@gmail.com</Text>
//               <TouchableOpacity style={styles.editButton}>
//                 <Text style={styles.editButtonText}>Edit</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.infoRow}>
//               <Text style={styles.label}>Password:</Text>
//               <Text style={styles.value}>••••••••••</Text>
//             </View>
//           </View>

//           <TouchableOpacity style={styles.subscriptionButton}>
//             <Text style={styles.subscriptionButtonText}>Subscription plans</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.footer}>
//         <TouchableOpacity onPress={() => navigation.navigate('TermsOfService')}>
//           <Text style={styles.footerText}>Term of Service</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
//           <Text style={styles.footerText}>Privacy policy</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
//           <Text style={styles.footerText}>Contact Us</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//     backgroundColor: '#178ea3',
//   },
//   logo: {
//     width: 50,
//     height: 50,
//   },
//   headerTitle: {
//     color: '#FFFFFF',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   menuIcon: {
//     width: 24,
//     height: 24,
//     tintColor: '#FFFFFF',
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   titleContainer: {
//     backgroundColor: '#178ea3',
//     padding: 15,
//     borderRadius: 25,
//     marginBottom: 30,
//     borderWidth: 0.9,
//     borderColor: '#096171',
//   },
//   title: {
//     color: '#FFFFFF',
//     fontSize: 20,
//     textAlign: 'center',
//     fontWeight: '600',
//   },
//   profileContainer: {
//     backgroundColor: '#F5F5F5',
//     borderRadius: 15,
//     padding: 20,
//     alignItems: 'center',
//   },
//   avatarContainer: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#F5F5F5',
//     marginBottom: 10,
//   },
//   defaultAvatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#D3D3D3',
//     marginBottom: 10,
//   },
//   username: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#178ea3',
//     marginBottom: 10,
//   },
//   uploadButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#178ea3',
//     padding: 10,
//     borderRadius: 20,
//   },
//   uploadIcon: {
//     width: 20,
//     height: 20,
//     tintColor: '#FFFFFF',
//     marginRight: 5,
//   },
//   uploadText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//   },
//   infoContainer: {
//     width: '100%',
//     marginBottom: 30,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     color: '#333333',
//     width: 80,
//   },
//   value: {
//     fontSize: 16,
//     color: '#178ea3',
//     flex: 1,
//   },
//   editButton: {
//     backgroundColor: '#178ea3',
//     paddingHorizontal: 15,
//     paddingVertical: 5,
//     borderRadius: 15,
//   },
//   editButtonText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//   },
//   subscriptionButton: {
//     backgroundColor: '#001F3F',
//     padding: 15,
//     borderRadius: 25,
//     width: '100%',
//     alignItems: 'center',
//   },
//   subscriptionButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 20,
//     backgroundColor: '#096171',
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   footerText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//   },
// });

// export default Profile;

//======================================

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   Image,
//   PermissionsAndroid,
//   Platform,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';

// const API_BASE = 'https://rice-cooker-back-end.onrender.com';

// const Profile = ({ navigation, route }) => {
//   const [profileImage, setProfileImage] = useState(null);
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);

//   const token = route?.params?.token; 
//   // or if you use context/asyncStorage: const token = yourAuthState.token

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE}/users/profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch profile');
//       }

//       const data = await response.json();
//       setUsername(data.username || '');
//       setEmail(data.email || '');
//       if (data.profileImage) {
//         setProfileImage({ uri: data.profileImage });
//       }
//     } catch (error) {
//       console.log('Profile fetch error:', error);
//       Alert.alert('Error', 'Failed to load profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const requestCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const permissions = [
//           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//           PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//         ];

//         const results = await Promise.all(
//           permissions.map(permission =>
//             PermissionsAndroid.request(permission, {
//               title: "App Gallery Permission",
//               message: "App needs access to your gallery",
//               buttonNeutral: "Ask Me Later",
//               buttonNegative: "Cancel",
//               buttonPositive: "OK"
//             })
//           )
//         );

//         return results.some(result => result === PermissionsAndroid.RESULTS.GRANTED);
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     }
//     return true;
//   };

//   const selectImage = async () => {
//     try {
//       const hasPermission = await requestCameraPermission();
//       if (!hasPermission) {
//         console.log('Permission denied');
//         return;
//       }

//       const options = {
//         mediaType: 'photo',
//         quality: 1,
//         includeBase64: false,
//         selectionLimit: 1,
//       };

//       const result = await launchImageLibrary(options);
//       console.log('Image picker result:', result);

//       if (!result.didCancel && result.assets && result.assets.length > 0) {
//         const selectedImage = result.assets[0];
//         uploadImage(selectedImage);
//       }
//     } catch (error) {
//       console.log('Error selecting image:', error);
//     }
//   };

//   const uploadImage = async (image) => {
//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append('file', {
//         uri: image.uri,
//         name: image.fileName || 'profile.jpg',
//         type: image.type || 'image/jpeg',
//       });

//       const response = await fetch(`${API_BASE}/users/profile/upload-photo`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//         body: formData,
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Upload failed');
//       }

//       setProfileImage({ uri: data.imageUrl });
//       Alert.alert('Success', 'Profile photo updated');
//     } catch (error) {
//       console.log('Upload error:', error);
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Image
//           source={require('../assets/robot-logo.png')}
//           style={styles.logo}
//           resizeMode="contain"
//         />
//         <Text style={styles.headerTitle}>Profile</Text>
//         <TouchableOpacity style={styles.menuButton}>
//           <Image 
//             source={require('../assets/menu.png')}
//             style={styles.menuIcon}
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.content}>
//         {loading ? (
//           <ActivityIndicator size="large" color="#178ea3" />
//         ) : (
//           <>
//             <View style={styles.titleContainer}>
//               <Text style={styles.title}>Profile</Text>
//             </View>

//             <View style={styles.profileContainer}>
//               <View style={styles.avatarContainer}>
//                 {profileImage ? (
//                   <Image 
//                     source={profileImage}
//                     style={styles.avatar}
//                     resizeMode="cover"
//                   />
//                 ) : (
//                   <View style={styles.defaultAvatar} />
//                 )}
//                 <Text style={styles.username}>{username}</Text>
//                 <TouchableOpacity style={styles.uploadButton} onPress={selectImage}>
//                   <Image 
//                     source={require('../assets/upload.png')}
//                     style={styles.uploadIcon}
//                     resizeMode="contain"
//                   />
//                   <Text style={styles.uploadText}>Upload profile photo</Text>
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.infoContainer}>
//                 <View style={styles.infoRow}>
//                   <Text style={styles.label}>Name:</Text>
//                   <Text style={styles.value}>{username}</Text>
//                 </View>
                
//                 <View style={styles.infoRow}>
//                   <Text style={styles.label}>Email:</Text>
//                   <Text style={styles.value}>{email}</Text>
//                   <TouchableOpacity style={styles.editButton}>
//                     <Text style={styles.editButtonText}>Edit</Text>
//                   </TouchableOpacity>
//                 </View>

//                 <View style={styles.infoRow}>
//                   <Text style={styles.label}>Password:</Text>
//                   <Text style={styles.value}>••••••••••</Text>
//                 </View>
//               </View>

//               <TouchableOpacity style={styles.subscriptionButton}>
//                 <Text style={styles.subscriptionButtonText}>Subscription plans</Text>
//               </TouchableOpacity>
//             </View>
//           </>
//         )}
//       </View>

//       <View style={styles.footer}>
//         <TouchableOpacity onPress={() => navigation.navigate('TermsOfService')}>
//           <Text style={styles.footerText}>Term of Service</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
//           <Text style={styles.footerText}>Privacy policy</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
//           <Text style={styles.footerText}>Contact Us</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const API_BASE = 'https://rice-cooker-back-end.onrender.com';

const Profile = ({ navigation, route }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const token = route?.params?.token;

  useEffect(() => {
    loadLocalProfile();
    fetchProfile();
  }, []);

  const loadLocalProfile = async () => {
    try {
      const data = await AsyncStorage.getItem('profile');
      if (data) {
        const { username, email, image } = JSON.parse(data);
        console.log("Loaded from local storage:", { username, email, image });
        setUsername(username);
        setEmail(email);
        if (image) setProfileImage({ uri: image });
      }
    } catch (err) {
      console.log('Local load error:', err);
    }
  };

  const saveLocalProfile = async (profile) => {
    try {
      console.log("Saving local profile:", profile);
      await AsyncStorage.setItem('profile', JSON.stringify(profile));
    } catch (err) {
      console.log('Local save error:', err);
    }
  };

  const fetchProfile = async () => {
    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      setLoading(true);
      console.log("Calling fetchProfile with token:", token);

      const response = await fetch(`${API_BASE}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("FETCHED DATA:", data);

      const userData = data.user || data.data || data;
      console.log("Extracted user data:", userData);

      if (!response.ok) throw new Error(data.message || 'Fetch failed');

      setUsername(userData.username || '');
      setEmail(userData.email || '');
      if (userData.profileImage) {
        setProfileImage({ uri: userData.profileImage });
      }

      await saveLocalProfile({
        username: userData.username || '',
        email: userData.email || '',
        image: userData.profileImage || '',
      });

    } catch (err) {
      console.log('Fetch failed, fallback to local:', err);
      Alert.alert('Error', 'Could not load profile from server.');
    } finally {
      setLoading(false);
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        ];
        const results = await Promise.all(
          permissions.map(permission =>
            PermissionsAndroid.request(permission)
          )
        );
        return results.some(result => result === PermissionsAndroid.RESULTS.GRANTED);
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const selectImage = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission needed', 'Please allow gallery access');
      return;
    }

    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
      selectionLimit: 1,
    };

    const result = await launchImageLibrary(options);
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setProfileImage({ uri: selectedImage.uri });

      console.log("Preserving name/email on image change:", username, email);

      await saveLocalProfile({
        username: username || '',
        email: email || '',
        image: selectedImage.uri,
      });

      Alert.alert('Saved', 'Photo saved locally on this device.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/robot-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Image 
            source={require('../assets/menu.png')}
            style={styles.menuIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#178ea3" />
        ) : (
          <>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Profile</Text>
            </View>

            <View style={styles.profileContainer}>
              <View style={styles.avatarContainer}>
                {profileImage ? (
                  <Image 
                    source={profileImage}
                    style={styles.avatar}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.defaultAvatar} />
                )}
                <Text style={styles.username}>{username || 'Your Name'}</Text>
                <TouchableOpacity style={styles.uploadButton} onPress={selectImage}>
                  <Image 
                    source={require('../assets/upload.png')}
                    style={styles.uploadIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.uploadText}>Upload profile photo</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Name:</Text>
                  <Text style={styles.value}>{username || '...'}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Email:</Text>
                  <Text style={styles.value}>{email || '...'}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.subscriptionButton}>
                <Text style={styles.subscriptionButtonText}>Subscription plans</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('TermsOfService')}>
          <Text style={styles.footerText}>Term of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
          <Text style={styles.footerText}>Privacy policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
          <Text style={styles.footerText}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#178ea3',
  },
  logo: {
    width: 50,
    height: 50,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    backgroundColor: '#178ea3',
    padding: 15,
    borderRadius: 25,
    marginBottom: 30,
    borderWidth: 0.9,
    borderColor: '#096171',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  profileContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
  },
  defaultAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D3D3D3',
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: '#178ea3',
    marginBottom: 10,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#178ea3',
    padding: 10,
    borderRadius: 20,
  },
  uploadIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
    marginRight: 5,
  },
  uploadText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  infoContainer: {
    width: '100%',
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333333',
    width: 80,
  },
  value: {
    fontSize: 16,
    color: '#178ea3',
    flex: 1,
  },
  editButton: {
    backgroundColor: '#178ea3',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  subscriptionButton: {
    backgroundColor: '#001F3F',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  subscriptionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#096171',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default Profile;
