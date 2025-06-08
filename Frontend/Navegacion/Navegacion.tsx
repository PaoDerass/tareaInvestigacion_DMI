import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Pages/Home';
import FormularioTarea from '../Pages/FormularioTarea';

type BottomTabParamList = {
  Listado: undefined;
  'Nueva Tarea': undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function Navegacion() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name='Listado' component={Home} />
                <Tab.Screen name='Nueva Tarea' component={FormularioTarea} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}