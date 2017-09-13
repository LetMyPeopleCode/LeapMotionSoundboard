# Leap Motion Soundboard
by Greg Bulmash - @YiddishNinja at @SEACoderDojo

This is a demo app I created for Seattle CoderDojo's table at Seattle Mini Maker Faire. It runs in the Chrome browser. You will need a Leap Motion device connected to your laptop, appropriate drivers installed, and the Leap Motion daemon running.

See Leap Motion's developer site for setting up and running drivers/services/daemons.

If you set that up, you should be able to open index.html in Chrome (no server required, you can do it from disk), F11 to put Chrome in full screen mode, and have fun. The design is optimized for a 1920x1080 monitor.

## What it does

While the driver captures a lot of points on both hands, this script throws out most of it and just tracks the two index fingers. When they are behind zero on the Z axis, but within the device's tracking, they will show the fingers' positions as dots on the screen. When a fingertip has crossed the Z plane, that finger will trigger any button the dot touches to play a sound.

# LICENSES:

Licenses of different materials range between CC0 (Creative Commons Zero) to Apache 2.0 to CC-BY 3.0 and 4.0. Please see below for information on what is licensed how.

## Code Licenses
Code is licensed under Apache 2.0. Leap Motion's Apache Licensed JS SDK is included here as is my own code to take advantage of it. No warranty is offered or implied. Use at your own risk.

## Image Licenses
Source images are from openclipart.org and are licensed as CC0. I have modified them to be buttons and fit this design. Any of my image modifications that could be considered worthy of copyright are dedicated to the public domain and licensed under CC0 (Creative Commons Zero).

## Sound Licenses:
Burp licensed under Creative Commons Zero - I created it

Chicken, Cat, Pig, Rooster, and Sheep are CC 4.0 Attribution - http://www.orangefreesounds.com/

Cow and Horse are CC-BY 3.0 via Soundbible, from BuffBill84 and Mike Koenig respectively.

Remaining sounds, I cannot find my notes and cannot redistribute them in good conscience. You will need to substitute your own.
