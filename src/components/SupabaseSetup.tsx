import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface SupabaseSetupProps {
  onComplete?: () => void;
}

const SupabaseSetup: React.FC<SupabaseSetupProps> = ({ onComplete }) => {
  const [status, setStatus] = useState<'checking' | 'missing' | 'invalid' | 'connected'>('checking');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    checkSupabaseConnection();
  }, []);

  const checkSupabaseConnection = async () => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        setStatus('missing');
        setError('Supabase environment variables are missing');
        return;
      }

      if (supabaseUrl.includes('your-project-id') || supabaseAnonKey.includes('your-anon-key')) {
        setStatus('invalid');
        setError('Please update .env file with actual Supabase credentials');
        return;
      }

      // Test the connection
      const { supabase } = await import('../lib/supabase');
      const { data, error: connectionError } = await supabase
        .from('paintings')
        .select('count', { count: 'exact', head: true });

      if (connectionError) {
        setStatus('invalid');
        setError(`Connection failed: ${connectionError.message}`);
        return;
      }

      setStatus('connected');
      onComplete?.();
    } catch (error) {
      setStatus('invalid');
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'checking':
        return <div className="animate-spin w-6 h-6 border-2 border-accent-400 border-t-transparent rounded-full" />;
      case 'connected':
        return <CheckCircleIcon className="w-6 h-6 text-green-400" />;
      case 'missing':
      case 'invalid':
        return <XCircleIcon className="w-6 h-6 text-red-400" />;
      default:
        return <ExclamationTriangleIcon className="w-6 h-6 text-yellow-400" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'checking':
        return 'Checking Supabase connection...';
      case 'connected':
        return 'Successfully connected to Supabase!';
      case 'missing':
        return 'Supabase environment variables are missing';
      case 'invalid':
        return 'Supabase configuration is invalid';
      default:
        return 'Unknown status';
    }
  };

  if (status === 'connected') {
    return null; // Don't show anything when connected
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-primary-800 border border-primary-600 rounded-lg p-6 mb-8"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {getStatusIcon()}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-neutral-100 mb-2">
            Supabase Setup Required
          </h3>
          <p className="text-neutral-300 mb-4">
            {getStatusMessage()}
          </p>
          {error && (
            <p className="text-red-400 text-sm mb-4">
              Error: {error}
            </p>
          )}
          
          <div className="bg-primary-900 rounded-lg p-4 mb-4">
            <h4 className="text-sm font-medium text-neutral-200 mb-2">
              Setup Instructions:
            </h4>
            <ol className="text-sm text-neutral-400 space-y-2 list-decimal list-inside">
              <li>Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-accent-400 hover:text-accent-300">supabase.com</a> and create a new project</li>
              <li>In your project dashboard, go to Settings → API</li>
              <li>Copy your Project URL and anon/public key</li>
              <li>Update the .env file in your project root with these values:</li>
            </ol>
            <div className="mt-3 bg-primary-950 rounded p-3 font-mono text-xs text-neutral-300">
              <div>VITE_SUPABASE_URL=https://your-project-id.supabase.co</div>
              <div>VITE_SUPABASE_ANON_KEY=your-anon-key-here</div>
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              After updating the .env file, restart your development server.
            </p>
          </div>

          <button
            onClick={checkSupabaseConnection}
            className="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SupabaseSetup;