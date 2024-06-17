import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import Layout from '../Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import RestrictedRoute from '../RestrictedRoute/RestrictedRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import { refreshUser } from '../../redux/auth/operations';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import('../../pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('../../pages/ContactsPage/ContactsPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));


function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  
  return isRefreshing ? (
    <Loader />
  ) : (
    <Layout>
       <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/contacts">
                <RegistrationPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts">
                <LoginPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login">
                <ContactsPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
        <Toaster />
        <Modal />
    </Layout>
  )
}

export default App
