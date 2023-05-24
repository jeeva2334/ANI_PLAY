import { SafeAreaView, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton, Menu } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';


const BookMarks = ({navigation}) => {
  const [bookmarks,setBookmarks] = useState([])
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllBookmarks();
    });
    return unsubscribe;
  }, [navigation]);
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [visibleAlert, setVisibleAlert] = React.useState(false);
  const [rm,setRm] = useState(false)
  const showDialog = () => setVisibleAlert(true);
  const hideDialog = () => setVisibleAlert(false);
  const handleMenuItemPress = () => {
    removeAllBookmarks()
    closeMenu();
  };
  const removeBookmark = async (id) => {
    try {
      await AsyncStorage.removeItem(id);
      console.log('Bookmark removed successfully.');
      getAllBookmarks()
    } catch (error) {
      console.log('Error removing bookmark:', error);
    }
  };
  const removeAllBookmarks = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      console.log('All bookmarks have been removed');
      getAllBookmarks()
    } catch (error) {
      console.error('Error removing bookmarks:', error);
    }
  };  
  const getAllBookmarks = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const bookmark = await AsyncStorage.multiGet(keys);
      const convertedData = bookmark.map(([id, jsonString]) => {
        const jsonData = convertStringToJson(jsonString);
        return [id, jsonData];
      });      
      setBookmarks(convertedData);
      console.log(convertedData)
    } catch (error) {
      console.log('Error retrieving bookmarks:', error);
    }
  }; 
  const convertStringToJson = (stringifiedData) => {
    try {
      const jsonData = JSON.parse(stringifiedData);
      return jsonData;
    } catch (error) {
      console.error('Error converting string to JSON:', error);
      return null;
    }
  };
   
  return (
    <PaperProvider>
      <View style={styles.container}>
        <SafeAreaView style={styles.top}>
          <Text style={styles.text}>Book-Marks</Text>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
          >
            <Menu.Item onPress={() => showDialog()} title="Remove all marks" />
          </Menu>
        </SafeAreaView>
        <View>
          <Portal>
            <Dialog visible={visibleAlert} onDismiss={hideDialog}>
              <Dialog.Title>Alert</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">Do you want to remove all marks?</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={()=>{
                  removeAllBookmarks()
                  hideDialog()
                }}>Delete</Button>
                <Button onPress={hideDialog}>Cancel</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
        <Text style={[styles.text,{fontSize:24,marginBottom:10}]}>Anime</Text>
        {bookmarks.length !==0 ?
          <FlatList 
          numColumns={2}
          data={bookmarks}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({item})=>(
            <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('details',{id:item[0]})}>
                <Image style={styles.posterImage} source={{uri: item[1]?.image}} />
                <Text style={{fontSize:17,color: '#30241b',margin: 10,fontWeight:'bold',marginLeft:2}}>{item[1]?.title}</Text>
            </TouchableOpacity>
        )}
        />
        :<SafeAreaView style={{justifyContent:'center',alignItems:'center',marginTop:20}}>
          <Image source={{uri:'https://wallpaperaccess.com/full/538943.jpg'}} style={{width:200,height:200,borderRadius:20}} />
          <Text style={styles.text}>No Anime Book-Marked</Text>
        </SafeAreaView>}
      </View>
    </PaperProvider>
  )
}

export default BookMarks

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor: '#f6f6f6',
    color:'#30241b'
  },
  text:{
    fontSize:30,
    fontWeight:'700'
  },
  top:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  card:{
    width: 180,
    height: 250,
    marginRight: 20,
  },
  heading:{
    fontSize: 19,
    color:'#30241b',
    margin: 10,
    fontWeight: 600,
  },
  posterImage:{
    height: 200,
    width: 150,
    borderRadius: 10,
  },
})