import type { Account, CreateAccount } from "./AccountTypes";

export type ProviderValues = {
  user: Account | null;
  onLogin: (email: string, password: string) => Promise<boolean>;
  token: string;
  error: string | null;
  onRegister: (obj: CreateAccount) => Promise<boolean>;
  logout(): void
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<null>>;
  transactions: never[];
  setTransactions: React.Dispatch<React.SetStateAction<never[]>>;
  refreshTransactions: (token: string, userId: number) => Promise<void>;
}

