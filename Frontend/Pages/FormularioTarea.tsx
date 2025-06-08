import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useConexteTarea } from '../Provider/ProviderTareas';

export default function FormularioTarea() {
    const [descripcion, setDescripcion] = useState<string>('');
    const [responsable, setResponsable] = useState<string>('');
    const [imagen, setImagen] = useState<string | null>(null);
    const { agregarTareas } = useConexteTarea();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImagen(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso requerido', 'Necesitas dar permiso para acceder a la cámara.');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImagen(result.assets[0].uri);
        }
    };

    const handleGuardarTarea = async () => {
        if (!descripcion.trim() || !responsable.trim()) {
            Alert.alert('Campos vacíos', 'Por favor, completa todos los campos.');
            return;
        }

        const success = await agregarTareas(descripcion, responsable, imagen);
        if (success) {
            setDescripcion('');
            setResponsable('');
            setImagen(null);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nueva Tarea</Text>

            <TextInput
                style={styles.input}
                placeholder="Descripción de la tarea"
                value={descripcion}
                onChangeText={setDescripcion}
            />

            <TextInput
                style={styles.input}
                placeholder="Responsable"
                value={responsable}
                onChangeText={setResponsable}
            />

            <View style={styles.buttonContainer}>
                <Button title="Seleccionar de Galería" onPress={pickImage} />
                <Button title="Tomar Foto" onPress={takePhoto} />
            </View>

            {imagen && <Image source={{ uri: imagen }} style={styles.imagePreview} />}

            <Button
                title="Guardar Tarea"
                onPress={handleGuardarTarea}
                color="#841584"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#eee',
    },
});