import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import toast from "react-hot-toast";
import { auth, googleProvider } from "../config/firebase";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged 
} from "firebase/auth";

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Sync user with backend
    const syncWithBackend = async (firebaseToken: string) => {
        try {
            const { data } = await api.post("/auth/sync", {}, {
                headers: {
                    Authorization: `Bearer ${firebaseToken}`
                }
            });
            setUser(data.user);
            setToken(firebaseToken);
            localStorage.setItem("auth_token", firebaseToken);
            localStorage.setItem("auth_user", JSON.stringify(data.user));
            return data.user;
        } catch (error) {
            console.error("Failed to sync user with backend:", error);
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const firebaseToken = await firebaseUser.getIdToken();
                    await syncWithBackend(firebaseToken);
                } catch (error) {
                    // Handle sync failure (e.g., clear state)
                    setUser(null);
                    setToken(null);
                    localStorage.removeItem("auth_token");
                    localStorage.removeItem("auth_user");
                }
            } else {
                setUser(null);
                setToken(null);
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_user");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseToken = await userCredential.user.getIdToken();
            await syncWithBackend(firebaseToken);
            toast.success("Login successful");
            navigate("/");
        } catch (error: any) {
            toast.error(error?.message || "Failed to login");
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseToken = await userCredential.user.getIdToken();
            await syncWithBackend(firebaseToken);
            toast.success("Registration successful");
            navigate("/");
        } catch (error: any) {
            toast.error(error?.message || "Failed to register");
        }
    };

    const loginWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const firebaseToken = await userCredential.user.getIdToken();
            await syncWithBackend(firebaseToken);
            toast.success("Login successful");
            navigate("/");
        } catch (error: any) {
            toast.error(error?.message || "Failed to login with Google");
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setToken(null);
            localStorage.removeItem("auth_token");
            localStorage.removeItem("auth_user");
            navigate("/login");
        } catch (error: any) {
            toast.error("Failed to logout");
        }
    };

    const updateUser = (userData: Partial<User>) => {
        if (user) {
            const updated = { ...user, ...userData };
            setUser(updated);
            localStorage.setItem("auth_user", JSON.stringify(updated));
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                register,
                loginWithGoogle,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
