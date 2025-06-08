import React from 'react';
import Navegacion from './Navegacion/Navegacion';
import ProviderTareas from './Provider/ProviderTareas';

export default function App() {
  return (
    <ProviderTareas>
      <Navegacion />
    </ProviderTareas>
  );
}