import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  User, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Bell,
  CreditCard,
  Users,
  BarChart3
} from 'lucide-react-native';

function CustomDrawerContent(props: any) {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/auth/login');
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <User size={30} color="#007AFF" />
          </View>
          <View>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userType}>Home User</Text>
          </View>
        </View>
      </View>

      <View style={styles.drawerSection}>
        <DrawerItem
          label="Profile"
          icon={({ color, size }) => <User size={size} color={color} />}
          onPress={() => router.push('/(main)/profile')}
          labelStyle={styles.drawerLabel}
          activeBackgroundColor="#F0F8FF"
          activeTintColor="#007AFF"
        />
        <DrawerItem
          label="Settings"
          icon={({ color, size }) => <Settings size={size} color={color} />}
          onPress={() => router.push('/(main)/settings')}
          labelStyle={styles.drawerLabel}
          activeBackgroundColor="#F0F8FF"
          activeTintColor="#007AFF"
        />
        <DrawerItem
          label="Notifications"
          icon={({ color, size }) => <Bell size={size} color={color} />}
          onPress={() => router.push('/(main)/notifications')}
          labelStyle={styles.drawerLabel}
          activeBackgroundColor="#F0F8FF"
          activeTintColor="#007AFF"
        />
        <DrawerItem
          label="Payment Methods"
          icon={({ color, size }) => <CreditCard size={size} color={color} />}
          onPress={() => router.push('/(main)/payments')}
          labelStyle={styles.drawerLabel}
          activeBackgroundColor="#F0F8FF"
          activeTintColor="#007AFF"
        />
        <DrawerItem
          label="Help & Support"
          icon={({ color, size }) => <HelpCircle size={size} color={color} />}
          onPress={() => router.push('/(main)/help')}
          labelStyle={styles.drawerLabel}
          activeBackgroundColor="#F0F8FF"
          activeTintColor="#007AFF"
        />
      </View>

      <View style={styles.drawerFooter}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

export default function MainLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: '#FFFFFF',
            width: 280,
          },
        }}
      >
        <Drawer.Screen name="(tabs)" />
        <Drawer.Screen name="profile" />
        <Drawer.Screen name="settings" />
        <Drawer.Screen name="notifications" />
        <Drawer.Screen name="payments" />
        <Drawer.Screen name="help" />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#F8F9FF',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userType: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  drawerSection: {
    flex: 1,
    paddingTop: 16,
  },
  drawerLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginLeft: -16,
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FF3B30',
    marginLeft: 12,
  },
});