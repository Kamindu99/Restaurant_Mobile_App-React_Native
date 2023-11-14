import axios from "axios";
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
  HStack,
  Heading,
} from "native-base";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from "@expo/vector-icons";
import AlertBox from "../../components/AlertBox";

// import { Container } from './styles';

const UpdateBooking = ({ navigation, route }) => {
  const id = route.params.id;

  const [tabletype, setTabletype] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [errorDate, setErrorDate] = useState(false);
  const [errorTime, setErrorTime] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const toast = useToast();

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
        render: () => {
          return (
            <Box bg="red.600" px="2" py="2" rounded="lg" mb={5}>
              <Text style={{ color: "white" }}>
                Restaurant Opens at 9:00 AM and Closes at 10:00 PM
              </Text>
            </Box>
          );
        },
      });
    }
  };

  const handlePhoneChange = (value) => {
    setErrorPhone(false);
    setPhone(value);
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
    console.log(converteddate);
    console.warn("A date has been picked: ", date);
    setErrorDate(false);
    hideDatePicker();
  };

  useEffect(() => {
    console.log(id);
    axios.get(`tablebooking/${id}`).then((res) => {
      setTabletype(res.data.tabletype);
      setDate(res.data.date);
      setTime(res.data.time);
      setPhone(res.data.phone);

      console.log(res.data);
    });

    console.log(time);
  }, []);

  const minimumTime = new Date();
  minimumTime.setHours(9, 0, 0, 0); // Set minimum time to 9:00 AM
  const maximumTime = new Date();
  maximumTime.setHours(17, 0, 0, 0); // Set maximum time to 5:00 PM

  const updateBooking = async () => {
    try {
      if (date === "") {
        setErrorDate("Please Select a Date");
      }
      if (time === "") {
        setErrorTime("Please Select a Time");
      }
      if (phone === "") {
        setErrorPhone("Please Enter a Phone Number");
      }
      if (date && time && phone) {
        const res = await axios.put(`tablebooking/${id}`, {
          date,
          time,
          phone,
        });

        toast.show({
          placement: "top",
  
          render: () => (
            <AlertBox
              status="success"
              title="Table Reservation Update Successfully"
              description="Your Table Reservation has been Updated Successfully !!!"
            />
          ),
        });



        console.log(res.data);
        // navigation.navigate('Booking')
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack space={4} w="75%" maxW="300px" mx="auto" mt={3}>
    <Heading>Update Your Reservation</Heading>


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

    <Button colorScheme="orange" size="lg" onPress={() => updateBooking()}>
      Update Table
    </Button>
  </Stack>
  );
};

export default UpdateBooking;
