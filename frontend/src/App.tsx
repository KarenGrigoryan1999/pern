import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { store } from './store';
import MainPage from './components/pages/MainPage/MainPage';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MainPage />
      </ThemeProvider>
    </Provider>
  )
}

export default App
