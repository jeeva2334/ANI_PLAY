import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { AnimeProvider } from '../../hooks/AnimeHook'

const SearchPage = ({navigation}) => {
    const [searchBox,setSearchBox] = useState('')
    const [searched,setSearched] = useState(false)
    const [loading,setLoading] = useState(false)
    const [sp,setSp] = useState('')
    const {search,result,setresult} = useContext(AnimeProvider)
    const fetch =  async () => {
        setLoading(true)
        search(searchBox)
        setSearched(true)
        console.log(result)
        setLoading(false)
    }
    useEffect(()=>{
        return()=>{
            setSearched(false)
            setresult([])
            console.log(result.length)
            console.log("destroyed")
        }
    },[])
    function shortenParagraph(paragraph: string) {
        if (paragraph.length <= 150) {
            setSp(paragraph);
        } else {
            setSp(paragraph.substr(0, 150 - 3) + '...');
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={styles.nav}>
                <Ionicons name='close' size={39} onPress={()=>navigation.goBack()} />
                <Text style={styles.title}>Search</Text>
            </SafeAreaView>
            <SafeAreaView style={styles.nav}>
                <TextInput
                    style={styles.box}
                    placeholder="Enter anime name"
                    value={searchBox}
                    onChangeText={setSearchBox}
                />
                {loading? <ActivityIndicator size={'large'} style={styles.searchBtn} color={'#3d3d3d'} />: <TouchableOpacity style={styles.searchBtn} onPress={fetch}><Ionicons name='search' size={20} /></TouchableOpacity>}
            </SafeAreaView>
            <Text style={[styles.title,{fontSize:29,marginLeft:0}]}>Result</Text>
            <ScrollView style={{width:"100%"}} showsVerticalScrollIndicator={false}>
                    {searched === true && result.length !== 0 ? result.map((item)=>(<TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('details',{id:item.id})}>
                    <SafeAreaView style={{width:"40%"}}>
                        <Image
                            source={{uri:item?.image}}
                            style={styles.image}
                        />
                    </SafeAreaView>
                    <SafeAreaView style={{paddingLeft:6,width:"60%"}}>
                        <Text style={styles.innerTitle}>{item?.title}</Text>
                        <View style={styles.status}>
                            <Ionicons name='calendar-outline' size={14} style={[styles.para,{marginRight:5}]} />
                            <Text style={styles.para}>{item.releaseDate}</Text>
                        </View>
                        <View style={styles.status}>
                            <Ionicons name='language-outline' size={14} style={[styles.para,{marginRight:5}]} />
                            <Text style={styles.para}>{item.subOrDub}</Text>
                        </View>
                    </SafeAreaView>
                </TouchableOpacity>)):<Text style={[styles.title,{fontSize:29,marginLeft:0}]}>No Results Found</Text>}
            </ScrollView>
        </SafeAreaView>
    )
}

export default SearchPage

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:0,
        padding:20,
        backgroundColor:'#f1f1f1'
    },
    box:{ 
        height: 40, 
        borderWidth: 1, 
        paddingHorizontal: 10,
        borderRadius:10,
        borderColor:'#3d3d3d',
        color:'#3d3d3d',
        width:'80%'
    },
    title:{
        fontSize:39,
        fontWeight:'900',
        marginBottom:10,
        marginLeft:20,
        color:'#3d3d3d',
    },
    nav:{
        flexDirection:'row',
        alignItems:'center',
    },
    searchBtn:{
        marginLeft:10,
        padding:10,
        borderWidth:1,
        borderRadius:10,
        color:'#3d3d3d',
    },
    card:{
        padding:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        alignSelf:'center',
        borderWidth:1,
        borderColor:'#3d3d3d',
        borderRadius:10,
        marginTop:20,
        width:'90%'
    },
    para:{
        fontWeight:'600',
        marginTop:10
    },
    innerTitle:{
        fontWeight:'900',
        fontSize:20,
        marginTop:-30,
        width:"60%",
        marginLeft:20
    },
    image:{
        height:150,
        width:100,
        borderRadius:10,
        marginTop:-30
    },
    status:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        width:190,
        height:50,
    }
})