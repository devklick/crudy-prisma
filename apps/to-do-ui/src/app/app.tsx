import { Container } from '@mui/material';
import { Navigate, Route, Routes} from 'react-router-dom';
import List from '../pages/list/list';
import Login from '../pages/login'
import SignUp from '../pages/sign-up';

export const App = () => {
  return (
      <Container component="main" maxWidth="xs">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/list' element={<List />} />
          <Route path='*' element={<Navigate to='/list'/>}/>
        </Routes>
      </Container>
  );
};

export default App;
