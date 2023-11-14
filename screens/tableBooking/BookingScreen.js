import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Icon,
  Input,
  useToast,
  Stack,
  WarningOutlineIcon,
  Alert,
  VStack,
  HStack,
  Heading,
} from "native-base";
import {  Pressable } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from "@expo/vector-icons";
import AlertBox from "../../components/AlertBox";
import { Text, View } from "native-base";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingScreen = ({ navigation, route }) => {
  const id = route.params.id;

  const [name, setName] = useState("");

  const [tabletype, setTabletype] = useState("");
  const [userId, setUserId] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");

  const toast = useToast();

  const [errorName, setErrorName] = useState(false);

  const [errorUserId, setErrorUserId] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  const [errorTime, setErrorTime] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const isFocused = useIsFocused();

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (selectedTime) => {
    const selectedDate = new Date(selectedTime);
    const selectedHours = selectedDate.getHours();

    if (selectedHours >= 9 && selectedHours < 22) {
      const formattedTime = selectedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(formattedTime);
      setErrorTime(false);
      hideTimePicker();
    } else {
      hideTimePicker();
      toast.show({
        placement: "top",
        render: () => {
          return (
            <AlertBox
              status="danger"
              title="Select a Valid Time"
              description="Restaurant Opens at 9:00 AM and Closes at 10:00 PM"
            />
          );
        },
      });
    }
  };

  // const handleTimeConfirm = (selectedTime) => {
  //   const selectedDate = new Date(selectedTime);
  //   const selectedHours = selectedDate.getHours();

  //   if (selectedHours > 9 && selectedHours < 22) {
  //     const formattedTime = selectedDate.toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     });
  //     setTime(formattedTime);
  //     hideDatePicker();
  //   } else {
  //     hideTimePicker();
  //     alert("The Restaurant Opens at 9:00 AM and Closes at 10:00 PM");
  //   }
  // };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const converteddate = date.toLocaleDateString();
    setDate(converteddate);
    setErrorDate(false);
    hideDatePicker();
  };

  useEffect(() => {
    if (isFocused) {
      loadTabledata(id);

      AsyncStorage.getItem('userId').then((user) => {
        if (user) {
         
          console.log(user)
          setUserId(user)
  
        } else {
          navigation.navigate("login")
          
        
        }
  
      }
      )




    }
    
  }, []);

  const loadTabledata = (id) => {
    axios.get(`table/${id}`).then((res) => {
      setTabletype(res.data.name);
      setName("userName");
      console.log(name);
    });
  };

  const handlePhoneChange = (value) => {
    setErrorPhone(false);
    setPhone(value);
  };

  const minimumTime = new Date();
  minimumTime.setHours(9, 0, 0, 0); // Set minimum time to 9:00 AM
  const maximumTime = new Date();
  maximumTime.setHours(17, 0, 0, 0); // Set maximum time to 5:00 PM

  const bookTable = () => {
    let hasError = false;
    if (date === "") {
      setErrorDate("Please Select a Date");
      hasError = true;
    }
    if (time === "") {
      setErrorTime("Please Select a Time");
      hasError = true;
    }
    if (phone === "" || phone.length < 10) {
      setErrorPhone("Please Enter a Valid Phone Number");
      hasError = true;
    } 
    
    if (!hasError) {
  
      const data = {
        name,
        tableId: id,
        tabletype,
        userid: userId,
        date,
        time,
        phone,
      };
      console.log(data);
      axios.post("tablebooking/add", data).then((res) => {
        console.log(res.data);
      });
      toast.show({
        placement: "top",

        render: () => (
          <AlertBox
            status="success"
            title="Table Booked Successfully"
            description="Your Table has been Booked Successfully & See you Soon !!!"
          />
        ),
      });
      navigation.navigate("Home");
    }
  };

  return (
    <Stack space={4} w="75%" maxW="300px" mx="auto" mt={3}>
      <Heading>Book {tabletype}</Heading>


    <View mt={3}>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>Table Type</Text>

      <Input
        variant="outline"
        placeholder="Table Type"
        value={tabletype}
        disabled={true}
        mt={2}
        size="lg"
      />
    </View>

    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>Date</Text>
      <Input
        variant="outline"
        placeholder="Date"
        value={date}
        size="lg"
        mt={2}
        InputRightElement={
          <Button
            rounded="xs"
            w="2/6"
            h="full"
            onPress={showDatePicker}
            colorScheme="orange"
          >
            <Ionicons name="calendar" size={24} color="white" />
          </Button>
        }
      />

      {errorDate && (
        <View mt={2}>
          <HStack 
          >
        <Text style={{ color: "red" }}>
          Please Select a Date{" "}
        </Text>
        <Icon
            style={{ color: "red" }}
            as={Ionicons}
            name="alert-circle-outline"
            size="sm"
          />
          </HStack>
      </View>
      )}



      


      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        backdropStyleIOS={{ backgroundColor: "red" }}
        cancelTextIOS="Cancel"
        minimumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      
      </View>


      <View >
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>Time</Text>

      <Input
        variant="outline"
        placeholder="Time"
        value={time}
        size="lg"
        mt={2}
        InputRightElement={
          <Button
            rounded="xs"
            w="2/6"
            h="full"
            onPress={showTimePicker}
            colorScheme="orange"
          >
            <Ionicons name="time" size={24} color="white" />
          </Button>
        }
      />

{errorTime && (
        <View mt={2}>
          <HStack 
          >
        <Text style={{ color: "red" }}>
          Please Select a Time{" "}
        </Text>
        <Icon
            style={{ color: "red" }}
            as={Ionicons}
            name="alert-circle-outline"
            size="sm"
          />
          </HStack>
      </View>
      )}

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
        minimumDate={minimumTime}
        maximumDate={maximumTime}
      />
      </View>

      <View>

      <Text style={{ fontSize: 15, fontWeight: "bold" }}>Phone Number</Text>

      <Input
        variant="outline"
        placeholder="Phone"
        value={phone}
        size="lg"
        mt={2}
        onChangeText={handlePhoneChange}
        keyboardType="numeric"
      />
     {errorPhone && (
        <View mt={2}>
          <HStack 
          >
        <Text style={{ color: "red" }}>
          Please Enter a valid Phone Number{" "}
        </Text>
        <Icon
            style={{ color: "red" }}
            as={Ionicons}
            name="alert-circle-outline"
            size="sm"
          />
          </HStack>
      </View>
      )}
      </View>

      <Button colorScheme="orange" size="lg" onPress={() => bookTable()}>
        Add Table
      </Button>
    </Stack>
  );
};

export default BookingScreen;
