import { CadastroFormModule } from './cadastro-form.module';

describe('CadastroFormModule', () => {
  let cadastroFormModule: CadastroFormModule;

  beforeEach(() => {
    cadastroFormModule = new CadastroFormModule();
  });

  it('should create an instance', () => {
    expect(cadastroFormModule).toBeTruthy();
  });
});
