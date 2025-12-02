import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export const SendFeedbackScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [feedbackType, setFeedbackType] = useState('general');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [includeDeviceInfo, setIncludeDeviceInfo] = useState(true);
  const [contactSupport, setContactSupport] = useState(false);

  const feedbackTypes = [
    { id: 'general', title: 'General Feedback', icon: 'chatbubble-outline' as const },
    { id: 'bug', title: 'Bug Report', icon: 'bug-outline' as const },
    { id: 'feature', title: 'Feature Request', icon: 'bulb-outline' as const },
    { id: 'emergency', title: 'Emergency Issue', icon: 'warning-outline' as const },
  ];

  const handleSendFeedback = () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter your feedback message');
      return;
    }

    if (!email.trim() && contactSupport) {
      Alert.alert('Error', 'Please enter your email address for support contact');
      return;
    }

    Alert.alert(
      'Feedback Sent',
      'Thank you for your feedback! We\'ll review it and get back to you if needed.',
      [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send Feedback</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Feedback Type Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>FEEDBACK TYPE</Text>
            
            <View style={styles.typeGrid}>
              {feedbackTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeCard,
                    feedbackType === type.id && styles.typeCardSelected
                  ]}
                  onPress={() => setFeedbackType(type.id)}
                >
                  <Ionicons 
                    name={type.icon} 
                    size={24} 
                    color={feedbackType === type.id ? '#860d0dff' : '#666'} 
                  />
                  <Text style={[
                    styles.typeTitle,
                    feedbackType === type.id && styles.typeTitleSelected
                  ]}>
                    {type.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Message */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>YOUR MESSAGE</Text>
            
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.messageInput}
                value={message}
                onChangeText={setMessage}
                placeholder="Tell us what you think..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Contact Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CONTACT INFORMATION</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address (Optional)</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="your.email@example.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.switchItem}>
              <View style={styles.switchLeft}>
                <Text style={styles.switchTitle}>Include Device Info</Text>
                <Text style={styles.switchSubtitle}>Help us debug by sending device information</Text>
              </View>
              <Switch
                value={includeDeviceInfo}
                onValueChange={setIncludeDeviceInfo}
                trackColor={{ false: '#e0e0e0', true: '#ffcdd2' }}
                thumbColor={includeDeviceInfo ? '#860d0dff' : '#f4f4f4'}
              />
            </View>

            <View style={styles.switchItem}>
              <View style={styles.switchLeft}>
                <Text style={styles.switchTitle}>Contact Support</Text>
                <Text style={styles.switchSubtitle}>Allow us to contact you for follow-up</Text>
              </View>
              <Switch
                value={contactSupport}
                onValueChange={setContactSupport}
                trackColor={{ false: '#e0e0e0', true: '#ffcdd2' }}
                thumbColor={contactSupport ? '#860d0dff' : '#f4f4f4'}
              />
            </View>
          </View>

          {/* Quick Feedback Options */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>QUICK FEEDBACK</Text>
            
            <TouchableOpacity style={styles.quickFeedbackItem}>
              <Ionicons name="star-outline" size={20} color="#860d0dff" />
              <View style={styles.quickFeedbackText}>
                <Text style={styles.quickFeedbackTitle}>Rate App</Text>
                <Text style={styles.quickFeedbackSubtitle}>Rate us on the app store</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickFeedbackItem}>
              <Ionicons name="share-social-outline" size={20} color="#860d0dff" />
              <View style={styles.quickFeedbackText}>
                <Text style={styles.quickFeedbackTitle}>Share App</Text>
                <Text style={styles.quickFeedbackSubtitle}>Share with friends and family</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </TouchableOpacity>
          </View>

          {/* Send Button */}
          <TouchableOpacity style={styles.sendButton} onPress={handleSendFeedback}>
            <Ionicons name="send-outline" size={20} color="#fff" />
            <Text style={styles.sendButtonText}>Send Feedback</Text>
          </TouchableOpacity>

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#860d0dff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  section: {
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    paddingHorizontal: 16,
    paddingVertical: 12,
    letterSpacing: 0.5,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingBottom: 8,
    justifyContent: 'space-between',
  },
  typeCard: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  typeCardSelected: {
    backgroundColor: 'rgba(229, 57, 53, 0.1)',
    borderColor: '#860d0dff',
  },
  typeTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  typeTitleSelected: {
    color: '#860d0dff',
  },
  inputGroup: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    height: 120,
  },
  switchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  switchLeft: {
    flex: 1,
  },
  switchTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  switchSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  quickFeedbackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  quickFeedbackText: {
    flex: 1,
    marginLeft: 12,
  },
  quickFeedbackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  quickFeedbackSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#860d0dff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 40,
  },
});
