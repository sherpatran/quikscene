import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from "react-native-map-clustering";


const mapJson = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 65
            },
            {
                "visibility": "on"
            },
            {
                "color": "#fbfbfb"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f6f6f6"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": "50"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c3c3c3"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "30"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "40"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ffff00"
            },
            {
                "lightness": -25
            },
            {
                "saturation": -97
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e2e2e2"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": -25
            },
            {
                "saturation": -100
            }
        ]
    }
]

const points = [{ latitude: 34.413460120298616, longitude: -119.86105098277051 }];
const startRegion = getRegionForCoordinates(points, 80);


export default function GlobalPage() {
    const [posts, setPosts] = useState([]);
    const mapRef = React.createRef();
    const db = getFirestore(); // Get Firestore instance

    useEffect(() => {
        // Listener for real-time updates
        const unsubscribe = onSnapshot(collection(db, 'posts'),
            (querySnapshot) => {
                const fetchedPosts = querySnapshot.docs
                    .map(doc => {
                        const data = doc.data();
                        return {
                            ...data,
                            id: doc.id,
                            location: data.location ? {
                                latitude: data.location.latitude,
                                longitude: data.location.longitude,
                            } : null
                        };
                    })
                    .filter(post => post.location && !isNaN(post.location.latitude) && !isNaN(post.location.longitude)); // Filter out posts without a valid location

                setPosts(fetchedPosts);
            }, error => {
                console.error(error);
            }
        );

        // Detach listener on component unmount
        return () => unsubscribe();
    }, [db]);

    const onMarkerPress = (post) => {
        const newRegion = {
            latitude: post.location.latitude,
            longitude: post.location.longitude,
        };

        if (mapRef.current) {
            mapRef.current.animateToRegion(newRegion, 100);
        }
    };

    const renderStars = (rating) => {
        let stars = '';
        for (let i = 0; i < rating; i++) {
            stars += '★';
        }
        return stars;
    };

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                ref={mapRef}
                customMapStyle={mapJson}
                style={styles.map}
                region={startRegion}>
                {posts.map(post => (
                    <Marker
                        key={post.id}
                        coordinate={{ latitude: post.location.latitude, longitude: post.location.longitude }}
                        title={post.eventTitle}
                        description={`Rating: ${post.rating}`}
                        onPress={() => onMarkerPress(post)}
                    >
                        <Image source={require('../../../assets/images/qpin.png')} style={{ height: 42, width: 42 }} />
                        <Callout>
                            <View style={stylesc.calloutView}>
                                <Text style={styles.title}>{post.eventTitle}</Text>
                                <Text style={styles.rating}>{renderStars(post.rating)}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

const stylesc = StyleSheet.create({
    calloutView: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10, // Increased padding
        width: 100, // Specify a width
        height: 50, // Specify a height
        backgroundColor: 'white', // Optional: for better visibility
        borderRadius: 10, // Optional: for rounded corners
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%'
    },
    mapOverlay: {
        position: "absolute",
        bottom: 50,
        backgroundColor: "#ffffff",
        borderWidth: 2,
        borderRadius: 5,
        padding: 16,
        left: "25%",
        width: "50%",
        textAlign: "center"
    }
});

function getRegionForCoordinates(points, zoomFactor) {
    // points should be an array of { latitude: X, longitude: Y }
    let minX, maxX, minY, maxY;

    // init first point
    ((point) => {
        minX = point.latitude;
        maxX = point.latitude;
        minY = point.longitude;
        maxY = point.longitude;
    })(points[0]);

    // calculate rect
    points.map((point) => {
        minX = Math.min(minX, point.latitude);
        maxX = Math.max(maxX, point.latitude);
        minY = Math.min(minY, point.longitude);
        maxY = Math.max(maxY, point.longitude);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    let deltaX = (maxX - minX) * zoomFactor;
    let deltaY = (maxY - minY) * zoomFactor;

    // Ensure deltas are not too small
    const minDelta = 0.01; // Adjust this value as needed
    deltaX = Math.max(deltaX, minDelta);
    deltaY = Math.max(deltaY, minDelta);

    return {
        latitude: midX,
        longitude: midY,
        latitudeDelta: deltaX,
        longitudeDelta: deltaY
    };
}
