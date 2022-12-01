let soundFile;
let fft;

// load files
function preload() {
  soundFile = loadSound('Eustachian-Food-Slide.mp3');
}

function setup() {
  imageMode(CENTER);
  loadImage('backgroundImage.jpg', (img) => {
    image(img, 0, 0, 3000, 1500);
  });
  // prompt, background
  background(0);
  createCanvas(windowWidth, windowHeight);
  background(29);
  angleMode(DEGREES);
  fft = new p5.FFT(0.99, 1024);

  const playButton = createButton('Eustachian Food Slide');
  playButton.mousePressed(playFile);
  playButton.position(width / 16, height / 12);

  function playFile() {
  // randomly select a direction and playback speed from an array of options
    const directionSpeed = [-2, -1.5, -1, -0.75, 0.75, 1, 1.5, 2];
    if (!soundFile.isPlaying()) {
      soundFile.play();
      soundFile.rate(directionSpeed[floor(random(8))]);
      playButton.html('Discontinue');
    } else {
      soundFile.pause();
      playButton.html('Eustachian Food Slide');
    }
  }

  const userDirections = createP('Which direction? How fast? Press to find out!');
  userDirections.position(width / 16, height / 4);
  userDirections.class('directions');

  const sentence = createP(
    'He said that he had a legal obligation to never get sick.',
  );
  sentence.position(width / 2, (5 * height) / 6);
  sentence.class('sentence');

  // alternate clock
  function invisibleDisplayClock() {
    const invisibleHours = hour();
    const invisibleMinutes = minute();
    const invisibleClock = createElement('time', `${invisibleHours}:${invisibleMinutes}`);
    invisibleClock.class('invisible');
    invisibleClock.position(random(width), random(height));
    if (invisibleMinutes < 10) {
      invisibleClock.html(
        `${invisibleHours}:0${invisibleMinutes}`,
        0,
        random(200),
        random(400),
      );
    } else {
      invisibleClock.html(
        `${invisibleHours}:${invisibleMinutes}`,
        0,
        random(200),
        random(400),
      );
    }
    setInterval(invisibleDisplayClock, 60000);
  }

  invisibleDisplayClock();

  // Some screen-reader only stuff
  const invisibleButton = createButton('Treasure');

  invisibleButton.position(width / 2, height / 2);
  invisibleButton.class('invisible');
  invisibleButton.mousePressed(alertNoise);

  const invisibleMessage = createP(
    'The earwax strips stole their pigment from egg yolks and are corporally\ paddling cerebrospinal fluid nuggets above the pixel ocean!',
  );
  invisibleMessage.position(width / 20, (3 * height) / 4);
  invisibleMessage.class('invisible');
}

function draw() {
  // other clock
  const hours = hour();
  const minutes = minute();
  push();
  fill(200);
  textSize(12);
  textFont('Monaco');
  if (minutes < 10) {
    text(`${hours}:0${minutes}`, 0, random(2000), random(4000));
  } else {
    text(`${hours}:${minutes}`, 0, random(2000), random(4000));
  }
  pop();

  // Intentionally throttled decoration
  push();
  for (let i = 0; i < 150; i += 10) {
    for (let j = 0; j < 150; j += 10) {
      for (let k = 50; k > 0; k -= 10) {
        const from = color(232, 93, 0);
        const to = color(130, 52, 0);
        const inter = lerpColor(from, to, j / 50);

        stroke(0);
        if (i === 10) {
          fill(2, 217, 2);
        } else if (j === 50) {
          fill(28, 125, 255);
        } else if (k === 20 || k === 40) {
          fill(inter);
        } else {
          fill(132, 0, 255);
        }
        if (i % 3 === 0) {
          ellipse(10 * i, 10 * j, (k * (i + j)) / 80, k);
        } else {
          rect(10 * i, 10 * j, (k * (i + j)) / 80, k);
        }
      }
    }
  }
  pop();

  push();
  stroke(0);
  fill(255, random(80, 255));
  rect(random(3000), random(3000), 20, 20);
  pop();

  // Responding to the music
  const notes = fft.analyze();
  translate(width / 2, height / 2);
  scale(0.3);

  for (let i = 0; i < notes.length; i++) {
    stroke(0);
    strokeWeight(2);
    const amp = map(notes[i], 0, 256, 360, 0);
    const col = map(notes[i], 0, 256, 0, 1);
    const from = color(91, 2, 173, 80);
    const to = color(232, 93, 0, 80);
    const between = lerpColor(from, to, col);
    fill(between, 50);
    const xPos = (6 * amp * 1) / sin(i ** 2) + 400;
    const yPos = 4 * amp * cos(i) + 200;
    ellipse(xPos, yPos, 50, 50);
  }

  for (let i = 0; i < notes.length; i++) {
    stroke(0);
    strokeWeight(1);
    const amp = map(notes[i], 0, 256, 360, 0);
    const col = map(notes[i], 0, 256, 0, 1);
    const to = color(163, 128, 0, 80);
    const from = color(252, 202, 3, 80);
    const between = lerpColor(from, to, col);
    fill(between);
    const xPos = 3 * amp * cos(i ** 2);
    const yPos = 3 * amp * sin(i);
    rect(xPos, yPos, 250, 50);
  }
}

// Adjusting to changes in window size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  loadImage('bg1.jpg', (img) => {
    image(img, 0, 0, 4000, 2000);
  });
  tint(12, 71, 150);
  background(0);
}

// Screen-reader alert
function alertNoise() {
  alert(
    'The ringed kidneys and their bordered,\ square ureters have escaped. Hear them roar!',
  );
  const freq = 20;
  const burst = new p5.Noise('pink');
  const osc = new p5.SawOsc();
  osc.freq(freq, 5);
  osc.start();
  burst.start();
  setTimeout(stopNoise, 10000);
  function stopNoise() {
    burst.stop();
    osc.stop();
  }
}
