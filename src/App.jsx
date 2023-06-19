import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Menu from './componentes/Menu'
import Home from './componentes/telas/Home'
import Academia from './componentes/telas/academia/Academia'
import Setor from './componentes/telas/setor/Setor'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './componentes/telas/login/Login'
import MenuPublico from './componentes/MenuPublico'
import MenuPrivado from './componentes/MenuPrivado'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<MenuPublico />}  >
          <Route index   element={<Home />} />
          <Route exact="true" path="/login" element={<Login />} />
        </Route>

        <Route  path="/privado" element={<MenuPrivado />}  >
          <Route index   element={<Home />} />
          <Route exact="true" path="academias" element={<Academia />} />
          <Route exact="true" path="setores" element={<Setor />} />
          <Route exact="true" path="login" element={<Login />} />
        </Route>        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
