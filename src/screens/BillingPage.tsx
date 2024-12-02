import React, { useState, useEffect } from "react";

// Mock Data
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
  // Other categories here...
};

const BillingPage = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("Main Courses");
  const [billItems, setBillItems] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Update date and time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Filter menu items based on search term
  const filteredMenuItems = MENU_ITEMS[selectedCategory]?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add item to bill
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

  // Calculate totals
  const calculateTotal = () =>
    billItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const calculateTotals = () => ({
    totalItems: billItems.length,
    totalQuantity: billItems.reduce((sum, item) => sum + item.quantity, 0),
  });

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-white p-4 shadow-md">
        <div className="text-gray-600">
          {currentDateTime.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">v1.0.0</span>
          <button className="text-red-500 hover:bg-red-50 p-2 rounded">
            Logout
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-grow overflow-hidden">
        {/* Categories Sidebar */}
        <div className="w-1/5 bg-white shadow-md p-4 overflow-y-auto">
          {MENU_CATEGORIES.map((category) => (
            <button
              key={category}
              className={`block w-full text-left p-2 mb-2 rounded ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Section */}
        <div className="flex-grow bg-white p-4 overflow-y-auto">
          <div className="flex mb-4 space-x-2">
            <input
              type="text"
              placeholder="Search by Name or Code"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {filteredMenuItems?.map((item) => (
              <div
                key={item.id}
                className="p-4 border rounded hover:shadow cursor-pointer"
                onClick={() => addItemToBill(item)}
              >
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Section */}
        <div className="w-2/5 bg-gray-50 p-4">
          <h2 className="text-lg font-bold mb-2">Bill Details</h2>
          <table className="w-full mb-4">
            <thead>
              <tr>
                <th className="p-2 text-left">Item</th>
                <th className="p-2">Price</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {billItems.map((item) => (
                <tr key={item.id}>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">₹{item.price.toFixed(2)}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right">
            <p>Total: ₹{calculateTotal().toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};



export default BillingPage;