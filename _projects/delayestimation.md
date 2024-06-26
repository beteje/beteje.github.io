---
layout: page
title: Delay Estimation
description: Local all-pass filter framework
img: /assets/img/sEMG_Signals_L.png
importance: 2
---

Estimation of delays between two or more spatially separated sensors is necessary in many applications especially those involving speed or time of flight measurements.

<div class="row align-items-center">
  <div class="col-sm-4 mt-3 mt-md-0">We can equate constant delay between two signals as filtering with an all-pass filter. At the same time any all-pass filter has a rational structure. Therefore, estimating a delay becomes an issue of estimating the linearised all-pass filter.</div>
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/Allpass_Filtering.png" alt="" title="All-pass Filtering" caption="All-pass filtering relationship." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
</div>

To allow for time-varying delays we assume the delay is constant within a local region. At the central sample estimate a local all-pass filter and extract the delay. Sliding the window by one sample allows a per sample delay to be estimated using the local all-pass (LAP) filter framework.

<div class="row align-items-center">
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/Local_Allpass_Filter.png" alt="" title="Local All-pass Filter" caption="Local all-pass filtering." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/CLAP_framework.png" alt="" title="Common Local All-pass Filter" caption="Common local all-pass filter framework." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
</div>

For an ensemble of signals with the same delay between each consecutive pair of signals we can estimate a common LAP (CLAP) filter. To allow estimation of both small and large and slowly and quickly varying delays the multiscale CLAP uses an iterative framework starting with large filters estimating the delay, aligning the signals and then repeating with a smaller filter {% cite Gilliam2018a %}.

<div class="row justify-content-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/Multiscale_CLAP.png" alt="" title="Multiscale CLAP framework" caption="Multiscale CLAP framework." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
</div>

The multiscale CLAP has been shown to successfully track time-varying delays better than alternative methods based on the coherence of the signals.

<div class="row align-items-center">
  <div class="col-sm-8 mb-0 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/6signals_10dB.png" alt="" title="6 Signals No Noise" caption="6 signals SNR=10dB." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
  <div class="col-sm-4 mb-0 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/ErrorvsNoSignals.png" alt="" title="Estimation Error for Different Numbers of Signals" caption="Average error for different numbers of signals and an SNR of 10dB." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
</div>
<div class="caption mt-0">
    Estimation error for a sinusoidal delay.
</div>

---

### Code
Delay estimation code can be found here: [LAP_DelayEstimation](https://github.com/beteje/LAP_DelayEstimation){:target="_blank" rel="noopener"}      
This code contains the several implementations of the LAP framework and a signal generation function which has a number of different delay functions.

---

### References
<div class="references">
  {% bibliography --cited %}
</div>
