import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';

const MENU_CATEGORIES = [
  "Main Courses",
  "Starters",
  "Beverages",
  "Desserts",
  "Soups",
  "Salads",
  "Appetizers",
  "Grilled Items",
  "Sandwiches",
  "Breakfast Items",
  "Seafood",
  "Pasta & Noodles",
];

const MENU_ITEMS = {
  "Main Courses": [
    { id: 1, name: "Butter Chicken", price: 250.0, code: "MC001" },
    { id: 2, name: "Paneer Tikka Masala", price: 220.0, code: "MC002" },
    { id: 3, name: "Dal Makhani", price: 180.0, code: "MC003" },
  ],
  "Starters": [
    { id: 4, name: "Crispy Vegetables", price: 180.0, code: "ST001" },
    { id: 5, name: "Cheese Balls", price: 160.0, code: "ST002" },
    { id: 6, name: "Chicken Tikka", price: 200.0, code: "ST003" },
  ],
  "Beverages": [
    { id: 7, name: "Coca-Cola", price: 40.0, code: "BEV001" },
    { id: 8, name: "Pepsi", price: 40.0, code: "BEV002" },
    { id: 9, name: "Lemonade", price: 60.0, code: "BEV003" },
  ],
  "Desserts": [
    { id: 10, name: "Gulab Jamun", price: 80.0, code: "DES001" },
    { id: 11, name: "Rasgulla", price: 60.0, code: "DES002" },
    { id: 12, name: "Ice Cream", price: 100.0, code: "DES003" },
  ],
  "Soups": [
    { id: 13, name: "Tomato Soup", price: 90.0, code: "SOU001" },
    { id: 14, name: "Sweet Corn Soup", price: 100.0, code: "SOU002" },
    { id: 15, name: "Chicken Soup", price: 120.0, code: "SOU003" },
    { id: 15, name: "Chicken Soup", price: 120.0, code: "SOU003" },
    { id: 15, name: "Chicken Soup", price: 120.0, code: "SOU003" },
  ],
  "Salads": [
    { id: 16, name: "Caesar Salad", price: 150.0, code: "SAL001" },
    { id: 17, name: "Greek Salad", price: 140.0, code: "SAL002" },
    { id: 18, name: "Caprese Salad", price: 160.0, code: "SAL003" },
  ],
  "Appetizers": [
    { id: 19, name: "Nachos", price: 120.0, code: "APP001" },
    { id: 20, name: "Spring Rolls", price: 100.0, code: "APP002" },
    { id: 21, name: "Chicken Crispy Wings", price: 180.0, code: "APP003" },
  ],
  "Grilled Items": [
    { id: 22, name: "Grilled Chicken", price: 200.0, code: "GRI001" },
    { id: 23, name: "Grilled Fish", price: 220.0, code: "GRI002" },
    { id: 24, name: "Grilled Paneer", price: 180.0, code: "GRI003" },
  ],
  "Sandwiches": [
    { id: 25, name: "Veg Sandwich", price: 100.0, code: "SAN001" },
    { id: 26, name: "Chicken Sandwich", price: 120.0, code: "SAN002" },
    { id: 27, name: "Club Sandwich", price: 140.0, code: "SAN003" },
  ],
};

