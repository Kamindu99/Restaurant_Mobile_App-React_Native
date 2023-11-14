import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { VStack, HStack, Button, IconButton, Menu, HamburgerIcon,Icon, Text, NativeBaseProvider, Center, Box, StatusBar, Divider } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";


import HomeScreen from "./screens/HomeScreen";
import ExampleScreen from "./screens/ExampleScreen";
// import TableList from "./screens/tableBooking/admin/TableList";
import TableList from "./screens/tableBooking/admin/TableList";
import AddTable from "./screens/tableBooking/admin/AddTable";

import Eg from "./screens/Eg";



import Ionicons from "react-native-vector-icons/Ionicons";
import AppBars from "./components/AppBar";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import BookingScreen from "./screens/tableBooking/BookingScreen";
import UpdateTable from "./screens/tableBooking/admin/UpdateTable";
import BookedTables from "./screens/tableBooking/BookedTables";
import UpdateBooking from "./screens/tableBooking/UpdateBooking";
import AllBookings from "./screens/tableBooking/admin/AllBookings";



import AllUserInquiryScreen from "./screens/Inquiry/AllUserInquiryScreen";
import EditResponseScreen from "./screens/Inquiry/EditResponseScreen";
import AddInquiryScreen from "./screens/Inquiry/AddInquiryScreen";
import EditInquiryScreen from "./screens/Inquiry/EditInquiryScreen";
import MyInquiryScreen from "./screens/Inquiry/MyInquiryScreen";
import RegisterScreen from "./screens/user/register";
import LoginScreen from "./screens/user/login";
import ProfileScreen from "./screens/user/profile";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import Adminhome from "./screens/Adminhome";

import FoodList from "./screens/FoodManagment/FoodList";
import OrderFood from "./screens/FoodManagment/OrderFoodForm";
import UpdateOrder from "./screens/FoodManagment/UpdateFoodOrder";
import OrderedFoods from "./screens/FoodManagment/MyFoodOrders";
import AdminFoodList from "./screens/FoodManagment/AdminFoodManagement/AdminFoodList";
import AddNewFood from "./screens/FoodManagment/AdminFoodManagement/AddNewFood";
import UpdateFoodDetails from "./screens/FoodManagment/AdminFoodManagement/EditFoodDetails";
import AllFoodOrders from "./screens/FoodManagment/AdminFoodManagement/AllOrdersList";
import { LogBox } from "react-native";


//  axios.defaults.baseURL = 'http://192.168.193.18:5000/'
 axios.defaults.baseURL = 'http://192.168.0.197:5000/';
 
// axios.defaults.baseURL = 'http://192.168.23.92:5000/';
//axios.defaults.baseURL = 'https://sliitfoodsystem.onrender.com/';
//axios.defaults.baseURL =  'http://172.20.10.14:5000/'





const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();





function Menus({userid}) {
//   const [userid, setUserId] = useState('');
  
  const navigation = useNavigation();
//   const isFocused = useIsFocused();

//   useEffect(() => {

//     if(isFocused) {

//     AsyncStorage.getItem('userId').then((user) => {
//       if (user) {
       
//         console.log(user)
//         setUserId(user)

//       } else {
//         console.log('bbbb')
      
//       }

//     })
//   }
// }
  
//   ,[isFocused,userid])


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

    
    navigation.navigate('Login');

    alert('Logout Successfully')

  }


  return (
    <>

   
  
  <Menu w="250" placement="bottom right"
  trigger={triggerProps => {
      return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
             <Ionicons name="ios-menu" size={25} color="white" />
            </Pressable>;
    }}>


          <Menu.Item 
         
          mt={2}
          mb={2}
           onPress={() => navigation.navigate('')}>
            <Text fontSize="xl" fontWeight="bold" > My Orders</Text>
           </Menu.Item>

          <Center>
          <Divider w="90%"/>
          </Center>

          

        <Menu.Item 
        mt={2}
        mb={2}
        
        onPress={() => navigation.navigate('Booked List', {id : userid}) }>
            <Text fontSize="xl" fontWeight="bold" > My Table Reservations</Text>
          
          </Menu.Item>
        

        
         
          <Center>
          <Divider w="90%"/>
          </Center>

          <Menu.Item 
           mt={2}
           mb={2}
           
           onPress={() => navigation.navigate('Booked List', {id : userid}) }>
         <Text fontSize="xl" fontWeight="bold" > My Inquiries</Text>
         </Menu.Item>

          <Center>
          <Divider w="90%"/>
          </Center>
          <Menu.Item 
           mt={2}
           mb={2}
           
           onPress={() => navigation.navigate('Booked List', {id : userid}) }>
         <Text fontSize="xl" fontWeight="bold" > My Profile</Text>
         </Menu.Item>
         <Center>
          <Divider w="90%"/>
          </Center>

          <Menu.Item 
           mt={2}
           mb={2}
           
           onPress={() => logout() }>
         <Text fontSize="xl" fontWeight="bold" > Logout</Text>
         </Menu.Item>


      </Menu>

     
    
  </>


      );
}

