import { SafeAreaView, ScrollView, StyleSheet, Text, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AnimeProvider } from '../../hooks/AnimeHook'
import { SliderBox } from 'react-native-image-slider-box';
import * as ScreenOrentation from 'expo-screen-orientation';

interface anime {
    animeId:string,
    animeImg:string,
}

const RenderLoadingIndicator = () => {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  };

const HomeScreen = ({navigation,route}) => {
    const {list,isLoading,topAired,movies} = useContext(AnimeProvider)
    const banner = [
        'https://wallpapercave.com/dwp1x/wp9995094.jpg',
        'https://e1.pxfuel.com/desktop-wallpaper/503/799/desktop-wallpaper-demon-slayer-kimetsu-no-yaiba-series-demon-slayer-banner-thumbnail.jpg'
    ]
    let navigate = (id:string)=>{
        navigation.navigate('details',{id:id})
    }
    useEffect(()=>{
        ScreenOrentation.lockAsync(ScreenOrentation.OrientationLock.PORTRAIT)
    },[])
    return (
        <ScrollView style={styles.container}>
            <SafeAreaView style={styles.slider}>
                <SliderBox
                    images={banner}
                    dotColor="#30241b"
                    sliderBoxHeight={200}
                />
            </SafeAreaView>
            <Text style={styles.subTitle}>Top Popular Anime</Text>
            <SafeAreaView style={styles.margin}>
            {isLoading ? <RenderLoadingIndicator />:<FlatList
                    data={list}
                    horizontal
                    renderItem={({item})=>(
                        <TouchableOpacity style={styles.card} onPress={()=>navigate(item.animeId)}>
                            <Image style={styles.posterImage} source={{uri: item.animeImg}} />
                            <Text style={{fontSize:17,color: '#30241b',margin: 10,fontWeight:'bold'}}>{item.animeId}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={isLoading ? RenderLoadingIndicator : null}
                    showsHorizontalScrollIndicator={false}
                />}
            </SafeAreaView>
            <Text style={styles.subTitle}>Top Airing Anime</Text>
            <SafeAreaView style={styles.margin}>
                {isLoading ? <RenderLoadingIndicator />:<FlatList
                    data={topAired}
                    horizontal
                    renderItem={({item})=>(
                        <TouchableOpacity style={styles.card} onPress={()=>navigate(item.id)}>
                            <Image style={styles.posterImage} source={{uri: item.image}} />
                            <Text style={{fontSize:17,color: '#30241b',margin: 10,fontWeight:'bold'}}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={isLoading ? RenderLoadingIndicator : null}
                    showsHorizontalScrollIndicator={false}
                />}
            </SafeAreaView>
            <Text style={styles.subTitle}>Top Movies</Text>
            <SafeAreaView style={styles.margin}>
                <FlatList
                    data={movies}
                    horizontal
                    renderItem={({item})=>(
                        <TouchableOpacity style={styles.card} onPress={()=>navigate(item.animeId)}>
                            <Image style={styles.posterImage} source={{uri: item.animeImg}} />
                            <Text style={{fontSize:17,color: '#30241b',margin: 10,fontWeight:'bold'}}>{item.animeId}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={isLoading ? RenderLoadingIndicator : null}
                    showsHorizontalScrollIndicator={false}
                />
                </SafeAreaView>
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#f6f6f6',
        color:'#30241b'
    },
    slider:{
        marginRight:10
    },
    cardSlide:{
        height:200
    },
    margin:{
        padding:10,
        width: '100%',
        height: 380,
    },
    card:{
        width: 200,
        height: 350,
        marginRight: 20,
    },
    heading:{
        fontSize: 19,
        color:'#30241b',
        margin: 10,
        fontWeight: 600,
    },
    posterImage:{
        height: 250,
        width: 200,
        borderRadius: 10,
    },
    subTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'#30241b',
        marginTop: 10,
        marginLeft: 10,
    },
})