import { createContext, useContext, useState, useEffect } from 'react';

interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  college?: string;
}

interface AuthContextType {
  user: UserType | null;
  userRole: 'admin' | 'student' | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const API_URL = 'http://localhost:5000'; // Change if backend runs elsewhere

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'student' | null>(null);
  const [loading, setLoading] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile(token);
    }
    // eslint-disable-next-line
  }, []);

  const fetchProfile = async (token: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setUserRole('student'); // Default all users to student
      } else {
        setUser(null);
        setUserRole(null);
        localStorage.removeItem('token');
      }
    } catch {
      setUser(null);
      setUserRole(null);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: userData.first_name,
          lastName: userData.last_name,
          email,
          phone: userData.phone,
          college: userData.college,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { data: null, error: { message: data.error || 'Signup failed' } };
      }
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { data: null, error: { message: data.error || 'Login failed' } };
      }
      // Save token and fetch profile
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setUserRole('student'); // Default all users to student
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
    setUserRole(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    userRole,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
