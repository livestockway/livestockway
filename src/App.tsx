import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WelcomeOverlay } from './components/WelcomeOverlay';
import { AppRouter } from './components/AppRouter';
import { storage, STORAGE_KEYS } from './lib/storage';
import { initializeTheme, toggleTheme } from './lib/theme';
import { KeyboardShortcutsManager } from './lib/keyboard-shortcuts';
import { undoManager } from './lib/undo-manager';
import { toast } from 'sonner@2.0.3';

type UserRole = 'shipper' | 'driver' | 'hauler' | 'stakeholder' | 'super-admin' | null;

export default function App() {
  // Check if user is already logged in or has dismissed welcome screen
  const savedRole = storage.get<UserRole>(STORAGE_KEYS.USER_ROLE, null);
  const welcomeDismissed = storage.get<boolean>(STORAGE_KEYS.WELCOME_DISMISSED, false);
  const [showWelcome, setShowWelcome] = useState(!savedRole && !welcomeDismissed); // Only show for first-time visitors
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  // Initialize theme
  useEffect(() => {
    initializeTheme();
  }, []);

  // Setup keyboard shortcuts
  useEffect(() => {
    const manager = new KeyboardShortcutsManager();

    manager.register('toggle-theme', {
      key: 'd',
      meta: true,
      description: 'Toggle dark mode',
      handler: () => {
        toggleTheme();
        toast.success('Theme toggled');
      },
    });

    manager.register('show-shortcuts', {
      key: '?',
      shift: true,
      description: 'Show keyboard shortcuts',
      handler: () => setShowKeyboardShortcuts(true),
    });

    manager.register('close-modal', {
      key: 'Escape',
      description: 'Close modal',
      handler: () => setShowKeyboardShortcuts(false),
    });

    manager.register('undo', {
      key: 'z',
      meta: true,
      description: 'Undo last action',
      handler: () => {
        const action = undoManager.undo();
        if (action) {
          toast.success(`Undone: ${action.description}`);
        }
      },
    });

    manager.register('redo', {
      key: 'z',
      meta: true,
      shift: true,
      description: 'Redo action',
      handler: () => {
        const action = undoManager.redo();
        if (action) {
          toast.success(`Redone: ${action.description}`);
        }
      },
    });

    manager.start();
    return () => manager.stop();
  }, []);

  // Welcome Overlay
  if (showWelcome) {
    return (
      <WelcomeOverlay onClose={() => {
        setShowWelcome(false);
        storage.set(STORAGE_KEYS.WELCOME_DISMISSED, true); // Remember that user dismissed it
      }} />
    );
  }

  return (
    <BrowserRouter>
      <AppRouter 
        showKeyboardShortcuts={showKeyboardShortcuts}
        onCloseKeyboardShortcuts={() => setShowKeyboardShortcuts(false)}
      />
    </BrowserRouter>
  );
}
