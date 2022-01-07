import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const HybridSafeAreaView = ({ children }) => {
	return <SafeAreaView style={styles.droidSafeView}>{children}</SafeAreaView>;
};

export default HybridSafeAreaView;

const styles = StyleSheet.create({
	droidSafeView: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
});
