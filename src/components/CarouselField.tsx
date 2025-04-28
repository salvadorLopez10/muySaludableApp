import React from 'react'
import { Image, Dimensions, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-snap-carousel'

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
        <View style={{ alignItems: 'center', marginVertical: 10, marginTop:10 }}>
            <Carousel
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
            />
        </View>
  )
}

const styles = StyleSheet.create({
    /*
    carouselImage: {
        width: screenWidth * 0.55,
        height: screenWidth * 0.55,
        borderRadius: 10,
       // marginVertical: 20,
    }
       */
    carouselItem: {
        width: itemSize,
        height: itemSize,
        justifyContent: 'center',
        alignItems: 'center',
      },
      carouselImage: {
        width: itemSize,
        height: itemSize,
        borderRadius: 10,
      },

});