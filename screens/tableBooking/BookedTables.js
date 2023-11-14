import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Alert, RefreshControl, ScrollView, StyleSheet } from "react-native";
import {
  Box,
  Fab,
  Heading,
  Body,
  View,
  FormControl,
  AspectRatio,
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
  Card,
  Pressable,
  AlertDialog,
  useToast,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import LandscapeLoader from "../../components/LandscapeLoader";
import { useIsFocused, useRoute } from "@react-navigation/native";
import DetailsLoader from "../../components/DetailsLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertBox from "../../components/AlertBox";
import NoData from "../../components/NoData";

// import { Container } from './styles';

const TableData = (props) => {
  const { table, setTables, navigation, ids } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDeletOpen, setIsDeletOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);
  const onDeleteClose = () => setIsDeletOpen(false);

  const cancelRef = React.useRef(null);
  const deleteRef = React.useRef(null);
  const toast = useToast();

  const deleteTeam = async (id) => {
    try {
      await axios.delete(`tablebooking/${id}`).then((res) => {
        // setTeams(res.data)
        console.log(res.data);
      });

     
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async (id) => {
    try {
      const data = {
        status: "Cancelled",
      };
      await axios.put(`tablebooking/${id}`, data).then((res) => {
        console.log(res.data);
      });
      toast.show({
        placement: "top",

        render: () => (
          <AlertBox
            status="success"
            title="Your Reservation is Cancelled"
            description="Your Table Reservation has been Canceled Successfully !!!"
          />
        ),
      });
      onDeleteClose();
   
      
        


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box alignItems="center" mb={1} mt={2}>
      <Box
        w={350}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        px={3}
        shadow={0.3}
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
        <Stack direction="row" mb="3" mt="3" space={5}>
          <VStack space={5} overflow="hidden">
            {/* <Center w="64" h="5" bg="indigo.300" rounded="md" shadow={3} /> */}
            <HStack space={6}>
              <Heading size="lg">{table.tabletype}</Heading>
              <Text fontWeight="400" fontSize="sm" color="coolGray.800">
                {table.createdAt.substring(0, 10)}
              </Text>
            </HStack>

            <Text fontWeight="800" fontSize="lg" color="coolGray.800">
              Booked Date : {table.date}
              {table.status == "Cancelled" ? (
                <Text color="red.500"> (Cancelled)</Text>
              ) : null}
            </Text>
            <Text fontWeight="800" fontSize="lg" color="coolGray.800">
              Booked Time : {table.time}
            </Text>
            {/* <Text>Booked By : {table.name}</Text> */}

            {table.status == "Cancelled" ? null : (
              <HStack space={3} mt={1}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("Update Booking", {
                      id: table._id,
                    })
                  }
                >
                  <Center p="2" h="12" bg="yellow.500" rounded="md">
                    <HStack>
                      <Text color="white" fontSize="sm">
                        {" "}
                        Update Booking
                      </Text>
                      <Icon
                        mt={1}
                        as={<Ionicons name="pencil-outline" />}
                        size="sm"
                        color="white"
                      />
                    </HStack>
                  </Center>
                </Pressable>

                <Pressable onPress={() => setIsDeletOpen(!isOpen)}>
                  <Center h="12" p="2" bg="red.500" rounded="md">
                    <HStack>
                      <Text color="white" fontSize="sm">
                        {" "}
                        Cancel Booking
                      </Text>
                      <Icon
                        mt={1}
                        as={<Ionicons name="trash-outline" />}
                        size="sm"
                        color="white"
                      />
                    </HStack>
                  </Center>
                </Pressable>

                {isDeletOpen && (
                  <AlertDialog
                    leastDestructiveRef={cancelRef}
                    isOpen={isDeletOpen}
                    onClose={onDeleteClose}
                  >
                    <AlertDialog.Content>
                      <AlertDialog.CloseButton />
                      <AlertDialog.Header>
                        <Heading size="md">{`Cancel Reservation?`}</Heading>
                      </AlertDialog.Header>
                      <AlertDialog.Body>
                        <Text
                          fontWeight="400"
                          mt={2}
                          mb={2}
                          fontSize="sm"
                          color="coolGray.800"
                        >
                          Are you sure you want to Cancel table reservation?
                        </Text>
                      </AlertDialog.Body>
                      <AlertDialog.Footer>
                        <Button.Group space={2}>
                          <Button
                            variant="unstyled"
                            colorScheme="coolGray"
                            onPress={onDeleteClose}
                            ref={cancelRef}
                          >
                            No
                          </Button>
                          <Button
                            variant="solid"
                            colorScheme="red"
                            startIcon={
                              <Icon
                                as={Ionicons}
                                name="trash-outline"
                                size="sm"
                              />
                            }
                            onPress={() => cancelBooking(table._id)}
                          >
                            Cancel Reservation
                          </Button>
                        </Button.Group>
                      </AlertDialog.Footer>
                    </AlertDialog.Content>
                  </AlertDialog>
                )}
              </HStack>
            )}
          </VStack>

          {/* <HStack  space={4} justifyContent="space-between">
                <HStack>
                  <Text color="coolGray.600" _dark={{
                  color: "warmGray.200"
                }} fontWeight="400">
                    6 mins ago ssss
                  </Text></HStack>
  
                  <HStack>
                 <Button colorScheme="orange" size="sm" onPress={() => alert('Hello, world!')}>
                  Book Table
                  </Button>
  </HStack>
                
              
              </HStack>
  
            <Center bg="primary.500" size="20" rounded="sm" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
              Box 2
            </Center>
            <Center size="20" bg="primary.700" rounded="sm" _text={{
            color: "warmGray.50",
            fontWeight: "medium"
          }} shadow={"3"}>
              Box 3
            </Center> */}
        </Stack>
      </Box>
    </Box>
  );
};

const BookedTables = ({ navigation }) => {

  const route = useRoute();
  const {userid, name} = route.params

  const [tables, setTables] = useState([]);

  const [img, setImg] = useState("");
  const [ids, setId] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [userId, setUserId] = useState("");

  const [refreshing, setRefreshing] = React.useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      
      onRefresh();
    }
  }, [isFocused]);

  const onRefresh = React.useCallback(() => {
    // console.log("userId", id);

    // AsyncStorage.getItem('vjs').then((value) => 
    // console.log(value)
    // );
    setIsLoading(true);
    // if (id){

    //   const userId = id

    // AsyncStorage.getItem('userId').then((user) => {
    //   if (user) {
       
    //     console.log(user)
    //     setUserId(user)

    //   } else {
    //     navigation.navigate("login")
        
      
    //   }

    // })
    console.log(userid,'ccccccc')
      console.log(name,'ccccccc')

    if(userid){
      console.log(userid,'ccccccc')
    axios
      .get(`tablebooking/book/${userid}`)
      .then((res) => {
        
        setTables(res.data);

        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else{
      setIsLoading(false);
      setTables([])
      alert("No bookings")
    }
  
      
  }, []);

  useEffect(() => {
    setIsLoading(true);
    
    // if (id){

    //   const userId = id

    // AsyncStorage.getItem('userId').then((user) => {
    //   if (user) {
       
    //     console.log(user)
    //     setUserId(user)

    //   } else {
    //     navigation.navigate("login")
        
      
    //   }

    // })


    if(userid){



    axios
      .get(`tablebooking/book/${userid}`)
      .then((res) => {
        
        setTables(res.data);

        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else{
      setIsLoading(false);
      setTables([])
      alert("No bookings")
    }
    
  }, []);

  return (
    <>
      {isLoading ? (
        <ScrollView>
          <DetailsLoader />
        </ScrollView>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {tables.length == 0 ? 
          
          <NoData
            message="You Do Not have any Table Reservations"
            onRefresh={onRefresh}
            />
            :

            <>


          {tables &&
            tables.map((table, index) => (
              <TableData
                table={table}
                key={index}
                setTables={setTables}
                navigation={navigation}
                ids={ids}
              />
            ))}
            </>
          }
        </ScrollView>
      )}
    </>
  );
};

export default BookedTables;
