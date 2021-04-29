import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("loading-indicator")
export class Loader extends LitElement {
  @property()
  loading = false;

  render() :TemplateResult {
    return html` ${this.loading ? html`<p>Loading ...</p>` : null} `;
  }
}
