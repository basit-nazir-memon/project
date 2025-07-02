import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Menu, Bell, Droplets, Truck, Clock, TrendingUp, Zap, CircleCheck as CheckCircle, ArrowRight } from 'lucide-react-native';

export default function DashboardScreen() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    Alert.alert(
      'Order Confirmation',
      `You selected ${service}. Would you like to proceed?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Order Now', onPress: () => router.push('/(main)/(tabs)/orders') }
      ]
    );
  };

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const openNotifications = () => {
    router.push('/(main)/notifications');
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#007AFF', '#0056CC']}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={openDrawer}>
            <Menu size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Text style={styles.greeting}>Good Morning!</Text>
            <Text style={styles.userName}>John Doe</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={openNotifications}>
            <Bell size={24} color="#FFFFFF" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Droplets size={20} color="#007AFF" />
            </View>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Tank Level</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Clock size={20} color="#28A745" />
            </View>
            <Text style={styles.statValue}>2 hrs</Text>
            <Text style={styles.statLabel}>Next Refill</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <CheckCircle size={20} color="#FF6B35" />
            </View>
            <Text style={styles.statValue}>15</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        {/* Service Cards */}
        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>Order Water</Text>
          
          <TouchableOpacity
            style={[styles.serviceCard, styles.largeServiceCard]}
            onPress={() => handleServiceSelect('Large Tanker (6000L)')}
          >
            <LinearGradient
              colors={['#007AFF', '#0056CC']}
              style={styles.serviceGradient}
            >
              <View style={styles.serviceContent}>
                <View style={styles.serviceIcon}>
                  <Truck size={32} color="#FFFFFF" />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceTitle}>Large Tanker</Text>
                  <Text style={styles.serviceSubtitle}>6000 Liters</Text>
                  <View style={styles.serviceDetails}>
                    <Text style={styles.servicePrice}>₨ 2,500</Text>
                    <Text style={styles.serviceTime}>• 2-3 hrs</Text>
                  </View>
                </View>
                <ArrowRight size={20} color="#FFFFFF" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.serviceCard, styles.mediumServiceCard]}
            onPress={() => handleServiceSelect('Small Tanker (3500L)')}
          >
            <LinearGradient
              colors={['#28A745', '#1E7E34']}
              style={styles.serviceGradient}
            >
              <View style={styles.serviceContent}>
                <View style={styles.serviceIcon}>
                  <Truck size={28} color="#FFFFFF" />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceTitle}>Small Tanker</Text>
                  <Text style={styles.serviceSubtitle}>3500 Liters</Text>
                  <View style={styles.serviceDetails}>
                    <Text style={styles.servicePrice}>₨ 1,800</Text>
                    <Text style={styles.serviceTime}>• 1-2 hrs</Text>
                  </View>
                </View>
                <ArrowRight size={20} color="#FFFFFF" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.serviceCard, styles.smallServiceCard]}
            onPress={() => handleServiceSelect('20L Water Bottles')}
          >
            <LinearGradient
              colors={['#FF6B35', '#E55B2D']}
              style={styles.serviceGradient}
            >
              <View style={styles.serviceContent}>
                <View style={styles.serviceIcon}>
                  <Droplets size={24} color="#FFFFFF" />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceTitle}>Water Bottles</Text>
                  <Text style={styles.serviceSubtitle}>20L Bottles</Text>
                  <View style={styles.serviceDetails}>
                    <Text style={styles.servicePrice}>₨ 150</Text>
                    <Text style={styles.serviceTime}>• 30 mins</Text>
                  </View>
                </View>
                <ArrowRight size={20} color="#FFFFFF" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Express Delivery */}
        <View style={styles.expressContainer}>
          <TouchableOpacity 
            style={styles.expressCard}
            onPress={() => handleServiceSelect('Express Delivery')}
          >
            <LinearGradient
              colors={['#FFB800', '#FF8C00']}
              style={styles.expressGradient}
            >
              <View style={styles.expressContent}>
                <View style={styles.expressIcon}>
                  <Zap size={24} color="#FFFFFF" />
                </View>
                <View style={styles.expressInfo}>
                  <Text style={styles.expressTitle}>Express Delivery</Text>
                  <Text style={styles.expressSubtitle}>Get water within 1 hour</Text>
                </View>
                <Text style={styles.expressBadge}>+₨50</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Recommendations */}
        <View style={styles.recommendationsContainer}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <View style={styles.recommendationCard}>
            <View style={styles.recommendationIcon}>
              <TrendingUp size={20} color="#007AFF" />
            </View>
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationTitle}>Next Refill Suggestion</Text>
              <Text style={styles.recommendationText}>
                Based on your usage, you'll need a refill on Dec 28, 2024
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  header: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  servicesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  serviceCard: {
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  largeServiceCard: {
    height: 100,
  },
  mediumServiceCard: {
    height: 90,
  },
  smallServiceCard: {
    height: 80,
  },
  serviceGradient: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
  },
  serviceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  serviceIcon: {
    marginRight: 16,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  serviceSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  serviceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  serviceTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 8,
  },
  expressContainer: {
    marginBottom: 24,
  },
  expressCard: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  expressGradient: {
    borderRadius: 16,
    padding: 20,
  },
  expressContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expressIcon: {
    marginRight: 16,
  },
  expressInfo: {
    flex: 1,
  },
  expressTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  expressSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  expressBadge: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  recommendationsContainer: {
    marginBottom: 24,
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  recommendationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 16,
  },
});