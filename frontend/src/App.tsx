import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { store } from './store/store';
import ContentBlock from './components/pages/ContentBlock/ContentBlock';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ContentBlock />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
