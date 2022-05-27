---
layout: page
title: Collaborative Adaptive Filters
description: Convex combinations of adaptive filters
img: assets/img/HybridFilter.png
importance: 3
---

<div class="row align-items-center">
  <div class="col-sm-5 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/Nature.png" alt="" title="Nature of signals" caption="The majority of real world signals are represented by the areas marked '?'" class="img-fluid rounded z-depth-1 p-2" %}
  </div>
  <div class="col-sm-7 mt-3 mt-md-0">Signal modality characterisation allows us to understand more about the nature of the signals we are investigating. While some signal characteristics are well defined many signals do not fall neatly into these categories.</div>
</div>

By using adaptive filters in a prediction configuration we can compare the output of filters designed for different inputs. This allows us to determine which algorithm has the best prediction of the signal.

This solution is simple but the algorithms do not co-operate, to create an online signal modality characterisation solution with synergy between the filters the filters feed into a mixing algorithm which is also adaptive.

<div class="row align-items-center justify-content-center">
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/PredConf.png" alt="" title="Prediction configuration" caption="Adaptive filter prediction configuration." class="img-fluid rounded z-depth-1 p-2" %}
  </div>
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/Convex.png" alt="" title="Convex combination" caption="Convex combination." class="img-fluid rounded z-depth-1 p-2" %}
  </div>
</div>
Using a convex combination of the filters guarantees the existence and uniqueness of a solution. The convex mixing parameter is adapted using a gradient descent update:

$$ \begin{align*}
\lambda(k+1) =& \lambda(k) - \mu_\lambda\nabla_\lambda E(k)_{|\lambda=\lambda(k)}\\
=& \lambda(k) - \frac{\mu_\lambda}{2}\frac{\partial e^2(k)}{\partial\lambda(k)}\\
=& \lambda(k) + \mu_\lambda e(k)\big(y_1(k) - y_2(k)\big)
\end{align*}$$

* This solution can provide improved performance over the individual constituent filters;
* The mixing algorithm can give an indication of which filter is currently responding to the input signal most effectively;
* By appropriate selection of the algorithms the mixing algorithm can adapt according to fundamental properties of the input signal.

<div class="row align-items-center justify-content-center">
  <div class="col-sm-5 mb-3 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/HybridFilter.png" alt="" title="Generic hybrid filter" caption="General hybrid filter structure." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/PerfLinearHybrid.png" alt="" title="Performance of linear hybrid filter" caption="Example of the performance of a hybrid filter combining the LMS and GNGD algorithms." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
</div>

By tracking the mixing parameter rather than the performance of the filter we can see which of the subfilters is being favoured by the hybrid filter. We can also combine several hybrid filters to gain a more complete picture of the nature of the signal under investigation.

<div class="row align-items-center">
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/CompLinNonlin.png" alt="" title="Comparison of linear and nonlinear signals" caption="Comparison of mixing parameter behaviour for linear and nonlinear signals." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/AlternatingSparseNonlin.png" alt="" title="Alternating signals" caption="Signal alternating from linear to nonlinear then linear to sparse, blue line - sparse hybrid filter, red line - nonlinear hybrid filter." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/LinNonlinSparse.png" alt="" title="2D mixing parameters" caption="2D representation of both filters, linear sections represented in green, nonlinear in red and sparse in blue." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
</div>

---

### Example Applications

#### Speech

* Unvoiced Sounds
  * Most consonants are unvoiced
  * Result in a noise like waveform
  * Linear autoregressive models are adequate for unvoiced sounds
* Voiced Sound
  * A voiced sound is one where the vocal folds are vibrating
  * Periodic in nature with periodic excitation source
  * All vowels and certain consonants are voiced speech
  * Voiced sounds require a nonlinear model
* Nasals
  * Nasals are sounds like \n\or \m\
  * For nasals or certain vowels a chaotic model is appropriate

Comparing results for hybrid filters for nonlinear and sparse shows a high degree of correlation.

\\s\\ sounds are more linear in nature and voiced sounds are indicated by the regions where \\(\lambda\\)exhibits a spiky behaviour {% cite Vayanos2007 %}.

