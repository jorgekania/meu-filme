import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { fallbackPersonImage, image185 } from '../api/moviedb';

const { width } = Dimensions.get('window');

/**
 * Componente para exibir o elenco de um filme.
 * 
 * @component
 * @param {Object[]} cast - Lista de atores do elenco.
 * @param {Object} navigation - Objeto de navegação utilizado para redirecionar para a página do ator.
 */
const Cast = ({ cast, navigation }) => {
  return (
    <View style={{ marginVertical: 12 }}>
      <Text style={{ color: 'white', fontSize: 18, marginLeft: 16, marginBottom: 8 }}>Elenco</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast.map((person, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('Person', person)}
            style={{ marginRight: 12, alignItems: 'center' }}
          >
            <View
              style={{
                overflow: 'hidden',
                borderRadius: 50,
                height: 80,
                width: 80,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#ccc',
              }}
            >
              <Image
                style={{ borderRadius: 12, height: 100, width: 80 }}
                source={{ uri: image185(person?.profile_path) || fallbackPersonImage }}
              />
            </View>

            <Text style={{ color: 'white', fontSize: 12, marginTop: 4 }}>
              {person?.character.length > 10 ? `${person.character.slice(0, 10)}...` : person?.character}
            </Text>
            <Text style={{ color: '#ccc', fontSize: 12 }}>
              {person?.original_name.length > 10 ? `${person.original_name.slice(0, 10)}...` : person?.original_name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

Cast.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      profile_path: PropTypes.string,
      character: PropTypes.string,
      original_name: PropTypes.string,
    })
  ),
  navigation: PropTypes.object.isRequired,
};

export default Cast;
