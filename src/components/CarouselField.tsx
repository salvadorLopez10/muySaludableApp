import React from 'react'
import { Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel'

const { width: screenWidth } = Dimensions.get('window');

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
        <Carousel
            data={images}
            renderItem={({ item }) => (
                <Image source={{ uri: item.image_url }} style={styles.carouselImage} resizeMode="cover" />
            )}
            sliderWidth={screenWidth}
            itemWidth={screenWidth * 0.8}
            loop={true}
            autoplay={true}
            autoplayInterval={3000}
            removeClippedSubviews={false}
        />
  )
}

const styles = StyleSheet.create({

    carouselImage: {
        width: screenWidth * 0.8,
        height: screenWidth * 0.5,
        borderRadius: 10,
        marginVertical: 20,
    }

});