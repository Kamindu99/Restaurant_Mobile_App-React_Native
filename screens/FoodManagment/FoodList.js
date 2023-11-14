import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, RefreshControl } from "react-native";
import {
  Box, Heading, View, FormControl, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Button, Icon, Input, WarningOutlineIcon, Divider, VStack, IconButton, CloseIcon, Spinner, PresenceTransition, Skeleton, Pressable, AlertDialog, Badge,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import SkeletonLoader from "../../components/SleletonLoader";
import { useIsFocused } from "@react-navigation/native";

const FoodData = (props) => {
  const { food, navigation } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);

  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  const setPlus = () => {
    setQuantity(quantity + 1);
  }
  const setMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }
  useEffect(() => {
    setTotal(parseInt(food.price) * quantity)
  }, [quantity, food.price])


  return (
    <Box alignItems="center" style={styles.aaaaa}>
      <Box
        //maxW="100px"
        style={{ marginRight: "5%", marginLeft: "5%", marginBottom: "5%", backgroundColor: "#F5F3F1" }}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: food.foodImage,
              }}
              alt="image"
            />
          </AspectRatio>



          <Center
            bg="violet.500"
            _dark={{
              bg: "violet.400",
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "md",
            }}
            position="absolute"
            bottom="0"
            right='0'
            px="3"
            py="1.5"
            roundedTopLeft="lg"
          >
            {"Rs." + food.price}
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {food.foodName}
            </Heading>
            <Text
              fontSize="lg"
              _light={{
                color: "violet.500",
              }}
              _dark={{
                color: "violet.400",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              Rs.{food.price}
            </Text>
          </Stack>
          <Text fontWeight="400">{food.description}</Text>
          {/* <Button colorScheme="orange" size="sm" onPress={() => alert('Hello, world!')}>
                Book Table
                </Button> */}

          <Button
            variant="solid"
            colorScheme="red"
            startIcon={<Icon as={Ionicons} name="cart-sharp" size="sm" />}
            onPress={() => setIsOpen(!isOpen)}
          >
            Order Now
          </Button>

          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>
                <Heading size="md">{`${food.foodName}`}</Heading>
                {/* {`${table.name} Table`} */}
              </AlertDialog.Header>
              <AlertDialog.Body>
                <AspectRatio
                  w="100%"
                  ratio={16 / 9}
                  rounded="lg"
                  overflow="hidden"
                >
                  <Image
                    source={{
                      uri: food.foodImage,
                    }}
                    alt="image"
                  />
                </AspectRatio>
                <Text
                  fontWeight="400"
                  mt={2}
                  mb={2}
                  fontSize="sm"
                  color="coolGray.800"
                >
                  {food.description}
                </Text>

                <View>
                  <Center>
                    <Button.Group space={2} >

                    <Button
                      variant="solid"
                      colorScheme="blue"
                      style={{ width: '15%' }}
                      startIcon={<Icon as={Ionicons} name="remove" size="md" />}
                      onPress={() => setMinus()}
                    >
                    </Button>
                    <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: '5%', marginLeft: '7%', marginRight: '7%' }}>{quantity}</Text>

                    <Button
                      variant="solid"
                      style={{ width: '15%' }}
                      colorScheme="blue"
                      startIcon={<Icon as={Ionicons} name="add" size="md"
                      
                      />}
                      onPress={() => setPlus()}
                    >
                    </Button>
          

                    </Button.Group>
                  </Center>
                  {/* <Divider/>
                  <Text position="absolute" right='0'style={{ fontSize: 18, fontWeight: "bold",marginTop:'12%' }}>Total: Rs.{total}</Text> */}
                </View>

              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={onClose}
                    ref={cancelRef}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="solid"
                    colorScheme="red"
                    onPress={() =>
                      navigation.navigate("Food Order", {
                        id: food._id, qty: quantity,foodImage:food.foodImage
                      })
                    }
                    startIcon={
                      <Icon as={Ionicons} name="cart-sharp" size="sm" />
                    }
                  >
                    Order Now
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </Stack>
      </Box>
    </Box>
  );
};

