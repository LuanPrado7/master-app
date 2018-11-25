export class Usuario {
    constructor(
        public Nome: string,
        public Username: string,
        public Email: string,
        public Senha: string,
        public Pontos: number,
        public IdClassificacao: number,
        public Skin: string,
        public Cadastrado: boolean
    ) { }
}
