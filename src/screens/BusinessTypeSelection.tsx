import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

const BusinessTypeSelection = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState('');

  const businessTypes = [
    {
      type: 'Restaurant',
      description: 'For cafes, restaurants, and food service businesses',
    },
    {
      type: 'Supermarket',
      description: 'For large retail stores with multiple departments',
    },
    {
      type: 'Grocery',
      description: 'For local grocery stores and food markets',
    },
    {
      type: 'General Store',
      description: 'For convenience stores and general merchandise',
    },
    {
      type: 'Retail',
      description: 'For specialty retail and boutique shops',
    },
  ];

  const handleNext = () => {
    if (!selectedType) {
      Alert.alert('Error', 'Please select a business type');
      return;
    }
    console.log(`Selected Business Type: ${selectedType}`);
    navigation.navigate('BasicDetails');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Your Business Type</Text>
      <Text style={styles.subtitle}>
        Choose the category that best describes your business
      </Text>

      <View style={styles.grid}>
        {businessTypes.map((business) => {
          return (
            <TouchableOpacity
              key={business.type}
              onPress={() => setSelectedType(business.type)}
              style={[
                styles.card,
                selectedType === business.type && styles.cardSelected,
              ]}
            >
              <View
                style={[
                  styles.iconContainer,
                  selectedType === business.type
                    ? styles.iconSelected
                    : styles.iconDefault,
                ]}
              >
                <Text style={styles.iconPlaceholder}>{business.type[0]}</Text>
              </View>
              <Text style={styles.cardTitle}>{business.type}</Text>
              <Text style={styles.cardDescription}>
                {business.description}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        onPress={handleNext}
        disabled={!selectedType}
        style={[
          styles.nextButton,
          !selectedType && styles.nextButtonDisabled,
        ]}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ECFDF5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#065F46',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#065F46',
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1FAE5',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  cardSelected: {
    backgroundColor: '#CCFBF1',
    borderColor: '#10B981',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconDefault: {
    backgroundColor: '#10B981',
  },
  iconSelected: {
    backgroundColor: '#065F46',
  },
  iconPlaceholder: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#065F46',
    marginBottom: 5,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 12,
    color: '#065F46',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#D1FAE5',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default BusinessTypeSelection;