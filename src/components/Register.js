// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Alert,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

// function Register({ navigation }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleRegister = async () => {
//     if (!name || !email || !password) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch('https://rice-cooker-back-end.onrender.com/users/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: name, 
//           email,
//           password,
//         }),
//       });

//       const data = await response.json();
//       console.log('SERVER RESPONSE:', data);

//       if (!response.ok) {
//         throw new Error(data.message || 'Registration failed');
//       }

//       Alert.alert(
//         'Success',
//         'Registration successful! Please login with your credentials.',
//         [
//           {
//             text: 'OK',
//             onPress: () => navigation.navigate('Login')
//           }
//         ]
//       );

//     } catch (error) {
//       console.log('ERROR:', error);
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <LinearGradient
//       colors={['#096171', '#10023C']}
//       style={styles.container}
//     >
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.formContainer}>
//           <View style={styles.headerContainer}>
//             <Text style={styles.title}>Register</Text>
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Name</Text>
//             <TextInput
//               style={styles.input}
//               value={name}
//               onChangeText={setName}
//               placeholder="Enter your name"
//               placeholderTextColor="#666"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               style={styles.input}
//               value={email}
//               onChangeText={setEmail}
//               placeholder="Enter your email"
//               keyboardType="email-address"
//               autoCapitalize="none"
//               placeholderTextColor="#666"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Password</Text>
//             <TextInput
//               style={styles.input}
//               value={password}
//               onChangeText={setPassword}
//               placeholder="Enter your password"
//               secureTextEntry
//               placeholderTextColor="#666"
//             />
//           </View>

//           <TouchableOpacity 
//             style={[styles.button, loading && styles.disabledButton]}
//             onPress={handleRegister}
//             disabled={loading}
//           >
//             <Text style={styles.buttonText}>
//               {loading ? 'Registering...' : 'Register'}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={styles.linkButton}
//             onPress={() => navigation.navigate('Login')}
//           >
//             <Text style={styles.linkText}>Already have an account? Login</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   safeArea: {
//     flex: 1,
//   },
//   formContainer: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   headerContainer: {
//     alignItems: 'center',
//     marginBottom: 40,
//     width: '100%',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     textAlign: 'center',
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//     color: '#FFFFFF',
//   },
//   input: {
//     backgroundColor: 'white',
//     padding: 15,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#096171',
//     color: '#000000',
//   },
//   button: {
//     backgroundColor: '#096171',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   linkButton: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   linkText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//   },
//   disabledButton: {
//     backgroundColor: '#cccccc',
//   },
// });

// export default Register;

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function Register({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('https://rice-cooker-back-end.onrender.com/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log('REGISTER RESPONSE:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      Alert.alert(
        'Success',
        'Registration successful! Please login with your credentials.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );

    } catch (error) {
      console.log('ERROR:', error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#096171', '#10023C']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.formContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Register</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              placeholderTextColor="#666"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Registering...' : 'Register'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.linkText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#096171',
    color: '#000000',
  },
  button: {
    backgroundColor: '#096171',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
});

export default Register;
