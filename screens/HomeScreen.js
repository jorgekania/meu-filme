import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { StatusBar } from 'expo-status-bar';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { styles } from '../theme';
import {whichPlatform} from "../constants";

export default function HomeScreen() {

  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  useEffect(()=>{
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  },[]);

  const getTrendingMovies = async ()=>{
    const data = await fetchTrendingMovies();
    console.log('em lançamentos', data.results.length)
    if(data && data.results) setTrending(data.results);
    setLoading(false)
  }
  const getUpcomingMovies = async ()=>{
    const data = await fetchUpcomingMovies();
    console.log('em breve', data.results.length)
    if(data && data.results) setUpcoming(data.results);
  }
  const getTopRatedMovies = async ()=>{
    const data = await fetchTopRatedMovies();
    console.log('em mais votados', data.results.length)
    if(data && data.results) setTopRated(data.results);
  }



  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar */}
      <SafeAreaView className={whichPlatform? "-mb-2": "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text 
            className="text-white text-3xl font-bold mb-3 mt-3">
              <Text style={styles.text}>Meus</Text>Filmes
          </Text>
          <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {
        loading? (
          <Loading />
        ):(
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{paddingBottom: 10}}
          >

            {/* Trending Movies Carousel */}
            { trending.length>0 && <TrendingMovies data={trending} /> }

            {/* upcoming movies row */}
            { upcoming.length>0 && <MovieList title="Em breve" data={upcoming} /> }
            

            {/* top rated movies row */}
            { topRated.length>0 && <MovieList title="Mais votados" data={topRated} /> }

          </ScrollView>
        )
      }
      
  </View>
  )
}
