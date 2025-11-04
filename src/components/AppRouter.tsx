import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Onboarding } from './Onboarding';
import OnboardingWizard from './OnboardingWizard';
import { Login } from './Login';
import SignupLogin from './SignupLogin';
import LandingPage from './LandingPage';
import { Verification } from './Verification';
import { ForgotPassword } from './ForgotPassword';
import { ShipperDashboard } from './ShipperDashboard';
import { DriverDashboard } from './DriverDashboard';
import { HaulerDashboard } from './HaulerDashboard';
import StakeholderDashboard from './StakeholderDashboard';
import { SuperAdminDashboard } from './SuperAdminDashboard';
import { AppLayout } from './AppLayout';
import { Loadboard } from './Loadboard';
import { FleetManagement } from './FleetManagement';
import { TeamManagement } from './TeamManagement';
import { WalletTab } from './WalletTab';
import { DocumentsTab } from './DocumentsTab';
import { MarketplaceTab } from './MarketplaceTab';
import { MyLoadsTab } from './MyLoadsTab';
import { TripsTab } from './TripsTab';
import { ExpensesTab } from './ExpensesTab';
import { SupportTab } from './SupportTab';
import { ProfileSettings } from './ProfileSettings';
import { KeyboardShortcutsDialog } from './KeyboardShortcutsDialog';
import { OfflineIndicator } from './OfflineIndicator';
import { Toaster } from './ui/sonner';
import { storage, STORAGE_KEYS, getPreferences, updatePreferences } from '../lib/storage';
import { toast } from 'sonner@2.0.3';

type UserRole = 'shipper' | 'driver' | 'hauler' | 'stakeholder' | 'super-admin' | null;

interface AppRouterProps {
  showKeyboardShortcuts: boolean;
  onCloseKeyboardShortcuts: () => void;
}

