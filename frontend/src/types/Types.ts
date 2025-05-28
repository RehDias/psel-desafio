import type { Account, CreateAccount, UpdateAccount } from "./AccountTypes";

export type ProviderValues = {
  user: Account | null;
  onLogin: (email: string, password: string) => Promise<boolean>;
  token: string;
  error: string | null;
  onRegister: (obj: CreateAccount) => Promise<boolean>;
  logout(): void
  loading: boolean;
  setLoading: (loading: boolean) => void;
  updateUser: (id: number, obj: UpdateAccount) => Promise<boolean>;
  setError: React.Dispatch<React.SetStateAction<string>>
}

