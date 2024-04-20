import { SymbolPipe } from './symbol.pipe';

describe('SymbolPipe', () => {
  let p: SymbolPipe;
  beforeEach(() => {
    p = new SymbolPipe();
  });

  it('create an instance', () => {
    expect(p).toBeTruthy();
  });

  it('get USD symbol', () => {
    expect(p.transform('USD')).toBe('$');
  });

  it('check unregestered key symbol', () => {
    expect(p.transform('RON')).toBe('RON');
  });
});
