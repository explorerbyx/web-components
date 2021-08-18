var SsoSuSocialButton_1;
import { __decorate } from "https://cdn.skypack.dev/tslib";
/* eslint-disable prefer-template */
import { html, css, LitElement, property, customElement } from "https://cdn.skypack.dev/lit-element";
const API_URL = 'https://sso.universia.net/auth/realms/';
const SUPPORTED_LOCALES = ['es', 'en', 'pt'];
const DEFAULT_LOCALE = 'es';
const DEFAULT_BUTTON_LITERALS = {
    es: {
        service_name: 'Santander X',
        continue_with: 'Entrar con',
    },
    en: {
        service_name: 'Santander X',
        continue_with: 'Login with',
    },
    pt: {
        service_name: 'Santander X',
        continue_with: 'Entrar com',
    },
};
let SsoSuSocialButton = SsoSuSocialButton_1 = class SsoSuSocialButton extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Client Id to identify the Realm
         */
        this.clientId = undefined;
        /**
         * Optional User State to identify users actual app status
         */
        this.state = undefined;
        /**
         * Locale language of the user
         */
        this.locale = DEFAULT_LOCALE;
        /**
         * Redirect URL to access after a successful signin
         */
        this.redirectUri = undefined;
    }
    // Set default value in locale if not given
    _localeLiterals() {
        if (SUPPORTED_LOCALES.indexOf(String(this.locale)) < 0) {
            this.locale = DEFAULT_LOCALE;
        }
    }
    // Get SSO url
    _getSsoUrl() {
        let sUrl = '#';
        const nonce = SsoSuSocialButton_1._getRandomString(20, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        if (this.clientId && this.redirectUri) {
            sUrl =
                API_URL +
                    this.clientId +
                    '/protocol/openid-connect/auth?scope=email%20profile%20openid&response_type=id_token' +
                    '&client_id=' +
                    this.clientId +
                    '&ui_locales=' +
                    this.locale +
                    '&redirect_uri=' +
                    this.redirectUri +
                    '&nonce=' +
                    nonce;
            if (this.state) {
                sUrl += '&state=' + this.state;
            }
        }
        return sUrl;
    }
    static _getRandomString(length, chars) {
        let result = '';
        for (let i = length; i > 0; i -= 1)
            result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    render() {
        this._localeLiterals();
        return html `
      <a class="sso-sx-sb__btn" href="${this._getSsoUrl()}">
        <div class="sso-sx-sb__container">
          <svg
            class="sso-sx-sb__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g fill="none" fill-rule="evenodd">
              <g fill="#FFF">
                <g>
                  <path
                    d="M15.607 8.868l-3.006-5.209c-.229-.397-.387-.822-.475-1.259L12 2.618c-.744 1.289-.744 2.877 0 4.166l2.405 4.167c.744 1.289.744 2.877 0 4.166l-.126.218c-.088-.437-.246-.862-.475-1.26l-2.202-3.814-1.406-2.435c-.229-.397-.387-.823-.475-1.26l-.126.218c-.741 1.285-.743 2.867-.007 4.154L12 15.118c.744 1.288.744 2.876 0 4.166l-.126.217c-.087-.436-.246-.862-.475-1.259l-3.006-5.208c-.403-.699-.588-1.485-.554-2.264-3.218.841-5.439 2.627-5.439 4.694 0 2.877 4.298 5.209 9.6 5.209s9.6-2.332 9.6-5.209c0-2.067-2.22-3.854-5.439-4.694-.029-.66-.213-1.312-.554-1.902z"
                    transform="translate(-514 -383) translate(514 383)"
                  />
                </g>
              </g>
            </g>
          </svg>
          <span class="sso-sx-sb__separator">|</span>
          <span class="sso-sx-sb__text"
            >${DEFAULT_BUTTON_LITERALS[this.locale].continue_with}
            ${DEFAULT_BUTTON_LITERALS[this.locale].service_name}</span
          >
        </div>
      </a>
    `;
    }
};
SsoSuSocialButton.styles = css `
    :host {
      display: inline-block;
    }

    :host .sso-sx-sb__btn {
      background-color: #ec0000;
      color: #ffffff;
      font-family: 'Verdana';
      font-size: 14px;
      padding: 12px 36px;
      display: inline;
      border-radius: 24px;
    }

    :host .sso-sx-sb__btn:hover {
      color: #fff;
      background-color: #e63535;
    }

    :host .sso-sx-sb__icon {
      margin-right: 8px;
      vertical-align: bottom;
    }

    :host .sso-sx-sb__separator {
      font-size: 18px;
      line-height: 1.4;
    }

    :host .sso-sx-sb__text {
      margin-left: 8px;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: normal;
      color: white;
    }

    :host .sso-sx-sb__container {
      display: inline-block;
      align-items: center;
      text-align: center;
    }
  `;
__decorate([
    property({ type: String })
], SsoSuSocialButton.prototype, "clientId", void 0);
__decorate([
    property({ type: String })
], SsoSuSocialButton.prototype, "state", void 0);
__decorate([
    property({ type: String })
], SsoSuSocialButton.prototype, "locale", void 0);
__decorate([
    property({ type: String })
], SsoSuSocialButton.prototype, "redirectUri", void 0);
SsoSuSocialButton = SsoSuSocialButton_1 = __decorate([
    customElement('sso-su-social-button')
], SsoSuSocialButton);
export { SsoSuSocialButton };
//# sourceMappingURL=sso-su-social-button.js.map