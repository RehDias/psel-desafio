export type ProviderValues = {
  user: object;
  onLogin: (email: string, password: string) => Promise<boolean>;
  token: string;
  error: string | null;
}

export type ContextType = {
  onLogin: (email: string, password: string) => Promise<boolean>;
  error: string | null;
};
