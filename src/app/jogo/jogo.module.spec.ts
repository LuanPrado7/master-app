import { JogoModule } from './jogo.module';

describe('JogoModule', () => {
  let jogoModule: JogoModule;

  beforeEach(() => {
    jogoModule = new JogoModule();
  });

  it('should create an instance', () => {
    expect(jogoModule).toBeTruthy();
  });
});
