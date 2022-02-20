import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/home';
import Login from '../pages/login'
import SignUp from '../pages/sign-up';

export const App = () => {
  return (
      <Container component="main" maxWidth="xs">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </Container>
  );
};

export default App;
