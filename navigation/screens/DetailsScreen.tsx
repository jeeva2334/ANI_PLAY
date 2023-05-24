import { ActivityIndicator, FlatList, Image, ScrollView, Text } from 'react-native'
import React, {  useEffect, useState } from 'react'
import { SafeAreaView ,TouchableOpacity} from 'react-native'
import axios from 'axios';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles/DetailScreen';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrentation from 'expo-screen-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface AnimeFormat {
    title:string,
    image:string,
    status:string,
    releaseDate:string,
    synopsis:string,
    totalEpisodes:string,
    
}

interface EpisodeArray{
    episodeId:string,
    episodeNum:string,
    episodeUrl:string
}

const DetailsScreen = ({navigation,route}) => {
    const {id} = route.params;
    const [loading,setLoading] = useState<boolean>(false)
    const navi = useNavigation().navigate
    const [sp,setSp] = useState('');
    const [details,setDetails] = useState<AnimeFormat>()
    const [episodes,setEpisodes] = useState([])
    const [genres,setGenre] = useState([])
    const [marked,setMarked] = useState('')
    useEffect(()=>{
        getAnimeDetails(id);
        ScreenOrentation.lockAsync(ScreenOrentation.OrientationLock.PORTRAIT)
        checkBookmarkExists(id)
        return()=>{
            console.log("destroyed")
        }
    },[])
    const saveBookmark = async (id) => {
        try {
            if(checkBookmarkExists(id)){
                const obj = JSON.stringify({title:details.title,image:details.image})
                await AsyncStorage.setItem(id,obj);
                console.log('Bookmark saved successfully.');
                setMarked('marked')
            }
        } catch (error) {
            console.log('Error saving bookmark:', error);
        }
    };
      
    const checkBookmarkExists = async (id) => {
        try {
            const value = await AsyncStorage.getItem(id);
            console.log(value)
            value === null ? setMarked(null) : setMarked('marked')
            return value === null ? null : 'marked'
        } catch (error) {
            console.log('Error checking bookmark existence:', error);
            return false;
        }
    };
    const getAnimeDetails = async(id:string) => {
        setLoading(true)
        const {data} = await axios.get('https://api.consumet.org/anime/gogoanime/info/'+id)
        console.log(data);
        shortenParagraph(data?.description)
        setGenre(data?.genres)
        setEpisodes(data?.episodes)
        setDetails(data)
        setLoading(false)
    } 
    function shortenParagraph(paragraph: string) {
        if (paragraph.length <= 150) {
            setSp(paragraph);
        } else {
            setSp(paragraph.substr(0, 150 - 3) + '...');
        }
    }
    const removeBookmark = async (id) => {
        try {
          await AsyncStorage.removeItem(id);
          console.log('Bookmark removed successfully.');
          setMarked(null)
        } catch (error) {
          console.log('Error removing bookmark:', error);
        }
    };
      
    return (
        <ScrollView 
            showsHorizontalScrollIndicator={false} 
            showsVerticalScrollIndicator={false}
            style={styles.container}
        >
            <SafeAreaView>
                <Ionicons name='arrow-back' size={30} onPress={()=>navigation.goBack()} />
            </SafeAreaView>
            {loading?
            <SafeAreaView>
                <ActivityIndicator size={'large'} />
            </SafeAreaView> :
            <SafeAreaView>
                <SafeAreaView style={[styles.topSec,{marginBottom:7}]}>
                    <Image source={{uri:details?.image}} style={styles.posterImage} />
                   {marked !== null?<TouchableOpacity style={{position:'absolute',bottom:0,left:100,backgroundColor:'white',width:50,height:50,borderRadius:50,justifyContent:'center',alignItems:'center'}} 
                        onPress={()=>removeBookmark(id)} 
                   >
                        <Ionicons name='heart' color={'red'} size={20} />
                    </TouchableOpacity>:<TouchableOpacity style={{position:'absolute',bottom:0,left:100,backgroundColor:'white',width:50,height:50,borderRadius:50,justifyContent:'center',alignItems:'center'}}
                        onPress={()=>saveBookmark(id)} 
                    >
                        <Ionicons name='heart-outline' color={'red'} size={20} />
                    </TouchableOpacity>}
                    <SafeAreaView style={styles.section}>
                        <Text style={styles.title}>{details?.title}</Text>
                        <SafeAreaView style={styles.marTop}>
                            <MaterialIcons name='timer' size={15} />
                            <Text style={styles.subText}>{details?.status}</Text>
                        </SafeAreaView>
                        <SafeAreaView style={styles.marTop}>
                            <MaterialIcons name='calendar-today' size={15} />
                            <Text style={styles.subText}>{details?.releaseDate}</Text>
                        </SafeAreaView>
                        <Text style={styles.para}>{sp}</Text>
                    </SafeAreaView>
                </SafeAreaView>
                
                <SafeAreaView style={[styles.genresSec,{marginTop:-10}]}>
                    <Text style={styles.menuTitle}>Genres</Text>
                    <FlatList 
                        data={genres}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        numColumns={3}
                        renderItem={({item})=>(
                            <SafeAreaView style={styles.genreCard}>
                                <Text style={styles.genText}>{item}</Text>
                            </SafeAreaView>
                        )}
                    />
                </SafeAreaView>
                <SafeAreaView style={styles.epiSec}>
                    <Text style={styles.menuTitle}>Episodes</Text>
                    <Text style={styles.subText}>No of episodes : {details?.totalEpisodes}</Text>
                    <ScrollView style={{height:260,padding:10,marginBottom:0,marginTop:10,}}>
                        {episodes&& episodes.map((item)=>(
                            <TouchableOpacity style={styles.episodeCard} onPress={()=>navigation.navigate('video',{id:item.id,name:id,epi:episodes})} key={item.episodeId}>
                                <Text style={{color:'#3d3d3d'}}>Episode : {item?.number}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaView>
            }
        </ScrollView>
    )
}

export default DetailsScreen