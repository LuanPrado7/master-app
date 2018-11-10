export interface Card {
    nome: string,
    id_jogador: number,
    foto?: string,
    elo?: string,
    pontos_tema: Object[],
    pontos_total: number
}