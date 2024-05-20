import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TarefaDoDia from './pages/TarefaDoDia';
import NovaTarefa from './pages/NovaTarefa';
import TodasAsTarefas from './pages/TodasAsTarefas';
import SobreOPojeto from './pages/SobreOProjeto';
import Calendario from './pages/Calendario';
import NovaCategoria from './pages/NovaCategoria';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tarefa-do-dia" element={<TarefaDoDia />} />
        <Route path="/nova-tarefa" element={<NovaTarefa />} />
        <Route path="/todas-as-tarefas" element={<TodasAsTarefas />} />
        <Route path="/sobre-o-projeto" element={<SobreOPojeto />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/nova-categoria" element={<NovaCategoria />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
