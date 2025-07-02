import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Search,
  Filter,
  Truck,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Fuel,
  User,
  Phone
} from 'lucide-react-native';

export default function FleetScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const fleetData = [
    {
      id: 'TK-001',
      driver: 'Ahmad Khan',
      phone: '+92 300 1234567',
      vehicle: 'Suzuki Carry',
      capacity: '6000L',
      status: 'Active',
      location: 'Gulshan-e-Iqbal',
      eta: '15 mins',
      fuelLevel: 85,
      orders: 3,
    },
    {
      id: 'TK-002',
      driver: 'Ali Hassan',
      phone: '+92 301 2345678',
      vehicle: 'Isuzu Elf',
      capacity: '3500L',
      status: 'Maintenance',
      location: 'Workshop',
      eta: '-',
      fuelLevel: 45,
      orders: 0,
    },
    {
      id: 'TK-003',
      driver: 'Muhammad Tariq',
      phone: '+92 302 3456789',
      vehicle: 'Suzuki Carry',
      capacity: '6000L',
      status: 'Available',
      location: 'Defense',
      eta: '8 mins',
      fuelLevel: 92,
      orders: 1,
    },
    {
      id: 'TK-004',
      driver: 'Saqib Ahmed',
      phone: '+92 303 4567890',
      vehicle: 'Hiace Van',
      capacity: '20L Bottles',
      status: 'Offline',
      location: 'Unknown',
      eta: '-',
      fuelLevel: 0,
      orders: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return '#28A745';
      case 'Available':
        return '#007AFF';
      case 'Maintenance':
        return '#FF6B35';
      case 'Offline':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle size={16} color="#28A745" />;
      case 'Available':
        return <Clock size={16} color="#007AFF" />;
      case 'Maintenance':
        return <AlertCircle size={16} color="#FF6B35" />;
      case 'Offline':
        return <AlertCircle size={16} color="#6B7280" />;
      default:
        return <Clock size={16} color="#6B7280" />;
    }
  };

  const filteredFleet = fleetData.filter(vehicle => {
    const matchesSearch = vehicle.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || vehicle.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const FleetCard = ({ vehicle }: { vehicle: any }) => (
    <View style={styles.fleetCard}>
      <View style={styles.fleetHeader}>
        <View style={styles.vehicleInfo}>
          <Text style={styles.vehicleId}>{vehicle.id}</Text>
          <Text style={styles.vehicleType}>{vehicle.vehicle} • {vehicle.capacity}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(vehicle.status) + '20' }]}>
          {getStatusIcon(vehicle.status)}
          <Text style={[styles.statusText, { color: getStatusColor(vehicle.status) }]}>
            {vehicle.status}
          </Text>
        </View>
      </View>

      <View style={styles.driverInfo}>
        <View style={styles.driverAvatar}>
          <User size={20} color="#007AFF" />
        </View>
        <View style={styles.driverDetails}>
          <Text style={styles.driverName}>{vehicle.driver}</Text>
          <Text style={styles.driverPhone}>{vehicle.phone}</Text>
        </View>
        <TouchableOpacity style={styles.callButton}>
          <Phone size={16} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.vehicleStats}>
        <View style={styles.statItem}>
          <MapPin size={16} color="#6B7280" />
          <Text style={styles.statText}>{vehicle.location}</Text>
        </View>
        <View style={styles.statItem}>
          <Clock size={16} color="#6B7280" />
          <Text style={styles.statText}>ETA: {vehicle.eta}</Text>
        </View>
        <View style={styles.statItem}>
          <Fuel size={16} color="#6B7280" />
          <Text style={styles.statText}>Fuel: {vehicle.fuelLevel}%</Text>
        </View>
      </View>

      <View style={styles.ordersInfo}>
        <Text style={styles.ordersText}>Active Orders: {vehicle.orders}</Text>
        <TouchableOpacity style={styles.assignButton}>
          <Text style={styles.assignButtonText}>Assign Order</Text>
        </TouchableOpacity>
      </View>
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
          <Text style={styles.headerTitle}>Fleet Management</Text>
          <Text style={styles.headerSubtitle}>{fleetData.length} vehicles</Text>
        </View>
      </LinearGradient>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search vehicles or drivers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabs}>
        {['all', 'active', 'available', 'maintenance', 'offline'].map((status) => (
          <TouchableOpacity
            key={status}
            style={[styles.filterTab, filterStatus === status && styles.activeFilterTab]}
            onPress={() => setFilterStatus(status)}
          >
            <Text style={[
              styles.filterTabText,
              filterStatus === status && styles.activeFilterTabText
            ]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Fleet List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredFleet.map((vehicle) => (
          <FleetCard key={vehicle.id} vehicle={vehicle} />
        ))}
        {filteredFleet.length === 0 && (
          <View style={styles.emptyState}>
            <Truck size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No Vehicles Found</Text>
            <Text style={styles.emptyText}>
              {searchQuery ? 'Try adjusting your search criteria' : 'No vehicles match the selected filter'}
            </Text>
          </View>
        )}
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -10,
    marginBottom: 16,
    gap: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    marginLeft: 12,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  filterTabs: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activeFilterTab: {
    backgroundColor: '#007AFF',
  },
  filterTabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  fleetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  fleetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleId: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  vehicleType: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  driverPhone: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  callButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  ordersInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  ordersText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
  },
  assignButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  assignButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
});