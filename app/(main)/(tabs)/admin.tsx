import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  BarChart3,
  Users,
  Truck,
  Droplets,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  MapPin
} from 'lucide-react-native';

export default function AdminScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const dashboardStats = {
    totalOrders: 127,
    totalRevenue: 'Rs. 2,48,500',
    activeDrivers: 8,
    completedOrders: 95,
    pendingOrders: 32,
    averageDeliveryTime: '2.5 hrs',
    customerSatisfaction: '4.8/5',
    tankersActive: 6,
  };

  const recentOrders = [
    {
      id: 'ORD-127',
      customer: 'Ahmed Hassan',
      type: 'Large Tanker',
      status: 'Completed',
      amount: 'Rs. 2,500',
      time: '10 mins ago',
      driver: 'Ahmad Khan',
    },
    {
      id: 'ORD-126',
      customer: 'Fatima Ali',
      type: 'Small Tanker',
      status: 'In Progress',
      amount: 'Rs. 1,800',
      time: '25 mins ago',
      driver: 'Ali Hassan',
    },
    {
      id: 'ORD-125',
      customer: 'Muhammad Tariq',
      type: 'Water Bottles',
      status: 'Dispatched',
      amount: 'Rs. 750',
      time: '45 mins ago',
      driver: 'Saqib Ahmed',
    },
  ];

  const alerts = [
    {
      type: 'warning',
      message: 'Vehicle TK-002 requires maintenance',
      time: '2 hours ago',
    },
    {
      type: 'info',
      message: 'High demand in Gulshan-e-Iqbal area',
      time: '4 hours ago',
    },
    {
      type: 'success',
      message: 'Daily target achieved - 95 orders completed',
      time: '6 hours ago',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return '#28A745';
      case 'In Progress':
        return '#007AFF';
      case 'Dispatched':
        return '#FF6B35';
      default:
        return '#6B7280';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle size={16} color="#FF6B35" />;
      case 'success':
        return <CheckCircle size={16} color="#28A745" />;
      case 'info':
        return <Clock size={16} color="#007AFF" />;
      default:
        return <Clock size={16} color="#6B7280" />;
    }
  };

  const StatCard = ({ title, value, icon, trend, trendValue }: any) => (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <View style={styles.statIcon}>
          {icon}
        </View>
        {trend && (
          <View style={[styles.trendBadge, { backgroundColor: trend === 'up' ? '#28A745' : '#FF3B30' }]}>
            {trend === 'up' ? <TrendingUp size={12} color="#FFFFFF" /> : <TrendingDown size={12} color="#FFFFFF" />}
            <Text style={styles.trendText}>{trendValue}</Text>
          </View>
        )}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#007AFF', '#0056CC']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
          <Text style={styles.headerSubtitle}>Water Distribution Control Center</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {['today', 'week', 'month'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[styles.periodButton, selectedPeriod === period && styles.activePeriodButton]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period && styles.activePeriodButtonText
              ]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Orders"
            value={dashboardStats.totalOrders}
            icon={<Droplets size={20} color="#007AFF" />}
            trend="up"
            trendValue="12%"
          />
          <StatCard
            title="Revenue"
            value={dashboardStats.totalRevenue}
            icon={<DollarSign size={20} color="#28A745" />}
            trend="up"
            trendValue="8%"
          />
          <StatCard
            title="Active Drivers"
            value={dashboardStats.activeDrivers}
            icon={<Users size={20} color="#FF6B35" />}
          />
          <StatCard
            title="Avg Delivery"
            value={dashboardStats.averageDeliveryTime}
            icon={<Clock size={20} color="#9333EA" />}
            trend="down"
            trendValue="15m"
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Users size={24} color="#007AFF" />
              </View>
              <Text style={styles.actionText}>Manage Users</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Truck size={24} color="#28A745" />
              </View>
              <Text style={styles.actionText}>Fleet Status</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <BarChart3 size={24} color="#FF6B35" />
              </View>
              <Text style={styles.actionText}>Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <MapPin size={24} color="#9333EA" />
              </View>
              <Text style={styles.actionText}>Live Map</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.recentOrders}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          {recentOrders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>#{order.id}</Text>
                <View style={[styles.orderStatus, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                  <Text style={[styles.orderStatusText, { color: getStatusColor(order.status) }]}>
                    {order.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.customerName}>{order.customer}</Text>
              <View style={styles.orderDetails}>
                <Text style={styles.orderType}>{order.type}</Text>
                <Text style={styles.orderAmount}>{order.amount}</Text>
              </View>
              <View style={styles.orderFooter}>
                <Text style={styles.driverName}>Driver: {order.driver}</Text>
                <Text style={styles.orderTime}>{order.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Alerts */}
        <View style={styles.alertsSection}>
          <Text style={styles.sectionTitle}>System Alerts</Text>
          {alerts.map((alert, index) => (
            <View key={index} style={styles.alertCard}>
              <View style={styles.alertIcon}>
                {getAlertIcon(alert.type)}
              </View>
              <View style={styles.alertContent}>
                <Text style={styles.alertMessage}>{alert.message}</Text>
                <Text style={styles.alertTime}>{alert.time}</Text>
              </View>
            </View>
          ))}
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
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    marginTop: -10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activePeriodButton: {
    backgroundColor: '#007AFF',
  },
  periodButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  activePeriodButtonText: {
    color: '#FFFFFF',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  trendText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginLeft: 2,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  quickActions: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
    textAlign: 'center',
  },
  recentOrders: {
    marginBottom: 24,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  orderStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  orderStatusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  customerName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderType: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
  },
  orderAmount: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#28A745',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  driverName: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  orderTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  alertsSection: {
    marginBottom: 24,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  alertIcon: {
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    marginBottom: 4,
  },
  alertTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});