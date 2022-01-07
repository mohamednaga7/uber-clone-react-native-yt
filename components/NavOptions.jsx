import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectOrigin } from '../slices/navSlice';

const data = [
	{
		id: 456,
		title: 'Order Food',
		image:
			'https://i.pinimg.com/originals/4f/eb/74/4feb745209cf7aba57463b20d27b61e3.png',
		screen: 'EatsScreen',
	},
];

const NavOptions = () => {
	const navigation = useNavigation();
	const origin = useSelector(selectOrigin);
	return (
		<View style={tw`flex-row`}>
			<TouchableOpacity
				style={tw`p-2 pt-4 pl-6 pb-8 my-2 mr-2 flex-grow bg-gray-200`}
				onPress={() => navigation.navigate('MapScreen')}
				disabled={!origin}
			>
				<View style={tw`${!origin && 'opacity-20'}`}>
					<Image
						style={{ width: 120, height: 120, resizeMode: 'contain' }}
						source={{
							uri: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png',
						}}
					/>
					<Text style={tw`mt-2 text-lg font-semibold`}>{'Get a ride'}</Text>
					<Icon
						style={tw`p-2 bg-black rounded-full w-10 mt-4`}
						type='antdesign'
						name='arrowright'
						color='white'
					/>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				style={tw`p-2 pt-4 pl-6 pb-8 my-2 ml-2 flex-grow bg-gray-200`}
				onPress={() => navigation.navigate('EatsScreen')}
				disabled={!origin}
			>
				<View style={tw`${!origin && 'opacity-20'}`}>
					<Image
						style={{ width: 120, height: 120, resizeMode: 'contain' }}
						source={{
							uri: 'https://i.pinimg.com/originals/4f/eb/74/4feb745209cf7aba57463b20d27b61e3.png',
						}}
					/>
					<Text style={tw`mt-2 text-lg font-semibold`}>{'Order Food'}</Text>
					<Icon
						style={tw`p-2 bg-black rounded-full w-10 mt-4`}
						type='antdesign'
						name='arrowright'
						color='white'
					/>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default NavOptions;
