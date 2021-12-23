---
layout: page
title: 3D Orientation Estimation
description: Image gradients and directional statistics for determining fibre alignment
img: assets/img/range_orig213.png
importance: 1
---

We have developed an efficient, parallelisable computational method to determine 3D orientations at a local level. Quantifying the orientation and alignment of cells and fibres in 3D is of growing interest. Tissue function is affected by this alignment and with increases in the development and use of 3D scaffolds in bioengineering there is a need to be able determine their performance.

The algorithm performs the following steps {% cite Jelfs2020 %}

* Computes the image intensity gradients
* Classifies the vectors into spherical and non-spherical using circularity testing
* Computes the local orientation vectors for the identified non-spherical vectors
* Assesses the distribution of the estimated local orientations over the whole volume

---

### Image Intensity Gradients
<div class="row align-items-center justify-content-center">
  <div class="col-sm-4 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/GradientVector.png' | relative_url }}" alt="" title="Gradient Vector Diagram"/></div>
  <div class="col-sm-8 mt-3 mt-md-0">Differentials of the volumetric images in each dimension \(i\) are obtained via convolution $$G_i(x,y,z) = I(x,y,z)\ast h_i(x,y,z)$$ where \(h_i\) is a Gaussian derivative filter to form a 3D vector field \(\vec{G}(x,y,z)\).
    <ul>
      <li>The magnitude of \(\vec{G}\) is large at object boundaries</li>
      <li>The direction is normal to its local orientation</li>
    </ul>
    Therefore estimating local orientation requires estimating normal vectors to \(\vec{G}\)</div>
</div>
<div class="caption text-left">
    Gradient vector diagram.
</div>

<div class="row align-items-center justify-content-center">
  <div class="col-sm-8 mt-3 mt-md-0">The girdle distribution models data points in spherical polar coordinates concentrated on a great circle. The distribution is characterised by:
    <ul>
      <li>Concentration of points around the circle</li>
      <li>Orientation of the polar axis</li>
    </ul>
    Estimating the local orientation then becomes that of determining the polar axis.</div>
  <div class="col-sm-4 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/GirdleDistribution.png' | relative_url }}" alt="" title="Girdle Distribution"/></div>
</div>
<div class="caption text-right">
    Girdle distribution.
</div>

Our solution adapts a maximum-likelihood estimator from spherical statistics to estimate the polar axis using a local region of \\(\vec{G}(x,y,z)\\) rather than spherical data by:

1. Calculating an estimator for a uniform grid of axis angles
2. Choosing a pair of axis angles that minimise the estimator

This method is efficient to computer, can perform the per voxel polar axis estimation in parallel and allows for a customisable search space based on the size of the grid.

---

### Complex Statistics
<div class="row align-items-center justify-content-center">
  <div class="col-sm-6 mt-3 mt-md-0"><p>Having obtained a local orientation we need to determine whether the estimate is meaningful, if the local image vectors are spherical then a local orientation angle is meaningless.</p>
    <p>Many tests for sphericity are tailored to a particular statistical distribution or are computationally intensive. Our solution is to project the data into the 3 coordinate planes and then test for circularity.  
      <ul><li>Data which is non-circular in one or more plane is non-spherical</li></ul>
      But we also need to consider not only the distribution of the angles but also the magnitude
        <ul>
        <li>Considering only the angles does not give all of the information
          <ul><li>Non-spherical data can be uniformly distributed across all angles</li></ul>
        </li>
        <li>Using both angle and magnitude shows shows differences in the distributions</li>
        </ul>
        Our approach uses statistics of complex numbers to determine the circularity which takes into account both angle and magnitude and is efficient to compute. </p></div>
  <div class="col-sm-6 mt-3 mt-md-0">
    <div class="row align-items-center justify-content-center">
      <div class="col-sm-6 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/Spherical.png' | relative_url }}" alt="" title="Spherical Data"/></div>
      <div class="col-sm-6 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/NonSpherical.png' | relative_url }}" alt="" title="Non-Spherical Data"/></div>
    </div>
    <div class="caption text-right">
        Left: Spherical data point cloud. Right: Non-spherical data point cloud.
    </div>
    <div class="row align-items-center justify-content-center">
      <div class="col-sm-4 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/xy_angle.png' | relative_url }}" alt="" title="xy Plane Angles"/></div>
      <div class="col-sm-4 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/xz_angle.png' | relative_url }}" alt="" title="xz Plane Angles"/></div>
      <div class="col-sm-4 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/yz_angle.png' | relative_url }}" alt="" title="yz Plane Angles"/></div>
    </div>
    <div class="caption text-right">
        Non-spherical data projected onto the unit circle. Left: \((x,y)\)-plane. Middle: \((x,z)\)-plane Right: \((y,z)\)-plane.
    </div>
    <div class="row align-items-center justify-content-center">
      <div class="col-sm-4 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/xy_Dis.png' | relative_url }}" alt="" title="xy Distribution"/></div>
      <div class="col-sm-4 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/xz_Dis.png' | relative_url }}" alt="" title="xz Distribution"/></div>
      <div class="col-sm-4 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/yz_Dis.png' | relative_url }}" alt="" title="yz Distribution"/></div>
    </div>
    <div class="caption text-right">
        Non-spherical data point cloud. Left: \((x,y)\)-plane. Middle: \((x,z)\)-plane Right: \((y,z)\)-plane.
    </div>
  </div>