<div class="row justify-content-center">
  <div class="col-sm-6 mb-3 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/Speech.png" alt="" title="Example speech signal" caption="Example speech signal. Middle: Mixing parameter for nonlinear hybrid filter. Bottom: Mixing parameter for sparse hybrid filter." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
</div>

#### EEG - Epilepsy
Epileptic signals fundamentally change the nature of brain activity. Using hybrid filters for both nonlinearity and sparsity we can build a feature map of the epileptic signal {% cite Jelfs2010 Jelfs2008 %}.

<div class="row justify-content-center">
  <div class="col-sm-8 mb-3 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/EEGEpilepsy.png" alt="" title="Example epilepsy signals" caption="Top: Two example EEG signals showing the onset of epileptic seizures. Middle: Mixing parameters for nonlinear and sparse hybrid filters. Bottom: Feature maps for the combination of the two hybrid filters." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
</div>

#### EEG - Consciousness States
Identification of brain consciousness states is a important area of EEG analysis. There are obvious legal implications to declaring a patient brain dead. Normally this assessment requires several invasive medical procedures.

A trail test has been performed on EEG data for 34 patients, 17 in a coma and 17 considered to be brain dead. The recordings were taken in the intensive care unit of a hospital leading to high levels of noise generated by other monitoring machines.

Nonlinearity showed clear differences but sparsity was less obvious, combining the two to produce a feature map gave a clear difference {% cite Li2012 %}.
<div class="row align-items-center">
  <div class="col-sm-4 mb-3 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/EEGNonlinear.png" alt="" title="EEG nonlinear hybrid filter" caption="Average performance of the nonlinear hybrid filter for the coma and quasi-brain dead patients." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
  <div class="col-sm-4 mb-3 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/EEGSparse.png" alt="" title="EEG sparse hybrid filter" caption="Average performance of the sparse hybrid filter for the same patients." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
  <div class="col-sm-4 mb-3 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/EEGSparseNonlin.png" alt="" title="EEG sparse nonlinear feature map" caption="Feature maps for the combination of the two hybrid filters." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
</div>

#### Wind
Wind vectors \\(v(k)\\) can be represented in the complex domain as

$$ v(k) = |v(k)|e^{j\theta(k)} = v_E(k) + jv_N(k)$$

To compare the nature of the complex signals split- & fully-complex subfilters were used to predict the wind data.

Looking at the wind data from an urban area over the course of 24 hours, the wind can be considered more fully-complex in nature. The first & last samples are more unstable in nature, these areas indicate from 2pm until 6pm and from 8am until 2pm. During these periods the wind would fluctuate more than during the calm period late at night & early in the morning {% cite Jelfs2010 Jelfs2012a %}
<div class="row align-items-center justify-content-center">
  <div class="col-sm-4 mb-3 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/WindPolar.png" alt="" title="Polar representation of wind" caption="Polar wind Profile." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
  <div class="col-sm-7 mb-3 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/Wind.png" alt="" title="Complex wind representation" caption="Top: Real and imaginary parts of a wind vector. Bottom: mixing parameter for split- and fully-complex hybrid filter." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
</div>

#### Radar
Radar can be represented in the complex domain and has been shown to be fully complex when the target is in the beam.

Alternating high (turbulent) sea state and low (calm) sea state we can see that the high sea state was predominantly fully-complex and the low sea state split complex {% cite Jelfs2008 %}.
<div class="row justify-content-center">
  <div class="col-sm-6 mt-3 mt-md-0">
    {% include figure.html path="/assets/img/Radar.png" alt="" title="Example radar signals" caption="Mixing parameter for split vs fully complex hybrid filter with radar signal alternating between turbulent and calm sea states." zoomable=true class="img-fluid rounded z-depth-1 p-2" %}
  </div>
</div>

---

### Code
Hybrid filter code can be found here: [hybrid-filters](https://github.com/beteje/hybrid-filters){:target="_blank" rel="noopener"}      
This code contains several example filters and benchmark signals and can be customised to include any adaptive filter of your choosing.

---

### References
<div class="references">
  {% bibliography --cited %}
</div>
