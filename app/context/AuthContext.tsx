import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "~/utils/supabase.client";
import type { AuthContextType, UserProfile } from "~/utils/types";

const AuthContext = createContext<AuthContextType>({
  userProfile: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const updateUserProfile = (sessionUser: any) => {
    if (!sessionUser) {
      setUserProfile(null);
      setLoading(false);
      return;
    }

    const meta = sessionUser.user_metadata;
    const fullName = meta?.full_name || meta?.name || sessionUser.email || "";
    const firstName = fullName.split(" ")[0];
    const avatarUrl = meta?.avatar_url || meta?.picture;

    setUserProfile({
      name: firstName,
      avatarUrl,
      email: sessionUser.email,
    });
    setLoading(false);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      updateUserProfile(session?.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      updateUserProfile(session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserProfile(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ userProfile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
