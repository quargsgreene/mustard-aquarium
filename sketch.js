let soundFile;

//load files
function preload() {
  soundFile = loadSound("Eustachian Food Slide 2 48k 10192022 (1).mp3");
}

function setup() {
  imageMode(CENTER);
  loadImage("bg1.jpg", (img) => {
    image(img, 0, 0, 3000, 1500);
  });
  //prompt, background
  background(0);
  createCanvas(windowWidth, windowHeight);
  background(29);
  angleMode(DEGREES);
 	fft = new p5.FFT(0.99, 1024);

	let play_button;
  play_button = createButton("Eustachian Food Slide");
  play_button.mousePressed(playFile);
  play_button.position(width / 16, height / 12);

	function playFile() {
  //randomly select a direction and playback speed from an array of options
  let direction_speed = [-2, -1.5, -1, -0.75, 0.75, 1, 1.5, 2];
  if (!soundFile.isPlaying()) {
    soundFile.play();
    soundFile.rate(direction_speed[floor(random(8))]);
    play_button.html("Discontinue");
  } else {
    soundFile.pause();
    play_button.html("Undefined");
  }
}

  let insight = createP("Which direction? How fast? Press to find out!");
  insight.position(width / 16, height / 4);
  insight.style("color", "white");
  insight.style("font-family", "Monaco");
  insight.style("font-size", "3em");

  let sentence = createP(
    "He said that he had a legal obligation to never get sick."
  );
  sentence.position(width / 2, (5 * height) / 6);
  sentence.style("color", "rgb(79, 206, 114)");
  sentence.style("font-family", "Monaco");
  sentence.style("background-color", "rgba(220,220,220,10)");
  sentence.style("padding", "10px");
  sentence.style("border", "solid black 2px");

  //alternate clock

  function alternateDisplayClock() {
    let alternate_h = hour();
    let alternate_m = minute();
    let alternate_c = createElement("time", alternate_h + ":" + alternate_m);
    alternate_c.style("color", "rgba(200,200,200,0.1)");
    alternate_c.style("font-family", "Monaco");
    alternate_c.position(random(width), random(height));
    if (alternate_m < 10) {
      alternate_c.html(
        alternate_h + ":0" + alternate_m,
        0,
        random(200),
        random(400)
      );
    } else {
      alternate_c.html(
        alternate_h + ":" + alternate_m,
        0,
        random(200),
        random(400)
      );
    }
    setInterval(alternateDisplayClock, 60000);
  }

  alternateDisplayClock();

  //Some screen-reader only stuff

  let invisible_button_1 = createButton("Treasure");

  invisible_button_1.position(width / 2, height / 2);

  invisible_button_1.style("opacity", "0");

  invisible_button_1.style("width", "0");

  invisible_button_1.style("height", "0");

  invisible_button_1.style("z-index", "-1");

  invisible_button_1.mousePressed(alertNoise);

  let invisible_message = createP(
    "The earwax strips stole their pigment from egg yolks and are corporally paddling cerebrospinal fluid nuggets above the pixel ocean!"
  );

  invisible_message.position(width / 20, (3 * height) / 4);

  invisible_message.style("color", "rgba(0,0,0,0)");

  invisible_message.style("font-size", "1px");

  invisible_message.style("z-index", "-1");
}

function draw() {
  //other clock
  let h = hour();
  let m = minute();
  push();
  fill(200);
  textSize(12);
  textFont("Monaco");
  if (m < 10) {
    text(h + ":0" + m, 0, random(2000), random(4000));
  } else {
    text(h + ":" + m, 0, random(2000), random(4000));
  }
  pop();

  //Decoration

  push();

  for (let i = 0; i < 150; i += 10) {
    for (let j = 0; j < 150; j += 10) {
      for (let k = 50; k > 0; k -= 10) {
        let from = color(232, 93, 0);
        let to = color(130, 52, 0);
        let inter = lerpColor(from, to, j / 50);

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

  //Responding to the music

  let notes = fft.analyze();
  translate(width / 2, height / 2);
  scale(0.3);

  for (let i = 0; i < notes.length; i++) {
    stroke(0);
    strokeWeight(2);
    let amp = map(notes[i], 0, 256, 360, 0);
    let col = map(notes[i], 0, 256, 0, 1);
    let from = color(91, 2, 173, 80);
    let to = color(232, 93, 0, 80);
    let between = lerpColor(from, to, col);
    fill(between, 50);
    let x = (6 * amp * 1) / sin(i ** 2) + 400;
    let y = 4 * amp * cos(i) + 200;
    ellipse(x, y, 50, 50);
  }

  for (let i = 0; i < notes.length; i++) {
    stroke(0);
    strokeWeight(1);
    let amp = map(notes[i], 0, 256, 360, 0);
    let col = map(notes[i], 0, 256, 0, 1);
    let to = color(163, 128, 0, 80);
    let from = color(252, 202, 3, 80);
    let between = lerpColor(from, to, col);
    fill(between);
    let x = 3 * amp * cos(i ** 2);
    let y = 3 * amp * sin(i);
    rect(x, y, 250, 50);
  }
}

//Adjusting to changes in window size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  loadImage("bg1.jpg", (img) => {
    image(img, 0, 0, 4000, 2000);
  });
  tint(12, 71, 150);
  background(0);
}

//Screen-reader alert

function alertNoise() {
  alert(
    "The ringed kidneys and their bordered, square ureters have escaped. Hear them roar!"
  );
  let freq = 20;
  let burst = new p5.Noise("pink");
  let osc = new p5.SawOsc();
  osc.freq(freq, 5);
  osc.start();
  burst.start();
  setTimeout(stopNoise, 10000);
  function stopNoise() {
    burst.stop();
    osc.stop();
  }
}