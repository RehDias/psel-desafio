export type CreateAccount = {
  cpf_cnpj: string,
  name: string,
  email: string
  password: string,
}

export type Account = {
  id: number,
  cpf_cnpj: string,
  name: string,
  email: string
  password: string,
  account_status: boolean,
}

export type UpdateAccount = {
  name: string,
  email: string
  password: string,
}