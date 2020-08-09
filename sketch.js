let video;
let vibrations = [];

function setup() {
  createCanvas(640, 360);
  video = createVideo(['People_Walking.mp4']);
  video.autoplay();
  video.hide();

  x = 0;
  r = width;

}

function draw() {
	background(255);
	image(video, 1, 1);

  video.loadPixels();
  const stepSize = round(constrain(24, 3, 32));
  for (let y = 0; y < height; y += stepSize) {
    for (let x = 0; x < width; x += stepSize) {
      const i = y * width + x;
      const darkness = (255 - video.pixels[i * 4]) / 255;
      const radius = stepSize * darkness;
      if (radius > 12) {
        fill("#fff");
        ellipse(x, y, radius, radius);
      }
      if (radius > 10 && radius < 12) {
        fill("#000");
        vibrations.push(new Particle(x, y));
      }
      
    }
  }

  for (let i = 0; i < vibrations.length; i++) {
    vibrations[i].show();
    vibrations[i].update();
    if (vibrations.length > 500) {
      vibrations.splice(0,1);
    } 
  }


}

class Particle {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.history = [];
  }

  update() {
    this.x = this.x;
    this.y = this.y;

    x += 0.01;
    r -= pow(x, -1);
    r = max(r,0);
    ellipse(this.x, this.y, r, r);

  }

  show() {
    stroke(255);

    noStroke();
    fill('rgba(0,0,0,.25)');
    ellipse(this.x, this.y, 18, 10);
  }
}

