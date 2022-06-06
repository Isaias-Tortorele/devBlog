import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './pages/Home'
import Detail from './pages/Details'
import CategoryPost from './pages/CategoryPosts'
import Search from './pages/Search'

const Stack = createNativeStackNavigator()

function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: 'Detalhes',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#232638'
          }
        }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryPost}
        options={{
          title: 'Categoria',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#232638'
          }
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Procurando algo?',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#232638'
          }
        }}
      />
    </Stack.Navigator>
  )
}

export default Routes
