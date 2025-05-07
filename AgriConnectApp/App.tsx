import App from './src/App';
import { AuthProvider } from './src/context/AuthContext';

const WrappedApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default WrappedApp;
