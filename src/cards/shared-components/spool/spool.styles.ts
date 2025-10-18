import { css } from "lit";

export default css`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }

  .ha-bambulab-spool-container {
    padding: min(15%, 30px) 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 2px solid #5a5a5a;
    border-radius: 3px;
    flex: 1;
  }

  .ha-bambulab-spool-side {
    background: #3d3d3d;
    width: 15%;
    height: 100%;
    max-width: 30px;
  }

  .v-spool-container {
    padding: 15% 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    box-sizing: border-box;
    border: 2px solid #5a5a5a;
    border-radius: 3px;
  }

  .v-string-roll {
    position: relative;
    width: 100%; /* Width of the roll */
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #4160bf;
    flex-grow: 1;
    box-sizing: border-box;
  }

  .v-solid-roll {
    position: relative;
    width: 100%; /* Width of the roll */
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #3d3d3d;
    flex-grow: 1;
    box-sizing: border-box;
  }

  .v-string-layer {
    position: absolute;
    width: 2px; /* Thickness of each vertical string line */
    height: 100%; /* Full height of the roll */
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }

  .v-reflection {
    width: 100%;
    height: 100%;
    animation: lightReflection 3s linear infinite; /* Animation for the moving light reflection */
  }

  @keyframes lightReflection {
    0% {
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 10%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0) 90%
      );
      background-size: 100% 50%;
      background-position: 0 0;
    }
    50% {
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 10%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0) 90%
      );
      background-size: 100% 100%;
      background-position: 0 50%;
    }
    100% {
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 10%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0) 90%
      );
      background-size: 100% 50%;
      background-position: 0 100%;
    }
  }

  .string-roll-container {
    max-height: 100%;
    min-height: 10%;
    height: 100%;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .remaining-percent {
    width: 100%;
    height: 100%;
    z-index: 3;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: small;
  }

  .remaining-percent p {
    background: #0000008c;
    padding: 0.2em;
    border-radius: 0.3em;
    color: white;
  }

  @keyframes wiggle {
    0% {
      transform: skew(0deg, 0deg);
    }
    10% {
      transform: skew(2deg, 2deg);
    }
    20% {
      transform: skew(0deg, 0deg);
    }
    30% {
      transform: skew(-2deg, -2deg);
    }
    40% {
      transform: skew(0deg, 0deg);
    }
    50% {
      transform: skew(2deg, 2deg);
    }
    60% {
      transform: skew(0deg, 0deg);
    }
    70% {
      transform: skew(-2deg, -2deg);
    }
    80% {
      transform: skew(0deg, 0deg);
    }
  }

  .ha-bambulab-spool-card-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .ha-bambulab-spool-card-holder {
    border: 7px solid;
    border-color: #808080;
    background: linear-gradient(#959595, #626262, #959595);
    width: 100%;
    box-sizing: border-box;
    border-radius: 0.6em;
    display: flex;
    position: relative;
    flex: 1;
    min-height: calc(112px - 7px);
  }

  .ha-bambulab-spool-card-holder.active {
    border-color: var(--primary-color);
  }

  .ha-bambulab-spool-info-container {
    display: flex;
    justify-content: center;
  }

  .ha-bambulab-spool-info-wrapper {
    margin-top: 7px;
  }

  .ha-bambulab-spool-info {
    background: #444444;
    padding: 0px 10px;
    border-radius: 0.5em;
    white-space: nowrap;
    color: white;
    font-size: small;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-wrap: auto;
    text-align: center;
    line-height: 1em;
    overflow: ellipsis;
  }

  .ha-bambulab-spool-modal-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 8px;
  }

  .filament-title {
    grid-column: span 2 / span 2;
  }

  .section-title {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #6a6a6a;
  }

  .item-title {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #6a6a6a;
  }

  .item-value {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #000000;
  }

  .div2 {
    grid-row-start: 2;
  }

  .div3 {
    grid-row-start: 2;
  }

  .div5 {
    grid-row-start: 3;
  }

  .div6 {
    grid-column: span 2 / span 2;
    margin-top: 20px;
  }

  .div7 {
    grid-row-start: 5;
  }

  .div8 {
    grid-row-start: 5;
  }

  .div10 {
    grid-row-start: 6;
  }

  .action-buttons {
    grid-column: span 2 / span 2;
    display: flex;
    border-radius: 4px;
    overflow: hidden;
    background: #4caf50;
    margin: 16px 0;
  }

  .action-button {
    flex: 1;
    --mdc-theme-primary: white;
    --mdc-theme-on-primary: white;
    --mdc-button-fill-color: transparent;
    --mdc-button-ink-color: white;
    --mdc-button-disabled-fill-color: rgba(255, 255, 255, 0.12);
    --mdc-button-disabled-ink-color: rgba(255, 255, 255, 0.38);
    --mdc-button-outline-color: white;
    margin: 0;
    border-radius: 0;
  }

  .action-button:first-child {
    border-right: 1px solid rgba(255, 255, 255, 0.2);
  }
`;
