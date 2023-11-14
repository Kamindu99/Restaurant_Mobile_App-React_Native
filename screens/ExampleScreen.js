import React from 'react';
import { View, Text, Button } from 'react-native';



const ExampleScreen = ({ navigation }) => {
  return (
    <>


      <View >
        <Text>Example Screen</Text>
        <Button
          title="Go to Home... again"
          onPress={() => navigation.navigate('Table List')}
        />
        <Button
          title="Booked tables"
          onPress={() => navigation.navigate('Booked List')}
        />
        <Button
          title="all Booked "
          onPress={() => navigation.navigate('AllBookings')}
        />

        <View>
          <Text>Example Screen</Text>
          <Button
            title="Go to Home... again"
            onPress={() => navigation.navigate('Home Screen')}
          />
          <Button
            title="Go to Alluserinquiries... again"
            onPress={() => navigation.navigate('AllUserInquiry Screen')}
          />
        </View>


        <View>
          <Text>Example Food Screen</Text>
          <Button
            title="Go to Admin Food..."
            onPress={() => navigation.navigate('Admin Food List')}
          />
          <Button
            title="Orders List"
            onPress={() => navigation.navigate('Orders List')}
          />
          <Button
            title="All Food Orders"
            onPress={() => navigation.navigate('All Food Orders')}
          />
        </View>
      </View></>
  )
}

export default ExampleScreen;