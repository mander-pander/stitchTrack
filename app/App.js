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
            if (route.name === 'Projects') {
              return (
                <Ionicons
                  name={'list-outline'}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Add Project') {
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
            backgroundColor: '#A53860',
            borderRadius: 20,
            position: 'absolute'


          },
          headerStyle: {
            backgroundColor: '#A53860',
          },
          headerTitleStyle: {
            color: '#F9DBBD',
          }
        })}
        initialRouteName="Projects"
      >
        <Tab.Screen
          name="Projects"
          component={Home}
        />
        <Tab.Screen
          name="Add Project"
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
