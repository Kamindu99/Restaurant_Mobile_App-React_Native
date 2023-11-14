import {
  Button,
  HStack,
  Input,
  NativeBaseProvider,
  VStack,
  Icon,
  Text,
  View,
  useToast,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet } from "react-native";

//Alert Box
import AlertBox from "../../components/AlertBox";

const EditInquiryScreen = ({ navigation, route }) => {
  const id = route.params.id;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [inq, setInq] = useState("");

  const toast = useToast();

  useEffect(() => {
    axios.get(`inquiry/${id}`).then((res) => {
      console.log(res.data);
      setName(res.data.name);
      setPhone(res.data.phone);
      setEmail(res.data.email);
      setInq(res.data.inq);
    });
  }, []);

  const editInquiry = async (id) => {
    try {
      const updatedInquiry = {
        name: name,
        phone: phone,
        email: email,
        inq: inq,
      };
      await axios.put(`inquiry/${id}`, updatedInquiry).then((res) => {
        console.log(res.updatedInquiry);
      });
      console.log(updatedInquiry);
      toast.show({
        placement: "top",
        render: () => (
          <AlertBox
            title="Inquiry Updated Successfully"
            description="Your Inquiry has been updated successfully"
            status="success"
          />
        ),
      });

      await axios.get("inquiry/");

      navigation.navigate("Home");
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
      <VStack space={4} w="75%" maxW="300px" mx="auto" mt={10}>
        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Your Name</Text>
          <Input
            variant={"outline"}
            placeholder="Name"
            onChangeText={(e) => setName(e)}
            value={name}
            size="lg"
            mt={2}
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Your Phone</Text>
          <Input
            variant={"outline"}
            placeholder="Phone"
            onChangeText={(e) => setPhone(e)}
            value={phone}
            size="lg"
            mt={2}
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Your Email</Text>
          <Input
            variant={"outline"}
            placeholder="Email"
            onChangeText={(e) => setEmail(e)}
            value={email}
            size="lg"
            mt={2}
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Your Inquiry</Text>
          <Input
            variant={"outline"}
            placeholder="Inquiry"
            onChangeText={(e) => setInq(e)}
            value={inq}
            size="lg"
            mt={2}
          />
        </View>

        <HStack space={7} mt={3}>
          <Button
            w={135}
            variant="solid"
            colorScheme="green"
            startIcon={<Icon as={Ionicons} name="pencil-outline" size="sm" />}
            onPress={() => editInquiry(id)}
          >
            Edit Inquiry
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
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({});

export default EditInquiryScreen;
