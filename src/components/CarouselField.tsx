import React from 'react'
import { Image, Dimensions, StyleSheet, View, Text } from 'react-native';
//import Carousel from 'react-native-snap-carousel'
import Swiper from "react-native-swiper";

const { width: screenWidth } = Dimensions.get('window');
const itemSize = screenWidth * 0.55;


type CarouselFieldProps = {
    images: {
      id: number;
      image_url: string;
      titulo?: string;
    }[];
  };

export const CarouselField: React.FC<CarouselFieldProps> = ({ images }) => {
    //const images = carouselImages;
      
    return (
        // <View style={{ alignItems: 'center', marginVertical: 10, marginTop:10 }}>
        <View style={styles.swiperContainer}>


            {/* <Carousel
                data={images}
                renderItem={({ item }) => (
                    <Image source={{ uri: item.image_url }} style={styles.carouselImage} resizeMode="cover" />
                )}
                sliderWidth={screenWidth}
                //itemWidth={screenWidth * 0.8}
                itemWidth={itemSize}
                loop={true}
                autoplay={true}
                autoplayInterval={3000}
                removeClippedSubviews={false}
            /> */}

          <Swiper
            key={images.length}
            autoplay={false}
            loop={true}
            showsPagination={true}
            showsButtons={true}
            //autoplayTimeout={3}
            style={styles.swiper}
            paginationStyle={styles.pagination}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
            nextButton={<Text style={styles.buttonText}>›</Text>}
            prevButton={<Text style={styles.buttonText}>‹</Text>}
          >
            
              { images.length ? (
                  images.map((item) => (
                    <View key={item.id} style={styles.slide}>
                        <Image
                          source={{ uri: item.image_url }}
                          style={styles.image}
                          resizeMode="cover"
                      />
                    </View>
                  ))
                ) : (
                  <View style={styles.slide}>
                      <Text style={styles.text}>No hay imágenes disponibles</Text>
                  </View>
                )
              }
          </Swiper>
        </View>
  )
}
 
const styles = StyleSheet.create({
  swiperContainer: {
    marginTop: 10,
    marginBottom: 10,
    height: itemSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiper: {
    height: itemSize,
    //margin: 30,
  },
  slide: {
    //width: itemSize+100,
    height: itemSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: itemSize + 100,
    height: itemSize,
    borderRadius: 10,
  },
  pagination: {
    //bottom: -20, // puedes ajustar si se superpone
  },
  dot: {
    backgroundColor: 'rgba(250, 160, 41, 0.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#FAA029',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  buttonText: {
    color: 'rgba(250, 160, 41, 1)',
    fontSize: 50,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    fontFamily: "Gotham-Ultra",
    marginVertical: 5,
    color: "#2E2A21",
  }

});