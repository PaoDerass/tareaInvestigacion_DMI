import React, { useContext, useState } from 'react';
import { contextTarea } from '../Context/ContextTarea';
import { Alert } from 'react-native';
import { Plantilla } from '../Modelos/Plantilla';
import { Tarea } from '../Modelos/Tarea';

export default function ProviderTareas({ children }: Plantilla) {
    const [listaTareas, setListaTareas] = useState<Tarea[]>([]);

    const API_URL = 'http://192.168.1.195:6000';

    async function listarTareas(): Promise<void> {
        try {
            const response = await fetch(`${API_URL}/tarea`);
            const data = await response.json();
            if (response.ok) {
                setListaTareas(data);
            } else {
                Alert.alert("Error al cargar tareas", data.Mensaje || data.error);
            }
        } catch (error: any) {
            console.error('Error al listar tareas:', error);
            Alert.alert("Error de conexión", "No se pudo conectar al servidor. Asegúrate de que el backend esté corriendo y la IP sea correcta. Error: " + error.message);
        }
    }

    async function agregarTareas(descripcion: string, responsable: string, imagenUri: string | null): Promise<boolean> {
        try {
            const formData = new FormData();
            formData.append('DescripcionTarea', descripcion);
            formData.append('Responsable', responsable);

            if (imagenUri) {
                const uriParts = imagenUri.split('.');
                const fileType = uriParts[uriParts.length - 1];
                formData.append('imagen', {
                    uri: imagenUri,
                    name: `photo.${fileType}`,
                    type: `image/${fileType}`,
                } as any);
            }

            const response = await fetch(`${API_URL}/tarea`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Éxito", data.Mensaje);
                listarTareas();
                return true;
            } else {
                Alert.alert("Error al agregar tarea", data.error || data.Mensaje);
                return false;
            }
        } catch (error: any) {
            console.error('Error al agregar tarea:', error);
            Alert.alert("Error de conexión", "No se pudo conectar al servidor. Error: " + error.message);
            return false;
        }
    }

    return (
        <contextTarea.Provider value={{ listaTareas, listarTareas, agregarTareas }}>
            {children}
        </contextTarea.Provider>
    );
}

export const useConexteTarea = () => {
    const context = useContext(contextTarea);
    if (context === undefined) {
        throw new Error('useConexteTarea debe usarse dentro de un ProviderTareas');
    }
    return context;
};