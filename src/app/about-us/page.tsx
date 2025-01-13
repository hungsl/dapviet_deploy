import React from "react";
import Gallery from "./gallery/gallery";
import { About } from "./about/about";
import { Commitments } from "./commitments/commitment";
import { VietnamDress } from "./history-story/vietman-dress";
import { QuestionAndAnswer } from "./Q&A/Q&A";

export default function AboutUs() {
  return (
    <>
      <Gallery />
      <About />
      <Commitments />
      <VietnamDress />
      <QuestionAndAnswer />
    </>
  );
}
