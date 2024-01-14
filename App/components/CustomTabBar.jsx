import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.tabBarOverallContainer}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/images/logo.png')} // Update the path to your logo
                    style={styles.logo}
                />
            </View>
            <View style={styles.tabContainer}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label = route.name;
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            style={styles.tabButton}
                        >
                            <Text style={[styles.tabButtonText, isFocused ? styles.tabButtonFocused : {}]}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tabBarOverallContainer: {
        backgroundColor: 'black',
    },
    logoContainer: {
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingTop: hp('4%'),
    },
    logo: {
        width: wp('10%'),
        height: hp('10%'),
        resizeMode: 'contain',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: hp('0%'),
    },
    tabButton: {
        padding: 10,
    },
    tabButtonText: {
        color: '#222',
        fontSize: wp('5%'), // Customize the font size here
    },
    tabButtonFocused: {
        color: '#fff',
    },
});

export default CustomTabBar;
