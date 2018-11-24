import { RoomPageModule } from './room-page.module';

describe('RoomPageModule', () => {
  let roomPageModule: RoomPageModule;

  beforeEach(() => {
    roomPageModule = new RoomPageModule();
  });

  it('should create an instance', () => {
    expect(roomPageModule).toBeTruthy();
  });
});
