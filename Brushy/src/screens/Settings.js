import { StyleSheet, Text, View, Image, Modal, Button } from 'react-native';
import { profile } from '../assets';
import { CustomButton } from '../components/common';
import useGlobally from '../core/global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import secure from '../core/secure';
import { api } from '../core';
import { useEffect, useState } from 'react';

export default function Settings() {
    const [credentials, setCredentials] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); // New state for modal visibility
    const logout = useGlobally(state => state.logout);

    async function getDetails() {
        const getUserDetails = await secure.get('credentials');
        setCredentials(getUserDetails);
    }

    useEffect(() => {
        getDetails();
    }, []);

    console.log(credentials);

    async function deleteUser() {
        const credentials = await secure.get('credentials');
        try {
            console.log('here', credentials);
            const response = await api({
                method: 'POST',
                url: '/application/delete/',
                data: {
                    email: credentials.email,
                }
            });

            if (response.status === 204) {
                logout();
            } else {
                console.log('errr');
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    return (
        <View style={styles.container}>
            <Image source={profile} style={styles.image} />
            {credentials ? (
                <Text style={styles.name}>{credentials.first_name} {credentials.last_name}</Text>
            ) : (
                <Text style={styles.name}>Loading</Text>
            )}

            {credentials ? (
                <Text style={styles.username}>{credentials.email}</Text>
            ) : (
                <Text style={styles.username}>Loading</Text>
            )}

            <CustomButton
                style={styles.button}
                textStyle={styles.buttonText}
                title={"Log Out"}
                onPress={logout}
                IconComponent={MaterialCommunityIcons}
                iconName='logout'
                iconColor={'#d0d0d0'}
                iconSize={20}
            />
            
            <CustomButton title="Delete User" onPress={() => setModalVisible(true)} />

            {/* Modal for confirmation */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
                        <CustomButton title="Yes, delete it" onPress={() => { deleteUser(); setModalVisible(!modalVisible); }} />
                        <CustomButton title="Cancel" onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
    },
    image: {
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: '#e0e0e0',
    },
    name: {
        textAlign: 'center',
        color: '#303030',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 6,
    },
    username: {
        textAlign: 'center',
        color: '#606060',
        fontSize: 14
    },
    button: {
        flexDirection: 'row',
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 26,
        backgroundColor: '#202020',
        marginTop: 40
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#d0d0d0'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    }
});
