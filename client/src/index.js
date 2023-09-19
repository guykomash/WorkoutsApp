import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthProvider';
import { WorkoutsProvider } from './contexts/WorkoutsProvider';
import { ExerciseProvider } from './contexts/ExercisesProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ExerciseProvider>
          <WorkoutsProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </WorkoutsProvider>
        </ExerciseProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
