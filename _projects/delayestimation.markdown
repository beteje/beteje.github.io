---
layout: page
title: Delay Estimation
description: Local all-pass filter framework
img: /assets/img/sEMG_Signals_L.png
---

Estimation of delays between two or more spatially separated sensors is necessary in many applications especially those involving speed or time of flight measurements.

We can equate constant delay between two signals as filtering with an all-pass filter. At the same time any all-pass filter has a rational structure. Therefore, estimating a delay becomes an issue of estimating the linearised all-pass filter.
<div class="img_row">
    <img class="col three left" src="{{ site.baseurl }}/assets/img/Allpass_Filtering.png" alt="" title="All-pass Filtering"/>
</div>
<div class="col three caption">
    All-pass filtering relationship
</div>
To allow for time-varying delays we assume the delay is constant within a local region. At the central sample estimate a local all-pass filter and extract the delay. Sliding the window by one sample allows a per sample delay to be estimated using the local all-pass (LAP) filter framework.
<div class="img_row">
    <img class="col half left" src="{{ site.baseurl }}/assets/img/Local_Allpass_Filter.png" alt="" title="Local All-pass Filter"/>
    <img class="col half left" src="{{ site.baseurl }}/assets/img/CLAP_framework.png" alt="" title="Common Local All-pass Filter"/>
</div>
<div class="col three caption">
    Common local all-pass filter framework.
</div>
For an ensemble of signals with the same delay between each consecutive pair of signals we can estimate a common LAP (CLAP) filter. To allow estimation of both small and large and slowly and quickly varying delays the multiscale CLAP uses an iterative framework starting with large filters estimating the delay, aligning the signals and then repeating with a smaller filter[^1].
<div class="img_row">
    <img class="col three left" src="{{ site.baseurl }}/assets/img/Multiscale_CLAP.png" alt="" title="Multiscale CLAP framework"/>
</div>
<div class="col three caption">
    Multiscale CLAP framework.
</div>
The multiscale CLAP has been shown to successfully track time-varying delays better than alternative methods based on the coherence of the signals.
<div class="img_row">
    <img class="col two left" src="{{ site.baseurl }}/assets/img/6signals_10dB.png" alt="" title="6 Signals No Noise"/>
    <img class="col one left" src="{{ site.baseurl }}/assets/img/ErrorvsNoSignals.png" alt="" title="Estimation Error for Different Numbers of Signals"/>
</div>
<div class="col three caption">
    Estimation error for a sinusoidal delay. Left: 6 signals SNR=10dB. Right: Average error for different numbers of signals and an SNR of 10dB.
</div>

---

### Code
Delay estimation code can be found here: [LAP_DelayEstimation](https://github.com/beteje/LAP_DelayEstimation){:target="_blank"}      
This code contains the several implementations of the LAP framework and a signal generation function which has a number of different delay functions.

---

### References
[^1]: C. Gilliam A. Bingham, T. Blu, and B. Jelfs, Time-Varying Delay Estimation Using Common Local All-Pass Filters with Application to Surface Electromyography, Proc. IEEE International Conference on Acoustics, Speech and Signal Processing, 2018 pp. 841–845 [\[doi\]](http://doi.org/10.1109/icassp.2018.8461390){:target="_blank"} [\[pdf\]]({{ site.baseurl }}/assets/pdf/2018_ICASSP.pdf){:target="_blank"}
