import type { Account, CreateAccount } from "./AccountTypes";

export type ProviderValues = {
  user: Account | null;
  onLogin: (email: string, password: string) => Promise<boolean>;
  token: string;
  error: string | null;
  onRegister: (obj: CreateAccount) => Promise<boolean>;
}