const FoodList = ({ navigation }) => {
  const [foods, setFoods] = useState();
  const [searchkey, setsearchkey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notab, setNotab] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [filterLoaded, setFilterLoaded] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);

  const onRefresh = React.useCallback(() => {
    // setRefreshing(true);
    // setTimeout(() => {
    //   setRefreshing(false);
    // }, 2000);

    if (filterLoaded) {
      setFilterLoaded(false);
    }
    setsearchkey("");

    setIsLoading(true);
    try {
      //  fetch('http://192.168.8.113:5000/table/')
      //  .then(response => response.json())
      //  .then(data => setTables(data))
      //  .catch(error => console.error(error))
      axios.get("food/").then((res) => {
        setFoods(res.data);
        setNotab(false);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    try {
      //  fetch('http://192.168.8.113:5000/table/')
      //  .then(response => response.json())
      //  .then(data => setTables(data))
      //  .catch(error => console.error(error))
      axios.get("food/").then((res) => {
        setFoods(res.data);
        setNotab(false);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, [notab]);

  const filterPackages = (searchkey) => {
    try {
      setIsLoading(true);
      console.log(searchkey);

      axios.get("food/").then((response) => {
        // console.log(response.data);

        //         const filteredData = DATA.filter((item) =>
        //   item.name.toLowerCase().includes(search.toLowerCase())
        // );

        const filteredPackages = response.data.filter((foods) =>
          foods.foodName.toLowerCase().includes(searchkey.toLowerCase())
        );

        if (filteredPackages.length > 0) {
          setFilterLoaded(true);
          setFoods(filteredPackages);
          setIsLoading(false);
        } else {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
          setsearchkey("");
          setNotab(true);

          setTimeout(() => {
            setNotab(false);
          }, 3000);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NativeBaseProvider>
      <View flexDirection="row" alignItems="center" margin={2}>
        <Input
          placeholder="Search Foods"
          // value={searchText}
          // onChangeText={setSearchText}
          value={searchkey}
          onChangeText={(newText) => setsearchkey(newText)}
          flex={1}
          margin={2}
          rounded="full"
        />

        {filterLoaded ? (
          <Button
            variant="solid"
            colorScheme="red"
            size={"lg"}
            rounded="full"
            startIcon={<Icon as={Ionicons} name="close" size="sm" />}
            onPress={() => onRefresh()}
          ></Button>
        ) : (
          <Button
            variant="solid"
            colorScheme="red"
            size={"lg"}
            rounded="full"
            startIcon={<Icon as={Ionicons} name="search-outline" size="sm" />}
            onPress={() => filterPackages(searchkey)}
          ></Button>
        )}
      </View>

      {isLoading ? (
        ""
      ) : (
        <Box>
          {notab && (
            <PresenceTransition
              visible={notab}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 500,
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 550,
                },
              }}
            >
              <Box
                alignSelf="center"
                px="3"
                py="2"
                width={500}
                // bg="primary.500"
                _text={{
                  alignSelf: "center",
                  fontSize: "md",
                  fontWeight: "medium",
                  color: "warmGray.50",
                  letterSpacing: "lg",
                }}
                bg={["red.400", "blue.400"]}
              >
                Search Not Found
              </Box>
            </PresenceTransition>
          )}{" "}
        </Box>
      )}

      {isLoading ? (

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <SkeletonLoader />
        </ScrollView>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <PresenceTransition
            visible={!isLoading}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 500,
              },
            }}
          >
            <Center flex={1} px="3">
              {foods &&
                foods.map((food, index) => (
                  <FoodData
                    food={food}
                    key={index}
                    navigation={navigation}
                  />
                ))}
            </Center>
          </PresenceTransition>
        </ScrollView>
      )}
    </NativeBaseProvider>
  );
};

export default FoodList;

const styles = StyleSheet.create({
  aaaaa: {
    boxShadow: "1px 1px 1px 1px #ccc",
    border: "1px solid red",

    marginTop: 5,
    marginBottom: 5,
  },
});
