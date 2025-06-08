import { createContext } from 'react';
import { Tarea } from '../Modelos/Tarea';

interface TareaContextType {
    listaTareas: Tarea[];
    listarTareas: () => Promise<void>;
    agregarTareas: (descripcion: string, responsable: string, imagenUri: string | null) => Promise<boolean>;
}

export const contextTarea = createContext<TareaContextType | undefined>(undefined);