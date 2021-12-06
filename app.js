const CONSTANTS = {
  DOM_SELECTORS: {
    RECORDING_GRAPH: ".recording_graph",
    AUDIO_SCRUBBER: ".recording_audio_scrubber",
    PARTICIPANTS_TIMELINE_SCRUBBER: '.participants_timelines',
  },
  DOM_STRINGS: {
    AUDIO_SCRUBBER: "recording_audio_scrubber",
  },
  SEEK_TRANSITION: 'all .3s linear',
  SEEK_TRANSITION_0: 'all 0s linear',
};

const utils = (function utils() {
  function getDomElements() {
    const DOM_ELEMENTS = {};
    for (const selector in CONSTANTS.DOM_SELECTORS) {
      DOM_ELEMENTS[selector] = document.querySelector(
        CONSTANTS.DOM_SELECTORS[selector]
      );
    }
    return DOM_ELEMENTS;
  }

  return { getDomElements };
})();

const model = (function model() {
  let mouseDownOnScrubber = false;

  return { mouseDownOnScrubber };
})();

const view = (function view() {
  let DOMElements = utils.getDomElements();

  function updateScrubbersPosition({ seekPercentage, withAnimation = true }) {
    const transition = withAnimation ? CONSTANTS.SEEK_TRANSITION : CONSTANTS.SEEK_TRANSITION_0
    DOMElements.AUDIO_SCRUBBER.style.transition = transition;
    DOMElements.PARTICIPANTS_TIMELINE_SCRUBBER.style.setProperty('--transition', transition);
    DOMElements.AUDIO_SCRUBBER.style.left = `${seekPercentage}%`;
    DOMElements.PARTICIPANTS_TIMELINE_SCRUBBER.style.setProperty('--dx', `${seekPercentage}%`);
  }

  return { updateScrubbersPosition };
})();

const controller = (function controller(model, view) {
  let DOMElements = utils.getDomElements();
  function init() {
    DOMElements = utils.getDomElements();
    DOMElements.AUDIO_SCRUBBER.addEventListener(
      "mousedown",
      handleMouseDownOnScrubber
    );
    DOMElements.RECORDING_GRAPH.addEventListener(
      "mousemove",
      handleMouseMoveOnWaveForm
    );
    DOMElements.RECORDING_GRAPH.addEventListener(
      "mouseup",
      handleMouseUpOnWaveForm
    );
    DOMElements.RECORDING_GRAPH.addEventListener(
      "mouseleave",
      handleMouseLeaveFromWaveForm
    );
    DOMElements.RECORDING_GRAPH.addEventListener('click', handleSeek)
  }

  function getSeekPointAndPercentage(event) {
    const { x: startingXCoordinateOfWaveForm, width: waveFormWidth } =
      DOMElements.RECORDING_GRAPH.getClientRects()[0];
    const xCoordinateOfMouseClick = event.clientX;
    let seekPoint = xCoordinateOfMouseClick - startingXCoordinateOfWaveForm;
    if (seekPoint >= waveFormWidth) seekPoint = waveFormWidth;
    if (seekPoint <= 0) seekPoint = 0;
    const seekPercentage = (seekPoint / waveFormWidth) * 100;
    const seekPosition = { seekPoint, seekPercentage };
    model.seekPercentage = seekPosition.seekPercentage;
    model.seekPoint = seekPosition.seekPoint;
    return seekPosition;
  }

  function handleMouseMoveOnWaveForm(event) {
    if (!model.mouseDownOnScrubber) return;
    const { seekPoint, seekPercentage } = getSeekPointAndPercentage(event);
    requestAnimationFrame(() => {
      view.updateScrubbersPosition({ seekPercentage, withAnimation: false });
    })
  }

  function handleMouseUpOnWaveForm(event) {
    model.mouseDownOnScrubber = false;
  }

  function handleMouseLeaveFromWaveForm(event) {
    model.mouseDownOnScrubber = false;
  }

  function handleMouseDownOnScrubber() {
    model.mouseDownOnScrubber = true;
  }

  function handleSeek(event) {
    if (event.target.classList.contains(CONSTANTS.DOM_STRINGS.AUDIO_SCRUBBER)) return
    model.mouseDownOnScrubber = false
    const { seekPoint, seekPercentage } = getSeekPointAndPercentage(event)
    view.updateScrubbersPosition({ seekPercentage, withAnimation: true})
  }

  return { init };
})(model, view);

controller.init();
