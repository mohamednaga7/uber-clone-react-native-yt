import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import HybridSafeAreaView from './HybridSafeAreaView';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {
	const dispatch = useDispatch();

	return (
		<HybridSafeAreaView style={tw`bg-white h-full`}>
			<View style={tw`p-5`}>
				<Image
					style={{
						width: 100,
						height: 100,
						resizeMode: 'contain',
					}}
					source={{
						uri: 'https://download.logo.wine/logo/Uber/Uber-Logo.wine.png',
					}}
				/>
				<GooglePlacesAutocomplete
					placeholder='Where From?'
					nearbyPlacesAPI='GooglePlacesSearch'
					debounce={400}
					styles={{
						container: {
							flex: 0,
						},
						textInput: {
							fontSize: 18,
						},
					}}
					onPress={(data, details = null) => {
						dispatch(
							setOrigin({
								location: details.geometry.location,
								description: data.description,
							})
						);

						dispatch(setDestination(null));
					}}
					fetchDetails={true}
					returnKeyType={'search'}
					enablePoweredByContainer={false}
					minLength={2}
					query={{
						key: GOOGLE_MAPS_API_KEY,
						language: 'en',
					}}
				/>
				<NavOptions />
				<NavFavourites />
			</View>
		</HybridSafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});