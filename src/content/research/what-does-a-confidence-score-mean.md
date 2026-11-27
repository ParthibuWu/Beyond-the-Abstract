---
title: "What does a confidence score actually mean?"
description: "A planned methods note on why scores from different prediction tools cannot be compared or averaged without calibration."
publicationStatus: "not-applicable"
category: "Mathematical Foundations"
tags:
  - confidence calibration
  - statistics
  - protein annotation
readingTime: 2
difficulty: "Intermediate"
featured: false
status: "outline"
---

> **Outline only.** This is a planned concept note, not a summary of a particular paper.

## Scores answer different questions

A sequence-search E-value, a structure-confidence measure, and a classifier output arise from different models and have different meanings. A larger number in one tool need not be stronger evidence than a smaller number in another.

## A question for the finished note

What calibration data would be needed before a system could interpret a score as a probability for a specific function claim? The answer depends on the claim, the reference set, and how representative the evaluation data are.

## Planned analysis

Develop a small example with two evidence sources, define the target claim, and compare uncalibrated scores with a calibrated interpretation. Cite the software and evaluation methods used.