const BillingPage = ({navigation}) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("Main Courses");
  const [billItems, setBillItems] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isPrintModalVisible, setIsPrintModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // Set up interval to update current date and time
      const timer = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 60000);

      // Cleanup function
      return () => {
        // Clear the interval when the screen loses focus
        clearInterval(timer);
      };
    }, []) // Empty dependency array means this effect runs once when the screen comes into focus
  );

  const filteredMenuItems = MENU_ITEMS[selectedCategory]?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addItemToBill = (item) => {
    const existingItemIndex = billItems.findIndex(
      (billItem) => billItem.id === item.id
    );
    if (existingItemIndex > -1) {
      const updatedBillItems = [...billItems];
      updatedBillItems[existingItemIndex].quantity += 1;
      setBillItems(updatedBillItems);
    } else {
      setBillItems([...billItems, { ...item, quantity: 1 }]);
    }
  };

  const updateItemQuantity = (itemId, change) => {
    const updatedBillItems = billItems.map((item) => 
      item.id === itemId 
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0);
    
    setBillItems(updatedBillItems);
  };

  const calculateTotal = () =>
    billItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePrint = () => {
    // In a real app, you would implement actual printing logic
    Alert.alert(
      "Print Bill",
      `Total Amount: ₹${calculateTotal().toFixed(2)}\nTable: ${tableNumber}\nCaptain: ${captainName}`,
      [
        {
          text: "Close",
          style: "cancel"
        },
        {
          text: "Confirm Print",
          onPress: () => {
            // Implement actual printing logic here
            Alert.alert("Bill Printed", "Your bill has been processed.");
            // Reset bill after printing
            setBillItems([]);
            setTableNumber("");
            setCaptainName("");
          }
        }
      ]
    );
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => addItemToBill(item)}
    >
      <View style={styles.menuItemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderBillItem = ({ item }) => (
    <View style={styles.billRow}>
      <Text style={styles.billText} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.billText}>₹{item.price.toFixed(2)}</Text>
      <View style={styles.quantityControl}>
        <TouchableOpacity 
          onPress={() => updateItemQuantity(item.id, -1)}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity 
          onPress={() => updateItemQuantity(item.id, 1)}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.billText}>₹{(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.dateText}>
            {currentDateTime.toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </Text>
        </View>
        <View style={styles.headerInputs}>
          <TextInput
            style={styles.inputField}
            placeholder="Table Number"
            value={tableNumber}
            onChangeText={setTableNumber}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Captain Name"
            value={captainName}
            onChangeText={setCaptainName}
          />
        </View>
        <TouchableOpacity style={styles.logoutButton}  onPress={() => navigation.navigate('Login')}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Categories */}
        <ScrollView style={styles.categoryList}>
          {MENU_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Name or Code"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <FlatList
            data={filteredMenuItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
          />
        </View>

        {/* Billing Section */}
        <View style={styles.billSection}>
          <Text style={styles.billTitle}>Bill Details</Text>
          <View style={styles.billHeader}>
            <Text style={styles.billText}>Item</Text>
            <Text style={styles.billText}>Price</Text>
            <Text style={styles.billText}>Qty</Text>
            <Text style={styles.billText}>Total</Text>
          </View>
          <FlatList
            data={billItems}
            renderItem={renderBillItem}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
              <View style={styles.emptyBillContainer}>
                <Text style={styles.emptyBillText}>No items added yet</Text>
              </View>
            }
          />
          <View style={styles.billSummary}>
            <Text style={styles.totalText}>Total: ₹{calculateTotal().toFixed(2)}</Text>
            <TouchableOpacity 
              style={styles.printButton}
              onPress={handlePrint}
              disabled={billItems.length === 0}
            >
              <Text style={styles.printButtonText}>Print Bill</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "rgba(255,255,255,0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerInputs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    width: 150,
  },
  dateText: { 
    fontSize: 16, 
    color: "#555",
    fontWeight: "600"
  },
  logoutButton: { 
    padding: 10, 
    backgroundColor: "#dc3545", 
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoutText: { 
    color: "#fff", 
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  content: { 
    flex: 1, 
    flexDirection: "row",
    padding: 10,
  },
  categoryList: { 
    width: 10,
    backgroundColor: "#fff", 
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryButton: { 
    padding: 12, 
    marginBottom: 8, 
    borderRadius: 8, 
    backgroundColor: "#f8f9fa",
  },
  categoryButtonActive: { 
    backgroundColor: "#007bff",
    shadowColor: "#007bff",
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  categoryText: { 
    color: "#333",
    textAlign: "center",
    fontWeight: "600"
  },
  categoryTextActive: { 
    color: "#fff", 
    fontWeight: "bold" 
  },
  menuSection: { 
    flex: 1, 
    padding: 3 
  },
  searchInput: { 
    borderWidth: 1, 
    borderColor: "#ddd", 
    borderRadius: 8, 
    marginBottom: 10, 
    padding: 10,
    backgroundColor: "#fff"
  },
  menuItem: { 
    width: 100,
    flex: 1,
    padding: 5, 
    backgroundColor: "#fff", 
    borderRadius: 10, 
    marginBottom: 10,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemContent: {
    flexDirection: 'reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%",
  },
  itemName: { 
    fontSize: 16, 
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  itemPrice: { 
    color: "#007bff",
    fontWeight: "600"
  },
  billSection: { 
    width: "40%", 
    backgroundColor: "#fff", 
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  billTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 10,
    color: "#333"
  },
  billHeader: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  billRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f5"
  },
  billText: { 
    flex: 1, 
    textAlign: "center",
    fontWeight: "500"
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    padding: 5,
    backgroundColor: '#f1f3f5',
    borderRadius: 5,
  },
  quantityButtonText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quantityText: {
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  billSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  totalText: { 
    textAlign: "right", 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#007bff"
  },
  printButton: {
    flexDirection: 'row',
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  printButtonText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  emptyBillContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyBillText: {
    color: '#6c757d',
    fontStyle: 'italic',
  }
});

export default BillingPage;
