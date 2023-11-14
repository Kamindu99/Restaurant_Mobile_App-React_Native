import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, RefreshControl } from "react-native";
import {
  Box,
  Heading,
  View,
  FormControl,
  AspectRatio,
  Actionsheet, 
  useDisclose,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  Button,
  Icon,
  Input,
  WarningOutlineIcon,
  Divider,
  VStack,
  IconButton,
  CloseIcon,
  Spinner,
  PresenceTransition,
  Skeleton,
  Pressable,
  AlertDialog,
  Badge,
  Fab,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import SkeletonLoader from "../components/SleletonLoader";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons'

const TableData = (props) => {
  const { table, navigation } = props;
  const [isOpen, setIsOpen] = React.useState(false);


  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);

  return (
    <Box alignItems="center" style={styles.aaaaa}>
      <Box
        maxW="80"
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
                uri: table.image,
              }}
              alt="image"
            />
          </AspectRatio>

          <Pressable
            onPress={() => setIsOpen(!isOpen)}
            size="sm"
            position="absolute"
            top="1"
            left="1"
            m="1"
            color="white"
          >
            <Badge
              bg="blue.500"
              // bg="transparent"
              // borderWidth={1}
              // // borderColor="blue.500"
              // borderColor="white"

              borderRadius={999}
              width={8}
              height={8}
              position="absolute"
            >
              <Icon as={Ionicons} name="eye-outline" size="sm" color="white" />
            </Badge>
          </Pressable>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>
                <Heading size="md">{`${table.name} Table`}</Heading>
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
                      uri: table.image,
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
                  {table.description}
                </Text>
                {/* {"This is suitable table for " + `${table.users}` +" users."} */}
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
                      navigation.navigate("Booking Screen", {
                        id: table._id,
                      })
                    }
                    startIcon={
                      <Icon as={Ionicons} name="book-outline" size="sm" />
                    }
                  >
                    Book Table
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>

          <Center
            bg="violet.500"
            _dark={{
              bg: "violet.400",
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
            roundedTopRight="lg"
          >
            {table.users + " Person"}
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {table.name}
            </Heading>
            <Text
              fontSize="xs"
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
              {table.users} Person
            </Text>
          </Stack>
          <Text fontWeight="400">{table.description}</Text>
          {/* <Button colorScheme="orange" size="sm" onPress={() => alert('Hello, world!')}>
                Book Table
                </Button> */}

          <Button
            variant="solid"
            colorScheme="red"
            startIcon={<Icon as={Ionicons} name="book-outline" size="sm" />}
            onPress={() =>
              navigation.navigate("Booking Screen", {
                id: table._id,
              })
            }
          >
            Book Table
          </Button>

          {/* <HStack alignItems="center" space={4} justifyContent="space-between">
              <HStack alignItems="center">
                <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }} fontWeight="400">
                  6 mins ago
                </Text>
              </HStack>
            
            </HStack> */}
        </Stack>
      </Box>
    </Box>
  );
};

