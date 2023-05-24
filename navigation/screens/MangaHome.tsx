import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const MangaHome = ({navigation}) => {
    const [manga,setManga] = useState([])
    useEffect(()=>{

        return()=>{
            setManga([])
        }
    },[])
    return (
        <View style={styles.container}>
            <Text style={styles.title}>MangaHome</Text>
            {manga.length !== 0 ?<FlatList
                data={manga}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item})=>(
                    <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('details',{id:item?.title?.romaji})}>
                        <Image source={{uri: item?.coverImage?.extraLarge}} style={styles.posterImage} />
                        <Text style={styles.heading}>{item?.title?.romaji}</Text>
                    </TouchableOpacity>
                )}
                numColumns={2}
            />:<SafeAreaView style={{justifyContent:'center',alignItems:'center',marginTop:20}}>
                    <Image source={{uri:'https://m.media-amazon.com/images/I/A1OG0OyCZuL._SL1500_.jpg'}} style={{width:200,height:200,borderRadius:20}} />
                    <Text style={styles.title}>Search for manga</Text>
                    <Text style={[styles.title,{fontSize:17}]}>(BookMarked manga will be shown here)</Text>
                </SafeAreaView>}
        </View>
    )
}

export default MangaHome

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:'#f6f6f6'
    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        color:'#3d3d3d',
        marginBottom:20
    },
    card:{
        width: 180,
        height: 250,
        marginRight: 20,
    },
    heading:{
        fontSize:17,
        color: '#30241b',
        margin: 10,
        fontWeight:'bold',
        marginLeft:2
    },
    posterImage:{
        height: 200,
        width: 150,
        borderRadius: 10,
    },
})