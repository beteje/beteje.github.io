---
layout: page
title: Finger Coordination
description: The neural basis of finger coordination
img: /assets/img/Fingers.jpg
importance: 2
---

Actions involving the hand require positioning multiple fingers each with multiple degrees of freedom. However, we regularly perform complex actions without the need to consciously consider the position of each and every joint. Understanding the neural basis of finger coordination has many uses in rehabilitation and prosthetics.

---

### Small Synergistic Movement in Pianists
<div class="row align-items-center justify-content-center">
  <div class="col-sm-8 mt-3 mt-md-0"><p>The aim of this study was to study the differences in finger movement between experienced and novice pianists with the aim of understanding more about how the fingers move:
    <ul><li>Individually - the joints</li>
      <li>Together - simultaneous movement</li>
      <li>Independently - sequential movement</li></ul></p>
    <p>Movement of the hands during piano playing was recorded using a data glove with 14 sensors measuring finger flexion and abduction. To study how the movement of the fingers differed between the experienced and novice players the concept of movement synergies was used.</p></div>
  <div class="col-sm-4 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/Fingers.jpg' | relative_url }}" alt="" title="Data glove piano playing"/></div>
</div>
<div class="caption text-right">
    Piano playing while wearing a data glove.
</div>

Muscle Synergies:

* Fundamental patterns of movement
* Serve as building blocks for more complicated movements
* Reduce the complexity (degrees of freedom) to be controlled

<div class="row justify-content-center">
  <div class="col-sm-10 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/TV_PCA.png' | relative_url }}" alt="" title="Time-varying PCA"/></div>
</div>
<div class="caption text-right">
    Time-varying principal component analysis for movement synergy extraction.
</div>

Results showed that a small number of components accounted for the majority of the variance in the data but that these components are common across the groups. Classification results showed accurate classification was obtained from components accounting for only small amount of variance primarily related to the abduction of the fingers[^1].

<div class="row align-items-center">
  <div class="col-sm-6 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/VAF-10.png' | relative_url }}" alt="" title="Variance accounted for"/></div>
  <div class="col-sm-6 mt-3 mt-md0 table-responsive"><table table-sm table-borderless>
    <tr><th style="padding:1rem;color:#2698BA;">Finger</th><th style="padding:1rem;color:#2698BA;">Accuracy (%)</th><th style="padding:1rem;color:#2698BA;">No. Components</th><th style="padding:1rem;color:#2698BA;">VAF</th></tr>
    <tr><td style="padding:10px;">Thumb</td><td style="padding:10px;text-align:center;">93.68</td><td style="padding:10px;text-align:center;">15/253</td><td style="padding:10px;text-align:center;">1.38</td></tr>
    <tr><td style="padding:10px;">Index</td><td style="padding:10px;text-align:center">94.81</td><td style="padding:10px;text-align:center">14/212</td><td style="padding:10px;text-align:center">0.11</td></tr>
    <tr><td style="padding:10px;">Middle</td><td style="padding:10px;text-align:center">93.40</td><td style="padding:10px;text-align:center">17/409</td><td style="padding:10px;text-align:center">2.70</td></tr>
    <tr><td style="padding:10px;">Ring</td><td style="padding:10px;text-align:center">96.52</td><td style="padding:10px;text-align:center">18/115</td><td style="padding:10px;text-align:center">5.97</td></tr>
    <tr><td style="padding:10px;">Little</td><td style="padding:10px;text-align:center">98.29</td><td style="padding:10px;text-align:center">17/175</td><td style="padding:10px;text-align:center">0.96</td></tr>
  </table></div>
</div>
<div class="caption text-right">
    Left: The variance accounted for by the first 10 components. Right: Classification results showing the accuracy, number of compontents and variance accounted for, for each of the fingers.
</div>

---

### Muscle Synergy Extraction
The muscles which control the fingers are primarily located in the forearm and for each gesture we perform multiple muscles are required. As with the movement we can also use synergies to represent the common patterns of muscle activity which serve as the building blocks to produce detailed movements associated with the control of the fingers.

<div class="row align-items-center justify-content-center">
  <div class="col-sm-5 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/NMFDiagram.png' | relative_url }}" alt="" title="NMF Diagram"/></div>
  <div class="col-sm-7 mt-3 mt-md-0">Muscle synergy extraction can be performed using nonnegative matrix factorization. That is for a data matrix \(Y\in\mathbb{R}^{X\times N}\) find nonnegative matrices \(W\in\mathbb{R}^{X\times K}\) and \(H\in\mathbb{R}^{K\times N}\) via $$\min_{W,H} D(Y||WH)\quad\text{ subject to}\quad W\geq 0,\quad H\geq 0$$
  where \(D(\cdot)\) is a measure of goodness of fit</div>
</div>
<div class="caption text-left">
    Nonnegative matrix factorization.
</div>

To deal with the complexity of the neuromuscular system and extend beyond the variance accounted for as a measure we proposed a method based on using fuzzy entropy as a similarity measure[^2]. Examples of the differences between the synergies extracted using 16 channels of EMG recorded from the arm show compared to an alternating least squares NMF our method places greater significance on a smaller number of muscles.

<div class="row justify-content-center">
  <div class="col-sm-10 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/Subj1_K3.png' | relative_url }}" alt="" title="Synergies for Subject 1"/></div>
</div>
<div class="row justify-content-center mt-3">
  <div class="col-sm-10 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/Subj2_K3.png' | relative_url }}" alt="" title="Synergies for Subject 2"/></div>
</div>
<div class="caption text-right">
    Example synergies for a value of k=3 for 2 different subjects.
</div>

---

### References
[^1]: B. Jelfs, S. Zhou, B. K. Y. Wong, C. Tin, and R. H. M. Chan, Recruitment of Small Synergistic Movement Makes a Good Pianist, in Proc. Annual International Conference of the IEEE Engineering in Medicine and Biology Society, 2015 pp. 242–245 [\[doi\]](http://doi.org/10.1109/embc.2015.7318345){:target="_blank"} [\[pdf\]]({{ site.baseurl }}/assets/pdf/2015_EMBC.pdf){:target="_blank"}
[^2]: B. Jelfs, L. Li, C. Tin, and R. H. M. Chan, Fuzzy Entropy Based Nonnegative Matrix Factorization for Muscle Synergy Extraction, in Proc. IEEE International Conference on Acoustics, Speech and Signal Processing, 2016 pp. 739–743 [\[doi\]](http://doi.org/10.1109/icassp.2016.7471773){:target="_blank"}[\[pdf\]]({{ site.baseurl }}/assets/pdf/2016_ICASSP.pdf){:target="_blank"}
