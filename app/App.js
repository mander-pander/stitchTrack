import Home from './pages/Home';
import AddProject from './pages/AddProject';
import YarnTab from './pages/YarnTab';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Home') {
              return (
                <Ionicons
                  name={'list-outline'}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'AddProject') {
              return (
                <Ionicons
                  name={'add-outline'}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Yarn') {
              return (
                <Ionicons
                  name={'bookmark-outline'}
                  size={size}
                  color={color}
                />
              );
            }
          },
          tabBarInactiveTintColor: '#450920',
          tabBarActiveTintColor: '#F9DBBD',
          tabBarStyle:
          {
            backgroundColor: '#DA627D',
            borderRadius: 20,
            position: 'absolute'


          },
        })}
        initialRouteName="Home"
      >
        <Tab.Screen
          name="Home"
          component={Home}
        />
        <Tab.Screen
          name="AddProject"
          component={AddProject}
        />
        <Tab.Screen
          name="Yarn"
          component={YarnTab}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
