import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';

// Get WordPress base URL from environment variable
const WP_BASE_URL = import.meta.env.VITE_WP_BASE_URL || 'http://localhost:10000';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Note: In development mode, we'll bypass actual API login
      // In production, uncomment this to use actual WordPress authentication
      /*
      await api.login(username, password);
      navigate('/dashboard');
      */
      
      // For development, we'll just simulate a successful login
      setTimeout(() => {
        localStorage.setItem('wp_jwt_token', 'dummy-token-for-development');
        setIsLoading(false);
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      setError('Invalid username or password');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Dashboard Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the CMS dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a 
                  href={`${WP_BASE_URL}/wp-login.php?action=lostpassword`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            <p>
              Need to access WordPress directly?{' '}
              <a 
                href={`${WP_BASE_URL}/wp-admin`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline"
              >
                WordPress Admin
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login; 