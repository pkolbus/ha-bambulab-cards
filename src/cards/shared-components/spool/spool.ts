import { customElement, property } from "lit/decorators.js";
import { html, LitElement, nothing } from "lit";
import styles from "./spool.styles";
import { hassContext } from "../../../utils/context";
import { consume } from "@lit/context";
import "../ams-popup/ams-popup";

@customElement("ha-bambulab-spool")
export class Spool extends LitElement {
  @consume({ context: hassContext, subscribe: true })
  private hass;

  @property({ type: Boolean }) public show_type: boolean = false;
  @property({ type: Boolean }) public spool_anim_reflection: boolean = true;
  @property({ type: Boolean }) public spool_anim_wiggle: boolean = true;
  @property({ type: String })  public entity_id!: string;
  @property({ type: Number })  private remainHeight = 95;
  @property({ type: Boolean }) public developer_lan_mode: boolean = true;
  @property() private resizeObserver: ResizeObserver | null = null;
  @property({ type: Boolean }) private emptySpool: boolean = false;

  static styles = styles;

  connectedCallback() {
    super.connectedCallback();

    // Start observing the parent element for size changes
    this.resizeObserver = new ResizeObserver(() => {
      if (this.isConnected) {
        this.calculateHeights();
        this.updateLayers();
      }
    });

    const rootNode = this.getRootNode() as ShadowRoot;
    const parent = this.parentElement || (rootNode instanceof ShadowRoot ? rootNode.host : null);
    if (parent) {
      this.resizeObserver.observe(parent);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  firstUpdated() {
    // initial layers/heights after first render
    this.calculateHeights();
    this.updateLayers();
  }

  updated(changedProps: Map<string, any>) {
    if (changedProps.has("entity_id")) {
      this.calculateHeights();
      this.updateLayers();
    }
  }

  render() {
    const isActive = this.hass.states[this.entity_id]?.attributes.active ||
                     this.hass.states[this.entity_id]?.attributes.in_use
    return html`
      <ams-popup .entity_id=${this.entity_id} .developer_lan_mode=${this.developer_lan_mode}>
        <div class="ha-bambulab-spool-card-container">
          <div
            class="ha-bambulab-spool-card-holder ${isActive ? "active" : ""}
            style=""
          >
            <div class="ha-bambulab-spool-container">
              <div class="ha-bambulab-spool-side"></div>
              <div
                class="string-roll-container"
                style="${this.hass.states[this.entity_id]?.attributes.active &&
                this.spool_anim_wiggle
                  ? "animation: wiggle 3s linear infinite"
                  : ""}"
              >
                <div
                  class="${this.emptySpool ? "v-solid-roll":"v-string-roll"}"
                  id="v-string-roll"
                  style=${this.emptySpool ? 
                    `height: ${this.remainHeight.toFixed(2)}%` :
                    `background: ${this.hass.states[this.entity_id]?.attributes.color}; height: ${this.remainHeight.toFixed(2)}%`}
                >
                  ${this.hass.states[this.entity_id]?.attributes.active &&
                  this.spool_anim_reflection
                    ? html`<div class="v-reflection"></div>`
                    : nothing}
                  ${this.hass.states[this.entity_id]?.attributes?.remain > 0
                    ? html`
                        <div class="remaining-percent">
                          <p>${this.hass.states[this.entity_id]?.attributes?.remain}%</p>
                        </div>
                      `
                    : nothing}
                </div>
              </div>
              <div class="ha-bambulab-spool-side"></div>
            </div>
          </div>
          ${this.show_type
            ? html` <div class="ha-bambulab-spool-info-container">
                <div class="ha-bambulab-spool-info-wrapper">
                  <div class="ha-bambulab-spool-info">
                    ${this.hass.states[this.entity_id]?.attributes.name}
                  </div>
                </div>
              </div>`
            : nothing}
        </div>
      </ams-popup>
    `;
  }

  updateLayers() {
    // Query the #string-roll element inside this component's shadow DOM
    const stringRoll = (this.renderRoot as ShadowRoot).getElementById("v-string-roll");
    if (!stringRoll) return;

    // Clear previous layers
    const previousLayers = this.renderRoot.querySelectorAll(".v-string-layer");
    previousLayers.forEach((layer) => layer.remove());

    if (this.emptySpool) return; // No layers for solid spool

    const stringWidth = 2; // matches .string-layer width in CSS
    const rollWidth = stringRoll.offsetWidth; // container width

    // Calculate how many lines fit
    const numLayers = Math.floor(rollWidth / (stringWidth * 2)); // 2 = line width + gap

    // Add new layers
    for (let i = 0; i < numLayers; i++) {
      const layer = document.createElement("div");
      layer.classList.add("v-string-layer");

      // Calculate left position = (index + 1) * (width*2) - width
      const leftPosition = (i + 1) * (stringWidth * 2) - stringWidth;
      layer.style.left = `${leftPosition}px`;

      stringRoll.appendChild(layer);
    }
  }

  isAllZeros(str) {
    return /^0+$/.test(str);
  }

  calculateHeights() {
    const maxHeightPercentage = 95;
    const minHeightPercentage = 20;

    // If not a Bambu Spool or remaining is less than 0
    this.emptySpool = this.hass.states[this.entity_id]?.attributes.empty;
    if (this.emptySpool) {
      this.remainHeight = 20;
    } else if (this.isAllZeros(this.hass.states[this.entity_id]?.attributes.tag_uid) ||
               this.hass.states[this.entity_id]?.attributes?.remain < 0) {
      this.remainHeight = maxHeightPercentage;
    } else {
      // Get the container's height
      const container = this.renderRoot.querySelector(
        ".string-roll-container"
      ) as HTMLElement | null;
      const containerHeight = container?.offsetHeight || 0;

      // Calculate heights in pixels
      const maxHeightPx = containerHeight * (maxHeightPercentage / 100);
      const minHeightPx = containerHeight * (minHeightPercentage / 100);

      // Calculate remain height based on the remain percentage
      const remainPercentage = Math.min(
        Math.max(this.hass.states[this.entity_id]?.attributes?.remain, 0),
        100
      );
      this.remainHeight = minHeightPx + (maxHeightPx - minHeightPx) * (remainPercentage / 100);

      // Convert back to percentage of container
      this.remainHeight = (this.remainHeight / containerHeight) * 100;
    }

    // Ensure remainHeight is always a number and doesn't exceed maxHeightPercentage
    this.remainHeight = Math.min(
      Number(this.remainHeight) || maxHeightPercentage,
      maxHeightPercentage
    );
    this.requestUpdate();
  }
}
