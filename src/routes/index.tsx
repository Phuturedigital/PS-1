import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

// Lazy load pages
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Financial = React.lazy(() => import('../pages/Financial'));
const Marketing = React.lazy(() => import('../pages/Marketing'));
const Insights = React.lazy(() => import('../pages/Insights'));
const Social = React.lazy(() => import('../pages/Social'));
const Clients = React.lazy(() => import('../pages/Clients'));
const Settings = React.lazy(() => import('../pages/Settings'));
const Security = React.lazy(() => import('../pages/Security'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/financial" element={<Financial />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/social" element={<Social />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/security" element={<Security />} />
      </Routes>
    </Suspense>
  );
}