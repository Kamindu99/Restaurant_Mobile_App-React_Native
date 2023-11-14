import {
  Button,
  HStack,
  Input,
  NativeBaseProvider,
  VStack,
  Icon,
  Text,
  useToast,
  View,
  ScrollView,
  Heading,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { RefreshControl } from "react-native";

//Alert Box
import AlertBox from "../../components/AlertBox";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddInquiryScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [inq, setInq] = useState("");
  const [userId, setUserId] = useState("");

  const toast = useToast();
  const isFocused = useIsFocused();

  //validation
  const [errorName, setErrorName] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorInq, setErrorInq] = useState(false);

  useEffect(() => {
    if (isFocused) {


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
    
  }, [isFocused]);


  const handleNameChange = (value) => {
    setErrorName(false);
    setName(value);
  };

  const handlePhoneChange = (value) => {
    setErrorPhone(false);
    setPhone(value);
  };

  const handleEmailChange = (value) => {
    setErrorEmail(false);
    setEmail(value);
  };

  const handleInqChange = (value) => {
    setErrorInq(false);
    setInq(value);
  };

  const addInquiry = async () => {
    try {
      if (name === "") {
        setErrorName("Please enter your name");
      }
      if (inq === "") {
        setErrorInq("Please enter your inquiry");
      }
      if (email === "") {
        setErrorEmail("Please enter a valid email");
      }
      if (phone === "" || phone.length < 10) {
        setErrorPhone("Please enter a valid phone number");
      } else {
        const newInquiry = {
          name,
          phone,
          email,
          inq,
          userid: userId,
        };
        await axios.post("inquiry/add", newInquiry).then((res) => {
          console.log(res.data);
        });
        setEmail('')
        setName('')
        setPhone('')
        setInq('')
        toast.show({
          placement: "top",
          render: () => (
            <AlertBox
              status="success"
              title="Inquiry Added Successfully"
              description="Your Inquiry has been added successfully"
            />
          ),
        });
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const reset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setInq("");
  };

  return (
    <NativeBaseProvider>
      <ScrollView>
      
        <VStack space={4} w="75%" maxW="300px" mx="auto" mt={10}>
        <Heading  mb={5}>Add New Inquiry</Heading>
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Enter Your Name
            </Text>
            <Input
              variant={"outline"}
              placeholder="Name"
              value={name}
              size="lg"
              mt={2}
              onChangeText={handleNameChange}
            />

            {errorName && (
              <View mt={2}>
                <HStack>
                  <Text style={{ color: "red" }}>Please enter your name </Text>
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

          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Enter Your Phone
            </Text>
            <Input
              variant={"outline"}
              placeholder="Phone"
              value={phone}
              size="lg"
              mt={2}
              onChangeText={handlePhoneChange}
              keyboardType="numeric"
            />

            {errorPhone && (
              <View mt={2}>
                <HStack>
                  <Text style={{ color: "red" }}>
                    Please enter a valid phone number{" "}
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

          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Enter Your Email
            </Text>
            <Input
              variant={"outline"}
              placeholder="Email"
              value={email}
              size="lg"
              mt={2}
              onChangeText={handleEmailChange}
            />

            {errorEmail && (
              <View mt={2}>
                <HStack>
                  <Text style={{ color: "red" }}>
                    Please enter a valid email{" "}
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

          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Enter Your Inquiry
            </Text>
            <Input
              variant={"outline"}
              placeholder="Inquiry"
              value={inq}
              size="lg"
              mt={2}
              onChangeText={handleInqChange}
            />

            {errorInq && (
              <View mt={2}>
                <HStack>
                  <Text style={{ color: "red" }}>
                    Please enter your inquiry{" "}
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

          <HStack space={7} mt={3}>
            <Button
              w={135}
              variant="solid"
              colorScheme="green"
              startIcon={<Icon as={Ionicons} name="add-outline" size="sm" />}
              onPress={() => addInquiry()}
            >
              Add Inquiry
            </Button>
            <Button
              w={135}
              variant="solid"
              colorScheme="red"
              startIcon={<Icon as={Ionicons} name="close-outline" size="sm" />}
              onPress={reset}
            >
              Reset Details
            </Button>
          </HStack>
        </VStack>

        {/* <Button
          style={{ width: 350, marginLeft: 30, marginTop: 15 }}
          variant="solid"
          colorScheme="lightBlue"
          startIcon={<Icon as={Ionicons} name="open-outline" size="sm" />}
          onPress={() => navigation.navigate("MyInquiry Screen")}
        >
          My Inquiries
        </Button> */}
      </ScrollView>
    </NativeBaseProvider>
  );
};
export default AddInquiryScreen;
