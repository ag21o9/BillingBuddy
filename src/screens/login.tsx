import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Eye, EyeOff, Lock, User } from "lucide-react-native";
import * as ScreenOrientation from "expo-screen-orientation";

const Login = ({ navigation }) => {
  useEffect(() => {
    // Use useEffect to set orientation when the component mounts
    const setPortraitOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        );
      } catch (error) {
        console.error("Failed to set portrait orientation", error);
      }
    };

    setPortraitOrientation();

    // Optional: Clean up orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // Validate input fields are not empty
    if (!formData.username || !formData.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Simulate authentication with dummy credentials
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check for specific dummy credentials
    if (
      formData.username.toLowerCase() === "abc@gmail.com" &&
      formData.password === "12345"
    ) {
      // Successful login
      setIsLoading(false);
      navigation.navigate("BusinessTypeSelection");
    } else {
      // Failed login
      setIsLoading(false);
      Alert.alert(
        "Login Failed",
        "Incorrect username or password. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Please sign in to continue</Text>

      <View style={styles.inputContainer}>
        <User style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={formData.username}
          onChangeText={(text) => handleChange("username", text)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Lock style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </TouchableOpacity>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.checkbox}>
          <Text style={styles.checkboxText}>Remember me</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don't have an account?{" "}
        <Text style={styles.signupLink} onPress={() => navigation.navigate("")}>
          Sign up
        </Text>
      </Text>

      {/* Hint for testing */}
      {/* <View style={styles.hintContainer}>
        <Text style={styles.hintText}>
          Test Credentials:
        </Text>
        <Text style={styles.credentialsText}>
          Username: abc@gmail.com
          Password: 12345
        </Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 50,
    width: "100%",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
  },
  icon: {
    marginRight: 10,
    color: "#9CA3AF",
  },
  eyeIcon: {
    marginLeft: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    fontSize: 14,
    color: "#6B7280",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#10B981",
  },
  button: {
    backgroundColor: "#10B981",
    borderRadius: 8,
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  signupText: {
    marginTop: 20,
    fontSize: 14,
    color: "#6B7280",
  },
  signupLink: {
    color: "#10B981",
    fontWeight: "bold",
  },
});

export default Login;
