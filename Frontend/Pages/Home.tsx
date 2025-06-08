import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useConexteTarea } from '../Provider/ProviderTareas';
import { Tarea } from '../Modelos/Tarea';

export default function Home() {
    const { listaTareas, listarTareas } = useConexteTarea();

    const API_BASE_URL = 'http://192.168.1.195:6000';

    useEffect(() => {
        listarTareas();
    }, []);

    const renderItem = ({ item }: { item: Tarea }) => (
        <View style={styles.tareaItem}>
            <Text style={styles.tareaDescripcion}>{item.DescripcionTarea}</Text>
            <Text style={styles.tareaResponsable}>Responsable: {item.Responsable}</Text>
            {item.RutaImagen && (
                <Image
                    source={{ uri: `${API_BASE_URL}${item.RutaImagen}` }}
                    style={styles.tareaImagen}
                />
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Tareas</Text>
            {listaTareas.length === 0 ? (
                <Text style={styles.emptyMessage}>No hay tareas para mostrar.</Text>
            ) : (
                <FlatList
                    data={listaTareas}
                    keyExtractor={(item) => item.IdTarea.toString()}
                    renderItem={renderItem}
                />
            )}
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
    tareaItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    tareaDescripcion: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    tareaResponsable: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    tareaImagen: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        borderRadius: 5,
        marginTop: 10,
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#777',
    },
});