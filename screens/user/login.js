import {
    Button,
    HStack,
    Input,
    NativeBaseProvider,
    VStack,
    Stack,
    Icon,
    Text,
    Spacer,
    Pressable,
    Box,
    View,
    useToast,
    Image
  } from "native-base";
  import { Ionicons } from "@expo/vector-icons";
  import React, { useState } from "react";
  import axios from "axios";
  import {  Center } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import AlertBox from "../../components/AlertBox";
import {useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet} from "react-native";
import { useIsFocused } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
    const toast = useToast();
    const [show, setShow] = React.useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const isFocused = useIsFocused()


    useEffect(() => { 
      if(isFocused){
      setEmail('')
        setPassword('')
      }

    },[])



   const btnLogin = async() =>  {

      if(email == "Admin" && password == "Admin"){
        toast.show({
          placement: "top",
          render: () => (
            <AlertBox
              status="success"
              title="Admin Login Success"
              description="Hello Admin"
            />
          ),
        });
        navigation.navigate('AdminHome')
        setEmail('')
        setPassword('')
      }
      else if(email == "" || password == ""){
        toast.show({
          placement: "top",
          render: () => (
            <AlertBox
              status="error"
              title="Fill All Fields"
              description="Check Again and Fill All Fields"
            />
          ),
        });
      }
      else{
      
        await axios.post('https://sliitfoodsystem.onrender.com/user/login',{
            mobile: email,
            password: password
        })
        .then(response => {
            if(response.data.success){
              setEmail('')
        setPassword('')
                toast.show({
                    placement: "top",
            
                    render: () => (
                      <AlertBox
                        status="success"
                        title="Login Success"
                        description={`Welcome`}
                      />
                    ),
                  },[]);
                    AsyncStorage.setItem("userId", JSON.stringify(response.data.userId));
                    AsyncStorage.setItem("mobile", JSON.stringify(response.data.mobile));
                    AsyncStorage.setItem("name", JSON.stringify(response.data.name));
                    AsyncStorage.setItem("email", JSON.stringify(response.data.email));
                    AsyncStorage.setItem("token", JSON.stringify(response.data.token));
                   
                    
                    navigation.navigate('Home')

            }
            else{
                toast.show({
                    placement: "top",
            
                    render: () => (
                      <AlertBox
                        status="error"
                        title="Login Failed"
                        description="Check Again Your Login Credentials"
                      />
                    ),
                });
            }
        })
        .catch(error => {
            console.log(error);
        });

        
      }
    }
    //const value = AsyncStorage.getItem("token")
    // useEffect(() => {
    //      const value = AsyncStorage.removeItem("token")
    
    // }, []);
    return (
    <NativeBaseProvider>
        
        <Center flex={1} px="3">
               
             <View style={{marginTop: 10 }}>
                <Image
                    source={require('../../assets/profile.png')}
                    style={{width: 200, height: 200,marginBottom: 30, alignSelf: 'center' }}
                    alt="Alternate Text"
                />
            </View>

            <Stack space={9} w="100%" alignItems="center">
                <Input 
                    w={{base: "75%",md: "25%"}} 
                    size="lg"
                    InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
                    placeholder="Mobile Number" 
                    value={email}
                    onChangeText={(e) => setEmail(e)}
                />
                <Input 
                    w={{base: "75%",md: "25%"}} type={show ? "text" : "password"} 
                    size="lg"
                    InputRightElement={<Pressable onPress={() => setShow(!show)}>
                    <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} 
                    size={5} mr="2" color="muted.400" /></Pressable>} 
                    placeholder="Password"
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                />
            </Stack>

            <Button
            style={{ width: 250, marginLeft: 10, marginTop: 25 }}
            variant="solid"
            colorScheme="red"
            startIcon={<Icon as={Ionicons} name="open-outline" size="sm" />}
            onPress={() => btnLogin()}
            >
                Login
            </Button>

            <Text  style={styles.baseText} onPress={()=>navigation.navigate('register')} >Register</Text>
        </Center>
    </NativeBaseProvider>
    );
  };

  const styles = StyleSheet.create({
    baseText: {
      marginTop: '5%',
      color: 'blue',

    }
  });
  export default LoginScreen;
  