3 directories

- full
All images, in max size, with watermark.
All images displayed on website should be able to open up in lightbox to show
this fullsize version.

- large
Images that are used as header for a travel story, or that are otherwise
displayed large (e.g. with class="pano")
These images should have a min width of 1800.

- thumb
All images that are displayed as thumb:
* images on photos page
* travel story header images (thumbs displayed in lists)
* small images in articles
These images should have a min width/height of 600x600

resize.sh is a helper script to batch-resize an entire folder of images at once.
Usage: resize.sh <sourcedir> <targetdir> <width> <height>
width & height are minima, so an image will match or exceed these bounds.
E.g.: a 2000x1000 source image resized to 600x600 will result in 1200x600.

Large: ./resize.sh ~/edited ~/large 1800 600
Thumb: ./resize.sh ~/edited ~/thumb 600 600

All images should be run through ImageOptim.
