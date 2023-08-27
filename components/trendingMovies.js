import { View, Text, Image, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moviedb';

var {width, height} = Dimensions.get('window');

/**
 * Componente que exibe os filmes em destaque.
 * 
 * @component
 * @param {Array} data - Os dados dos filmes em destaque.
 */
export default function TrendingMovies({data}) {
    const navigation = useNavigation();

    const handleClick = item=>{
        navigation.navigate('Movie', item);
    }
  return (
    <View className="mb-8">

      <Text className="text-white text-xl mx-4 mb-5">Lançamentos</Text>
      <Carousel
            data={data}
            renderItem={({item})=> <MovieCard handleClick={handleClick} item={item} />}
            firstItem={1}
            loop={true}
            inactiveSlideScale={0.86}
            inactiveSlideOpacity={0.30}
            sliderWidth={width}
            itemWidth={width*0.62}
            slideStyle={{display: 'flex', alignItems: 'center'}}
        />
    </View>
  )
}

/**
 * Componente que exibe um cartão de filme.
 * 
 * @component
 * @param {Object} item - Os dados do filme.
 * @param {Function} handleClick - Função chamada ao clicar no cartão.
 */
const MovieCard = ({item, handleClick})=>{

    return (
        <TouchableWithoutFeedback onPress={()=> handleClick(item)}>
            <Image 
                // source={require('../assets/images/moviePoster1.png')} 
                source={{uri: image500(item.poster_path)}} 
                style={{
                    width: width * 0.6,
                    height: height * 0.4
                }}
                className="rounded-3xl" 
            />
        </TouchableWithoutFeedback>
    )
}