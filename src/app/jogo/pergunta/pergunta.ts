export interface Pergunta {
    pergunta: {
        Id: number,
        Pergunta: string,
        Patrocinada: boolean,
        IdTema: number,
        IdNivel: number
    },
    respostas: Object[]
}
