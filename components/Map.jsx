import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import {
	selectDestination,
	selectOrigin,
	setTravelTimeInformation,
} from '../slices/navSlice';
import { GOOGLE_MAPS_API_KEY } from '@env';

const Map = () => {
	const origin = useSelector(selectOrigin);
	const destination = useSelector(selectDestination);
	const mapRef = useRef();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!origin || !destination) {
			return;
		}
		mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
			edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
		});
	}, [origin, destination]);

	useEffect(() => {
		const getTravelTime = async () => {
			if (!origin || !destination) {
				return;
			}
			const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.location.lat},${origin.location.lng}&destinations=${destination.location.lat},${destination.location.lng}&key=${GOOGLE_MAPS_API_KEY}`;
			const response = await fetch(url);
			const json = await response.json();
			dispatch(setTravelTimeInformation(json.rows[0].elements[0]));
		};
		getTravelTime();
	}, [origin, destination, GOOGLE_MAPS_API_KEY]);

	return (
		<MapView
			ref={mapRef}
			style={tw`flex-1`}
			mapType='mutedStandard'
			initialRegion={{
				latitude: origin.location.lat,
				longitude: origin.location.lng,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005,
			}}
		>
			{origin && destination && (
				<MapViewDirections
					apikey={GOOGLE_MAPS_API_KEY}
					origin={origin.description}
					destination={destination.description}
					strokeWidth={3}
					strokeColor='black'
				/>
			)}

			{origin?.location && (
				<Marker
					coordinate={{
						latitude: origin.location.lat,
						longitude: origin.location.lng,
					}}
					title='Origin'
					description={origin.description}
					identifier='origin'
				/>
			)}

			{destination?.location && (
				<Marker
					coordinate={{
						latitude: destination.location.lat,
						longitude: destination.location.lng,
					}}
					title='Destination'
					description={destination.description}
					identifier='destination'
				/>
			)}
		</MapView>
	);
};

export default Map;

const styles = StyleSheet.create({});