const HomeScreen = ({ navigation }) => {
  const [tables, setTables] = useState();
  const [searchkey, setsearchkey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notab, setNotab] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [filterLoaded, setFilterLoaded] = useState(false);
  const isFocused = useIsFocused();

  const [userId, setUserId] = useState();


  useEffect(() => {
    if (isFocused) {
      onRefresh();

     
      


    }
  }, [isFocused]);

  const onRefresh = React.useCallback(() => {

    AsyncStorage.getItem('userId').then((user) => {
      if (user) {
       
        console.log(user)
        setUserId(user)

      } else {
        
        
      
      }

    }
    )
  
    

    if (filterLoaded) {
      setFilterLoaded(false);
       setsearchkey("");
    }
    setsearchkey("");

    setIsLoading(true);
    console.log("refreshing");
    try {
      //  fetch('http://192.168.8.113:5000/table/')
      //  .then(response => response.json())
      //  .then(data => setTables(data))
      //  .catch(error => console.error(error))
      axios.get("table/").then((res) => {
        setTables(res.data);
        setNotab(false);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {

    AsyncStorage.getItem('userId').then((user) => {
      if (user) {
       
        console.log(user)
        setUserId(user)

      } else {
        
        
      
      }

    }
    )

    

    setIsLoading(true);
    try {
      //  fetch('http://192.168.8.113:5000/table/')
      //  .then(response => response.json())
      //  .then(data => setTables(data))
      //  .catch(error => console.error(error))
      axios.get("table/").then((res) => {
        setTables(res.data);
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

      axios.get("table/").then((response) => {
        // console.log(response.data);

        //         const filteredData = DATA.filter((item) =>
        //   item.name.toLowerCase().includes(search.toLowerCase())
        // );

        const filteredPackages = response.data.filter((tables) =>
          tables.name.toLowerCase().includes(searchkey.toLowerCase())
        );

        if (filteredPackages.length > 0) {
          setFilterLoaded(true);
          setTables(filteredPackages);
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


  function Action() {
    const [idd, setIdd] = useState();

    const {
      isOpen,
      onOpen,
      onClose
    } = useDisclose();

    AsyncStorage.getItem('userId').then((user) => {
      if (user) {
       
        console.log(user)
        setIdd(user)

      } else {
        
        
      
      }

    }
    )

    const logout = () => {
      AsyncStorage.removeItem('userId');
      AsyncStorage.removeItem('mobile');
      AsyncStorage.removeItem('name');
      AsyncStorage.removeItem('email');
      AsyncStorage.removeItem('token');
  
  
      AsyncStorage.getItem('userId').then((user) => {
        console.log(user, 'userId',)
      })
        AsyncStorage.getItem('mobile').then((user) => {
          console.log(user, 'mobile')
        })
          AsyncStorage.getItem('name').then((user) => {
            console.log(user,  'name')
          })
            AsyncStorage.getItem('email').then((user) => {
              console.log(user, 'email') 
            })
              AsyncStorage.getItem('token').then((user) => {
                console.log(user, 'token') 
              })
  
      
      navigation.navigate('login');
  
      alert('Logout Successfully')
  
    }
  




    return <>
    {idd ? 
    <Center>
      <Pressable>
            <Box position="relative" h={100} w="100%">
              <Fab
                position="absolute"
                size="lg"
                colorScheme="red"
                icon={
                  <Icon
                    color="white"
                    as={<Entypo name="user" size={24} />}
                    size="lg"
                  />
                }
                onPress={onOpen}
              />
            </Box>
          </Pressable>
        
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
           

            <Actionsheet.Item
             mt={2}
             mb={2}
              onPress={() => navigation.navigate('Orders List', {userid : idd, name :idd})}>
               <Text fontSize="xl" fontWeight="bold" > My Orders</Text>
            </Actionsheet.Item>

                {userId === null ? <Actionsheet.Item>
                  <Text fontSize="xl" fontWeight="bold" > Login</Text>  
                </Actionsheet.Item>
                : null
                }
            <Actionsheet.Item  mt={2}
        mb={2}
        
        onPress={() => navigation.navigate('Booked List', {userid : idd, name :idd}) }>
            <Text fontSize="xl" fontWeight="bold" > My Table Reservations</Text>
          </Actionsheet.Item>
          <Actionsheet.Item  mt={2}
        mb={2}
        
        onPress={() => navigation.navigate('MyInquiry Screen', {userid : idd, name :idd}) }>
            <Text fontSize="xl" fontWeight="bold" > My Inquiries</Text>
          </Actionsheet.Item>
          <Actionsheet.Item  mt={2}
        mb={2}
        
        onPress={() => navigation.navigate('profile')}>
            <Text fontSize="xl" fontWeight="bold" > Profile</Text>
          </Actionsheet.Item>
          <Actionsheet.Item  mt={2}
        mb={2}
        
        onPress={() => logout() }>
            <Text fontSize="xl" fontWeight="bold" > Logout</Text>
          </Actionsheet.Item>
     
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
      : null }
    </>;
  }




  return (
    <NativeBaseProvider>
      <View flexDirection="row" alignItems="center" margin={2}>
        <Input
          placeholder="Search Table"
          // value={searchText}
          // onChangeText={setSearchText}
          value={searchkey}
          onChangeText={(newText) => setsearchkey(newText)}
          flex={1}
          margin={2}
          rounded="full"
          onPointerEnterCapture={() => console.log("enter")}
          InputRightElement={
            <Icon as={Ionicons} name="close-outline" size="xl" 
              onPress={() => onRefresh()}
              mr={3}
            />
          
          }
        />

     
          <Button
            variant="solid"
            colorScheme="red"
            size={"lg"}
            rounded="full"
            startIcon={<Icon as={Ionicons} name="search-outline" size="sm" />}
            onPress={() => filterPackages(searchkey)}
          ></Button>
      
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
              {tables &&
                tables.map((table, index) => (
                  <TableData
                    table={table}
                    key={index}
                    navigation={navigation}
                  />
                ))}
            </Center>
          </PresenceTransition>
           <Action />
          
         
        </ScrollView>
      )}
    </NativeBaseProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  aaaaa: {
    boxShadow: "1px 1px 1px 1px #ccc",
    border: "1px solid red",

    marginTop: 5,
    marginBottom: 5,
  },
});
