import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import CssBaseline from '@mui/material/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './Routes';
import { store } from './store';
import AuthWrapper from './AuthWrapper';
import Container from '@mui/material/Container';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Container maxWidth="lg">
            <Router>
              <AuthWrapper>
                <Routes />
              </AuthWrapper>
            </Router>
            <ToastContainer autoClose={1500} />
          </Container>
        </Provider>
      </QueryClientProvider>
    </>
  );
};

export default App;
