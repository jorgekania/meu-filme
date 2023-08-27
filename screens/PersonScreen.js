import { View, Text, Image, TouchableOpacity, Platform, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/movieList';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image185, image342, image500 } from '../api/moviedb';
import Loading from '../components/loading';
import { styles } from '../theme';
import {whichPlatform} from "../constants";
import {dateFormat} from "../helpers/dateFormat";

const verticalMargin = whichPlatform? '':' my-3';
var {width, height} = Dimensions.get('window');

export default function PersonScreen() {
    const {params: item} = useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const navigation = useNavigation();
    const [person, setPerson] = useState({});
    const [personMovies, setPersonMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    },[item]);

    const getPersonDetails = async id=>{
        const data = await fetchPersonDetails(id);
        console.log('em detalhes do ator');
        setLoading(false);
        if(data) {
            setPerson(data);
        }
    }
    const getPersonMovies = async id=>{
        const data = await fetchPersonMovies(id);
        console.log('em atores do filme')
        if(data && data.cast){
            setPersonMovies(data.cast);
        }

    }

  return (
    <ScrollView 
        className="flex-1 bg-neutral-900" 
        contentContainerStyle={{paddingBottom: 20}}>
        {/* back button */}
        <SafeAreaView 
            className={"flex-row justify-between items-center mx-4 z-10 "+verticalMargin}>
            <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={()=> navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)}>
                <HeartIcon size="35" color={isFavourite? 'red': 'white'} />
            </TouchableOpacity>
        </SafeAreaView>

        {/* person details */}
        {
            loading? (
                <Loading />
            ):(
                <View>
                    <View 
                        className="flex-row justify-center"
                        style={{
                            shadowColor: 'gray',
                            shadowRadius: 40,
                            shadowOffset: {width: 0, height: 5},
                            shadowOpacity: 1,
                        }}
                    >
                        <View 
                        className="items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2">
                            <Image 
                                source={{uri: image342(person?.profile_path) || fallbackPersonImage}}
                                style={{height: height*0.43, width: width*0.74}}
                            />
                        </View>
                    </View>
                
                    <View className="mt-6">
                        <Text className="text-3xl text-white font-bold text-center">
                            {person?.name}
                        </Text>
                        <Text className="text-neutral-500 text-base text-center">
                            {person?.place_of_birth}
                        </Text>
                    </View>
        
                    <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full ">
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                            <Text className="text-white font-semibold ">Gen.</Text>
                            <Text className="text-neutral-300 text-sm">
                                {
                                    person?.gender==1? 'Feminino': 'Masculino'
                                }
                            </Text>
                        </View>
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                            <Text className="text-white font-semibold">Aniv.</Text>
                            <Text className="text-neutral-300 text-sm">
                                {person?.birthday ? dateFormat(person?.birthday) : "-"}
                            </Text>
                        </View>
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                            <Text className="text-white font-semibold">Como</Text>
                            <Text className="text-neutral-300 text-sm">                                
                                {person?.known_for_department}
                            </Text>
                        </View>
                        <View className="px-2 items-center">
                            <Text className="text-white font-semibold">Popul.</Text>
                            <Text className="text-neutral-300 text-sm">
                                {person?.popularity?.toFixed(2)} %
                            </Text>
                        </View>
                        
                    </View>
                    <View className="my-6 mx-4 space-y-2">
                        <Text className="text-white text-lg">Biografia</Text>
                        <Text className="text-neutral-400 tracking-wide">
                            {
                                person?.biography? person.biography : 'N/A'
                            }
                        </Text>
                    </View>
                    { person?.id && personMovies.length>0 && <MovieList title="Filmes" hideSeeAll={true} data={personMovies} /> }
                
                </View>
            )
        }
       
        

    </ScrollView>
    
  )
}