</div>

---

### Simulated Fibres
<div class="row align-items-center">
  <div class="col-sm-5 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/range_orig.gif' | relative_url }}" alt="" title="Original Range of Angles"/></div>
  <div class="col-sm-2 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/ColourWheel.png' | relative_url }}" alt="" title="Colour Wheel"/></div>
  <div class="col-sm-5 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/range_results30.gif' | relative_url }}" alt="" title="Results Range of Angles"/></div>
</div>
<div class="caption text-right">
    Fibres with a range of elevation angles between 70&deg; and 100&deg; and azimuth angles between 90&deg; and 120&deg;. Left: The original fibres. Middle: Colour key for the different angles. Right: Estimated fibres from noisy data with PSNR = 30dB.
</div>

---

### Fibrous Scaffold Data
<div class="row align-items-center">
  <div class="col-sm-5 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/scaffold1.gif' | relative_url }}" alt="" title="Random Scaffold Data"/></div>
  <div class="col-sm-2 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/ColourWheel.png' | relative_url }}" alt="" title="Colour Wheel"/></div>
  <div class="col-sm-5 mt-3 mt-md-0"><img class="img-fluid rounded z-depth-1 p-2" src="{{ '/assets/img/scaffold3.gif' | relative_url }}" alt="" title="Aligned Scaffold Data"/></div>
</div>
<div class="caption text-right">
    Estimated fibres from real fibrous scaffold data (<a href="https://figshare.com/articles/Quanfima_Datasets/7096208" target="_blank" rel="noopener">datasets available here</a>). Left: Random structures. Middle: Colour key for the different angles. Right: Aligned structures.
</div>

---

### Assessing Distribution of Local Orientations
To assess the distribution of the local orientation angles across the whole volume the local orientation angles are converted to a set of unit vectors. The assessment of their distribution comprises of four measures:

* The three non-circularity measures in each of the planes
  * These quantify the sphericity of the overall distribution
* The spherical mean resultant length  $$\bar{R} = \lvert\frac{1}{N}\sum_n\vec{v}_n\rvert$$
  * This quantifies the concentration of the vectors \\(\bar{R}\approx 0\\) indicates the vectors are widely dispersed whereas \\(\bar{R}\approx 1\\) indicates the vectors are heavily concentrated.

<div class="row justify-content-center">
  <div class="col-sm-10 mt-3 mt-md0 table-responsive"><table table-sm table-borderless class="project-table">
    <tr><th style="text-align:left;">Datasets</th><th>Elevation Angles</th><th>Azimuth Angles</th><th>\(\ell_{XY}\)</th><th>\(\ell_{YZ}\)</th><th>\(\ell_{XZ}\)</th><th>\(\bar{R}\)</th></tr>
    <tr><td style="text-align:left;">Single</td><td>30&deg;--35&deg;</td><td>70&deg;--75&deg;</td><td>0.83</td><td>0.94</td><td>0.94</td><td>0.96</td></tr>
    <tr><td style="text-align:left;">Double</td><td>30&deg;--35&deg; &amp; 110&deg;--115&deg;</td><td>70&deg;--75&deg; &amp; 150&deg;--155&deg;</td><td>0.80</td><td>0.80</td><td>0.50</td><td>0.35</td></tr>
    <tr><td style="text-align:left;">Range</td><td>70&deg;--100&deg;</td><td>90&deg;--120&deg;</td><td>0.64</td><td>0.80</td><td>0.51</td><td>0.89</td></tr>
    <tr><td style="text-align:left;">Random</td><td>0&deg;--180&deg;</td><td>0&deg;--180&deg;</td><td>0.64</td><td>0.80</td><td>0.51</td><td>0.03</td></tr>
    <tr class="darker"><td style="text-align:left;">Random Scaffold Data</td><td>--</td><td>--</td><td>0.31</td><td>0.34</td><td>0.72</td><td>0.36</td></tr>
    <tr class="darker"><td style="text-align:left;">Aligned Scaffold Data</td><td>--</td><td>--</td><td>0.73</td><td>0.57</td><td>0.07</td><td>0.89</td></tr>
  </table></div>
</div>
<div class="caption text-left">
    Assessment of the distributions of the local orientations. \(\ell\) = degree of non-circularity \(\bar{R}\) = spherical mean resultant length. All simulations had a PSNR of 30dB.
</div>

---

### Code
Orientation estimation code can be found here: [Orientation](https://github.com/beteje/Orientation){:target="_blank" rel="noopener"}  

---

### References
<div class="references">
  {% bibliography --cited %}
</div>
