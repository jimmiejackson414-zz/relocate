// <!-- Activate cloaking device
    var randnum = Math.random();
    var inum = 5;
    var rand1 = Math.round(randnum * (inum - 1)) + 1;
    images = new Array
    images[1] = "./bg/1.jpg"
    images[2] = "./bg/2.jpg"
    images[3] = "./bg/3.jpg"
    images[4] = "./bg/4.jpg"
    images[5] = "./bg/5.jpg"
    var image = images[rand1]
    // console.log('Loaded background.js');
// Deactivate cloaking device -->

// <!-- Activate cloaking device
    document.write('<body background="' + image + '" text="white">')
// Deactivate cloaking device -->