function AppBar() {
  
  return <>
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="violet.600" />
      <HStack bg="violet.800" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" >
        <HStack alignItems="center">
          <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
          <Text color="white" fontSize="20" fontWeight="bold">
            Home
          </Text>
        </HStack>
        <HStack>
          <IconButton icon={<Icon as={MaterialIcons} name="favorite" size="sm" color="white" />} />
          <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
          <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} />
          
        </HStack>
      </HStack>
    </>;
}

export default function App({}) {
  LogBox.ignoreAllLogs();

  const [userid, setUserId] = useState('');
 

  useEffect(() => {

   

    AsyncStorage.getItem('userId').then((user) => {
      if (user) {
       
        console.log(user)
        setUserId(user)

      } else {
        console.log('bbbb')
      
      }

    })
  
}
  
  ,[userid])

 







  

  function TabNav() {
    return (
      <Tab.Navigator 

        options={{
          headerShown: false,
        }}

        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "Example") {
              iconName = focused ? "ios-list" : "ios-list-outline";
            } else if (route.name === "Inquiries") {
              iconName = focused ? "create" : "create-outline";
            }
            else if (route.name === "Inquiries") {
              iconName = focused ? "create" : "create-outline";
            }
            else if (route.name === "login") {
              iconName = focused ? "create" : "create-outline";
            }
            else if (route.name === "Foods") {
              iconName = focused ? "restaurant" : "restaurant-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        
          
        })}




      >
        <Tab.Screen name="Home" component={HomeScreen}  options={{  headerShown: false }}/>
      
        <Tab.Screen name="Foods" component={FoodList} />
        
        {/* <Tab.Screen name="profile" component={ProfileScreen}
        options = {{
          headerShown: false,
        }}
        /> */}
        <Tab.Screen name="Inquiries" component={AddInquiryScreen} options = {{
          headerShown: false,
        }} />
        {/* <Tab.Screen name="login" component={LoginScreen}
        options = {{
          headerShown: false,
        }}
        
        /> */}
        {/* <Tab.Screen name="profile" component={ProfileScreen} /> */}
      </Tab.Navigator>
    );
  }






  return (
  <NativeBaseProvider userid={userid} key={userid}>
   
   
      {/* <AppBar  /> */}
         
    
    
   
    
      
   
    <NavigationContainer  >
      <Stack.Navigator   screenOptions={{
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: ({userid, key}) => (
        <Menus  userid={userid} key={userid}  />
        
    
         

   
    
      ),

        cardStyle: { backgroundColor: '#fffff' }
    }} >
        <Stack.Screen
          name="Food Factory"
          component={TabNav}
          // options={{ headerShown: false }}
          headerRight={() => (
            <Menus  />
          )}

      
        />
        <Stack.Screen name="Home Screen" component={HomeScreen} 
          // options={{ headerShown: false }}
       />
        <Stack.Screen name="Example Screen" component={ExampleScreen}  
        options={{
          headerStyle: {
            backgroundColor: 'tomato',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}

        />
         <Stack.Screen name="profile" component={ProfileScreen} 
          // options={{ headerShown: false }}
       />
        <Stack.Screen name="login" component={LoginScreen} 
          // options={{ headerShown: false }}
       />
        <Stack.Screen name="Table List" component={TableList} />
        <Stack.Screen name="Eg" component={Eg} />
        <Stack.Screen name="Add Table" component={AddTable} />
        
        <Stack.Screen name="Booking Screen" component={BookingScreen} />
        <Stack.Screen name="Update Table" component={UpdateTable} />
        <Stack.Screen name="Booked List" component={BookedTables}
        
        options={{
          headerStyle: {
            
            backgroundColor: 'tomato',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}

        />
        <Stack.Screen name="AdminHome" component={Adminhome}/>
        <Stack.Screen name="Update Booking" component={UpdateBooking} />
        <Stack.Screen name="AllBookings" component={AllBookings} />
        <Stack.Screen name="register" component={RegisterScreen} />


        <Stack.Screen
            name="AllUserInquiry Screen"
            component={AllUserInquiryScreen}
          />
          <Stack.Screen
            name="EditResponse Screen"
            component={EditResponseScreen}
          />
           <Stack.Screen name="AddInquiry Screen" component={AddInquiryScreen} />
          <Stack.Screen
            name="EditInquiry Screen"
            component={EditInquiryScreen}
          />
            <Stack.Screen name="MyInquiry Screen" component={MyInquiryScreen} />


            <Stack.Screen name="Food Order" component={OrderFood} />
          <Stack.Screen name="Food Order Update" component={UpdateOrder} />
          <Stack.Screen name="Orders List" component={OrderedFoods} />
          <Stack.Screen name="Admin Food List" component={AdminFoodList} />
          <Stack.Screen name="Add New Food" component={AddNewFood} />
          <Stack.Screen name="Food Details Update" component={UpdateFoodDetails} />
          <Stack.Screen name="All Food Orders" component={AllFoodOrders} />

      </Stack.Navigator>
    </NavigationContainer>
 
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBox: "1px solid red",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    color: "red",
  },
  bg: {
    flex: 1,
    backgroundColor: "red",
  },
});
