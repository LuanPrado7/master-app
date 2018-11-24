export interface Room {
  id_room: number;
  nv_dificuldade: number;
  nome: string;
  id_jogador: number;
  foto?: string;
  elo?: string;
  nr_jogador: number;
  temas: Object[];
}
