const content = document.getElementById('content')

const videoInfoElm = document.createElement('div')
videoInfoElm.className = 'videoInfo'
const newButton = document.createElement('button')
newButton.innerHTML = 'Picture in Picture で開く'

async function main() {
  const [tab] = await chrome.tabs.query({ currentWindow: false })
  const [scriptResult] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getVideoInfo,
  })
  videoInfoElm.innerHTML = scriptResult.result
  content.appendChild(videoInfoElm)
  content.appendChild(newButton)
  newButton.addEventListener('click', () => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: requestPictureInPicture,
    })
  })
}

function getVideoInfo() {
  const backInfoText1 = document.querySelector(
    '#backInfo > .backInfoIn > .backInfoTxt1'
  ).innerText
  const backInfoText2 = document.querySelector(
    '#backInfo > .backInfoIn > .backInfoTxt2'
  ).innerText
  const backInfoText3 = document.querySelector(
    '#backInfo > .backInfoIn > .backInfoTxt3'
  ).innerText
  return `${backInfoText1} ${backInfoText2} ${backInfoText3}`
}

function requestPictureInPicture() {
  const video = document.querySelector('video')
  video.requestPictureInPicture()
}

main()
