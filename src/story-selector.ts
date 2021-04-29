import { html, css, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("story-selector")
export class StorySelector extends LitElement {
  static styles = css`
    p {
      display: none;
    }
    p.loading {
      display: block;
    }
  `;

  @property()
  storyType = 0;

  render(): TemplateResult {
    return html`
      <div @change=${(event: { target: HTMLElement }) => this.onChange(event)}>
        <label
          >top
          <input
            type="radio"
            data-value=${0}
            name="story"
            .checked="${this.storyType === 0}"
        /></label>
        <label
          >new
          <input
            type="radio"
            data-value=${1}
            name="story"
            .checked="${this.storyType === 1}"
        /></label>
        <label
          >best
          <input
            type="radio"
            data-value=${2}
            name="story"
            .checked="${this.storyType === 2}"
        /></label>
      </div>
    `;
  }

  onChange(event: { target: HTMLElement }): void {
    this.storyType = parseInt(event.target.dataset.value ?? "", 10);
    this.dispatchEvent(new CustomEvent("change", { detail: this.storyType }));
  }
}
