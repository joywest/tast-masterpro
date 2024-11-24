import { create } from 'zustand';
import { auth, db } from '../lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface UserData {
  uid: string;
  email: string | null;
  firstName: string;
  lastName: string;
  subscriptionTier: 'free' | 'premium';
  stripeCustomerId?: string;
}

interface AuthState {
  user: UserData | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateSubscription: (tier: 'free' | 'premium') => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  signUp: async (email: string, password: string, firstName: string, lastName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userData: UserData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      firstName,
      lastName,
      subscriptionTier: 'free'
    };
    await setDoc(doc(db, 'users', userCredential.user.uid), userData);
    set({ user: userData });
  },
  signIn: async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    const userData = userDoc.data() as UserData;
    set({ user: userData });
  },
  signOut: async () => {
    await firebaseSignOut(auth);
    set({ user: null });
  },
  updateSubscription: async (tier: 'free' | 'premium') => {
    const { user } = useAuthStore.getState();
    if (!user) return;
    
    const updatedUser = { ...user, subscriptionTier: tier };
    await setDoc(doc(db, 'users', user.uid), updatedUser);
    set({ user: updatedUser });
  }
}));

// Initialize auth state listener
onAuthStateChanged(auth, async (user: User | null) => {
  if (user) {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data() as UserData;
    useAuthStore.setState({ user: userData, loading: false });
  } else {
    useAuthStore.setState({ user: null, loading: false });
  }
});