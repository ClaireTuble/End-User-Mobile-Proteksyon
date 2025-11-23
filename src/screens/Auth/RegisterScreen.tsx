import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

export const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    gmail: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (key: string, val: string) => {
    setForm({ ...form, [key]: val });
  };

  const handleSignUp = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.replace('MainTabs');
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#7A001F', '#A30025', '#C9002F']}
        style={styles.gradient}
      >
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{ flex: 1 }}>
                
                {/* TOP SECTION */}
                <View style={styles.topSection}>
                  <Text style={styles.topTitle}>Create your account</Text>
                  <Text style={styles.topSubtitle}>
                    Get started with the Proteksyon App
                  </Text>

                  {/* Floating circles */}
                  <View style={styles.circle1} />
                  <View style={styles.circle2} />
                  <View style={styles.circle3} />
                </View>

                {/* WHITE CARD */}
                <View style={styles.card}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                  >

                    {/* Full Name */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Full Name</Text>
                      <View style={styles.inputContainer}>
                        <Ionicons name="person-outline" size={20} color="#666" />
                        <TextInput
                          style={styles.input}
                          placeholder="Juan Dela Cruz"
                          placeholderTextColor="#999"
                          value={form.name}
                          onChangeText={(t) => handleChange('name', t)}
                        />
                      </View>
                    </View>

                    {/* Phone Number */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Phone Number</Text>
                      <View style={styles.inputContainer}>
                        <Ionicons name="call-outline" size={20} color="#666" />
                        <TextInput
                          style={styles.input}
                          placeholder="09123456789"
                          placeholderTextColor="#999"
                          keyboardType="phone-pad"
                          value={form.phone}
                          onChangeText={(t) => handleChange('phone', t)}
                        />
                      </View>
                    </View>

                    {/* Gmail */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Gmail</Text>
                      <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color="#666" />
                        <TextInput
                          style={styles.input}
                          placeholder="email@gmail.com"
                          placeholderTextColor="#999"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          value={form.gmail}
                          onChangeText={(t) => handleChange('gmail', t)}
                        />
                      </View>
                    </View>

                    {/* Address */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Address/Location</Text>
                      <View style={styles.inputContainer}>
                        <Ionicons name="location-outline" size={20} color="#666" />
                        <TextInput
                          style={styles.input}
                          placeholder="Enter your address"
                          placeholderTextColor="#999"
                          value={form.address}
                          onChangeText={(t) => handleChange('address', t)}
                        />
                      </View>
                    </View>

                    {/* Password */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Password</Text>
                      <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color="#666" />
                        <TextInput
                          style={styles.input}
                          placeholder="Enter password"
                          placeholderTextColor="#999"
                          secureTextEntry
                          value={form.password}
                          onChangeText={(t) => handleChange('password', t)}
                        />
                      </View>
                    </View>

                    {/* Confirm Password */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Confirm Password</Text>
                      <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color="#666" />
                        <TextInput
                          style={styles.input}
                          placeholder="Confirm password"
                          placeholderTextColor="#999"
                          secureTextEntry
                          value={form.confirmPassword}
                          onChangeText={(t) => handleChange('confirmPassword', t)}
                        />
                      </View>
                    </View>

                    {/* SIGN UP BUTTON */}
                    <TouchableOpacity style={{ marginTop: 10 }} onPress={handleSignUp}>
                      <LinearGradient
                        colors={['#A30025', '#7A001F']}
                        style={styles.signUpGradient}
                      >
                        <Text style={styles.signUpText}>SIGN UP</Text>
                      </LinearGradient>
                    </TouchableOpacity>

                    {/* Already have account */}
                    <View style={styles.bottomRow}>
                      <Text style={styles.bottomText}>Already have an account? </Text>
                      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.bottomLink}>Sign in</Text>
                      </TouchableOpacity>
                    </View>

                  </ScrollView>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

// ------------------------------------------------------------
// STYLES
// ------------------------------------------------------------
const styles = StyleSheet.create({
  gradient: { flex: 1 },

  topSection: {
    height: '22%',
    justifyContent: 'flex-end',
    paddingLeft: 30,
    paddingBottom: 15,
  },
  topTitle: {
    color: 'white',
    fontSize: 26,
    fontWeight: '700',
  },
  topSubtitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
  },

  // Floating circles
  circle1: {
    position: 'absolute',
    width: 85,
    height: 85,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 100,
    top: 10,
    right: 50,
  },
  circle2: {
    position: 'absolute',
    width: 55,
    height: 55,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 100,
    top: 90,
    right: 15,
  },
  circle3: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 100,
    top: 70,
    left: 10,
  },

  // White container
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 40, // avoids bottom nav overlap
  },

  scrollContent: {
    paddingBottom: 60, // ensures last input stays above nav bar
  },

  // Inputs
  inputGroup: { marginBottom: 16 },
  label: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },

  // Button
  signUpGradient: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  signUpText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },

  // Bottom text
  bottomRow: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomText: {
    fontSize: 12,
    color: '#666',
  },
  bottomLink: {
    fontSize: 12,
    color: '#A30025',
    fontWeight: '700',
  },
});
