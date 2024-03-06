// Styles
import './App.scss';

// Components
import Todo from './components/organisms/Todo/Todo';
import { Box } from '@mui/material';

function App() {
  return (
    <Box className="App">
      <Todo />
    </Box>
  );
}

export default App;
