import '@spartacus/storefront';

declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    SYNC_PILOT = 'SYNC_PILOT',
    CLAIMS = 'CLAIMS',
    BIND_QUOTE = 'BIND_QUOTE',
    OPEN_REFFERED_QUOTE = 'OPEN_REFFERED_QUOTE'
  }
}
