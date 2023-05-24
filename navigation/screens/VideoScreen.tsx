import { ActivityIndicator, Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ResizeMode, Video } from 'expo-av'
import * as ScreenOrentation from 'expo-screen-orientation'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios'

const VideoScreen = ({navigation,route}) => {
    const video = useRef()
    const {id,name,epi} = route.params
    const [orientation,setOrientation] = useState(true)
    const [idd,setId] = useState(id)
    const [episodes,setEpisodes] = useState(epi)
    const [loading,setLoading] = useState(false)
    const [dropdownOptions,setdropdownOptions] = useState([
        {value:'340p'},
        {value:'420p'},
        {value:'720p'},
    ])
    const [urls,setUrls] = useState([])
    const [url,setUrl] = useState(null)
    const [selectedValue, setSelectedValue] = useState("360p");
    console.log(selectedValue)
    async function changeOrentaion() {
        if(orientation === true){
            ScreenOrentation.lockAsync(ScreenOrentation.OrientationLock.LANDSCAPE)
        }else if(orientation === false){
            ScreenOrentation.lockAsync(ScreenOrentation.OrientationLock.PORTRAIT)
        }
    }
    const toggleOrientation =()=>{
        setOrientation(!orientation)
        changeOrentaion()
    }
    const navi = useNavigation().navigate
    useEffect(()=>{
        fetchVideo()
        console.log(idd)
        return()=>{
            console.log("destoried")
            ScreenOrentation.lockAsync(ScreenOrentation.OrientationLock.PORTRAIT)
        }
    },[idd])
    const handleVideoChange = (value) => {
        console.log(value)
        setId(value);
    };
    //streaming function
    async function fetchVideo() {
        setLoading(true);
        const {data} = await axios.get(`https://api.consumet.org/anime/gogoanime/watch/${idd}?server=vidstreaming`)
        console.log(data)
        getQualityValues(data?.sources);
        setLoading(false);
    }
    const getQualityValues = (dataArray) => {
        const Urls = dataArray.map((item) => [{value:item.quality,url:item.url}]);
        setUrls(Urls);
        const quantity = dataArray.map((item) => item.quality);
        const url = dataArray.find((item) => item.quality === 'default' && item.url[4]);
        setUrl(url.url)
        setdropdownOptions(quantity)
        console.log('url',url)
    };
    const handleQualityChange = () => {
        setLoading(true);
        console.log(selectedValue)
        const Qurl = urls.find((item)=>item[0]?.value === selectedValue)
        setUrl(Qurl[0]?.url)
        setLoading(false);
    };
    return (
        <ScrollView style={styles.container}>
            <SafeAreaView style={styles.nav}>
                <Ionicons name='arrow-back' size={30} color={'#3d3d3d'} onPress={async()=>{
                    navigation.navigate('details',{id:name})
                }} />
                <Text style={styles.navText}>{idd}</Text>
            </SafeAreaView>
            {loading? <ActivityIndicator size={'large'} />  :<SafeAreaView>
                <Video 
                    ref={video}
                    style={styles.video}
                    source={{uri:url}}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay
                />
                <Button 
                    title={orientation ? 'Landscape':'Potrait'}
                    onPress={toggleOrientation}
                />
                <SafeAreaView style={[styles.settings, { flexDirection: 'row',justifyContent:'flex-start',alignItems:'center' }]}>
                    <Text style={styles.qualityText}>Quality :</Text>
                    <SelectList 
                        setSelected={setSelectedValue}
                        data={dropdownOptions}
                        placeholder='select quality'
                        dropdownStyles={{ width:190,marginLeft:20}}
                        boxStyles={{width:190,marginLeft:20}}
                        onSelect={handleQualityChange}
                    />
                </SafeAreaView>
                <Text style={styles.title}>Other episodes :</Text>
                <ScrollView style={{height:340,padding:10}}>
                    {episodes&& episodes.map((item)=>(
                        <TouchableOpacity style={styles.episodeCard} onPress={()=>handleVideoChange(item.id)} key={item.episodeId}>
                            <Text style={{color:'#3d3d3d'}}>Episode : {item?.number}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </SafeAreaView>}
        </ScrollView>
    )
}

export default VideoScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:40,
        backgroundColor:'#f1f1f1'
    },
    video:{
        height:220,
        width:'100%',
        marginTop:10
    },
    nav:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    navText:{
        fontWeight:'bold',
        marginLeft:20,
        fontSize:17,
        width:300,
        color:'#3d3d3d'
    },
    settings:{
        width:'100%',
        flexDirection:'row',
        padding:10,
        justifyContent:'flex-start',
        alignItems:'center',
    },
    qualityText:{
        fontWeight:'bold',
        fontSize:18,
        marginLeft:1,
        color:'#3d3d3d',
        marginTop:20,
        
    },
    dropdown: {
        borderColor: "#B7B7B7",
        height: 50,
    },
    episodeCard:{
        paddingHorizontal:20,
        paddingVertical:13,
        borderWidth:1,
        margin:4,
        borderColor:'#ccb3b4'
    },
    title:{
        fontWeight:'bold',
        fontSize:20,
        color:'#3d3d3d',
        marginLeft:10
    },
})