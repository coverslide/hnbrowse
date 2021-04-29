import { html, css, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

import "./loading-indicator";
import "./story-selector";

const baseUrl = "https://hacker-news.firebaseio.com/v0";

const ITEM_SLICE_LIMIT = 50;
const TOP = 0;
const NEW = 1;
const BEST = 2;

type UrlMap = {
  [key: string]: string;
};

type ItemData = {
  by: string;
  kids: number[];
  time: number;
  title: string;
  type: string;
  url: string;
};

const URLS: UrlMap = {
  [TOP]: "/topstories.json",
  [NEW]: "/newstories.json",
  [BEST]: "/beststories.json",
};

@customElement("main-app")
export class MainApp extends LitElement {
  static styles = css`
    p {
      color: blue;
    }
  `;

  @property()
  loading = false;
  @property()
  data: ItemData[] = [];
  @property()
  storyType = TOP;

  render(): TemplateResult {
    return html`
      <story-selector
        @change=${this.onSelectorChange}
        .storyType="${this.storyType}"
      ></story-selector>
      <button @click=${this.onClick}>Refresh</button>
      <loading-indicator .loading=${this.loading}></loading-indicator>
      <dl>
        ${this.data.map(
          (item: ItemData) => html`
            <dt>${item.title} <sub>by ${item.by}</sub></dt>
            <dd><a target="_blank" href="${item.url}">${item.url}</a></dd>
          `
        )}
      </dl>
    `;
  }

  onClick(): void {
    this.data = [];
    this.loadQuotes();
  }

  onSelectorChange(event: CustomEvent): void {
    this.storyType = event.detail;
    this.data = [];
    this.loadQuotes();
  }

  firstUpdated(): void {
    this.loadQuotes();
  }

  async loadQuotes(): Promise<void> {
    this.loading = true;
    const url = URLS[this.storyType];
    const response = await fetch(`${baseUrl}${url}`);
    const itemIds: number[] = await response.json();
    const itemData: ItemData[] = await this.getItemData(
      itemIds.slice(0, ITEM_SLICE_LIMIT)
    );
    this.loading = false;
    this.data = itemData;
  }

  async getItemData(itemIds: number[]): Promise<ItemData[]> {
    return await Promise.all(itemIds.map((id) => this.getItem(id)));
  }

  async getItem(id: number): Promise<ItemData> {
    const response = await fetch(`${baseUrl}/item/${id}.json`);
    const data: ItemData = await response.json();
    return data;
  }
}
