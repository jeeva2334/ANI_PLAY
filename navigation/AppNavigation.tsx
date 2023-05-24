import { StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BookMarks from './screens/BookMarks';
import DetailsScreen from './screens/DetailsScreen';
import VideoScreen from './screens/VideoScreen';
import SearchPage from './screens/SearchPage';
import MangaHome from './screens/MangaHome';
import MangaDetails from './screens/MangaDetailsPage';
import MangaSearchPage from './screens/MangaSearchPage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackNav = ({navigation}) => (
    <Stack.Navigator initialRouteName='home'>
        <Stack.Screen name='home' component={HomeScreen} options={{
            headerTitle:'Ani Play',
            headerStyle:{
                backgroundColor: '#f6f6f6',
            },
            headerTitleStyle:{
                fontWeight: 'bold',
                color: '#3d3d3d',
                fontSize: 24,
            },
            headerRight: () =>{
                return(<Ionicons name="search" color="#3d3d3d" size={24} style={{marginRight: 20}} onPress={()=>navigation.navigate('search')} />)
            },
        }} />
        <Stack.Screen name='details' component={DetailsScreen} options={{
            headerShown:false
        }} />
        <Stack.Screen name='video' component={VideoScreen} options={{
            headerShown:false
        }} />
        <Stack.Screen name='search' component={SearchPage} options={{
            headerShown:false
        }} />
    </Stack.Navigator>
)

const BookmarkStack = ({navigation}) => (
    <Stack.Navigator initialRouteName='mark'>
        <Stack.Screen name='mark' component={BookMarks} options={{
            headerTitle:'Ani Play',
            headerStyle:{
                backgroundColor: '#f6f6f6',
            },
            headerTitleStyle:{
                fontWeight: 'bold',
                color: '#3d3d3d',
                fontSize: 24,
            },
            headerRight: () =>{
                return(<Ionicons name="search" color="#3d3d3d" size={24} style={{marginRight: 20}} onPress={()=>navigation.navigate('search')} />)
            },
        }}  />
        <Stack.Screen name='details' component={DetailsScreen} options={{
            headerShown:false
        }} />
        <Stack.Screen name='search' component={SearchPage} options={{
            headerShown:false
        }} />
    </Stack.Navigator>
)

const MangaStack = ({navigation}) => (
    <Stack.Navigator>
        <Stack.Screen name='manga' component={MangaHome} options={{
            headerTitle:'Ani Play',
            headerStyle:{
                backgroundColor: '#f6f6f6',
            },
            headerTitleStyle:{
                fontWeight: 'bold',
                color: '#3d3d3d',
                fontSize: 24,
            },
            headerRight: () =>{
                return(<Ionicons name="search" color="#3d3d3d" size={24} style={{marginRight: 20}} onPress={()=>navigation.navigate('searching')} />)
            },
        }}  />
        <Stack.Screen name='details' component={MangaDetails} options={{
            headerShown:false
        }} />
        <Stack.Screen name='searching' component={MangaSearchPage} options={{
            headerShown:false
        }} />
    </Stack.Navigator>
)

const TabNav = () => {
    return(
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarStyle:styles.tabStyle,
            tabBarActiveTintColor:'#b1463e',
            tabBarInactiveTintColor:'#ccb3b4',
        })}>
            <Tab.Screen name='home' component={StackNav} options={{
                title:'Anime',
                tabBarIcon: ({ color, size, focused }) => (
                    focused ?  <Ionicons name={"play"} size={size} color={color} />: <Ionicons name={"play-outline"} size={size} color={color} />
                ),
                headerShown:false
            }} />
            <Tab.Screen name='bookmark' component={BookmarkStack} options={{
                title:'Bookmarks',
                headerShown:false,
                tabBarIcon: ({ color, size, focused }) => (
                    focused ?  <Ionicons name={"bookmark"} size={size} color={color} />: <Ionicons name={"bookmark-outline"} size={size} color={color} />
                ),
            }} />
            {/* <Tab.Screen name='manga' component={MangaStack} options={{
                title:`Manga`,
                headerShown:false,
                tabBarIcon: ({ color, size, focused }) => (
                    focused ?  <Ionicons name={"book"} size={size} color={color} />: <Ionicons name={"book-outline"} size={size} color={color} />
                ),
            }} /> */}
        </Tab.Navigator>
    )
}

const AppNavigation = () => {
  return (
    <NavigationContainer>
        <TabNav />
    </NavigationContainer>
  )
}

export default AppNavigation

const styles = StyleSheet.create({
    tabStyle: {
        backgroundColor: '#f6f6f6',
        borderTopWidth: 0,
    },
})