"use client";

import { JSX, useEffect } from "react";
import Image from "next/image";

import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import json from "highlight.js/lib/languages/json";

import JyuttubePoppup from "@/photos/jyuttube_poppup.png";
import JyuttubeExample from "@/photos/jyuttube_example.png";

hljs.configure({ cssSelector: "code" });
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("json", json);

const headerCss = "my-[15px] text-[20px] font-semibold";
const paragraphCss = "my-[25px] text-[16px]";
const codeContainerCss = "w-[100%] hidden md:block";

export default function Page(): JSX.Element {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div className="flex max-w-[1200px] flex-col">
      <h3 className="mb-[40px] text-[30px] font-semibold underline">
        Jyutping tool for comprehensible input Chinese learning
      </h3>
      <p className="mb-[16px] text-[14px]">January 10, 2024</p>
      <p className={paragraphCss}>
        If you at all get involved with language learning, especially the
        circles discussing best practices and methods online, there&apos;s no
        question you will run across the term{" "}
        <a href="https://en.wikipedia.org/wiki/Input_hypothesis">
          comprehensible input
        </a>
        . Oftentimes put forth as the singular solution to swift progress from
        novice to fluency, it suggests that time spent by learners comprehending
        audio input in their target language has an outstanding effect (and
        perhaps is the only mechanism) towards linguistic competence. This draws
        direct contrast with the grammar and memorization-heavy methods commonly
        used in classrooms, and I suspect one of the reasons people support
        comprehensible input so vehemently is not only due to its effectiveness
        but also their unpleasant memories of those alternative approaches that
        are now being viewed at antiquated and unpragmatic.
      </p>
      <h4 className={headerCss}>
        The Problem - Enter the Chinese Logographic Writing System
      </h4>
      <p className={paragraphCss}>
        I&apos;ve been using comprehensible input for some time now while
        learning Cantonese with positive results. Of course it&apos;s
        unsuprising that spending large amount of time with any foreign language
        in any form would <b>not</b> be beneficial, but the discussion in
        language learning contexts is always geared around optimality and what
        pedagogical approach will truly yield the best results.
      </p>
      <p className={paragraphCss}>
        One of the difficulties I&apos;ve run into while taking in input and the
        motivation for this tool and writing this post centers around the use of
        subtitles while listening. Subtitles in the target language can be a
        great aid in giving your brain just an extra cue towards comprehension
        in the split second you are hearing and processing the audio but perhaps
        not immediately recognize a sound fragment or individual word. You get
        the audio and visual input simultaneously and this is oftentimes enough
        to push your brain past the activation barrier for comprehension. This
        sets the stage for the main blocker for this in the context of Chinese
        languages: their character-based writing system.
      </p>
      <p className={paragraphCss}>
        Gaining a larger vocabulary and constantly incorporating new words is a
        crucial part to language learning, however, with Chinese languages
        specifically, it almost inevitably occurs in an asymmetric way. Chinese
        characters are naturally more unfamiliar and difficult to commit to
        memory for native English speakers like myself, however transliteration
        into the Latin alphabet using romanization systems like{" "}
        <a href="https://en.wikipedia.org/wiki/Jyutping">Jyutping</a> (the
        Cantonese equivalent to pinyin for Mandarin) can ease the burden
        significantly. The ideal would be for your vocabulary to be perfectly
        matched between the oral word, the written jyutping, and the character,
        but naturally with jyutping and audio being significantly easier to
        ingest, a disconnect forms between the characters you can recognize and
        your otherwise outstanding vocabulary. I would estimate for myself (a
        particularly behind schedule character learner...), my oral vocabulary
        outstrips by character recognition by factor of 15-to-1. Without
        jyutping, this limitation then renders the use of subtitles in input
        time largely useless, since viewing unknown characters does nothing to
        aid comprehension.
      </p>
      <h4 className={headerCss}>
        Jyuttube - Adding jyutping romanization to Youtube subtitles
      </h4>
      <p className={paragraphCss}>
        I created Jyuttube to address this exact niche problem. It is a Chrome
        extension that, upon recognizing loading of a Youtube video will pull
        any available transcript from the page, build out matching transcripts
        in both jyutping and pinyin (if the Mandarin learners out there wanted
        to use it too), and match them on the respective timestamps.
      </p>
      <p className={paragraphCss}>
        Chrome extensions are an interesting little area with its own
        development ecosystem, although I found the documentation and existing
        resources on it a little bit sparse and with out-of-date materials
        stretching back 15 years past multiple iterations of major revisions in
        the extensions APIs. The key functionality of extension is spread across
        three different contexts, a <b>poppup context</b> that exists isolated
        from the other static files and Javascript being run on the browser,{" "}
        <b>content scripts</b> which are run within the context of webpages and
        allow you to programmatically interact with their content by accessing
        the DOM, injecting other content and scripts, and more, and{" "}
        <b>service workers</b> which act as the central event handlers for the
        extension running in the background.
      </p>
      <p className={paragraphCss}>
        The majority of the action in Jyuttube happens within the content script
        which runs upon accessing any Youtube video page. It first locates the
        main video player within the DOM and inserts the elements that will be
        populated with the new subtitled context:
      </p>
      <pre className={codeContainerCss}>
        <code className="language-typescript">{`
const videoContainers = document.getElementsByClassName("html5-video-player");

if (!videoContainers) {
  throw new Error(
    "Unable to find video player container in the current document"
  );
}
const videoContainer = videoContainers[0];
const video = document.getElementsByTagName("video")[0];

const captionContainer = document.createElement("div");
captionContainer.setAttribute("id", "jyuttube_caption_container");
captionContainer.setAttribute("class", "captionContainer");
videoContainer.appendChild(captionContainer);
        `}</code>
      </pre>
      <p className={paragraphCss}>
        Further, it calls to an external library for loading the video&apos;s
        transcript (if it has one available), and generates the necessary
        translations. An event listener is then added to the main Youtube video
        to respond to updates in the video timestamp by searching the subtitled
        data for the respective content to render in the subtitle elements.
      </p>
      <pre className={codeContainerCss}>
        <code className="language-typescript">{`
const translator = new TranscriptTranslator();
const initializeTranslator = async () => {
  await translator.init(window.location.href);

  return translator.translate();
};

initializeTranslator()
  .then((translation) => {
    const searcher = new CaptionSearcher(translation);

    video.ontimeupdate = () => {
      const timestampTranslation = searcher.search(video.currentTime);

      hanziCaptions.innerHTML = timestampTranslation.hanzi;
      jyutpingCaptions.innerHTML = timestampTranslation.jyutping;
      pinyinCaptions.innerHTML = timestampTranslation.pinyin;
    };
  })
  .catch((err) =>
    console.log(\`Unable to initialize translator with error \${err}\`)
  );
        `}</code>
      </pre>
      <p className={paragraphCss}>
        To add some customizability to the experience, you can control which
        combination of languages subtitles will render on the top of the video
        through the poppup menu for the extension and toggling the respective
        switches (Hanzi, Jyutping, Pinyin). Because this section of the
        extension runs isolated within the poppup context, it is actually a
        small standalone React app bundled together with Vite.
      </p>
      <Image
        src={JyuttubePoppup}
        alt="Raytracing setup"
        className="mx-auto my-[60px] w-[75%]"
      />
      <p className={paragraphCss}>
        An example frame of how the subtitles will be rendered on the screen is
        shown below with the Chinese character text loaded from the original
        transcript and the respective Jyutping transliteration shown below it.
      </p>
      <Image
        src={JyuttubeExample}
        alt="Raytracing setup"
        className="mx-auto my-[60px] w-[75%]"
      />
      <h4 className={headerCss}>My Goofs</h4>
      <p className={paragraphCss}>
        Two things blocked me for too long while in getting everything working
        in the project. One was the communication between the settings handled
        through the customization in the poppup, whether to render hanzi,
        jyutping, and/or pinyin, and how to relay those and any real-time
        updates to the content script context. My immediate thought was to just
        use Chrome local storage in the WebAPIs as a persistent store for user
        settings. It would last across sessions so that users could reopen
        Youtube videos at a later date after setting them and still have their
        desired render settings. Further, I could respond to any changes in the
        local state of the poppup settings by setting the respective value in
        local storage, and, on the other end, the content script be could
        subscribe to any real-time changes to local storage with an event
        listener.
      </p>
      <pre className={codeContainerCss}>
        <code className="language-typescript">{`
// Poppup context
useEffect(() => {
  chrome.storage.local.set({ renderSettings: settings })
}, [settings])

...

// Content script
window.addEventListener("storage", (event) => {
  if (event.key === "renderSettings") {
    handleCaptionVisibility(e.newValue) // Change subtitle visibility to match new settings
  }
});
        `}</code>
      </pre>
      <p className={paragraphCss}>
        Even though the Chrome docs state explicitly that content scripts can
        access storage APIs (although they are restricted from many others) and
        I gave the correct permissions for access in the{" "}
        <code>manifest.json</code>, this approach just did not seem to work. I
        instead used message passing between the poppup and active tab to
        achieve the same result.
      </p>
      <pre className={codeContainerCss}>
        <code className="language-typescript">{`
// Poppup context
const messageContentPage = useCallback(async () => {
    console.log("Attempting to message current tabs about settings change");
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tab.id) {
      chrome.tabs
        .sendMessage(tab.id, settings)
        .then((response) => {
          console.log("New settings messaged to content page successfully");
        })
        .catch((err) => {
          console.log(
            \`Error in messaging new settings to content page with error \${err}\`
          );
        });
    } else {
      console.log("Unable to access tab id for current tab");
    }
  }, [settings]);

  useEffect(() => {
    messageContentPage();
  }, [messageContentPage]);

...

// Content script
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log(
    \`Received message and updating caption visibility with settings \${message}\`
  );
  handleCaptionVisibility(message);
  sendResponse("Settings message successfully received");
});
        `}</code>
      </pre>
      <p className={paragraphCss}>
        The second issue was centered just around the injecting in the basic
        styling for the subtitles container and text from the content script to
        render in the Youtube video correctly and with good visibility. The
        brute force and ugly approach was to just set the DOM elements styles
        one by one after they were spawned
      </p>
      <pre className={codeContainerCss}>
        <code className="language-typescript">{`
// Poppup context
const captionContainer = document.createElement("div");
captionContainer.style.position = "absolute";
captionContainer.style.background-color = "black;
... // more styling
        `}</code>
      </pre>
      <p className={paragraphCss}>
        This is clearly not ideal, leading to a bloated content script filled
        with mixing of pure styling and functionality. There were some
        alternative approaches than this suggesting inserting a link element
        into the DOM referencing the styles loaded in separately from the
        project or some other forms of dynamic imports. It turns out that Chrome
        has already solved this problem for us completely, and you can simply
        reference the necessary stylesheet in the <code>manifest.json</code> for
        its linked content script, and it will automatically be injected by the
        extension runner.
      </p>
      <pre className={codeContainerCss}>
        <code className="language-json">{`
// Manifest json
"content_scripts": [
  {
    "matches": [
        "http://youtube.com/*",
        "https://youtube.com/*",
        "http://*.youtube.com/*",
        "https://*.youtube.com/*"
    ],
    "js": ["content.js"],
    "css": ["content.css"]
  }
],
        `}</code>
      </pre>
      <p className={paragraphCss}>
        Anyone interested in trying out the extension or hacking on it
        themselves can find it up on my github{" "}
        <a href="https://github.com/cfreedman/jyuttube">here</a>. You&apos;ll
        need to be familiar with building the Vite project and loading a Chrome
        extension locally, but it&apos;s not difficult to get setup. I should be
        cleaning up a few things and making it available on the Chrome web store
        for installation as well in the future.
      </p>
    </div>
  );
}
