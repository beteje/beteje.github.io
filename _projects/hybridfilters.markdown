---
layout: page
title: Collaborative Adaptive Filters
description: Convex combinations of adaptive filters
img: /assets/img/HybridFilter.png
---

Signal modality characterisation allows us to understand more about the nature of the signals we are investigating. While some signal characteristics are well defined many signals do not fall neatly into these categories.
<div class="img_row">
    <img class="col three left" src="{{ site.baseurl }}/assets/img/Nature.png" alt="" title="Nature of signals"/>
</div>
<div class="col three caption">
    The majority of real world signals are represented by the areas marked '?'
</div>
By using adaptive filters in a prediction configuration we can compare the output of filters designed for different inputs. This allows us to determine which algorithm has the best prediction of the signal.

This solution is simple but the algorithms do not co-operate, to create an online signal modality characterisation solution with synergy between the filters the filters feed into a mixing algorithm which is also adaptive.
<div class="img_row">
    <img class="col one left" src="{{ site.baseurl }}/assets/img/PredConf.png" alt="" title="Prediction configuration"/>
    <img class="col two left" src="{{ site.baseurl }}/assets/img/Convex.png" alt="" title="Convex combination"/>
</div>
<div class="col three caption">
    Left: Adaptive filter prediction configuration. Right: Convex combination.
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
<div class="img_row">
    <img class="col two left" src="{{ site.baseurl }}/assets/img/HybridFilter.png" alt="" title="Generic hybrid filter"/>
    <img class="col one left" src="{{ site.baseurl }}/assets/img/PerfLinearHybrid.png" alt="" title="Performance of linear hybrid filter"/>
</div>
<div class="col three caption">
    Left: General hybrid filter structure. Right: Example of the performance of a hybrid filter combining the LMS and GNGD algorithms.
</div>
By tracking the mixing parameter rather than the performance of the filter we can see which of the subfilters is being favoured by the hybrid filter. We can also combine several hybrid filters to gain a more complete picture of the nature of the signal under investigation.
<div class="img_row">
    <img class="col one left" src="{{ site.baseurl }}/assets/img/CompLinNonlin.png" alt="" title="Comparison of linear and nonlinear signals"/>
    <img class="col one left" src="{{ site.baseurl }}/assets/img/AlternatingSparseNonlin.png" alt="" title="Alternating signals"/>
    <img class="col one left" src="{{ site.baseurl }}/assets/img/LinNonlinSparse.png" alt="" title="2D mixing parameters"/>
</div>
<div class="col three caption">
    Left: Comparison of mixing parameter behaviour for linear and nonlinear signals. Middle: Signal alternating from linear to nonlinear then linear to sparse, blue line - sparse hybrid filter, red line - nonlinear hybrid filter. Right: 2D representation of both filters, linear sections represented in green, nonlinear in red and sparse in blue.
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

\\s\\ sounds are more linear in nature and voiced sounds are indicated by the regions where \\(\lambda\\)exhibits a spiky behaviour[^1].
<div class="img_row">
    <img class="col three left" src="{{ site.baseurl }}/assets/img/Speech.png" alt="" title="Example speech signal"/>
</div>
<div class="col three caption">
    Top: Example speech signal. Middle: Mixing parameter for nonlinear hybrid filter. Bottom: Mixing parameter for sparse hybrid filter.
</div>

#### EEG - Epilepsy
Epileptic signals fundamentally change the nature of brain activity. Using hybrid filters for both nonlinearity and sparsity we can build a feature map of the epileptic signal[^2] [^3].
<div class="img_row">
    <img class="col three left" src="{{ site.baseurl }}/assets/img/EEGEpilepsy.png" alt="" title="Example epilepsy signals"/>
</div>
<div class="col three caption">
    Top: Two example EEG signals showing the onset of epileptic seizures. Middle: Mixing parameters for nonlinear and sparse hybrid filters. Bottom: Feature maps for the combination of the two hybrid filters.
</div>

#### EEG - Consciousness States
Identification of brain consciousness states is a important area of EEG analysis. There are obvious legal implications to declaring a patient brain dead. Normally this assessment requires several invasive medical procedures.

A trail test has been performed on EEG data for 34 patients, 17 in a coma and 17 considered to be brain dead. The recordings were taken in the intensive care unit of a hospital leading to high levels of noise generated by other monitoring machines.

Nonlinearity showed clear differences but sparsity was less obvious, combining the two to produce a feature map gave a clear difference[^4].
<div class="img_row">
    <img class="col one left" src="{{ site.baseurl }}/assets/img/EEGNonlinear.png" alt="" title="EEG nonlinear hybrid filter"/>
    <img class="col one left" src="{{ site.baseurl }}/assets/img/EEGSparse.png" alt="" title="EEG sparse hybrid filter"/>
    <img class="col one left" src="{{ site.baseurl }}/assets/img/EEGSparseNonlin.png" alt="" title="EEG sparse nonlinear feature map"/>
