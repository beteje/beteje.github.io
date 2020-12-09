---
layout: page
title: LFP Analysis
description: A toolbox for analysis of local field potentials
img: assets/img/PhaseLocked.jpg
importance: 2
---

This toolbox performs several different analyses on the local field potentials (LFP) generated from multichannel recording electrodes. After performing spike sorting the LFP of a channel can be acquired by low-pass filtering the recorded data. This then allows the relationship between the LFP and neural spiking to be investigated.

---

### Phase Locking
Phase locking describes the relationship between the timing of neural spiking and the phase of the LFP, at a given frequency. If a neuron is phase locked it means it has a preferred phase angle at which it is more likely to fire. If the neuron is not phase locked it fires more uniformly across all of the phase angles.  

By using a continuous wavelet transform we can determine the phase of the LFP at a given frequency as a function of time allowing us to identify the phase of the LFP at each spike time of a specified neuron. From which we can build a distribution of the phase angles for the neurons.
<div class="row align-items-center justify-content-center">
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/PhaseLocked.jpg" alt="" title="Example of a phase locked neuron" caption="Example distribution for a phase locked neuron, red arrow represents the preferred angle." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/PhaseUnLocked.jpg" alt="" title="Example of a phase unlocked neuron" caption="Example distribution for a non phase locked neuron with no preferred angle." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
</div>

By calculating the circular mean of the distribution of the phase angles and testing for the deviation from uniformity using a Rayleigh test we can determine if the neuron is phase locked or not. This can be repeated for different frequencies to determine which frequency or frequency band has a stronger relationship with the neuron spike timing.

There is also an option in the toolbox to calculate the phase locking with a time offset between the neuron spike action potential and the LFP to allow analysis of whether the LFP leads or lags the action potential.

The effects of either increased {% cite Cao2016 %} or disrupted {% cite Mu2015 %} phase locking our results have shown have an impact on learning and memory.

<div class="row justify-content-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/PhaseLocking.jpg" alt="" title="Significance of phase locking" caption="Examples of significance of phase locking across frequency for two different neurons." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
</div>

---

### Spike-Field Coherence
Similarly to phase locking the spike-field coherence (SFC) is a relationship between the neural spiking action potentials and the phase of the local field potential. SFC measures the phase synchronization between the action potentials and field potential oscillations.

To compute the SFC for each spike a segment of the LFP data centered on the spike is extracted. These sections are then averaged to calculate the spike-triggered average (STA). The frequency spectrum of the STA (fSTA) can then be calculated. In the toolbox this is achieved using multitaper analysis to give estimates of the PSD. The same method is then used to calculate the frequency spectra of each of the segments of LFP data individually the average of which is the spike triggered power (STP(f)).

Finally the spike field coherence is the fSTA over the STP(f) expressed as a percentage.

Similarly to the phase locking our results have shown changes in SFC specifically in the theta frequency band have impacts on learning and memory {% cite Cao2016 Cao2016a %}.
<div class="row align-items-center">
  <div class="col-sm-7 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/SFC_VNS.jpg" alt="" title="Example of spike field coherence" caption="Examples of spike field coherence pre and post vagal nerve stimulation." zoomable=true  class="img-fluid rounded z-depth-1 p-2" %}
  </div>
  <div class="col-sm-5 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/SFC_bands.jpg" alt="" title="Example of SFC in frequency bands" caption="Example of changes in the spike field coherence in different frequency bands pre and post vagal nerve stimulation." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
</div>

---

### Amplitude Cross-Correlation
The amplitude cross-correlation is a relationship between two different LFPs, often between two different regions of the brain.

To calculate the amplitude cross-correlation both sets of LFP data are filtered into the frequency band of interest. From this the instantaneous amplitude is calculated using the Hilbert transform. The cross-correlation of the instantaneous amplitude is then calculated and the lag at which the maximum correlation occurs determined.

To ensure the significance of the results a bootstrap procedure is used, shifting the data by a random amount and repeating to allow a confidence interval to be determined. If the result from the original cross-correlation is greater than the 95% confidence interval from the bootstrapped values then the result is considered significant.

<div class="row align-items-center">
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/AmplitudeXCorrTheta.png" alt="" title="Example of amplitude cross-correlation" caption="Example of amplitude cross-correlation in the theta frequency band (peak marked with red star)." zoomable=true  class="img-fluid rounded z-depth-1 p-2" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/AmplitudeXCorrGamma.png" alt="" title="Example of amplitude cross-correlation" caption="Example of amplitude cross-correlation in the gamma frequency band." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/AmplitudeXCorrHist.png" alt="" title="Histograms of amplitude cross-correlation" caption="Histograms of peak lag times for several rats (theta band top, gamma band bottom)." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
</div>

---

### Code
The Matlab code for the toolbox can be found here: [LFP_Analysis](https://github.com/beteje/LFP_Analysis){:target="_blank" rel="noopener"}   
The phase locking and spike field coherence code is based on the methods described by [Rutishauser et al.](http://doi.org/10.1038/nature08860){:target="_blank" rel="noopener"}.
=======
The Matlab code for the toolbox can be found here: [LFP_Analysis](https://github.com/beteje/LFP_Analysis){:target="_blank"}   
The phase locking and spike field coherence code is based on the methods described by Rutishauser et al.[^4].

---

### References
<div class="references">
  {% bibliography --cited %}
</div>

[^4]: U. Rutishauser, I. B. Ross, A. N. Mamelak, and E. M. Schuman, Human Memory Strength is Predicted by Theta-Frequency Phase-Locking of Single Neurons, Nature, 2010 vol. 464 no. 7290 pp. 903--907
