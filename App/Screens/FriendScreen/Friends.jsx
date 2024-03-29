import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import { getFirestore, collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import PostComponent from '../../components/PostComponent';


const Friends = ({ navigation }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const postsArray = [];
            querySnapshot.forEach((doc) => {
                postsArray.push({ id: doc.id, ...doc.data() });
            });
            setPosts(postsArray);
        });

        return () => unsubscribe(); // Clean up the listener on unmount
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <PostComponent post={item} />}
            />

            <TouchableOpacity 
                style={styles.postButton} 
                onPress={() => navigation.navigate('Camera')}
            >
                <Text style={styles.buttonText}>Make a Scene!</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'black',
    },
    postButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: 'blue',
        borderRadius: 30,
        padding: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Friends;