</div>
<div class="col three caption">
    Left: Average performance of the nonlinear hybrid filter for the coma and quasi-brain dead patients. Middle: Average performance of the sparse hybrid filter for the same patients. Right: Feature maps for the combination of the two hybrid filters.
</div>

#### Wind
Wind vectors \\(v(k)\\) can be represented in the complex domain as

$$ v(k) = |v(k)|e^{j\theta(k)} = v_E(k) + jv_N(k)$$

To compare the nature of the complex signals split- & fully-complex subfilters were used to predict the wind data.

Looking at the wind data from an urban area over the course of 24 hours, the wind can be considered more fully-complex in nature. The first & last samples are more unstable in nature, these areas indicate from 2pm until 6pm and from 8am until 2pm. During these periods the wind would fluctuate more than during the calm period late at night & early in the morning [^2] [^5]
<div class="img_row">
    <img class="col one left" src="{{ site.baseurl }}/assets/img/WindPolar.png" alt="" title="Polar representation of wind"/>
    <img class="col two left" src="{{ site.baseurl }}/assets/img/Wind.png" alt="" title="Complex wind representation"/>
</div>
<div class="col three caption">
    Top: Real and imaginary parts of a wind vector. Bottom: mixing parameter for split- and fully-complex hybrid filter.
</div>

#### Radar
Radar can be represented in the complex domain and has been shown to be fully complex when the target is in the beam.

Alternating high (turbulent) sea state and low (calm) sea state we can see that the high sea state was predominantly fully-complex and the low sea state split complex[^3].
<div class="img_row">
    <img class="col three left" src="{{ site.baseurl }}/assets/img/Radar.png" alt="" title="Example radar signals"/>
</div>
<div class="col three caption">
    Mixing parameter for split vs fully complex hybrid filter with radar signal alternating between turbulent and calm sea states.
</div>

---

### Code
Hybrid filter code can be found here: [hybrid-filters](https://github.com/beteje/hybrid-filters){:target="_blank"}      
This code contains several example filters and benchmark signals and can be customised to include any adaptive filter of your choosing.

---

### References

[^1]: P. Vayanos, M. Chen, B. Jelfs, and D. P. Mandic, Exploiting Nonlinearity in Adaptive Signal Processing, Advances in Nonlinear Speech Processing, 2007 pp. 57–77 [\[doi\]](http://doi.org/10.1007/978-3-540-77347-4_3){:target="_blank"} [\[pdf\]]({{ site.baseurl }}/assets/pdf/2007_NOLISP.pdf){:target="_blank"}
[^2]: B. Jelfs, S. Javidi, P. Vayanos, and D. Mandic, Characterisation of Signal Modality: Exploiting Signal Nonlinearity in Machine Learning and Signal Processing, Journal of Signal Processing Systems, 2010 vol. 61 no. 1 pp. 105–115 [\[doi\]](http://doi.org/10.1007/s11265-009-0358-z){:target="_blank"} [\[pdf\]]({{ site.baseurl }}/assets/pdf/2010_JSPS_MLSP.pdf){:target="_blank"}
[^3]: B. Jelfs, P. Vayanos, S. Javidi, V. S. L. Goh, and D. Mandic, Collaborative Adaptive Filters for Online Knowledge Extraction and Information Fusion, Signal Processing Techniques for Knowledge Extraction and Information Fusion, D. Mandic et al. (eds), Springer, 2008 pp. 3–21 [\[doi\]](http://doi.org/10.1007/978-0-387-74367-7_1){:target="_blank"} [\[pdf\]]({{ site.baseurl }}/assets/pdf/2008_Knowledge_Extraction_Ch1.pdf){:target="_blank"}
[^4]: L. Li, Y. Xia, B. Jelfs, J. Cao, and D. P. Mandic, Modelling of Brain Consciousness Based on Collaborative Adaptive Filters, Neurocomputing, 2012 vol. 76 no. 1 pp. 36–43 [\[doi\]](http://doi.org/10.1016/j.neucom.2011.05.038){:target="_blank"} [\[pdf\]]({{ site.baseurl }}/assets/pdf/2012_Neurocomputing.pdf){:target="_blank"}
[^5]: B. Jelfs, D. P. Mandic, and S. C. Douglas, An Adaptive Approach for the Identification of Improper Complex Signals, Signal Processing, 2012 vol. 92 no. 2 pp. 335–344 [\[doi\]](http://doi.org/10.1016/j.sigpro.2011.07.020){:target="_blank"} [\[pdf\]]({{ site.baseurl }}/assets/pdf/2012_SigProc.pdf){:target="_blank"}
