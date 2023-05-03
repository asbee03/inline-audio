import { LitElement, html, css } from 'lit';
import { SimpleColors } from '@lrnwebcomponents/simple-colors';

import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icon-button.js";

class InlineAudio extends SimpleColors {
  static get properties(){
    return{
      ...super.properties,
      AudioFile: { attribute: "audio-file", type: String, reflect: true},
      PlayButton: { type: String},
      Play: { type: Boolean, reflect: true}
    }
  }

  static styles = css`
    :host {
      min-height: 100vh;
      display: inline;
      vertical-align:middle;
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      background-color: var(--inline-audio-background-color);
    }
    .container {
      display: inline-flex;
      align-items: center;
      padding: 4px 4px 4px 0px;
      background: var(--simple-colors-default-theme-grey-4);
      border-radius: 4px;
      min-width: 64px;
      cursor: pointer;
      font-size: 18px;
    }
    .icon-spacing{
      padding-right: 8px;
    }
  `;

  constructor() {
    super();
    this.AudioFile = '../assets/drake-feels.mp3';
    this.PlayButton = "av:play-arrow";
    this.Play = false;
  }

  handleProgressBar(){
    if(this.shadowRoot.querySelector(".player").ended){
      this.Play = false;
      this.PlayButton = "av:play-arrow";
      console.log(this.Play);
    }
    var audioDuration = this.shadowRoot.querySelector(".player").duration;
    var audioTime = this.shadowRoot.querySelector(".player").currentTime;
    var Percentage = (audioTime / audioDuration)*100;
    this.shadowRoot.querySelector(".container").style.background = `linear-gradient(90deg, var(--simple-colors-default-theme-blue-4)  0% ${Percentage}%, var(--simple-colors-default-theme-grey-4) ${Percentage}% 100%)`;
  }

  handleClickEvent(){
    if(this.shadowRoot.querySelector('audio').paused){
      this.shadowRoot.querySelector('.player').play();
      this.Play = true;
      this.PlayButton = "av:pause";
      console.log(this.Play);
    }
    else{
      this.shadowRoot.querySelector('.player').pause();
      this.Play = false;
      this.PlayButton = "av:play-arrow";
      console.log(this.Play);
    }
  }

  handleKeyDownEvent(event){
    if(event.code === 'Enter' || event.code === 'Space'){
      this.handleClickEvent();
      event.preventDefault();
    }
  }

  render() {
    return html`
      <div class="container" @click="${this.handleClickEvent}" @keydown="${this.handleKeyDownEvent}" tabindex="0"> 
        <simple-icon class="icon-spacing" icon="${this.PlayButton}"></simple-icon>
        <slot></slot>
        <audio class="player" src="${this.AudioFile}" type="audio/mpeg" @timeupdate="${this.handleProgressBar}"></audio>
      <div>
    `;
  }
}

customElements.define('inline-audio', InlineAudio);
