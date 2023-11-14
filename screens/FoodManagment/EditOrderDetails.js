import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    useToast, Box, Heading, View, FormControl, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Button, Icon, Input, WarningOutlineIcon, Divider, VStack, IconButton, CloseIcon, Spinner, PresenceTransition, Skeleton, Pressable, AlertDialog, Badge,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from "@expo/vector-icons";

const UpdateOrder = ({ navigation, route }) => {
    const id = route.params.id;

    const [cusname, setCusname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const [errorPhone, setErrorPhone] = useState(false);
    const [errorCusName, setErrorCusName] = useState(false);
    const [errorAddress, setErrorAddress] = useState(false);

    const toast = useToast();

    const handlePhoneChange = (value) => {
        setErrorPhone(false);
        setPhone(value);
    };
    const handleCusnameChange = (value) => {
        setErrorCusName(false);
        setCusname(value);
    };
    const handleAddressChange = (value) => {
        setErrorAddress(false);
        setAddress(value);
    };



    useEffect(() => {
        axios.get(`food-order/${id}`).then((res) => {
            setPhone(res.data.phone);
            setAddress(res.data.address);
            setCusname(res.data.cusname);
        });
    }, []);

    const updateOrder = async () => {
        try {
            if (phone.length < 10) {
                setErrorPhone("Please Enter a Valid Phone Number");
            } if (phone === "") {
                setErrorPhone("is a requeired field");
            } if (cusname === "") {
                setErrorCusName("is a requeired field");
            } if (address === "") {
                setErrorAddress("is a requeired field");
            } if (cusname && address && phone) {
                const res = await axios.put(`food-order/${id}`, {
                    address,
                    cusname,
                    phone,
                });
                console.log(res.data);
                // navigation.navigate('Booking')
                navigation.navigate("Orders List");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Stack space={4} w="75%" maxW="300px" mx="auto" mt={3}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Book</Text>



            <View>

                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Customer Name</Text>

                <Input
                    variant="outline"
                    placeholder="Customer Name"
                    value={cusname}
                    size="lg"
                    mt={2}
                    onChangeText={handleCusnameChange}
                    keyboardType="default"
                />
                {errorCusName && (
                    <View mt={2}>
                        <HStack
                        >
                            <Text style={{ color: "red" }}>
                                is a requeired field{" "}
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

                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Address</Text>

                <Input
                    variant="outline"
                    placeholder="Address"
                    value={address}
                    isRequired={true}
                    size="lg"
                    mt={2}
                    onChangeText={handleAddressChange}
                    keyboardType="default"
                />
                {errorAddress && (
                    <View mt={2}>
                        <HStack
                        >
                            <Text style={{ color: "red" }}>
                                is a requeired field{" "}
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

            <Input
                variant="outline"
                placeholder="Phone"
                value={phone}
                size="lg"
                onChangeText={handlePhoneChange}
            />
            {errorPhone && (
                <Text style={{ color: "red" }}>
                    Please Enter a Phone Number{" "}
                    <Icon
                        style={{ color: "red" }}
                        as={Ionicons}
                        name="alert-circle-outline"
                        size="sm"
                    />
                </Text>
            )}

            <Button colorScheme="orange" size="sm" onPress={() => updateOrder()}>
                Edit Order
            </Button>
        </Stack>
    );
};

export default UpdateOrder;
