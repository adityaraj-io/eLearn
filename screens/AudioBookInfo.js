import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AudioPlayer from '../components/AudioPlayer';
import { getDatabase, onValue, ref  } from 'firebase/database';
import { FirebaseApp } from '../firebaseConfig';
import StarRating from 'react-native-star-rating';

const AudioBookInfo = ({ route, navigation }) => {
    const { name, image, author, rating, description, category } = route.params;
    const database = getDatabase(FirebaseApp);
  
    const [audios, setAudios] = useState([]);
    useEffect(() => {
      navigation.setOptions({
        headerTitle: name,
      });
  
      const startCountRef = ref(database, `AudioBooks/${name}/audios`);
      onValue(startCountRef, async (snapshot) => {
        const data = await snapshot.val();
        if (data !== null) {
          const audiosSet = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setAudios(audiosSet);
        } else {
          console.log('null');
        }
      });
    }, []);
  
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{name} by {author}</Text>
            <Text style={styles.categoryText}>In {category} Category Books</Text>
          </View>
  
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
  
          <View style={styles.rating}>
          <Text style={[styles.ratingText, {marginRight: 10}]}>{rating}</Text>
            <StarRating rating={rating} disabled starSize={25} fullStarColor='#DAA520' />
          </View>
  
          <View style={styles.ratingPercent}>
            <Text style={{ color: 'gray', fontSize: 15 }}>{(rating / 5) * 100}% users like this book</Text>
          </View>
  
          <View style={styles.description}>
            <Text selectable selectionColor="#DAA520" style={styles.descriptionText}>
              {description}
            </Text>
          </View>
  
          <Text style={{ marginHorizontal: 10, fontSize: 18, fontWeight: 'bold', marginVertical: 20 }}>Listen to this book</Text>
          
          {audios.map((item, index) => (
            <AudioPlayer key={item.name.toString()} source={item.source} name={item.name} />
          ))}
        </View>
      </KeyboardAwareScrollView>
    );
  };

export default AudioBookInfo

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'left',
        justifyContent: 'flex-start',
        padding: 10,
    },
    textContainer: {
        padding: 10
    },
    imageContainer: {
        height: Dimensions.get('window').width/1.5,
        backgroundColor: '#D3D3D3',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'lightgray',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#DAA520',
        fontStyle: 'italic',
        textAlign: 'right'
    },
    nameText: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    image: {
        width: 170,
        height: '100%'
    },
    rating: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingTop: 10,
    },
    ratingText: {
        fontSize: 27,
        fontWeight: 'bold'
    },
    star: {
        marginHorizontal: 10
    },
    ratingPercent: {
        paddingHorizontal: 10,
    },
    description: {
        paddingHorizontal: 10,
        paddingTop: 30,
        paddingBottom: 10,
    },
    descriptionText: {
        fontSize: 18,
        color: '#404040',
        letterSpacing: 0.7,
    },
    buttonContainer: {
        backgroundColor: 'black',
        width: '100%',
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: StyleSheet.hairlineWidth,
        // padding: 20
    },
    buttonText: {
        color: 'white',
    },
    buttonView: {
        width: '100%',
        marginVertical: 5,
        padding: 20,
        alignItems: 'center'
    },
    audioView: {
        width: '100%',
        padding: 10
    },
    audioOpacity: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        padding: 20,
        borderRadius: 15,
    }
})