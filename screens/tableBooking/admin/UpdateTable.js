import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  Stack,
  useToast,
  WarningOutlineIcon,
} from "native-base";
import AlertBox from "../../../components/AlertBox";

export default function UpdateTable({ navigation, route }) {
  const { id } = route.params;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState("");
  const [image, setImage] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorUsers, setErrorUsers] = useState("");
  const [errorImage, setErrorImage] = useState("");

  const toast = useToast();

  const getTable = async () => {
    await axios.get(`table/${id}`).then((res) => {
      setName(res.data.name);
      setDescription(res.data.description);
      setUsers(res.data.users);
      setImage(res.data.image);
    });
  };

  useEffect(() => {
    getTable();
  }, []);

  const handleNameChange = (value) => {
   
    setErrorName(false);
    setName(value);
  };
  const handleDescriptionChange = (value) => {
    
    setErrorDescription(false);
    setDescription(value);
  };
  const handleUsersChange = (value) => {
    
    setErrorUsers(false);
    setUsers(value);
  };
  const handleImageChange = (value) => {
   
    setErrorImage(false);
    setImage(value);
  };

  const UpdateTable = async () => {
    try {
      let hasError = false;

      if (name === "") {
        setErrorName("Please Enter a Table Type Name");
        hasError = true;
      }
      if (description === "") {
        setErrorDescription("Please Enter a Table Description");
        hasError = true;
      }
      if (users === "") {
        setErrorUsers("Please Enter a Table User Amount");
        hasError = true;
      }
      if (image === "") {
        setErrorImage("Please Enter a Image URL");
        hasError = true;
      } 

      if (!hasError) {
      
        const data = {
          name,
          description,
          users,
          image,
        };
        await axios.put(`table/${id}`, data);

        toast.show({
          placement: "top",
          render: () => {
            return (
              <AlertBox
                title="Table Details Updated"
                description="Table Details has been updated successfully"
                status="success"
              />
            );
          },
        });
        console.log(data);

        navigation.navigate("Table List");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack space={4} w="75%" maxW="300px" mx="auto" mt={3}>
      <Heading>Update Table Details</Heading>

      <View>

<Text style={{ fontSize: 15, fontWeight: "bold" }}>Table Type Name</Text>

<Input
  variant="outline"
  placeholder="Table Type Name"
  value={name}
  size="lg"
  mt={2}
  mb={1}
  onChangeText={handleNameChange}
  
/>
{errorName && (
  <View mt={2}>
    <HStack 
    >
  <Text style={{ color: "red" }}>
    Please Enter a Table Type {" "}
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

<Text style={{ fontSize: 15, fontWeight: "bold" }}>Detailed Description</Text>

<Input
  variant="outline"
  placeholder="Description"
  value={description}
  size="lg"
  mt={2}
  mb={1}
  onChangeText={handleDescriptionChange}
  
/>
{errorDescription && (
  <View mt={2}>
    <HStack 
    >
  <Text style={{ color: "red" }}>
    Please Enter a Description {" "}
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

<Text style={{ fontSize: 15, fontWeight: "bold" }}>User Limit at a Time</Text>

<Input
  variant="outline"
  placeholder="User Limit"
  value={users}
  size="lg"
  mt={2}
  mb={1}
  onChangeText={handleUsersChange}
  keyboardType="numeric"
  
/>
{errorUsers && (
  <View mt={2}>
    <HStack 
    >
  <Text style={{ color: "red" }}>
    Please Enter Users Limit {" "}
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

<Text style={{ fontSize: 15, fontWeight: "bold" }}>Image URL</Text>

<Input
  variant="outline"
  placeholder="Image URL"
  value={image}
  size="lg"
  mt={2}
  mb={1}
  onChangeText={handleImageChange}
  
/>
{errorImage && (
  <View mt={2}>
    <HStack 
    >
  <Text style={{ color: "red" }}>
    Please Enter an Image URL {" "}
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

      <Button colorScheme="orange" size="lg" onPress={() => UpdateTable()}>
        Update Table Details
      </Button>
    </Stack>
  );
}
