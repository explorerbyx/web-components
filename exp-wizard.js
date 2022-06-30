var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, unsafeCSS, css } from 'https://cdn.skypack.dev/lit';
import { customElement, property, query } from 'https://cdn.skypack.dev/lit/decorators.js';
import { map } from 'https://cdn.skypack.dev/lit/directives/map.js';
// Components
import 'https://1.www.s81c.com/common/carbon/web-components/tag/latest/select.min.js';
import 'https://1.www.s81c.com/common/carbon/web-components/tag/latest/button.min.js';
import 'https://1.www.s81c.com/common/carbon/web-components/tag/latest/form.min.js';
import 'https://1.www.s81c.com/common/carbon/web-components/tag/latest/tile.min.js';
import 'https://1.www.s81c.com/common/carbon/web-components/tag/latest/loading.min.js';
/*
// Icons
import { getAttributes, toSVG } from '@carbon/icon-helpers';
import ideaIcon from '@carbon/icons/es/idea/20';

const addIconNode = toSVG({
  ...ideaIcon,
  attrs: getAttributes(ideaIcon.attrs),
});
*/
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
let ExpWizard = class ExpWizard extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Language
         */
        this.expLang = 'es';
        //
        // Es la primera idea?
        //
        this._firstIdea = true;
        //
        // Keywords
        //
        this._variables = {
            fonts: [
                { family: 'Roboto', variant: '300' },
                { family: 'Open Sans', variant: '300' },
                { family: 'Open Sans', variant: '700' },
                { family: 'Lato', variant: '300' },
                { family: 'Montserrat', variant: '300' },
                { family: 'Montserrat', variant: '700' },
                { family: 'Poppins', variant: '200' },
                { family: 'Source Sans Pro', variant: '400' },
                { family: 'Raleway', variant: '600' },
                { family: 'Raleway', variant: '300' },
                { family: 'Ubuntu', variant: '300' },
                { family: 'Lora', variant: '400' },
                { family: 'Fira Sans', variant: '300' },
                { family: 'Fira Sans', variant: '700' },
            ],
            keywords: {
                ODS: {
                    '01': ['energy consumption', 'clean energy', 'financial poverty'],
                    '02': ['circular food ingredients', 'food cook', 'farms', 'farming'],
                    '03': [
                        'clinical support systems',
                        'health platforms',
                        'medicine',
                        'patient implants PSI',
                        'AI medical image analysis',
                    ],
                    '04': ['learn', 'educational', 'study', 'science technology learning'],
                    '05': [
                        'women health',
                        'women empowerment',
                        'women tech',
                        'women networks',
                        'women safety',
                    ],
                    '06': [
                        'water',
                        'sanitary water treatment',
                        'rain water harvest',
                        'water management',
                    ],
                    '07': [
                        'energy resources',
                        'energy internet IoE',
                        'decentralized energy',
                        'energy storage',
                        'waste energy',
                    ],
                    '08': [
                        'economy growth',
                        'crowdsource economy',
                        'recruitment',
                        'financial api',
                    ],
                    '09': [
                        'smart mobility',
                        'smart devices',
                        'machines',
                        'industrial',
                        'infrastructure AI',
                    ],
                    '10': [
                        'small farming',
                        'financial inclusion',
                        'diversity hiring',
                        'groups media',
                        'student financing',
                    ],
                    '11': [
                        'affordable house cities',
                        'urban green quality',
                        'risk management cities',
                        'urban management',
                        'green urban mobility',
                    ],
                    '12': [
                        'carbon foot track',
                        'supply chain trace',
                        'responsible sourc',
                        'water sustainable feed',
                    ],
                    '13': [
                        'climate change',
                        'emissions track',
                        'carbon climate',
                        'power climate balance',
                        'climate finance',
                    ],
                    '14': [
                        'water quality',
                        'smart fish',
                        'recycled plastic',
                        'ocean AI',
                        'aquaculture clean',
                        'green ocean',
                    ],
                    '15': [
                        'tree planting',
                        'soil monitor',
                        'wildfire',
                        'tree plants',
                        'animal life',
                    ],
                    '16': [
                        'legal help',
                        'social legal assist',
                        'legal knowledge',
                        'social impact',
                    ],
                    '17': [
                        'political collaboration',
                        'buil collaboration',
                        'innovation share',
                        'management platform',
                    ],
                },
                ICONS: {
                    '01': ['people'],
                    '02': ['food farming'],
                    '03': ['health'],
                    '04': ['learn'],
                    '05': ['people equality'],
                    '06': ['clean water'],
                    '07': ['clean energy'],
                    '08': ['work'],
                    '09': ['industry'],
                    '10': ['inequality'],
                    '11': ['green city'],
                    '12': ['sustainable'],
                    '13': ['climate change'],
                    '14': ['ocean life'],
                    '15': ['wildlife'],
                    '16': ['people equality'],
                    '17': ['trade deals'],
                },
            },
        };
        //
        // Texts
        //
        this._texts = {
            es: {
                btnPost: '¿Alguna idea?',
                btnRePost: '¿Otra idea?',
                btnRefresh: 'Limpiar',
                ideaHeader: '¿Qué te parece?',
                logoHeader: 'Elige un nombre y un logo (Botón derecho + Guardar imagen como...)'
            },
            en: {
                btnPost: 'Any ideas?',
                btnRePost: 'Any other?',
                btnRefresh: 'Refresh',
                ideaHeader: 'Does this idea fit you?',
                logoHeader: 'Select a name and logo (Right Click + Save Image As...)'
            },
            'pt-pt': {
                btnPost: 'Alguma ideia?',
                btnRePost: 'Outra ideia?',
                btnRefresh: 'Limpiar',
                ideaHeader: 'O que você acha?',
                logoHeader: 'Escolha um nome e logotipo (Clique com o botão direito + Salvar imagem como...)'
            },
        };
        //
        // Studies
        //
        this._studies = {
            es: {
                title: '¿Qué estudias o estudiaste?',
                arial: 'Rama de estudios',
                holder: 'Selecciona una rama de estudios',
                validity: 'Tienes que seleccionar uno',
                values: [
                    { value: 'art teach literature langs', name: 'Artes y Humanidades' },
                    { value: 'social law justice', name: 'Ciencias Sociales y Jurídicas' },
                    { value: 'science math physics', name: 'Ciencias' },
                    { value: 'health doctor', name: 'Ciencias de la Salud' },
                    { value: 'AI engineer develop', name: 'Ingeniería' },
                    { value: 'design build develop', name: 'Arquitectura y Diseño' },
                ],
            },
            en: {
                title: 'What are you studying?',
                arial: 'Branch of studies',
                holder: 'Select a branch of studies',
                validity: 'You must choose one',
                values: [
                    { value: 'art teach literature langs', name: 'Arts and Humanities' },
                    { value: 'social law justice', name: 'Social and Legal Sciences' },
                    { value: 'science math physics', name: 'Science' },
                    { value: 'health doctor', name: 'Health Sciences' },
                    { value: 'AI engineer develop', name: 'Engineering' },
                    { value: 'design build develop', name: 'Architecture and design' },
                ],
            },
            'pt-pt': {
                title: 'O que você estuda ou estudou?',
                arial: 'Ramo de estudos',
                holder: 'Selecione um ramo de estudos',
                validity: 'Você tem que selecionar um',
                values: [
                    { value: 'art teach literature langs', name: 'Artes e Humanidades' },
                    { value: 'social law justice', name: 'Ciências Sociais e Jurídicas' },
                    { value: 'science math physics', name: 'Ciências' },
                    { value: 'health doctor', name: 'Ciências da Saúde' },
                    { value: 'AI engineer develop', name: 'Engenharia' },
                    { value: 'design build develop', name: 'Arquitetura e design' },
                ],
            },
        };
        //
        // Countries
        //
        this._countries = {
            es: {
                title: '¿Dónde vives?',
                arial: 'País de residencia',
                holder: 'Selecciona un país',
                validity: 'Tienes que seleccionar uno',
                values: [
                    { value: 'argentina', name: 'Argentina' },
                    { value: 'brazil', name: 'Brasil' },
                    { value: 'chili', name: 'Chile' },
                    { value: 'spain', name: 'España' },
                    { value: 'mexico', name: 'México' },
                    { value: 'portugal', name: 'Portugal' },
                    { value: 'uk', name: 'Reino Unido' },
                    { value: 'uruguay', name: 'Uruguay' },
                ],
            },
            en: {
                title: 'Where do you live?',
                arial: 'Country of residence',
                holder: 'Select a country',
                validity: 'You must choose one',
                values: [
                    { value: 'argentina', name: 'Argentina' },
                    { value: 'brazil', name: 'Brazil' },
                    { value: 'chili', name: 'Chili' },
                    { value: 'spain', name: 'Spain' },
                    { value: 'mexico', name: 'Mexico' },
                    { value: 'portugal', name: 'Portugal' },
                    { value: 'uk', name: 'UK' },
                    { value: 'uruguay', name: 'Uruguay' },
                ],
            },
            'pt-pt': {
                title: 'Onde você reside?',
                arial: 'País de residência',
                holder: 'Selecione um pais',
                validity: 'Você tem que selecionar um',
                values: [
                    { value: 'argentina', name: 'Argentina' },
                    { value: 'brazil', name: 'Brasil' },
                    { value: 'chili', name: 'Chile' },
                    { value: 'spain', name: 'Espanha' },
                    { value: 'mexico', name: 'México' },
                    { value: 'portugal', name: 'Portugal' },
                    { value: 'uk', name: 'Reino Unido' },
                    { value: 'uruguay', name: 'Uruguai' },
                ],
            },
        };
        //
        // Sectors
        //
        this._sectors = {
            es: {
                title: '¿A qué te quieres dedicar?',
                arial: 'Sector',
                holder: 'Selecciona una industria',
                validity: 'Tienes que seleccionar una',
                values: [
                    { value: 'aerospace', name: 'Aeroespacial' },
                    { value: 'agriculture', name: 'Agricultura' },
                    { value: 'chemistry', name: 'Industria Química' },
                    { value: 'software', name: 'Desarrollo de Software' },
                    { value: 'hardware', name: 'Desarrollo de Hardware' },
                    { value: 'construction', name: 'Construcción' },
                    { value: 'defense', name: 'Defensa' },
                    { value: 'education', name: 'Educación' },
                    { value: 'energy', name: 'Energía' },
                    { value: 'arts entertainment', name: 'Entretenimiento' },
                    { value: 'financial fintech', name: 'Finanzas' },
                    { value: 'insurance insurtech', name: 'Seguros' },
                    { value: 'retail', name: 'Venta minorista' },
                    { value: 'food', name: 'Alimentación' },
                    { value: 'health', name: 'Salud' },
                    { value: 'hospitality restaurant', name: 'Hostelería' },
                    { value: 'manufacture', name: 'Fabricación industrial' },
                    { value: 'media', name: 'Medios de comunicación' },
                    { value: 'comunications', name: 'Telecomunicaciones' },
                    { value: 'transport delivery', name: 'Transporte' },
                    { value: 'business services', name: 'Servicios' },
                ],
            },
            en: {
                title: 'What would you like to work at?',
                arial: 'Industryr',
                holder: 'Select an industry',
                validity: 'You must choose one',
                values: [
                    { value: 'aerospace', name: 'Aerospace' },
                    { value: 'agriculture', name: 'Agriculture' },
                    { value: 'chemistry', name: 'Chemistry Industry' },
                    { value: 'software', name: 'Software Industry' },
                    { value: 'hardware', name: 'Hasrdware Industry' },
                    { value: 'construction', name: 'Real Estate' },
                    { value: 'defense', name: 'Defense' },
                    { value: 'education', name: 'Education' },
                    { value: 'energy', name: 'Energy' },
                    { value: 'arts entertainment', name: 'Entertainment' },
                    { value: 'financial fintech', name: 'Finance' },
                    { value: 'insurance insurtech', name: 'Insurance' },
                    { value: 'retail', name: 'Retail' },
                    { value: 'food', name: 'Food' },
                    { value: 'health', name: 'Health' },
                    { value: 'hospitality restaurant', name: 'Hospitality' },
                    { value: 'manufacture', name: 'Manufacture' },
                    { value: 'media', name: 'Media' },
                    { value: 'comunications', name: 'Comunications' },
                    { value: 'transport delivery', name: 'Transport' },
                    { value: 'business services', name: 'Business Services' },
                ],
            },
            'pt-pt': {
                title: 'A que você quer se dedicar?',
                arial: 'Setor',
                holder: 'Selecione um setor',
                validity: 'Você tem que selecionar um',
                values: [
                    { value: 'aerospace', name: 'Aeroespacial' },
                    { value: 'agriculture', name: 'Agricultura' },
                    { value: 'chemistry', name: 'Indústria química' },
                    { value: 'software', name: 'Desenvolvimento de software' },
                    { value: 'hardware', name: 'Desenvolvimento de hardware' },
                    { value: 'construction', name: 'Construção' },
                    { value: 'defense', name: 'Indústria de defesa' },
                    { value: 'education', name: 'Educação' },
                    { value: 'energy', name: 'Energia' },
                    { value: 'arts entertainment', name: 'Entretenimento' },
                    { value: 'financial fintech', name: 'Finança' },
                    { value: 'insurance insurtech', name: 'Seguro' },
                    { value: 'retail', name: 'Retalho' },
                    { value: 'food', name: 'Alimentação' },
                    { value: 'health', name: 'Saúde' },
                    { value: 'hospitality restaurant', name: 'Hostelería' },
                    { value: 'manufacture', name: 'Frabricação industrial' },
                    { value: 'media', name: 'Meios de comunicação' },
                    { value: 'comunications', name: 'Telecomunicações' },
                    { value: 'transport delivery', name: 'Transporte' },
                    { value: 'business services', name: 'Serviços' },
                ],
            },
        };
        //
        // ODS
        //
        this._ods = {
            es: {
                title: '¿Cómo te gustaría salvar el mundo?',
                arial: 'ODS',
                holder: 'Selecciona un ODS',
                validity: 'Tienes que seleccionar uno',
                values: [
                    { value: '01', name: 'Fin de la pobreza' },
                    { value: '02', name: 'Hambre Cero' },
                    { value: '03', name: 'Salud y bienestar' },
                    { value: '04', name: 'Educación de calidad' },
                    { value: '05', name: 'Igualdad de género' },
                    { value: '06', name: 'Agua limpia y saneamiento' },
                    { value: '07', name: 'Energía asequible y no contaminante' },
                    { value: '08', name: 'Trabajo decente y crecimiento económico' },
                    { value: '09', name: 'Industria, Innovación e Infraestructura' },
                    { value: '10', name: 'Reducción de las desigualdades' },
                    { value: '11', name: 'Ciudades y comunidades sostenibles' },
                    { value: '12', name: 'Producción y Consumo Responsables' },
                    { value: '13', name: 'Acción por el clima' },
                    { value: '14', name: 'Vida submarina' },
                    { value: '15', name: 'Vida de ecosistemas terrestres' },
                    { value: '16', name: 'Paz, justicia e instituciones sólidas' },
                    { value: '17', name: 'Alianzas para lograr los objetivos' },
                ],
            },
            en: {
                title: 'How would you like to save the world?',
                arial: 'SDG',
                holder: 'Select a SDG 2030',
                validity: 'You must choose one',
                values: [
                    { value: '01', name: 'No poverty' },
                    { value: '02', name: 'Zero Hunger' },
                    { value: '03', name: 'Good health and well-being' },
                    { value: '04', name: 'Quality education' },
                    { value: '05', name: 'Gender Equality' },
                    { value: '06', name: 'Clean water and sanitation' },
                    { value: '07', name: 'Affordable and clean energy' },
                    { value: '08', name: 'Decent work and economic growth' },
                    { value: '09', name: 'Industry, innovation and infrastructure' },
                    { value: '10', name: 'Reduced inequalities' },
                    { value: '11', name: 'Sustainable cities and communities' },
                    { value: '12', name: 'Responsible consumption and production' },
                    { value: '13', name: 'Climate action' },
                    { value: '14', name: 'Life Below Water' },
                    { value: '15', name: 'Life on land' },
                    { value: '16', name: 'Peace, justice and strong institutions' },
                    { value: '17', name: 'Partnerships for the goals' },
                ],
            },
            'pt-pt': {
                title: 'Como você gostaria de salvar o mundo?',
                arial: 'ODS',
                holder: 'Selecione um ODS',
                validity: 'Você tem que selecionar um',
                values: [
                    { value: '01', name: 'Erradicação da pobreza' },
                    { value: '02', name: 'Fome zero e agricultura sustentável' },
                    { value: '03', name: 'Saúde e bem-estar' },
                    { value: '04', name: 'Educação de qualidade' },
                    { value: '05', name: 'Igualdade de gênero' },
                    { value: '06', name: 'Água potável e saneamento' },
                    { value: '07', name: 'Energia limpa e acessível' },
                    { value: '08', name: 'Trabalho decente e crescimento econômico' },
                    { value: '09', name: 'Indústria, inovação e infraestrutura' },
                    { value: '10', name: 'Redução das desigualdades' },
                    { value: '11', name: 'Cidades e comunidades sustentáveis' },
                    { value: '12', name: 'Consumo e produção responsáveis' },
                    { value: '13', name: 'Ação contra a mudança global do clima' },
                    { value: '14', name: 'Vida na água' },
                    { value: '15', name: 'Vida terrestre' },
                    { value: '16', name: 'Paz, justiça e instituições eficazes' },
                    { value: '17', name: 'Parcerias e meios de implementação' },
                ],
            },
        };
    }
    //
    // Dinamically load fonts
    //
    async loadFontFromURL() {
        import('https://cdn.skypack.dev/webfontloader').then((WebFontLoader) => {
            WebFontLoader.load({
                google: {
                    families: this._variables.fonts.map((f) => {
                        return String(f.family + ':' + f.variant);
                    }),
                },
                timeout: 20000,
            });
        });
    }
    //
    // Invert Color
    //
    invertColor(hex, bw) {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }
        let r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
        if (bw) {
            // https://stackoverflow.com/a/3943023/112731
            return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
        }
        // invert color components
        r = (255 - r).toString(16);
        g = (255 - g).toString(16);
        b = (255 - b).toString(16);
        // pad each with zeros and return
        return '#' + this.padZero(r) + this.padZero(g) + this.padZero(b);
    }
    padZero(str, len) {
        len = len || 2;
        const zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }
    render() {
        return html `
      <bx-form-item id="ideaAttr" class="exp-questions-margins">
        <div class="cds--grid cds--type-sans">
          <div class="cds--row exp-questions-margins">
            <div class="cds--col--auto">
              <bx-select id="studies" name="studies" autofocus required 
                validity-message="${this._studies[this.expLang].validity}" 
                label-text="${this._studies[this.expLang].title}" 
                placeholder="${this._studies[this.expLang].holder}"
                @input=${this.changeValue}
              >
                ${map(this._studies[this.expLang].values, (vPar) => html `<bx-select-item value="${vPar.value}"
                      >${vPar.name}</bx-select-item
                    >`)}
              </bx-select>
            </div>
          </div>
          <div class="cds--row exp-questions-margins">
            <div class="cds--col--auto">
              <bx-select id="country" name="country" autofocus required 
                validity-message="${this._countries[this.expLang].validity}" 
                label-text="${this._countries[this.expLang].title}" 
                placeholder="${this._countries[this.expLang].holder}"
                @input=${this.changeValue}
              >
                ${map(this._countries[this.expLang].values, (vPar) => html `<bx-select-item value="${vPar.value}"
                      >${vPar.name}</bx-select-item
                    >`)}
              </bx-select>
            </div>
          </div>
          <div class="cds--row exp-questions-margins">
            <div class="cds--col--auto">
              <bx-select id="sector" name="sector" autofocus required 
                validity-message="${this._sectors[this.expLang].validity}" 
                label-text="${this._sectors[this.expLang].title}" 
                placeholder="${this._sectors[this.expLang].holder}"
                @input=${this.changeValue}
              >
                ${map(this._sectors[this.expLang].values, (vPar) => html `<bx-select-item value="${vPar.value}"
                      >${vPar.name}</bx-select-item
                    >`)}
              </bx-select>
            </div>
          </div>
          <div class="cds--row exp-questions-margins">
            <div class="cds--col--auto">
              <bx-select id="ods" name="ods" autofocus required 
                validity-message="${this._ods[this.expLang].validity}" 
                label-text="${this._ods[this.expLang].title}" 
                placeholder="${this._ods[this.expLang].holder}"
                @input=${this.changeValue}
              >
                ${map(this._ods[this.expLang].values, (vPar) => html `<bx-select-item value="${vPar.value}"
                      >${vPar.name}</bx-select-item
                    >`)}
              </bx-select>
            </div>
          </div>
          <div class="cds--row exp-questions-margins">
            <div class="cds--cols-sm-2">
              <bx-btn @click="${this._submitForm}" type="submit" isExpressive kind="tertiary" class="padding">
                ${this._firstIdea ? this._texts[this.expLang].btnPost : this._texts[this.expLang].btnRePost}
                <!-- &nbsp;&nbsp;&nbsp; $ { addIconNode } -->
              </bx-btn>
            </div>
            <div class="cds--cols-sm-2">
              <bx-btn @click="${this._refreshForm}" isExpressive kind="danger-tertiary" class="padding left">
                ${this._texts[this.expLang].btnRefresh}
              </bx-btn>
            </div>
          </div>
        </div>
      </bx-form-item>
      <div class="cds--grid cds--type-sans">
        <div class="cds--row">
          <div id="ideaText" class="cds--col-auto exp-text-center">
          </div>
        </div>
        <br/>
        <div id="proGallery" class="cds--row">
        </div>
        <div id="iconAttribution" class="exp-text-center">
        </div>
      </div>
    </div>
    `;
    }
    changeValue(e) {
        const input = e.target;
        input.value
            ? input.removeAttribute('invalid')
            : input.setAttribute('invalid', 'true');
    }
    async _submitForm() {
        this.setIdeaText("loading");
        this.setLogos([]);
        const studies = this._selectedStudies.value;
        studies
            ? this._selectedStudies.removeAttribute('invalid')
            : this._selectedStudies.setAttribute('invalid', 'true');
        const country = this._selectedCountry.value;
        country
            ? this._selectedCountry.removeAttribute('invalid')
            : this._selectedCountry.setAttribute('invalid', 'true');
        const sector = this._selectedSector.value;
        sector
            ? this._selectedSector.removeAttribute('invalid')
            : this._selectedSector.setAttribute('invalid', 'true');
        const ods = this._selectedODS.value;
        ods
            ? this._selectedODS.removeAttribute('invalid')
            : this._selectedODS.setAttribute('invalid', 'true');
        if (!studies || !country || !sector || !ods) {
            this.setIdeaText("clear");
            return;
        }
        const odsKeys = String(this._variables.keywords.ODS[ods][Math.floor(Math.random() * this._variables.keywords.ODS[ods].length)] || '').toLocaleLowerCase('en');
        const iconKey = String(this._variables.keywords.ICONS[ods][Math.floor(Math.random() * this._variables.keywords.ICONS[ods].length)] || '').toLocaleLowerCase('en');
        const sMethod = "POST";
        const apiUrl = 'https://apis-ideax-vjbpvf7lya-uc.a.run.app'; // window.location.host
        const qParams = '?action=new&target=custom&object=ideax';
        const body = {
            iconKeys: iconKey,
            lang: this.expLang.toLocaleUpperCase().substring(0, 2),
            country: country,
            odsKeys: odsKeys,
            keywords: sector + ' ' + studies,
        };
        let response = await fetch((apiUrl + qParams), {
            method: sMethod,
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify(body)
        })
            .then((response) => {
            if (response.ok) {
                if (response.status === 204) {
                    return Promise.resolve({});
                }
                else {
                    return response.json();
                }
            }
            else {
                console.error(response.statusText);
                return Promise.resolve({});
            }
        })
            .catch((error) => {
            console.error(error);
            return Promise.resolve({});
        });
        // Mockup
        if (!(response === null || response === void 0 ? void 0 : response.idea)) {
            response = { "idea": "Una plataforma que permite a los grupos crear cuentas privadas en las redes sociales y gestionarlas como un grupo. Los equipos de los que forma parte pueden elegir sus propias reglas y restricciones, por lo que es una especie de Slack con una comunidad autocontrolada.", "logos": [{ "icon": { "id": 3141564, "tags": "scale,accounting,balance,inequality,money,business and finance,banking,justice scale", "image": "https://cdn-icons-png.flaticon.com/512/3141/3141564.png", "description": "Economic disparities" }, "brand": { "title": "FaireLaw", "titleFamily": "Comfortaa Bold Alt2", "titleVariant": "700", "taglineFamily": "Raleway", "taglineVariant": "500", "titleColor": "#ffffff", "taglineColor": "#ffffff", "backgroundColor": "#6b6e5a" } }, { "icon": { "id": 6802347, "tags": "social inequality,xenophobia,human rights,no racism,miscellaneous,equality", "image": "https://cdn-icons-png.flaticon.com/512/6802/6802347.png", "description": "Social inequality" }, "brand": { "title": "TruthfulLaw", "titleFamily": "Averta", "titleVariant": "700italic", "taglineFamily": "Raleway", "taglineVariant": "500", "titleColor": "", "taglineColor": "#ffffff", "backgroundColor": "#FFFFFF" } }, { "icon": { "id": 3391631, "tags": "choice,inequality,influencer,subscribe,balance,follow,like,dislike,blogger,social media", "image": "https://cdn-icons-png.flaticon.com/512/3391/3391631.png", "description": "Choice" }, "brand": { "title": "JUSTLAW", "titleFamily": "Montserrat ExtraBold Alt1", "titleVariant": "800", "taglineFamily": "Montserrat", "taglineVariant": "500", "titleColor": "#ffffff", "taglineColor": "#ffffff", "backgroundColor": "#efefef" } }, { "icon": { "id": 2635584, "tags": "ph balance,business and finance,inequality,legal,judge,balanced,law,balance,justice,business", "image": "https://cdn-icons-png.flaticon.com/512/2635/2635584.png", "description": "Balance" }, "brand": { "title": "LAWCITER", "titleFamily": "Phenomena", "titleVariant": "700", "taglineFamily": "Fira Sans Condensed", "taglineVariant": "italic", "titleColor": "", "taglineColor": "#ffffff", "backgroundColor": "#304c82" } }, { "icon": { "id": 2698362, "tags": "weighing scale,inequality,law,balance,scale,laws,scales,business and finance,justice scale,judge,justice", "image": "https://cdn-icons-png.flaticon.com/512/2698/2698362.png", "description": "Balance" }, "brand": { "title": "OPENLAWS", "titleFamily": "Raleway Medium Alt1", "titleVariant": "500", "taglineFamily": "Raleway", "taglineVariant": "600italic", "titleColor": "#ffffff", "taglineColor": "#ffffff", "backgroundColor": "#88c6d1" } }, { "icon": { "id": 1757240, "tags": "law,justice,inequality,justice scale,business and finance,laws,judge,balance", "image": "https://cdn-icons-png.flaticon.com/512/1757/1757240.png", "description": "Balance" }, "brand": { "title": "lawful", "titleFamily": "Brandmark1 Bold", "titleVariant": "700", "taglineFamily": "Montserrat", "taglineVariant": "400", "titleColor": "#b15640", "taglineColor": "#ffffff", "backgroundColor": "#a59b93" } }] };
        }
        this.setIdeaText(response.idea);
        this.setLogos(response.logos || []);
    }
    async _refreshForm() {
        this._firstIdea = true;
        // Clear Results
        this.setIdeaText("clear");
        this.setLogos([]);
        // Clear Form
        this._selectedStudies.value = '';
        this._selectedStudies.removeAttribute('invalid');
        this._selectedCountry.value = '';
        this._selectedCountry.removeAttribute('invalid');
        this._selectedSector.value = '';
        this._selectedSector.removeAttribute('invalid');
        this._selectedODS.value = '';
        this._selectedODS.removeAttribute('invalid');
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setLogos(logos) {
        if (logos.length > 0) {
            logos.map((logo) => {
                var _a;
                const font = this._variables.fonts[Math.floor(Math.random() * this._variables.fonts.length)];
                // logo.brand.titleColor
                const style = `
          color: ${this.invertColor(logo.brand.backgroundColor, false)} !important;
          font-family: ${font.family} !important;
          font-weight: ${font.variant} !important;
        `;
                const divObj = document.createElement('bx-tile');
                divObj.className = 'cds--col exp-text-center exp-questions-margins';
                divObj.style.backgroundColor = logo.brand.backgroundColor;
                divObj.style.border = '2px solid lightgray';
                divObj.innerHTML = `
          ${((_a = logo === null || logo === void 0 ? void 0 : logo.icon) === null || _a === void 0 ? void 0 : _a.image)
                    ? '<img src="' + logo.icon.image + '" class="business-icon">'
                    : ''}
          <h4 style="${style}">${logo.brand.title.toLocaleUpperCase('en')}</h4>
        `;
                this._areaProGallery.appendChild(divObj);
            });
            this._iconAttribution.innerHTML = `
        <a href="https://www.flaticon.com/free-icons/icon" target="_blank" rel="noopener" title="Icons attribution">
          <h4>Icons created by Freepik - Flaticon</h4>
        </a>
      `;
        }
        else {
            this._areaProGallery.innerHTML = '';
        }
    }
    setIdeaText(text) {
        if (text === "clear") {
            this._areaIdeaText.innerHTML = '';
            this._iconAttribution.innerHTML = '';
        }
        else if (text === "loading") {
            this._iconAttribution.innerHTML = '';
            this._areaIdeaText.innerHTML = `
        <div style="position: relative; padding: 3rem; display: flex;">
          <bx-loading assistiveText="Loading ..." type="overlay"></bx-loading>
        </div>
      `;
        }
        else {
            this._firstIdea = false;
            this._areaIdeaText.innerHTML = `
        <h2>${this._texts[this.expLang].ideaHeader}</h2>
        <h3>${text}</h3><br/>
        <h4>${this._texts[this.expLang].logoHeader}</h4>
      `;
        }
    }
};
ExpWizard.styles = [unsafeCSS(css `:host .cds--grid{margin-right:auto;margin-left:auto;max-width:66rem;padding-right:0.6666666667rem;padding-left:0.6666666667rem}@media(min-width: 28rem){:host .cds--grid{padding-right:1.3333333333rem;padding-left:1.3333333333rem}}@media(min-width: 66rem){:host .cds--grid{padding-right:1.6666666667rem;padding-left:1.6666666667rem}}@media(min-width: 66rem){:host .cds--grid--full-width{max-width:100%}}:host .cds--row{display:flex;flex-wrap:wrap;margin-right:-0.6666666667rem;margin-left:-0.6666666667rem}:host .cds--row-padding [class*=cds--col],:host .cds--col-padding{padding-top:0.6666666667rem;padding-bottom:0.6666666667rem}:host .cds--grid--condensed [class*=cds--col]{padding-top:0.0208333333rem;padding-bottom:0.0208333333rem}:host .cds--col{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col,.cds--grid--condensed :host .cds--col{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col,.cds--grid--narrow :host .cds--col{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-sm-0{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-sm-0,.cds--grid--condensed :host .cds--col-sm-0{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-sm-0,.cds--grid--narrow :host .cds--col-sm-0{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-sm-1{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-sm-1,.cds--grid--condensed :host .cds--col-sm-1{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-sm-1,.cds--grid--narrow :host .cds--col-sm-1{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-sm-2{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-sm-2,.cds--grid--condensed :host .cds--col-sm-2{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-sm-2,.cds--grid--narrow :host .cds--col-sm-2{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-sm-3{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-sm-3,.cds--grid--condensed :host .cds--col-sm-3{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-sm-3,.cds--grid--narrow :host .cds--col-sm-3{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-sm-4{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-sm-4,.cds--grid--condensed :host .cds--col-sm-4{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-sm-4,.cds--grid--narrow :host .cds--col-sm-4{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-sm,:host .cds--col-sm--auto{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-sm,.cds--grid--condensed :host .cds--col-sm,.cds--row--condensed :host .cds--col-sm--auto,.cds--grid--condensed :host .cds--col-sm--auto{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-sm,.cds--grid--narrow :host .cds--col-sm,.cds--row--narrow :host .cds--col-sm--auto,.cds--grid--narrow :host .cds--col-sm--auto{padding-right:0.6666666667rem;padding-left:0}:host .cds--col,:host .cds--col-sm{max-width:100%;flex-basis:0;flex-grow:1}:host .cds--col--auto,:host .cds--col-sm--auto{width:auto;max-width:100%;flex:1 0 0%}:host .cds--col-sm-0{display:none}:host .cds--col-sm-1{display:block;max-width:25%;flex:0 0 25%}:host .cds--col-sm-2{display:block;max-width:50%;flex:0 0 50%}:host .cds--col-sm-3{display:block;max-width:75%;flex:0 0 75%}:host .cds--col-sm-4{display:block;max-width:100%;flex:0 0 100%}:host .cds--offset-sm-0{margin-left:0}:host .cds--offset-sm-1{margin-left:25%}:host .cds--offset-sm-2{margin-left:50%}:host .cds--offset-sm-3{margin-left:75%}:host .cds--col-md-0{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-md-0,.cds--grid--condensed :host .cds--col-md-0{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-md-0,.cds--grid--narrow :host .cds--col-md-0{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-md-1{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-md-1,.cds--grid--condensed :host .cds--col-md-1{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-md-1,.cds--grid--narrow :host .cds--col-md-1{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-md-2{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-md-2,.cds--grid--condensed :host .cds--col-md-2{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-md-2,.cds--grid--narrow :host .cds--col-md-2{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-md-3{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-md-3,.cds--grid--condensed :host .cds--col-md-3{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-md-3,.cds--grid--narrow :host .cds--col-md-3{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-md-4{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-md-4,.cds--grid--condensed :host .cds--col-md-4{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-md-4,.cds--grid--narrow :host .cds--col-md-4{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-md-5{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-md-5,.cds--grid--condensed :host .cds--col-md-5{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-md-5,.cds--grid--narrow :host .cds--col-md-5{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-md-6{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-md-6,.cds--grid--condensed :host .cds--col-md-6{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-md-6,.cds--grid--narrow :host .cds--col-md-6{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-md-7{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-md-7,.cds--grid--condensed :host .cds--col-md-7{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-md-7,.cds--grid--narrow :host .cds--col-md-7{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-md-8{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-md-8,.cds--grid--condensed :host .cds--col-md-8{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-md-8,.cds--grid--narrow :host .cds--col-md-8{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-md,:host .cds--col-md--auto{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-md,.cds--grid--condensed :host .cds--col-md,.cds--row--condensed :host .cds--col-md--auto,.cds--grid--condensed :host .cds--col-md--auto{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-md,.cds--grid--narrow :host .cds--col-md,.cds--row--narrow :host .cds--col-md--auto,.cds--grid--narrow :host .cds--col-md--auto{padding-right:0.6666666667rem;padding-left:0}@media(min-width: 28rem){:host .cds--col,:host .cds--col-md{max-width:100%;flex-basis:0;flex-grow:1}:host .cds--col--auto,:host .cds--col-md--auto{width:auto;max-width:100%;flex:1 0 0%}:host .cds--col-md-0{display:none}:host .cds--col-md-1{display:block;max-width:12.5%;flex:0 0 12.5%}:host .cds--col-md-2{display:block;max-width:25%;flex:0 0 25%}:host .cds--col-md-3{display:block;max-width:37.5%;flex:0 0 37.5%}:host .cds--col-md-4{display:block;max-width:50%;flex:0 0 50%}:host .cds--col-md-5{display:block;max-width:62.5%;flex:0 0 62.5%}:host .cds--col-md-6{display:block;max-width:75%;flex:0 0 75%}:host .cds--col-md-7{display:block;max-width:87.5%;flex:0 0 87.5%}:host .cds--col-md-8{display:block;max-width:100%;flex:0 0 100%}:host .cds--offset-md-0{margin-left:0}:host .cds--offset-md-1{margin-left:12.5%}:host .cds--offset-md-2{margin-left:25%}:host .cds--offset-md-3{margin-left:37.5%}:host .cds--offset-md-4{margin-left:50%}:host .cds--offset-md-5{margin-left:62.5%}:host .cds--offset-md-6{margin-left:75%}:host .cds--offset-md-7{margin-left:87.5%}}:host .cds--col-lg-0{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-lg-0,.cds--grid--condensed :host .cds--col-lg-0{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-lg-0,.cds--grid--narrow :host .cds--col-lg-0{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-lg-1{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-lg-1,.cds--grid--condensed :host .cds--col-lg-1{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-lg-1,.cds--grid--narrow :host .cds--col-lg-1{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-lg-2{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-lg-2,.cds--grid--condensed :host .cds--col-lg-2{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-lg-2,.cds--grid--narrow :host .cds--col-lg-2{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-lg-3{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-lg-3,.cds--grid--condensed :host .cds--col-lg-3{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-lg-3,.cds--grid--narrow :host .cds--col-lg-3{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-lg-4{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-lg-4,.cds--grid--condensed :host .cds--col-lg-4{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-lg-4,.cds--grid--narrow :host .cds--col-lg-4{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-lg-5{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-lg-5,.cds--grid--condensed :host .cds--col-lg-5{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-lg-5,.cds--grid--narrow :host .cds--col-lg-5{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-lg-6{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-lg-6,.cds--grid--condensed :host .cds--col-lg-6{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-lg-6,.cds--grid--narrow :host .cds--col-lg-6{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-lg-7{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-lg-7,.cds--grid--condensed :host .cds--col-lg-7{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-lg-7,.cds--grid--narrow :host .cds--col-lg-7{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-lg-8{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-lg-8,.cds--grid--condensed :host .cds--col-lg-8{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-lg-8,.cds--grid--narrow :host .cds--col-lg-8{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-lg-9{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-lg-9,.cds--grid--condensed :host .cds--col-lg-9{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-lg-9,.cds--grid--narrow :host .cds--col-lg-9{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-lg-10{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-lg-10,.cds--grid--condensed :host .cds--col-lg-10{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-lg-10,.cds--grid--narrow :host .cds--col-lg-10{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-lg-11{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-lg-11,.cds--grid--condensed :host .cds--col-lg-11{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-lg-11,.cds--grid--narrow :host .cds--col-lg-11{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-lg-12{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-lg-12,.cds--grid--condensed :host .cds--col-lg-12{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-lg-12,.cds--grid--narrow :host .cds--col-lg-12{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-lg-13{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-lg-13,.cds--grid--condensed :host .cds--col-lg-13{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-lg-13,.cds--grid--narrow :host .cds--col-lg-13{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-lg-14{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-lg-14,.cds--grid--condensed :host .cds--col-lg-14{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-lg-14,.cds--grid--narrow :host .cds--col-lg-14{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-lg-15{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-lg-15,.cds--grid--condensed :host .cds--col-lg-15{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-lg-15,.cds--grid--narrow :host .cds--col-lg-15{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-lg-16{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-lg-16,.cds--grid--condensed :host .cds--col-lg-16{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-lg-16,.cds--grid--narrow :host .cds--col-lg-16{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-lg,:host .cds--col-lg--auto{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-lg,.cds--grid--condensed :host .cds--col-lg,.cds--row--condensed :host .cds--col-lg--auto,.cds--grid--condensed :host .cds--col-lg--auto{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-lg,.cds--grid--narrow :host .cds--col-lg,.cds--row--narrow :host .cds--col-lg--auto,.cds--grid--narrow :host .cds--col-lg--auto{padding-right:0.6666666667rem;padding-left:0}@media(min-width: 44rem){:host .cds--col,:host .cds--col-lg{max-width:100%;flex-basis:0;flex-grow:1}:host .cds--col--auto,:host .cds--col-lg--auto{width:auto;max-width:100%;flex:1 0 0%}:host .cds--col-lg-0{display:none}:host .cds--col-lg-1{display:block;max-width:6.25%;flex:0 0 6.25%}:host .cds--col-lg-2{display:block;max-width:12.5%;flex:0 0 12.5%}:host .cds--col-lg-3{display:block;max-width:18.75%;flex:0 0 18.75%}:host .cds--col-lg-4{display:block;max-width:25%;flex:0 0 25%}:host .cds--col-lg-5{display:block;max-width:31.25%;flex:0 0 31.25%}:host .cds--col-lg-6{display:block;max-width:37.5%;flex:0 0 37.5%}:host .cds--col-lg-7{display:block;max-width:43.75%;flex:0 0 43.75%}:host .cds--col-lg-8{display:block;max-width:50%;flex:0 0 50%}:host .cds--col-lg-9{display:block;max-width:56.25%;flex:0 0 56.25%}:host .cds--col-lg-10{display:block;max-width:62.5%;flex:0 0 62.5%}:host .cds--col-lg-11{display:block;max-width:68.75%;flex:0 0 68.75%}:host .cds--col-lg-12{display:block;max-width:75%;flex:0 0 75%}:host .cds--col-lg-13{display:block;max-width:81.25%;flex:0 0 81.25%}:host .cds--col-lg-14{display:block;max-width:87.5%;flex:0 0 87.5%}:host .cds--col-lg-15{display:block;max-width:93.75%;flex:0 0 93.75%}:host .cds--col-lg-16{display:block;max-width:100%;flex:0 0 100%}:host .cds--offset-lg-0{margin-left:0}:host .cds--offset-lg-1{margin-left:6.25%}:host .cds--offset-lg-2{margin-left:12.5%}:host .cds--offset-lg-3{margin-left:18.75%}:host .cds--offset-lg-4{margin-left:25%}:host .cds--offset-lg-5{margin-left:31.25%}:host .cds--offset-lg-6{margin-left:37.5%}:host .cds--offset-lg-7{margin-left:43.75%}:host .cds--offset-lg-8{margin-left:50%}:host .cds--offset-lg-9{margin-left:56.25%}:host .cds--offset-lg-10{margin-left:62.5%}:host .cds--offset-lg-11{margin-left:68.75%}:host .cds--offset-lg-12{margin-left:75%}:host .cds--offset-lg-13{margin-left:81.25%}:host .cds--offset-lg-14{margin-left:87.5%}:host .cds--offset-lg-15{margin-left:93.75%}}:host .cds--col-xlg-0{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-xlg-0,.cds--grid--condensed :host .cds--col-xlg-0{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-xlg-0,.cds--grid--narrow :host .cds--col-xlg-0{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-xlg-1{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-xlg-1,.cds--grid--condensed :host .cds--col-xlg-1{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-xlg-1,.cds--grid--narrow :host .cds--col-xlg-1{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-xlg-2{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-xlg-2,.cds--grid--condensed :host .cds--col-xlg-2{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-xlg-2,.cds--grid--narrow :host .cds--col-xlg-2{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-xlg-3{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-xlg-3,.cds--grid--condensed :host .cds--col-xlg-3{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-xlg-3,.cds--grid--narrow :host .cds--col-xlg-3{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-xlg-4{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-xlg-4,.cds--grid--condensed :host .cds--col-xlg-4{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-xlg-4,.cds--grid--narrow :host .cds--col-xlg-4{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-xlg-5{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-xlg-5,.cds--grid--condensed :host .cds--col-xlg-5{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-xlg-5,.cds--grid--narrow :host .cds--col-xlg-5{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-xlg-6{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-xlg-6,.cds--grid--condensed :host .cds--col-xlg-6{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-xlg-6,.cds--grid--narrow :host .cds--col-xlg-6{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-xlg-7{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-xlg-7,.cds--grid--condensed :host .cds--col-xlg-7{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-xlg-7,.cds--grid--narrow :host .cds--col-xlg-7{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-xlg-8{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-xlg-8,.cds--grid--condensed :host .cds--col-xlg-8{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-xlg-8,.cds--grid--narrow :host .cds--col-xlg-8{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-xlg-9{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-xlg-9,.cds--grid--condensed :host .cds--col-xlg-9{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-xlg-9,.cds--grid--narrow :host .cds--col-xlg-9{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-xlg-10{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-xlg-10,.cds--grid--condensed :host .cds--col-xlg-10{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-xlg-10,.cds--grid--narrow :host .cds--col-xlg-10{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-xlg-11{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-xlg-11,.cds--grid--condensed :host .cds--col-xlg-11{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-xlg-11,.cds--grid--narrow :host .cds--col-xlg-11{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-xlg-12{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-xlg-12,.cds--grid--condensed :host .cds--col-xlg-12{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-xlg-12,.cds--grid--narrow :host .cds--col-xlg-12{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-xlg-13{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-xlg-13,.cds--grid--condensed :host .cds--col-xlg-13{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-xlg-13,.cds--grid--narrow :host .cds--col-xlg-13{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-xlg-14{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-xlg-14,.cds--grid--condensed :host .cds--col-xlg-14{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-xlg-14,.cds--grid--narrow :host .cds--col-xlg-14{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-xlg-15{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-xlg-15,.cds--grid--condensed :host .cds--col-xlg-15{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-xlg-15,.cds--grid--narrow :host .cds--col-xlg-15{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-xlg-16{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-xlg-16,.cds--grid--condensed :host .cds--col-xlg-16{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-xlg-16,.cds--grid--narrow :host .cds--col-xlg-16{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-xlg,:host .cds--col-xlg--auto{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-xlg,.cds--grid--condensed :host .cds--col-xlg,.cds--row--condensed :host .cds--col-xlg--auto,.cds--grid--condensed :host .cds--col-xlg--auto{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-xlg,.cds--grid--narrow :host .cds--col-xlg,.cds--row--narrow :host .cds--col-xlg--auto,.cds--grid--narrow :host .cds--col-xlg--auto{padding-right:0.6666666667rem;padding-left:0}@media(min-width: 54.6666666667rem){:host .cds--col,:host .cds--col-xlg{max-width:100%;flex-basis:0;flex-grow:1}:host .cds--col--auto,:host .cds--col-xlg--auto{width:auto;max-width:100%;flex:1 0 0%}:host .cds--col-xlg-0{display:none}:host .cds--col-xlg-1{display:block;max-width:6.25%;flex:0 0 6.25%}:host .cds--col-xlg-2{display:block;max-width:12.5%;flex:0 0 12.5%}:host .cds--col-xlg-3{display:block;max-width:18.75%;flex:0 0 18.75%}:host .cds--col-xlg-4{display:block;max-width:25%;flex:0 0 25%}:host .cds--col-xlg-5{display:block;max-width:31.25%;flex:0 0 31.25%}:host .cds--col-xlg-6{display:block;max-width:37.5%;flex:0 0 37.5%}:host .cds--col-xlg-7{display:block;max-width:43.75%;flex:0 0 43.75%}:host .cds--col-xlg-8{display:block;max-width:50%;flex:0 0 50%}:host .cds--col-xlg-9{display:block;max-width:56.25%;flex:0 0 56.25%}:host .cds--col-xlg-10{display:block;max-width:62.5%;flex:0 0 62.5%}:host .cds--col-xlg-11{display:block;max-width:68.75%;flex:0 0 68.75%}:host .cds--col-xlg-12{display:block;max-width:75%;flex:0 0 75%}:host .cds--col-xlg-13{display:block;max-width:81.25%;flex:0 0 81.25%}:host .cds--col-xlg-14{display:block;max-width:87.5%;flex:0 0 87.5%}:host .cds--col-xlg-15{display:block;max-width:93.75%;flex:0 0 93.75%}:host .cds--col-xlg-16{display:block;max-width:100%;flex:0 0 100%}:host .cds--offset-xlg-0{margin-left:0}:host .cds--offset-xlg-1{margin-left:6.25%}:host .cds--offset-xlg-2{margin-left:12.5%}:host .cds--offset-xlg-3{margin-left:18.75%}:host .cds--offset-xlg-4{margin-left:25%}:host .cds--offset-xlg-5{margin-left:31.25%}:host .cds--offset-xlg-6{margin-left:37.5%}:host .cds--offset-xlg-7{margin-left:43.75%}:host .cds--offset-xlg-8{margin-left:50%}:host .cds--offset-xlg-9{margin-left:56.25%}:host .cds--offset-xlg-10{margin-left:62.5%}:host .cds--offset-xlg-11{margin-left:68.75%}:host .cds--offset-xlg-12{margin-left:75%}:host .cds--offset-xlg-13{margin-left:81.25%}:host .cds--offset-xlg-14{margin-left:87.5%}:host .cds--offset-xlg-15{margin-left:93.75%}}:host .cds--col-max-0{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-max-0,.cds--grid--condensed :host .cds--col-max-0{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-max-0,.cds--grid--narrow :host .cds--col-max-0{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-max-1{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-max-1,.cds--grid--condensed :host .cds--col-max-1{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-max-1,.cds--grid--narrow :host .cds--col-max-1{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-max-2{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-max-2,.cds--grid--condensed :host .cds--col-max-2{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-max-2,.cds--grid--narrow :host .cds--col-max-2{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-max-3{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-max-3,.cds--grid--condensed :host .cds--col-max-3{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-max-3,.cds--grid--narrow :host .cds--col-max-3{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-max-4{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-max-4,.cds--grid--condensed :host .cds--col-max-4{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-max-4,.cds--grid--narrow :host .cds--col-max-4{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-max-5{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-max-5,.cds--grid--condensed :host .cds--col-max-5{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-max-5,.cds--grid--narrow :host .cds--col-max-5{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-max-6{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-max-6,.cds--grid--condensed :host .cds--col-max-6{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-max-6,.cds--grid--narrow :host .cds--col-max-6{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-max-7{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-max-7,.cds--grid--condensed :host .cds--col-max-7{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-max-7,.cds--grid--narrow :host .cds--col-max-7{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-max-8{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-max-8,.cds--grid--condensed :host .cds--col-max-8{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-max-8,.cds--grid--narrow :host .cds--col-max-8{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-max-9{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-max-9,.cds--grid--condensed :host .cds--col-max-9{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-max-9,.cds--grid--narrow :host .cds--col-max-9{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-max-10{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-max-10,.cds--grid--condensed :host .cds--col-max-10{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-max-10,.cds--grid--narrow :host .cds--col-max-10{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-max-11{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-max-11,.cds--grid--condensed :host .cds--col-max-11{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-max-11,.cds--grid--narrow :host .cds--col-max-11{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-max-12{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-max-12,.cds--grid--condensed :host .cds--col-max-12{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-max-12,.cds--grid--narrow :host .cds--col-max-12{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-max-13{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-max-13,.cds--grid--condensed :host .cds--col-max-13{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-max-13,.cds--grid--narrow :host .cds--col-max-13{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-max-14{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-max-14,.cds--grid--condensed :host .cds--col-max-14{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-max-14,.cds--grid--narrow :host .cds--col-max-14{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-max-15{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-max-15,.cds--grid--condensed :host .cds--col-max-15{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-max-15,.cds--grid--narrow :host .cds--col-max-15{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-max-16{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-max-16,.cds--grid--condensed :host .cds--col-max-16{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-max-16,.cds--grid--narrow :host .cds--col-max-16{padding-right:0.6666666667rem;padding-left:0}:host .cds--col-max,:host .cds--col-max--auto{width:100%;padding-right:0.6666666667rem;padding-left:0.6666666667rem}.cds--row--condensed :host .cds--col-max,.cds--grid--condensed :host .cds--col-max,.cds--row--condensed :host .cds--col-max--auto,.cds--grid--condensed :host .cds--col-max--auto{padding-right:0.0208333333rem;padding-left:0.0208333333rem}.cds--row--narrow :host .cds--col-max,.cds--grid--narrow :host .cds--col-max,.cds--row--narrow :host .cds--col-max--auto,.cds--grid--narrow :host .cds--col-max--auto{padding-right:0.6666666667rem;padding-left:0}@media(min-width: 66rem){:host .cds--col,:host .cds--col-max{max-width:100%;flex-basis:0;flex-grow:1}:host .cds--col--auto,:host .cds--col-max--auto{width:auto;max-width:100%;flex:1 0 0%}:host .cds--col-max-0{display:none}:host .cds--col-max-1{display:block;max-width:6.25%;flex:0 0 6.25%}:host .cds--col-max-2{display:block;max-width:12.5%;flex:0 0 12.5%}:host .cds--col-max-3{display:block;max-width:18.75%;flex:0 0 18.75%}:host .cds--col-max-4{display:block;max-width:25%;flex:0 0 25%}:host .cds--col-max-5{display:block;max-width:31.25%;flex:0 0 31.25%}:host .cds--col-max-6{display:block;max-width:37.5%;flex:0 0 37.5%}:host .cds--col-max-7{display:block;max-width:43.75%;flex:0 0 43.75%}:host .cds--col-max-8{display:block;max-width:50%;flex:0 0 50%}:host .cds--col-max-9{display:block;max-width:56.25%;flex:0 0 56.25%}:host .cds--col-max-10{display:block;max-width:62.5%;flex:0 0 62.5%}:host .cds--col-max-11{display:block;max-width:68.75%;flex:0 0 68.75%}:host .cds--col-max-12{display:block;max-width:75%;flex:0 0 75%}:host .cds--col-max-13{display:block;max-width:81.25%;flex:0 0 81.25%}:host .cds--col-max-14{display:block;max-width:87.5%;flex:0 0 87.5%}:host .cds--col-max-15{display:block;max-width:93.75%;flex:0 0 93.75%}:host .cds--col-max-16{display:block;max-width:100%;flex:0 0 100%}:host .cds--offset-max-0{margin-left:0}:host .cds--offset-max-1{margin-left:6.25%}:host .cds--offset-max-2{margin-left:12.5%}:host .cds--offset-max-3{margin-left:18.75%}:host .cds--offset-max-4{margin-left:25%}:host .cds--offset-max-5{margin-left:31.25%}:host .cds--offset-max-6{margin-left:37.5%}:host .cds--offset-max-7{margin-left:43.75%}:host .cds--offset-max-8{margin-left:50%}:host .cds--offset-max-9{margin-left:56.25%}:host .cds--offset-max-10{margin-left:62.5%}:host .cds--offset-max-11{margin-left:68.75%}:host .cds--offset-max-12{margin-left:75%}:host .cds--offset-max-13{margin-left:81.25%}:host .cds--offset-max-14{margin-left:87.5%}:host .cds--offset-max-15{margin-left:93.75%}}:host .cds--no-gutter,:host .cds--row.cds--no-gutter [class*=cds--col]{padding-right:0;padding-left:0}:host .cds--no-gutter--start,:host .cds--row.cds--no-gutter--start [class*=cds--col]{padding-left:0}:host .cds--no-gutter--end,:host .cds--row.cds--no-gutter--end [class*=cds--col]{padding-right:0}:host .cds--hang--start{padding-left:0.6666666667rem}:host .cds--hang--end{padding-right:0.6666666667rem}:host html{font-size:100%}:host body{font-weight:400;font-family:"IBM Plex Sans",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}:host code{font-family:"IBM Plex Mono",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",monospace}:host strong{font-weight:600}:host h1{font-size:var(--cds-heading-06-font-size, 1.3333333333rem);font-weight:var(--cds-heading-06-font-weight, 300);line-height:var(--cds-heading-06-line-height, 1.199);letter-spacing:var(--cds-heading-06-letter-spacing, 0)}:host h2{font-size:var(--cds-heading-05-font-size, 1.3333333333rem);font-weight:var(--cds-heading-05-font-weight, 400);line-height:var(--cds-heading-05-line-height, 1.25);letter-spacing:var(--cds-heading-05-letter-spacing, 0)}:host h3{font-size:var(--cds-heading-04-font-size, 1.1666666667rem);font-weight:var(--cds-heading-04-font-weight, 400);line-height:var(--cds-heading-04-line-height, 1.28572);letter-spacing:var(--cds-heading-04-letter-spacing, 0)}:host h4{font-size:var(--cds-heading-03-font-size, 0.8333333333rem);font-weight:var(--cds-heading-03-font-weight, 400);line-height:var(--cds-heading-03-line-height, 1.4);letter-spacing:var(--cds-heading-03-letter-spacing, 0)}:host h5{font-size:var(--cds-heading-02-font-size, 0.6666666667rem);font-weight:var(--cds-heading-02-font-weight, 600);line-height:var(--cds-heading-02-line-height, 1.5);letter-spacing:var(--cds-heading-02-letter-spacing, 0)}:host h6{font-size:var(--cds-heading-01-font-size, 0.5833333333rem);font-weight:var(--cds-heading-01-font-weight, 600);line-height:var(--cds-heading-01-line-height, 1.42857);letter-spacing:var(--cds-heading-01-letter-spacing, 0.16px)}:host p{font-size:var(--cds-body-02-font-size, 0.6666666667rem);font-weight:var(--cds-body-02-font-weight, 400);line-height:var(--cds-body-02-line-height, 1.5);letter-spacing:var(--cds-body-02-letter-spacing, 0)}:host a{color:var(--cds-link-primary, #0062fe)}:host em{font-style:italic}:host .cds--type-mono{font-family:"IBM Plex Mono",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",monospace}:host .cds--type-sans{font-family:"IBM Plex Sans",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}:host .cds--type-sans-condensed{font-family:"IBM Plex Sans Condensed",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}:host .cds--type-sans-arabic{font-family:"IBM Plex Sans Arabic",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}:host .cds--type-sans-devanagari{font-family:"IBM Plex Sans Devanagari",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}:host .cds--type-sans-hebrew{font-family:"IBM Plex Sans Hebrew",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}:host .cds--type-sans-jp{font-family:"IBM Plex Sans JP",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}:host .cds--type-sans-kr{font-family:"IBM Plex Sans KR",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}:host .cds--type-sans-thai-looped{font-family:"IBM Plex Sans Thai Looped",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}:host .cds--type-sans-thai{font-family:"IBM Plex Sans Thai",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",sans-serif}:host .cds--type-serif{font-family:"IBM Plex Serif",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",serif}:host .cds--type-light{font-weight:300}:host .cds--type-regular{font-weight:400}:host .cds--type-semibold{font-weight:600}:host .cds--type-italic{font-style:italic}:host .cds--type-label-01{font-size:var(--cds-label-01-font-size, 0.5rem);font-weight:var(--cds-label-01-font-weight, 400);line-height:var(--cds-label-01-line-height, 1.33333);letter-spacing:var(--cds-label-01-letter-spacing, 0.32px)}:host .cds--type-helper-text-01{font-size:var(--cds-helper-text-01-font-size, 0.5rem);line-height:var(--cds-helper-text-01-line-height, 1.33333);letter-spacing:var(--cds-helper-text-01-letter-spacing, 0.32px)}:host .cds--type-body-short-01{font-size:var(--cds-body-short-01-font-size, 0.5833333333rem);font-weight:var(--cds-body-short-01-font-weight, 400);line-height:var(--cds-body-short-01-line-height, 1.28572);letter-spacing:var(--cds-body-short-01-letter-spacing, 0.16px)}:host .cds--type-body-short-02{font-size:var(--cds-body-short-02-font-size, 0.6666666667rem);font-weight:var(--cds-body-short-02-font-weight, 400);line-height:var(--cds-body-short-02-line-height, 1.375);letter-spacing:var(--cds-body-short-02-letter-spacing, 0)}:host .cds--type-body-long-01{font-size:var(--cds-body-long-01-font-size, 0.5833333333rem);font-weight:var(--cds-body-long-01-font-weight, 400);line-height:var(--cds-body-long-01-line-height, 1.42857);letter-spacing:var(--cds-body-long-01-letter-spacing, 0.16px)}:host .cds--type-body-long-02{font-size:var(--cds-body-long-02-font-size, 0.6666666667rem);font-weight:var(--cds-body-long-02-font-weight, 400);line-height:var(--cds-body-long-02-line-height, 1.5);letter-spacing:var(--cds-body-long-02-letter-spacing, 0)}:host .cds--type-code-01{font-family:var(--cds-code-01-font-family, "IBM Plex Mono", system-ui, -apple-system, BlinkMacSystemFont, ".SFNSText-Regular", monospace);font-size:var(--cds-code-01-font-size, 0.5rem);font-weight:var(--cds-code-01-font-weight, 400);line-height:var(--cds-code-01-line-height, 1.33333);letter-spacing:var(--cds-code-01-letter-spacing, 0.32px)}:host .cds--type-code-02{font-family:var(--cds-code-02-font-family, "IBM Plex Mono", system-ui, -apple-system, BlinkMacSystemFont, ".SFNSText-Regular", monospace);font-size:var(--cds-code-02-font-size, 0.5833333333rem);font-weight:var(--cds-code-02-font-weight, 400);line-height:var(--cds-code-02-line-height, 1.42857);letter-spacing:var(--cds-code-02-letter-spacing, 0.32px)}:host .cds--type-heading-01{font-size:var(--cds-heading-01-font-size, 0.5833333333rem);font-weight:var(--cds-heading-01-font-weight, 600);line-height:var(--cds-heading-01-line-height, 1.42857);letter-spacing:var(--cds-heading-01-letter-spacing, 0.16px)}:host .cds--type-heading-02{font-size:var(--cds-heading-02-font-size, 0.6666666667rem);font-weight:var(--cds-heading-02-font-weight, 600);line-height:var(--cds-heading-02-line-height, 1.5);letter-spacing:var(--cds-heading-02-letter-spacing, 0)}:host .cds--type-productive-heading-01{font-size:var(--cds-productive-heading-01-font-size, 0.5833333333rem);font-weight:var(--cds-productive-heading-01-font-weight, 600);line-height:var(--cds-productive-heading-01-line-height, 1.28572);letter-spacing:var(--cds-productive-heading-01-letter-spacing, 0.16px)}:host .cds--type-productive-heading-02{font-size:var(--cds-productive-heading-02-font-size, 0.6666666667rem);font-weight:var(--cds-productive-heading-02-font-weight, 600);line-height:var(--cds-productive-heading-02-line-height, 1.375);letter-spacing:var(--cds-productive-heading-02-letter-spacing, 0)}:host .cds--type-productive-heading-03{font-size:var(--cds-productive-heading-03-font-size, 0.8333333333rem);font-weight:var(--cds-productive-heading-03-font-weight, 400);line-height:var(--cds-productive-heading-03-line-height, 1.4);letter-spacing:var(--cds-productive-heading-03-letter-spacing, 0)}:host .cds--type-productive-heading-04{font-size:var(--cds-productive-heading-04-font-size, 1.1666666667rem);font-weight:var(--cds-productive-heading-04-font-weight, 400);line-height:var(--cds-productive-heading-04-line-height, 1.28572);letter-spacing:var(--cds-productive-heading-04-letter-spacing, 0)}:host .cds--type-productive-heading-05{font-size:var(--cds-productive-heading-05-font-size, 1.3333333333rem);font-weight:var(--cds-productive-heading-05-font-weight, 400);line-height:var(--cds-productive-heading-05-line-height, 1.25);letter-spacing:var(--cds-productive-heading-05-letter-spacing, 0)}:host .cds--type-productive-heading-06{font-size:var(--cds-productive-heading-06-font-size, 1.3333333333rem);font-weight:var(--cds-productive-heading-06-font-weight, 300);line-height:var(--cds-productive-heading-06-line-height, 1.199);letter-spacing:var(--cds-productive-heading-06-letter-spacing, 0)}:host .cds--type-productive-heading-07{font-size:var(--cds-productive-heading-07-font-size, 1.75rem);font-weight:var(--cds-productive-heading-07-font-weight, 300);line-height:var(--cds-productive-heading-07-line-height, 1.19);letter-spacing:var(--cds-productive-heading-07-letter-spacing, 0)}:host .cds--type-expressive-paragraph-01{font-size:1rem;font-weight:300;line-height:1.334;letter-spacing:0;font-size:calc(1rem + 0.1666666667*(100vw - 13.3333333333rem)/30.6666666667)}@media(min-width: 44rem){:host .cds--type-expressive-paragraph-01{font-size:1.1666666667rem;line-height:1.28572;font-size:calc(1.1666666667rem + 0.1666666667*(100vw - 44rem)/22)}}@media(min-width: 66rem){:host .cds--type-expressive-paragraph-01{font-size:1.3333333333rem;line-height:1.25;font-size:1.3333333333rem}}:host .cds--type-expressive-heading-01{font-size:var(--cds-expressive-heading-01-font-size, 0.5833333333rem);font-weight:var(--cds-expressive-heading-01-font-weight, 600);line-height:var(--cds-expressive-heading-01-line-height, 1.42857);letter-spacing:var(--cds-expressive-heading-01-letter-spacing, 0.16px)}:host .cds--type-expressive-heading-02{font-size:var(--cds-expressive-heading-02-font-size, 0.6666666667rem);font-weight:var(--cds-expressive-heading-02-font-weight, 600);line-height:var(--cds-expressive-heading-02-line-height, 1.5);letter-spacing:var(--cds-expressive-heading-02-letter-spacing, 0)}:host .cds--type-expressive-heading-03{font-size:0.8333333333rem;font-weight:400;line-height:1.4;letter-spacing:0;font-size:calc(0.8333333333rem + 0*(100vw - 13.3333333333rem)/41.3333333333)}@media(min-width: 54.6666666667rem){:host .cds--type-expressive-heading-03{font-size:0.8333333333rem;line-height:1.25;font-size:calc(0.8333333333rem + 0.1666666667*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-expressive-heading-03{font-size:1rem;line-height:1.334;font-size:1rem}}:host .cds--type-expressive-heading-04{font-size:1.1666666667rem;font-weight:400;line-height:1.28572;letter-spacing:0;font-size:calc(1.1666666667rem + 0*(100vw - 13.3333333333rem)/41.3333333333)}@media(min-width: 54.6666666667rem){:host .cds--type-expressive-heading-04{font-size:1.1666666667rem;line-height:1.25;font-size:calc(1.1666666667rem + 0.1666666667*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-expressive-heading-04{font-size:1.3333333333rem;font-size:1.3333333333rem}}:host .cds--type-expressive-heading-05{font-size:1.3333333333rem;font-weight:400;line-height:1.25;letter-spacing:0;font-size:calc(1.3333333333rem + 0.1666666667*(100vw - 13.3333333333rem)/14.6666666667)}@media(min-width: 28rem){:host .cds--type-expressive-heading-05{font-size:1.5rem;font-weight:300;line-height:1.22;font-size:calc(1.5rem + .25*(100vw - 28rem)/16)}}@media(min-width: 44rem){:host .cds--type-expressive-heading-05{font-size:1.75rem;line-height:1.19;font-size:calc(1.75rem + .25*(100vw - 44rem)/10.6666666667)}}@media(min-width: 54.6666666667rem){:host .cds--type-expressive-heading-05{font-size:2rem;line-height:1.17;font-size:calc(2rem + .5*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-expressive-heading-05{font-size:2.5rem;font-size:2.5rem}}:host .cds--type-expressive-heading-06{font-size:1.3333333333rem;font-weight:600;line-height:1.25;letter-spacing:0;font-size:calc(1.3333333333rem + 0.1666666667*(100vw - 13.3333333333rem)/14.6666666667)}@media(min-width: 28rem){:host .cds--type-expressive-heading-06{font-size:1.5rem;line-height:1.22;font-size:calc(1.5rem + .25*(100vw - 28rem)/16)}}@media(min-width: 44rem){:host .cds--type-expressive-heading-06{font-size:1.75rem;line-height:1.19;font-size:calc(1.75rem + .25*(100vw - 44rem)/10.6666666667)}}@media(min-width: 54.6666666667rem){:host .cds--type-expressive-heading-06{font-size:2rem;line-height:1.17;font-size:calc(2rem + .5*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-expressive-heading-06{font-size:2.5rem;font-size:2.5rem}}:host .cds--type-quotation-01{font-family:"IBM Plex Serif",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",serif;font-size:0.8333333333rem;font-weight:400;line-height:1.3;letter-spacing:0;font-size:calc(0.8333333333rem + 0*(100vw - 13.3333333333rem)/14.6666666667)}@media(min-width: 28rem){:host .cds--type-quotation-01{font-size:0.8333333333rem;font-size:calc(0.8333333333rem + 0.1666666667*(100vw - 28rem)/16)}}@media(min-width: 44rem){:host .cds--type-quotation-01{font-size:1rem;line-height:1.334;font-size:calc(1rem + 0.1666666667*(100vw - 44rem)/10.6666666667)}}@media(min-width: 54.6666666667rem){:host .cds--type-quotation-01{font-size:1.1666666667rem;line-height:1.28572;font-size:calc(1.1666666667rem + 0.1666666667*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-quotation-01{font-size:1.3333333333rem;line-height:1.25;font-size:1.3333333333rem}}:host .cds--type-quotation-02{font-family:"IBM Plex Serif",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",serif;font-size:1.3333333333rem;font-weight:300;line-height:1.25;letter-spacing:0;font-size:calc(1.3333333333rem + 0.1666666667*(100vw - 13.3333333333rem)/14.6666666667)}@media(min-width: 28rem){:host .cds--type-quotation-02{font-size:1.5rem;line-height:1.22;font-size:calc(1.5rem + .25*(100vw - 28rem)/16)}}@media(min-width: 44rem){:host .cds--type-quotation-02{font-size:1.75rem;line-height:1.19;font-size:calc(1.75rem + .25*(100vw - 44rem)/10.6666666667)}}@media(min-width: 54.6666666667rem){:host .cds--type-quotation-02{font-size:2rem;line-height:1.17;font-size:calc(2rem + .5*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-quotation-02{font-size:2.5rem;font-size:2.5rem}}:host .cds--type-display-01{font-size:1.75rem;font-weight:300;line-height:1.19;letter-spacing:0;font-size:calc(1.75rem + 0*(100vw - 13.3333333333rem)/14.6666666667)}@media(min-width: 28rem){:host .cds--type-display-01{font-size:1.75rem;font-size:calc(1.75rem + .5*(100vw - 28rem)/16)}}@media(min-width: 44rem){:host .cds--type-display-01{font-size:2.25rem;font-size:calc(2.25rem + .25*(100vw - 44rem)/10.6666666667)}}@media(min-width: 54.6666666667rem){:host .cds--type-display-01{font-size:2.5rem;line-height:1.17;font-size:calc(2.5rem + 0.6666666667*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-display-01{font-size:3.1666666667rem;line-height:1.13;font-size:3.1666666667rem}}:host .cds--type-display-02{font-size:1.75rem;font-weight:600;line-height:1.19;letter-spacing:0;font-size:calc(1.75rem + 0*(100vw - 13.3333333333rem)/14.6666666667)}@media(min-width: 28rem){:host .cds--type-display-02{font-size:1.75rem;font-size:calc(1.75rem + .5*(100vw - 28rem)/16)}}@media(min-width: 44rem){:host .cds--type-display-02{font-size:2.25rem;font-size:calc(2.25rem + .25*(100vw - 44rem)/10.6666666667)}}@media(min-width: 54.6666666667rem){:host .cds--type-display-02{font-size:2.5rem;line-height:1.16;font-size:calc(2.5rem + 0.6666666667*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-display-02{font-size:3.1666666667rem;line-height:1.13;font-size:3.1666666667rem}}:host .cds--type-display-03{font-size:1.75rem;font-weight:300;line-height:1.19;letter-spacing:0;font-size:calc(1.75rem + 1.0833333333*(100vw - 13.3333333333rem)/14.6666666667)}@media(min-width: 28rem){:host .cds--type-display-03{font-size:2.8333333333rem;line-height:1.15;font-size:calc(2.8333333333rem + 1*(100vw - 28rem)/16)}}@media(min-width: 44rem){:host .cds--type-display-03{font-size:3.8333333333rem;line-height:1.11;letter-spacing:-0.64px;font-size:calc(3.8333333333rem + 1.25*(100vw - 44rem)/10.6666666667)}}@media(min-width: 54.6666666667rem){:host .cds--type-display-03{font-size:5.0833333333rem;line-height:1.07;letter-spacing:-0.64px;font-size:calc(5.0833333333rem + 1.4166666667*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-display-03{font-size:6.5rem;line-height:1.05;letter-spacing:-0.96px;font-size:6.5rem}}:host .cds--type-display-04{font-size:1.75rem;font-weight:600;line-height:1.19;letter-spacing:0;font-size:calc(1.75rem + 1.0833333333*(100vw - 13.3333333333rem)/14.6666666667)}@media(min-width: 28rem){:host .cds--type-display-04{font-size:2.8333333333rem;line-height:1.15;font-size:calc(2.8333333333rem + 1*(100vw - 28rem)/16)}}@media(min-width: 44rem){:host .cds--type-display-04{font-size:3.8333333333rem;line-height:1.11;letter-spacing:-0.64px;font-size:calc(3.8333333333rem + 1.25*(100vw - 44rem)/10.6666666667)}}@media(min-width: 54.6666666667rem){:host .cds--type-display-04{font-size:5.0833333333rem;line-height:1.07;letter-spacing:-0.64px;font-size:calc(5.0833333333rem + 1.4166666667*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-display-04{font-size:6.5rem;line-height:1.05;letter-spacing:-0.96px;font-size:6.5rem}}:host .cds--type-legal-01{font-size:var(--cds-legal-01-font-size, 0.5rem);font-weight:var(--cds-legal-01-font-weight, 400);line-height:var(--cds-legal-01-line-height, 1.33333);letter-spacing:var(--cds-legal-01-letter-spacing, 0.32px)}:host .cds--type-legal-02{font-size:var(--cds-legal-02-font-size, 0.5833333333rem);font-weight:var(--cds-legal-02-font-weight, 400);line-height:var(--cds-legal-02-line-height, 1.28572);letter-spacing:var(--cds-legal-02-letter-spacing, 0.16px)}:host .cds--type-body-compact-01{font-size:var(--cds-body-compact-01-font-size, 0.5833333333rem);font-weight:var(--cds-body-compact-01-font-weight, 400);line-height:var(--cds-body-compact-01-line-height, 1.28572);letter-spacing:var(--cds-body-compact-01-letter-spacing, 0.16px)}:host .cds--type-body-compact-02{font-size:var(--cds-body-compact-02-font-size, 0.6666666667rem);font-weight:var(--cds-body-compact-02-font-weight, 400);line-height:var(--cds-body-compact-02-line-height, 1.375);letter-spacing:var(--cds-body-compact-02-letter-spacing, 0)}:host .cds--type-heading-compact-01{font-size:var(--cds-heading-compact-01-font-size, 0.5833333333rem);font-weight:var(--cds-heading-compact-01-font-weight, 600);line-height:var(--cds-heading-compact-01-line-height, 1.28572);letter-spacing:var(--cds-heading-compact-01-letter-spacing, 0.16px)}:host .cds--type-heading-compact-02{font-size:var(--cds-heading-compact-02-font-size, 0.6666666667rem);font-weight:var(--cds-heading-compact-02-font-weight, 600);line-height:var(--cds-heading-compact-02-line-height, 1.375);letter-spacing:var(--cds-heading-compact-02-letter-spacing, 0)}:host .cds--type-body-01{font-size:var(--cds-body-01-font-size, 0.5833333333rem);font-weight:var(--cds-body-01-font-weight, 400);line-height:var(--cds-body-01-line-height, 1.42857);letter-spacing:var(--cds-body-01-letter-spacing, 0.16px)}:host .cds--type-body-02{font-size:var(--cds-body-02-font-size, 0.6666666667rem);font-weight:var(--cds-body-02-font-weight, 400);line-height:var(--cds-body-02-line-height, 1.5);letter-spacing:var(--cds-body-02-letter-spacing, 0)}:host .cds--type-heading-03{font-size:var(--cds-heading-03-font-size, 0.8333333333rem);font-weight:var(--cds-heading-03-font-weight, 400);line-height:var(--cds-heading-03-line-height, 1.4);letter-spacing:var(--cds-heading-03-letter-spacing, 0)}:host .cds--type-heading-04{font-size:var(--cds-heading-04-font-size, 1.1666666667rem);font-weight:var(--cds-heading-04-font-weight, 400);line-height:var(--cds-heading-04-line-height, 1.28572);letter-spacing:var(--cds-heading-04-letter-spacing, 0)}:host .cds--type-heading-05{font-size:var(--cds-heading-05-font-size, 1.3333333333rem);font-weight:var(--cds-heading-05-font-weight, 400);line-height:var(--cds-heading-05-line-height, 1.25);letter-spacing:var(--cds-heading-05-letter-spacing, 0)}:host .cds--type-heading-06{font-size:var(--cds-heading-06-font-size, 1.3333333333rem);font-weight:var(--cds-heading-06-font-weight, 300);line-height:var(--cds-heading-06-line-height, 1.199);letter-spacing:var(--cds-heading-06-letter-spacing, 0)}:host .cds--type-heading-07{font-size:var(--cds-heading-07-font-size, 1.75rem);font-weight:var(--cds-heading-07-font-weight, 300);line-height:var(--cds-heading-07-line-height, 1.19);letter-spacing:var(--cds-heading-07-letter-spacing, 0)}:host .cds--type-fluid-heading-03{font-size:0.8333333333rem;font-weight:400;line-height:1.4;letter-spacing:0;font-size:calc(0.8333333333rem + 0*(100vw - 13.3333333333rem)/41.3333333333)}@media(min-width: 54.6666666667rem){:host .cds--type-fluid-heading-03{font-size:0.8333333333rem;line-height:1.25;font-size:calc(0.8333333333rem + 0.1666666667*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-fluid-heading-03{font-size:1rem;line-height:1.334;font-size:1rem}}:host .cds--type-fluid-heading-04{font-size:1.1666666667rem;font-weight:400;line-height:1.28572;letter-spacing:0;font-size:calc(1.1666666667rem + 0*(100vw - 13.3333333333rem)/41.3333333333)}@media(min-width: 54.6666666667rem){:host .cds--type-fluid-heading-04{font-size:1.1666666667rem;line-height:1.25;font-size:calc(1.1666666667rem + 0.1666666667*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-fluid-heading-04{font-size:1.3333333333rem;font-size:1.3333333333rem}}:host .cds--type-fluid-heading-05{font-size:1.3333333333rem;font-weight:400;line-height:1.25;letter-spacing:0;font-size:calc(1.3333333333rem + 0.1666666667*(100vw - 13.3333333333rem)/14.6666666667)}@media(min-width: 28rem){:host .cds--type-fluid-heading-05{font-size:1.5rem;font-weight:300;line-height:1.22;font-size:calc(1.5rem + .25*(100vw - 28rem)/16)}}@media(min-width: 44rem){:host .cds--type-fluid-heading-05{font-size:1.75rem;line-height:1.19;font-size:calc(1.75rem + .25*(100vw - 44rem)/10.6666666667)}}@media(min-width: 54.6666666667rem){:host .cds--type-fluid-heading-05{font-size:2rem;line-height:1.17;font-size:calc(2rem + .5*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-fluid-heading-05{font-size:2.5rem;font-size:2.5rem}}:host .cds--type-fluid-heading-06{font-size:1.3333333333rem;font-weight:600;line-height:1.25;letter-spacing:0;font-size:calc(1.3333333333rem + 0.1666666667*(100vw - 13.3333333333rem)/14.6666666667)}@media(min-width: 28rem){:host .cds--type-fluid-heading-06{font-size:1.5rem;line-height:1.22;font-size:calc(1.5rem + .25*(100vw - 28rem)/16)}}@media(min-width: 44rem){:host .cds--type-fluid-heading-06{font-size:1.75rem;line-height:1.19;font-size:calc(1.75rem + .25*(100vw - 44rem)/10.6666666667)}}@media(min-width: 54.6666666667rem){:host .cds--type-fluid-heading-06{font-size:2rem;line-height:1.17;font-size:calc(2rem + .5*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-fluid-heading-06{font-size:2.5rem;font-size:2.5rem}}:host .cds--type-fluid-paragraph-01{font-size:1rem;font-weight:300;line-height:1.334;letter-spacing:0;font-size:calc(1rem + 0.1666666667*(100vw - 13.3333333333rem)/30.6666666667)}@media(min-width: 44rem){:host .cds--type-fluid-paragraph-01{font-size:1.1666666667rem;line-height:1.28572;font-size:calc(1.1666666667rem + 0.1666666667*(100vw - 44rem)/22)}}@media(min-width: 66rem){:host .cds--type-fluid-paragraph-01{font-size:1.3333333333rem;line-height:1.25;font-size:1.3333333333rem}}:host .cds--type-fluid-quotation-01{font-family:"IBM Plex Serif",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",serif;font-size:0.8333333333rem;font-weight:400;line-height:1.3;letter-spacing:0;font-size:calc(0.8333333333rem + 0*(100vw - 13.3333333333rem)/14.6666666667)}@media(min-width: 28rem){:host .cds--type-fluid-quotation-01{font-size:0.8333333333rem;font-size:calc(0.8333333333rem + 0.1666666667*(100vw - 28rem)/16)}}@media(min-width: 44rem){:host .cds--type-fluid-quotation-01{font-size:1rem;line-height:1.334;font-size:calc(1rem + 0.1666666667*(100vw - 44rem)/10.6666666667)}}@media(min-width: 54.6666666667rem){:host .cds--type-fluid-quotation-01{font-size:1.1666666667rem;line-height:1.28572;font-size:calc(1.1666666667rem + 0.1666666667*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-fluid-quotation-01{font-size:1.3333333333rem;line-height:1.25;font-size:1.3333333333rem}}:host .cds--type-fluid-quotation-02{font-family:"IBM Plex Serif",system-ui,-apple-system,BlinkMacSystemFont,".SFNSText-Regular",serif;font-size:1.3333333333rem;font-weight:300;line-height:1.25;letter-spacing:0;font-size:calc(1.3333333333rem + 0.1666666667*(100vw - 13.3333333333rem)/14.6666666667)}@media(min-width: 28rem){:host .cds--type-fluid-quotation-02{font-size:1.5rem;line-height:1.22;font-size:calc(1.5rem + .25*(100vw - 28rem)/16)}}@media(min-width: 44rem){:host .cds--type-fluid-quotation-02{font-size:1.75rem;line-height:1.19;font-size:calc(1.75rem + .25*(100vw - 44rem)/10.6666666667)}}@media(min-width: 54.6666666667rem){:host .cds--type-fluid-quotation-02{font-size:2rem;line-height:1.17;font-size:calc(2rem + .5*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-fluid-quotation-02{font-size:2.5rem;font-size:2.5rem}}:host .cds--type-fluid-display-01{font-size:1.75rem;font-weight:300;line-height:1.19;letter-spacing:0;font-size:calc(1.75rem + 0*(100vw - 13.3333333333rem)/14.6666666667)}@media(min-width: 28rem){:host .cds--type-fluid-display-01{font-size:1.75rem;font-size:calc(1.75rem + .5*(100vw - 28rem)/16)}}@media(min-width: 44rem){:host .cds--type-fluid-display-01{font-size:2.25rem;font-size:calc(2.25rem + .25*(100vw - 44rem)/10.6666666667)}}@media(min-width: 54.6666666667rem){:host .cds--type-fluid-display-01{font-size:2.5rem;line-height:1.17;font-size:calc(2.5rem + 0.6666666667*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-fluid-display-01{font-size:3.1666666667rem;line-height:1.13;font-size:3.1666666667rem}}:host .cds--type-fluid-display-02{font-size:1.75rem;font-weight:600;line-height:1.19;letter-spacing:0;font-size:calc(1.75rem + 0*(100vw - 13.3333333333rem)/14.6666666667)}@media(min-width: 28rem){:host .cds--type-fluid-display-02{font-size:1.75rem;font-size:calc(1.75rem + .5*(100vw - 28rem)/16)}}@media(min-width: 44rem){:host .cds--type-fluid-display-02{font-size:2.25rem;font-size:calc(2.25rem + .25*(100vw - 44rem)/10.6666666667)}}@media(min-width: 54.6666666667rem){:host .cds--type-fluid-display-02{font-size:2.5rem;line-height:1.16;font-size:calc(2.5rem + 0.6666666667*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-fluid-display-02{font-size:3.1666666667rem;line-height:1.13;font-size:3.1666666667rem}}:host .cds--type-fluid-display-03{font-size:1.75rem;font-weight:300;line-height:1.19;letter-spacing:0;font-size:calc(1.75rem + 1.0833333333*(100vw - 13.3333333333rem)/14.6666666667)}@media(min-width: 28rem){:host .cds--type-fluid-display-03{font-size:2.8333333333rem;line-height:1.15;font-size:calc(2.8333333333rem + 1*(100vw - 28rem)/16)}}@media(min-width: 44rem){:host .cds--type-fluid-display-03{font-size:3.8333333333rem;line-height:1.11;letter-spacing:-0.64px;font-size:calc(3.8333333333rem + 1.25*(100vw - 44rem)/10.6666666667)}}@media(min-width: 54.6666666667rem){:host .cds--type-fluid-display-03{font-size:5.0833333333rem;line-height:1.07;letter-spacing:-0.64px;font-size:calc(5.0833333333rem + 1.4166666667*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-fluid-display-03{font-size:6.5rem;line-height:1.05;letter-spacing:-0.96px;font-size:6.5rem}}:host .cds--type-fluid-display-04{font-size:1.75rem;font-weight:600;line-height:1.19;letter-spacing:0;font-size:calc(1.75rem + 1.0833333333*(100vw - 13.3333333333rem)/14.6666666667)}@media(min-width: 28rem){:host .cds--type-fluid-display-04{font-size:2.8333333333rem;line-height:1.15;font-size:calc(2.8333333333rem + 1*(100vw - 28rem)/16)}}@media(min-width: 44rem){:host .cds--type-fluid-display-04{font-size:3.8333333333rem;line-height:1.11;letter-spacing:-0.64px;font-size:calc(3.8333333333rem + 1.25*(100vw - 44rem)/10.6666666667)}}@media(min-width: 54.6666666667rem){:host .cds--type-fluid-display-04{font-size:5.0833333333rem;line-height:1.07;letter-spacing:-0.64px;font-size:calc(5.0833333333rem + 1.4166666667*(100vw - 54.6666666667rem)/11.3333333333)}}@media(min-width: 66rem){:host .cds--type-fluid-display-04{font-size:6.5rem;line-height:1.05;letter-spacing:-0.96px;font-size:6.5rem}}:host .exp-questions-margins{margin-bottom:1rem}:host .exp-text-center{text-align:center;margin-left:.5rem;padding-left:1rem;margin-right:.5rem;padding-right:1rem}:host .business-icon{height:96px;object-fit:contain}:host .padding.left{padding-left:2rem}:host .padding.right{padding-right:2rem}/*# sourceMappingURL=style.css.map */`)];
__decorate([
    query('#ideaAttr', true)
], ExpWizard.prototype, "_formIdeaAttr", void 0);
__decorate([
    query('#proGallery', true)
], ExpWizard.prototype, "_areaProGallery", void 0);
__decorate([
    query('#ideaText', true)
], ExpWizard.prototype, "_areaIdeaText", void 0);
__decorate([
    query('#studies', true)
], ExpWizard.prototype, "_selectedStudies", void 0);
__decorate([
    query('#country', true)
], ExpWizard.prototype, "_selectedCountry", void 0);
__decorate([
    query('#sector', true)
], ExpWizard.prototype, "_selectedSector", void 0);
__decorate([
    query('#ods', true)
], ExpWizard.prototype, "_selectedODS", void 0);
__decorate([
    query('#iconAttribution', true)
], ExpWizard.prototype, "_iconAttribution", void 0);
__decorate([
    property()
], ExpWizard.prototype, "expLang", void 0);
__decorate([
    property({ state: true })
], ExpWizard.prototype, "_firstIdea", void 0);
__decorate([
    property({ state: true })
], ExpWizard.prototype, "_variables", void 0);
__decorate([
    property({ state: true })
], ExpWizard.prototype, "_texts", void 0);
__decorate([
    property({ state: true })
], ExpWizard.prototype, "_studies", void 0);
__decorate([
    property({ state: true })
], ExpWizard.prototype, "_countries", void 0);
__decorate([
    property({ state: true })
], ExpWizard.prototype, "_sectors", void 0);
__decorate([
    property({ state: true })
], ExpWizard.prototype, "_ods", void 0);
ExpWizard = __decorate([
    customElement('exp-wizard')
], ExpWizard);
export { ExpWizard };
//# sourceMappingURL=exp-wizard.js.map