export function AppRouter({ showKeyboardShortcuts, onCloseKeyboardShortcuts }: AppRouterProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const savedRole = storage.get<UserRole>(STORAGE_KEYS.USER_ROLE, null);
  const [userRole, setUserRole] = useState<UserRole>(savedRole);
  const [isAuthenticated, setIsAuthenticated] = useState(!!savedRole);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [pendingRole, setPendingRole] = useState<UserRole>(null);
  const [verificationContact, setVerificationContact] = useState('');

  // Load auth state
  useEffect(() => {
    const savedRole = storage.get<UserRole>(STORAGE_KEYS.USER_ROLE, null);
    
    if (savedRole) {
      setUserRole(savedRole);
      setIsAuthenticated(true);
      
      // Check if user completed onboarding
      const prefs = getPreferences();
      setNeedsOnboarding(prefs.showOnboarding && 
        (savedRole === 'hauler' || savedRole === 'shipper' || savedRole === 'stakeholder'));
    }
  }, []);

  // Handlers
  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
    storage.set(STORAGE_KEYS.USER_ROLE, role);
    
    // Check if needs onboarding
    const hasOnboardingWizard = role === 'hauler' || role === 'shipper' || role === 'stakeholder';
    const prefs = getPreferences();
    
    if (hasOnboardingWizard && prefs.showOnboarding) {
      setNeedsOnboarding(true);
      navigate('/onboarding');
    } else {
      setNeedsOnboarding(false);
      // Navigate to dashboard
      const dashboardPath = role === 'super-admin' ? '/admin/dashboard' : `/${role}/dashboard`;
      navigate(dashboardPath);
    }
    
    toast.success(`Logged in as ${role}`);
  };

  const handleNeedVerification = (contact: string, role: UserRole) => {
    setVerificationContact(contact);
    setPendingRole(role);
    storage.set(STORAGE_KEYS.USER_EMAIL, contact);
    storage.set('pendingRole', role);
    navigate('/verification');
  };

  const handleVerificationComplete = () => {
    if (pendingRole) {
      handleLogin(pendingRole);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setNeedsOnboarding(false);
    storage.remove(STORAGE_KEYS.USER_ROLE);
    storage.remove(STORAGE_KEYS.USER_EMAIL);
    storage.remove('pendingRole');
    toast.success('Logged out successfully');
    
    // Navigate to landing page
    navigate('/');
  };

  const handleOnboardingComplete = () => {
    setNeedsOnboarding(false);
    updatePreferences({ showOnboarding: false });
    toast.success('Welcome to LivestockWay TMS!');
    
    // Navigate to dashboard
    if (userRole) {
      const dashboardPath = userRole === 'super-admin' ? '/admin/dashboard' : `/${userRole}/dashboard`;
      navigate(dashboardPath);
    }
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated || !userRole) {
      return <Navigate to="/" replace />;
    }

    // Redirect to onboarding if needed
    if (needsOnboarding && location.pathname !== '/onboarding') {
      return <Navigate to="/onboarding" replace />;
    }

    return <>{children}</>;
  };

  // Auth Route (redirect if already logged in)
  const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    if (isAuthenticated && userRole && !needsOnboarding) {
      const path = userRole === 'super-admin' ? '/admin/dashboard' : `/${userRole}/dashboard`;
      return <Navigate to={path} replace />;
    }
    return <>{children}</>;
  };

  return (
    <>
      <OfflineIndicator />
      <Toaster position="top-right" />
      <KeyboardShortcutsDialog 
        isOpen={showKeyboardShortcuts}
        onClose={onCloseKeyboardShortcuts}
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <AuthRoute>
            <LandingPage onSelectRole={() => {}} />
          </AuthRoute>
        } />

        <Route path="/login" element={
          <AuthRoute>
            <SignupLogin 
              onAuth={handleLogin}
              onNeedVerification={handleNeedVerification}
            />
          </AuthRoute>
        } />

        <Route path="/verification" element={
          <Verification 
            contact={verificationContact}
            role={pendingRole}
            onVerified={handleVerificationComplete}
            onResend={() => toast.success('Code resent!')}
          />
        } />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Onboarding Route */}
        <Route path="/onboarding" element={
          isAuthenticated && needsOnboarding ? (
            <OnboardingWizard 
              role={userRole as 'hauler' | 'shipper' | 'stakeholder'}
              onComplete={handleOnboardingComplete}
              onSkip={handleOnboardingComplete}
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />

        {/* Hauler Routes */}
        <Route path="/hauler/*" element={
          <ProtectedRoute>
            {userRole === 'hauler' ? (
              <AppLayout userRole="hauler" onLogout={handleLogout}>
                <Routes>
                  <Route path="dashboard" element={<HaulerDashboard onLogout={handleLogout} />} />
                  <Route path="loadboard" element={<Loadboard />} />
                  <Route path="fleet" element={<FleetManagement />} />
                  <Route path="trips" element={<TripsTab />} />
                  <Route path="earnings" element={<WalletTab />} />
                  <Route path="team" element={<TeamManagement />} />
                  <Route path="marketplace" element={<MarketplaceTab userRole="hauler" />} />
                  <Route path="documents" element={<DocumentsTab />} />
                  <Route path="settings" element={<ProfileSettings onLogout={handleLogout} />} />
                  <Route path="support" element={<SupportTab />} />
                  <Route path="*" element={<Navigate to="/hauler/dashboard" replace />} />
                </Routes>
              </AppLayout>
            ) : (
              <Navigate to="/" replace />
            )}
          </ProtectedRoute>
        } />

        {/* Shipper Routes */}
        <Route path="/shipper/*" element={
          <ProtectedRoute>
            {userRole === 'shipper' ? (
              <AppLayout userRole="shipper" onLogout={handleLogout}>
                <Routes>
                  <Route path="dashboard" element={<ShipperDashboard onLogout={handleLogout} />} />
                  <Route path="loads" element={<MyLoadsTab />} />
                  <Route path="loadboard" element={<Loadboard />} />
                  <Route path="trips" element={<TripsTab />} />
                  <Route path="payments" element={<WalletTab />} />
                  <Route path="documents" element={<DocumentsTab />} />
                  <Route path="marketplace" element={<MarketplaceTab userRole="shipper" />} />
                  <Route path="settings" element={<ProfileSettings onLogout={handleLogout} />} />
                  <Route path="support" element={<SupportTab />} />
                  <Route path="*" element={<Navigate to="/shipper/dashboard" replace />} />
                </Routes>
              </AppLayout>
            ) : (
              <Navigate to="/" replace />
            )}
          </ProtectedRoute>
        } />

        {/* Driver Routes */}
        <Route path="/driver/*" element={
          <ProtectedRoute>
            {userRole === 'driver' ? (
              <AppLayout userRole="driver" onLogout={handleLogout}>
                <Routes>
                  <Route path="dashboard" element={<DriverDashboard onLogout={handleLogout} />} />
                  <Route path="trips" element={<TripsTab />} />
                  <Route path="expenses" element={<ExpensesTab />} />
                  <Route path="documents" element={<DocumentsTab />} />
                  <Route path="settings" element={<ProfileSettings onLogout={handleLogout} />} />
                  <Route path="support" element={<SupportTab />} />
                  <Route path="*" element={<Navigate to="/driver/dashboard" replace />} />
                </Routes>
              </AppLayout>
            ) : (
              <Navigate to="/" replace />
            )}
          </ProtectedRoute>
        } />

        {/* Stakeholder Routes */}
        <Route path="/stakeholder/*" element={
          <ProtectedRoute>
            {userRole === 'stakeholder' ? (
              <AppLayout userRole="stakeholder" onLogout={handleLogout}>
                <Routes>
                  <Route path="dashboard" element={<StakeholderDashboard onLogout={handleLogout} />} />
                  <Route path="services" element={<div>Services Management (Coming Soon)</div>} />
                  <Route path="bookings" element={<div>Bookings (Coming Soon)</div>} />
                  <Route path="marketplace" element={<MarketplaceTab userRole="stakeholder" />} />
                  <Route path="earnings" element={<WalletTab />} />
                  <Route path="documents" element={<DocumentsTab />} />
                  <Route path="settings" element={<ProfileSettings onLogout={handleLogout} />} />
                  <Route path="support" element={<SupportTab />} />
                  <Route path="*" element={<Navigate to="/stakeholder/dashboard" replace />} />
                </Routes>
              </AppLayout>
            ) : (
              <Navigate to="/" replace />
            )}
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute>
            {userRole === 'super-admin' ? (
              <AppLayout userRole="super-admin" onLogout={handleLogout}>
                <Routes>
                  <Route path="dashboard" element={<SuperAdminDashboard onLogout={handleLogout} />} />
                  <Route path="users" element={<div>User Management (Coming Soon)</div>} />
                  <Route path="approvals" element={<div>Approval Queue (Coming Soon)</div>} />
                  <Route path="analytics" element={<div>Analytics (Coming Soon)</div>} />
                  <Route path="marketplace" element={<MarketplaceTab userRole="super-admin" />} />
                  <Route path="support" element={<SupportTab />} />
                  <Route path="settings" element={<ProfileSettings onLogout={handleLogout} />} />
                  <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                </Routes>
              </AppLayout>
            ) : (
              <Navigate to="/" replace />
            )}
          </ProtectedRoute>
        } />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
