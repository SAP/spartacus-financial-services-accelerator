import '@spartacus/storefront';

declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    SYNC_PILOT = 'SYNC_PILOT',
    FORM_POPUP_ERROR = 'FORM_POPUP_ERROR',
    CLAIMS = 'CLAIMS',
  }
}
