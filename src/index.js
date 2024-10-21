import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ExpressionE from './components/ExpressionE';
import Modal from './components/Modal';
import AuthGuard from './components/AuthGuard'; // Importer AuthGuard

// Exemple temporaire d'authentification (à remplacer par ta logique réelle)
const isAuthenticated = false; // Mettre à jour cela après la connexion réussie

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/tcf-canada/expression-ecrite",
    element: (
      <AuthGuard isAuthenticated={isAuthenticated}>
        <ExpressionE />
      </AuthGuard>
    ),
  },
  {
    path: "/login",
    element: <Modal />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
