import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import {
    useToast, Box, Heading, View, FormControl, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Button, Icon, Input, WarningOutlineIcon, Divider, VStack, IconButton, CloseIcon, Spinner, PresenceTransition, Skeleton, Pressable, AlertDialog, Badge,
} from "native-base";
import React, { useEffect, useState } from "react";
import AlertBox from "../../components/AlertBox";
import { TextInput } from 'react-native';

const FoodOrderUpadteScreen = ({ navigation, route }) => {
    const { id } = route.params;

    const [userid, setUserid] = useState("");

    const [phone, setPhone] = useState("");
    const [cusname, setCusname] = useState("");
    const [address, setAddress] = useState("");
    const [foodname, setFoodname] = useState("");
    const [foodImage, setFoodImage] = useState();
    const [foodPrice, setFoodPrice] = useState("0");
    const [quantity, setQuantity] = useState();
    const [total, setTotal] = useState("");

    const [foodId, setFoodId] = useState("");

    const toast = useToast();

    const [errorPhone, setErrorPhone] = useState(false);
    const [errorCusName, setErrorCusName] = useState(false);
    const [errorAddress, setErrorAddress] = useState(false);

    //setform data
    useEffect(() => {
        axios.get(`food-order/${id}`).then((res) => {
            setPhone(res.data.phone);
            setAddress(res.data.address);
            setCusname(res.data.cusname);
            setFoodId(res.data.foodId);
            setQuantity(res.data.quantity)
        });
    }, []);

    //Load food data
    useEffect(() => {
        console.log(foodId);
        loadTabledata(foodId);
    }, [foodId]);

    const loadTabledata = (id) => {
        axios.get(`food/${id}`).then((res) => {
            setFoodname(res.data.foodName);
            setFoodPrice(res.data.price)
            setFoodImage(res.data.foodImage)
        });
    };


    //Handle Inputs
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

    //calculate total
    useEffect(() => {
        let subtotal = parseInt(foodPrice) * parseInt(quantity)

        setTotal(`Rs.${subtotal}.00`);
    }, [foodPrice]);

    //On Submit
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

                toast.show({
                    placement: "top",

                    render: () => (
                        <AlertBox
                            status="success"
                            title="Order Success"
                            description="Your Order Successfully Update !!!"
                        />
                    ),
                });
                navigation.navigate("Home");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Stack space={4} w="95%" maxW="350px" mx="auto" minH={"90%"} mt={3}>
            <Heading>{foodname}</Heading>

            <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                    source={{
                        uri: foodImage,
                    }}
                    alt="image"
                />
            </AspectRatio>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: '2%' }}>Quantity</Text>

                <TextInput
                    editable={false}
                    value={quantity}
                    style={{
                        flex: 1,
                        height: 30,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 4,
                        paddingHorizontal: 8,
                        marginHorizontal: 8
                    }}
                />


                <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: '2%' }}>Total</Text>

                <TextInput
                    editable={false}
                    value={total}
                    style={{
                        flex: 1,
                        height: 30,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 4,
                        paddingHorizontal: 8,
                        marginHorizontal: 8,
                    }}
                />
            </View>


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

            <View>

                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Phone Number</Text>

                <Input
                    variant="outline"
                    placeholder="Phone Number"
                    value={phone}
                    size="lg"
                    mt={2}
                    onChangeText={handlePhoneChange}
                    keyboardType="number-pad"
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

            <View position="absolute"
                bottom="0"
                right='0'
                left='0'>
                <Button
                    colorScheme="orange"
                    size="lg"
                    onPress={() => updateOrder()}
                >
                    Update Order Details
                </Button>
            </View>
        </Stack>
    );
};

export default FoodOrderUpadteScreen;
