// import { LitElement, html, css } from 'lit';
// import "@lrnwebcomponents/simple-icon/simple-icon.js";
// import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";

// class InlineAudio extends LitElement {
//   static properties = {
//     AudioFile: { attribute: "audio-file", type: String, reflect: true},
//     PlayButton: { type: String},
//     Play: { type: Boolean, reflect: true}
//   }

//   static styles = css`
//     :host {
//       min-height: 100vh;
//       display: inline;
//       vertical-align:middle;
//       color: #1a2b42;
//       max-width: 960px;
//       margin: 0 auto;
//       background-color: var(--inline-audio-background-color);
//     }
//     .container {
//       display: inline-flex;
//       align-items: center;
//       padding: 4px 4px 4px 0px;
//       background: grey;
//       border-radius: 4px;
//       min-width: 64px;
//       cursor: pointer;
//       font-size: 18px;
//     }
//     .icon-spacing{
//       padding-right: 8px;
//     }
//   `;

//   constructor() {
//     super();
//     this.AudioFile = '../assets/drake-feels.mp3';
//     this.PlayButton = "av:play-arrow";
//     this.Play = false;
//   }

//   handleProgressBar(){
//     if(this.shadowRoot.querySelector(".player").ended){
//       this.Play = false;
//       this.PlayButton = "av:play-arrow";
//       console.log(this.Play);
//     }
//     var audioDuration = this.shadowRoot.querySelector(".player").duration;
//     var audioTime = this.shadowRoot.querySelector(".player").currentTime;
//     var Percentage = (audioTime / audioDuration)*100;
//     this.shadowRoot.querySelector(".container").style.background = `linear-gradient(90deg, blue 0% ${Percentage}%, grey ${Percentage}% 100%)`;
//   }

//   handleClickEvent(){
//     if(this.shadowRoot.querySelector('audio').paused){
//       this.shadowRoot.querySelector('.player').play();
//       this.Play = true;
//       this.PlayButton = "av:pause";
//       console.log(this.Play);
//     }
//     else{
//       this.shadowRoot.querySelector('.player').pause();
//       this.Play = false;
//       this.PlayButton = "av:play-arrow";
//       console.log(this.Play);
//     }
//   }

//   handleKeyDownEvent(event){
//     if(event.code === 'Enter' || event.code === 'Space'){
//       this.handleClickEvent();
//       event.preventDefault();
//     }
//   }

//   render() {
//     return html`
//       <div class="container" @click="${this.handleClickEvent}" @keydown="${this.handleKeyDownEvent}" tabindex="0"> 
//         <simple-icon class="icon-spacing" icon="${this.PlayButton}"></simple-icon>
//         <span @click="${this.handleClickEvent}"><slot></slot></span>
//         <audio class="player" src="${this.AudioFile}" type="audio/mpeg" @timeupdate="${this.handleProgressBar}"></audio>
//       <div>
//     `;
//   }
// }

// customElements.define('inline-audio', InlineAudio);


import { LitElement, html, css } from 'lit';
import { SimpleColors } from '@lrnwebcomponents/simple-colors';
import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icon-button.js";
import "@lrnwebcomponents/hax-iconset/lib/simple-hax-iconset.js";
import "@lrnwebcomponents/simple-colors/simple-colors.js";

class InlineAudio extends SimpleColors {
  static get properties(){
    return{
      ...super.properties,
      source: { type: String, reflect: true},
      icon: { type: String},
      aria: { type: String},
      title: { type: String},
      playing: { type: Boolean, reflect: true},
      canPlay: { type: Boolean}
    }
  }

  static get styles(){ 
    return [...super.styles, css`
    :host {
      --inline-audio-padding: 4px 4px 4px 4px;
      --inline-audio-margin: 8px 2px 8px;
      --inline-audio-border: 0;
      --inline-audio-icon-padding: 0px 4px 0px 0px;
      vertical-align: middle;
    }
    .container {
      display: inline-flex;
      align-items: center;
      min-width: 40px;
      border-radius: 4px;
      cursor: pointer;
      padding: var(--inline-audio-padding);
      background: var(--simple-colors-default-theme-grey-4);
      border: var(--inline-audio-border);
      margin: var(--inline-audio-margin);
    }
    .container:focus-within{
      outline: 2px solid var(--simple-colors-default-theme-accent-4)
    }
    .icon{
      --simple-icon-color: black;
      --simple-icon-button-focus-color: black;
      --simple-icon-button-focus-opacity: 70%;
      --simple-icon-width: 24px;
      --simple-icon-height: 24px;
      padding: var(--inline-audio-icon-padding);
    }
    simple-icon-button::part(button){
      outline: none;
    }
  `];
  }

  constructor() {
    super();
    this.source = '';
    this.icon = "av:play-arrow";
    this.aria = "Select to play a related audio clip";
    this.title = "Play";
    this.playing = false;
    this.canPlay = false;
  }

  handleProgress(){
    const audio = this.shadowRoot.querySelector(".player");
    const container = this.shadowRoot.querySelector(".container");

    if(audio.ended){
      this.audioController(false);
      container.style.background = `linear-gradient(90deg, var(--simple-colors-default-theme-accent-4) 0% 100%, var(--simple-colors-default-theme-grey-4) 100% 100%)`;
    }
    if(!audio.paused){
      var audioDuration = audio.duration;
      var audioCurrentTime = audio.currentTime;
      var progressPercentage = (audioCurrentTime / audioDuration)*100;
      container.style.background = `linear-gradient(90deg, var(--simple-colors-default-theme-accent-4) 0% ${progressPercentage}%, var(--simple-colors-default-theme-grey-4) ${progressPercentage}% 100%)`;
    }
  }

  audioController(playState){
    const audio = this.shadowRoot.querySelector('.player');
    if(playState){
      audio.play();
      this.playing = true;
      this.icon = "av:pause";
      this.aria = "Select to pause a related audio clip";
      this.title = "Pause";
      console.log(this.playing);
    }
    else{
      audio.pause();
      this.playing = false;
      this.icon = "av:play-arrow";
      this.aria = "Select to play a related audio clip";
      this.title = "Play"
      console.log(this.playing);
    }
  }

  handleClickEvent(){
    const audio = this.shadowRoot.querySelector('.player');
    const selection = this.shadowRoot.getSelection();

    if(!selection.toString()){
      if(!audio.hasAttribute("src")){
        this.icon = "hax:loading";
        this.loadAudio(this.source);
      } 
      else if(this.canPlay){
        if(audio.paused){
          this.audioController(true);
        }
        else{
          this.audioController(false);
        }
      }
    }
  }

  updated(changedProperties){
    changedProperties.forEach((oldValue, propName)=>{
      if(propName === "playing"){
        this.dispatchEvent(new CustomEvent('opened-changed', {
          composed: true,
          bubbles: true,
          cancelable: false,
          detail:{
            value: this[propName]
          }
        }));
        console.log(`"${propName}" property has changed. oldValue: ${oldValue}`);
      }
    });
  }

  render() {
    return html`
        <div class="container" @click="${this.handleClickEvent}"> 
          <simple-icon-button class="icon" title="${this.title}" aria-label="${this.aria}" icon="${this.icon}"></simple-icon-button>
          <slot></slot>
          <audio class="player" type="audio/mpeg" @canplaythrough="${this.handlePlaythrough}" @timeupdate="${this.handleProgress}"></audio>
        </div>
    `;
  }
}

customElements.define('inline-audio', InlineAudio);
