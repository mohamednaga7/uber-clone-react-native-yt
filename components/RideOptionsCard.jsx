import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectTravelTimeInformation } from '../slices/navSlice';

const data = [
	{
		id: 'Uber-X-123',
		title: 'UberX',
		multiplier: 1,
		image: 'https://links.papareact.com/3pn',
	},
	{
		id: 'Uber-XL-456',
		title: 'Uber XL',
		multiplier: 1.2,
		image: 'https://links.papareact.com/5w8',
	},
	{
		id: 'Uber-LUX-789',
		title: 'Uber LUX',
		multiplier: 1.75,
		image: 'https://links.papareact.com/7pf',
	},
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
	const navigation = useNavigation();
	const [selected, setSelected] = useState(null);
	const travelTimeInformation = useSelector(selectTravelTimeInformation);
	return (
		<SafeAreaView style={tw`bg-white flex-grow mb-12`}>
			<View>
				<TouchableOpacity
					style={[tw`absolute top-3 left-5 p-3 rounded-full`, { zIndex: 1 }]}
					onPress={() => {
						navigation.navigate('NavigateCard');
					}}
				>
					<Icon name='chevron-left' type='fontawesome' />
				</TouchableOpacity>
				<Text style={tw`text-center py-5 text-xl`}>
					Select a Ride - {travelTimeInformation?.distance?.text}
				</Text>
			</View>
			<ScrollView style={{ paddingBottom: 50 }}>
				{data.map((item) => (
					<TouchableOpacity
						key={item.id}
						onPress={() => setSelected(item)}
						style={tw`flex-row justify-between items-center px-10 ${
							item.id === selected?.id && 'bg-gray-200'
						}`}
					>
						<Image
							style={{ width: 100, height: 100, resizeMode: 'contain' }}
							source={{ uri: item.image }}
						/>
						<View style={tw`-ml-6`}>
							<Text style={tw`text-xl font-semibold`}>{item.title}</Text>
							<Text>{travelTimeInformation?.duration?.text}</Text>
						</View>
						<Text style={tw`text-xl`}>
							{new Intl.NumberFormat('en-EG', {
								style: 'currency',
								currency: 'EGP',
							}).format(
								(travelTimeInformation?.duration?.value *
									SURGE_CHARGE_RATE *
									item.multiplier) /
									100
							)}
						</Text>
					</TouchableOpacity>
				))}
				<View style={tw`mt-auto border-t border-gray-200`}>
					<TouchableOpacity
						style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}
						disabled={!selected}
					>
						<Text style={tw`text-center text-white text-xl`}>
							Choose {selected?.title}
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
