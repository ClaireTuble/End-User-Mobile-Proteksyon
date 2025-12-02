import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { PrivacySecurityScreen } from './PrivacySecurityScreen';
import { SendFeedbackScreen } from './SendFeedbackScreen';

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [autoEmergency, setAutoEmergency] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Clear all cached data and temporary files?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', onPress: () => Alert.alert('Success', 'Cache cleared successfully!') }
      ]
    );
  };

  const SettingsItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    rightComponent 
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress} disabled={!onPress}>
      <View style={styles.settingsItemLeft}>
        <View style={styles.settingsIcon}>
          <Ionicons name={icon} size={20} color="#860d0dff" />
        </View>
        <View style={styles.settingsText}>
          <Text style={styles.settingsTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent || (onPress && <Ionicons name="chevron-forward" size={16} color="#ccc" />)}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ACCOUNT</Text>
            
            <SettingsItem
              icon="person-outline"
              title="Edit Profile"
              subtitle="Update your personal information"
              onPress={() => navigation.navigate('Profile')}
            />
            
            <SettingsItem
              icon="shield-outline"
              title="Privacy & Security"
              subtitle="Manage your privacy settings"
              onPress={() => navigation.navigate('PrivacySecurity')}
            />
            
            <SettingsItem
              icon="chatbubble-outline"
              title="Send Feedback"
              subtitle="Help us improve the app"
              onPress={() => navigation.navigate('SendFeedback')}
            />
            
            <SettingsItem
              icon="notifications-outline"
              title="Notification Preferences"
              subtitle="Configure alert settings"
              onPress={() => Alert.alert('Notifications', 'Notification preferences coming soon!')}
            />
          </View>

          {/* App Preferences Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PREFERENCES</Text>
            
            <SettingsItem
              icon="notifications-outline"
              title="Push Notifications"
              subtitle="Receive emergency alerts"
              rightComponent={
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: '#e0e0e0', true: '#ffcdd2' }}
                  thumbColor={notifications ? '#860d0dff' : '#f4f4f4'}
                />
              }
            />
            
            <SettingsItem
              icon="location-outline"
              title="Location Services"
              subtitle="Allow app to access your location"
              rightComponent={
                <Switch
                  value={locationServices}
                  onValueChange={setLocationServices}
                  trackColor={{ false: '#e0e0e0', true: '#ffcdd2' }}
                  thumbColor={locationServices ? '#860d0dff' : '#f4f4f4'}
                />
              }
            />
            
            <SettingsItem
              icon="volume-high-outline"
              title="Sound Effects"
              subtitle="Play sounds for alerts and actions"
              rightComponent={
                <Switch
                  value={soundEffects}
                  onValueChange={setSoundEffects}
                  trackColor={{ false: '#e0e0e0', true: '#ffcdd2' }}
                  thumbColor={soundEffects ? '#860d0dff' : '#f4f4f4'}
                />
              }
            />
          </View>

          {/* Emergency Settings Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EMERGENCY</Text>
            
            <SettingsItem
              icon="warning-outline"
              title="Auto Emergency Detection"
              subtitle="Automatically detect emergencies"
              rightComponent={
                <Switch
                  value={autoEmergency}
                  onValueChange={setAutoEmergency}
                  trackColor={{ false: '#e0e0e0', true: '#ffcdd2' }}
                  thumbColor={autoEmergency ? '#860d0dff' : '#f4f4f4'}
                />
              }
            />
            
            <SettingsItem
              icon="call-outline"
              title="Emergency Contacts"
              subtitle="Manage emergency contact numbers"
              onPress={() => navigation.navigate('EmergencyHotlines')}
            />
          </View>

          {/* Data & Storage Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>DATA & STORAGE</Text>
            
            <SettingsItem
              icon="wifi-outline"
              title="Data Usage"
              subtitle="Monitor app data consumption"
              onPress={() => Alert.alert('Data Usage', 'Data usage settings coming soon!')}
            />
            
            <SettingsItem
              icon="download-outline"
              title="Offline Content"
              subtitle="Manage downloaded content"
              onPress={() => Alert.alert('Offline', 'Offline content settings coming soon!')}
            />
            
            <SettingsItem
              icon="trash-outline"
              title="Clear Cache"
              subtitle="Free up storage space"
              onPress={handleClearCache}
            />
          </View>

          {/* Support Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SUPPORT</Text>
            
            <SettingsItem
              icon="help-circle-outline"
              title="Help & FAQ"
              subtitle="Get help with the app"
              onPress={() => navigation.navigate('Help')}
            />
            
            <SettingsItem
              icon="chatbubble-outline"
              title="Send Feedback"
              subtitle="Help us improve the app"
              onPress={() => Alert.alert('Feedback', 'Feedback feature coming soon!')}
            />
            
            <SettingsItem
              icon="document-text-outline"
              title="Terms of Service"
              subtitle="Read our terms and conditions"
              onPress={() => Alert.alert('Terms', 'Terms of Service coming soon!')}
            />
            
            <SettingsItem
              icon="shield-outline"
              title="Privacy Policy"
              subtitle="Read our privacy policy"
              onPress={() => Alert.alert('Privacy', 'Privacy Policy coming soon!')}
            />
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ABOUT</Text>
            
            <SettingsItem
              icon="information-circle-outline"
              title="About Proteksyon"
              subtitle="App version and information"
              onPress={() => navigation.navigate('About')}
            />
            
            <SettingsItem
              icon="code-outline"
              title="App Version"
              subtitle="Version 1.0.0"
            />
          </View>

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
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(229, 57, 53, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsText: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  settingsSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  bottomSpacing: {
    height: 40,
  },
});